/* --------------------------------------------------------
	Variable principale du jeu ; G comme Global ou Game
-------------------------------------------------------- */
var G = {};

/* --------------------------
	Initialisation du jeu
-------------------------- */
G.init = function() {
	/* -----------------------------------------
		Définition de la taille de la caméra
	----------------------------------------- */
	G.game.camera.w = G.game.camera.bw * G.basesize;
	G.game.camera.h = G.game.camera.bh * G.basesize;

	/* ----------------------------------------------
		Définition de la taille de l'écran de jeu
	---------------------------------------------- */
	G.can.width  = G.game.camera.w * G.zoom;
	G.can.height = G.game.camera.h * G.zoom + 22; // +22 pour afficher l'inventaire en bas

	/* ----------------------------------
		On explique que le jeu charge
	---------------------------------- */
	G.ctx.fillBackground(G.can, rgb(0, 0, 0));
	G.ctx.fillStyle = rgb(255, 255, 255);
	G.ctx.font      = 'normal 16px "Times New Roman", serif';
	G.ctx.textAlign = 'center';
	G.ctx.fillText('Chargement du jeu...', G.game.camera.w / 2 * G.zoom, G.game.camera.h / 2 * G.zoom);

	/*
		On zoom la zone de jeu
	*/
	G.ctx.scale(G.zoom, G.zoom);

	/*
		Zoom nettement sans flou
	*/
	if (G.ctx.mozImageSmoothingEnabled) {
		G.ctx.mozImageSmoothingEnabled = false;
	} else if (G.ctx.webkitImageSmoothingEnabled) {
		G.ctx.webkitImageSmoothingEnabled = false;
	}

	if (G.ctx.imageSmoothingEnabled) {
		G.ctx.imageSmoothingEnabled = false;
	}

	/* ------------------------
		Définition des sols
	------------------------ */
	G.game.grounds = [
		{ // 0 : sable
			solid: false // défini si on peut marcher sur le sol ou non
		},

		{ // 1 : eau
			solid: true
		},

		{ // 2 : herbe
			solid: false
		},

		{ // 3 : lave
			solid: true
		}
	];

	/* ---------------------------------
		Définition des objets au sol
	--------------------------------- */
	G.game.items = [
		{ // 0 : rocher
			item_take: 0
		},

		{ // 1 : arbre 1
			item_take: 1
		},

		{ // 1 : arbre 2
			item_take: 1
		},

		{ // 1 : arbre 3
			item_take: 1
		}
	];

	/* ------------------------------------------
		Définition des objets de l'inventaire
	------------------------------------------ */
	G.game.inventory_items = [
		{ // 0 : rocher
			name: 'Rocher'
		},

		{ // 1 : bois
			name: 'Bois'
		}
	];

	/* --------------------------
		Chargement des images
	-------------------------- */
	PreloadManager(G.images, G.image, G.create);
};

/* --------------------
	Création du jeu
-------------------- */
G.create = function() {
	/* ---------------------------------------------------------------------
		Lancement de la mise à jour du jeu... 5..4..3..2..1.. décollez !
	--------------------------------------------------------------------- */
	G.update();
};

/* --------------------------------------------------------
	Mise à jour du jeu suivant la scène de jeu en cours
-------------------------------------------------------- */
G.update = function() {
	/* --------------------------------------------
		On met à jour le timer principal du jeu
	-------------------------------------------- */
	G.timer.update();

	/* -------------------------------------------
		On met à jour la scène de jeu en cours
	------------------------------------------- */
	switch (G.state) {
		case 'start': G.start.update(); break;
		case 'game':  G.game.update();  break;
	}

	/* -----------------------------------------
		On boucle vers l'infini et au delà !
	----------------------------------------- */
	requestAnimFrame(G.update);
};

/* -----------------------------------
	Récupération de la zone de jeu
----------------------------------- */
G.can = getById('game');
G.ctx = G.can.getContext('2d');

/* ------------------
	Zone de debug
------------------ */
G.log = getById('log');

/* --------------------------
	Taille de base du jeu
-------------------------- */
G.basesize = 16;

/* ------------------------------
	Liste des images à charger
-------------------------------*/
G.images = {
	player:           'assets/gfx/player.png',
	grounds:          'assets/gfx/grounds.png',
	items:            'assets/gfx/items.png',
	items_inventory:  'assets/gfx/items_inventory.png',
	inventory:        'assets/gfx/inventory.png',
	inventory_target: 'assets/gfx/inventory_target.png',
	target:           'assets/gfx/target.png',
	menu:             'assets/gfx/menu.png',
	dialog:           'assets/gfx/dialog.png',
	start_screen:     'assets/gfx/start_screen.png'
};

/* ---------------------------------------
	Les images chargées arriveront ici
--------------------------------------- */
G.image = {};

/* ---------------------------
	Timer principal du jeu
--------------------------- */
G.timer = new TimerManager();

/* ------------------------------------
	Nom de la scène de jeu en cours
------------------------------------ */
G.state = 'start';

/* ----------------
	Zoom du jeu
---------------- */
G.zoom = 1;

/* --------------------------------------
	Permet de changer la scène du jeu
-------------------------------------- */
G.change_state = function(newstate) {
	G.state = newstate;
};
