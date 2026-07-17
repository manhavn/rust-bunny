#!/usr/bin/env sh
set -eu

APP_NAME="bunny"
BUILD_ALL=0
RUN_CHECKS=1
BUILD_CONTAINER=0
TARGET=""
PROFILE="release"
CONTAINER_TAG="localhost/bunny-cli:latest"
CONTAINER_PLATFORM=""

TARGETS="\
x86_64-unknown-linux-gnu\
aarch64-unknown-linux-gnu\
x86_64-unknown-linux-musl\
aarch64-unknown-linux-musl\
x86_64-pc-windows-gnu\
aarch64-pc-windows-gnullvm\
x86_64-apple-darwin\
aarch64-apple-darwin\
"

usage() {
  cat <<'EOF'
Usage:
  ./build-release.sh [options]

Options:
  --native                    Build for the current machine (default).
  --target <triple>           Build one Rust target triple.
  --all                       Build common Linux, Windows, and macOS targets.
  --profile <release|dev>     Cargo build profile (default: release).
  --container                 Build the Podman image after the native binary.
  --container-tag <tag>       Container tag (default: localhost/bunny-cli:latest).
  --platform <os/arch>        Podman target platform, for example linux/amd64.
  --no-checks                 Skip lint, cargo check, clippy, and tests.
  -h, --help                  Show this help.

Common Rust targets:
  x86_64-unknown-linux-gnu       Linux amd64 glibc
  aarch64-unknown-linux-gnu      Linux arm64 glibc
  x86_64-unknown-linux-musl      Linux amd64 static/musl
  aarch64-unknown-linux-musl     Linux arm64 static/musl
  x86_64-pc-windows-gnu          Windows amd64
  aarch64-pc-windows-gnullvm     Windows arm64
  x86_64-apple-darwin            macOS amd64
  aarch64-apple-darwin           macOS arm64

Architecture aliases amd64 and arm64 are accepted and normalized to Rust's
x86_64 and aarch64 target names.

The script always runs cargo fmt before building. Cross builds use
cargo-zigbuild when available, then cross with Podman or Docker. Apple targets
still require Apple's SDK.
EOF
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --native)
      TARGET=""
      BUILD_ALL=0
      ;;
    --target)
      [ "$#" -ge 2 ] || { printf 'Error: --target requires a value.\n' >&2; exit 1; }
      TARGET="$2"
      BUILD_ALL=0
      shift
      ;;
    --all)
      BUILD_ALL=1
      TARGET=""
      ;;
    --profile)
      [ "$#" -ge 2 ] || { printf 'Error: --profile requires release or dev.\n' >&2; exit 1; }
      PROFILE="$2"
      case "$PROFILE" in release|dev) ;; *) printf 'Error: invalid profile: %s\n' "$PROFILE" >&2; exit 1 ;; esac
      shift
      ;;
    --container)
      BUILD_CONTAINER=1
      ;;
    --container-tag)
      [ "$#" -ge 2 ] || { printf 'Error: --container-tag requires a value.\n' >&2; exit 1; }
      CONTAINER_TAG="$2"
      shift
      ;;
    --platform)
      [ "$#" -ge 2 ] || { printf 'Error: --platform requires a value.\n' >&2; exit 1; }
      CONTAINER_PLATFORM="$2"
      shift
      ;;
    --no-checks)
      RUN_CHECKS=0
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      printf 'Error: unknown option: %s\n\n' "$1" >&2
      usage >&2
      exit 1
      ;;
  esac
  shift
done

case "$TARGET" in
  amd64-*)
    original_target="$TARGET"
    TARGET="x86_64-${TARGET#amd64-}"
    printf 'Target alias: %s -> %s\n' "$original_target" "$TARGET"
    ;;
  arm64-*)
    original_target="$TARGET"
    TARGET="aarch64-${TARGET#arm64-}"
    printf 'Target alias: %s -> %s\n' "$original_target" "$TARGET"
    ;;
