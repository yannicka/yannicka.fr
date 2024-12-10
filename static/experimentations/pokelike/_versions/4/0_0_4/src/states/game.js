//
/* TODO : Editeur multinavigateurs
/* TODO : Editeur multinavigateurs
/* TODO : Editeur multinavigateurs
/* TODO : Editeur multinavigateurs
/* TODO : Editeur multinavigateurs
/* TODO : Editeur multinavigateurs
/* TODO : Editeur multinavigateurs
/* TODO : Editeur multinavigateurs
/* TODO : Editeur multinavigateurs
/* TODO : Editeur multinavigateurs
/* TODO : Editeur multinavigateurs
/* TODO : Editeur multinavigateurs
/* TODO : Editeur multinavigateurs
/* TODO : Editeur multinavigateurs
/* TODO : Editeur multinavigateurs
/* TODO : Editeur multinavigateurs*/
//

G.game = {};

G.game.update = function() {
	// Mise à jour de la position de la caméra
	G.camera.x = Math.round(Math.clamp(-G.player.x + G.can.width / 2 / G.zoom - (G.basesize / 2), (-G.map[0].length * G.basesize) + G.can.width / G.zoom, 0));
	G.camera.y = Math.round(Math.clamp(-G.player.y + G.can.height / 2 / G.zoom - (G.basesize / 2), (-G.map.length * G.basesize) + G.can.height / G.zoom, 0));

	// Si le joueur peut bouger et que le menu principal n'est pas ouvert, il peut se déplacer
	if (G.player.canmove && !G.start_menu) {
		if (Key.down(Key.RIGHT)) {
			G.entity_move(G.player, 'right');
		} else if (Key.down(Key.LEFT)) {
			G.entity_move(G.player, 'left');
		} else if (Key.down(Key.UP)) {
			G.entity_move(G.player, 'up');
		} else if (Key.down(Key.DOWN)) {
			G.entity_move(G.player, 'down');
		}

		if (Key.press(Key.SPACE)) {
			var targetx = 0;
			var targety = 0;

			switch (G.player.dir) {
				case 'left':  targetx = -G.basesize; break;
				case 'up':    targety = -G.basesize; break;
				case 'right': targetx = G.basesize;  break;
				case 'down':  targety = G.basesize;  break;
			}

			var x = Math.round((G.player.x + targetx) / G.basesize);
			var y = Math.round((G.player.y + targety) / G.basesize);

			var tile = G.map[y][x];

			if (G.map.validPos(x, y) && typeof tile.onaction != 'undefined') {
				G.events[tile.onaction]();
			}

			var nbpnjs = G.pnjs.length;

			for (var i = 0 ; i < nbpnjs ; i++) {
				if (x == G.pnjs[i].x / G.basesize && y == G.pnjs[i].y / G.basesize) {
					G.events[G.pnjs[i].onaction]();
				}
			}
		}
	}

	// On met à jour les PNJs
	var nbpnjs = G.pnjs.length;

	for (var i = 0 ; i < nbpnjs ; i++) {
		if (G.pnjs[i].canmove) {
			switch (Math.rand(0, 600)) {
				case 0: G.entity_move(G.pnjs[i], 'left');  break;
				case 1: G.entity_move(G.pnjs[i], 'up');    break;
				case 2: G.entity_move(G.pnjs[i], 'right'); break;
				case 3: G.entity_move(G.pnjs[i], 'down');  break;
			}
		}
	}

	// Ouverture et fermeture du menu principal avec la touche ECHAP
	if (Key.press(Key.ESC)) {
		if (G.start_menu) {
			G.player.canmove = true;
			G.start_menu     = false;
		} else if (G.player.canmove) {
			G.player.canmove = false;
			G.start_menu     = true;
		}
	}

	// Mise à jour du menu principal
	if (G.start_menu) {
		if (Key.press(Key.UP)) {
			G.choice--;
		} else if (Key.press(Key.DOWN)) {
			G.choice++;
		}

		if (G.choice < 0) {
			G.choice = 5;
		}

		if (G.choice > 5) {
			G.choice = 0;
		}

		if (Key.press(Key.SPACE)) {
			switch (G.choice) {
				case 0:
					break;

				case 1:
					break;

				case 2:
					break;

				case 3:
					G.state = 'player_infos';
					break;

				case 4:
					break;

				case 5:
					G.player.canmove = true;
					G.start_menu     = false;
					break;
			}
		}
	}

	G.game.draw();
};

