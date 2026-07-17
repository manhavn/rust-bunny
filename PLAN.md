# Kế hoạch xây dựng Bunny.net CLI bằng Rust

## 1. Mục tiêu

Xây dựng CLI Rust tên tạm thời `bunny` để quản trị đầy đủ **Bunny.net Core
Platform API** bằng account API key:

- Base URL mặc định: `https://api.bunny.net`.
- Xác thực: header `AccessKey: <ACCOUNT_API_KEY>`.
- Bao phủ toàn bộ 95 operation trong OpenAPI Core tại thời điểm lập kế hoạch.
- Có lệnh typed, dễ khám phá cho các tác vụ thường dùng và lệnh HTTP cấp thấp
  để sử dụng endpoint mới mà chưa cần chờ nâng cấp CLI.
- Hỗ trợ JSON, YAML và bảng; dùng tốt trong terminal lẫn script/CI.
- Có Web UI để cấu hình và thao tác Core API trong browser.
- Quản lý nhiều Bunny API key trong kho credential dùng chung; CLI và Web đều
  có thể list, thêm, sửa, xóa và chọn key đang sử dụng.
- Web UI dùng access token riêng do ứng dụng phát hành; token có vòng đời và CRUD
  từ CLI, không dùng Bunny API key để đăng nhập trực tiếp vào Web.
- Không làm lộ API key trong log, lỗi, history hoặc process list.
- Mọi thao tác phá huỷ đều phải xác nhận, trừ khi truyền `--yes`.

Không nằm trong phạm vi Core v1:

- Upload/download/list/delete **file** trong Edge Storage: Storage API dùng
  storage-zone password riêng.
- Upload/quản trị **video/collection**: Stream API dùng library API key riêng.
- Shield, Edge Scripting, Logging, Origin Errors và Magic Containers là các API
  riêng, base URL/schema/credential có thể khác.

Core API vẫn quản trị được Storage Zone và Stream Video Library bằng account API
key. Thiết kế credential theo profile phải chừa chỗ cho các API sản phẩm nói trên
ở phiên bản sau.

## 2. Nguồn chuẩn và nguyên tắc đồng bộ

- Core API docs: <https://docs.bunny.net/api-reference/core>
- Authentication: <https://docs.bunny.net/api-reference/authentication>
- OpenAPI chính thức:
  <https://core-api-public-docs.b-cdn.net/docs/v3/public.json>
- Error model: <https://docs.bunny.net/api-reference/core/errors>

Lưu snapshot OpenAPI đã pin tại `openapi/core.json`. CI tải bản mới và chạy
`scripts/check-openapi-drift.sh`; nếu operation/mô hình thay đổi thì báo diff
nhưng không tự sửa code. `PLAN.md` và snapshot phải ghi ngày cập nhật.

Điều kiện coverage:

1. Mỗi `operationId` có một hàm client và một subcommand typed.
2. Mỗi method/path có unit test bằng mock server.
3. Schema request/response sinh từ snapshot hoặc được ánh xạ thủ công có test
   deserialize fixture.
4. Endpoint mới vẫn gọi được qua `bunny api request`.

## 3. Trải nghiệm dòng lệnh

```text
bunny [GLOBAL_OPTIONS] <COMMAND>

Global options:
  --profile <name>          Profile, mặc định "default"
  --api-key <key>           Chỉ dùng tạm; ưu tiên credential trong state.db
  --base-url <url>          Dành cho mock, proxy hoặc endpoint tùy chỉnh
  --output table|json|yaml  Mặc định table khi TTY, json khi pipe
  --query <JMESPath>        Lọc dữ liệu trả về
  --no-color
  --timeout <duration>
  --retries <n>
  --verbose / --quiet
  --yes                     Bỏ xác nhận thao tác nguy hiểm

Top-level commands:
  auth, credential, web, web-token, config, completion, api
  country, dns, pull-zone, purge, region, storage-zone, video-library
  audit, statistics, search, billing, api-key, affiliate, account
```

Quy ước chung:

- ID là positional argument; tên có thể được resolve bằng `--name` nếu duy nhất.
- List dùng `--page`, `--per-page`, `--all`, `--search`; `--all` tự phân trang.
- Request nhỏ nhận flag typed; request lớn nhận `--from <json|yaml>` hoặc stdin
  với `--from -`. Flag explicit ghi đè giá trị từ file.
- Binary response bắt buộc có `--out`; không đẩy PDF/certificate vào bảng.
- Giá trị thời gian nhận RFC 3339; ngày nhận `YYYY-MM-DD`.
- Exit code: `0` thành công, `2` lỗi cách dùng, `3` xác thực/phân quyền, `4` không
  tìm thấy, `5` rate limit, `6` lỗi server/network, `7` bị người dùng hủy.

Ví dụ:

```bash
bunny auth login --profile prod
bunny credential add prod --prompt
bunny credential select prod
bunny credential list
bunny web-token create --name my-browser --expires-in 30d
bunny web open
bunny config export --out bunny-settings.json
bunny config backup --out bunny-full-backup.enc
bunny config import bunny-full-backup.enc --dry-run
bunny pull-zone list --all
bunny dns zone create --domain example.com
bunny dns record create 123 --type A --name @ --value 203.0.113.10
bunny pull-zone purge 456
bunny purge url https://cdn.example.com/app.css
bunny statistics get --date-from 2026-07-01 --date-to 2026-07-17
bunny api request GET /pullzone --query page=1
```

## 4. Danh mục lệnh và endpoint (coverage contract)

Tên lệnh có thể tinh chỉnh trước khi code, nhưng không được bỏ operation.

### Country và Region (2)

| CLI | API |
|---|---|
| `country list` | `GET /country` |
| `region list` | `GET /region` |

### DNS Zone (18)

