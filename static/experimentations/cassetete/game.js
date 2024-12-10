(function() {
"use strict";

/* Librarie
------------ */
Math.clamp=function(min,val,max){return Math.max(min,Math.min(max,val));};
function rgb(r,g,b,a){if(typeof a=="undefined"){return"rgb("+r+", "+g+", "+b+")";}else{return"rgba("+r+", "+g+", "+b+", "+a+")";}}
if(!window.requestAnimationFrame){window.requestAnimationFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};})();}
//Math.rand=function(min,max){return Math.floor(Math.random()*(max-min+1))+min;};

/* Vocabulaire
--------------- */
// Cellule = une case
// Bloc = un bloc
// Pièce = un bloc avec une position, faisant parti du niveau
// Bout = bout d'une pièce (taille : une cellule)

/* Déclaration des variables
----------------------------- */
var SIZE,
	can, ctx,
	blocks, pieces,
	mouse,
	level,
	map;

/* Initialisation des variables
-------------------------------- */
function init() {
	var colors,
		i,
		ilen,
		pieces,
		j,
		jlen,
		color;

	// Taille des cellules
	SIZE = 20;

	// Zone de dessins
	can = document.getElementById('game');
	ctx = can.getContext('2d');

	// Différents types de blocs
	blocks = [
		// 0
		[[1, 1],  // XX
		 [1, 1],  // XX
		 [1, 0]], // X

		// 1
		[[1, 0],  // X
		 [1, 0],  // X
		 [1, 0],  // X
		 [1, 1]], // XX

		// 2
		[[1, 1, 1],  // XXX
		 [1, 0, 1]], // X X

		// 3
		[[0, 0, 1],  //   X
		 [1, 1, 1],  // XXX
		 [1, 0, 0]], // X

		// 4
		[[0, 0, 1],  //   X
		 [1, 1, 1],  // XXX
		 [0, 0, 1]], //   X

		// 5
		[[1, 1, 1, 1, 1]], // XXXXX

		// 6
		[[1, 1, 1, 1],  // XXXX
		 [0, 0, 0, 1]], //    X

		// 7
		[[1, 1],  // XX
		 [0, 1],  //  X
		 [1, 1]], // XX

		// 8
		[[0, 0, 1, 1],  //   XX
		 [1, 1, 1, 0]], // XXX

		// 9
		[[1, 0],  // X
		 [1, 1],  // XX
		 [1, 0],  // X
		 [1, 0]], // X

		// 10
		[[0, 1, 1], //  XX
		 [1, 1, 0], // XX
		 [1, 0, 0]] // X
	];

	// Chargement des niveaux
	colors = [
		rgb(255, 40, 40),  // rouge
		rgb(40, 230, 40),  // vert
		rgb(40, 180, 230), // bleu
		rgb(230, 100, 0),  // orange
		rgb(160, 80, 230), // violet
		rgb(0, 255, 255)
	];

	for (i = 0, ilen = levels.length ; i < ilen ; i++) {
		pieces = levels[i][2];

		levels[i] = {
			width:  levels[i][0],
			height: levels[i][1],
			pieces: []
		};

		for (j = 0, jlen = pieces.length ; j < jlen ; j++) {
			color = colors.shift();
			colors.push(color);

			levels[i].pieces.push({
				x:      pieces[j][0],
				y:      pieces[j][1],
				block:  pieces[j][2],
				hover:  false,
				color:  color,
				width:  blocks[pieces[j][2]][0].length,
				height: blocks[pieces[j][2]].length,
				drag:   undefined
			});
		}
	}

	// Le niveau, sa taille et ses blocs
	level = levels[1];

	// La position de la souris
	mouse = {
		x: 0,
		y: 0
	};

	// La carte de victoire
	map = [];

	create();
}

/* Création de la scène de jeu
------------------------------- */
function create() {
	// Définition de la taille de l'écran de jeu
	can.width  = SIZE * 20;
	can.height = SIZE * 20;

	update();
}

/* Mise à jour de la scène
--------------------------- */
function update() {
	var x, xlen,
		y, ylen;

	// Recréation de la carte de victoire
	map = [];

	for (y = 0, ylen = level.height ; y < ylen ; y++) {
		map[y] = [];

		for (x = 0, xlen = level.width ; x < xlen ; x++) {
			map[y][x] = 0;
		}
	}

	draw();

	requestAnimationFrame(update);
}

