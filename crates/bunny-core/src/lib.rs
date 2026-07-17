use std::time::Duration;

use reqwest::{Method, StatusCode};
use secrecy::{ExposeSecret, SecretString};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use thiserror::Error;

pub const DEFAULT_BASE_URL: &str = "https://api.bunny.net";
mod operations;
pub use operations::{OPERATIONS, Operation, operation};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "PascalCase")]
pub struct ApiErrorData {
    pub error_key: Option<String>,
    pub field: Option<String>,
    pub message: Option<String>,
}

#[derive(Debug, Error)]
pub enum Error {
    #[error("invalid base URL or request path: {0}")]
    InvalidUrl(String),
    #[error("request failed: {0}")]
    Transport(#[from] reqwest::Error),
    #[error("Bunny API returned HTTP {status}: {message}")]
    Api {
        status: StatusCode,
        message: String,
        details: Option<ApiErrorData>,
    },
}

#[derive(Debug, Clone)]
pub struct ApiResponse {
    pub status: StatusCode,
    pub content_type: Option<String>,
    pub body: Vec<u8>,
}

impl ApiResponse {
    pub fn json(&self) -> Result<Value, serde_json::Error> {
        if self.body.is_empty() {
            Ok(Value::Null)
        } else {
            serde_json::from_slice(&self.body)
        }
    }
}

#[derive(Clone)]
pub struct BunnyClient {
    http: reqwest::Client,
    base_url: String,
    api_key: SecretString,
}

impl BunnyClient {
    pub fn new(
        base_url: impl Into<String>,
        api_key: SecretString,
        timeout: Duration,
    ) -> Result<Self, Error> {
        let base_url = base_url.into().trim_end_matches('/').to_owned();
        reqwest::Url::parse(&base_url).map_err(|e| Error::InvalidUrl(e.to_string()))?;
        let http = reqwest::Client::builder()
            .timeout(timeout)
            .user_agent(concat!("bunny-cli/", env!("CARGO_PKG_VERSION")))
            .build()?;
        Ok(Self {
            http,
            base_url,
            api_key,
        })
    }

    pub async fn request(
        &self,
        method: Method,
        path: &str,
        query: &[(String, String)],
        body: Option<Value>,
    ) -> Result<ApiResponse, Error> {
        if !path.starts_with('/') || path.starts_with("//") {
            return Err(Error::InvalidUrl(
                "path must be relative and start with exactly one '/'".into(),
            ));
        }
        let url = format!("{}{}", self.base_url, path);
        let mut request = self
            .http
            .request(method, url)
            .header("AccessKey", self.api_key.expose_secret())
            .header("Accept", "application/json")
            .query(query);
        if let Some(body) = body {
            request = request.json(&body);
        }
        let response = request.send().await?;
        let status = response.status();
        let content_type = response
            .headers()
            .get(reqwest::header::CONTENT_TYPE)
            .and_then(|value| value.to_str().ok())
            .map(str::to_owned);
        let body = response.bytes().await?.to_vec();
        if !status.is_success() {
            let details = serde_json::from_slice::<ApiErrorData>(&body).ok();
            let message = details
                .as_ref()
                .and_then(|error| error.message.clone())
                .or_else(|| {
                    let text = String::from_utf8_lossy(&body);
                    (!text.is_empty()).then(|| text.chars().take(500).collect())
                })
                .unwrap_or_else(|| status.canonical_reason().unwrap_or("API error").into());
            return Err(Error::Api {
                status,
                message,
                details,
            });
        }
        Ok(ApiResponse {
            status,
            content_type,
            body,
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn empty_response_is_null_json() {
        let response = ApiResponse {
            status: StatusCode::NO_CONTENT,
            content_type: None,
            body: Vec::new(),
        };
        assert_eq!(response.json().unwrap(), Value::Null);
    }
}
