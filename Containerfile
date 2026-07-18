FROM docker.io/library/node:22-bookworm-slim AS web-builder
WORKDIR /src/web
COPY web/package.json web/package-lock.json ./
RUN npm ci
COPY web/ ./
RUN npm run lint && npm run build

FROM docker.io/library/rust:1.97-bookworm AS rust-builder
WORKDIR /src
COPY Cargo.toml Cargo.lock rustfmt.toml ./
COPY crates/ crates/
COPY --from=web-builder /src/web/dist web/dist
RUN cargo build --locked --release --bin bunny

FROM docker.io/library/debian:bookworm-slim
RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl \
    && rm -rf /var/lib/apt/lists/*
RUN useradd --create-home --uid 10001 bunny \
    && install -d -o bunny -g bunny /data
COPY --from=rust-builder /src/target/release/bunny /usr/local/bin/bunny
USER bunny
ENV BUNNY_HOME=/data
EXPOSE 7331
VOLUME ["/data"]
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl --fail --silent http://127.0.0.1:7331/healthz || exit 1
ENTRYPOINT ["bunny"]
CMD ["web", "serve", "--host", "0.0.0.0", "--port", "7331"]
