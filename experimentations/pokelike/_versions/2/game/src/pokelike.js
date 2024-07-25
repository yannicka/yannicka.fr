var G = {};

G.init = function() {
	// On charge les images
	Preload(G.images, G.image, G.create);
};

G.create = function() {
	// On initialise les scènes
	G.game.init();

	// On lance le jeu
	G.launch = true;
	G.resize();

	G.update();
};

G.update = function() {
	// On met à jour les informations essentielles
	G.timer.update();
	G.mouse.update();
	G.key.update();

	// On met à jour la scène de jeu
	G[G.state].update();

	requestAnimationFrame(G.update);
};

G.resize = function() {
	// Si le jeu n'est pas lancé, la fonction n'est pas exécutée
	// Permet d'éviter un bug
	if (!G.launch)
		return;

	var can = G.can, ctx = G.ctx, basesize = G.basesize, img = G.image, cam = G.camera, zoom = G.zoom;

	// On calcul le nombre de cellules à afficher en hauteur
	var height = parseInt(window.innerHeight / basesize / zoom);
	height -= height % 2 == 0 ? 1 : 0;

	cam.bh = Math.clamp(height, 0, img.map.height);

	// On calcul le nombre de cellules à afficher en largeur
	var width = parseInt(window.innerWidth / basesize / zoom);
	width -= width % 2 == 0 ? 1 : 0;

	cam.bw = Math.clamp(width, 0, img.map.width);

	// On met à jour la taille de la zone de dessin
	can.width  = cam.bw * basesize * zoom;
	can.height = cam.bh * basesize * zoom;

	// On précise qu'on veut que le zoom soit propre
	if (ctx.mozImageSmoothingEnabled) {
		ctx.mozImageSmoothingEnabled = false;
	} else if (ctx.webkitImageSmoothingEnabled) {
		ctx.webkitImageSmoothingEnabled = false;
	}

	if (ctx.imageSmoothingEnabled) {
		ctx.imageSmoothingEnabled = false;
	}

	// On zoom la zone de jeu
	ctx.scale(zoom, zoom);
};

// Zone de dessin
G.can = document.getElementById('pokelike');
G.ctx = G.can.getContext('2d');

// Valeur du zoom du jeu
G.zoom = 2;

// Le jeu est-il lancé ?
G.lanch = false;

// Scène du jeu en cours
G.state = 'game';

// Taille de base de chaque cellule
G.basesize = 16;

// Caméra
G.camera = {
	x:  0,
	y:  0,
	w:  0,
	h:  0,
	bw: 17,
	bh: 17
};

// Images
G.images = {
	map:    'game/gfx/map.png',
	tiles:  'game/gfx/tiles.png',
	player: 'game/gfx/player.png'
};

G.image = {};

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

// Evènement de redimensionnement
window.onresize = G.resize;

var ontouchstart = function() {
	alert('ok');
};

var touchend = function() {

};

var touchleave = function() {

};

var touchmove = function() {

};

window.touchstart = ontouchstart;
window.touchend = touchend;
window.touchleave = touchleave;
window.touchmove = touchmove;