| CLI | API |
|---|---|
| `dns zone list` | `GET /dnszone` |
| `dns zone create` | `POST /dnszone` |
| `dns zone get <id>` | `GET /dnszone/{id}` |
| `dns zone update <id>` | `POST /dnszone/{id}` |
| `dns zone delete <id>` | `DELETE /dnszone/{id}` |
| `dns zone export <id> --out <file>` | `GET /dnszone/{id}/export` |
| `dns zone check-availability` | `POST /dnszone/checkavailability` |
| `dns zone issue-certificate <id>` | `POST /dnszone/{id}/certificate/issue` |
| `dns zone statistics <id>` | `GET /dnszone/{id}/statistics` |
| `dns zone dnssec enable <id>` | `POST /dnszone/{id}/dnssec` |
| `dns zone dnssec disable <id>` | `DELETE /dnszone/{id}/dnssec` |
| `dns record list <zone-id>` | `GET /dnszone/{zoneId}/records` |
| `dns record create <zone-id>` | `PUT /dnszone/{zoneId}/records` |
| `dns record update <zone-id> <record-id>` | `POST /dnszone/{zoneId}/records/{id}` |
| `dns record delete <zone-id> <record-id>` | `DELETE /dnszone/{zoneId}/records/{id}` |
| `dns record import <zone-id>` | `POST /dnszone/{zoneId}/import` |
| `dns record scan start` | `POST /dnszone/records/scan` |
| `dns record scan get <zone-id>` | `GET /dnszone/{zoneId}/records/scan` |

### Pull Zone và purge (30)

| CLI | API |
|---|---|
| `pull-zone list` | `GET /pullzone` |
| `pull-zone create` | `POST /pullzone` |
| `pull-zone count` | `GET /pullzone/count` |
| `pull-zone get <id>` | `GET /pullzone/{id}` |
| `pull-zone update <id>` | `POST /pullzone/{id}` |
| `pull-zone delete <id>` | `DELETE /pullzone/{id}` |
| `pull-zone check-availability` | `POST /pullzone/checkavailability` |
| `pull-zone purge <id>` | `POST /pullzone/{id}/purgeCache` |
| `pull-zone edge-rule upsert <id>` | `POST /pullzone/{pullZoneId}/edgerules/addOrUpdate` |
| `pull-zone edge-rule delete <id> <rule-id>` | `DELETE /pullzone/{pullZoneId}/edgerules/{edgeRuleId}` |
| `pull-zone edge-rule enable <id> <rule-id>` | `POST /pullzone/{pullZoneId}/edgerules/{edgeRuleId}/setEdgeRuleEnabled` |
| `pull-zone certificate free` | `GET /pullzone/loadFreeCertificate` |
| `pull-zone certificate external-dns request` | `POST /pullzone/requestExternalDnsCertificate` |
| `pull-zone certificate external-dns complete` | `POST /pullzone/completeExternalDnsCertificate` |
| `pull-zone certificate external-http request` | `POST /pullzone/requestExternalHttpCertificate` |
| `pull-zone certificate external-http complete` | `POST /pullzone/completeExternalHttpCertificate` |
| `pull-zone certificate add <id>` | `POST /pullzone/{id}/addCertificate` |
| `pull-zone certificate remove <id>` | `DELETE /pullzone/{id}/removeCertificate` |
| `pull-zone hostname add <id>` | `POST /pullzone/{id}/addHostname` |
| `pull-zone hostname remove <id>` | `DELETE /pullzone/{id}/removeHostname` |
| `pull-zone hostname set-force-ssl <id>` | `POST /pullzone/{id}/setForceSSL` |
| `pull-zone hostname change-key-type <id>` | `POST /pullzone/{id}/updatePrivateKeyType` |
| `pull-zone token-key reset <id>` | `POST /pullzone/{id}/resetSecurityKey` |
| `pull-zone allowed-referrer add <id>` | `POST /pullzone/{id}/addAllowedReferrer` |
| `pull-zone allowed-referrer remove <id>` | `POST /pullzone/{id}/removeAllowedReferrer` |
| `pull-zone blocked-referrer add <id>` | `POST /pullzone/{id}/addBlockedReferrer` |
| `pull-zone blocked-referrer remove <id>` | `POST /pullzone/{id}/removeBlockedReferrer` |
| `pull-zone blocked-ip add <id>` | `POST /pullzone/{id}/addBlockedIp` |
| `pull-zone blocked-ip remove <id>` | `POST /pullzone/{id}/removeBlockedIp` |
| `purge url <url>` | `POST /purge` |

### Storage Zone (11)

| CLI | API |
|---|---|
| `storage-zone list` | `GET /storagezone` |
| `storage-zone create` | `POST /storagezone` |
| `storage-zone check-availability` | `POST /storagezone/checkavailability` |
| `storage-zone get <id>` | `GET /storagezone/{id}` |
| `storage-zone update <id>` | `POST /storagezone/{id}` |
| `storage-zone delete <id>` | `DELETE /storagezone/{id}` |
| `storage-zone password reset <id>` | `POST /storagezone/{id}/resetPassword` |
| `storage-zone password reset-read-only` | `POST /storagezone/resetReadOnlyPassword` |
| `storage-zone regions` | `GET /storagezone/regions` |
| `storage-zone statistics <id>` | `GET /storagezone/{id}/statistics` |
| `storage-zone egress-statistics <id>` | `GET /storagezone/{id}/statistics/egress` |

Các lệnh reset password phải coi response là secret: chỉ hiện một lần, không log,
không lưu tự động; `--output table` che mặc định và yêu cầu `--show-secret`.

### Stream Video Library (20)

