# Bunny CLI

CLI Rust và Web control plane chạy cục bộ dành cho
[Bunny.net Core API](https://docs.bunny.net/api-reference/core). Ứng dụng quản lý
nhiều account API key, cung cấp đủ 95 Core operation đã được công bố và lưu
trạng thái trong SQLite được mã hóa.

> Trạng thái: đang phát triển (`0.1.0`). Xem [PLAN.md](PLAN.md) để đọc kiến trúc,
> mô hình bảo mật và lộ trình triển khai đầy đủ.

## Tính năng

- Registry dùng chung cho CLI và Web, bao phủ đủ 95 Core API operation.
- Lệnh HTTP cấp thấp dành cho endpoint Bunny mới.
- Nhiều profile và nhiều Bunny account credential được mã hóa.
- Web access token riêng biệt, không dùng Bunny API key để đăng nhập Web.
- Web UI Svelte hiện đại, responsive mobile, hỗ trợ light/dark theme.
- Export settings và full backup portable được mã hóa bằng passphrase.
- Chỉ một nguồn dữ liệu SQLite tại `$HOME/.bunny/state.db`.
- CLI xuất JSON hoặc YAML.

Core API xác thực account API key bằng header `AccessKey`. Thao tác nội dung
Bunny Stream và file Edge Storage cần credential riêng của từng sản phẩm, chưa
thuộc phạm vi Core hiện tại.

## Yêu cầu

- Rust 1.85 trở lên.
- Node.js 20 trở lên, chỉ cần khi build lại Web frontend.
- Bunny.net account API key.

## Biên dịch

```bash
npm --prefix web install
npm --prefix web run check
npm --prefix web run build
cargo build --release
```

Frontend Svelte được embed vào binary Rust. File chạy sau khi build là
`target/release/bunny`.

Kiểm tra trong quá trình phát triển:

```bash
cargo fmt --check
cargo clippy --workspace --all-targets --all-features -- -D warnings
cargo test --workspace
```

## Sử dụng lần đầu

Thêm account API key qua hidden prompt:

```bash
bunny auth login --name personal
```

Hoặc quản lý credential rõ ràng:

```bash
bunny credential add production
bunny credential list
bunny credential select production
bunny credential current
```

API key được mã hóa trước khi lưu vào `state.db`. Master key mã hóa được giữ
trong keyring của hệ điều hành. Với server headless, truyền key 32 byte đã encode
base64 qua biến `BUNNY_MASTER_KEY`.

Có thể dùng credential tạm mà không lưu:

```bash
BUNNY_API_KEY='...' bunny core run pull-zone.list
bunny --api-key '...' core run country.list
```

Truyền `--api-key` có thể làm lộ key trong shell history hoặc process list; dùng
biến môi trường an toàn hơn cho automation ngắn hạn.

## Thao tác Core API

Liệt kê operation:

```bash
bunny core list
bunny core list --group dns
bunny core list --group pull-zone --output yaml
```

Chạy operation:

```bash
bunny core run pull-zone.list
bunny core run pull-zone.get --param id=123
bunny core run dns.record.list \
  --param zoneId=456 \
  --query page=1 \
  --query perPage=100
```

Gửi JSON body:

```bash
bunny core run dns.zone.create --body dns-zone.json
bunny core run pull-zone.update --param id=123 --body pull-zone.json
```

Operation nguy hiểm được đánh dấu trong registry và bắt buộc có `--yes`:

```bash
bunny core run dns.record.delete \
  --param zoneId=456 \
  --param id=789 \
  --yes
```

Ghi binary response ra file:

```bash
bunny core run billing.invoice --param id=123 --out invoice.pdf
```

### Gọi API cấp thấp

Dùng escape hatch khi Bunny vừa bổ sung endpoint chưa có trong registry:

```bash
bunny api GET /pullzone --query page=1
bunny api POST /purge --body purge.json
```

Chỉ relative path bắt đầu bằng `/` được chấp nhận, vì vậy API key lưu trong app
không thể bị chuyển tiếp sang host khác.

## Web UI

Tạo Web access token:

```bash
bunny web-token create --name browser
```

Plaintext token chỉ hiển thị một lần. Sau đó khởi chạy Web:

```bash
bunny web serve
```

Trình duyệt mặc định mở `http://127.0.0.1:7331`. Chạy mà không tự mở browser:

```bash
bunny web serve --no-open
```

Web UI hỗ trợ:

- Điều hướng đủ 95 Core operation.
- Form path/query, JSON request body và response đã format.
- Tổng quan connection và credential đang dùng.
- Import/export settings và full encrypted backup.
- Layout desktop, tablet và mobile.

Web token chỉ xác thực Web UI cục bộ. Browser không bao giờ nhận Bunny API key
đã lưu.

### Quản lý Web token

```bash
bunny web-token list
bunny web-token rotate TOKEN_ID
bunny web-token revoke TOKEN_ID
bunny web-token delete TOKEN_ID --yes
```

Khi tạo hoặc rotate, plaintext token mới chỉ được in đúng một lần.

## Quản lý Bunny credential

```bash
bunny credential add NAME
bunny credential update NAME --rename NEW_NAME
bunny credential update NAME --replace-key
bunny credential select NAME
bunny credential delete NAME --yes
```

`credential list` và Web API chỉ trả metadata. API key đã lưu không thể xem hoặc
export ở dạng plaintext.

## Backup và khôi phục

Export settings và metadata không chứa secret:

```bash
bunny config export --out bunny-settings.json
```

Tạo full backup portable gồm profile, active selection, Bunny API key và hash của
Web token dài hạn:

```bash
bunny config backup --out bunny-full-backup.enc.json
```

Khôi phục trên máy hiện tại hoặc máy mới:

```bash
bunny config validate bunny-full-backup.enc.json
bunny config import bunny-full-backup.enc.json
```

Dùng `--replace` nếu muốn thay toàn bộ cấu hình thay vì merge:

```bash
bunny config import bunny-full-backup.enc.json --replace
```

API key được mã hóa lại bằng master key mới của máy đích. Web session, CSRF
state, PID, port và runtime cache không được khôi phục. Web token dài hạn cũ vẫn
dùng được, nhưng người dùng phải đăng nhập Web lại.

Import/export cũng có trong trang **Settings** của Web UI.

## Thư mục dữ liệu

Cấu trúc mặc định:

```text
$HOME/.bunny/
├── state.db
├── state.db-wal
├── state.db-shm
└── web.json
```

Ghi đè bằng `BUNNY_HOME` hoặc global option `--home PATH`:

```bash
bunny --home /tmp/bunny-test config show-path
```

Ứng dụng không tạo `config.json`. Settings, profile, credential mã hóa, Web token
hash, session và audit metadata đều nằm trong một SQLite database.

## Lưu ý bảo mật

- Không chia sẻ Bunny API key, Web token, passphrase hoặc full backup.
- Full backup luôn dùng Argon2id và XChaCha20-Poly1305.
- Web token được lưu dưới dạng Argon2id hash.
- Credential được mã hóa XChaCha20-Poly1305 khi lưu.
- Web server mặc định chỉ bind loopback.
- Secret và authentication header không được xuất hiện trong log.

## Giấy phép

MIT
