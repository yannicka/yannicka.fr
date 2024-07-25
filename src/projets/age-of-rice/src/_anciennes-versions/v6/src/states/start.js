G.start = {};

G.start.update = function() {
	G.start.draw();

	if (pointHitBox(Mouse.x, Mouse.y, { x: 160, y: 281, w: 400, h: 32 })) {
		G.start.pointer.y = 281;
		G.game.hover      = true;

		if (Mouse.down()) {
			document.body.style.cursor = 'auto';

			G.timer.cross = 0;

			Mouse.click = false;

			G.game.init();
			G.change_state('game');
		}
	}

	if (pointHitBox(Mouse.x, Mouse.y, { x: 160, y: 331, w: 400, h: 32 })) {
		G.start.pointer.y = 331;
		G.game.hover      = true;

		if (Mouse.down()) {
			document.body.style.cursor = 'auto';

			Mouse.click = false;

			G.change_state('instructions');
		}
	}
};

G.start.draw = function() {
	G.ctx.clear(G.can);

	G.start.pointer.x = 160 + Math.sin(G.timer.cross / 5) * 4;

	G.ctx.drawImage(G.image.start, 0, 0);
	G.ctx.drawImage(G.image.menu_pointer, G.start.pointer.x, G.start.pointer.y);

	if (G.game.hover)
		document.body.style.cursor = 'pointer';
	else
		document.body.style.cursor = 'auto';

	G.game.hover = false;
};

G.start.pointer = {
	x: 0,
	y: 281
};

G.start.hover = false;