| CLI | API |
|---|---|
| `video-library list` | `GET /videolibrary` |
| `video-library create` | `POST /videolibrary` |
| `video-library get <id>` | `GET /videolibrary/{id}` |
| `video-library update <id>` | `POST /videolibrary/{id}` |
| `video-library delete <id>` | `DELETE /videolibrary/{id}` |
| `video-library languages` | `GET /videolibrary/languages` |
| `video-library allowed-referrer add <id>` | `POST /videolibrary/{id}/addAllowedReferrer` |
| `video-library allowed-referrer remove <id>` | `POST /videolibrary/{id}/removeAllowedReferrer` |
| `video-library blocked-referrer add <id>` | `POST /videolibrary/{id}/addBlockedReferrer` |
| `video-library blocked-referrer remove <id>` | `POST /videolibrary/{id}/removeBlockedReferrer` |
| `video-library watermark add <id>` | `PUT /videolibrary/{id}/watermark` |
| `video-library watermark delete <id>` | `DELETE /videolibrary/{id}/watermark` |
| `video-library live-thumbnail add <id>` | `PUT /videolibrary/{id}/live/thumbnail` |
| `video-library live-thumbnail delete <id>` | `DELETE /videolibrary/{id}/live/thumbnail` |
| `video-library live-watermark add <id>` | `PUT /videolibrary/{id}/live/watermark` |
| `video-library live-watermark delete <id>` | `DELETE /videolibrary/{id}/live/watermark` |
| `video-library api-key reset <id>` | `POST /videolibrary/{id}/resetApiKey` |
| `video-library api-key reset-read-only <id>` | `POST /videolibrary/{id}/resetReadOnlyApiKey` |
| `video-library statistics transcribing <id>` | `GET /videolibrary/{id}/transcribing/statistics` |
| `video-library statistics drm <id>` | `GET /videolibrary/{id}/drm/statistics` |

Reset API key áp dụng cùng quy tắc bảo vệ secret như password.

### Statistics, Search và Audit (6)

| CLI | API |
|---|---|
| `statistics get` | `GET /statistics` |
| `statistics optimizer <pull-zone-id>` | `GET /pullzone/{pullZoneId}/optimizer/statistics` |
| `statistics origin-shield-queue <pull-zone-id>` | `GET /pullzone/{pullZoneId}/originshield/queuestatistics` |
| `statistics safehop <pull-zone-id>` | `GET /pullzone/{pullZoneId}/safehop/statistics` |
| `search <term>` | `GET /search` |
| `audit list <date>` | `GET /user/audit/{date}` |

### Billing, API key, Affiliate và Account (8)

| CLI | API |
|---|---|
| `billing details` | `GET /billing` |
| `billing payment-request list` | `GET /billing/payment-requests` |
| `billing payment-request invoice <id> --out <file>` | `GET /billing/payment-request-invoice/{id}/pdf` |
| `billing summary list` | `GET /billing/summary` |
| `billing summary document <record-id> --out <file>` | `GET /billing/summary/{billingRecordId}/pdf` |
| `api-key list` | `GET /apikey` |
| `affiliate get` | `GET /billing/affiliate` |
| `account close` | `POST /user/closeaccount` |

`account close` yêu cầu nhập lại chuỗi xác nhận (ví dụ `CLOSE`) kể cả khi có
`--yes`, trừ chế độ CI có đồng thời `--yes --confirm CLOSE`.

Tổng: 2 + 18 + 30 + 11 + 20 + 6 + 8 = **95 operations**.

### Escape hatch

```bash
bunny api request <METHOD> <PATH> \
  [--query key=value]... [--header key=value]... \
  [--body <file|->] [--content-type <mime>] [--out <file>]
```

- Chỉ chấp nhận relative path khi dùng API key; không gửi credential sang host lạ.
- Chặn ghi đè `AccessKey` qua `--header`.
- Cũng tuân theo retry, timeout, output, redaction và xác nhận với method phá huỷ.

## 5. Chế độ Web và quản lý credential

### 5.1. Khởi chạy Web UI

```bash
bunny web serve [--host 127.0.0.1] [--port 7331]
bunny web open
bunny web status
```

- `web serve` khởi chạy HTTP server, mặc định chỉ bind `127.0.0.1:7331`, in URL
  ra terminal và không tự mở browser.
- `web open` mở browser tới server đang chạy; nếu chưa có server thì khởi chạy
  background process và chờ health check.
- URL mở browser không chứa Bunny API key. Có thể dùng bootstrap token một lần,
  thời hạn tối đa 60 giây, đổi ngay thành session cookie rồi vô hiệu hóa.
- Server có graceful shutdown, PID/state file chống chạy trùng và `GET /healthz`.
- Không cho bind non-loopback mặc định. `--host 0.0.0.0` yêu cầu explicit
  `--allow-remote`, TLS, cấu hình origin và cảnh báo rủi ro.

Web UI cung cấp:

- Dashboard hiển thị profile/credential đang active và kiểm tra kết nối.
- CRUD credential Bunny.net, chọn credential active theo session hoặc đặt mặc
  định toàn cục.
- CRUD Web access token (không bao giờ hiển thị lại plaintext token).
- Import/export cấu hình bằng file JSON; trước khi import phải preview diff,
  validate schema và chọn chiến lược merge hoặc replace.
- Form typed cho toàn bộ 95 Core operations, JSON editor cho request phức tạp,
  confirm modal cho mutation/destructive operation.
- Xem response dạng bảng/JSON, download binary, pagination, tìm kiếm và lọc.
- Hiển thị lịch sử tác vụ đã redact; không lưu request/response chứa secret.

CLI và Web gọi chung application/service layer; Web không shell-out sang binary
CLI và không tự xây request API riêng, tránh lệch validation/hành vi.

### 5.2. Web access token

Web access token là credential **của ứng dụng CLI/Web**, độc lập với Bunny API
key. Token có format nhận diện phiên bản, ví dụ `bwt_v1_<id>_<secret>`.

