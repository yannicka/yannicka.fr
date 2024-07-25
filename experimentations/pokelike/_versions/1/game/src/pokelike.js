// On créer la variable G (Global || Game) qui contiendra tout le jeu : les scènes, les fonctions, etc.
var G = {};

// Chargement des cartes
G.load_maps = function() {
	// On récupère la liste des cartes
	var maps = ajax();

	maps.onreadystatechange = function() {
		if (maps.readyState == 4 && maps.status == 200) {
			// On charge les cartes et leurs images respectives
			require(JSON.parse(maps.responseText), function() {
				for (var i in G.map) {
					if (typeof G.map[i] == 'object') {
						G.images[G.map[i].img] = 'game/maps/' + i + '/back.png';
						G.images[G.map[i].img + '_top'] = 'game/maps/' + i + '/top.png';
					}
				}

				G.init();
			});
		}
	}

	maps.open('GET', 'index.php?get_maps', true);
	maps.send();
};

// Initialisation
G.init = function() {
	var can = G.can, ctx = G.ctx;

	// On précise que le jeu charge
	can.width  = 200;
	can.height = 200;

	ctx.fillStyle = rgb(0, 0, 0);
	ctx.fillRect(0, 0, can.width, can.height);
	ctx.fillStyle = rgb(255, 255, 255);
	ctx.font = 'normal 16px "Times New Roman", serif';
	ctx.textAlign = 'center';
	ctx.fillText('Chargement du jeu...', can.width / 2, can.height / 2);

	// On lance le chargement des images
	G.preload_images();
};

// Préchargement des images
G.preload_images = function() {
	PreloadImages(G.images, G.image, G.preload_sounds);
};

// todo : Préchargement des sons
G.preload_sounds = function() {
	G.create();
};

// Création
G.create = function() {
	// On initialise les scènes
	G.game.init();

	// On lance le jeu
	G.launch = true;
	G.resize();

	G.update();
};

// Mise à jour
G.update = function() {
	// On met à jour la scène de jeu
	G[G.state].update();

	// todo : commenter
	G.expand();

	// On met à jour les informations essentielles
	G.timer.update();
	G.mouse.update();
	G.key.update();

	requestAnimationFrame(G.update);
};

// Redimensionnement du jeu
G.resize = function() {
	// Si le jeu n'est pas lancé, la fonction n'est pas exécutée
	// Permet d'éviter un bug
	if (!G.launch)
		return;

	var can = G.can, ctx = G.ctx, basesize = G.basesize, img = G.image, cam = G.camera, zoom = G.zoom,
		cur_map = G.map[G.cur_map];

	// On calcul le nombre de cellules à afficher en largeur
	var width = parseInt(window.innerWidth / basesize / zoom);
	width -= width % 2 == 0 ? 1 : 0;

	cam.tw = Math.clamp(width, 0, img[cur_map.img].width);

	// On calcul le nombre de cellules à afficher en hauteur
	var height = parseInt(window.innerHeight / basesize / zoom);
	height -= height % 2 == 0 ? 1 : 0;

	cam.th = Math.clamp(height, 0, img[cur_map.img].height);

	// On met à jour la taille de la zone de dessin
	can.width  = cam.tw * basesize * zoom;
	can.height = cam.th * basesize * zoom;

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

// Changement de scène
G.change_state = function(new_state) {
	// On change l'état
	G.state = new_state;
};

// Changement de carte
G.change_map = function(new_map) {
	// On change la carte
	G.cur_map = new_map;

	// On redimensionne pour être sûr qu'il n'y ai pas de problème
	G.resize();
};

// Boîte de dialogue
G.window_dialog = function(x, y, w, h, text) {
	var ctx = G.ctx, img = G.image;

	// On prépare l'affichage
	ctx.save();
	ctx.translate(x, y);

	// Haut
	ctx.drawImage(img.dialog, 0, 0, 8, 8, 0, 0, 8, 8);
	ctx.drawImage(img.dialog, 8, 0, 8, 8, 8, 0, w - 16, 8);
	ctx.drawImage(img.dialog, 16, 0, 8, 8, w - 8, 0, 8, 8);

	// Centre
	ctx.drawImage(img.dialog, 0, 8, 8, 8, 0, 8, 8, h);
	ctx.drawImage(img.dialog, 8, 8, 8, 8, 8, 8, w - 16, h);
	ctx.drawImage(img.dialog, 16, 8, 8, 8, w  - 8, 8, 8, h);

	// Bas
	ctx.drawImage(img.dialog, 0, 16, 8, 8, 0, h + 8, 8, 8);
	ctx.drawImage(img.dialog, 8, 16, 8, 8, 8, h + 8, w - 16, 8);
	ctx.drawImage(img.dialog, 16, 16, 8, 8, w - 8, h + 8, 8, 8);

	// Texte (inutile ?)
	if (typeof text != 'undefined') {
		ctx.font = 'normal 8px "Polikefont"';
		ctx.fillStyle = rgb(0, 0, 0);
		ctx.textAlign = 'left';
		ctx.fill_wrap_text(text, 8, 18, w - 8, 12);
	}

	// On restaure l'affichage
	ctx.restore();
};

// Fonction d'expansion du code
G.expand = function() {
	return false;
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

// Carte
G.map     = {};
G.cur_map = 'big_world';

// Caméra
G.camera = {
	x:  0,  // position x
	y:  0,  // position y
	tw: 17, // nombre de blocs affichés en largeur
	th: 17, // nombre de blocs affichés en hauteur
	bx: 0,  // borne minimum x
	by: 0,  // borne minimum y
	mx: 0,  // borne maximum x
	my: 0   // borne maximum y
};

// Images
G.images = {
	back:   'game/gfx/back.png',   // couche basse des tiles
	top:    'game/gfx/top.png',    // couche haute des tiles
	player: 'game/gfx/player.png', // joueur
	dialog: 'game/gfx/dialog.png'  // boîte de dialogue
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

// On lance le jeu après avoir chargé les scripts
require([
	'game/src/states/game.js'
], G.load_maps);
