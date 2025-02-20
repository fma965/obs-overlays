FROM webdevops/nginx:alpine

LABEL maintainer="Fma965" \
    description="nginx obs-overlays"

COPY . /app

RUN sed -i "s|WEBSOCKET_URI = \".*\"|WEBSOCKET_URI = \"$WEBSOCKET_URI\"|" /app/godgamer/js/secret.js
RUN sed -i "s|WEBSOCKET_URI = \".*\"|WEBSOCKET_URI = \"$WEBSOCKET_URI\"|" /app/timer/js/secret.js