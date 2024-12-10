/* Boucle de l'application */
function update() {
	if      (state == 'menu') { updateMenu(); } /* Menu */
	else if (state == 'game') { updateGame(); } /* Jeu */

	/* Boucle de l'application */
	requestAnimFrame(update);
}

/* Boucle du menu */
function updateMenu() {
	/* Dessine le menu */
	drawMenu();
}

/* Boucle de jeu */
function updateGame() {
	/* Création des variables locales */
	/* Création des variables de directions */
 	var dirY = 'down';
	var dirX = 'right';

	/* Le joueur est-il en collision sur l'axe X ou Y ? */
	var colX = false;
	var colY = false;

	var newX, newY, keyLeft, keyRight, pos;

	/* Mise à jour de la position de la caméra */
	camera.x = Math.clamp(-player.x - player.w / 2 + can.width / 2, -map[0].length * ZOOM + can.width, 0);
	camera.y = Math.clamp(-player.y - player.h / 2 + can.height / 2, -map.length * ZOOM + can.height, 0);

	/* Le joueur est interdit de sauter jusqu'à nouvel ordre */
	player.canjump = false;

	if (player.angle == 0) {
		if (player.gravity < 6) { player.gravity += 1;  }
		if (player.gravity < 0) { dirY = 'up'; }
	} else if (player.angle == 180) {
		if (player.gravity < 0)  { dirY = 'up'; }
		if (player.gravity > -6) { player.gravity -= 1;  }
	} else if (player.angle == 90) {
		if (player.gravity < 6) { player.gravity += 1;  }
		if (player.gravity < 0) { dirX = 'left'; }
	} else if (player.angle == 270) {
		if (player.gravity < 0)  { dirX = 'left'; }
		if (player.gravity > -6) { player.gravity -= 1;  }
	}

	/* Nouvelle position du joueur */
	newX = player.x;
	newY = player.y;

	newX += player.angle == 90 || player.angle == 270 ? player.gravity : 0;
	newY += player.angle == 0  || player.angle == 180 ? player.gravity : 0;

	keyLeft  = Key.down(Key.LEFT)  || Key.down(Key.Q);
	keyRight = Key.down(Key.RIGHT) || Key.down(Key.D);

	if (player.angle == 0) {
		if (keyRight) { newX += 5; dirX = 'right'; }
		if (keyLeft)  { newX -= 5; dirX = 'left'; }
	} else if (player.angle == 180) {
		if (keyRight) { newX -= 5; dirX = 'left'; }
		if (keyLeft)  { newX += 5; dirX = 'right'; }
	} else if (player.angle == 90) {
		if (keyRight) { newY -= 5; dirY = 'up'; }
		if (keyLeft)  { newY += 5; dirY = 'down'; }
	} else if (player.angle == 270) {
		if (keyRight) { newY += 5; dirY = 'down'; }
		if (keyLeft)  { newY -= 5; dirY = 'up'; }
	}

	/* Colision X */
	for (var y = Math.floor(player.y / ZOOM) ; y <= Math.ceil((player.y - 10) / ZOOM) ; y++) {
		if (map[y][(dirX == 'left') ? Math.floor(newX / ZOOM) : Math.ceil((newX - 10) / ZOOM)] == 1) {
			newX = Math.round(player.x / ZOOM) * ZOOM + (dirX == 'right' ? 10 : 0);
			colX  = true;
		}
	}

	if (colX) {
		if (player.angle == 90) {
			if (dirX == 'left')  { player.gravity = 0; }
			if (dirX == 'right') { player.canjump = true; }
		} else if (player.angle == 270) {
			if (dirX == 'left')  { player.canjump = true; }
			if (dirX == 'right') { player.gravity = 0; }
		}
	}

	/* Colision Y */
	for (var x = Math.floor(player.x / ZOOM) ; x <= Math.ceil((player.x - 10) / ZOOM) ; x++) {
		if (map[(dirY == 'up') ? Math.floor(newY / ZOOM) : Math.ceil((newY - 10) / ZOOM)][x] == 1) {
			newY = Math.round(player.y / ZOOM) * ZOOM + (dirY == 'down' ? 10 : 0);
			colY  = true;
		}
	}

	if (colY) {
		if (player.angle == 0) {
			if (dirY == 'up')   { player.gravity = 0; }
			if (dirY == 'down') { player.canjump = true; }
		} else if (player.angle == 180) {
			if (dirY == 'up')   { player.canjump = true; }
			if (dirY == 'down') { player.gravity = 0; }
		}
	}

	if ((Key.down(Key.UP) || Key.down(Key.SPACE) || Key.down(Key.Z)) && player.canjump) {
		if      (player.angle == 0   || player.angle == 90)  { player.gravity = -18; }
		else if (player.angle == 180 || player.angle == 270) { player.gravity = 18;  }
	}

	/* Application de la nouvelle position du joueur */
	player.x = newX;
	player.y = newY;

	/* Colision avec les éléments */
	pos = map[Math.round(player.y / ZOOM)][Math.round(player.x / ZOOM)];

	if (pos == 2) { player.angle = 270; }
	if (pos == 3) { player.angle = 180; }
	if (pos == 4) { player.angle = 90;  }
	if (pos == 5) { player.angle = 0;   }

	if (pos == 6 && haveKey && Key.press(Key.ENTER)) { saveGame(); level++; loadLevel(level); state = 'menu'; }
	if (pos == 7) { map[Math.round(player.y / ZOOM)][Math.round(player.x / ZOOM)] = 0; haveKey = true; }

	if (Key.down(Key.ESC)) {
		state = 'menu';
	}

	/* Dessine le jeu */
	drawGame();
}
