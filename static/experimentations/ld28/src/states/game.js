G.game = {};

G.game.init = function() {
	G.game.tilesize = 10;

	G.game.map_block = {
		'0,0,0': 3
	};

	G.game.map_entity = {};

	G.game.camera = {
		x:  0,  // position x
		y:  0,  // position y
		tw: 48, // nombre de blocs affichés en largeur
		th: 24, // nombre de blocs affichés en hauteur
		bx: 0,  // borne minimum x
		by: 0,  // borne minimum y
		mx: 0,  // borne maximum x
		my: 0   // borne maximum y
	};

	G.game.player = {
		x: 220,
		y: 0,
		width:  8,
		height: 8,
		move: false,
		diffx: -2,
		diffy: -2,
		canjump: false,
		speed: 2,
		speedy: 4,
		jump: 0,
		dir: 'right',
		mov: 0
	};

	G.game.bg = G.ctx.createPattern(G.image.bg, 'repeat');

	// Le jeu commence au niveau 1
	G.game.set_level('level1');

	// On définit la taille de l'écran
	G.set_screen_size(
		G.game.camera.tw * G.game.tilesize * G.scale,
		G.game.camera.th * G.game.tilesize * G.scale
	);
};

G.game.update = function() {
	var can = G.can,
		key = G.key,
		cam = G.game.camera,
		img = G.image,
		scale = G.scale,
		level = G.game.level,
		player = G.game.player,
		tilesize = G.game.tilesize;

	// Mise à jour du joueur
	var dirX = 'right';
 	var dirY = 'down';

	var newX = player.x;
	var newY = player.y;

	player.move = false;

	if (key.down(Key.RIGHT) || key.down(Key.D)) {
		newX += player.speed;
		player.dir = dirX = 'right';
		player.move = true;
	}

	if (key.down(Key.LEFT) || key.down(Key.Q)) {
		newX -= player.speed; 
		player.dir = dirX = 'left';
		player.move = true;
	}

	if ((key.down(Key.UP) || key.down(Key.Z)) && player.canjump) {
		player.jump = 5.5;
		player.canjump = false;
		player.speedy = 0;
	}

	player.canjump = false;
	player.jump -= 0.2;

	if (player.jump <= 0) {
		player.jump = 0;
	}

	player.speedy += 0.2;

	if (player.speedy >= 3) {
		player.speedy = 3;
	}

	newY -= player.jump;
	newY += player.speedy;

	if (player.jump - player.speedy >= 0) {
		dirY = 'up';
	}

	for (var y = Math.floor(player.y / tilesize) ; y <= Math.ceil((player.y + player.diffy) / tilesize) ; y++) {
		var the_x = (dirX == 'left') ? Math.floor(newX / tilesize) : Math.ceil(newX / tilesize);

		if (G.game.is_solid(the_x, y)) {
			newX = Math.round(player.x / tilesize) * tilesize - (dirX == 'right' ? player.diffx : 0);
		}
	}

	for (var x = Math.floor(player.x / tilesize) ; x <= Math.ceil((player.x + player.diffx) / tilesize) ; x++) {
		var the_y = (dirY == 'up') ? Math.floor(newY / tilesize) : Math.ceil(newY / tilesize);

		if (G.game.is_solid(x, the_y)) {
			newY = Math.round(player.y / tilesize) * tilesize - (dirY == 'down' ? player.diffy : 0);
			player.speedy = 0;

			if (dirY == 'down') {
				player.canjump = true;
			} else if (dirY == 'up') {
				player.jump = 0;
			}
		}
	}

	player.x = newX;
	player.y = newY;

	// Mise à jour de la caméra
	cam.x = -Math.clamp(0, player.x, 300);

	// Mise à jour de la position de la caméra
	cam.x = Math.round(Math.clamp(
				(-level.length * tilesize) + can.width / scale,
				-player.x + can.width / 2 / scale - (tilesize / 2),
				0));

	cam.y = Math.round(Math.clamp(
				(-level[0].length * tilesize) + can.height / scale,
				-player.y + can.height / 2 / scale - (tilesize / 2),
				0));

	// Mise à jour des bornes de la caméra
	cam.bx = Math.clamp(0, Math.floor(-cam.x / tilesize), img[G.game.cur_level].width - cam.tw - 1);
	cam.by = Math.clamp(0, Math.floor(-cam.y / tilesize), img[G.game.cur_level].height - cam.th - 1);

	cam.mx = Math.clamp(0, cam.bx + cam.tw + 1, img[G.game.cur_level].width);
	cam.my = Math.clamp(0, cam.by + cam.th + 1, img[G.game.cur_level].height);

	G.game.draw();
};

