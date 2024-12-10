G.game = {};

G.game.init = function() {
	var can = G.can,
		img = G.image;

	var i,
		x,
		y,
		map,
		map_rgb,
		map_t_rgb;

	// On récupère le code couleur des cartes du jeu
	for (i in G.map) {
		if (typeof G.map[i] == 'object' && typeof img[i] != 'undefined') {
			can.width  = img[i].width;
			can.height = img[i].height;

			map_rgb   = G.ctx.get2darray_image(img[i]);
			map_t_rgb = G.ctx.get2darray_image(img[i + '_top']);

			// On extrait l'index de chaque cellule de la carte
			map = [], map_t = [], cell = [0, 0, 0];

			for (x = 0, x_len = img[i].width ; x < x_len ; x++) {
				map[x]   = [];
				map_t[x] = [];

				for (y = 0, y_len = img[i].height ; y < y_len ; y++) {
					cell   = map_rgb[x][y];
					cell_t = map_t_rgb[x][y];

					map[x][y]   = rgb_to_number(cell[0], cell[1], cell[2]);
					map_t[x][y] = rgb_to_number(cell_t[0], cell_t[1], cell_t[2]);
				}
			}

			G.map[i].map   = map;
			G.map[i].map_t = map_t;
		}
	}

	G.resize();
};

G.game.update = function() {
	var can = G.can,
		img = G.image,
		key = G.key,
		cam = G.camera,
		map = G.map[G.cur_map].map,
		zoom = G.zoom,
		player = G.game.player,
		basesize = G.basesize;

	var x,
		y,
		targetx,
		targety;

	// On met à jour la position de la caméra
	cam.x = Math.round(Math.clamp(
				-player.x + can.width / 2 / zoom - (basesize / 2),
				(-map.length * basesize) + can.width / zoom,
				0));

	cam.y = Math.round(Math.clamp(
				-player.y + can.height / 2 / zoom - (basesize / 2),
				(-map[0].length * basesize) + can.height / zoom,
				0));

	// On met à jour les bornes de la caméra
	cam.bx = Math.clamp(Math.floor(-cam.x / basesize), 0, img[G.cur_map].width - cam.tw - 1);
	cam.by = Math.clamp(Math.floor(-cam.y / basesize), 0, img[G.cur_map].height - cam.th - 1);

	cam.mx = Math.clamp(cam.bx + cam.tw + 1, 0, img[G.cur_map].width);
	cam.my = Math.clamp(cam.by + cam.th + 1, 0, img[G.cur_map].height);

	// Déplacement du joueur
	if (key.down(Key.LEFT, Key.Q)) {
		G.game.entity_move(player, 'left');
	} else if (key.down(Key.RIGHT, Key.D)) {
		G.game.entity_move(player, 'right');
	} else if (key.down(Key.UP, Key.Z)) {
		G.game.entity_move(player, 'up');
	} else if (key.down(Key.DOWN, Key.S)) {
		G.game.entity_move(player, 'down');
	}

	// Effectuer une action
	if (key.press(Key.SPACE)) {
		targetx = 0;
		targety = 0;

		switch (player.dir) {
			case 'left':  targetx = -basesize; break;
			case 'up':    targety = -basesize; break;
			case 'right': targetx = basesize;  break;
			case 'down':  targety = basesize;  break;
		}

		x = Math.round((player.x + targetx) / basesize);
		y = Math.round((player.y + targety) / basesize);

		if (typeof G.map[G.cur_map].map[x] !== 'undefined' && typeof G.map[G.cur_map].map[x][y] !== 'undefined') {
			if (typeof G.map[G.cur_map]['a' + x + ';' + y] != 'undefined') {
				G.map[G.cur_map]['a' + x + ';' + y]();
			}
		}
	}

	// On calcul quelle position du joueur affiché suivant sa direction
	switch (player.dir) {
		case 'left':  player.basey = 0;  break;
		case 'up':    player.basey = 18; break;
		case 'right': player.basey = 36; break;
		case 'down':  player.basey = 54; break;
		default:      player.basey = 0;
	}

	// On affiche la scène
	G.game.draw();
};

