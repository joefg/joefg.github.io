FROM denoland/deno:latest
COPY --from=ghcr.io/casey/just:latest /just /usr/local/bin/
WORKDIR /app
COPY . .
EXPOSE 3000
ENTRYPOINT ["just"]
