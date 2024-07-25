G.start = {};

G.start.x = -14;

G.start.by = 3;

G.start.update = function() {
	if (Key.press(Key.SPACE) || Key.press(Key.ENTER) || Key.press(Key.ESC)) {
		G.state = 'game';
	}

	G.start.x++;

	if (G.start.x > 160 + 14) {
		G.start.x  = -14;
		G.start.by += 1;
		G.start.by %= 4;
	}

	G.start.draw();
};

G.start.draw = function() {
	G.ctx.drawImage(G.image.state_start, 0, 0);
	G.ctx.drawImage(G.image.player, 0, G.start.by * 18, 14, 18, G.start.x, 66, 14, 18);
};
