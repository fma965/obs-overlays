document.getElementById("WEBSOCKET_URI").value = WEBSOCKET_URI;
addGame(9);

function addGame(x = 1) {
	for (let i = 0; i < x; i++) {
		$id = +$('#form-games div:last').attr("data-number") + 1;
		input = $('<div class="form-game" data-number="'+$id+'" style="display: flex;"> \
					<input class="form-control col-6 game" type="text" class="game" value="Game '+$id+'" onchange="setGames()">\
					<input class="form-control col-6 image" type="text" class="image" value="Image '+$id+'" onchange="setGames()">\
				</div>');
		$('#form-games').append(input);
	}
}

function removeGame() {
	if(+$('#form-games .form-game:last').attr("data-number") > 10) $('#form-games .form-game:last').remove() 
}

function setGames() {
	var games = [];
	$( "#form-games .form-game" ).each(function( index ) {
		games.push(JSON.stringify({"name":$( this ).children('.game').val(), "image":$( this ).children('.image').val()}));
	}); 
	count = $( "#form-games .form-game" ).length;
	sendCommand({"action": "setgames", "games" : games, "count": count});
}

function updateCurrentGame() {
	sendCommand({"action": "setcurrent", "currentgame": document.getElementById("currentgame").value});
}

function updateAttempts() {
	sendCommand({"action": "setattempts", "attempts": document.getElementById("attempts").value});
}

function updateStreak() {
	sendCommand({"action": "setstreak", "streak": document.getElementById("streak").value});
}

function onMessage(data) {
	if (data.hasOwnProperty('games')) {
        i = 1;
        $('#form-games').empty();
        data['games'].forEach(game => {
            game = JSON.parse(game);
            input = $('<div class="form-game" data-number="'+i+'" style="display: flex;"> \
                <input class="form-control col-6 game" type="text" class="game" value="'+game.name+'">\
                <input class="form-control col-6 image" type="text" class="image" value="'+game.image+'">\
                </div>');
            $('#form-games').append(input);
            i++;
        });
    }
	if (data.hasOwnProperty('currentgame')) {
        document.getElementById("currentgame").value = data['currentgame'];
    }
	if (data.hasOwnProperty('attempts')) {
        document.getElementById("attempts").value = data['attempts'];
    }
	if (data.hasOwnProperty('streak')) {
        document.getElementById("streak").value = data['streak'];
    }
	if(data['action'] == "next") {
        document.getElementById("currentgame").value++;
    }
	if(data['action'] == "reset") {
        document.getElementById("currentgame").value = 1;
		document.getElementById("attempts").value++;
    }
}

function sendAll() {
	setGames();
	updateCurrentGame();
	updateAttempts();
	updateStreak();
}