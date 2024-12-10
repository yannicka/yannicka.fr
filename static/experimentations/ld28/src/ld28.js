// Variable globale qui contiendra toutes les données concernant le jeu
var G = {};

// Initialisation du jeu
G.init = function() {
	// Récupération de la zone de dessin
	G.can = document.getElementById('game');
	G.ctx = G.can.getContext('2d');

	// Quelques informations sur la scène
	G.state = 'game';

	// Quelques informations sur l'affichage
	G.scale = 2; // zoom

	// Récupération des images du jeu
	G.image = preload_images({
		'level1': 'gfx/levels/1.png',
		'tiles':  'gfx/tiles.png',
		'player': 'gfx/player.png',
		'bg':     'gfx/bg.png'
	}, G.create);
};

// Création des scènes du jeu
G.create = function() {
	// Initialisation des scènes
	G.game.init();

	// On lance la boucle de jeu
	G.update();
};

// Mise à jour des scènes
G.update = function() {
	// Mise à jour de la scène
	G[G.state].update();

	// Boucle de jeu
	requestAnimationFrame(G.update);
};

// Rédéfinition de la taille de l'écran de jeu
G.set_screen_size = function(width, height) {
	// Taille de l'écran de jeu
	G.can.width  = width;
	G.can.height = height;

	// Zoom propre
	if (G.ctx.mozImageSmoothingEnabled) {
		G.ctx.mozImageSmoothingEnabled = false;
	} else if (G.ctx.oImageSmoothingEnabled) {
		G.ctx.oImageSmoothingEnabled = false;
	} else if (G.ctx.webkitImageSmoothingEnabled) {
		G.ctx.webkitImageSmoothingEnabled = false;
	}

	if (G.ctx.imageSmoothingEnabled) {
		G.ctx.imageSmoothingEnabled = false;
	}

	// Zoom
	G.ctx.scale(G.scale, G.scale);
};

// Souris
G.mouse = new Mouse(G.can);
document.onmouseup = G.mouse.onmouseup;
document.onmousedown = G.mouse.onmousedown;
document.onmousemove = G.mouse.onmousemove;

// Clavier
G.key = new Keyboard();
document.onkeyup = G.key.onkeyup;
document.onkeydown = G.key.onkeydown;

// Chronomètre
G.timer = new Stopwatch();
