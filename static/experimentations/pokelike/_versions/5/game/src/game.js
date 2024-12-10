var G = {};

G.init = function() {
    G.can.width  = 500;
    G.can.height = 500;

	G.ctx.fillStyle = rgb(255, 255, 255);
	G.ctx.fillRect(0, 0, G.can.width, G.can.height);
	G.ctx.fillStyle = rgb(255, 255, 255);
	G.ctx.font = 'normal 16px "Times New Roman", serif';
	G.ctx.textAlign = 'center';
	G.ctx.fillText('Chargement du jeu...', G.can.width / 2 * G.zoom, G.can.height / 2 * G.zoom);

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
	G.map = G.ctx.get2darray_image(G.image.map);

	G.update();
};

G.update = function() {
	G.timer.update();

	switch (G.state) {
		case 'game': G.game.update(); break;
	}

	requestAnimationFrame(G.update);
};

G.can = getById('game');
G.ctx = G.can.getContext('2d');

G.log = getById('log');

G.basesize = 16;

G.images = {
	grounds: 'gfx/grounds.png',
	map: 'gfx/map.png'
};

G.image = {};

G.timer = new TimerManager();

G.map        = [];
G.map_height = 0;
G.map_width  = 0;

G.state = 'game';

G.zoom = 1;
