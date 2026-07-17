use std::path::{Path, PathBuf};

use anyhow::{Context, Result};
use directories::BaseDirs;

#[derive(Debug, Clone)]
pub struct AppHome {
    root: PathBuf,
}

impl AppHome {
    pub fn discover(override_path: Option<&Path>) -> Result<Self> {
        let root = if let Some(path) = override_path {
            path.to_path_buf()
        } else if let Some(path) = std::env::var_os("BUNNY_HOME") {
            PathBuf::from(path)
        } else {
            BaseDirs::new()
                .context("HOME directory is not available")?
                .home_dir()
                .join(".bunny")
        };
        std::fs::create_dir_all(&root)
            .with_context(|| format!("failed to create {}", root.display()))?;
        #[cfg(unix)]
        {
            use std::os::unix::fs::PermissionsExt;
            std::fs::set_permissions(&root, std::fs::Permissions::from_mode(0o700))?;
        }
        Ok(Self { root })
    }

    pub fn root(&self) -> &Path {
        &self.root
    }

    pub fn database(&self) -> PathBuf {
        self.root.join("state.db")
    }

    pub fn web_state(&self) -> PathBuf {
        self.root.join("web.json")
    }
}
