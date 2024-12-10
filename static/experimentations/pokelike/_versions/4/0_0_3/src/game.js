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

	if (G.ctx.mozImageSmoothingEnabled) {
		G.ctx.mozImageSmoothingEnabled = false;
	} else if (G.ctx.webkitImageSmoothingEnabled) {
		G.ctx.webkitImageSmoothingEnabled = false;
	}

	if (G.ctx.imageSmoothingEnabled) {
		G.ctx.imageSmoothingEnabled = false;
	}

	PreloadManager(G.images, G.image, G.create);
};

G.create = function() {
	G.change_map(G.map_begin, 2, 2, 'down');

	G.update();
};

G.update = function() {
	G.timer.update();

	switch (G.state) {
		case 'start':        G.start.update();        break;
		case 'game':         G.game.update();         break;
		case 'player_infos': G.player_infos.update(); break;
	}

	requestAnimFrame(G.update);
};

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
	grounds:       'assets/gfx/grounds.png',
	grounds_color: 'assets/gfx/grounds_color.png',
	items:         'assets/gfx/items.png',
	items_color:   'assets/gfx/items_color.png',
	dialog:        'assets/gfx/dialog.png',
	dialog_color:  'assets/gfx/dialog_color.png',
	player:        'assets/gfx/player.png',
	player_color:  'assets/gfx/player_color.png',
	player_infos:  'assets/gfx/player_infos.png',
	state_start:   'assets/gfx/state_start.png',
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

		if ((typeof tile.i != 'undefined' && typeof tile.s != 'undefined') || typeof tile.i == 'undefined') {
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
};

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
};

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
};
