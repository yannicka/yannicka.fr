function update_player_infos() {
	if (Key.press(Key.ESC) || Key.press(Key.SPACE)) {
		state = 'game';
	}

	draw_player_infos();
}

function draw_player_infos() {
	ctx.drawImage(image.player_infos, 0, 0);

	ctx.fillStyle = rgb(0, 0, 0);
	ctx.font = 'normal 14px "Courier New"';
	ctx.textAlign = 'left';
	ctx.fillText('Nom : ' + player.name, 8, 16);
	ctx.fillText('Argent : 0', 8, 32);
	ctx.fillText('Temps : 0', 8, 48);
}
