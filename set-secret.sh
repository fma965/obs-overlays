#!/bin/sh
touch /app/test.txt
sed -i "s|WEBSOCKET_URI = \".*\"|WEBSOCKET_URI = \"$WEBSOCKET_URI\"|" /app/godgamer/js/secret.js
sed -i "s|WEBSOCKET_URI = \".*\"|WEBSOCKET_URI = \"$WEBSOCKET_URI\"|" /app/timer/js/secret.js