```bash
bunny web-token create --name <name> [--expires-in 30d] [--scope <scope>...]
bunny web-token list
bunny web-token get <id>
bunny web-token update <id> [--name ...] [--expires-at ...] [--scope ...]
bunny web-token revoke <id>
bunny web-token delete <id>
bunny web-token rotate <id>
```

- `create`/`rotate` chỉ in plaintext token đúng một lần; mặc định prompt xác nhận
  trước khi ghi token vào file bằng `--out`.
- Kho chỉ lưu `id`, tên, scopes, Argon2id hash của secret, created/updated/expiry,
  last-used, revoked-at; không lưu plaintext.
- Token ID dùng để lookup, secret được so sánh constant-time. Có rate limit và
  backoff cho login thất bại.
- Scope tối thiểu: `read`, `operate`, `credentials:read`,
  `credentials:write`, `tokens:read`, `tokens:write`, `admin`. Mặc định token
  interactive là `read,operate`; quản lý credential/token cần scope explicit.
- Revocation có hiệu lực ngay. Rotation tạo secret mới và vô hiệu secret cũ;
  tùy chọn grace period ngắn phải được bật explicit.
- Login nhận token qua form body hoặc `Authorization: Bearer`; sau login dùng
  cookie `HttpOnly`, `SameSite=Strict`, `Secure` khi TLS, timeout idle và absolute.
- Token trong URL/query bị từ chối để tránh browser history, referrer và proxy log.

Bootstrap lần đầu:

1. Nếu chưa có token, `bunny web open` tạo token một lần chỉ đủ quyền login,
   hiệu lực 60 giây.
2. Browser đổi bootstrap token lấy session.
3. UI yêu cầu tạo Web access token lâu dài nếu người dùng muốn đăng nhập lại.
4. Bootstrap token bị xóa ngay sau lần dùng đầu tiên hoặc khi hết hạn.

### 5.3. Bunny API key vault

Đây là danh sách credential **cục bộ** do ứng dụng quản lý, khác endpoint Core
`GET /apikey` của Bunny.net (endpoint đó chỉ liệt kê key phía tài khoản theo
khả năng API chính thức). Không giả định Bunny.net hỗ trợ remote create/update/
delete API key nếu OpenAPI không công bố operation tương ứng.

```bash
bunny credential add <name> [--profile <profile>] [--prompt|--from-stdin]
bunny credential list [--profile <profile>]
bunny credential show <name>                 # metadata, che secret
bunny credential update <name> [--rename ...] [--prompt|--from-stdin]
bunny credential delete <name>
bunny credential select <name> [--profile <profile>]
bunny credential current [--profile <profile>]
bunny credential test [<name>]
```

- Web có cùng CRUD/list/select/test, qua API nội bộ yêu cầu scope credential.
- Danh sách chỉ trả metadata: ID, tên, profile, nhãn, created/updated/last-used,
  trạng thái test và `is_active`; không trả plaintext key.
- `show` không hiện secret. Export secret không hỗ trợ mặc định; thay key bằng
  `update --prompt`.
- Mỗi profile có một `active_credential_id`. CLI có thể ghi đè tạm bằng
  `--credential <name>` mà không thay lựa chọn mặc định.
- Xóa credential active phải chọn credential thay thế hoặc xác nhận profile sẽ
  không còn credential. Không cho trùng tên trong cùng profile.
- API key được mã hóa bằng XChaCha20-Poly1305 và lưu trực tiếp trong `state.db`.
  Master key cục bộ lấy từ OS keyring hoặc `BUNNY_MASTER_KEY`/secret manager ở
  headless mode; không lưu master key plaintext trong hoặc cạnh database.
- Key từ `--api-key`/`BUNNY_API_KEY` là override tạm và không tự động nhập vào
  vault. UI không bao giờ đưa secret đã lưu trở lại browser.
- Mọi thay đổi credential/token ghi security audit event đã redact.

### 5.4. Import/export cấu hình trên Web

Web UI có trang **Settings → Import/Export** và backend dùng chung use case với:

```bash
bunny config export [--out <file>] [--include-secrets --passphrase-file <file>]
bunny config backup --out <file> [--passphrase-file <file>]
bunny config import <file> [--merge|--replace] [--dry-run]
bunny config validate <file>
```

Định dạng export có version để migration:

```json
{
  "format": "bunny-cli-config",
  "version": 1,
  "exported_at": "2026-07-17T00:00:00Z",
  "config": {},
  "credential_metadata": []
}
```

Quy tắc:

- Export mặc định chỉ gồm settings, profile và credential metadata; không chứa
  Bunny API key, Web token secret, session, master key hay audit log.
- Web tạo file download với `Content-Disposition: attachment`,
  `Cache-Control: no-store`; dữ liệu export không được ghi vào lịch sử tác vụ.
- `config backup` hoặc `--include-secrets` tạo **full encrypted backup** bằng
  passphrase (Argon2id KDF + XChaCha20-Poly1305). Không hỗ trợ export secret
  plaintext. Web yêu cầu nhập lại passphrase và quyền `admin`.
- Import plaintext chỉ nhận export không-secret. Import backup secret yêu cầu
  passphrase, không ghi passphrase vào config/log và zeroize sau sử dụng.
- Upload bị giới hạn kích thước, chỉ parse JSON theo schema version, từ chối path
  traversal/field lạ nguy hiểm và không tự động gọi URL trong file.
- Luôn validate toàn bộ trước khi ghi. UI hiển thị diff đã redact và cho chọn:
  `merge` (mặc định, giữ mục không xung đột) hoặc `replace` (ghi đè toàn bộ).
- Xung đột credential xử lý theo ID và tên; người dùng chọn keep/overwrite/rename.
  Không âm thầm thay active credential.
