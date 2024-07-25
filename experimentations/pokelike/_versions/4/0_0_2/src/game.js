var G = {};

G.init = function() {
	G.camera.w = G.camera.bw * G.basesize;
	G.camera.h = G.camera.bh * G.basesize;

	G.can.width  = G.camera.w * G.zoom;
	G.can.height = G.camera.h * G.zoom;

	G.ctx.fillBackground(G.can, rgb(0, 0, 0));
	G.ctx.fillStyle = rgb(255, 255, 255);
	G.ctx.font = 'normal 16px "Times New Roman", serif';
	G.ctx.textAlign = 'center';
	G.ctx.fillText('Chargement du jeu...', G.camera.w / 2, G.camera.h / 2);

	G.ctx.scale(G.zoom, G.zoom);
	G.ctx.mozImageSmoothingEnabled = false;

	PreloadManager(G.images, G.image, G.create);
}

G.create = function() {
	G.change_map(G.map_begin, 2, 2, 'down');

	G.update();
}

G.update = function() {
	G.timer.update();

	switch (G.state) {
		case 'start':        G.start.update();        break;
		case 'game':         G.game.update();         break;
		case 'player_infos': G.player_infos.update(); break;
	}

	requestAnimFrame(G.update);
}

G.can = getById('game');
G.ctx = G.can.getContext('2d');
G.log = getById('log');

G.basesize = 16;

G.camera = {
	x:  0,  // x
	y:  0,  // y
	w:  0,  // w
	h:  0,  // h
	bw: 10, // bw
	bh: 10  //bh
};

G.images = {
	grounds:      'assets/gfx/grounds.png',
	items:        'assets/gfx/items.png',
	dialog:       'assets/gfx/dialog.png',
	player:       'assets/gfx/player.png',
	player_infos: 'assets/gfx/player_infos.png',
	state_start:  'assets/gfx/state_start.png'
};

G.image = {};

G.player = {
	x:          0,
	y:          0,
	timerspeed: 0,
	name:       'Player',
	canmove:    true,
	speed:      2,
	dir:        'down',
	mov:        0
};

G.start_menu = false;
G.choice     = 0;

G.timer = new TimerManager();

G.map        = null;
G.map_height = 0;
G.map_width  = 0;

G.expand_draw = function() {};

G.state = 'start';

G.zoom = 2;

G.events = [
	function() { // 0
		G.player.canmove = false;

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

		launchText('Bienvenue a ' + G.player.name + '-ville.');

		G.expand_draw = function() {
			G.window_dialog(0, 120, G.can.width, 24, text);

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
					case 7: launchText('Non, ok.'); break;
					case 8: launchText('Bon, on fait quoi ?!'); break;
					case 9: launchText('...'); break;
					case 10: launchText('T\'as faim ?'); break;
					case 11: launchText('Moi aussi.'); break;
					case 12: launchText('Bon, il va falloir se quitter.'); break;
					case 13: launchText('C\'est triste, je t\'aime bien.'); break;
					case 14: launchText('Bon...'); break;
					case 15: launchText('Au revoir...'); break;

					default:
						G.player.canmove = true;
						G.expand_draw = function() {};
				}
			}
		};
	},

	function() { // 1
		G.change_map(G.map_house1, 3, 8);
	},

	function() { // 2
		G.change_map(G.map_begin, 6, 6);
	},

	function() { // 3
		G.change_map(G.map_house1_floor, 2, 8);
	},

	function() { // 4
		G.change_map(G.map_house1, 2, 1);
	},

	function() { // 5
		G.player.canmove = false;

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

		launchText('Salut ' + G.player.name + ', tu vas bien ?');

		G.choice = 0;

		var have_choice = true;

		G.expand_draw = function() {
			if (Key.press(Key.SPACE)) {
				for (var i = 0 ; i < texts.length ; i++) {
					clearTimeout(texts[i]);
				}

				switch (G.choice) {
					case 0:
						have_choice = false;
						launchText('COOL, moi aussi :)');
						G.choice = -1;
						break;

					case 1:
						have_choice = false;
						launchText('Ok, t\'es naze comme mec, tu fais pitie.');
						G.choice = -1;
						break;

					default:
						G.player.canmove = true;
						G.expand_draw = function() {};
				}
			}

			G.window_dialog(0, 120, G.can.width, 24, text);

			if (have_choice) {
				if (Key.press(Key.UP)) {
					G.choice--;
				} else if (Key.press(Key.DOWN)) {
					G.choice++;
				}

				if (G.choice < 0) {
					G.choice = 1;
				}

				if (G.choice > 1) {
					G.choice = 0;
				}

				G.window_dialog(110, 87, 50, 28);

				G.ctx.save();
				G.ctx.translate(130, 105);

				G.ctx.fillStyle = rgb(0, 0, 0);
				G.ctx.font = 'normal 12px "Courier New"';
				G.ctx.textAlign = 'left';

				G.ctx.fillText('OUI', 0, 0);
				G.ctx.fillText('NON', 0, 14);

				G.ctx.fillText('>', -12, G.choice *  14);

				G.ctx.restore();
			}
		};
	}
];

