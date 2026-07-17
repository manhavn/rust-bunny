use std::{net::SocketAddr, sync::Arc};

use anyhow::Result;
use axum::{
    Json, Router,
    extract::{Path, State},
    http::{HeaderMap, StatusCode, header},
    response::{Html, IntoResponse, Response},
    routing::{delete, get, post},
};
use bunny_app::Database;
use bunny_core::BunnyClient;
use http::Method;
use secrecy::ExposeSecret;
use serde::Deserialize;
use serde_json::json;
use tokio::net::TcpListener;

#[derive(Clone)]
struct WebState {
    database: Database,
}

pub async fn serve(database: Database, address: SocketAddr, open_browser: bool) -> Result<()> {
    let listener = TcpListener::bind(address).await?;
    let local = listener.local_addr()?;
    let url = format!("http://{local}");
    if open_browser {
        open::that(&url)?;
    }
    tracing::info!(%url, "Bunny Web is ready");
    axum::serve(listener, router(database)).await?;
    Ok(())
}

fn router(database: Database) -> Router {
    Router::new()
        .route("/", get(index))
        .route("/assets/app.js", get(app_js))
        .route("/assets/app.css", get(app_css))
        .route("/healthz", get(|| async { Json(json!({"status": "ok"})) }))
        .route("/api/login", post(login))
        .route("/api/profiles", get(profiles))
        .route("/api/credentials", get(credentials).post(add_credential))
        .route(
            "/api/credentials/{id}",
            delete(delete_credential).patch(update_credential),
        )
        .route("/api/credentials/{id}/select", post(select_credential))
        .route("/api/web-tokens", get(web_tokens).post(create_web_token))
        .route("/api/web-tokens/{id}", delete(delete_web_token))
        .route("/api/web-tokens/{id}/revoke", post(revoke_web_token))
        .route("/api/web-tokens/{id}/rotate", post(rotate_web_token))
        .route("/api/operations", get(operations))
        .route("/api/operations/{id}/run", post(run_operation))
        .route("/api/config/export", post(export_config))
        .route("/api/config/import", post(import_config))
        .with_state(Arc::new(WebState { database }))
}

async fn index() -> Html<&'static str> {
    Html(include_str!("../../../web/dist/index.html"))
}

async fn app_js() -> impl IntoResponse {
    (
        [(header::CONTENT_TYPE, "text/javascript; charset=utf-8")],
        include_bytes!("../../../web/dist/assets/app.js").as_slice(),
    )
}

async fn app_css() -> impl IntoResponse {
    (
        [(header::CONTENT_TYPE, "text/css; charset=utf-8")],
        include_bytes!("../../../web/dist/assets/app.css").as_slice(),
    )
}

#[derive(Deserialize)]
struct LoginRequest {
    token: String,
}

async fn login(State(state): State<Arc<WebState>>, Json(input): Json<LoginRequest>) -> Response {
    match state.database.verify_web_token(&input.token) {
        Ok(token) => Json(json!({"token": token, "authenticated": true})).into_response(),
        Err(_) => (
            StatusCode::UNAUTHORIZED,
            Json(json!({"error": "invalid or expired Web token"})),
        )
            .into_response(),
    }
}

fn authorized(headers: &HeaderMap, state: &WebState) -> bool {
    headers
        .get(header::AUTHORIZATION)
        .and_then(|value| value.to_str().ok())
        .and_then(|value| value.strip_prefix("Bearer "))
        .is_some_and(|token| state.database.verify_web_token(token).is_ok())
}

