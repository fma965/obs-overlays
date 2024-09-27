var socketIsOpen = false;
var intervalID = 0;

connectWebsocket = function() {
    // Modify this URL to point to the IP address and port where your server is running on
	websocket = new WebSocket(WEBSOCKET_URI);
	websocket.onopen = function(event) {
        document.getElementsByClassName("slider")[0].innerHTML = "<h1>Waiting for commands...</h1>";
        socketIsOpen = true;
        clearInterval(intervalID);
        intervalID = 0;
    };
	websocket.onclose = function(event) {
        document.getElementsByClassName("slider")[0].innerHTML = "<h1>Connection to WebSocket closed</h1>";
        socketIsOpen = false;
        if (!intervalID) {
            intervalID = setInterval(connectWebsocket, 5000);
        }
    };
	websocket.onmessage = function(event) {
        var messageObject = JSON.parse(event.data);
        window.onMessage(messageObject);
    };
	websocket.onerror = function(event) {
        document.getElementsByClassName("slider")[0].innerHTML = "<h1>Unable to connect WebSocket</h1>";
        socketIsOpen = false;
        if (!intervalID) {
            intervalID = setInterval(connectWebsocket, 5000);
        }
    };
};

var timerDisplay = document.getElementById("time");

var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime = 0;
var paused = 0;
var running = 0;

window.addEventListener("load", function() { 
    connectWebsocket(); 
    timerDisplay = document.getElementById("time");
}, false);

function onMessage(data) {
    if(data['action'] == "set-timer") { 
      document.getElementsByClassName("slider")[0].style.display = "none"; 
      resetTimer()
      if (data.hasOwnProperty('time')) {
        document.getElementById("time").innerHTML = data['time']; 
      }
      startTimer()
    }
    if(data['action'] == "start-timer") { 
      document.getElementsByClassName("slider")[0].style.display = "none"; 
      startTimer()
    }
    if(data['action'] == "pause-timer") { 
      pauseTimer()
    }
    if(data['action'] == "reset-timer") { 
      resetTimer()
    }
}

var timerDisplay = document.getElementById("time");

var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime = 0;
var paused = 0;
var running = 0;

/**This function is triggered when user starts the stopwatch.**/

function startTimer(){
  if(!running){
    // getting the displayed time 
    if (savedTime) {
      console.log(savedTime);
      startTime = (+ new Date()) - savedTime;
    } else {
      startTime = document.getElementById("time").innerText;
      var a = startTime.split(':');
      var seconds = (a[0]*1000*60*60)+(a[1]*1000*60)+(a[2]*1000);
      console.log(seconds);
      startTime = (+ new Date()) - seconds;
    }
    tInterval = setInterval(getShowTime, 1);
    // change 1 to 1000 above to run script every second instead of every millisecond. one other change will be needed in the getShowTime() function below for this to work. see comment there.   
 
    running = 1;
    paused = 0;
    // Some styling here
  }
}

/**This function is triggered when user pauses and resumes the stopwatch.**/

function pauseTimer(){
  if (!difference){
    // if timer never started, don't allow pause button to do anything
  } else if (!paused) {
    clearInterval(tInterval);
    savedTime = difference;
    paused = 1;
    running = 0;
    // Some styling here  
 } else {
   // if the timer was already paused, when they click pause again, start the timer again
   startTimer();
  }
}

/**This function is triggered when user resets the stopwatch.**/

function resetTimer(){
  clearInterval(tInterval);
  savedTime = 0;
  difference = 0;
  paused = 0;
  running = 0;
  // Some styling here
}

/**This function is to display the time.**/

function getShowTime(){
  updatedTime = + new Date();
  difference =  updatedTime - startTime;
  var hours = Math.floor((difference % (1000 * 60 * 60 * 1000)) / (1000 * 60 * 60));
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);
  //var milliseconds = Math.floor((difference % (1000 * 60)) / 100);
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  //milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;
  timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds;
}