/* Affichage de la scène
------------------------- */
function draw() {
	var p, plen,
		x, xlen,
		y, ylen,
		p2, p2len,
		piece, piece2,
		diffx, diffy,
		collide,
		distx, disty,
		win;

	ctx.clearRect(0, 0, can.width, can.height);

	// Fond
	ctx.fillStyle = rgb(22, 22, 22);
	ctx.fillRect(0, 0, can.width, can.height);

	// Zone de victoire
	ctx.fillStyle = rgb(255, 255, 255, .3);
	ctx.fillRect(
		Math.round((can.width / 2 - (level.width * SIZE / 2)) / SIZE) * SIZE,
		Math.round((can.height / 2 - (level.height * SIZE / 2)) / SIZE) * SIZE,
		level.width * SIZE,
		level.height * SIZE
	);

	// Distance de la carte de victoire par rapport au bord (en nombre de cellules)
	distx = Math.round((can.width / 2 - (level.width * SIZE / 2)) / SIZE);
	disty = Math.round((can.height / 2 - (level.height * SIZE / 2)) / SIZE);

	for (p = 0, plen = level.pieces.length ; p < plen ; p++) {
		piece   = level.pieces[p];
		diffx   = 0;
		diffy   = 0;
		collide = false;

		for (y = 0, ylen = blocks[piece.block].length ; y < ylen ; y++) {
			for (x = 0, xlen = blocks[piece.block][0].length ; x < xlen ; x++) {
				if (blocks[piece.block][y][x] == 1) {
					collide = false;

					for (p2 = 0, p2len = level.pieces.length ; p2 < p2len ; p2++) {
						piece2 = level.pieces[p2];

						if (piece == piece2) {
							continue;
						}

						// Distance entre les deux pièces
						diffx = piece2.x - piece.x;
						diffy = piece2.y - piece.y;

						// Le bout est-il en collision avec une autre ?
						if (typeof blocks[piece2.block][y - diffy] != 'undefined') {
							if (typeof blocks[piece2.block][y - diffy][x - diffx] != 'undefined') {
								if (blocks[piece2.block][y - diffy][x - diffx] == 1) {
									collide = true;
								}
							}
						}

						// Le bout est dans la carte de victoire ?
						if (typeof map[piece.y - disty + y] != 'undefined') {
							if (typeof map[piece.y - disty + y][piece.x - distx + x] != 'undefined') {
								map[piece.y - disty + y][piece.x - distx + x] = 1;
							}
						}

						// Collision du bout ?
						if (collide) {
							//ctx.globalAlpha = .5;
							ctx.fillStyle = rgb(200, 0, 0);
							break;
						} else {
							ctx.fillStyle = piece.color;
						}
					}


					// Affichage du bout
					// ctx.beginPath();
					// ctx.rect((piece.x + x) * SIZE, (piece.y + y) * SIZE, SIZE, SIZE);
					// ctx.fill();
					// ctx.lineWidth = 1;
					// ctx.strokeStyle = rgb(0, 0, 0);
					// ctx.stroke();
					// ctx.closePath();

					ctx.fillRect((piece.x + x) * SIZE, (piece.y + y) * SIZE, SIZE, SIZE);
					//ctx.globalAlpha = 1;
				}
			}
		}
	}

	// Test de victoire
	win = true;

	for (y = 0, ylen = level.height ; y < ylen ; y++) {
		if (!win) {
			break;
		}

		for (x = 0, xlen = level.width ; x < xlen ; x++) {
			if (map[y][x] != 1) {
				win = false;
				break;
			}
		}
	}

	if (win) {
		alert('Victoire ! Bien joué !');
		window.location.href = 'index.html';
	}
}

/* Ajouter une pièce
--------------------- */
function add_piece(x, y, block, color) {
	level.pieces.push({
		x:      x,
		y:      y,
		block:  block,
		hover:  false,
		color:  color,
		width:  blocks[block][0].length,
		height: blocks[block].length,
		drag:   undefined
	});
}

/* Clic de la souris
--------------------- */
document.onmousedown = function(e) {
	var p, plen,
		piece,
		mousex, mousey;

	// Position de la souris (en nombre de cellules)
	mousex = Math.floor(mouse.x / SIZE);
	mousey = Math.floor(mouse.y / SIZE);

	// Mise en glisser des pièces survolées
	for (p = 0, plen = level.pieces.length ; p < plen ; p++) {
		piece = level.pieces[p];

		if (!piece.hover) {
			continue;
		}

		piece.drag = {
			dist_x: mousex - piece.x,
			dist_y: mousey - piece.y
		};

		break;
	}
};

/* Lâché du clic de la souris
------------------------------ */
document.onmouseup = function() {
	var p, plen,
		piece;

	// Lâché des pièces en glisser
	for (p = 0, plen = level.pieces.length ; p < plen ; p++) {
		piece = level.pieces[p];

		if (!piece.drag) {
			continue;
		}

		piece.drag = undefined;
	}
};

/* Déplacement de la souris
---------------------------- */
document.onmousemove = function(e) {
	var p, plen,
		x, xlen,
		y, ylen,
		x2, x2len,
		y2, y2len,
		piece,
		mousex, mousey,
		diffx, diffy;

	// Mise à jour de la position de la souris
	mouse.x = e.pageX - can.offsetLeft;
	mouse.y = e.pageY - can.offsetTop;

	// Position de la souris (en nombre de cellules)
	mousex = Math.floor(mouse.x / SIZE);
	mousey = Math.floor(mouse.y / SIZE);

	// Affichage du curseur par défaut
	if (can.style.cursor != 'default') {
		can.style.cursor = 'default';
	}

	for (p = 0, plen = level.pieces.length ; p < plen ; p++) {
		piece = level.pieces[p];
		piece.hover = false;

		// Déplacement de la pièce si elle est en glisser
		if (piece.drag) {
			piece.x = mousex - piece.drag.dist_x;
			piece.y = mousey - piece.drag.dist_y;
		}

		for (x = 0, xlen = blocks[piece.block][0].length ; x < xlen ; x++) {
			for (y = 0, ylen = blocks[piece.block].length ; y < ylen ; y++) {
				diffx = mousex - piece.x;
				diffy = mousey - piece.y;

				if (typeof blocks[piece.block][diffy] != 'undefined') {
					if (typeof blocks[piece.block][diffy][diffx] != 'undefined') {
						// Bout survolé
						if (blocks[piece.block][diffy][diffx] == 1) {
							piece.hover = true;

							// Mise à jour du curseur en pointeur
							if (can.style.cursor != 'pointer') {
								can.style.cursor = 'pointer';
							}

							break;
						}
					}
				}
			}
		}
	}
};


init();

})();
