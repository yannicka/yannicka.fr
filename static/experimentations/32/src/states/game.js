/* -----------------------------------------
	Créer la variable de la scène de jeu
----------------------------------------- */
G.game = {};

/* ----------------------
	Met à jour le jeu
---------------------- */
G.game.update = function() {
	/* --------
		AAA
	-------- */
	/* Déplacement de la caméra */
	G.game.camera.x = Math.clamp(-G.game.player.x - G.game.player.w / 2 + G.can.width / 2, -G.game.map_width * G.basesize + G.can.width, 0);
	G.game.camera.y = Math.clamp(-G.game.player.y - G.game.player.h / 2 + G.can.height / 2, -G.game.map_height * G.basesize + G.can.height, 0);

	/* --------
		AAA
	-------- */
	/* Mise à jour de la position du milieu du joueur */
	G.game.player.mx = G.game.player.x + (G.game.player.w / 2);
	G.game.player.my = G.game.player.y + (G.game.player.h / 2);

	/* --------
		AAA
	-------- */
	/* Déplacement du joueur */
	if (!G.game.pause) {
		var dirX = 'right';
	 	var dirY = 'down';

		var newX = G.game.player.x;
		var newY = G.game.player.y;

		G.game.player.move = false;

		if (Key.down(Key.RIGHT) || Key.down(Key.D)) { newX += G.game.player.speed; G.game.player.dir = dirX = 'right'; G.game.player.move = true; }
		if (Key.down(Key.LEFT)  || Key.down(Key.Q)) { newX -= G.game.player.speed; G.game.player.dir = dirX = 'left';  G.game.player.move = true; }
		if (Key.down(Key.UP)    || Key.down(Key.Z)) { newY -= G.game.player.speed; G.game.player.dir = dirY = 'up';    G.game.player.move = true; }
		if (Key.down(Key.DOWN)  || Key.down(Key.S)) { newY += G.game.player.speed; G.game.player.dir = dirY = 'down';  G.game.player.move = true; }

		for (var y = Math.floor(G.game.player.y / G.basesize) ; y <= Math.ceil((G.game.player.y + G.game.player.diffy) / G.basesize) ; y++) {
			var the_x = (dirX == 'left') ? Math.floor(newX / G.basesize) : Math.ceil(newX / G.basesize);

			if (G.game.grounds[G.game.map[y][the_x].g].solid || typeof G.game.map[y][the_x].i != 'undefined') {
				newX = Math.round(G.game.player.x / G.basesize) * G.basesize - (dirX == 'right' ? G.game.player.diffx : 0);
			}
		}

		for (var x = Math.floor(G.game.player.x / G.basesize) ; x <= Math.ceil((G.game.player.x + G.game.player.diffx) / G.basesize) ; x++) {
			var the_y = (dirY == 'up') ? Math.floor(newY / G.basesize) : Math.ceil(newY / G.basesize);

			if (G.game.grounds[G.game.map[the_y][x].g].solid || typeof G.game.map[the_y][x].i != 'undefined') {
				newY = Math.round(G.game.player.y / G.basesize) * G.basesize - (dirY == 'down' ? G.game.player.diffy : 0);
			}
		}

		if (Key.down(Key.UP) && G.game.player.canjump) { G.game.player.gravity = -14; G.game.player.canjump = false; }

		G.game.player.x = newX;
		G.game.player.y = newY;

		G.game.target.x = Math.floor(G.game.player.mx / G.basesize);
		G.game.target.y = Math.floor(G.game.player.my / G.basesize);

		switch (G.game.player.dir) {
			case 'up':    G.game.target.y--; break;
			case 'down':  G.game.target.y++; break;
			case 'left':  G.game.target.x--; break;
			case 'right': G.game.target.x++; break;
		}

		if (Key.press(Key.X)) {
			var item = G.game.map[G.game.target.y][G.game.target.x].i;

			if (typeof item != 'undefined') {
				item = G.game.items[item].item_take;

				var new_index = -1;

				for (var i = 0 ; i < 10 ; i++) {
					if (item == G.game.inventory.items[i].i && G.game.inventory.items[i].q < G.game.inventory.max_stack) {
						G.game.inventory.items[i].q++;

						delete G.game.map[G.game.target.y][G.game.target.x].i;
						new_index = i;
						break;
					}
				}

				if (new_index == -1) {
					for (var i = 0 ; i < 10 ; i++) {
						if (G.game.inventory.items[i].i == -1) {
							G.game.inventory.items[i].i = item;
							G.game.inventory.items[i].q = 1;

							delete G.game.map[G.game.target.y][G.game.target.x].i;
							break;
						}
					}
				}
			}
		}

		if (Key.press(Key.C)) {
			if (G.game.inventory.items[G.game.inventory.choice].i != -1) {
				if (!G.game.grounds[G.game.map[G.game.target.y][G.game.target.x].g].solid && typeof G.game.map[G.game.target.y][G.game.target.x].i == 'undefined') {
					G.game.map[G.game.target.y][G.game.target.x].i = G.game.inventory.items[G.game.inventory.choice].i;

					if (--G.game.inventory.items[G.game.inventory.choice].q < 1) {
						G.game.inventory.items[G.game.inventory.choice].i = -1;
					}
				}
			}
		}
	} else {
		if (Key.press(Key.UP)) {
			if (--G.game.choice_menu < 0) {
				G.game.choice_menu = G.game.menu.length - 1;
			}
		} else if (Key.press(Key.DOWN)) {
			G.game.choice_menu++;
			G.game.choice_menu %= G.game.menu.length;
		}

		if (Key.press(Key.X)) {
			G.game[G.game.menu[G.game.choice_menu].callback]();
		}

		if (Key.press(Key.C) || Key.press(Key.ENTER)) {
			G.game.menu_close();
		}
	}

	/* --------
		AAA
	-------- */
	/* Mise en pause et inverse */
	if (Key.press(Key.ESC) || Key.press(Key.I)) {
		G.game.choice_menu = 0;
		G.game.pause       = !G.game.pause;
	}

	/* --------
		AAA
	-------- */
	// Choix d'un objet dans l'inventaire
	if (Key.press(Key.NUM1) || Key.press(Key.NUMPAD1)) { G.game.inventory.choice = 0; }
	if (Key.press(Key.NUM2) || Key.press(Key.NUMPAD2)) { G.game.inventory.choice = 1; }
	if (Key.press(Key.NUM3) || Key.press(Key.NUMPAD3)) { G.game.inventory.choice = 2; }
	if (Key.press(Key.NUM4) || Key.press(Key.NUMPAD4)) { G.game.inventory.choice = 3; }
	if (Key.press(Key.NUM5) || Key.press(Key.NUMPAD5)) { G.game.inventory.choice = 4; }
	if (Key.press(Key.NUM6) || Key.press(Key.NUMPAD6)) { G.game.inventory.choice = 5; }
	if (Key.press(Key.NUM7) || Key.press(Key.NUMPAD7)) { G.game.inventory.choice = 6; }
	if (Key.press(Key.NUM8) || Key.press(Key.NUMPAD8)) { G.game.inventory.choice = 7; }
	if (Key.press(Key.NUM9) || Key.press(Key.NUMPAD9)) { G.game.inventory.choice = 8; }
	if (Key.press(Key.NUM0) || Key.press(Key.NUMPAD0)) { G.game.inventory.choice = 9; }

	G.game.draw();
};

