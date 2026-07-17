# Bunny CLI

A Rust CLI and local Web control plane for the
[bunny.net Core API](https://docs.bunny.net/api-reference/core). It manages
multiple account API keys, exposes all 95 documented Core operations, and stores
application state in an encrypted local SQLite database.

> Status: active development (`0.1.0`). Review [PLAN.md](PLAN.md) for the full
> architecture, security model, and implementation roadmap.

## Features

- All 95 Bunny Core API operations in a shared CLI/Web registry.
- Generic HTTP escape hatch for newly released endpoints.
- Multiple profiles and encrypted Bunny account credentials.
- Web access tokens independent from Bunny API keys.
- Responsive Svelte Web UI with light/dark themes and mobile navigation.
- Portable settings exports and passphrase-encrypted full backups.
- One SQLite source of truth at `$HOME/.bunny/state.db`.
- JSON or YAML CLI output.

The Core API uses the account API key in the `AccessKey` header. Bunny Stream
content and Edge Storage file operations require product-specific credentials
and are outside the current Core scope.

## Requirements

- Rust 1.85 or later.
- Node.js 20 or later only when rebuilding the Web frontend.
- A bunny.net account API key.

## Build

```bash
npm --prefix web install
npm --prefix web run check
npm --prefix web run build
cargo build --release
```

The Svelte build is embedded into the Rust Web binary. The resulting executable
is `target/release/bunny`.

For development:

```bash
cargo fmt --check
cargo clippy --workspace --all-targets --all-features -- -D warnings
cargo test --workspace
```

## First use

Add an account API key through a hidden prompt:

```bash
bunny auth login --name personal
```

Or manage credentials explicitly:

```bash
bunny credential add production
bunny credential list
bunny credential select production
bunny credential current
```

The API key is encrypted before it is stored in `state.db`. The encryption
master key is kept in the operating-system keyring. On a headless system, pass a
base64-encoded 32-byte key with `BUNNY_MASTER_KEY`.

Temporary credentials can be supplied without storing them:

```bash
BUNNY_API_KEY='...' bunny core run pull-zone.list
bunny --api-key '...' core run country.list
```

Using `--api-key` may expose the value in shell history or the process list; the
environment variable is safer for short-lived automation.

## Core API commands

List all operations:

```bash
bunny core list
bunny core list --group dns
bunny core list --group pull-zone --output yaml
```

Run an operation:

```bash
bunny core run pull-zone.list
bunny core run pull-zone.get --param id=123
bunny core run dns.record.list \
  --param zoneId=456 \
  --query page=1 \
  --query perPage=100
```

Send a JSON body:

```bash
bunny core run dns.zone.create --body dns-zone.json
bunny core run pull-zone.update --param id=123 --body pull-zone.json
```

Destructive operations are marked in the operation registry and require
`--yes`:

```bash
bunny core run dns.record.delete \
  --param zoneId=456 \
  --param id=789 \
  --yes
```

Binary responses can be written to a file:

```bash
bunny core run billing.invoice --param id=123 --out invoice.pdf
```

### Raw API request

Use the escape hatch when an endpoint is not yet present in the operation
registry:

```bash
bunny api GET /pullzone --query page=1
bunny api POST /purge --body purge.json
```

Only relative paths beginning with `/` are accepted, so a stored API key cannot
be forwarded to another host.

## Web UI

Create a Web access token:

```bash
bunny web-token create --name browser
```

The plaintext token is displayed once. Then start the local server:

```bash
bunny web serve
```

The default browser opens at `http://127.0.0.1:7331`. To run without opening a
browser:

```bash
bunny web serve --no-open
```

The Web UI provides:

- Resource navigation for all 95 Core operations.
- Typed path/query fields, JSON request bodies, and formatted responses.
- Credential status and local connection overview.
- Settings export and encrypted full backup import/export.
- Desktop, tablet, and mobile layouts.

The Web token authenticates the local UI. The browser never receives stored
Bunny API keys.

### Web token management

```bash
bunny web-token list
bunny web-token rotate TOKEN_ID
bunny web-token revoke TOKEN_ID
bunny web-token delete TOKEN_ID --yes
```

Rotation and creation print the new plaintext token once.

## Credential management

```bash
bunny credential add NAME
bunny credential update NAME --rename NEW_NAME
bunny credential update NAME --replace-key
bunny credential select NAME
bunny credential delete NAME --yes
```

`credential list` and Web API responses contain metadata only. Stored API keys
cannot be displayed or exported as plaintext.

## Backup and restore

Export settings and non-secret metadata:

```bash
bunny config export --out bunny-settings.json
```

Create a portable encrypted backup containing profiles, active selections,
Bunny API keys, and long-lived Web token hashes:

```bash
bunny config backup --out bunny-full-backup.enc.json
```

Restore it on the same or another machine:

```bash
bunny config validate bunny-full-backup.enc.json
bunny config import bunny-full-backup.enc.json
```

Use `--replace` to replace existing configuration instead of merging:

```bash
bunny config import bunny-full-backup.enc.json --replace
```

The imported API keys are re-encrypted with a new local master key. Web sessions,
CSRF state, process IDs, ports, and runtime caches are intentionally not
restored. Existing long-lived Web tokens continue to work, but users must log in
again.

Import and export are also available under **Settings** in the Web UI.

## Data directory

The default layout is:

```text
$HOME/.bunny/
├── state.db
├── state.db-wal
├── state.db-shm
└── web.json
```

Override it with `BUNNY_HOME` or the global `--home PATH` option:

```bash
bunny --home /tmp/bunny-test config show-path
```

No `config.json` is created. Settings, profiles, encrypted credentials, Web
token hashes, sessions, and audit metadata use the single SQLite database.

## Security notes

- Do not share Bunny API keys, Web tokens, backup passphrases, or full backups.
- Full backups always use Argon2id and XChaCha20-Poly1305 encryption.
- Web tokens are stored as Argon2id hashes.
- Credential secrets use XChaCha20-Poly1305 at rest.
- The Web server binds to loopback by default.
- Secret fields and authentication headers must never be included in logs.

## License

MIT

