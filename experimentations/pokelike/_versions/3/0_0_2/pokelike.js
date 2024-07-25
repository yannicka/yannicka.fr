"use strict";

var tmpcan = getById('temp');
var tmpctx = tmpcan.getContext('2d');

var can = getById('game');
var ctx = can.getContext('2d');
var log = getById('log');

var basesize = 16;

var camera = {
	x:  0,
	y:  0,
	w:  640,
	h:  480,
	bw: 12,
	bh: 12
};

var images = {
	map:        'data/images/map.png',
	sprite_map: 'data/images/sprite_map.png',
	dialog:     'data/images/dialog.png'
};

var image = {};

var player = {
	x:          2 * basesize,
	y:          2 * basesize,
	rx:         2 * basesize,
	ry:         2 * basesize,
	speed:      basesize / 2000,
	timerspeed: 0,
	name:       'Player'
};

var map = [];

var timer = new TimerManager();

var blocks_olds = {
	'#3f7f47': { x: 0,   y: 0,  solid: true },
	'#7f0000': { x: 16,  y: 0,  solid: true },
	'#ff0000': { x: 32,  y: 0,  solid: true },
	'#ff6a00': { x: 48,  y: 0,  solid: true },
	'#ffd800': { x: 64,  y: 0,  solid: true },
	'#b6ff00': { x: 80,  y: 0,  solid: true },
	'#007f0e': { x: 96,  y: 0,  solid: true },
	'#00ff21': { x: 112, y: 0,  solid: true },
	'#7f92ff': { x: 128, y: 0,  solid: true },
	'#00ffff': { x: 144, y: 0,  solid: true },
	'#0094ff': { x: 160, y: 0,  solid: true },
	'#007f7f': { x: 176, y: 0,  solid: true },
	'#4800ff': { x: 192, y: 0,  solid: true },
	'#b200ff': { x: 208, y: 0,  solid: true },
	'#ff00dc': { x: 224, y: 0,  solid: true },
	'#000000': { x: 240, y: 0,  solid: true },
	'#ffffff': { x: 0,   y: 16, solid: false },
	'#d8d8d8': { x: 16,  y: 16, solid: false }
};

var blocks = {
	'#ff00ff': { x: 0,   y: 0, w: 1, h: 1, collide: true  }, // empty (collide)
	'#ff0000': { x: 0,   y: 0, w: 1, h: 1, collide: false }, // empty (no collide)
	'#ffffff': { x: 16,  y: 0, w: 1, h: 1, collide: false }, // basic out floor
	'#e5e5e5': { x: 32,  y: 0, w: 1, h: 1, collide: false }, // out floor with little title blue
	'#cccccc': { x: 48,  y: 0, w: 1, h: 1, collide: false }, // out floor with little blue
	'#b2b2b2': { x: 64,  y: 0, w: 1, h: 1, collide: false }, // out floor with "flower"
	'#999999': { x: 80,  y: 0, w: 1, h: 1, collide: false }, // out blue floor
	'#ff6a00': { x: 96,  y: 0, w: 4, h: 4, collide: true  }, // house1

	'#331400': { x: 16, y: 16, w: 1, h: 1, collide: true  }, // fence begin
	'#4c1e00': { x: 32, y: 16, w: 1, h: 1, collide: true  }, // fence middle
	'#662800': { x: 48, y: 16, w: 1, h: 1, collide: true  }, // fence end
	'#663514': { x: 64, y: 16, w: 1, h: 1, collide: true  }, // fence top view

	'#267f00': { x: 16, y: 32, w: 1, h: 1, collide: true  }, //
	'#1e6600': { x: 32, y: 32, w: 1, h: 1, collide: true  }, //
	'#164c00': { x: 48, y: 32, w: 1, h: 1, collide: true  }, //
	'#2c4c1e': { x: 64, y: 32, w: 1, h: 1, collide: true  }  //
};

function init() {
	camera.w = camera.bw * basesize;
	camera.h = camera.bh * basesize;

	can.width  = camera.w;
	can.height = camera.h;

	ctx.fillBackground(can, rgbToStr(0, 0, 0));
	ctx.fillStyle = rgbToStr(255, 255, 255);
	ctx.font = 'normal 16px "Times New Roman", serif';
	ctx.textAlign = 'center';
	ctx.fillText('Chargement du jeu...', camera.w / 2, camera.h / 2);

	PreloadManager(images, image, create);
}

function create() {
	var w = image.map.width;
	var h = image.map.height;

	tmpctx.drawImage(image.map, 0, 0);

	var listPixels = tmpctx.getImageData(0, 0, image.map.width, image.map.height).data;

	for (var y = 0 ; y < h ; y++) {
		map.push([]);

		for (var x = 0 ; x < w ; x++) {
			var r = listPixels[(x + y * image.map.width) * 4];
			var g = listPixels[(x + y * image.map.width) * 4 + 1];
			var b = listPixels[(x + y * image.map.width) * 4 + 2];
			var a = listPixels[(x + y * image.map.width) * 4 + 3];

			var color = rgbToHex(r, g, b);

			map[y][x] = color;
		}
	}

	update();
}

var cspace = 0;

var start_menu = false;
var choice = 0;