/* -------------------
	Dessine le jeu
------------------- */
G.game.draw = function() {
	G.ctx.clear(G.can);
	G.ctx.fillStyle = rgb(255, 255, 255);
	G.ctx.fillBackground(G.can);

	G.ctx.save();
	G.ctx.translate(G.game.camera.x, G.game.camera.y);
		G.ctx.fillStyle = rgb(0, 0, 0);

		var bx = Math.clamp(Math.floor(-G.game.camera.x / G.basesize), 0, G.game.map_width - G.game.camera.bw - 1);
		var by = Math.clamp(Math.floor(-G.game.camera.y / G.basesize), 0, G.game.map_height - G.game.camera.bh - 1);

		var mx = Math.clamp(Math.round(bx + G.game.camera.bw + 1), 0, G.game.map_width);
		var my = Math.clamp(Math.round(by + G.game.camera.bh + 1), 0, G.game.map_height);

		var tile_by_line, aa, bb, basex, basey;

		for (var y = by ; y < my ; y++) {
			for (var x = bx ; x < mx ; x++) {
				var tile = G.game.map[y][x];

				basex = tile.g * G.basesize + tile.g;
				basey = 0;

				tile_by_line = Math.ceil(G.image.grounds.width / (G.basesize + 1));

				bb = tile.g % tile_by_line;
				basex = bb * G.basesize + bb;

				aa = Math.floor(tile.g / tile_by_line);
				basey = aa * G.basesize + aa;

				G.game.push_ground(basex, basey, x, y);

				if (typeof tile.i != 'undefined' && tile.i != -1) {
					basex = tile.i * G.basesize + tile.i;
					basey = 0;

					tile_by_line = Math.ceil(G.image.items.width / (G.basesize + 1));

					bb = tile.i % tile_by_line;
					basex = bb * G.basesize + bb;

					aa = Math.floor(tile.i / tile_by_line);
					basey = aa * G.basesize + aa;

					G.game.push_item(basex, basey, x, y);
				}
			}
		}

		if (G.game.player.move) {
			var frame = Math.floor(G.game.player.mov / 4);

			if (frame > 2) {
				frame %= 3;
			}

			G.game.player.mov++;
		} else {
			var frame = 0;
		}

		var dir = 0;

		switch (G.game.player.dir) {
			case 'up':    dir = 0; break;
			case 'down':  dir = 1; break;
			case 'left':  dir = 2; break;
			case 'right': dir = 3; break;
		}

		G.ctx.drawImage(G.image.target, G.game.target.x * G.basesize, G.game.target.y * G.basesize);

		G.ctx.drawImage(G.image.player, frame * G.game.player.w, dir * G.game.player.h, G.game.player.w, G.game.player.h, G.game.player.x, G.game.player.y, G.game.player.w, G.game.player.h);
	G.ctx.restore();

	G.ctx.fillStyle = rgb(140, 220, 255);
	G.ctx.fillRect(0, 208, 208, 22);
	G.ctx.drawImage(G.image.inventory, 17, 210);

	G.ctx.fillStyle = rgb(255, 255, 255);
	G.ctx.font = '11px "Monaco", monospace';
	G.ctx.textAlign = 'right';

	for (var i = 0 ; i < 10 ; i++) {
		if (G.game.inventory.items[i].i != -1) {
			G.ctx.drawImage(G.image.items_inventory, G.game.inventory.items[i].i * G.basesize + G.game.inventory.items[i].i, 0, G.basesize, G.basesize, 19 + (i * 20) - i, 212, G.basesize, G.basesize);

			G.ctx.save();
				G.ctx.shadowColor = 'rgb(0, 0, 0)';
				G.ctx.shadowBlur = 0;
				G.ctx.shadowOffsetX = 1;
				G.ctx.shadowOffsetY = 1;
				G.ctx.fillText(G.game.inventory.items[i].q, 35 + (i * 20) - i, 227);
			G.ctx.restore();
		}
	}

	G.ctx.drawImage(G.image.inventory_target, 17 + (G.game.inventory.choice * 20) - G.game.inventory.choice, 210);

	if (G.game.pause) {
		G.game.window_dialog(112, 0, 96, 38);
		G.ctx.fillStyle = rgb(0, 0, 0);
		G.ctx.font = 'bold 12px "Times New Roman", serif';
		G.ctx.textAlign = 'left';

		for (var choice in G.game.menu) {
			G.ctx.fillText(G.game.menu[choice].name, 132, 22 + (choice * 18));
		}

		G.ctx.save();
		G.ctx.translate(122, G.game.choice_menu * 18 + 12);
			G.ctx.moveTo(0, 0);
			G.ctx.lineTo(5, 5);
			G.ctx.lineTo(0, 10);
			G.ctx.lineTo(0, 0);
			G.ctx.fill();
		G.ctx.restore();
	}
};