- Ghi database trong transaction; tạo SQLite backup trước import và rollback toàn
  bộ nếu bất kỳ record nào không hợp lệ.
- Full backup chứa settings, profile, Bunny API key, active selection, Web token
  hash/scope/expiry/revocation và dữ liệu chức năng cần thiết. Secret được giải
  mã trong memory trên máy nguồn rồi mã hóa lại bằng khóa backup dẫn xuất từ
  passphrase, nên file không phụ thuộc OS keyring của máy nguồn.
- Khi import trên máy mới, ứng dụng tạo master key cục bộ mới rồi re-encrypt API
  key vào `state.db`. Sau khi nhập đúng passphrase, app dùng được ngay với cấu
  hình và credential giống máy nguồn.
- Không khôi phục Web session, bootstrap token, PID/port, CSRF secret, cache hoặc
  runtime lock. Web token lâu dài vẫn dùng được vì hash/salt/metadata được phục
  hồi; người dùng đăng nhập lại bằng plaintext Web token họ đang giữ.
- Sau import thành công, reload database an toàn, invalidate session nếu
  security settings hoặc Web token liên quan đã thay đổi, và ghi audit event.

### 5.5. Web security

- Backend dùng session-side authorization cho mọi route; frontend không giữ
  Bunny API key.
- CSRF token cho mutation, kiểm tra `Origin`/`Host`, CSP chặt, không inline
  script tùy ý, chống clickjacking và MIME sniffing.
- CORS tắt mặc định. Không phục vụ source map production chứa thông tin nhạy cảm.
- WebSocket/SSE (nếu dùng cho progress) phải xác thực session và kiểm tra origin.
- Giới hạn kích thước body/upload, timeout và concurrency; rate limit login lẫn
  operation nguy hiểm.
- Session/token/credential thay đổi được ghi audit log; audit log không chứa body
  nhạy cảm, cookie, header auth hoặc API response secret.
- Web destructive operation dùng cùng policy xác nhận với CLI; `account close`
  luôn yêu cầu nhập chuỗi xác nhận.

### 5.6. UI hiện đại và responsive

Web UI lấy dự án tham chiếu tại
`/home/dev/Desktop/browser-web/notedata` làm chuẩn về cảm giác thị giác và hành
vi responsive. Giữ cùng ngôn ngữ thiết kế, không sao chép logic nghiệp vụ:

- Svelte 5 + TypeScript + Vite cho frontend; build thành static assets và embed
  vào binary Rust để `bunny web open` không cần Node.js ở runtime.
- Font `DM Sans` với fallback system; production ưu tiên self-host font để Web UI
  local không phụ thuộc Google Fonts hoặc kết nối Internet.
- Palette trung tính ấm, surface rõ lớp, accent hổ phách/cam, border nhẹ, shadow
  tiết chế; trạng thái success/warning/danger/info phải có cả màu, icon và text.
- Light/dark theme bằng CSS custom properties và `data-theme`; mặc định theo
  system ở lần đầu, sau đó lưu lựa chọn trong `state.db` theo user/session.
- App shell full-height: topbar cố định, sidebar tài nguyên bên trái, content
  workspace co giãn và không làm toàn trang overflow ngoài ý muốn.

Design tokens khởi điểm đồng điệu với `notedata`, nhưng phải kiểm tra lại contrast:

```css
:root {
  --bg: #f8f6f1;
  --surface: #ffffff;
  --text: #1c1917;
  --text-muted: #78716c;
  --border: #e7e5e4;
  --accent: #f59e0b;
  --danger: #dc2626;
  --success: #16a34a;
  --radius-sm: 8px;
  --radius-md: 10px;
  --shadow-sm: 0 1px 2px rgb(28 25 23 / 6%);
  --shadow-lg: 0 10px 40px rgb(28 25 23 / 10%);
}
```

Dark theme dùng nền gần `#0f0e0d`, surface gần `#1c1917`, text sáng và giữ accent
hổ phách. Không hard-code màu trong component; mọi component dùng semantic token.

Layout responsive:

- Desktop `>= 769px`: sidebar rộng 320px, có thể thu còn 52px; hover/focus hoặc
  nút expand mở lại. Lựa chọn collapse được lưu trong settings.
- Tablet/mobile `<= 768px`: sidebar thành off-canvas drawer trượt từ trái, có
  overlay, đóng bằng Escape, swipe/back hoặc chọn route; focus bị trap trong drawer.
- Mobile topbar gọn, nút menu/search/account tối thiểu 40×40px, ưu tiên touch
  target thực tế 44×44px; search chuyển sang chế độ expanded thay vì ép các nút.
- `<= 480px`: giảm padding/gap, action bar quan trọng có thể sticky ở đáy và dùng
  `env(safe-area-inset-bottom)`; modal lớn chuyển thành full-screen sheet.
- Không đặt minimum width khiến viewport cuộn ngang. Content dùng
  `min-width: 0`, text truncation và overflow cục bộ có chủ đích.

Các màn hình chính:

- Dashboard: connection status, active profile/credential, quick actions, usage
  cards và recent operations.
- Resource explorer: navigation theo 14 nhóm Core API, list/detail/create/edit.
- Credential manager và Web token manager: list, status badge, action menu,
  create/update/rotate/revoke dialog.
- API operation workspace: typed form, request preview đã redact, response
  table/JSON và download.
- Settings: general/theme/server/security/import-export/audit.

Responsive data display:

- Desktop dùng data table có sticky header, sorting/filter/pagination và column
  visibility.
- Tablet ẩn cột phụ vào expandable detail row.
- Mobile chuyển mỗi record thành card/key-value list; action chính hiện trực
  tiếp, action phụ nằm trong overflow menu. Chỉ dùng horizontal scroll cho dữ
  liệu bản chất dạng ma trận hoặc raw JSON.
