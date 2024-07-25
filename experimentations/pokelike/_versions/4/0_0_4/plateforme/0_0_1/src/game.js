var G = {};

G.init = function() {
	G.can.width  = 352;
	G.can.height = 352;

	G.ctx.fillBackground(G.can, rgb(0, 0, 0));
	G.ctx.fillStyle = rgb(255, 255, 255);
	G.ctx.font = 'normal 16px "Times New Roman", serif';
	G.ctx.textAlign = 'center';
	G.ctx.fillText('Chargement du jeu...', G.can.width / 2, G.can.height / 2);

	PreloadManager(G.images, G.image, G.create);
};

G.create = function() {
	G.update();
};

G.update = function() {
	G.timer.update();

	G.player.mx = G.player.x + G.player.w / 2;
	G.player.my = G.player.y + G.player.h / 2;

	/* Création des variables de directions */
 	var dar = 'down';
	var dir = 'null';

	/* Le joueur est interdit de sauter jusqu'à nouvel ordre */
	G.player.canjump = false;

	if (G.player.gravity < 6) { G.player.gravity += 1;  }
	if (G.player.gravity < 0) { dar = 'up'; }

	var newX = G.player.x;
	var newY = G.player.y + G.player.gravity;

	if (Key.down(Key.RIGHT)) { newX += 4; dir = 'right'; }
	if (Key.down(Key.LEFT))  { newX -= 4; dir = 'left'; }

	for (var y = Math.floor(G.player.y / G.basesize) ; y <= Math.ceil((G.player.y) / G.basesize) ; y++) {
		var the_x = (dir == 'left') ? Math.floor(newX / G.basesize) : Math.ceil((newX) / G.basesize);
		if (G.map.validPos(the_x, y) && G.map[y][the_x] == 1) {
			newX = Math.round(G.player.x / G.basesize) * G.basesize;
		}
	}

	for (var x = Math.floor(G.player.x / G.basesize) ; x <= Math.ceil((G.player.x) / G.basesize) ; x++) {
		var the_y = (dar == 'up') ? Math.floor(newY / G.basesize) : Math.ceil((newY) / G.basesize);

		if (G.map.validPos(x, the_y) && G.map[the_y][x] == 1) {
			newY = Math.round(G.player.y / G.basesize) * G.basesize;
			if (dar == 'up') { G.player.gravity = 0; }
			if (dar == 'down') { G.player.canjump = true; }
		}
	}

	if (Key.down(Key.UP) && G.player.canjump) { G.player.gravity = -14; G.player.canjump = false; }

	G.player.x = newX;
	G.player.y = newY;

	G.draw();

	//log.innerHTML = Math.round(distance2P(G.player.mx, G.player.my, Mouse.x, Mouse.y));

	requestAnimFrame(G.update);
};

G.draw = function() {
	G.ctx.clear(G.can);

	G.ctx.fillStyle = rgb(0, 0, 0);

	for (var y = 0 ; y < G.map_height ; y++) {
		for (var x = 0 ; x < G.map_width ; x++) {
			if (G.map[y][x] == 1) {
				var tile = G.map[y][x];

				G.ctx.fillRect(x * G.basesize, y * G.basesize, G.basesize, G.basesize);
			}
		}
	}

	G.ctx.fillStyle = rgb(255, 0, 0);

	G.ctx.fillRect(G.player.x, G.player.y, G.player.w, G.player.h);
};

G.can = getById('game');
G.ctx = G.can.getContext('2d');
G.log = getById('log');

G.player = {
	x:  16, y:  16,
	mx: 0,  my: 0,
	w:  16, h:  16,
	onmove:   false,
	speed:    5,
	gravity:  0,
	canjump:  true,
	maxspeed: { x: 1, y: 0.45 }
};

G.basesize = 16;

G.timer = new TimerManager();

G.images = {
};

G.image = {};

G.map = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

G.map_width  = G.map[0].length;
G.map_height = G.map.length;

document.onmousemove = function(evt) {
	Mouse.x = evt.pageX - G.can.offsetLeft;
	Mouse.y = evt.pageY - G.can.offsetTop;
};
