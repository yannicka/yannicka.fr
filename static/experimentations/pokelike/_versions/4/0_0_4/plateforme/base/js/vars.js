/* Constantes */
var ZOOM = 50;
var SOOM = ZOOM / 2;

/* Canvas et zone de dessin */
var can = document.getElementById('jeu');
var ctx = can.getContext('2d');

/* Entités */
var map    = [];
var camera = { x: 0, y: 0, w: 400, h: 400 };
var player = { x: ZOOM, y: ZOOM, w: 50, h: 50, gravity: 0, canjump: true, /*maxspeed: { x: 8, y: 1 },*/ angle: 0 };

/* Images */
var imgs = {
	arrows: 'img/arrows.png',
	back:   'img/back.png',
	wall:   'img/wall.png',
	player: 'img/player.png',
	key:    'img/key.png',
	door:   'img/door.png',
	love:   'img/love.png'
};
var img  = {};
var back = 'rgb(255, 255, 255)';

/* Le joueur a t-il la clé ? */
var haveKey = false;

/* Création des images */
for (var i in imgs) {
	img[i] = new Image();
	img[i].src = imgs[i];
	img[i].onload = function() { imgsload++; };
}

/* Nombre d'images chargés */
var imgsload   = 0;
var imgstoload = Object.keys(imgs).length;

if (localStorage['pilab-jeu-version'] != 8) {
	localStorage['pilab-jeu-levels']  = '1000000000000000';
	localStorage['pilab-jeu-life']      = 3;
	localStorage['pilab-jeu-penalty'] = 0;
	localStorage['pilab-jeu-version']  = 8;
}

var level = 0;
var state = 'menu';

var transition = 0;
