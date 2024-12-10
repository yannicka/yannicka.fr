// Variable principale du jeu, G comme Global ou Game
var G = {};

// Initialisation du jeu
G.init = function() {
	// Définition de la taille de la caméra
	G.camera.w = G.camera.bw * G.basesize;
	G.camera.h = G.camera.bh * G.basesize;

	// Définition de la taille de l'écran de jeu
	G.can.width  = G.camera.w * G.zoom;
	G.can.height = G.camera.h * G.zoom;

	// Fond et texte de chargement
	G.ctx.fillBackground(G.can, rgb(0, 0, 0));
	G.ctx.fillStyle = rgb(255, 255, 255);
	G.ctx.font = 'normal 16px "Times New Roman", serif';
	G.ctx.textAlign = 'center';
	G.ctx.fillText('Chargement du jeu...', G.camera.w / 2 * G.zoom, G.camera.h / 2 * G.zoom);

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
	// On charge la map du début
	G.change_map(G.map_begin, 6, 10, 'down');

	// On calcul le nombre de tuile sur chaque images
	G.image.grounds.nbtiles = Math.ceil(G.image.grounds.width / (G.basesize + 1));
	G.image.items.nbtiles   = Math.ceil(G.image.items.width / (G.basesize + 1));

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

	// On rafraichit l'état du jeu en cours
	switch (G.state) {
		case 'start':        G.start.update();        break;
		case 'game':         G.game.update();         break;
		case 'player_infos': G.player_infos.update(); break;
		case 'fight':        G.fight.update();        break;
	}

	// On boucle la mise à jour
	requestAnimFrame(G.update);
};

// Zone de jeu
G.can = getById('game');
G.ctx = G.can.getContext('2d');

// Zone de log
G.log = getById('log');

// Taille de base d'une tuile
G.basesize = 16;

// Informations sur la caméra
G.camera = {
	x:  0,  // position x
	y:  0,  // position y
	w:  0,  // largeur de la caméra
	h:  0,  // hauteur de la caméra
	bw: 11, // nombre de tuile visible en largeur
	bh: 11  // nombre de tuile visible en hauteur
};

// Liste des images à chargées
G.images = {
	grounds:      'assets/gfx/grounds.png',
	items:        'assets/gfx/items.png',
	links:        'assets/gfx/links.png',
	dialog:       'assets/gfx/dialog.png',
	player:       'assets/gfx/player.png',
	state_start:  'assets/gfx/state_start.png',
	pnj1:         'assets/gfx/pnj1.png',
	player_infos: 'assets/gfx/player_infos.png'
};

// Liste des images chargées
G.image = {};

// Informations sur le joueur
G.player = {
	x:       0,        // positon x
	y:       0,        // positon y
	w:       14,       // largeur du joueur
	h:       18,       // hauteur du joueur
	offsetx: 0,        // décalage x
	offsety: 0,        // décalage y
	name:    'Player', // nom du joueur
	canmove: true,     // le joueur peut-il se déplacer ?
	speed:   2,        // vitesse du joueur
	dir:     'down',   // orientation du joueur
	mov:     0         // code d'animation du joueur
};

// Le menu principal est-il ouvert ?
G.start_menu = false;

// Code du choix actuel du joueur
G.choice     = 0;

// Timer du jeu
G.timer = new TimerManager();

// Informations sur la map
G.map        = null;
G.map_height = 0;
G.map_width  = 0;

// Permet d'étendre la mise à jour du jeu
G.expand_draw = function() {};

// Nom de l'état en cours
G.state = 'start';

// Valeur du zoom
G.zoom = 2;

// Mouvement du joueur
G.entity_move = function(entity, dir) {
	entity.dir = dir;

	var incrx = 0;
	var incry = 0;

	switch (dir) {
		case 'left':  incrx = -entity.speed; break;
		case 'up':    incry = -entity.speed; break;
		case 'right': incrx = entity.speed;  break;
		case 'down':  incry = entity.speed;  break;
	}

	var newx = (entity.x + (incrx * G.basesize / entity.speed)) / G.basesize;
	var newy = (entity.y + (incry * G.basesize / entity.speed)) / G.basesize;

	if (G.map.validPos(newx, newy)) {
		var tile        = G.map[newy][newx];
		var have_pnj    = false;
		var have_player = false;

		for (var i = 0, nbpnjs = G.pnjs.length ; i < nbpnjs ; i++) {
			if (newx == G.pnjs[i].x / G.basesize && newy == G.pnjs[i].y / G.basesize) {
				have_pnj = true;
			}
		}

		if (newx == G.player.x / G.basesize && newy == G.player.y / G.basesize) {
			have_player = true;
		}

		if ((typeof tile.s == 'undefined' || !tile.s) && !have_pnj && !have_player) {
			entity.canmove = false;

			for (var i = 0 ; i < G.basesize ; i += entity.speed) {
				setTimeout(function(i) {
					entity.x += incrx;
					entity.y += incry;

					if (i >= 0 && i <= 5) {
						entity.mov = 1;
					} else if (i > 6 && i <= 12) {
						entity.mov = 2;
					} else {
						entity.mov = 0;
					}

					if (i == G.basesize - entity.speed) {
						entity.canmove = true;

						if (typeof tile.onenter != 'undefined') {
							G.events[tile.onenter]();
						}
					}
				}, i * 12, i);
			}
		}
	}
};

// Boîte de dialogue
G.window_dialog = function(x, y, w, h, text) {
	G.ctx.save();
	G.ctx.translate(x, y);

	// Haut
	G.ctx.drawImage(G.image.dialog, 0, 0, 8, 8, 0, 0, 8, 8);
	G.ctx.drawImage(G.image.dialog, 8, 0, 8, 8, 8, 0, w - 16, 8);
	G.ctx.drawImage(G.image.dialog, 16, 0, 8, 8, w - 8, 0, 8, 8);

	// Centre
	G.ctx.drawImage(G.image.dialog, 0, 8, 8, 8, 0, 8, 8, h);
	G.ctx.drawImage(G.image.dialog, 8, 8, 8, 8, 8, 8, w - 16, h);
	G.ctx.drawImage(G.image.dialog, 16, 8, 8, 8, w  - 8, 8, 8, h);

	// Bas
	G.ctx.drawImage(G.image.dialog, 0, 16, 8, 8, 0, h + 8, 8, 8);
	G.ctx.drawImage(G.image.dialog, 8, 16, 8, 8, 8, h + 8, w - 16, 8);
	G.ctx.drawImage(G.image.dialog, 16, 16, 8, 8, w - 8, h + 8, 8, 8);

	// Texte
	if (typeof text != 'undefined') {
		G.ctx.font = 'normal 12px "Courier New"';
		G.ctx.fillStyle = rgb(0, 0, 0);
		G.ctx.textAlign = 'left';
		wrapText(G.ctx, text, 8, 18, w - 8, 12);
	}

	G.ctx.restore();
};

// Permet au joueur de changer de map, de x, de y et d'orientation
G.change_map = function(newmap, x, y, dir) {
	G.map        = newmap;
	G.map_height = G.map.length;
	G.map_width  = G.map[0].length;

	if (typeof x != 'undefined') {
		G.player.x = x * G.basesize;
	}

	if (typeof y != 'undefined') {
		G.player.y = y * G.basesize;
	}

	if (typeof dir != 'undefined') {
		G.player.dir = dir;
	}
};

// Permet de changer d'état de jeu
G.change_state = function(newstate) {
	G.state = newstate;
};
