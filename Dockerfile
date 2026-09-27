FROM nginxinc/nginx-unprivileged:stable-alpine

LABEL maintainer="Fma965" \
    description="nginx obs-overlays"

# Build steps need root; the container itself runs as the unprivileged nginx user
USER root

COPY --chown=nginx:nginx . /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/.dockerignore \
    /usr/share/nginx/html/README.md /usr/share/nginx/html/templates && \
    chown nginx:nginx /usr/share/nginx/html

# WEBSOCKET_URI is injected at container start by the base image's own
# /docker-entrypoint.d/20-envsubst-on-templates.sh, which runs envsubst over
# these templates and writes the result to the matching path under the docroot.
COPY --chown=nginx:nginx templates/ /etc/nginx/html-templates/
ENV NGINX_ENVSUBST_TEMPLATE_DIR=/etc/nginx/html-templates \
    NGINX_ENVSUBST_OUTPUT_DIR=/usr/share/nginx/html \
    NGINX_ENVSUBST_FILTER='^WEBSOCKET_URI$'

USER nginx

EXPOSE 8080