G.game.draw = function() {
	var can = G.can,
		ctx = G.ctx,
		img = G.image,
		cam = G.camera,
		map = G.map[G.cur_map].map,
		map_t = G.map[G.cur_map].map_t,
		player = G.game.player,
		basesize = G.basesize;

	var x,
		y;

	// On efface la zone de dessin
	ctx.clearRect(0, 0, can.width, can.height);

	// On déplace l'affichage jusqu'à la position de la caméra
	ctx.save();
	ctx.translate(cam.x, cam.y);

	// On affiche la carte avec les bornes [bx;by]->[mx;my]
	for (x = cam.bx ; x < cam.mx ; x++) {
		for (y = cam.by ; y < cam.my ; y++) {
			ctx.draw_image_index(
				img.back,
				basesize,
				basesize,
				map[x][y],
				x * basesize,
				y * basesize
			);

			// On affiche un tile de la couche haute si ce n'est pas le 0,
			// pour éviter de surcharger un affichage inutile de transparent
			if (map_t[x][y] != 0) {
				ctx.draw_image_index(
					img.top,
					basesize,
					basesize,
					map_t[x][y],
					x * basesize,
					y * basesize
				);
			}
		}
	}

	// On affiche le joueur
	ctx.drawImage(
		img.player,
		player.mov * player.w,
		player.basey,
		player.w,
		player.h,
		player.x + 1,
		player.y - 4,
		player.w,
		player.h
	);

	// On restaure l'affichage
	ctx.restore();
};

// Le tile est-il solide ?
G.game.is_solid = function(tile_back, tile_top) {
	return G.game.solids_back.indexOf(tile_back) != -1 || G.game.solids_top.indexOf(tile_top) != -1;
};

// Téléporter le joueur
G.game.tp_player = function(x, y, map) {
	// -1 pour ne pas changer de position

	if (x != -1)
		G.game.player.x = x * G.basesize;

	if (y != -1)
		G.game.player.y = y * G.basesize;

	if (typeof map != 'undefined')
		G.change_map(map);
};

// Joueur
G.game.player = {
	x:       10 * G.basesize,
	y:       15 * G.basesize,
	w:       14,
	h:       18,
	basey:   0,
	name:    'Player',
	canmove: true,
	speed:   2,
	dir:     'down',
	mov:     0
};

// Indexs des tiles solides (back)
G.game.solids_back = [
	0, 1, 3, 4, 5,
	13, 14, 15,
	20, 21, 22
];

// Indexs des tiles solides (top)
G.game.solids_top = [
	1, 2, 3, 4,
	11, 12, 13, 14,
	21,
	30, 31, 32, 33, 34, 35, 36, 37, 38,
	40, 41, 42, 43, 44, 45, 46, 47, 48,
	50, 51, 52, 53, 54, 55, 56, 57, 58,
	60, 61, 62, 63, 64, 65,
	70, 71, 72, 73, 74, 75, 76, 77
];

// todo : Liste des tiles animés
G.game.animated_tiles = [
];

// Déplacement d'une entité (todo : commenter)
G.game.entity_move = function(entity, dir) {
	if (entity.canmove) {
		var	map = G.map[G.cur_map],
			basesize = G.basesize;

		var i,
			tile,
			newx,
			newy,
			incrx,
			incry,
			have_pnj,
			have_player;

		entity.dir = dir;

		incrx = 0;
		incry = 0;

		switch (dir) {
			case 'left':  incrx = -entity.speed; break;
			case 'right': incrx = entity.speed;  break;
			case 'up':    incry = -entity.speed; break;
			case 'down':  incry = entity.speed;  break;
		}

		newx = (entity.x + (incrx * basesize / entity.speed)) / basesize;
		newy = (entity.y + (incry * basesize / entity.speed)) / basesize;

		if (typeof map.map[newx] !== 'undefined' && typeof map.map[newx][newy] !== 'undefined') {
			tile        = map.map[newx][newy];
			have_pnj    = false;
			have_player = false;

			if (typeof tile != 'undefined' && !G.game.is_solid(map.map[newx][newy], map.map_t[newx][newy])) {
				entity.canmove = false;

				for (i = 0 ; i < basesize ; i += entity.speed) {
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

							// todo : vérifier si l'entité est un joueur
							if (typeof map['e' + newx + ';' + newy] != 'undefined') {
								map['e' + newx + ';' + newy]();
							}
						}
					}, i * 12, i);
				}
			}
		}
	}
};

