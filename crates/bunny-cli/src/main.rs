use std::{
    net::{IpAddr, SocketAddr},
    path::PathBuf,
    str::FromStr,
    time::Duration,
};

use anyhow::{Context, Result, bail};
use bunny_app::{AppHome, BackupEnvelope, Database};
use bunny_core::BunnyClient;
use clap::{Args, Parser, Subcommand, ValueEnum};
use reqwest::Method;
use secrecy::{ExposeSecret, SecretString};
use serde_json::Value;

#[derive(Parser)]
#[command(
    name = "bunny",
    version,
    about = "Manage bunny.net from the terminal and browser"
)]
struct Cli {
    #[arg(long, global = true, default_value = "default")]
    profile: String,
    #[arg(long, global = true)]
    home: Option<PathBuf>,
    #[arg(long, global = true, value_enum, default_value = "json")]
    output: Output,
    #[arg(long, global = true, env = "BUNNY_API_KEY", hide_env_values = true)]
    api_key: Option<String>,
    #[command(subcommand)]
    command: Command,
}

#[derive(Clone, Copy, ValueEnum)]
enum Output {
    Json,
    Yaml,
}

#[derive(Subcommand)]
enum Command {
    Auth {
        #[command(subcommand)]
        command: AuthCommand,
    },
    Credential {
        #[command(subcommand)]
        command: CredentialCommand,
    },
    WebToken {
        #[command(subcommand)]
        command: WebTokenCommand,
    },
    Web {
        #[command(subcommand)]
        command: WebCommand,
    },
    Config {
        #[command(subcommand)]
        command: ConfigCommand,
    },
    Core {
        #[command(subcommand)]
        command: CoreCommand,
    },
    Api(ApiArgs),
}

#[derive(Subcommand)]
enum AuthCommand {
    Login {
        #[arg(long, default_value = "default")]
        name: String,
    },
    Status,
}

#[derive(Subcommand)]
enum CredentialCommand {
    Add {
        name: String,
        #[arg(long)]
        api_key: Option<String>,
    },
    List,
    Select {
        name: String,
    },
    Update {
        name: String,
        #[arg(long)]
        rename: Option<String>,
        #[arg(long)]
        replace_key: bool,
    },
    Current,
    Delete {
        name: String,
        #[arg(long)]
        yes: bool,
    },
}

#[derive(Subcommand)]
enum WebTokenCommand {
    Create {
        #[arg(long)]
        name: String,
        #[arg(long, value_delimiter = ',', default_value = "read,operate")]
        scope: Vec<String>,
    },
    List,
    Revoke {
        id: String,
    },
    Rotate {
        id: String,
    },
    Delete {
        id: String,
        #[arg(long)]
        yes: bool,
    },
}

#[derive(Subcommand)]
enum WebCommand {
    Serve {
        #[arg(long, default_value = "127.0.0.1")]
        host: IpAddr,
        #[arg(long, default_value_t = 7331)]
        port: u16,
        #[arg(long)]
        no_open: bool,
    },
    Open {
        #[arg(long, default_value_t = 7331)]
        port: u16,
    },
}

#[derive(Subcommand)]
enum ConfigCommand {
    ShowPath,
    Export {
        #[arg(long)]
        out: PathBuf,
    },
    Backup {
        #[arg(long)]
        out: PathBuf,
    },
    Import {
        file: PathBuf,
        #[arg(long)]
        replace: bool,
    },
    Validate {
        file: PathBuf,
    },
}

#[derive(Subcommand)]
enum CoreCommand {
    List {
        #[arg(long)]
        group: Option<String>,
    },
    Run {
        operation: String,
        #[arg(long = "param", value_parser = parse_key_value)]
        param: Vec<(String, String)>,
        #[arg(long = "query", value_parser = parse_key_value)]
        query: Vec<(String, String)>,
        #[arg(long)]
        body: Option<PathBuf>,
        #[arg(long)]
        out: Option<PathBuf>,
        #[arg(long)]
        yes: bool,
    },
}

#[derive(Args)]
struct ApiArgs {
    method: String,
    path: String,
    #[arg(long = "query", value_parser = parse_key_value)]
    query: Vec<(String, String)>,
    #[arg(long)]
    body: Option<PathBuf>,
    #[arg(long)]
    out: Option<PathBuf>,
}

fn parse_key_value(value: &str) -> Result<(String, String), String> {
    value
        .split_once('=')
        .map(|(key, value)| (key.to_owned(), value.to_owned()))
        .ok_or_else(|| "expected KEY=VALUE".into())
}

