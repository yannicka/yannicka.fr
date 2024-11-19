G.instructions = {};

G.instructions.update = function() {
	if (pointHitBox(Mouse.x, Mouse.y, { x: 196, y: 432, w: 248, h: 20 })) {
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
