FROM nginxinc/nginx-unprivileged:stable-alpine

LABEL maintainer="Fma965" \
    description="nginx obs-overlays"

# Build steps need root; the container itself runs as whatever user the
# deployer's securityContext assigns (e.g. Kubernetes runAsUser), which is not
# necessarily this image's own nginx uid, so we can't just chown our content
# to a specific user and call it done.
USER root

COPY --chown=nginx:nginx . /usr/share/nginx/html
# secret.js is regenerated from a template at every container start (see
# below) — drop the static placeholder from the docroot along with the
# repo-only files, so a failed substitution 404s instead of silently
# serving "wss://example.tld".
RUN rm -rf /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/.dockerignore \
    /usr/share/nginx/html/README.md /usr/share/nginx/html/templates \
    /usr/share/nginx/html/godgamer/js/secret.js /usr/share/nginx/html/timer/js/secret.js && \
    chmod o+w /usr/share/nginx/html /usr/share/nginx/html/godgamer/js /usr/share/nginx/html/timer/js

# WEBSOCKET_URI is injected at container start by the base image's own
# /docker-entrypoint.d/20-envsubst-on-templates.sh, which runs envsubst over
# these templates and writes the result to the matching path under the docroot.
# The target directories are made world-writable above because the container
# may run as an arbitrary uid/gid (not this image's own nginx uid 101) —
# envsubst's write has to succeed regardless of which uid ends up owning it.
COPY --chown=nginx:nginx templates/ /etc/nginx/html-templates/
ENV NGINX_ENVSUBST_TEMPLATE_DIR=/etc/nginx/html-templates \
    NGINX_ENVSUBST_OUTPUT_DIR=/usr/share/nginx/html \
    NGINX_ENVSUBST_FILTER='^WEBSOCKET_URI$'

USER nginx

EXPOSE 8080
