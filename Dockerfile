FROM webdevops/nginx:alpine

LABEL maintainer="Fma965" \
    description="nginx obs-overlays"

COPY . /app

COPY set-secret.sh /entrypoint.d/set-secret.sh
RUN chmod +x /entrypoint.d/set-secret.sh