- Form desktop tối đa hai cột; dưới 768px về một cột. Label luôn hiện, validation
  đặt sát field, destructive action tách khỏi primary action.
- JSON/code viewer dùng monospace, copy button, wrap toggle và viewport riêng.

Component system dùng chung:

- `AppShell`, `Topbar`, `Sidebar`, `MobileDrawer`, `PageHeader`.
- `Button`, `IconButton`, `Input`, `Select`, `Checkbox`, `Switch`,
  `SecretInput`, `DateRange`, `FileDropzone`.
- `Card`, `StatCard`, `DataTable`, `MobileRecordCard`, `Pagination`,
  `EmptyState`, `Skeleton`.
- `Dialog`, `AlertDialog`, `Sheet`, `DropdownMenu`, `Tooltip`, `Toast`.
- `JsonViewer`, `RequestPreview`, `StatusBadge`, `CredentialPicker`.

Dialog hỗ trợ variant default/danger/warning/success/info, đóng bằng Escape và
quản lý focus đúng chuẩn. Toast success/error/info/warning có timeout, pause khi
hover/focus, tối đa sáu item; desktop ở góc trên phải, mobile trải ngang gần đáy
nhưng không che action bar/safe area. Component nặng được lazy-load.

Accessibility và motion:

- Mục tiêu WCAG 2.2 AA: contrast, keyboard-only, visible focus, semantic heading,
  label/description/error association và screen-reader live region.
- Không dùng icon đơn độc nếu ý nghĩa không rõ; mọi icon button có accessible name.
- Tôn trọng `prefers-reduced-motion`; transition drawer/collapse khoảng
  200–250ms và không dùng animation gây cản trở thao tác.
- Hỗ trợ zoom 200%, viewport từ 320px, portrait/landscape và bàn phím ảo mobile.

## 6. Kiến trúc Rust

Workspace đề xuất:

```text
.
├── Cargo.toml
├── crates/
│   ├── bunny-core/        # HTTP client, auth, model, error, pagination
│   ├── bunny-app/         # use case dùng chung, database, policy, audit
│   ├── bunny-cli/         # clap commands, input/output, confirmation
│   └── bunny-web/         # HTTP server, session, Web API, static frontend
├── openapi/core.json
├── web/                   # Svelte 5 frontend source, tokens và components
├── tests/fixtures/
├── scripts/check-openapi-drift.sh
└── PLAN.md
```

Không để generated code tràn vào lớp CLI. `bunny-core` cung cấp API typed ổn định;
code sinh từ OpenAPI (nếu dùng) nằm trong module `generated`, rồi adapter domain
bao bên ngoài. Các module:

- `client`: `BunnyClient`, request builder, user-agent, timeout, retry.
- `credentials`: env/database, redaction, encryption và zeroization.
- `database`: SQLite repository, migration, transaction và backup/restore.
- `web`: router, login/session, CSRF, authorization và static assets.
- `audit`: security event đã redact cho CLI và Web.
- `models`: request/response và pagination.
- `services`: `dns`, `pull_zone`, `storage_zone`, `video_library`, `billing`, ...
- `error`: lỗi transport, HTTP, decode và `ApiErrorData`.
- `commands`: một module cho mỗi top-level resource.
- `output`: table/JSON/YAML, JMESPath, binary/file.
- `confirm`: policy thao tác thay đổi/phá huỷ.

Crate chính dự kiến:

- `clap` + derive: parser và completion.
- `tokio`, `reqwest` với `rustls-tls`: async HTTP, tránh phụ thuộc OpenSSL.
- `serde`, `serde_json`, `serde_yaml`: model/input/output.
- `thiserror`, `anyhow`: lỗi library/CLI.
- `secrecy`, `zeroize`: giữ secret trong memory.
- `keyring`: chỉ bảo vệ master key mã hóa database trên desktop.
- `axum`, `tower`, `tower-http`: Web server và middleware.
- `argon2`, `subtle`: hash Web token và constant-time comparison.
- `cookie`, session store phù hợp: secure server-side Web session.
- `open` hoặc `webbrowser`: mở trình duyệt mặc định.
- Frontend: Svelte 5, TypeScript, Vite; Playwright cho browser test.
- `sqlx` với SQLite hoặc `rusqlite`: settings/vault/token/session/audit.
- `chacha20poly1305`: mã hóa secret trong database và full backup.
- `directories`: xác định home directory đa nền tảng.
- `tabled` hoặc `comfy-table`: output terminal.
- `jmespath`: lọc JSON.
- `tracing`, `tracing-subscriber`: diagnostic có redaction.
- `backoff` hoặc retry tự viết có jitter.
- `wiremock`/`httpmock`, `assert_cmd`, `predicates`, `insta`: kiểm thử.

Ưu tiên model sinh/đồng bộ từ OpenAPI; kiểm tra kỹ các enum nullable, casing
PascalCase của JSON, response rỗng `204`, binary response và schema không đầy đủ.
Không dùng `unwrap`/`expect` trên đường chạy production.

## 7. Xác thực và cấu hình

### 7.1. Thư mục dữ liệu và SQLite

Thư mục dữ liệu mặc định là:

```text
$HOME/.bunny/
├── state.db               # nguồn dữ liệu duy nhất: settings, vault, token, audit
├── state.db-wal           # SQLite WAL khi ứng dụng đang chạy
├── state.db-shm           # SQLite shared memory khi ứng dụng đang chạy
├── web.pid                # trạng thái tiến trình Web, chỉ tồn tại khi chạy
├── web.json               # host/port Web đang chạy, permission hạn chế
└── backups/               # backup rotation trước migration/import
```

- Cho phép ghi đè root bằng `BUNNY_HOME` hoặc global flag `--home`, hữu ích cho
  CI/portable installation. Giá trị mặc định luôn là `$HOME/.bunny`.
