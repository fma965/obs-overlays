FROM nginxinc/nginx-unprivileged:stable-alpine

LABEL maintainer="Fma965" \
    description="nginx obs-overlays"

COPY --chown=nginx:nginx . /usr/share/nginx/html
RUN rm -f /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/.dockerignore \
    /usr/share/nginx/html/README.md /usr/share/nginx/html/set-secret.sh

COPY --chown=nginx:nginx set-secret.sh /docker-entrypoint.d/40-set-secret.sh
RUN chmod +x /docker-entrypoint.d/40-set-secret.sh

EXPOSE 8080
