var start_x = -14;

var by = 0;

function update_start() {
	if (Key.press(Key.SPACE) || Key.press(Key.ENTER) || Key.press(Key.ESC)) {
		state = 'game';
	}

	start_x++;

	if (start_x > 160 + 14) {
		start_x = -14;
		by += 1;
		by %= 4;
	}

	draw_start();
}

function draw_start() {
	ctx.drawImage(image.state_start, 0, 0);

	ctx.drawImage(image.player, 0, by * 18, 14, 18, start_x, 66, 14, 18);
}