/* -------------------
	Affiche un sol
------------------- */
G.game.push_ground = function(bx, by, x, y) {
	G.ctx.drawImage(G.image.grounds, bx, by, G.basesize, G.basesize, x * G.basesize, y * G.basesize, G.basesize, G.basesize);
};

/* ----------------------------
	Affiche un objet au sol
---------------------------- */
G.game.push_item = function(bx, by, x, y) {
	G.ctx.drawImage(G.image.items, bx, by, G.basesize, G.basesize, x * G.basesize, y * G.basesize, G.basesize, G.basesize);
};

/* ------------------------------
	Ouverture de l'inventaire
------------------------------ */
G.game.menu_inventory = function() {
};

/* -----------------
	Ferme le menu
----------------- */
G.game.menu_close = function() {
	G.game.pause = false;
};

/* --------------------------------------
	Permet de changer de carte de jeu
-------------------------------------- */
G.game.change_map = function(i) {
	G.game.map        = G.game.maps[i];
	G.game.map_height = G.game.map.length;
	G.game.map_width  = G.game.map[0].length;
};

/* ----------------------------------
	Affiche une boîte de dialogue
---------------------------------- */
G.game.window_dialog = function(x, y, w, h, text) {
	G.ctx.save();
	G.ctx.translate(x, y);

	// Haut
	G.ctx.drawImage(G.image.dialog, 0, 0, 8, 8, 0, 0, 8, 8);
	G.ctx.drawImage(G.image.dialog, 8, 0, 8, 8, 8, 0, w - 16, 8);
	G.ctx.drawImage(G.image.dialog, 16, 0, 8, 8, w - 8, 0, 8, 8);

	// Centre
	G.ctx.drawImage(G.image.dialog, 0, 8, 8, 8, 0, 8, 8, h);
	G.ctx.drawImage(G.image.dialog, 8, 8, 8, 8, 8, 8, w - 16, h);
	G.ctx.drawImage(G.image.dialog, 16, 8, 8, 8, w  - 8, 8, 8, h);

	// Bas
	G.ctx.drawImage(G.image.dialog, 0, 16, 8, 8, 0, h + 8, 8, 8);
	G.ctx.drawImage(G.image.dialog, 8, 16, 8, 8, 8, h + 8, w - 16, 8);
	G.ctx.drawImage(G.image.dialog, 16, 16, 8, 8, w - 8, h + 8, 8, 8);

	// Texte
	if (typeof text != 'undefined') {
		G.ctx.font = 'normal 12px "Courier New"';
		G.ctx.fillStyle = rgb(0, 0, 0);
		G.ctx.textAlign = 'left';
		wrapText(G.ctx, text, 8, 18, w - 8, 12);
	}

	G.ctx.restore();
};

