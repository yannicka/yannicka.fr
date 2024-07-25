G.game = {};

G.game.update = function() {
	var player = G.game.player;

	G.game.draw();
};

G.game.draw = function() {
	var player = G.game.player;

	G.ctx.clearRect(0, 0, G.can.width, G.can.height);

	G.ctx.fillStyle = 'rgb(255, 255, 255)';
	G.ctx.fillRect(0, 0, G.can.width, G.can.height);

	for (var x = 0 ; x < G.map.length ; x++) {
		for (var y = 0 ; y < G.map[x].length ; y++) {
			G.ctx.fillStyle = 'rgba(' + G.map[x][y][0] + ', ' + G.map[x][y][1] + ', ' + G.map[x][y][2] + ', ' + (G.map[x][y][3] / 255) + ')';
			G.ctx.fillRect(x * G.basesize, y * G.basesize, G.basesize, G.basesize);
		}
	}

	G.ctx.fillStyle = 'rgb(0, 0, 255)';
	G.ctx.fillRect(player.x * G.basesize, player.y * G.basesize, G.basesize, G.basesize);

	for (var x = 0 ; x < 22 ; x++) {
		for (var y = 0 ; y < 22 ; y++) {
			G.ctx.draw_image_index(
				G.image.grounds, // img
				G.basesize,      // width
				G.basesize,      // height
				G.game.rgb_to_index(G.map[x][y][0], G.map[x][y][1], G.map[x][y][2]),     // index
				x * G.basesize,  // x
				y * G.basesize   // y
			);
		}
	}
};

G.game.block = {
    WALL : 'wall',
    GROUND : 'ground',
    NONE: 'none'
};

G.game.player = {
	x: 20,
	y: 20
};

G.game.rgb_to_index = function(r, g, b) {
	var indexes = {
		'0,0,0':       1,
		'255,255,255': 2,
	};

	return indexes[r + ',' + g + ',' + b] || 0;
};

G.game.rgb_to_name = function(r, b, g) {
	var block = G.game.block;

	switch (r + ',' + g + ',' + b) {
		case '0,0,0':
			return block.WALL;
			break;

		case '255,255,255':
			return block.GROUND;
			break;

		default:
			return block.NONE;
	}
};

/*
G.game.hex_to_name = function(hex) {
	return G.game.rgb_to_name(hex_to_rgb(hex));
};

G.game.pos_to_name = function(x, y) {
	var cur = G.map[x][y];

	return G.game.rgb_to_name(cur[0], cur[1], cur[2]);
};
*/

G.game.collide = function(x, y) {
	var b = G.game.block;
	var cur = G.map[x][y];

	switch (G.game.rgb_to_name(cur[0], cur[1], cur[2])) {
		case b.WALL:
			return true;
			break;

		case b.GROUND: case b.NONE:
			return false;
			break;

		default:
			return false;
	}
};
