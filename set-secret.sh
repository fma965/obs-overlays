#!/bin/sh
sed -i "s|WEBSOCKET_URI = \".*\"|WEBSOCKET_URI = \"$WEBSOCKET_URI\"|" /usr/share/nginx/html/godgamer/js/secret.js
sed -i "s|WEBSOCKET_URI = \".*\"|WEBSOCKET_URI = \"$WEBSOCKET_URI\"|" /usr/share/nginx/html/timer/js/secret.js