#[tokio::main]
async fn main() {
    if let Err(error) = run().await {
        eprintln!("error: {error:#}");
        std::process::exit(1);
    }
}

async fn run() -> Result<()> {
    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .with_target(false)
        .init();
    let cli = Cli::parse();
    let home = AppHome::discover(cli.home.as_deref())?;
    let database = Database::open(&home.database())?;

    match cli.command {
        Command::Auth { command } => match command {
            AuthCommand::Login { name } => {
                let secret = SecretString::from(rpassword::prompt_password("Bunny API key: ")?);
                let credential = database.add_credential(&cli.profile, &name, &secret)?;
                database.select_credential(&cli.profile, &credential.id)?;
                print_value(&credential, cli.output)?;
            }
            AuthCommand::Status => {
                let (profile, _) = resolve_credential(&database, &cli.profile, cli.api_key)?;
                print_value(&profile, cli.output)?;
            }
        },
        Command::Credential { command } => match command {
            CredentialCommand::Add { name, api_key } => {
                let value = match api_key {
                    Some(value) => value,
                    None => rpassword::prompt_password("Bunny API key: ")?,
                };
                let credential =
                    database.add_credential(&cli.profile, &name, &SecretString::from(value))?;
                print_value(&credential, cli.output)?;
            }
            CredentialCommand::List => {
                print_value(&database.credentials(Some(&cli.profile))?, cli.output)?;
            }
            CredentialCommand::Select { name } => {
                database.select_credential(&cli.profile, &name)?;
                println!(
                    "Selected credential '{name}' for profile '{}'.",
                    cli.profile
                );
            }
            CredentialCommand::Update {
                name,
                rename,
                replace_key,
            } => {
                let secret = replace_key
                    .then(|| rpassword::prompt_password("New Bunny API key: "))
                    .transpose()?
                    .map(SecretString::from);
                let value = database.update_credential(
                    &cli.profile,
                    &name,
                    rename.as_deref(),
                    secret.as_ref(),
                )?;
                print_value(&value, cli.output)?;
            }
            CredentialCommand::Current => {
                let (profile, _) = database.active_secret(&cli.profile)?;
                print_value(&profile, cli.output)?;
            }
            CredentialCommand::Delete { name, yes } => {
                if !yes {
                    bail!("refusing to delete without --yes");
                }
                database.delete_credential(&cli.profile, &name)?;
            }
        },
        Command::WebToken { command } => match command {
            WebTokenCommand::Create { name, scope } => {
                let token = database.create_web_token(&name, &scope, None)?;
                print_value(&token.metadata, cli.output)?;
                eprintln!("Web token (shown once):");
                println!("{}", token.plaintext.expose_secret());
            }
            WebTokenCommand::List => print_value(&database.web_tokens()?, cli.output)?,
            WebTokenCommand::Revoke { id } => database.revoke_web_token(&id)?,
            WebTokenCommand::Rotate { id } => {
                let token = database.rotate_web_token(&id)?;
                print_value(&token.metadata, cli.output)?;
                eprintln!("Web token (shown once):");
                println!("{}", token.plaintext.expose_secret());
            }
            WebTokenCommand::Delete { id, yes } => {
                if !yes {
                    bail!("refusing to delete without --yes");
                }
                database.delete_web_token(&id)?;
            }
        },
        Command::Web { command } => match command {
            WebCommand::Serve {
                host,
                port,
                no_open,
            } => {
                bunny_web::serve(database, SocketAddr::new(host, port), !no_open).await?;
            }
            WebCommand::Open { port } => {
                open::that(format!("http://127.0.0.1:{port}"))?;
            }
        },
        Command::Config { command } => match command {
            ConfigCommand::ShowPath => println!("{}", home.database().display()),
            ConfigCommand::Export { out } => {
                let data = database.export(false)?;
                write_json(&out, &data)?;
            }
            ConfigCommand::Backup { out } => {
                let passphrase =
                    SecretString::from(rpassword::prompt_password("Backup passphrase: ")?);
                let confirmation =
                    SecretString::from(rpassword::prompt_password("Confirm passphrase: ")?);
                if passphrase.expose_secret() != confirmation.expose_secret() {
                    bail!("passphrases do not match");
                }
                write_json(&out, &database.backup(&passphrase)?)?;
            }
            ConfigCommand::Import { file, replace } => {
                let bytes = std::fs::read(&file)?;
                let data = if let Ok(envelope) = serde_json::from_slice::<BackupEnvelope>(&bytes) {
                    let passphrase =
                        SecretString::from(rpassword::prompt_password("Backup passphrase: ")?);
                    envelope.open(&passphrase)?
                } else {
                    serde_json::from_slice::<bunny_app::ExportData>(&bytes)?
                };
                database.restore(&data, replace)?;
                println!("Configuration imported successfully.");
            }
            ConfigCommand::Validate { file } => {
                let bytes = std::fs::read(&file)?;
                if serde_json::from_slice::<BackupEnvelope>(&bytes).is_ok()
                    || serde_json::from_slice::<bunny_app::ExportData>(&bytes).is_ok()
                {
                    println!("Valid Bunny configuration file.");
                } else {
                    bail!("file is not a recognized Bunny export or backup");
                }
            }
        },
        Command::Core { command } => match command {
            CoreCommand::List { group } => {
                let operations = bunny_core::OPERATIONS
                    .iter()
                    .filter(|operation| {
                        group
                            .as_deref()
                            .is_none_or(|value| operation.group == value)
                    })
                    .collect::<Vec<_>>();
                print_value(&operations, cli.output)?;
            }
            CoreCommand::Run {
                operation,
                param,
                query,
                body,
                out,
                yes,
            } => {
                let operation = bunny_core::operation(&operation)
                    .with_context(|| format!("unknown Core operation '{operation}'"))?;
                if operation.destructive && !yes {
                    bail!("operation is destructive; inspect it and pass --yes to continue");
                }
                let path = fill_path(operation.path, &param)?;
                let body = body
                    .map(std::fs::read)
                    .transpose()?
                    .map(|bytes| serde_json::from_slice::<Value>(&bytes))
                    .transpose()?;
                let (_, secret) = resolve_credential(&database, &cli.profile, cli.api_key)?;
                let profile = database
                    .profiles()?
                    .into_iter()
                    .find(|profile| profile.name == cli.profile || profile.id == cli.profile)
                    .context("profile not found")?;
                let client = BunnyClient::new(profile.base_url, secret, Duration::from_secs(30))?;
                let response = client
                    .request(Method::from_str(operation.method)?, &path, &query, body)
                    .await?;
                if let Some(path) = out {
                    std::fs::write(path, response.body)?;
                } else {
                    print_value(&response.json()?, cli.output)?;
                }
            }
        },
        Command::Api(args) => {
            let (_, secret) = resolve_credential(&database, &cli.profile, cli.api_key)?;
            let profile = database
                .profiles()?
                .into_iter()
                .find(|profile| profile.name == cli.profile || profile.id == cli.profile)
                .context("profile not found")?;
            let method = Method::from_str(&args.method.to_uppercase())?;
            let body = args
                .body
                .map(std::fs::read)
                .transpose()?
                .map(|bytes| serde_json::from_slice::<Value>(&bytes))
                .transpose()?;
            let client = BunnyClient::new(profile.base_url, secret, Duration::from_secs(30))?;
            let response = client
                .request(method, &args.path, &args.query, body)
                .await?;
            if let Some(path) = args.out {
                std::fs::write(path, response.body)?;
            } else {
                match response.json() {
                    Ok(value) => print_value(&value, cli.output)?,
                    Err(_) => println!("{}", String::from_utf8_lossy(&response.body)),
                }
            }
        }
    }
    Ok(())
}