G.player_move = function(dir) {
	G.player.dir = dir;

	var incrx = 0;
	var incry = 0;

	switch (dir) {
		case 'left':  incrx = -G.player.speed; break;
		case 'up':    incry = -G.player.speed; break;
		case 'right': incrx = G.player.speed;  break;
		case 'down':  incry = G.player.speed;  break;
	}

	var newx = (G.player.x + (incrx * G.basesize / G.player.speed)) / G.basesize;
	var newy = (G.player.y + (incry * G.basesize / G.player.speed)) / G.basesize;

	if (G.map.validPos(newx, newy)) {
		var tile = G.map[newy][newx];

		if (!tile.s) {
			G.player.canmove = false;

			for (var i = 0 ; i < G.basesize ; i += G.player.speed) {
				setTimeout(function(i) {
					G.player.x += incrx;
					G.player.y += incry;

					if (i >= 0 && i <= 5) {
						G.player.mov = 1;
					} else if (i > 6 && i <= 12) {
						G.player.mov = 2;
					} else {
						G.player.mov = 0;
					}

					if (i == G.basesize - G.player.speed) {
						G.player.canmove = true;

						if (typeof tile.onenter != 'undefined') {
							G.events[tile.onenter]();
						}
					}
				}, i * 12, i);
			}
		}
	}
}

G.window_dialog = function(x, y, w, h, text) {
	G.ctx.save();
	G.ctx.translate(x, y);

	G.ctx.drawImage(G.image.dialog, 0, 0, 8, 8, 0, 0, 8, 8);
	G.ctx.drawImage(G.image.dialog, 8, 0, 8, 8, 8, 0, w - 16, 8);
	G.ctx.drawImage(G.image.dialog, 16, 0, 8, 8, w - 8, 0, 8, 8);

	G.ctx.drawImage(G.image.dialog, 0, 8, 8, 8, 0, 8, 8, h);
	G.ctx.drawImage(G.image.dialog, 8, 8, 8, 8, 8, 8, w - 16, h);
	G.ctx.drawImage(G.image.dialog, 16, 8, 8, 8, w  - 8, 8, 8, h);

	G.ctx.drawImage(G.image.dialog, 0, 16, 8, 8, 0, h + 8, 8, 8);
	G.ctx.drawImage(G.image.dialog, 8, 16, 8, 8, 8, h + 8, w - 16, 8);
	G.ctx.drawImage(G.image.dialog, 16, 16, 8, 8, w - 8, h + 8, 8, 8);

	if (typeof text != 'undefined') {
		G.ctx.font = 'normal 12px "Courier New"';
		G.ctx.fillStyle = rgb(0, 0, 0);
		G.ctx.textAlign = 'left';
		wrapText(G.ctx, text, 8, 18, w - 8, 12);
	}

	G.ctx.restore();
}

G.change_map = function(newmap, x, y, dir) {
	G.map        = newmap;
	G.map_height = G.map.length;
	G.map_width  = G.map[0].length;

	if (typeof x != 'undefined' && typeof y != 'undefined') {
		G.player.x = x * G.basesize;
		G.player.y = y * G.basesize;
	}

	if (typeof dir != 'undefined') {
		G.player.dir = dir;
	}
}

G.yaUTI = function(x, y) {
	return map.hasOwnProperty(y) && map[y][x] != '#ffffff';
}