- Không tạo `config.json`. Toàn bộ settings, profiles, active credential,
  encrypted Bunny API key, Web token hash, session và audit metadata lưu trực
  tiếp trong `state.db`.
- SQLite bật foreign keys, WAL mode, busy timeout và migration version.
- Tạo directory permission `0700`, file `0600` trên Unix; trên Windows áp ACL
  chỉ cho user hiện tại. Từ chối symlink/owner không đúng khi ghi file nhạy cảm.
- CLI và Web dùng transaction/SQLite locking để không ghi đè lẫn nhau; mutation
  có optimistic version khi người dùng đang sửa form Web cũ.
- Mọi migration tạo SQLite online backup có giới hạn số bản trước khi thực thi.
- `config show-path` in đường dẫn `state.db`; `config init` tạo database và chạy
  migrations.
- Nếu `$HOME` không tồn tại/không ghi được thì báo lỗi rõ ràng, không fallback
  âm thầm sang working directory.

Các bảng tối thiểu: `settings`, `profiles`, `credentials`, `web_tokens`,
`web_sessions`, `security_audit`, `schema_migrations`. Cột secret trong
`credentials` chỉ chứa ciphertext, nonce và key version.

### 7.2. Thứ tự chọn credential

Thứ tự ưu tiên API key:

1. `--api-key` (cảnh báo có thể lộ trong shell history/process list).
2. `BUNNY_API_KEY`.
3. `--credential <name>`.
4. credential active của profile trong encrypted database vault.
5. `api_key_command` tùy chọn (password manager; stdout đúng một secret).

`bunny auth login` đọc key bằng hidden prompt, mã hóa và lưu vào `state.db`.

Không lưu plaintext API key. Nếu hệ điều hành không có keyring để giữ master key,
yêu cầu `BUNNY_MASTER_KEY`/secret manager hoặc passphrase unlock; không âm thầm
hạ cấp sang khóa mã hóa đặt cạnh database.
`auth status` chỉ cho biết nguồn/tên credential và kiểm tra bằng request read-only.
`auth logout` không âm thầm xóa credential vault; dùng `credential delete` cho
việc đó. Log phải redact header `AccessKey`,
`Authorization`, password, token/security key và toàn bộ field nhạy cảm.

## 8. HTTP, lỗi và độ tin cậy

- Gửi `Accept: application/json`, `Content-Type` phù hợp, `User-Agent:
  bunny-cli/<version>`.
- Parse lỗi chuẩn `{ ErrorKey, Field, Message }`, nhưng giữ body thô có giới hạn
  khi server trả schema khác.
- Hiển thị request ID/header chẩn đoán nếu server cung cấp.
- Retry exponential backoff + jitter cho lỗi connect/timeout, `429`, `502`,
  `503`, `504`; tôn trọng `Retry-After`.
- Chỉ tự retry GET/HEAD hoặc request được xác định idempotent. Không retry
  create/update/delete mặc định để tránh tác dụng kép.
- Giới hạn body lỗi và output trong memory; stream PDF/export ra file tạm rồi
  atomic rename.
- Với output JSON, stdout chỉ chứa dữ liệu; progress/warning/error luôn ra stderr.
- Ctrl-C hủy request sạch sẽ và xóa file tạm.

## 9. An toàn thao tác

Phân loại:

- Read-only: chạy ngay.
- Mutating có thể hoàn tác: hỏi khi interactive, cho phép `--yes`.
- Destructive/rotate secret: hiển thị resource, hậu quả và yêu cầu xác nhận.
- `account close`: xác nhận kép như mô tả ở trên.

Thêm `--dry-run` cho mọi command mutating: in method, URL đã redact và body đã
redact, không gửi request. Không in certificate private key, API key, password
hoặc token kể cả với `--verbose`.

## 10. Kiểm thử và tiêu chí chất lượng

### Unit

- Mapping đầy đủ flag/input → method, path, query, body cho 95 operation.
- Precedence credential/profile và redaction.
- CRUD/select nhiều Bunny credential, token hashing/expiry/rotation/revocation.
- Migration/transaction/concurrency/backup cho `$HOME/.bunny/state.db`.
- Import/export versioned, merge/replace, conflict resolution và encrypted backup.
- Full backup restore trên máy mới, re-encryption bằng master key mới và loại bỏ
  runtime-only state.
- Session, scope authorization, CSRF/origin validation và bootstrap token one-time.
- Pagination, date/duration, enum, table rendering, exit-code mapping.
- Error JSON chuẩn và lỗi body không chuẩn.
- Retry chỉ xảy ra đúng method/status.

### Integration bằng mock server

- Header `AccessKey` được gắn đúng và không xuất hiện trong snapshot lỗi.
- Fixture success cho JSON, `204`, pagination và binary download.
- `400/401/403/404/429/500`, timeout, malformed JSON, disconnect.
- Xác nhận, `--yes`, `--dry-run`, pipe stdin/stdout và atomic file output.
- CLI và Web cùng use case phải sinh request Bunny giống nhau.
- Browser không nhận Bunny key; Web API không trả plaintext credential/token.
- Login brute force/rate limit, cookie flags, revoked token và expired session.
- Web import preview diff/rollback; export không-secret và backup mã hóa.
- Concurrent CLI/Web database mutation không làm mất dữ liệu hoặc hỏng database.
- UI giữ đúng layout ở 320/375/768/1024/1440px; sidebar/drawer/topbar/table/card
  chuyển trạng thái đúng breakpoint.
- Light/dark visual regression, keyboard navigation, focus trap, reduced motion,
  zoom 200% và axe accessibility scan không có lỗi nghiêm trọng.
- Test contract tự đọc OpenAPI: tập `(method, path, operationId)` phải khớp
  registry command; thiếu operation làm CI fail.

### Live smoke test (opt-in)