/* ----------------------------------------------------------
	Informations sur la cible (= case visée par le joueur)
---------------------------------------------------------- */
G.game.target = {
	x: 0,
	y: 0
};

/* ----------------------------------
	Informations sur l'inventaire
---------------------------------- */
G.game.inventory = {
	choice:    0,
	max_stack: 32,
	items: [
		{ i: -1, q: 0 }, { i: -1, q: 0 }, { i :-1, q: 0 }, { i: -1, q: 0 }, { i: -1, q: 0 },
		{ i: -1, q: 0 }, { i: -1, q: 0 }, { i: -1, q: 0 }, { i: -1, q: 0 }, { i: -1, q: 0 }
	]
};

/* -------------------
	Menu principal
------------------- */
G.game.pause       = false;
G.game.choice_menu = 0;
G.game.menu        = [
	{ name: 'Inventaire', callback: 'menu_inventory' },
	{ name: 'Fermer',     callback: 'menu_close'     }
];

/* ------------------------------------------------------------------------
	Définit les sols, les objets au sol et les objets dans l'inventaire
------------------------------------------------------------------------ */
G.game.grounds         = [];
G.game.items           = [];
G.game.inventory_items = [];

/* -------------------------------
	Informations sur la caméra
------------------------------- */
G.game.camera = {
	x:  0,  // position x
	y:  0,  // position y
	w:  0,  // largeur de la caméra
	h:  0,  // hauteur de la caméra
	bw: 13, // nombre de tuiles visible en largeur
	bh: 13  // nombre de tuiles visible en hauteur
};

