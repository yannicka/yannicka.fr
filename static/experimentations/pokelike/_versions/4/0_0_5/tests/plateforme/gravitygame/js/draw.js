/* Dessine le menu */
function drawMenu() {
	/* Création des variables locales */
	var save = localStorage['pilab-jeu-levels'];
	var survol = -1, text = 'Bloqué';
	var x, y;

	/* Efface le menu */
	ctx.clearRect(0, 0, camera.w, camera.h);

	document.body.style.cursor = 'default';

	for (var i = 0 ; i < save.length ; i++) {
		x = ZOOM + ((ZOOM + 4) * (i % 6)) - ZOOM;
		y = (ZOOM + 4) * Math.floor(i / 6);

		switch (parseInt(save[i])) {
			case 1:  ctx.fillStyle = 'rgb(255, 0, 0)'; break;
			case 2:  ctx.fillStyle = 'rgb(0, 0, 255)'; break;
			default: ctx.fillStyle = 'rgb(0, 0, 0)';
		}

		if (Mouse.x >= x && Mouse.x <= x + ZOOM && Mouse.y >= y && Mouse.y <= y + ZOOM) {
			if (save[i] == 1 || save[i] == 2) { ctx.fillStyle = 'rgb(127, 127, 127)'; document.body.style.cursor = 'pointer'; }
			survol = i;

			switch (parseInt(save[i])) {
				case 1:  text = 'Jouable'; break;
				case 2:  text = 'Terminé'; break;
			}

			if (Mouse.release() && save[i] > 0) {
				document.body.style.cursor = 'default';
				level = i;
				loadLevel(level);
			}
		}

		ctx.fillRect(x, y, ZOOM, ZOOM);
	}

	if (survol > -1) {
		ctx.fillStyle = 'rgb(0, 0, 0)';
		ctx.font = '32px Arial';
		ctx.fillText('Niveau ' + survol + ' - ' + text, 10, 200);
	}
}

/* Dessine le jeu */
function drawGame() {
	/* Efface le jeu */
	ctx.clearRect(0, 0, camera.w, camera.h);

	/* Fond */
	ctx.save();
		ctx.fillStyle = back;
		ctx.translate(camera.x / 3, camera.y / 3);
		ctx.fillRect(0, 0, map[0].length * ZOOM, map.length * ZOOM);
	ctx.restore();

	/* Terrain */
	ctx.save();
		ctx.translate(camera.x, camera.y);
		ctx.fillStyle = 'rgb(0, 0, 0)';
		ctx.font = '50px Arial';

		for (var y = 0 ; y < map.length ; y++) {
			for (var x = 0 ; x < map[0].length ; x++) {
				switch (map[y][x]) {
					case 1: ctx.drawImage(img.wall, x * ZOOM, y * ZOOM); break;
					case 2: ctx.drawImage(img.arrows, 0,        0, ZOOM, ZOOM, x * ZOOM, y * ZOOM, ZOOM, ZOOM); break;
					case 3: ctx.drawImage(img.arrows, ZOOM,     0, ZOOM, ZOOM, x * ZOOM, y * ZOOM, ZOOM, ZOOM); break;
					case 4: ctx.drawImage(img.arrows, ZOOM * 2, 0, ZOOM, ZOOM, x * ZOOM, y * ZOOM, ZOOM, ZOOM); break;
					case 5: ctx.drawImage(img.arrows, ZOOM * 3, 0, ZOOM, ZOOM, x * ZOOM, y * ZOOM, ZOOM, ZOOM); break;
					case 6: ctx.drawImage(img.door, x * ZOOM, y * ZOOM); break;
					case 7: ctx.drawImage(img.key,  x * ZOOM, y * ZOOM); break;
					case 8: ctx.drawImage(img.love, x * ZOOM, y * ZOOM); break;
				}
			}
		}
	ctx.restore();

	/* Joueur -> ctx.rotate(player.angle * Math.PI / 180) */
	ctx.save();
		ctx.translate(camera.x + player.x + player.w / 2, camera.y + player.y + player.h / 2);
		ctx.drawImage(img.player, -player.w / 2, -player.h / 2);
	ctx.restore();
}

/* Mise à jour de la sauvegarde lorsque un niveau est terminé */
function saveGame() {
	/* Création des variables locales */
	var save = localStorage['pilab-jeu-levels'];

	save                             = remplace(save, level + 1, 2);
	save                             = remplace(save, level + 2, 1);
	localStorage['pilab-jeu-levels'] = save;
}

/* Lancement de l'initialisation du jeu */
load();
