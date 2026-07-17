use std::{
    path::Path,
    sync::{Arc, Mutex, MutexGuard},
};

use anyhow::{Context, Result, bail};
use argon2::{
    Argon2, PasswordHash, PasswordHasher, PasswordVerifier,
    password_hash::{SaltString, rand_core::OsRng},
};
use base64::{Engine, engine::general_purpose::STANDARD};
use chacha20poly1305::{
    XChaCha20Poly1305, XNonce,
    aead::{Aead, KeyInit, rand_core::RngCore},
};
use chrono::{DateTime, Utc};
use rusqlite::{Connection, OptionalExtension, params};
use secrecy::{ExposeSecret, SecretString};
use serde::{Deserialize, Serialize};
use sha2::Digest;
use uuid::Uuid;
use zeroize::Zeroize;

use crate::backup::{BackupEnvelope, ExportCredential, ExportData, ExportWebToken};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Profile {
    pub id: String,
    pub name: String,
    pub base_url: String,
    pub active_credential_id: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Credential {
    pub id: String,
    pub profile_id: String,
    pub name: String,
    pub created_at: String,
    pub updated_at: String,
    pub is_active: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WebToken {
    pub id: String,
    pub name: String,
    pub scopes: Vec<String>,
    pub created_at: String,
    pub expires_at: Option<String>,
    pub revoked_at: Option<String>,
    pub last_used_at: Option<String>,
}

#[derive(Debug)]
pub struct NewWebToken {
    pub metadata: WebToken,
    pub plaintext: SecretString,
}

#[derive(Clone)]
pub struct Database {
    connection: Arc<Mutex<Connection>>,
    master_key: Arc<[u8; 32]>,
}

impl Database {
    pub fn open(path: &Path) -> Result<Self> {
        let connection =
            Connection::open(path).with_context(|| format!("failed to open {}", path.display()))?;
        connection.pragma_update(None, "foreign_keys", "ON")?;
        connection.pragma_update(None, "journal_mode", "WAL")?;
        connection.busy_timeout(std::time::Duration::from_secs(5))?;
        let master_key = load_or_create_master_key(path)?;
        let database = Self {
            connection: Arc::new(Mutex::new(connection)),
            master_key: Arc::new(master_key),
        };
        database.migrate()?;
        database.ensure_default_profile()?;
        #[cfg(unix)]
        {
            use std::os::unix::fs::PermissionsExt;
            std::fs::set_permissions(path, std::fs::Permissions::from_mode(0o600))?;
        }
        Ok(database)
    }

    fn conn(&self) -> Result<MutexGuard<'_, Connection>> {
        self.connection
            .lock()
            .map_err(|_| anyhow::anyhow!("database lock is poisoned"))
    }

    fn migrate(&self) -> Result<()> {
        self.conn()?.execute_batch(
            "
            CREATE TABLE IF NOT EXISTS settings (
              key TEXT PRIMARY KEY,
              value_json TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS profiles (
              id TEXT PRIMARY KEY,
              name TEXT NOT NULL UNIQUE,
              base_url TEXT NOT NULL,
              active_credential_id TEXT
            );
            CREATE TABLE IF NOT EXISTS credentials (
              id TEXT PRIMARY KEY,
              profile_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
              name TEXT NOT NULL,
              ciphertext BLOB NOT NULL,
              nonce BLOB NOT NULL,
              created_at TEXT NOT NULL,
              updated_at TEXT NOT NULL,
              UNIQUE(profile_id, name)
            );
            CREATE TABLE IF NOT EXISTS web_tokens (
              id TEXT PRIMARY KEY,
              name TEXT NOT NULL,
              secret_hash TEXT NOT NULL,
              scopes_json TEXT NOT NULL,
              created_at TEXT NOT NULL,
              expires_at TEXT,
              revoked_at TEXT,
              last_used_at TEXT
            );
            CREATE TABLE IF NOT EXISTS web_sessions (
              id TEXT PRIMARY KEY,
              token_id TEXT NOT NULL,
              csrf_secret TEXT NOT NULL,
              expires_at TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS security_audit (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              event TEXT NOT NULL,
              metadata_json TEXT NOT NULL,
              created_at TEXT NOT NULL
            );
            ",
        )?;
        Ok(())
    }

    fn ensure_default_profile(&self) -> Result<()> {
        self.conn()?.execute(
            "INSERT OR IGNORE INTO profiles(id,name,base_url) VALUES('default','default',?)",
            [bunny_core::DEFAULT_BASE_URL],
        )?;
        Ok(())
    }

    pub fn profiles(&self) -> Result<Vec<Profile>> {
        let conn = self.conn()?;
        let mut statement = conn
            .prepare("SELECT id,name,base_url,active_credential_id FROM profiles ORDER BY name")?;
        let rows = statement.query_map([], |row| {
            Ok(Profile {
                id: row.get(0)?,
                name: row.get(1)?,
                base_url: row.get(2)?,
                active_credential_id: row.get(3)?,
            })
        })?;
        Ok(rows.collect::<rusqlite::Result<Vec<_>>>()?)
    }

    pub fn add_credential(
        &self,
        profile: &str,
        name: &str,
        secret: &SecretString,
    ) -> Result<Credential> {
        let profile_id = self.profile_id(profile)?;
        let id = format!("cred_{}", Uuid::new_v4().simple());
        let now = Utc::now().to_rfc3339();
        let (ciphertext, nonce) = encrypt(&self.master_key, secret.expose_secret().as_bytes())?;
        self.conn()?.execute(
            "INSERT INTO credentials(id,profile_id,name,ciphertext,nonce,created_at,updated_at)
             VALUES(?,?,?,?,?,?,?)",
            params![id, profile_id, name, ciphertext, nonce, now, now],
        )?;
        self.audit(
            "credential.created",
            serde_json::json!({"id": id, "name": name}),
        )?;
        self.credential(&id)
    }

    pub fn credentials(&self, profile: Option<&str>) -> Result<Vec<Credential>> {
        let profile_id = profile.map(|name| self.profile_id(name)).transpose()?;
        let conn = self.conn()?;
        let sql = "SELECT c.id,c.profile_id,c.name,c.created_at,c.updated_at,
                   CASE WHEN p.active_credential_id=c.id THEN 1 ELSE 0 END
                   FROM credentials c JOIN profiles p ON p.id=c.profile_id
                   WHERE (?1 IS NULL OR c.profile_id=?1) ORDER BY c.name";
        let mut statement = conn.prepare(sql)?;
        let rows = statement.query_map([profile_id], credential_from_row)?;
        Ok(rows.collect::<rusqlite::Result<Vec<_>>>()?)
    }

    pub fn select_credential(&self, profile: &str, name_or_id: &str) -> Result<()> {
        let profile_id = self.profile_id(profile)?;
        let id: String = self
            .conn()?
            .query_row(
                "SELECT id FROM credentials WHERE profile_id=? AND (id=? OR name=?)",
                params![profile_id, name_or_id, name_or_id],
                |row| row.get(0),
            )
            .optional()?
            .context("credential not found")?;
        self.conn()?.execute(
            "UPDATE profiles SET active_credential_id=? WHERE id=?",
            params![id, profile_id],
        )?;
        self.audit("credential.selected", serde_json::json!({"id": id}))?;
        Ok(())
    }

    pub fn update_credential(
        &self,
        profile: &str,
        name_or_id: &str,
        new_name: Option<&str>,
        new_secret: Option<&SecretString>,
    ) -> Result<Credential> {
        let profile_id = self.profile_id(profile)?;
        let id: String = self
            .conn()?
            .query_row(
                "SELECT id FROM credentials WHERE profile_id=? AND (id=? OR name=?)",
                params![profile_id, name_or_id, name_or_id],
                |row| row.get(0),
            )
            .optional()?
            .context("credential not found")?;
        if let Some(name) = new_name {
            self.conn()?.execute(
                "UPDATE credentials SET name=?,updated_at=? WHERE id=?",
                params![name, Utc::now().to_rfc3339(), id],
            )?;
        }
        if let Some(secret) = new_secret {
            let (ciphertext, nonce) = encrypt(&self.master_key, secret.expose_secret().as_bytes())?;
            self.conn()?.execute(
                "UPDATE credentials SET ciphertext=?,nonce=?,updated_at=? WHERE id=?",
                params![ciphertext, nonce, Utc::now().to_rfc3339(), id],
            )?;
        }
        self.audit("credential.updated", serde_json::json!({"id": id}))?;
        self.credential(&id)
    }

    pub fn delete_credential(&self, profile: &str, name_or_id: &str) -> Result<()> {
        let profile_id = self.profile_id(profile)?;
        let conn = self.conn()?;
        let changed = conn.execute(
            "DELETE FROM credentials WHERE profile_id=? AND (id=? OR name=?)",
            params![profile_id, name_or_id, name_or_id],
        )?;
        if changed == 0 {
            bail!("credential not found");
        }
        conn.execute(
            "UPDATE profiles SET active_credential_id=NULL
             WHERE id=? AND active_credential_id NOT IN (SELECT id FROM credentials)",
            [profile_id],
        )?;
        drop(conn);
        self.audit(
            "credential.deleted",
            serde_json::json!({"name": name_or_id}),
        )?;
        Ok(())
    }

    pub fn active_secret(&self, profile: &str) -> Result<(Profile, SecretString)> {
        let profile_id = self.profile_id(profile)?;
        let conn = self.conn()?;
        let profile_data = conn.query_row(
            "SELECT id,name,base_url,active_credential_id FROM profiles WHERE id=?",
            [&profile_id],
            |row| {
                Ok(Profile {
                    id: row.get(0)?,
                    name: row.get(1)?,
                    base_url: row.get(2)?,
                    active_credential_id: row.get(3)?,
                })
            },
        )?;
        let credential_id = profile_data
            .active_credential_id
            .as_ref()
            .context("profile has no active credential")?;
        let (ciphertext, nonce): (Vec<u8>, Vec<u8>) = conn.query_row(
            "SELECT ciphertext,nonce FROM credentials WHERE id=?",
            [credential_id],
            |row| Ok((row.get(0)?, row.get(1)?)),
        )?;
        let mut plaintext = decrypt(&self.master_key, &ciphertext, &nonce)?;
        let secret = SecretString::from(String::from_utf8(plaintext.clone())?);
        plaintext.zeroize();
        Ok((profile_data, secret))
    }

    pub fn create_web_token(
        &self,
        name: &str,
        scopes: &[String],
        expires_at: Option<DateTime<Utc>>,
    ) -> Result<NewWebToken> {
        let id = format!("wtoken_{}", Uuid::new_v4().simple());
        let secret = format!("bwt_v1_{}_{}", id, Uuid::new_v4().simple());
        let salt = SaltString::generate(&mut OsRng);
        let hash = Argon2::default()
            .hash_password(secret.as_bytes(), &salt)
            .map_err(|error| anyhow::anyhow!("failed to hash token: {error}"))?
            .to_string();
        let now = Utc::now().to_rfc3339();
        self.conn()?.execute(
            "INSERT INTO web_tokens(id,name,secret_hash,scopes_json,created_at,expires_at)
             VALUES(?,?,?,?,?,?)",
            params![
                id,
                name,
                hash,
                serde_json::to_string(scopes)?,
                now,
                expires_at.map(|value| value.to_rfc3339())
            ],
        )?;
        self.audit(
            "web_token.created",
            serde_json::json!({"id": id, "name": name}),
        )?;
        Ok(NewWebToken {
            metadata: self.web_token(&id)?,
            plaintext: SecretString::from(secret),
        })
    }

    pub fn web_tokens(&self) -> Result<Vec<WebToken>> {
        let conn = self.conn()?;
        let mut statement = conn.prepare(
            "SELECT id,name,scopes_json,created_at,expires_at,revoked_at,last_used_at
             FROM web_tokens ORDER BY created_at DESC",
        )?;
        let rows = statement.query_map([], web_token_from_row)?;
        Ok(rows.collect::<rusqlite::Result<Vec<_>>>()?)
    }

    pub fn revoke_web_token(&self, id: &str) -> Result<()> {
        let changed = self.conn()?.execute(
            "UPDATE web_tokens SET revoked_at=? WHERE id=?",
            params![Utc::now().to_rfc3339(), id],
        )?;
        if changed == 0 {
            bail!("web token not found");
        }
        self.audit("web_token.revoked", serde_json::json!({"id": id}))?;
        Ok(())
    }

    pub fn delete_web_token(&self, id: &str) -> Result<()> {
        let changed = self
            .conn()?
            .execute("DELETE FROM web_tokens WHERE id=?", [id])?;
        if changed == 0 {
            bail!("web token not found");
        }
        self.audit("web_token.deleted", serde_json::json!({"id": id}))?;
        Ok(())
    }

    pub fn rotate_web_token(&self, id: &str) -> Result<NewWebToken> {
        let token = self.web_token(id)?;
        self.revoke_web_token(id)?;
        self.create_web_token(
            &token.name,
            &token.scopes,
            token.expires_at.as_deref().and_then(|value| {
                DateTime::parse_from_rfc3339(value)
                    .ok()
                    .map(|value| value.with_timezone(&Utc))
            }),
        )
    }

    pub fn verify_web_token(&self, plaintext: &str) -> Result<WebToken> {
        let id = plaintext
            .strip_prefix("bwt_v1_")
            .and_then(|rest| rest.rsplit_once('_').map(|(id, _)| id.to_owned()))
            .context("invalid Web token format")?;
        let conn = self.conn()?;
        let (hash, token): (String, WebToken) = conn
            .query_row(
                "SELECT secret_hash,id,name,scopes_json,created_at,expires_at,revoked_at,last_used_at
                 FROM web_tokens WHERE id=?",
                [&id],
                |row| Ok((row.get(0)?, web_token_from_row_offset(row, 1)?)),
            )
            .optional()?
            .context("invalid Web token")?;
        if token.revoked_at.is_some()
            || token
                .expires_at
                .as_deref()
                .and_then(|value| DateTime::parse_from_rfc3339(value).ok())
                .is_some_and(|value| value < Utc::now())
        {
            bail!("Web token is expired or revoked");
        }
        let parsed = PasswordHash::new(&hash).map_err(|_| anyhow::anyhow!("invalid token hash"))?;
        Argon2::default()
            .verify_password(plaintext.as_bytes(), &parsed)
            .map_err(|_| anyhow::anyhow!("invalid Web token"))?;
        conn.execute(
            "UPDATE web_tokens SET last_used_at=? WHERE id=?",
            params![Utc::now().to_rfc3339(), id],
        )?;
        Ok(token)
    }

    pub fn export(&self, include_secrets: bool) -> Result<ExportData> {
        let credentials = self
            .credentials(None)?
            .into_iter()
            .map(|credential| {
                let secret = include_secrets
                    .then(|| self.secret_by_id(&credential.id))
                    .transpose()?
                    .map(|value| value.expose_secret().to_owned());
                Ok(ExportCredential {
                    id: credential.id,
                    profile_id: credential.profile_id,
                    name: credential.name,
                    secret,
                    created_at: credential.created_at,
                    updated_at: credential.updated_at,
                })
            })
            .collect::<Result<Vec<_>>>()?;
        let conn = self.conn()?;
        let web_tokens = if include_secrets {
            let mut statement = conn.prepare(
                "SELECT id,name,secret_hash,scopes_json,expires_at,revoked_at FROM web_tokens",
            )?;
            statement
                .query_map([], |row| {
                    Ok(ExportWebToken {
                        id: row.get(0)?,
                        name: row.get(1)?,
                        hash: row.get(2)?,
                        scopes: serde_json::from_str(&row.get::<_, String>(3)?).unwrap_or_default(),
                        expires_at: row.get(4)?,
                        revoked_at: row.get(5)?,
                    })
                })?
                .collect::<rusqlite::Result<Vec<_>>>()?
        } else {
            Vec::new()
        };
        Ok(ExportData {
            format: "bunny-cli-config".into(),
            version: 1,
            exported_at: Utc::now().to_rfc3339(),
            settings: serde_json::json!({}),
            profiles: self.profiles()?,
            credentials,
            web_tokens,
        })
    }

    pub fn backup(&self, passphrase: &SecretString) -> Result<BackupEnvelope> {
        BackupEnvelope::seal(&self.export(true)?, passphrase)
    }

    pub fn restore(&self, data: &ExportData, replace: bool) -> Result<()> {
        if data.format != "bunny-cli-config" || data.version != 1 {
            bail!("unsupported backup format or version");
        }
        let mut conn = self.conn()?;
        let transaction = conn.transaction()?;
        if replace {
            transaction.execute("DELETE FROM web_sessions", [])?;
            transaction.execute("DELETE FROM web_tokens", [])?;
            transaction.execute("DELETE FROM credentials", [])?;
            transaction.execute("DELETE FROM profiles", [])?;
        }
        for profile in &data.profiles {
            transaction.execute(
                "INSERT INTO profiles(id,name,base_url,active_credential_id)
                 VALUES(?,?,?,NULL)
                 ON CONFLICT(id) DO UPDATE SET name=excluded.name,base_url=excluded.base_url",
                params![profile.id, profile.name, profile.base_url],
            )?;
        }
        for credential in &data.credentials {
            let Some(secret) = credential.secret.as_deref() else {
                continue;
            };
            let (ciphertext, nonce) = encrypt(&self.master_key, secret.as_bytes())?;
            transaction.execute(
                "INSERT INTO credentials(id,profile_id,name,ciphertext,nonce,created_at,updated_at)
                 VALUES(?,?,?,?,?,?,?)
                 ON CONFLICT(id) DO UPDATE SET profile_id=excluded.profile_id,name=excluded.name,
                 ciphertext=excluded.ciphertext,nonce=excluded.nonce,updated_at=excluded.updated_at",
                params![
                    credential.id,
                    credential.profile_id,
                    credential.name,
                    ciphertext,
                    nonce,
                    credential.created_at,
                    credential.updated_at
                ],
            )?;
        }
        for token in &data.web_tokens {
            transaction.execute(
                "INSERT INTO web_tokens(id,name,secret_hash,scopes_json,created_at,expires_at,revoked_at)
                 VALUES(?,?,?,?,?,?,?)
                 ON CONFLICT(id) DO UPDATE SET name=excluded.name,secret_hash=excluded.secret_hash,
                 scopes_json=excluded.scopes_json,expires_at=excluded.expires_at,
                 revoked_at=excluded.revoked_at",
                params![
                    token.id,
                    token.name,
                    token.hash,
                    serde_json::to_string(&token.scopes)?,
                    data.exported_at,
                    token.expires_at,
                    token.revoked_at
                ],
            )?;
        }
        for profile in &data.profiles {
            if let Some(id) = &profile.active_credential_id {
                transaction.execute(
                    "UPDATE profiles SET active_credential_id=? WHERE id=?
                     AND EXISTS(SELECT 1 FROM credentials WHERE id=? AND profile_id=?)",
                    params![id, profile.id, id, profile.id],
                )?;
            }
        }
        transaction.commit()?;
        drop(conn);
        self.ensure_default_profile()?;
        self.audit(
            "configuration.restored",
            serde_json::json!({"replace": replace}),
        )?;
        Ok(())
    }

    fn profile_id(&self, name_or_id: &str) -> Result<String> {
        self.conn()?
            .query_row(
                "SELECT id FROM profiles WHERE id=? OR name=?",
                params![name_or_id, name_or_id],
                |row| row.get(0),
            )
            .optional()?
            .with_context(|| format!("profile '{name_or_id}' not found"))
    }

    fn credential(&self, id: &str) -> Result<Credential> {
        self.conn()?
            .query_row(
                "SELECT c.id,c.profile_id,c.name,c.created_at,c.updated_at,
             CASE WHEN p.active_credential_id=c.id THEN 1 ELSE 0 END
             FROM credentials c JOIN profiles p ON p.id=c.profile_id WHERE c.id=?",
                [id],
                credential_from_row,
            )
            .map_err(Into::into)
    }

    fn secret_by_id(&self, id: &str) -> Result<SecretString> {
        let (ciphertext, nonce): (Vec<u8>, Vec<u8>) = self.conn()?.query_row(
            "SELECT ciphertext,nonce FROM credentials WHERE id=?",
            [id],
            |row| Ok((row.get(0)?, row.get(1)?)),
        )?;
        let mut plaintext = decrypt(&self.master_key, &ciphertext, &nonce)?;
        let secret = SecretString::from(String::from_utf8(plaintext.clone())?);
        plaintext.zeroize();
        Ok(secret)
    }

    fn web_token(&self, id: &str) -> Result<WebToken> {
        self.conn()?
            .query_row(
                "SELECT id,name,scopes_json,created_at,expires_at,revoked_at,last_used_at
             FROM web_tokens WHERE id=?",
                [id],
                web_token_from_row,
            )
            .map_err(Into::into)
    }

    fn audit(&self, event: &str, metadata: serde_json::Value) -> Result<()> {
        self.conn()?.execute(
            "INSERT INTO security_audit(event,metadata_json,created_at) VALUES(?,?,?)",
            params![event, metadata.to_string(), Utc::now().to_rfc3339()],
        )?;
        Ok(())
    }
}

fn credential_from_row(row: &rusqlite::Row<'_>) -> rusqlite::Result<Credential> {
    Ok(Credential {
        id: row.get(0)?,
        profile_id: row.get(1)?,
        name: row.get(2)?,
        created_at: row.get(3)?,
        updated_at: row.get(4)?,
        is_active: row.get::<_, i64>(5)? == 1,
    })
}

fn web_token_from_row(row: &rusqlite::Row<'_>) -> rusqlite::Result<WebToken> {
    web_token_from_row_offset(row, 0)
}

fn web_token_from_row_offset(row: &rusqlite::Row<'_>, offset: usize) -> rusqlite::Result<WebToken> {
    let scopes: String = row.get(offset + 2)?;
    Ok(WebToken {
        id: row.get(offset)?,
        name: row.get(offset + 1)?,
        scopes: serde_json::from_str(&scopes).unwrap_or_default(),
        created_at: row.get(offset + 3)?,
        expires_at: row.get(offset + 4)?,
        revoked_at: row.get(offset + 5)?,
        last_used_at: row.get(offset + 6)?,
    })
}

fn encrypt(key: &[u8; 32], plaintext: &[u8]) -> Result<(Vec<u8>, Vec<u8>)> {
    let cipher = XChaCha20Poly1305::new(key.into());
    let mut nonce = vec![0_u8; 24];
    chacha20poly1305::aead::OsRng.fill_bytes(&mut nonce);
    let ciphertext = cipher
        .encrypt(XNonce::from_slice(&nonce), plaintext)
        .map_err(|_| anyhow::anyhow!("failed to encrypt credential"))?;
    Ok((ciphertext, nonce))
}

fn decrypt(key: &[u8; 32], ciphertext: &[u8], nonce: &[u8]) -> Result<Vec<u8>> {
    XChaCha20Poly1305::new(key.into())
        .decrypt(XNonce::from_slice(nonce), ciphertext)
        .map_err(|_| anyhow::anyhow!("failed to decrypt credential"))
}

fn load_or_create_master_key(path: &Path) -> Result<[u8; 32]> {
    if let Ok(value) = std::env::var("BUNNY_MASTER_KEY") {
        let decoded = STANDARD
            .decode(value)
            .context("BUNNY_MASTER_KEY must be base64")?;
        return decoded
            .try_into()
            .map_err(|_| anyhow::anyhow!("BUNNY_MASTER_KEY must decode to 32 bytes"));
    }
    let account = format!(
        "{:x}",
        sha2::Sha256::digest(path.to_string_lossy().as_bytes())
    );
    let entry = keyring::Entry::new("bunny-cli", &account)?;
    if let Ok(value) = entry.get_password() {
        let decoded = STANDARD.decode(value)?;
        return decoded
            .try_into()
            .map_err(|_| anyhow::anyhow!("invalid master key in OS keyring"));
    }
    let mut key = [0_u8; 32];
    chacha20poly1305::aead::OsRng.fill_bytes(&mut key);
    entry
        .set_password(&STANDARD.encode(key))
        .context("OS keyring unavailable; set BUNNY_MASTER_KEY for headless use")?;
    Ok(key)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn encrypt_round_trip() {
        let key = [7_u8; 32];
        let (ciphertext, nonce) = encrypt(&key, b"secret").unwrap();
        assert_ne!(ciphertext, b"secret");
        assert_eq!(decrypt(&key, &ciphertext, &nonce).unwrap(), b"secret");
    }
}
