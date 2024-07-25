"use strict";

// Initialisation (loading)
function init() {
	camera.w = camera.bw * basesize;
	camera.h = camera.bh * basesize;

	can.width  = camera.w;
	can.height = camera.h;

	ctx.fillBackground(can, rgb(0, 0, 0));
	ctx.fillStyle = rgb(255, 255, 255);
	ctx.font = 'normal 16px "Times New Roman", serif';
	ctx.textAlign = 'center';
	ctx.fillText('Chargement du jeu...', camera.w / 2, camera.h / 2);

	PreloadManager(images, image, create);
}

// Creation (after the init.)
function create() {
	update();
}

// Update
function update() {
	timer.update();

	switch (state) {
		case 'start':        update_start();        break;
		case 'game':         update_game();         break;
		case 'player_infos': update_player_infos(); break;
	}

	requestAnimFrame(update);
}

function player_move(dir) {
	player.dir = dir;

	var incrx = 0;
	var incry = 0;

	switch (dir) {
		case 'left':  incrx = -player.speed; break;
		case 'up':    incry = -player.speed; break;
		case 'right': incrx = player.speed;  break;
		case 'down':  incry = player.speed;  break;
	}

	var newx = (player.x + (incrx * basesize / player.speed)) / basesize;
	var newy = (player.y + (incry * basesize / player.speed)) / basesize;

	if (map.validPos(newx, newy)) {
		var tile = map[newy][newx];

		if (!tile.s) {
			player.canmove = false;

			for (var i = 0 ; i < basesize ; i += player.speed) {
				setTimeout(function(i) {
					player.x += incrx;
					player.y += incry;

					if (i >= 5 && i <= 12) {
						player.mov = 1;
					} else {
						player.mov = 0;
					}

					if (i == basesize - player.speed) {
						player.canmove = true;

						if (typeof tile.onenter != 'undefined') {
							events[tile.onenter]();
						}
					}
				}, i * 10, i);
			}
		}
	}
}

function window_dialog(x, y, w, h, text) {
	ctx.save();
	ctx.translate(x, y);

	ctx.drawImage(image.dialog, 0, 0, 8, 8, 0, 0, 8, 8);
	ctx.drawImage(image.dialog, 8, 0, 8, 8, 8, 0, w - 16, 8);
	ctx.drawImage(image.dialog, 16, 0, 8, 8, w - 8, 0, 8, 8);

	ctx.drawImage(image.dialog, 0, 8, 8, 8, 0, 8, 8, h);
	ctx.drawImage(image.dialog, 8, 8, 8, 8, 8, 8, w - 16, h);
	ctx.drawImage(image.dialog, 16, 8, 8, 8, w  - 8, 8, 8, h);

	ctx.drawImage(image.dialog, 0, 16, 8, 8, 0, h + 8, 8, 8);
	ctx.drawImage(image.dialog, 8, 16, 8, 8, 8, h + 8, w - 16, 8);
	ctx.drawImage(image.dialog, 16, 16, 8, 8, w - 8, h + 8, 8, 8);

	if (typeof text != 'undefined') {
		ctx.font = 'normal 12px "Courier New"';
		ctx.fillStyle = rgb(0, 0, 0);
		ctx.textAlign = 'left';
		wrapText(text, 8, 18, w - 8, 12);
	}

	ctx.restore();
}

function change_map(newmap, x, y, dir) {
	map        = newmap;
	map_height = map.length;
	map_width  = map[0].length;

	if (typeof x != 'undefined' && typeof y != 'undefined') {
		player.x = x * basesize;
		player.y = y * basesize;
	}

	if (typeof dir != 'undefined') {
		player.dir = dir;
	}
}

function yaUTI(x, y) {
	return map.hasOwnProperty(y) && map[y][x] != '#ffffff';
}

var can = getById('game');
var ctx = can.getContext('2d');
var log = getById('log');

var basesize = 16;

var camera = {
	x:  0,  // x
	y:  0,  // y
	w:  0,  // w
	h:  0,  // h
	bw: 10, // bw
	bh: 10  //bh
};

var images = {
	grounds:      'data/images/grounds.png',
	items:        'data/images/items.png',
	dialog:       'data/images/dialog.png',
	player:       'data/images/player.png',
	player_infos: 'data/images/player_infos.png',
	state_start:  'data/images/state_start.png'
};

var image = {};

var player = {
	x:          2 * basesize,
	y:          2 * basesize,
	timerspeed: 0,
	name:       'Player',
	canmove:    true,
	speed:      2,
	dir:        'down',
	mov:        0
};

var start_menu = false;
var choice     = 0;

var timer = new TimerManager();

// g : ground
// i : item
// s : solid
// onaction (space)
// onenter (auto.)

