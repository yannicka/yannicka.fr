// Evènements du jeu
G.events = [
	function() { // 0
		G.player.canmove  = false;

		var newdir = 'left';

		switch (G.player.dir) {
			case 'left':  newdir = 'right'; break;
			case 'up':    newdir = 'down';  break;
			case 'right': newdir = 'left';  break;
			case 'down':  newdir = 'up';    break;
		};

		G.pnjs[0].dir = newdir;

		var ind  = 0;
		var text = '';
		var texts = [];

		function launchText(t) {
			text = '';

			for (var i = 0 , l = t.length ; i < l ; i++) {
				(function(i) {
					texts[i] = setTimeout(function() {
						text += t.charAt(i);
					}, i * 32);
				}(i));
			}
		}

		launchText('... ' + G.player.name + ' ...');

		G.expand_draw = function() {
			G.window_dialog(0, 136, G.can.width / G.zoom, 24, text);

			if (Key.press(Key.SPACE)) {
				for (var i = 0 ; i < texts.length ; i++) {
					clearTimeout(texts[i]);
				}

				switch (++ind) {
					case 1: launchText('Alors comme ca tu me parles maintenant.'); break;
					case 2: launchText('Pfff...'); break;
					case 3: launchText('Depuis la primaire, tu me parles plus.'); break;
					case 4: launchText('Et maintenant tu me parles.'); break;
					case 5: launchText('Sous pretexte que c\'est un jeu.'); break;
					case 6: launchText('Et que tu m\'as jamais vu ?'); break;
					case 7: launchText('MENTEUR !!!'); break;
					case 8: launchText('On est pas dans un jeu mon vieux.'); break;
					case 9: launchText('C\'est la realite, arrete de delirer.'); break;
					case 10: launchText('T\'es fou mon pauvre'); break;
					case 11: launchText('Degage de la !'); break;

					default:
						G.player.canmove  = true;
						G.pnjs[0].canmove = true;
						G.expand_draw = function() {};
				}
			}
		};
	},

	function() { // 1
		G.change_map(G.map_house1, 3, 8);
	},

	function() { // 2
		G.change_map(G.map_begin, 6, 6);
	},

	function() { // 3
		G.change_map(G.map_house1_floor, 2, 8);
	},

	function() { // 4
		G.change_map(G.map_house1, 2, 1);
	},

	function() { // 5
		if (G.image.grounds != G.image.grounds_color) {
			G.player.canmove = false;

			var ind  = 0;
			var text = '';
			var texts = [];

			function launchText(t) {
				text = '';

				for (var i = 0 , l = t.length ; i < l ; i++) {
					(function(i) {
						texts[i] = setTimeout(function() {
							text += t.charAt(i);
						}, i * 32);
					}(i));
				}
			}

			launchText('Tu veux de la couleur ?');

			G.choice = 0;

			var have_choice = true;

			G.expand_draw = function() {
				if (Key.press(Key.SPACE)) {
					for (var i = 0 ; i < texts.length ; i++) {
						clearTimeout(texts[i]);
					}

					switch (G.choice) {
						case 0:
							have_choice = false;
							launchText('En voila =)');
							G.choice = -1;
							G.image.grounds = G.image.grounds_color;
							G.image.items = G.image.items_color;
							G.image.dialog = G.image.dialog_color;
							G.image.player = G.image.player_color;
							break;

						case 1:
							have_choice = false;
							launchText('...');
							G.choice = -1;
							break;

						default:
							G.player.canmove = true;
							G.expand_draw = function() {};
					}
				}

				G.window_dialog(0, 120, G.can.width / G.zoom, 24, text);

				if (have_choice) {
					if (Key.press(Key.UP)) {
						G.choice--;
					} else if (Key.press(Key.DOWN)) {
						G.choice++;
					}

					if (G.choice < 0) {
						G.choice = 1;
					}

					if (G.choice > 1) {
						G.choice = 0;
					}

					G.window_dialog(110, 87, 50, 28);

					G.ctx.save();
					G.ctx.translate(130, 105);

					G.ctx.fillStyle = rgb(0, 0, 0);
					G.ctx.font = 'normal 12px "Courier New"';
					G.ctx.textAlign = 'left';

					G.ctx.fillText('OUI', 0, 0);
					G.ctx.fillText('NON', 0, 14);

					G.ctx.fillText('>', -12, G.choice *  14);

					G.ctx.restore();
				}
			}
		};
	}
];