Chỉ chạy khi có `BUNNY_API_KEY` và `BUNNY_LIVE_TEST=1`. Mặc định chỉ read-only
(`country`, `region`, list/get). Test tạo/xóa tài nguyên cần account sandbox riêng
và biến xác nhận thứ hai; cleanup chạy kể cả test fail.

### CI

```text
cargo fmt --check
cargo clippy --workspace --all-targets --all-features -- -D warnings
cargo test --workspace --all-features
cargo deny check
cargo audit
OpenAPI coverage + drift check
```

Mục tiêu: Rust stable + MSRV được ghi rõ, Linux/macOS/Windows, không secret trong
artifact/log, coverage logic client/command tối thiểu 80%.

## 11. Lộ trình triển khai

### Giai đoạn 0 — Baseline và contract

- Khởi tạo workspace, pin toolchain/MSRV, license, CI.
- Lưu OpenAPI snapshot và sinh manifest 95 operation.
- Chốt naming CLI, conventions, exit code và destructive policy.
- Hoàn thành khi contract test nhận đúng 95/95 operation.

### Giai đoạn 1 — Nền tảng dùng được

- Client, `AccessKey`, profile/database/env, error/retry/redaction.
- Vault nhiều Bunny credential với CRUD/list/select dùng chung.
- `$HOME/.bunny/state.db` là source of truth, schema migration và transaction.
- Config validate/import/export, merge/replace và encrypted secret backup.
- Kiểm thử restore full backup sang home rỗng với master key mới và dùng ngay.
- Output JSON/YAML/table, pagination, confirmation, `--dry-run`.
- `auth`, `config`, `completion`, `api request`.
- Hoàn thành khi mock test auth/error/output chạy trên ba hệ điều hành.

### Giai đoạn 2 — CDN/DNS

- Country, Region, Pull Zone, Purge, DNS Zone/Record.
- Ưu tiên CRUD, hostname/certificate, edge rule, DNSSEC, import/export/scan.
- Hoàn thành khi 50/95 operation có command và contract test.

### Giai đoạn 3 — Storage/Stream Core

- Storage Zone và Stream Video Library đủ 31 operation.
- Bảo vệ password/library key response; binary upload watermark/thumbnail.
- Hoàn thành khi 81/95 operation có command và test.

### Giai đoạn 4 — Quan sát và tài khoản

- Statistics, Search, Audit, Billing, API Keys, Affiliate, Account.
- PDF download atomic, xác nhận kép close account.
- Hoàn thành khi đạt 95/95 và không còn operation chưa map.

### Giai đoạn 5 — Web UI và access token

- `bunny-web`, local server, tự mở browser và health/lifecycle management.
- Svelte design system đồng điệu `notedata`, light/dark theme và responsive app shell.
- Web token CRUD/rotate/revoke, bootstrap login, session/cookie/CSRF/scopes.
- Web credential CRUD/list/select/test và form cho 95 Core operations.
- Web Settings import/export, preview diff, conflict resolution và rollback.
- Security headers, audit, rate limit và kiểm thử browser/API.
- Hoàn thành khi CLI/Web dùng chung vault/use case, không secret nào tới frontend,
  và full Web security integration test xanh.

### Giai đoạn 6 — Hardening và phát hành

- Shell completion/man pages, tài liệu ví dụ/migration.
- Package: crates.io, GitHub Release binaries có checksum; Homebrew/Scoop tùy
  nhu cầu.
- Supply-chain scan, reproducible release, changelog và semantic versioning.
- Release candidate phải vượt live read-only smoke test và security review.

## 12. Definition of Done v1.0

- `bunny --help` dẫn tới toàn bộ 95 Core operation.
- Contract test chứng minh 95/95 method/path/operationId được bao phủ.
- API key không xuất hiện trong config plaintext, stdout, stderr, log hoặc test
  snapshot.
- CLI và Web đều CRUD/list/select được nhiều Bunny credential mà không trả lại
  plaintext key; active credential nhất quán theo profile.
- Web mở được bằng browser, login qua Web token riêng, hỗ trợ expiry/scope/
  rotation/revocation và bootstrap token dùng một lần.
- Web chỉ bind loopback mặc định; session, CSRF, origin, CSP, rate limit và audit
  vượt integration/security test.
- UI hiện đại đồng điệu dự án `notedata`, responsive từ 320px tới desktop, có
  dark/light theme và đạt WCAG 2.2 AA.
- Settings và state được lưu duy nhất tại `$HOME/.bunny/state.db`; không tạo
  `config.json`; CLI/Web mutation dùng transaction và migration an toàn.
- Web import/export hỗ trợ schema version, preview/merge/replace; export mặc định
  không có secret và backup có secret luôn được mã hóa.
- Full encrypted backup phục hồi được trên máy mới: settings/profile/API key/
  active selection/Web token giống máy nguồn; session và runtime state không
  được phục hồi và người dùng phải đăng nhập Web lại.
- Script dùng JSON ổn định; interactive dùng table và confirmation rõ ràng.
- Xử lý đúng pagination, binary, `204`, error model và rate limit.
- Linux/macOS/Windows CI xanh; fmt/clippy/test/audit/deny xanh.
- README có quickstart, credential precedence, ví dụ theo resource và cảnh báo
  credential riêng của Storage/Stream content APIs.
- OpenAPI snapshot, ngày đồng bộ và quy trình drift được công bố.

## 13. Hướng mở rộng sau v1

Tạo credential store đa loại (`account`, `storage`, `stream`, `shield`,
`scripting`, `containers`) và thêm các crate client riêng. Khi đó có thể mở rộng
CLI cho Storage file operations, Stream video/collection, Shield, Edge
Scripting, CDN Logging, Origin Errors và Magic Containers mà không phá cấu trúc
command/profile hiện tại.