fn fill_path(template: &str, params: &[(String, String)]) -> Result<String> {
    let mut path = template.to_owned();
    for (key, value) in params {
        path = path.replace(&format!("{{{key}}}"), value);
    }
    if path.contains('{') {
        bail!("missing one or more --param values for path template '{template}'");
    }
    Ok(path)
}

fn resolve_credential(
    database: &Database,
    profile: &str,
    override_key: Option<String>,
) -> Result<(bunny_app::Profile, SecretString)> {
    if let Some(key) = override_key {
        let profile_data = database
            .profiles()?
            .into_iter()
            .find(|item| item.name == profile || item.id == profile)
            .context("profile not found")?;
        Ok((profile_data, SecretString::from(key)))
    } else {
        database.active_secret(profile)
    }
}

fn print_value(value: &impl serde::Serialize, output: Output) -> Result<()> {
    match output {
        Output::Json => println!("{}", serde_json::to_string_pretty(value)?),
        Output::Yaml => print!("{}", serde_yaml::to_string(value)?),
    }
    Ok(())
}

fn write_json(path: &PathBuf, value: &impl serde::Serialize) -> Result<()> {
    let temporary = path.with_extension("tmp");
    std::fs::write(&temporary, serde_json::to_vec_pretty(value)?)?;
    std::fs::rename(temporary, path)?;
    Ok(())
}