function update() {
	timer.update();

	camera.x = Math.round(Math.clamp(-player.rx + can.width / 2, (-image.map.width * basesize) + can.width, 0));
	camera.y = Math.round(Math.clamp(-player.ry + can.height / 2, (-image.map.height * basesize) + can.height, 0));

	if (!start_menu) {
		if (player.timerspeed <= 0) {
			if (Key.down(Key.RIGHT) && !checkCollideMap(player.x / basesize + 1, player.y / basesize)) {
				player.x += basesize;
				player.timerspeed = 130;
			} else if (Key.down(Key.LEFT) && !checkCollideMap(player.x / basesize - 1, player.y / basesize)) {
				player.x -= basesize;
				player.timerspeed = 130;
			} else if (Key.down(Key.UP) && !checkCollideMap(player.x / basesize, player.y / basesize - 1)) {
				player.y -= basesize;
				player.timerspeed = 130;
			} else if (Key.down(Key.DOWN) && !checkCollideMap(player.x / basesize, player.y / basesize + 1)) {
				player.y += basesize;
				player.timerspeed = 130;
			}
		}
	} else {
		if (Key.press(Key.UP)) {
			choice--;
		} else if (Key.press(Key.DOWN)) {
			choice++;
		}

		if (choice < 0) {
			choice = 5;
		}

		if (choice > 5) {
			choice = 0;
		}

		if (Key.press(Key.ENTER)) {
			if (choice == 5) {
				start_menu = !start_menu;
			}
		}
	}

	if (Key.press(Key.ESC)) {
		start_menu = !start_menu;
	}

	if (player.timerspeed > 0) {
		player.timerspeed -= timer.dt;
	}

	if (Key.press(Key.SPACE)) {
		cspace++;
	}

	player.ry -= ((player.ry - player.y) * player.speed * timer.dt);
	player.rx -= ((player.rx - player.x) * player.speed * timer.dt);

	draw();
	requestAnimFrame(update);
}

function draw() {
	ctx.clear(can);

	ctx.save();
	ctx.translate(camera.x, camera.y);

	for (var y = 0 ; y < image.map.height ; y++) {
		for (var x = 0 ; x < image.map.width ; x++) {
			ctx.drawImage(
				image.sprite_map,
				blocks[map[y][x]].x,
				blocks[map[y][x]].y,
				basesize * blocks[map[y][x]].w,
				basesize * blocks[map[y][x]].h,
				x * basesize,
				y * basesize,
				basesize * blocks[map[y][x]].w,
				basesize * blocks[map[y][x]].h
			);
		}
	}

	ctx.fillStyle = rgbToStr(255, 0, 0);
	ctx.fillRect(player.rx, player.ry, basesize, basesize);

	ctx.restore();

	switch (cspace) {
		case 0: window_dialog(0, 152, can.width, 24, 'Bonjour, appuie sur Espace pour continuer.'); break;
		case 1: window_dialog(0, 152, can.width, 24, 'Donc tu es ' + player.name + ', ravi de faire ta connaissance.'); break;
		case 2: window_dialog(0, 152, can.width, 24, 'Tu vas bien ?'); break;
		case 3: window_dialog(0, 152, can.width, 24, 'Content que tu ailles bien :)'); break;
		case 4: window_dialog(0, 152, can.width, 24, 'Comment ca tu n\'as rien dit ?'); break;
		case 5: window_dialog(0, 152, can.width, 24, 'Je parle seul ? Tu te fous de moi ?'); break;
		case 6: window_dialog(0, 152, can.width, 24, 'Oui ?! Oh le culot !'); break;
		case 7: window_dialog(0, 152, can.width, 24, 'Tu me rends triste :('); break;
		case 8: window_dialog(0, 152, can.width, 24, 'Je vais pleurer seul dans mon coin...'); break;
		case 9: window_dialog(0, 152, can.width, 24, 'Maintenant tu es triste aussi, AH AH !'); break;
		case 10: window_dialog(0, 152, can.width, 24, 'Alors que je suis juste un programme.'); break;
		case 11: window_dialog(0, 152, can.width, 24, 'NA NA NA NERE, LA HONTE, ADIEU !'); break;
		case 12: window_dialog(0, 152, can.width, 24, '*Deconnexion*'); break;
		default: break;
	}

	if (start_menu) {
		window_dialog(112, 0, 80, 92);

		ctx.save();
		ctx.translate(100, 0);

		ctx.font = 'normal 12px "Courier New"';
		ctx.fillText('DICO', 32, 2 + 16);
		ctx.fillText('PIFeMON', 32, 2 + 32);
		ctx.fillText('OBJET',   32, 2 + 48);
		ctx.fillText(player.name,   32, 2 + 64);
		ctx.fillText('OPTION',  32, 2 + 80);
		ctx.fillText('RETOUR',  32, 2 + 96);

		ctx.fillText('>', 22, 2 + (choice + 1) *  16);

		ctx.restore();
	}
}

function checkCollideMap(x, y) {
	return blocks[map[y][x]].collide;
}

function wrapText(text, x, y, maxWidth, lineHeight) {
	var words = text.split(' ');
	var line = '';

	for (var n = 0 ; n < words.length ; n++) {
		var testLine  = line + words[n] + ' ';
		var metrics   = ctx.measureText(testLine);
		var testWidth = metrics.width;

		if (testWidth > maxWidth) {
			ctx.fillText(line, x, y);
			line = words[n] + ' ';
			y   += lineHeight;
		} else {
			line = testLine;
		}
	}

	ctx.fillText(line, x, y);
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
		ctx.fillStyle = rgbToStr(0, 0, 0);
		ctx.textAlign = 'left';
		wrapText(text, 8, 18, w - 8, 12);
	}

	ctx.restore();
}

function yaUTI(x, y) {
	return map.hasOwnProperty(y) && map[y][x] != '#ffffff';
}

init();
