// Variable principale du jeu, G comme Global ou Game
var G = {};

// Initialisation du jeu
G.init = function() {
	// Définition de la taille de l'écran de jeu
	G.can.width  = (G.map_width * G.basesize) * G.zoom;
	G.can.height = (G.map_height * G.basesize) * G.zoom;

	// Fond et texte de chargement
	G.ctx.fillBackground(G.can, rgb(0, 0, 0));
	G.ctx.fillStyle = rgb(255, 255, 255);
	G.ctx.font = 'normal 16px "Times New Roman", serif';
	G.ctx.textAlign = 'center';
	G.ctx.fillText('Chargement du jeu...', G.can.width / 2, G.can.height / 2);

	// Zoom de la zone de jeu
	G.ctx.scale(G.zoom, G.zoom);

	// Aggrandi les images nettement au lieu de les flouter
	if (G.ctx.mozImageSmoothingEnabled) {
		G.ctx.mozImageSmoothingEnabled = false;
	} else if (G.ctx.webkitImageSmoothingEnabled) {
		G.ctx.webkitImageSmoothingEnabled = false;
	}

	if (G.ctx.imageSmoothingEnabled) {
		G.ctx.imageSmoothingEnabled = false;
	}

	// Chargement des images
	PreloadManager(G.images, G.image, G.create);
};

// Création du jeu
G.create = function() {
	// On met à jour le décalage de position du joueur
	G.player.offsetx  = (G.basesize - G.player.w) / 2;
	G.player.offsety  = (G.basesize - G.player.h) / 2;
	G.player.offsety -= 3;

	// On lance la mise à jouru du jeu
	G.update();
};

// Mise à jour du jeu
G.update = function() {
	// On met à jour le timer
	G.timer.update();

	if (G.player.canmove) {
		if (Key.down(Key.RIGHT)) {
			G.entity_move(G.player, 'right');
		} else if (Key.down(Key.LEFT)) {
			G.entity_move(G.player, 'left');
		} else if (Key.down(Key.UP)) {
			G.entity_move(G.player, 'up');
		} else if (Key.down(Key.DOWN)) {
			G.entity_move(G.player, 'down');
		}
	}

	var nb_enemies = G.enemies.length;

	for (var i = 0 ; i < nb_enemies ; i++) {
		if (G.enemies[i].canmove) {
			switch (Math.rand(0, 3)) {
				case 0: G.entity_move(G.enemies[i], 'right'); break;
				case 1: G.entity_move(G.enemies[i], 'left');  break;
				case 2: G.entity_move(G.enemies[i], 'up');    break;
				case 3: G.entity_move(G.enemies[i], 'down');  break;
			}
		}
	}

	G.draw();

	// On boucle la mise à jour
	requestAnimFrame(G.update);
};

G.draw = function() {
	G.ctx.clearRect(0, 0, G.can.width, G.can.height);

	for (var y = 0 ; y < G.map_height ; y++) {
		for (var x = 0 ; x < G.map_width ; x++) {
			if (G.map[y][x] == 1) {
				G.ctx.fillStyle = rgb(0, 0, 0);

				G.ctx.fillRect(x * G.basesize, y * G.basesize, G.basesize, G.basesize);
			}

			if (G.map[y][x] == 2) {
				G.ctx.fillStyle = rgb(200, 200, 0);

				G.ctx.fillRect(x * G.basesize + 3, y * G.basesize + 3, G.basesize - 6, G.basesize - 6);
			}
		}
	}

	G.ctx.fillStyle = rgb(255, 0, 0);

	var nb_enemies = G.enemies.length;

	for (var i = 0 ; i < nb_enemies ; i++) {
		G.ctx.fillRect(G.enemies[i].x, G.enemies[i].y, G.basesize, G.basesize);
	}

	G.ctx.fillStyle = rgb(0, 0, 255);
	G.ctx.fillRect(G.player.x, G.player.y, G.basesize, G.basesize);
};

// Zone de jeu
G.can = getById('game');
G.ctx = G.can.getContext('2d');

// Zone de log
G.log = getById('log');

// Taille de base d'une tuile
G.basesize = 8;

// Liste des images à chargées
G.images = {
};

// Liste des images chargées
G.image = {};

// Informations sur le joueur
G.player = {
	x:       8,        // positon x
	y:       8,        // positon y
	w:       14,       // largeur du joueur
	h:       18,       // hauteur du joueur
	offsetx: 0,        // décalage x
	offsety: 0,        // décalage y
	name:    'Player', // nom du joueur
	canmove: true,     // le joueur peut-il se déplacer ?
	prec:    1,        // précision du déplacement
	speed:   17        // vitesse du joueur
};

G.enemies = [
	{
		x:       24,
		y:       24,
		w:       14,
		h:       18,
		offsetx: 0,
		offsety: 0,
		name:    'Player',
		canmove: true,
		prec:    2,
		speed:   30
	}
];

// Le menu principal est-il ouvert ?
G.pause = false;

// Timer du jeu
G.timer = new TimerManager();

// Informations sur la map
G.map = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
	[1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1],
	[1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1],
	[1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
G.map_height = G.map.length;
G.map_width  = G.map[0].length;

// Valeur du zoom
G.zoom = 2;

G.bonus = 0;
G.score = 0;

// Mouvement du joueur
G.entity_move = function(entity, dir) {
	entity.dir = dir;

	var incrx = 0;
	var incry = 0;

	switch (dir) {
		case 'left':  incrx = -entity.prec; break;
		case 'up':    incry = -entity.prec; break;
		case 'right': incrx = entity.prec;  break;
		case 'down':  incry = entity.prec;  break;
	}

	var newx = (entity.x + (incrx * G.basesize / entity.prec)) / G.basesize;
	var newy = (entity.y + (incry * G.basesize / entity.prec)) / G.basesize;

	if (G.map.validPos(newx, newy)) {
		var tile        = G.map[newy][newx];
		var have_pnj    = false;
		var have_player = false;

		if (tile != 1) {
			entity.canmove = false;

			if (tile == 0) {
				G.bonus = 0;
			} else if (tile == 2 && G.bonus < 60) {
				G.bonus += 5;
			}

			for (var i = 0 ; i < G.basesize ; i += entity.prec) {
				setTimeout(function(i) {
					entity.x += incrx;
					entity.y += incry;

					if (i == G.basesize - entity.prec) {
						entity.canmove = true;

						if (tile == 2) {
							G.map[newy][newx] = 0;
							G.score += G.bonus;
						}

						log.innerHTML = G.score + ' (+' + G.bonus + ')';
					}
				}, i * entity.speed, i);
			}
		}
	}
};