var map_begin = [
	[{g:0,i:13,s:1},{g:0,i:13,s:1},{g:0,i:13,s:1},{g:0,i:13,s:1},{g:0,i:13,s:1},{g:0,i:13,s:1},{g:0,i:13,s:1},{g:0,i:13,s:1},{g:0,i:13,s:1},{g:0,i:13,s:1},{g:0,i:13,s:1},{g:0,i:13,s:1}],
	[{g:1,i:13,s:1},{g:0},{g:0},{g:1},{g:0},{g:0},{g:0},{g:1},{g:0},{g:1},{g:0},{g:0,i:13,s:1}],
	[{g:0,i:13,s:1},{g:0},{g:0},{g:3},{g:0},{g:1,i:5,s:1},{g:0,i:6,s:1},{g:0,i:7,s:1},{g:0,i:8,s:1},{g:0},{g:0},{g:0,i:13,s:1}],
	[{g:0,i:13,s:1},{g:0},{g:0},{g:0},{g:0},{g:0,i:16,s:1},{g:0,i:17,s:1},{g:0,i:18,s:1},{g:0,i:19,s:1},{g:0},{g:4},{g:0,i:13,s:1}],
	[{g:0,i:13,s:1},{g:0},{g:0,i:0,s:1,onaction:0},{g:0},{g:0},{g:0,i:27,s:1},{g:0,i:28,s:1},{g:0,i:29,s:1},{g:0,i:30,s:1},{g:0},{g:0},{g:0,i:13,s:1}],
	[{g:0,i:13,s:1},{g:0},{g:1},{g:0},{g:0},{g:0,i:38,s:1},{g:0,i:39,s:false,onenter:1},{g:0,i:40,s:1},{g:0,i:41,s:1},{g:0},{g:0},{g:0,i:13,s:1}],
	[{g:0,i:13,s:1},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:2},{g:0,i:13,s:1}],
	[{g:0,i:13,s:1},{g:0},{g:2},{g:0},{g:0},{g:0},{g:1},{g:0},{g:1},{g:0},{g:0},{g:0,i:13,s:1}],
	[{g:0,i:13,s:1},{g:0},{g:0},{g:0},{g:1},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0,i:13,s:1}],
	[{g:0,i:13,s:1},{g:0,i:13,s:1},{g:0,i:13,s:1},{g:0,i:13,s:1},{g:0,i:13,s:1},{g:0,i:13,s:1},{g:0,i:13,s:1},{g:0,i:13,s:1},{g:0,i:13,s:1},{g:0,i:13,s:1},{g:0,i:13,s:1},{g:0,i:13,s:1}],
];

var map_house1 = [
	[{g:26,s:1},{g:26,s:1},{g:0,i:11,s:false,onenter:3},{g:26,s:1},{g:26,s:1},{g:26,s:1},{g:26,s:1},{g:26,s:1},{g:26,s:1},{g:26,s:1}],
	[{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0}],
	[{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0}],
	[{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0}],
	[{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0}],
	[{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0}],
	[{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0}],
	[{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0}],
	[{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0}],
	[{g:0,i:4,s:1},{g:0,i:4,s:1},{g:0,i:4,s:1},{g:0,i:4,s:1},{g:0,onenter:2},{g:0,i:4,s:1},{g:0,i:4,s:1},{g:0,i:4,s:1},{g:0,i:4,s:1},{g:0,i:4,s:1}],
];

var map_house1_floor = [
	[{g:26,s:1},{g:26,s:1},{g:26,s:1},{g:26,s:1},{g:26,s:1},{g:26,s:1},{g:26,s:1},{g:26,s:1},{g:26,s:1},{g:26,s:1}],
	[{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0}],
	[{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0}],
	[{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0}],
	[{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0}],
	[{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0}],
	[{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0}],
	[{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0}],
	[{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0},{g:0}],
	[{g:0,i:4,s:1},{g:0,i:4,s:1},{g:0,i:22,s:false,onenter:4},{g:0,i:4,s:1},{g:0,i:4,s:1},{g:0,i:4,s:1},{g:0,i:4,s:1},{g:0,i:4,s:1},{g:0,i:4,s:1},{g:0,i:4,s:1}],
];

var map        = map_begin;
var map_height = map.length;
var map_width  = map[0].length;

var expand_draw = function() {};

var state = 'start';

var events = [
	function() { // 0
		player.canmove = false;

		var ind  = 0;
		var text = '';
		var texts = [];

		function launchText(t) {
			text = '';

			for (var i = 0 , l = t.length ; i < l ; i++) {
				(function(i) {
					texts[i] = setTimeout(function() {
						text += t.charAt(i);
					}, i * 32);
				}(i));
			}
		}

		launchText('Bienvenue a ' + player.name + '-ville.');

		expand_draw = function() {
			window_dialog(0, 120, can.width, 24, text);

			if (Key.press(Key.SPACE)) {
				for (var i = 0 ; i < texts.length ; i++) {
					clearTimeout(texts[i]);
				}

				switch (++ind) {
					case 1: launchText('Je suis un panneau.'); break;
					case 2: launchText('Et tu me lis...'); break;
					case 3: launchText('C\'est cool non ?'); break;
					case 4: launchText('NON ?'); break;
					case 5: launchText('NON ?!!?'); break;
					case 6: launchText('NON ???!!?!!?!!!??!!'); break;

					default:
						player.canmove = true;
						expand_draw = function() {};
					break;
				}
			}
		};
	},

	function() { // 1
		change_map(map_house1, 4, 8);
		player.x = 4 * basesize;
	},

	function() { // 2
		change_map(map_begin, 6, 6);
	},

	function() { // 3
		change_map(map_house1_floor, 2, 8);
	},

	function() { // 4
		change_map(map_house1, 2, 1);
	}
];

init();
