G.defeat = {};

G.defeat.update = function() {
	G.defeat.draw();

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

G.defeat.draw = function() {
	G.ctx.clear(G.can);

	G.ctx.drawImage(G.image.defeat, 0, 0);
};

G.defeat.hover = false;