G.game.draw = function() {
	//G.ctx.clear(G.can);

	//G.ctx.fillBackground(G.can, rgb(0, 0, 0));

	G.ctx.save();
	G.ctx.translate(G.camera.x, G.camera.y);

	var bx = Math.clamp(Math.floor(-G.camera.x / G.basesize), 0, G.map_width - G.camera.bw - 1);
	var by = Math.clamp(Math.floor(-G.camera.y / G.basesize), 0, G.map_height - G.camera.bh - 1);

	var my = by + G.camera.bh + 1;
	var mx = bx + G.camera.bw + 1;

	var tile, basex, basey;

	for (var y = by ; y < my ; y++) {
		for (var x = bx ; x < mx ; x++) {
			tile = G.map[y][x];

			basex = tile.g % G.image.grounds.nbtiles;
			basex = basex * G.basesize + basex;

			basey = Math.floor(tile.g / G.image.grounds.nbtiles);
			basey = basey * G.basesize + basey;

			G.game.putGround(basex, basey, x, y);

			if (G.game.getBlock(x, y) == 2) { // chemin
				if ([0, 1].inarray(G.game.getBlock(x, y - 1))) { G.game.putLink(0,  34, x, y); } // terre
				if ([0, 1].inarray(G.game.getBlock(x, y + 1))) { G.game.putLink(34, 34, x, y); } // terre
				if ([0, 1].inarray(G.game.getBlock(x - 1, y))) { G.game.putLink(51, 34, x, y); } // terre
				if ([0, 1].inarray(G.game.getBlock(x + 1, y))) { G.game.putLink(17, 34, x, y); } // terre
			}

			if (G.game.getBlock(x, y) == 3) { // eau
				if ([0, 1].inarray(G.game.getBlock(x, y - 1))) { G.game.putLink(0,  0,  x, y); } // terre
				if ([0, 1].inarray(G.game.getBlock(x, y + 1))) { G.game.putLink(34, 0,  x, y); } // terre
				if ([0, 1].inarray(G.game.getBlock(x - 1, y))) { G.game.putLink(51, 0,  x, y); } // terre
				if ([0, 1].inarray(G.game.getBlock(x + 1, y))) { G.game.putLink(17, 0,  x, y); } // terre
				if (G.game.getBlock(x, y - 1) == 2)            { G.game.putLink(0,  17, x, y); } // chemin
				if (G.game.getBlock(x, y + 1) == 2)            { G.game.putLink(34, 17, x, y); } // chemin
				if (G.game.getBlock(x - 1, y) == 2)            { G.game.putLink(51, 17, x, y); } // chemin
				if (G.game.getBlock(x + 1, y) == 2)            { G.game.putLink(17, 17, x, y); } // chemin
			}

			if (typeof tile.i != 'undefined') {
				basex = tile.i % G.image.items.nbtiles;
				basex = basex * G.basesize + basex;

				basey = Math.floor(tile.i / G.image.items.nbtiles);
				basey = basey * G.basesize + basey;

				G.game.putItem(basex, basey, x, y);
			}
		}
	}

	var nbpnjs = G.pnjs.length;

	for (var i = 0 ; i < nbpnjs ; i++) {
		switch (G.pnjs[i].dir) {
			case 'left':  basey = 0;  break;
			case 'up':    basey = 18; break;
			case 'right': basey = 36; break;
			case 'down':  basey = 54; break;
			default:      basey = 0;
		}

		G.ctx.drawImage(G.image.pnj1, G.pnjs[i].mov * 14, basey, 14, 18, G.pnjs[i].x + 1, G.pnjs[i].y - 4, 14, 18);
	}

	switch (G.player.dir) {
		case 'left':  basey = 0;  break;
		case 'up':    basey = 18; break;
		case 'right': basey = 36; break;
		case 'down':  basey = 54; break;
		default:      basey = 0;
	}

	G.ctx.drawImage(G.image.player, G.player.mov * 14, basey, 14, 18, G.player.x + G.player.offsetx, G.player.y + G.player.offsety, 14, 18);

	G.ctx.restore();

	if (G.start_menu) {
		G.window_dialog(90, 0, 86, 86);

		G.ctx.save();
		G.ctx.translate(110, 20);

		G.ctx.fillStyle = rgb(0, 0, 0);
		G.ctx.font = 'normal 12px "Courier New"';
		G.ctx.textAlign = 'left';

		G.ctx.fillText('ZOBIDESK', 0, 0);
		G.ctx.fillText('ZOBIES', 0, 14);
		G.ctx.fillText('OBJETS', 0, 28);
		G.ctx.fillText(G.player.name, 0, 42);
		G.ctx.fillText('OPTIONS', 0, 56);
		G.ctx.fillText('FERMER', 0, 70);

		G.ctx.fillText('>', -12, G.choice *  14);

		G.ctx.restore();
	}

	G.expand_draw();
};

G.game.getBlock = function(x, y) {
	if (G.map.validPos(x, y)) {
		return G.map[y][x].g;
	}

	return null;
};

G.game.putItem = function(bx, by, x, y) {
	G.ctx.drawImage(G.image.items, bx, by, G.basesize, G.basesize, x * G.basesize, y * G.basesize, G.basesize, G.basesize);
};

G.game.putGround = function(bx, by, x, y) {
	G.ctx.drawImage(G.image.grounds, bx, by, G.basesize, G.basesize, x * G.basesize, y * G.basesize, G.basesize, G.basesize);
};

G.game.putLink = function(bx, by, x, y) {
	G.ctx.drawImage(G.image.links, bx, by, G.basesize, G.basesize, x * G.basesize, y * G.basesize, G.basesize, G.basesize);
};