G.game.draw = function() {
	var can = G.can,
		ctx = G.ctx,
		img = G.image,
		cam = G.game.camera,
		level = G.game.level,
		player = G.game.player,
		tilesize = G.game.tilesize;

	var x,
		y,
		tile,
		block;

	// Efface tout
	ctx.clearRect(0, 0, can.width, can.height);

	ctx.save();
	ctx.scale(1 / G.scale, 1 / G.scale);

	ctx.fillStyle = G.game.bg;
	ctx.fillRect(0, 0, can.width, can.height);

	ctx.restore();

	// Décalage de l'affichage pour mettre le joueur au centre de la caméra
	ctx.save();
	ctx.translate(cam.x, cam.y);

	// Terrain
	for (x = cam.bx ; x < cam.mx ; x++) {
		for (y = 0 ; y < cam.th ; y++) {
			tile  = level[x][y];
			block = G.game.rgb_to_block(tile[0], tile[1], tile[2]);
			//alert(x + ' ; ' + y + ' => ' + tile);

			if (typeof block != 'undefined') {
				ctx.draw_image_index(
					img.tiles,
					tilesize,
					tilesize,
					block,
					x * tilesize,
					y * tilesize
				);
			}
		}
	}

	var frame = 0;

	if (player.move) {
		frame = Math.floor(player.mov / 4);

		if (frame > 1) {
			frame %= 2;
		}

		G.game.player.mov++;
	}

	// Joueur
	ctx.drawImage(
		img.player,
		frame * player.width,
		player.dir == 'right' ? 0 : player.height,
		player.width,
		player.height,
		player.x,
		player.y,
		player.width,
		player.height
	);

	// Restauration du décalage (c.f. ctx.save() ci-dessus)
	ctx.restore();
};

G.game.rgb_to_block = function(r, g, b) {
	return G.game.map_block[r + ',' + g + ',' + b];
};

G.game.rgb_to_entity = function(r, g, b) {
	return G.game.map_entity[r + ',' + g + ',' + b];
};

G.game.is_solid = function(x, y) {
	var tile_x = G.game.level[x];

	if (typeof tile_x == 'undefined')
		return true;

	var tile_y = tile_x[y];

	if (typeof tile_y == 'undefined')
		return true;

	var tile = tile_y;

	return tile[0] == 0 && tile[1] == 0 && tile[2] == 0;
};

G.game.set_level = function(level) {
	var tile,
		entity;

	G.set_screen_size(G.image[level].width, G.image[level].height);

	G.ctx.scale(1 / G.scale, 1 / G.scale);

	G.game.level = G.ctx.get2darray_image(G.image[level]);

	G.game.level_entity = [];

	G.game.cur_level = level;

	/*
	for (x = 0 ; x < level.length ; x++) {
		for (y = 0 ; y < level[x].length ; y++) {
			tile   = level[x][y];
			entity = G.game.rgb_to_entity(tile[0], tile[1], tile[2]);

			console.log(G.ctx.draw_image_index(
				G.image.tiles,
				G.game.tilesize,
				G.game.tilesize,
				entity,
				x * G.game.tilesize,
				y * G.game.tilesize,
				false
			));

			if (typeof entity != 'undefined') {
				//G.game.level_entity.push(new Todo());

				tile = [255, 255, 255, 255];
			}
		}
	}
	*/
};