esac

printf '%s\n' '==> Formatting Rust sources'
cargo fmt --all

printf '%s\n' '==> Installing locked frontend dependencies'
npm --prefix web ci

if [ "$RUN_CHECKS" -eq 1 ]; then
  printf '%s\n' '==> Linting frontend'
  npm --prefix web run lint
fi

printf '%s\n' '==> Building lazy-loaded frontend chunks'
npm --prefix web run build

if [ "$RUN_CHECKS" -eq 1 ]; then
  printf '%s\n' '==> Checking Rust workspace'
  cargo check --workspace --all-targets --all-features
  cargo clippy --workspace --all-targets --all-features -- -D warnings
  cargo test --workspace --all-features
fi

cargo_profile_flag() {
  if [ "$PROFILE" = "release" ]; then
    printf '%s' "--release"
  else
    printf '%s' ""
  fi
}

profile_dir() {
  if [ "$PROFILE" = "release" ]; then
    printf '%s' "release"
  else
    printf '%s' "debug"
  fi
}

build_native() {
  profile_flag="$(cargo_profile_flag)"
  output_profile="$(profile_dir)"
  if [ -n "$profile_flag" ]; then
    cargo build --locked "$profile_flag" --bin "$APP_NAME"
  else
    cargo build --locked --bin "$APP_NAME"
  fi
  printf 'Binary: %s\n' "$(pwd)/target/$output_profile/$APP_NAME"
}

build_target() {
  target="$1"
  binary_name="$APP_NAME"
  profile_flag="$(cargo_profile_flag)"
  output_profile="$(profile_dir)"
  case "$target" in *windows*) binary_name="$APP_NAME.exe" ;; esac

  if command -v cargo-zigbuild >/dev/null 2>&1; then
    printf 'Cross compiler: cargo-zigbuild\n'
    if [ -n "$profile_flag" ]; then
      cargo zigbuild --locked "$profile_flag" --target "$target" --bin "$APP_NAME"
    else
      cargo zigbuild --locked --target "$target" --bin "$APP_NAME"
    fi
  elif command -v cross >/dev/null 2>&1; then
    if [ -z "${CROSS_CONTAINER_ENGINE:-}" ] && command -v podman >/dev/null 2>&1; then
      CROSS_CONTAINER_ENGINE=podman
      export CROSS_CONTAINER_ENGINE
    fi
    printf 'Cross compiler: cross (container engine: %s)\n' "${CROSS_CONTAINER_ENGINE:-auto}"
    if [ -n "$profile_flag" ]; then
      cross build --locked "$profile_flag" --target "$target" --bin "$APP_NAME"
    else
      cross build --locked --target "$target" --bin "$APP_NAME"
    fi
  else
    printf '%s\n' \
      'Error: no cross-compilation tool is installed.' \
      'Install cargo-zigbuild with Zig, or install cross and Podman/Docker:' \
      '  cargo install cross --git https://github.com/cross-rs/cross' >&2
    exit 1
  fi
  printf 'Binary: %s\n' "$(pwd)/target/$target/$output_profile/$binary_name"
}

if [ "$BUILD_ALL" -eq 1 ]; then
  for target in $TARGETS; do
    printf '\n==> Building %s\n' "$target"
    build_target "$target"
  done
elif [ -n "$TARGET" ]; then
  build_target "$TARGET"
else
  build_native
fi

if [ "$BUILD_CONTAINER" -eq 1 ]; then
  command -v podman >/dev/null 2>&1 || { printf 'Error: podman is required.\n' >&2; exit 1; }
  printf '\n==> Building container %s\n' "$CONTAINER_TAG"
  if [ -n "$CONTAINER_PLATFORM" ]; then
    podman build --format docker --platform "$CONTAINER_PLATFORM" -t "$CONTAINER_TAG" -f Containerfile .
  else
    podman build --format docker -t "$CONTAINER_TAG" -f Containerfile .
  fi
fi
