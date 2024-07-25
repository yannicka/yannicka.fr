G.instructions = {};

G.instructions.update = function() {
	if (pointHitBox(Mouse.x, Mouse.y, { x: 2, y: 404, w: 520, h: 40 })) {
		G.game.hover = true;

		if (Mouse.down()) {
			document.body.style.cursor = 'auto';

			Mouse.click = false;

			G.change_state('start');
		}
	}

	G.instructions.draw();
};

G.instructions.draw = function() {
	G.ctx.clear(G.can);

	G.ctx.drawImage(G.image.instructions, 0, 0);

	if (G.game.hover)
		document.body.style.cursor = 'pointer';
	else
		document.body.style.cursor = 'auto';

	G.game.hover = false;
};

G.instructions.hover = false;
