use argon2::Argon2;
use base64::{Engine, engine::general_purpose::STANDARD};
use chacha20poly1305::{
    XChaCha20Poly1305, XNonce,
    aead::{Aead, KeyInit, OsRng, rand_core::RngCore},
};
use secrecy::{ExposeSecret, SecretString};
use serde::{Deserialize, Serialize};
use zeroize::Zeroize;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExportCredential {
    pub id: String,
    pub profile_id: String,
    pub name: String,
    pub secret: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExportWebToken {
    pub id: String,
    pub name: String,
    pub hash: String,
    pub scopes: Vec<String>,
    pub expires_at: Option<String>,
    pub revoked_at: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExportData {
    pub format: String,
    pub version: u32,
    pub exported_at: String,
    pub settings: serde_json::Value,
    pub profiles: Vec<crate::Profile>,
    pub credentials: Vec<ExportCredential>,
    pub web_tokens: Vec<ExportWebToken>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BackupEnvelope {
    pub format: String,
    pub version: u32,
    pub kdf: String,
    pub cipher: String,
    pub salt: String,
    pub nonce: String,
    pub ciphertext: String,
}

impl BackupEnvelope {
    pub fn seal(data: &ExportData, passphrase: &SecretString) -> anyhow::Result<Self> {
        let mut salt = [0_u8; 16];
        let mut nonce = [0_u8; 24];
        OsRng.fill_bytes(&mut salt);
        OsRng.fill_bytes(&mut nonce);
        let mut key = [0_u8; 32];
        Argon2::default()
            .hash_password_into(passphrase.expose_secret().as_bytes(), &salt, &mut key)
            .map_err(|error| anyhow::anyhow!("failed to derive backup key: {error}"))?;
        let cipher = XChaCha20Poly1305::new((&key).into());
        let mut plaintext = serde_json::to_vec(data)?;
        let ciphertext = cipher
            .encrypt(XNonce::from_slice(&nonce), plaintext.as_ref())
            .map_err(|_| anyhow::anyhow!("failed to encrypt backup"))?;
        plaintext.zeroize();
        key.zeroize();
        Ok(Self {
            format: "bunny-cli-encrypted-backup".into(),
            version: 1,
            kdf: "argon2id".into(),
            cipher: "xchacha20poly1305".into(),
            salt: STANDARD.encode(salt),
            nonce: STANDARD.encode(nonce),
            ciphertext: STANDARD.encode(ciphertext),
        })
    }

    pub fn open(&self, passphrase: &SecretString) -> anyhow::Result<ExportData> {
        let salt = STANDARD.decode(&self.salt)?;
        let nonce = STANDARD.decode(&self.nonce)?;
        let ciphertext = STANDARD.decode(&self.ciphertext)?;
        let mut key = [0_u8; 32];
        Argon2::default()
            .hash_password_into(passphrase.expose_secret().as_bytes(), &salt, &mut key)
            .map_err(|error| anyhow::anyhow!("failed to derive backup key: {error}"))?;
        let cipher = XChaCha20Poly1305::new((&key).into());
        let mut plaintext = cipher
            .decrypt(XNonce::from_slice(&nonce), ciphertext.as_ref())
            .map_err(|_| anyhow::anyhow!("invalid passphrase or damaged backup"))?;
        key.zeroize();
        let result = serde_json::from_slice(&plaintext)?;
        plaintext.zeroize();
        Ok(result)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn encrypted_backup_round_trip() {
        let data = ExportData {
            format: "bunny-cli-config".into(),
            version: 1,
            exported_at: "2026-07-17T00:00:00Z".into(),
            settings: serde_json::json!({"theme": "dark"}),
            profiles: Vec::new(),
            credentials: Vec::new(),
            web_tokens: Vec::new(),
        };
        let passphrase = SecretString::from("correct horse battery staple");
        let envelope = BackupEnvelope::seal(&data, &passphrase).unwrap();
        assert!(!envelope.ciphertext.contains("theme"));
        let restored = envelope.open(&passphrase).unwrap();
        assert_eq!(restored.settings["theme"], "dark");
        assert!(
            envelope
                .open(&SecretString::from("wrong passphrase"))
                .is_err()
        );
    }
}
