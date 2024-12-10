requestAnimFrame = (function() {
	return window.requestAnimationFrame     ||
		window.webkitRequestAnimationFrame  ||
		window.mozRequestAnimationFrame     ||
		window.oRequestAnimationFrame       ||
		window.msRequestAnimationFrame      ||

		function (callback) {
			window.setTimeout(callback, 1000 / 60);
		}
	;
})();

var
	player  = {},
	map     = [],
	level   = {},
	canvas  = document.getElementById('canvas'),
	context = canvas.getContext('2d')
;

function load() {
	canvas.width  = 500;
	canvas.height = 500;

	player = {
		grid_x: 256,
		grid_y: 256,
		act_x : 200,
		act_y : 200,
		speed : 10
	};

	level = {
		blocs: [
			{ x: 0, y: 0, type: 'mur' },
			{ x: 1, y: 0, type: 'mur' },
			{ x: 2, y: 0, type: 'mur' },
			{ x: 3, y: 0, type: 'air' },
			{ x: 4, y: 0, type: 'mur' }
		]
	};

	map = [
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,2,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	];

	update();
}

function update() {
	requestAnimFrame(update);

	player.act_y = player.act_y - ((player.act_y - player.grid_y) * player.speed * 0.03);
	player.act_x = player.act_x - ((player.act_x - player.grid_x) * player.speed * 0.03);

	draw();
	actions();
}

function draw() {
	canvas.height = canvas.height;

	for (var i = 0 ; i <= 4 ; i++) {
		var bloc = level.blocs[i];

		if (bloc.type == 'mur') {
			context.beginPath();
			context.rect(bloc.x * 32, bloc.y * 32, 32, 32);
			context.fillStyle = '#000000';
			context.fill();
		}
	}

	/*for (var y = 0 ; y < map.length ; y++) {
		for (var x = 0 ; x < map[y].length ; x++) {
			if (map[y][x] == X) {
				context.beginPath();
				context.rect(x * 32, y * 32, 32, 32);
				context.fillStyle = '#000000';
				context.fill();
			} else if (map[y][x] == P) {
				context.beginPath();
				context.rect(x * 32, y * 32, 32, 32);
				context.fillStyle = '#FF8822';
				context.fill();
			}
		}
	}*/

	context.beginPath();
	context.rect(player.act_x, player.act_y, 32, 32);
	context.fillStyle = '#FF0000';
	context.fill();
}

function actions() {
	document.onkeydown = function(e) {
		e = e || window.event;

		if (e.keyCode == 38 && testMap(0, -1)) {
			player.grid_y = player.grid_y - 32;
		} else if (e.keyCode == 40 && testMap(0, 1)) {
			player.grid_y = player.grid_y + 32;
		} else if (e.keyCode == 37 && testMap(-1, 0)) {
			player.grid_x = player.grid_x - 32;
		} else if (e.keyCode == 39 && testMap(1, 0)) {
			player.grid_x = player.grid_x + 32;
		}
	}
}

function testMap(x, y) {
	if (map[(player.grid_y / 32) + y][(player.grid_x / 32) + x] == 1) {
		return false;
	} else if (map[(player.grid_y / 32) + y][(player.grid_x / 32) + x] == 2) {
		player.grid_x = player.grid_x + 32;
	}

	return true;
}

load();
