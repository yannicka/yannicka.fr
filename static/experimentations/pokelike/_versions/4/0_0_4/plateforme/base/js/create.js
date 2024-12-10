/* Lance la création du jeu */
function create() {
	/* On lance la boucle de jeu */
	update();
}

/* Permet de charger un niveau */
function loadLevel(level) {
	/* Création des variables locales */
	var xhr, tmp, line;

	map = [[]];

	/* Préparation du chargement du niveau */
	xhr = new XMLHttpRequest();
	xhr.open('get', 'lvl/' + level + '.lvl', true);
	xhr.send(null);

	/* Création de la map une fois le fichier du niveau chargé */
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			tmp = xhr.responseText.split('\n');

			for (var y = 0 ; y < tmp.length - 1 ; y++) {
				map[y] = [];
				line   = tmp[y];

				for (var x = 0 ; x < line.length - 1 ; x++) {
					map[y][x] = 0;

					switch (line[x]) {
						case '#': map[y][x] = 1; break;

						case '<': map[y][x] = 2; break;
						case '^': map[y][x] = 3; break;
						case '>': map[y][x] = 4; break;
						case 'v': map[y][x] = 5; break;

						case 'D': map[y][x] = 6; break;
						case 'K': map[y][x] = 7; break;
						case 'L': map[y][x] = 8; break;

						case 'P':
							player.x = x * ZOOM + (10 / 2);
							player.y = y * ZOOM + 10;
						break;

						default: map[y][x] = 0;
					}
				}
			}

			/* La map est chargée, on lance la création du jeu */
			back  = ctx.createPattern(img.back, 'repeat');
			player.angle = 0;
			state = 'game';
		}
	};
}
