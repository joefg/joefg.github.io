FROM denoland/deno:latest
WORKDIR /app
COPY . .
RUN chmod +x ./run
EXPOSE 3000
ENTRYPOINT ["./run"]
CMD ["serve"]