async fn profiles(State(state): State<Arc<WebState>>, headers: HeaderMap) -> Response {
    if !authorized(&headers, &state) {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    match state.database.profiles() {
        Ok(value) => Json(value).into_response(),
        Err(error) => internal_error(error),
    }
}

async fn credentials(State(state): State<Arc<WebState>>, headers: HeaderMap) -> Response {
    if !authorized(&headers, &state) {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    match state.database.credentials(None) {
        Ok(value) => Json(value).into_response(),
        Err(error) => internal_error(error),
    }
}

#[derive(Deserialize)]
struct AddCredentialRequest {
    profile: String,
    name: String,
    api_key: String,
}

async fn add_credential(
    State(state): State<Arc<WebState>>,
    headers: HeaderMap,
    Json(input): Json<AddCredentialRequest>,
) -> Response {
    if !authorized(&headers, &state) {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    match state.database.add_credential(
        &input.profile,
        &input.name,
        &secrecy::SecretString::from(input.api_key),
    ) {
        Ok(value) => (StatusCode::CREATED, Json(value)).into_response(),
        Err(error) => bad_request(error),
    }
}

async fn delete_credential(
    State(state): State<Arc<WebState>>,
    headers: HeaderMap,
    Path(id): Path<String>,
) -> Response {
    if !authorized(&headers, &state) {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    match state.database.delete_credential("default", &id) {
        Ok(()) => StatusCode::NO_CONTENT.into_response(),
        Err(error) => bad_request(error),
    }
}

#[derive(Deserialize)]
struct UpdateCredentialRequest {
    name: Option<String>,
    api_key: Option<String>,
}

async fn update_credential(
    State(state): State<Arc<WebState>>,
    headers: HeaderMap,
    Path(id): Path<String>,
    Json(input): Json<UpdateCredentialRequest>,
) -> Response {
    if !authorized(&headers, &state) {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    let secret = input.api_key.map(secrecy::SecretString::from);
    match state
        .database
        .update_credential("default", &id, input.name.as_deref(), secret.as_ref())
    {
        Ok(value) => Json(value).into_response(),
        Err(error) => bad_request(error),
    }
}

async fn select_credential(
    State(state): State<Arc<WebState>>,
    headers: HeaderMap,
    Path(id): Path<String>,
) -> Response {
    if !authorized(&headers, &state) {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    match state.database.select_credential("default", &id) {
        Ok(()) => Json(json!({"selected": true})).into_response(),
        Err(error) => bad_request(error),
    }
}

async fn web_tokens(State(state): State<Arc<WebState>>, headers: HeaderMap) -> Response {
    if !authorized(&headers, &state) {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    match state.database.web_tokens() {
        Ok(value) => Json(value).into_response(),
        Err(error) => internal_error(error),
    }
}

#[derive(Deserialize)]
struct CreateWebTokenRequest {
    name: String,
    #[serde(default)]
    scopes: Vec<String>,
}

async fn create_web_token(
    State(state): State<Arc<WebState>>,
    headers: HeaderMap,
    Json(input): Json<CreateWebTokenRequest>,
) -> Response {
    if !authorized(&headers, &state) {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    match state
        .database
        .create_web_token(&input.name, &input.scopes, None)
    {
        Ok(value) => (
            StatusCode::CREATED,
            Json(json!({
                "metadata": value.metadata,
                "token": value.plaintext.expose_secret()
            })),
        )
            .into_response(),
        Err(error) => bad_request(error),
    }
}

async fn revoke_web_token(
    State(state): State<Arc<WebState>>,
    headers: HeaderMap,
    Path(id): Path<String>,
) -> Response {
    if !authorized(&headers, &state) {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    match state.database.revoke_web_token(&id) {
        Ok(()) => StatusCode::NO_CONTENT.into_response(),
        Err(error) => bad_request(error),
    }
}

async fn rotate_web_token(
    State(state): State<Arc<WebState>>,
    headers: HeaderMap,
    Path(id): Path<String>,
) -> Response {
    if !authorized(&headers, &state) {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    match state.database.rotate_web_token(&id) {
        Ok(value) => Json(json!({
            "metadata": value.metadata,
            "token": value.plaintext.expose_secret()
        }))
        .into_response(),
        Err(error) => bad_request(error),
    }
}

async fn delete_web_token(
    State(state): State<Arc<WebState>>,
    headers: HeaderMap,
    Path(id): Path<String>,
) -> Response {
    if !authorized(&headers, &state) {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    match state.database.delete_web_token(&id) {
        Ok(()) => StatusCode::NO_CONTENT.into_response(),
        Err(error) => bad_request(error),
    }
}

async fn operations(State(state): State<Arc<WebState>>, headers: HeaderMap) -> Response {
    if !authorized(&headers, &state) {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    Json(bunny_core::OPERATIONS).into_response()
}

#[derive(Deserialize)]
struct RunOperationRequest {
    #[serde(default = "default_profile")]
    profile: String,
    #[serde(default)]
    params: std::collections::HashMap<String, String>,
    #[serde(default)]
    query: Vec<(String, String)>,
    body: Option<serde_json::Value>,
    #[serde(default)]
    confirm: bool,
}

fn default_profile() -> String {
    "default".into()
}

async fn run_operation(
    State(state): State<Arc<WebState>>,
    headers: HeaderMap,
    Path(id): Path<String>,
    Json(input): Json<RunOperationRequest>,
) -> Response {
    if !authorized(&headers, &state) {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    let Some(operation) = bunny_core::operation(&id) else {
        return (
            StatusCode::NOT_FOUND,
            Json(json!({"error": "operation not found"})),
        )
            .into_response();
    };
    if operation.destructive && !input.confirm {
        return (
            StatusCode::PRECONDITION_REQUIRED,
            Json(json!({"error": "destructive operation requires confirmation"})),
        )
            .into_response();
    }
    let mut path = operation.path.to_owned();
    for (key, value) in &input.params {
        path = path.replace(&format!("{{{key}}}"), value);
    }
    if path.contains('{') {
        return (
            StatusCode::BAD_REQUEST,
            Json(json!({"error": "missing path parameter"})),
        )
            .into_response();
    }
    let (profile, secret) = match state.database.active_secret(&input.profile) {
        Ok(value) => value,
        Err(error) => return bad_request(error),
    };
    let method = match Method::from_bytes(operation.method.as_bytes()) {
        Ok(value) => value,
        Err(error) => return internal_error(error.into()),
    };
    let client =
        match BunnyClient::new(profile.base_url, secret, std::time::Duration::from_secs(30)) {
            Ok(value) => value,
            Err(error) => return internal_error(error.into()),
        };
    match client
        .request(method, &path, &input.query, input.body)
        .await
    {
        Ok(response) => match response.json() {
            Ok(value) => Json(value).into_response(),
            Err(_) => (
                [(header::CONTENT_TYPE, "application/octet-stream")],
                response.body,
            )
                .into_response(),
        },
        Err(error) => bad_request(error.into()),
    }
}

fn bad_request(error: anyhow::Error) -> Response {
    (
        StatusCode::BAD_REQUEST,
        Json(json!({"error": error.to_string()})),
    )
        .into_response()
}

fn internal_error(error: anyhow::Error) -> Response {
    tracing::error!(error = %error, "Web request failed");
    (
        StatusCode::INTERNAL_SERVER_ERROR,
        Json(json!({"error": "internal error"})),
    )
        .into_response()
}

#[derive(Deserialize)]
struct ExportRequest {
    #[serde(default)]
    include_secrets: bool,
    passphrase: Option<String>,
}

async fn export_config(
    State(state): State<Arc<WebState>>,
    headers: HeaderMap,
    Json(input): Json<ExportRequest>,
) -> Response {
    if !authorized(&headers, &state) {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    if input.include_secrets {
        let Some(passphrase) = input.passphrase.filter(|value| !value.is_empty()) else {
            return bad_request(anyhow::anyhow!(
                "passphrase is required when exporting secrets"
            ));
        };
        match state
            .database
            .backup(&secrecy::SecretString::from(passphrase))
        {
            Ok(value) => Json(value).into_response(),
            Err(error) => internal_error(error),
        }
    } else {
        match state.database.export(false) {
            Ok(value) => Json(value).into_response(),
            Err(error) => internal_error(error),
        }
    }
}

#[derive(Deserialize)]
struct ImportRequest {
    data: serde_json::Value,
    passphrase: Option<String>,
    #[serde(default)]
    replace: bool,
}

async fn import_config(
    State(state): State<Arc<WebState>>,
    headers: HeaderMap,
    Json(input): Json<ImportRequest>,
) -> Response {
    if !authorized(&headers, &state) {
        return StatusCode::UNAUTHORIZED.into_response();
    }
    let data = if input.data.get("ciphertext").is_some() {
        let envelope = match serde_json::from_value::<bunny_app::BackupEnvelope>(input.data) {
            Ok(value) => value,
            Err(error) => return bad_request(error.into()),
        };
        let Some(passphrase) = input.passphrase else {
            return bad_request(anyhow::anyhow!("backup passphrase is required"));
        };
        match envelope.open(&secrecy::SecretString::from(passphrase)) {
            Ok(value) => value,
            Err(error) => return bad_request(error),
        }
    } else {
        match serde_json::from_value::<bunny_app::ExportData>(input.data) {
            Ok(value) => value,
            Err(error) => return bad_request(error.into()),
        }
    };
    match state.database.restore(&data, input.replace) {
        Ok(()) => Json(json!({"imported": true})).into_response(),
        Err(error) => bad_request(error),
    }
}
