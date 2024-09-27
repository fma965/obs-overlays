document.getElementById("WEBSOCKET_URI").value = WEBSOCKET_URI;

function setTimer() {
	sendCommand({"action": "set-timer", "time": document.getElementById("time").value});
}

function startTimer() {
	sendCommand({"action": "start-timer"});
}

function pauseTimer() {
	sendCommand({"action": "pause-timer"});
}

function restTimer() {
	sendCommand({"action": "reset-timer"});
}