// Afficher des textes (panneaux et PNJs)
G.game.show_text = function(texts) {
	if (G.expand() || !G.game.player.canmove)
		return;

	var ctx = G.ctx,
		can = G.can,
		key = G.key;
		zoom = G.zoom,

	G.game.player.canmove  = false;

	var ind         = 0,
		text        = '',
		ctext       = [],
		ftext       = '',
		choice      = 0,
		have_choice = false;

	var launch_text = function(t) {
		var i;

		choice = 0;
		have_choice = typeof t == 'object';

		t     = typeof t == 'string' ? t : t[0];
		text  = '';
		ftext = t;

		for (i = 0, l = t.length ; i < l ; i++) {
			(function(i) {
				ctext[i] = setTimeout(function() {
					text += t.charAt(i);
				}, i * 24);
			}(i));
		}
	}

	key.ktime++; // bidouille...
	launch_text(texts[ind++]);

	G.expand = function() {
		var i,
			x,
			y,
			w,
			h;

		G.window_dialog(0, can.height / zoom - 40, can.width / zoom, 24, text);

		if (key.press(Key.SPACE) && !have_choice) {
			key.ktime++; // bidouille...

			for (i = 0, l = ctext.length ; i < l ; i++) {
				clearTimeout(ctext[i]);
			}

			if (ftext == text) {
				if (typeof texts[ind] != 'undefined') {
					launch_text(texts[ind++]);
				} else {
					G.game.player.canmove  = true;

					G.expand = function() {
						return false;
					};
				}
			} else {
				text = ftext;
			}
		}

		if (have_choice) {
			if (key.press(Key.UP) && ftext == text) {
				key.ktime++; // bidouille...
				choice--;
			} else if (key.press(Key.DOWN) && ftext == text) {
				key.ktime++; // bidouille...
				choice++;
			} else if (key.press(Key.SPACE)) {
				key.ktime++; // bidouille...

				for (i = 0, l = ctext.length ; i < l ; i++) {
					clearTimeout(ctext[i]);
				}

				if (ftext == text) {
					G.game.player.canmove  = true;

					G.expand = function() {
						return false;
					};

					texts[ind - 1][choice + 1][1]();
				} else {
					text = ftext;
				}
			}

			if (ftext == text) {
				if (choice < 0) {
					choice = texts[ind - 1].length - 2;
				}

				if (choice > texts[ind - 1].length - 2) {
					choice = 0;
				}

				ctx.fillStyle = rgb(0, 0, 0);
				ctx.font = 'normal 8px "Polikefont"';
				ctx.textAlign = 'left';

				w = 0;
				for (i = 1, l = texts[ind - 1].length ; i < l ; i++) {
					if (ctx.measureText(texts[ind - 1][i][0]).width > w) {
						w = ctx.measureText(texts[ind - 1][i][0]).width;
					}
				}
				h = (texts[ind - 1].length - 1) * 14;

				x = (can.width / zoom) - w;
				y = (can.height / zoom) - 80;

				G.window_dialog(x - 30, y - h + 27, w + 30, h);

				ctx.save();

				ctx.translate(x - 10, y + 18 - h + 27);

				for (i = 1, l = texts[ind - 1].length ; i < l ; i++) {
					ctx.fillText(texts[ind - 1][i][0], 0, (i - 1) * 14);
				}

				ctx.fillText('>', -6, choice *  14);

				ctx.restore();
			}
		}

		return true;
	};
};
