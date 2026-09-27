FROM nginxinc/nginx-unprivileged:stable-alpine

LABEL maintainer="Fma965" \
    description="nginx obs-overlays"

COPY --chown=nginx:nginx . /usr/share/nginx/html

COPY --chown=nginx:nginx set-secret.sh /docker-entrypoint.d/40-set-secret.sh
RUN chmod +x /docker-entrypoint.d/40-set-secret.sh

EXPOSE 8080