/* ---------------------------------------
	Code des différentes cartes du jeu
--------------------------------------- */
G.game.maps = [
	[ // 0
		[{g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}], [{g:1}, {g:1}, {g:1}, {g:1}, {g:0}, {g:0}, {g:0}, {g:3}, {g:3}, {g:3}, {g:3}, {g:3}, {g:3}, {g:3}, {g:1}, {g:1}, {g:1}, {g:1}], [{g:1}, {g:1}, {g:1}, {g:0}, {g:0}, {g:0}, {g:3}, {g:3}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:3}, {g:1}, {g:1}, {g:1}, {g:1}], [{g:1}, {g:2}, {g:2}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0, i:0}, {g:0, i:0}, {g:0, i:0}, {g:0}, {g:1}, {g:0}, {g:1}, {g:1}], [{g:1}, {g:2}, {g:2}, {g:2}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0, i:0}, {g:0}, {g:0, i:0}, {g:0}, {g:0}, {g:0}, {g:1}, {g:1}], [{g:1}, {g:2}, {g:2}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0, i:0}, {g:0}, {g:0, i:0}, {g:0, i:0}, {g:0, i:0}, {g:0, i:0}, {g:0}, {g:1}], [{g:1}, {g:2}, {g:2}, {g:0}, {g:0, i:0}, {g:0, i:0}, {g:0, i:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0, i:0}, {g:0, i:0}, {g:0}, {g:1}], [{g:1}, {g:2}, {g:2}, {g:0}, {g:0, i:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0, i:0}, {g:0}, {g:0}, {g:1}], [{g:1}, {g:2}, {g:2, i:3}, {g:0}, {g:0, i:0}, {g:0, i:0}, {g:0, i:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:1}], [{g:1}, {g:2}, {g:2, i:3}, {g:0}, {g:0}, {g:0, i:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0, i:2}, {g:0, i:2}, {g:0, i:2}, {g:0, i:3}, {g:0}, {g:0}, {g:1}], [{g:1}, {g:2}, {g:2, i:3}, {g:0}, {g:0, i:0}, {g:0, i:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0, i:2}, {g:0, i:2}, {g:0}, {g:0}, {g:1}], [{g:1}, {g:2, i:3}, {g:2, i:3}, {g:2, i:3}, {g:0, i:0}, {g:0, i:0}, {g:0, i:0}, {g:0, i:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0, i:2}, {g:0, i:3}, {g:0, i:3}, {g:0}, {g:1}, {g:1}], [{g:1}, {g:1}, {g:2, i:3}, {g:2, i:3}, {g:0, i:0}, {g:0, i:0}, {g:0, i:0}, {g:0, i:0}, {g:0, i:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0, i:1}, {g:0}, {g:0}, {g:1}, {g:1}], [{g:1}, {g:1}, {g:2}, {g:2}, {g:2}, {g:0, i:0}, {g:0, i:0}, {g:0, i:0}, {g:0, i:0}, {g:0, i:0}, {g:0, i:0}, {g:0, i:0}, {g:0}, {g:0, i:1}, {g:0}, {g:1}, {g:1}, {g:1}], [{g:1}, {g:1}, {g:1}, {g:2}, {g:2}, {g:2}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:1}, {g:1}, {g:1}], [{g:1}, {g:1}, {g:1}, {g:1}, {g:2}, {g:2}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:0}, {g:1}, {g:1}, {g:1}, {g:1}], [{g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}], [{g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}, {g:1}]
	]
];

/* ------------------------------------
	Informations à propos du joueur
------------------------------------ */
G.game.player = {
	x:       130,    // positon x
	y:       130,    // positon y
	mx:      0,      // position milieu x
	my:      0,      // position milieu y
	w:       12,     // largeur du joueur
	h:       16,     // hauteur du joueur
	diffx:   -4,     // décalage x
	diffy:   0,      // décalage y
	speed:   2,      // vitesse du joueur
	dir:     'down', // orientation du joueur
	mov:     0,      // code d'animation du joueur
	move:    false   // le joueur est-il en déplacement ?
};

/* ----------------------------------------------
	Informations sur la carte du jeu en cours
---------------------------------------------- */
G.game.map        = null;
G.game.map_height = 0;
G.game.map_width  = 0;
