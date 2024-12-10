G.player_infos = {};

G.player_infos.update = function() {
	if (Key.press(Key.ESC) || Key.press(Key.SPACE)) {
		G.state = 'game';
	}

	G.player_infos.draw();
};

G.player_infos.draw = function() {
	G.ctx.drawImage(G.image.player_infos, 0, 0);

	G.ctx.fillStyle = rgb(0, 0, 0);
	G.ctx.font = 'normal 14px "Courier New"';
	G.ctx.textAlign = 'left';
	G.ctx.fillText('Nom : ' + G.player.name, 8, 16);
	G.ctx.fillText('Argent : 0', 8, 32);
	G.ctx.fillText('Temps : 0', 8, 48);
};
