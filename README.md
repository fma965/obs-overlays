OBS Overlays

Based on https://github.com/filiphanes/websocket-overlays

You will also need a websocket server, either use the ones included in the above mentioned project or use the docker container `hprivakos/ws-broadcast`

Overlays
- God Gamer - An overlay for cycling 10 games, https://www.reddit.com/r/LudwigAhgren/comments/1fkrxjn/god_gamer_challenge_updated_rules/


### Configuration
| Parameter                   | Required | Type   | Default | Description                                                                                                                                                                                            |
|-----------------------------|----------|--------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| WEBSOCKET_URI             | yes      | string | -       | The URI to the secure WebSocket server prefix format `wss://`                                                                 