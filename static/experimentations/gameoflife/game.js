(function() {
	Math.clamp = function(val, min, max) {
		return Math.max(min, Math.min(val, max));
	};

	var G = {};

	G.init = function() {
		for (var y = 0 ; y < G.HEIGHT ; y++) {
			G.map[y] = [];

			for (var x = 0 ; x < G.WIDTH ; x++) {
				G.map[y][x] = Math.random() > 0.8;
			}
		}

		G.can.width  = G.WIDTH * G.ZOOM;
		G.can.height = G.HEIGHT * G.ZOOM;

		G.create();
	};

	G.create = function() {
		G.update();
	};

	G.update = function() {
		var can = G.can;

		var new_map = [];

		for (var y = 0 ; y < G.HEIGHT ; y++) {
			new_map[y] = [];

			for (var x = 0 ; x < G.WIDTH ; x++) {
				var nb_alive = G.count_around(x, y);

				if (nb_alive == 3) {
					new_map[y][x] = true;
				} else if (nb_alive == 2) {
					new_map[y][x] = G.map[y][x];
				} else {
					new_map[y][x] = false;
				}
			}
		}

		for (y = 0 ; y < G.HEIGHT ; y++) {
			for (x = 0 ; x < G.WIDTH ; x++) {
				G.map[y][x] = new_map[y][x];
			}
		}

		G.draw();
		setTimeout(G.update, 100);
		//requestAnimationFrame(G.update);
	};

	G.draw = function() {
		var can = G.can, ctx = G.ctx;

		ctx.clearRect(0, 0, G.can.width, G.can.height);

		for (var y = 0 ; y < G.HEIGHT ; y++) {
			for (var x = 0 ; x < G.WIDTH ; x++) {
				if (G.map[y][x]) {
					//ctx.fillStyle = 'rgb(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ')';
					ctx.fillRect(x * G.ZOOM, y * G.ZOOM, G.ZOOM, G.ZOOM);
				}
			}
		}
	};

	G.count_around = function(cx, cy) {
		var nb_alive = 0;

		for (var y = Math.clamp(cy - 1, 0, G.HEIGHT - 1) ; y <= Math.clamp(cy + 1, 0, G.HEIGHT - 1) ; y++) {
			for (var x = Math.clamp(cx - 1, 0, G.WIDTH - 1) ; x <= Math.clamp(cx + 1, 0, G.WIDTH - 1) ; x++) {
				if (G.map[y][x] && !(x == cx && y == cy)) {
					nb_alive++;
				}
			}
		}

		return nb_alive;
	};

	G.can = document.getElementById('game');
	G.ctx = G.can.getContext('2d');

	G.map    = [];
	G.WIDTH  = 140;
	G.HEIGHT = 70;
	G.ZOOM   = 10;

	G.init();
})();
