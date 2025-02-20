FROM webdevops/nginx:alpine

LABEL maintainer="Fma965" \
    description="nginx obs-overlays"

COPY . /app