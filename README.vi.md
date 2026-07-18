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

### Script release thống nhất

`build-release.sh` luôn format Rust trước khi build, cài frontend dependency theo
lockfile, chạy lint/type check, tạo các Vite chunk lazy-load, kiểm tra/test Rust
workspace và build binary theo môi trường được chọn:

```bash
./build-release.sh
./build-release.sh --profile dev
./build-release.sh --target aarch64-unknown-linux-musl
./build-release.sh --all
```

Cross compile dùng `cargo-zigbuild` và Zig nếu đã cài, sau đó fallback sang
[`cross`](https://github.com/cross-rs/cross) với Podman hoặc Docker. Lệnh ARM64
musl ở trên tạo `target/aarch64-unknown-linux-musl/release/bunny`. Cài cross
Script cũng chấp nhận `amd64-unknown-linux-musl` và tự chuyển thành target Rust
chuẩn `x86_64-unknown-linux-musl`. Cài cross compiler bằng:

```bash
cargo install cross --git https://github.com/cross-rs/cross
```

Target Apple vẫn cần Apple SDK/toolchain. Chỉ dùng `--no-checks` khi lặp lại
build cục bộ; `cargo fmt` và frontend production build vẫn luôn chạy.

Build đồng thời binary native và Podman image:

```bash
./build-release.sh --container
./build-release.sh --container \
  --container-tag registry.example.com/bunny-cli:0.1.0 \
  --platform linux/arm64
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

Lệnh in `http://127.0.0.1:7331` và không tự động mở trình duyệt. Bạn tự mở URL
đó, hoặc chạy `bunny web open` khi server đang hoạt động.

Web UI hỗ trợ:

- Điều hướng đủ 95 Core operation.
- Form path/query, JSON body chỉnh sửa được và điền sẵn theo schema Core OpenAPI
  chính thức của Bunny, nút copy cURL và response đã format.
- Form mode tùy chọn với select enum, preset TTL, input đúng kiểu, công tắc
  boolean, trình sửa array/object JSON, đánh dấu required và submit trực tiếp.
- Core UI mode lưu trạng thái, có resource dashboard, bảng dữ liệu trực tiếp,
  tìm kiếm, refresh, action từng dòng, form create/edit theo schema, xác nhận
  delete, xem chi tiết và nhóm action ngoài CRUD.
- Tổng quan connection và credential đang dùng.
- Import/export settings và full encrypted backup.
- Layout desktop, tablet và mobile.

Dashboard, credential manager, Web-token manager, settings, operation runner và
dữ liệu JSON mẫu được tách thành các lazy-loaded chunk. Browser chỉ tải module
khi màn hình tương ứng được mở. Rust server embed và phục vụ toàn bộ Vite asset
directory, vì vậy runtime không cần chạy Node.js.

Web token chỉ xác thực Web UI cục bộ. Browser không bao giờ nhận Bunny API key
đã lưu.

Dùng công tắc `UI mode [OFF | ON]` trên top bar để đổi phần Core API từ catalog
operation sang giao diện quản trị. Trạng thái được lưu trong browser. Mục `All
operations` trở thành resource hub; mỗi nhóm Core tự tải collection endpoint và
hiển thị các khả năng CRUD có trong Bunny OpenAPI registry. Nhóm có nhiều
resource sẽ dùng tab; ví dụ DNS tách Zones và Records, trong đó Records được lọc
theo `zoneId` đang chọn.

### Phát triển local

Chạy đồng thời Rust backend và Vite UI:

```bash
./dev web serve
```

Mở <http://127.0.0.1:5173>. Vite proxy `/api` và `/healthz` sang Rust server tại
`http://127.0.0.1:7331`; khi một tiến trình dừng hoặc nhấn `Ctrl+C`, script sẽ
dừng cả hai. Các chế độ phát triển khác:

```bash
./dev web ui                 # Chỉ chạy Vite
./dev cli --help             # Chạy CLI bằng Cargo
./dev check                  # Frontend lint + Cargo check/Clippy
./dev test                   # Frontend lint + Rust tests
```

### Quản lý Web token

```bash
bunny web-token list
bunny web-token rotate TOKEN_ID
bunny web-token revoke TOKEN_ID
bunny web-token delete TOKEN_ID --yes
```

Khi tạo hoặc rotate, plaintext token mới chỉ được in đúng một lần.

## Chạy bằng Podman container

Image chạy `bunny web serve` bằng user không đặc quyền, lưu database trong
`/data`, mở cổng `7331`, có health check và loại bỏ toàn bộ Linux capability
trong Compose configuration đi kèm.

Tạo encryption key bền vững một lần và lưu trong secret manager:

```bash
export BUNNY_MASTER_KEY="$(openssl rand -base64 32)"
```

Khởi chạy service; mặc định chỉ publish ra localhost:

```bash
podman compose -f compose.yml up -d --build
```

Tạo Web login token đầu tiên trong cùng persistent volume:

```bash
podman compose -f compose.yml run --rm bunny \
  web-token create --name browser
```

Mở <http://127.0.0.1:7331> và nhập token chỉ được in một lần. SQLite database
được giữ lại trong volume `bunny-data` khi nâng cấp image.

Chạy không qua Compose:

```bash
podman build --format docker -t localhost/bunny-cli:latest -f Containerfile .
podman volume create bunny-data
podman run --rm -d --name bunny-cli \
  -p 127.0.0.1:7331:7331 \
  -e BUNNY_MASTER_KEY \
  -v bunny-data:/data:Z \
  localhost/bunny-cli:latest
```

Không thay đổi `BUNNY_MASTER_KEY` sau khi đã lưu credential. Nếu mất key này,
Bunny API key trong database không thể giải mã. Hãy tạo full encrypted backup
trước khi chuyển container hoặc thay local master key.

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
