FROM nginxinc/nginx-unprivileged:stable-alpine

LABEL maintainer="Fma965" \
    description="nginx obs-overlays"

# Build steps need root; the container itself runs as the unprivileged nginx user
USER root

COPY --chown=nginx:nginx . /usr/share/nginx/html
RUN rm -f /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/.dockerignore \
    /usr/share/nginx/html/README.md /usr/share/nginx/html/set-secret.sh

COPY --chown=nginx:nginx set-secret.sh /docker-entrypoint.d/40-set-secret.sh
RUN chmod +x /docker-entrypoint.d/40-set-secret.sh

USER nginx

EXPOSE 8080
