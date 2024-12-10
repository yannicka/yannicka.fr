G.game = {};

G.game.update = function() {
	G.camera.x = Math.round(Math.clamp(-G.player.x + G.can.width / 2 / G.zoom, (-G.map[0].length * G.basesize) + G.can.width / G.zoom, 0));
	G.camera.y = Math.round(Math.clamp(-G.player.y + G.can.height / 2 / G.zoom, (-G.map.length * G.basesize) + G.can.height / G.zoom, 0));

	function move1() {
		G.player.x += 5;
	}

	function move2() {
		G.player.x += 6;
	}

	function move3() {
		G.player.x += 5;
		G.player.canmove = true;
	}

	if (G.player.canmove && !G.start_menu) {
		if (Key.down(Key.RIGHT)) {
			G.player_move('right');
		} else if (Key.down(Key.LEFT)) {
			G.player_move('left');
		} else if (Key.down(Key.UP)) {
			G.player_move('up');
		} else if (Key.down(Key.DOWN)) {
			G.player_move('down');
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
		}
	}

	if (Key.press(Key.ESC)) {
		if (G.start_menu) {
			G.player.canmove = true;
			G.start_menu     = false;
		} else if (G.player.canmove) {
			G.player.canmove = false;
			G.start_menu     = true;
		}
	}

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

	log.innerHTML = bx + ' ; ' + by;

	for (var y = by ; y < by + G.camera.bh + 1 ; y++) {
		for (var x = bx ; x < bx + G.camera.bw + 1 ; x++) {
			var tile = G.map[y][x];

			var basex = tile.g * G.basesize + tile.g;
			var basey = 0;

			var tile_by_line = Math.ceil(G.image.grounds.width / (G.basesize + 1));

			var bb = tile.g % tile_by_line;
			basex = bb * G.basesize + bb;

			var aa = Math.floor(tile.g / tile_by_line);
			basey = aa * G.basesize + aa;

			G.ctx.drawImage(
				G.image.grounds,
				basex,
				basey,
				G.basesize,
				G.basesize,
				x * G.basesize,
				y * G.basesize,
				G.basesize,
				G.basesize
			);

			if (typeof tile.i != 'undefined') {
				basex = tile.i * G.basesize + tile.i;
				basey = 0;

				tile_by_line = Math.ceil(G.image.items.width / (G.basesize + 1));

				bb = tile.i % tile_by_line;
				basex = bb * G.basesize + bb;

				aa = Math.floor(tile.i / tile_by_line);
				basey = aa * G.basesize + aa;

				G.ctx.drawImage(
					G.image.items,
					basex,
					basey,
					G.basesize,
					G.basesize,
					x * G.basesize,
					y * G.basesize,
					G.basesize,
					G.basesize
				);
			}
		}
	}

	basey = 0;

	switch (G.player.dir) {
		case 'left':  basey = 0;  break;
		case 'up':    basey = 18; break;
		case 'right': basey = 36; break;
		case 'down':  basey = 54; break;
	}

	G.ctx.drawImage(G.image.player, G.player.mov * 14, basey, 14, 18, G.player.x + 1, G.player.y - 4, 14, 18);

	G.ctx.restore();

	if (G.start_menu) {
		G.window_dialog(80, 0, 80, 86);

		G.ctx.save();
		G.ctx.translate(100, 20);

		G.ctx.fillStyle = rgb(0, 0, 0);
		G.ctx.font = 'normal 12px "Courier New"';
		G.ctx.textAlign = 'left';

		G.ctx.fillText('DICO', 0, 0);
		G.ctx.fillText('MONS', 0, 14);
		G.ctx.fillText('OBJETS', 0, 28);
		G.ctx.fillText(G.player.name, 0, 42);
		G.ctx.fillText('OPTIONS', 0, 56);
		G.ctx.fillText('FERMER', 0, 70);

		G.ctx.fillText('>', -12, G.choice *  14);

		G.ctx.restore();
	}

	G.expand_draw();
};
