function update_game() {
	camera.x = Math.round(Math.clamp(-player.x + can.width / 2, (-map[0].length * basesize) + can.width, 0));
	camera.y = Math.round(Math.clamp(-player.y + can.height / 2, (-map.length * basesize) + can.height, 0));

	function move1() {
		player.x += 5;
	}

	function move2() {
		player.x += 6;
	}

	function move3() {
		player.x += 5;
		player.canmove = true;
	}

	if (player.canmove && !start_menu) {
		if (Key.down(Key.RIGHT)) {
			player_move('right');
		} else if (Key.down(Key.LEFT)) {
			player_move('left');
		} else if (Key.down(Key.UP)) {
			player_move('up');
		} else if (Key.down(Key.DOWN)) {
			player_move('down');
		}

		if (Key.press(Key.SPACE)) {
			var targetx = 0;
			var targety = 0;

			switch (player.dir) {
				case 'left':  targetx = -basesize; break;
				case 'up':    targety = -basesize; break;
				case 'right': targetx = basesize;  break;
				case 'down':  targety = basesize;  break;
			}

			var x = Math.round((player.x + targetx) / basesize);
			var y = Math.round((player.y + targety) / basesize);

			var tile = map[y][x];

			if (typeof tile.onaction != 'undefined') {
				events[tile.onaction]();
			}
		}
	}

	if (Key.press(Key.ESC)) {
		if (start_menu) {
			player.canmove = true;
			start_menu     = false;
		} else {
			player.canmove = false;
			start_menu     = true;
		}
	}

	if (start_menu) {
		if (Key.press(Key.UP)) {
			choice--;
		} else if (Key.press(Key.DOWN)) {
			choice++;
		}

		if (choice < 0) {
			choice = 5;
		}

		if (choice > 5) {
			choice = 0;
		}

		if (Key.press(Key.SPACE)) {
			switch (choice) {
				case 0:
					break;

				case 1:
					break;

				case 2:
					break;

				case 3:
					state = 'player_infos';
					break;

				case 4:
					break;

				case 5:
					player.canmove = true;
					start_menu     = false;
					break;
			}
		}
	}

	draw_game();
}

function draw_game() {
	ctx.clear(can);

	ctx.fillBackground(can, rgb(0, 0, 0));

	ctx.save();
	ctx.translate(camera.x, camera.y);

	for (var y = 0 ; y < map_height ; y++) {
		for (var x = 0 ; x < map_width ; x++) {
			var tile = map[y][x];

			var basex = tile.g * basesize + tile.g;
			var basey = 0;

			var cc = Math.floor(image.grounds.width / basesize) - 1;
			var tile_by_line = Math.floor((image.grounds.width - cc) / basesize);

			var bb = tile.g % tile_by_line;
			basex = bb * basesize + bb;

			var aa = Math.floor(tile.g / tile_by_line);
			basey = aa * basesize + aa;

			ctx.drawImage(
				image.grounds,
				basex,
				basey,
				basesize,
				basesize,
				x * basesize,
				y * basesize,
				basesize,
				basesize
			);

			if (typeof tile.i != 'undefined') {
				var basex = tile.i * basesize + tile.i;
				var basey = 0;

				var cc = Math.floor(image.items.width / basesize) - 1;
				var tile_by_line = Math.floor((image.items.width - cc) / basesize);

				var bb = tile.i % tile_by_line;
				basex = bb * basesize + bb;

				var aa = Math.floor(tile.i / tile_by_line);
				basey = aa * basesize + aa;

				ctx.drawImage(
					image.items,
					basex,
					basey,
					basesize,
					basesize,
					x * basesize,
					y * basesize,
					basesize,
					basesize
				);
			}
		}
	}

	var basey = 0;

	switch (player.dir) {
		case 'left':  basey = 0;  break;
		case 'up':    basey = 18; break;
		case 'right': basey = 36; break;
		case 'down':  basey = 54; break;
	}

	ctx.drawImage(image.player, player.mov * 14, basey, 14, 18, player.x + 1, player.y - 1, 14, 18);

	ctx.restore();

	if (start_menu) {
		window_dialog(80, 0, can.width - 80, 86);

		ctx.save();
		ctx.translate(100, 20);

		ctx.fillStyle = rgb(0, 0, 0);
		ctx.font = 'normal 12px "Courier New"';
		ctx.textAlign = 'left';

		ctx.fillText('DICO', 0, 0);
		ctx.fillText('MONS', 0, 14);
		ctx.fillText('OBJETS', 0, 28);
		ctx.fillText(player.name, 0, 42);
		ctx.fillText('OPTIONS', 0, 56);
		ctx.fillText('FERMER', 0, 70);

		ctx.fillText('>', -12, choice *  14);

		ctx.restore();
	}

	expand_draw();
}
