G.game = {};

G.game.init = function() {
	var img = G.image, can = G.can;

	// On récupère le code couleur de la carte
	can.width  = img.map.width;
	can.height = img.map.height;

	G.game.map = G.ctx.get2darray_image(img.map);

	G.resize();

	// On extrait l'index de chaque cellule de la carte
	var map = G.game.map, map_i = [], cell = [0, 0, 0];

	for (var x = 0 ; x < img.map.width ; x++) {
		map_i[x] = [];

		for (var y = 0 ; y < img.map.height ; y++) {
			cell = map[x][y];

			map_i[x][y] = G.game.rgb_to_index(cell[0], cell[1], cell[2]);
		}
	}

	G.game.map_index = map_i;
};

G.game.update = function() {
	var can = G.can, zoom = G.zoom, key = G.key, player = G.game.player, camera = G.camera,
		basesize = G.basesize, map = G.game.map;

	// On met à jour la position de la caméra
	camera.x = Math.round(Math.clamp(
				-player.x + can.width / 2 / zoom - (basesize / 2),
				(-map[0].length * basesize) + can.width / zoom,
				0));

	camera.y = Math.round(Math.clamp(
				-player.y + can.height / 2 / zoom - (basesize / 2),
				(-map.length * basesize) + can.height / zoom,
				0));

	// Déplacement du joueur
	if (key.down(Key.LEFT) || key.down(Key.Q)) {
		G.game.entity_move(player, 'left');
	} else if (key.down(Key.RIGHT) || key.down(Key.D)) {
		G.game.entity_move(player, 'right');
	} else if (key.down(Key.UP) || key.down(Key.Z)) {
		G.game.entity_move(player, 'up');
	} else if (key.down(Key.DOWN) || key.down(Key.S)) {
		G.game.entity_move(player, 'down');
	}

	G.game.draw();
};

G.game.draw = function() {
	var can = G.can, ctx = G.ctx, img = G.image, map = G.game.map_index, basesize = G.basesize, player = G.game.player,
		camera = G.camera;

	// On efface la zone de dessin
	ctx.clearRect(0, 0, can.width, can.height);

	// On déplace l'affichage jusqu'à la position de la caméra
	ctx.save();
	ctx.translate(camera.x, camera.y);

	// On affiche la carte avec les bornes [bx;by]->[mx;my]
	var by = Math.clamp(Math.floor(-camera.y / basesize), 0, img.map.height - camera.bh - 1);
	var bx = Math.clamp(Math.floor(-camera.x / basesize), 0, img.map.width - camera.bw - 1);

	var mx = Math.clamp(bx + camera.bw + 1, 0, img.map.height);
	var my = Math.clamp(by + camera.bh + 1, 0, img.map.width);

	var tile, basex, basey;

	for (var x = bx ; x < mx ; x++) {
		for (var y = by ; y < my ; y++) {
			ctx.draw_image_index(
				img.tiles,
				basesize,
				basesize,
				map[x][y],
				x * basesize,
				y * basesize
			);
		}
	}

	// On affiche le joueur
	var basey = 0;

	switch (player.dir) {
		case 'left':  basey = 0;  break;
		case 'up':    basey = 18; break;
		case 'right': basey = 36; break;
		case 'down':  basey = 54; break;
		default:      basey = 0;
	}

	ctx.drawImage(img.player, player.mov * 14, basey, 14, 18, player.x + 1, player.y - 6, 14, 18);

	ctx.restore();
};

// Permet d'obtenir l'index à afficher à partir d'une couleur r,g,b
// On peut aussi obtenir l'état solide de la cellule en donnant "solid" pour valeur au dernier paramètre
G.game.rgb_to_index = function(r, g, b, what) {
	what = what || 'index';

	var indexes = {
		// color: collide, index
		'255,255,255': [0, 0],
		'0,0,0':       [1, 1],
		'255,0,0':     [1, 2],
		'87,0,127':    [0, 3],
		'182,255,0':   [1, 4],
		'63,127,127':  [0, 5]
	};

	if (what == 'index')
		return indexes[r + ',' + g + ',' + b][1];
	else (what == 'solid')
		return indexes[r + ',' + g + ',' + b][0];
};

// Carte
G.game.map = null;
G.game.map_index = null;

// Joueur
G.game.player = {
	x:       6 * G.basesize,
	y:       16 * G.basesize,
	w:       14,
	h:       18,
	name:    'Player',
	canmove: true,
	speed:   2,
	dir:     'down',
	mov:     0
};

// Déplacement d'une entité
G.game.entity_move = function(entity, dir) {
	if (entity.canmove) {
		entity.dir = dir;

		var basesize = G.basesize;

		var incrx = 0;
		var incry = 0;

		switch (dir) {
			case 'left':  incrx = -entity.speed; break;
			case 'right': incrx = entity.speed;  break;
			case 'up':    incry = -entity.speed; break;
			case 'down':  incry = entity.speed;  break;
		}

		var newx = (entity.x + (incrx * basesize / entity.speed)) / basesize;
		var newy = (entity.y + (incry * basesize / entity.speed)) / basesize;

		if (typeof G.game.map[newx] !== 'undefined' && typeof G.game.map[newx][newy] !== 'undefined') {
			var tile        = G.game.map[newx][newy];
			var have_pnj    = false;
			var have_player = false;

			if (typeof tile != 'undefined' && G.game.rgb_to_index(tile[0], tile[1], tile[2], 'solid') == 0) {
				entity.canmove = false;

				for (var i = 0 ; i < basesize ; i += entity.speed) {
					setTimeout(function(i) {
						entity.x += incrx;
						entity.y += incry;

						if (i >= 0 && i <= 5) {
							entity.mov = 1;
						} else if (i > 6 && i <= 12) {
							entity.mov = 2;
						} else {
							entity.mov = 0;
						}

						if (i == basesize - entity.speed) {
							entity.canmove = true;
						}
					}, i * 12, i);
				}
			}
		}
	}
};
