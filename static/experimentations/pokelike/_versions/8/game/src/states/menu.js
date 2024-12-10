G.menu = {};

G.menu.init = function() {
};

G.menu.update = function() {
	if (G.menu.change)
		G.change_state('game');

	G.menu.draw();
};

G.menu.draw = function() {
	var can = G.can,
		ctx = G.ctx;

	if(!G.menu.change)
		ctx.drawImage(G.image.fake_menu, 0, 0);
	else
		G.menu.change=false;

	if (G.key.down(Key.ENTER) && !G.menu.choice) {
		G.menu.choice = true;

		real_fade_out(can, ctx, [0, 0, 0], function() {
			G.menu.change = true;
		});
	}
};

G.menu.choice = false;
G.menu.change = false;
