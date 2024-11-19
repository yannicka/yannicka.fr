G.victory = {};

G.victory.update = function() {
	G.victory.draw();

	if (pointHitBox(Mouse.x, Mouse.y, { x: 259, y: 412, w: 122, h: 30 })) {
		G.game.hover = true;

		if (Mouse.down()) {
			window.location.reload();
		}
	}

	if (G.game.hover)
		document.body.style.cursor = 'pointer';
	else
		document.body.style.cursor = 'auto';

	G.game.hover = false;
};

G.victory.draw = function() {
	G.ctx.clear(G.can);

	G.ctx.drawImage(G.image.victory, 0, 0);
};

G.victory.hover = false;
