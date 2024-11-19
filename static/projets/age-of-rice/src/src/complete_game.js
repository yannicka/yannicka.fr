/*
	=====
	px.js
	=====
*/

"use strict";

/*
	Petite librairie facilitant la gestion de certains éléments dont :
	  - la gestion de la souris
	  - la gestion du clavier
	  - certaines fonctions mathématiques utile
	  - des alias pour raccourcir le nom de certaines fonctions
	  - la gestion des collisions

	A savoir :
	  - test : il faut tester
	  - name : il faut trouver un bon nom
	  - code : il faut revoir le code

	Idées :
	  - aucune
*/

/*# --- #*/
/*# Dom #*/
/*# --- #*/
	//# obtenir un élément par son ID
	function getById(id) {
		return document.getElementById(id);
	}

	//# obtenir une liste d'éléments par un nom de classe
	function getByClass(clss) {
		return document.getElementsByClassName(clss);
	}

	//# obtenir une liste d'éléments d'une même balise
	function getByTag(tag) {
		return document.getElementsByTagName(tag);
	}

	//# obtenir une liste d'élements avec le même nom
	function getByName(name) {
		return document.getElementsByName(name);
	}

	//# obtenir un élément grâce à un chemin spécifique
	function getOne(one) {
		return document.querySelector(one);
	}

	//# obtenir une liste d'éléments grâce à un chemin spécifique
	function getAll(all) {
		return document.querySelectorAll(all);
	}

/*# ------ #*/
/*# window #*/
/*# ------ #*/
	//# relance une fonction 60 fois par secondes
	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame    || window.webkitRequestAnimationFrame ||
			   window.mozRequestAnimationFrame || window.oRequestAnimationFrame      ||
			   window.msRequestAnimationFrame  || function(callback) { window.setTimeout(callback, 1000 / 60); };
	})();

/*# ----- #*/
/*# Maths #*/
/*# ----- #*/
	//# retourne un nombre entre les extrémités de min et max
	Math.clamp = function(val, min, max) {
		return Math.max(min, Math.min(max, val));
	};

	//# retourne un nombre entre min et max
	Math.rand = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	//# facilite la conversion radian <-> degré
	Math.PI180 = Math.PI / 180;

	//# converti un degré en radian
	Math.deg_to_rad = function(deg) {
		return deg * Math.PI180;
	};

	//# converti un radian en degré
	Math.rad_to_deg = function(rad) {
		return rad / Math.PI180;
	};

/*# ------ #*/
/*# Object #*/
/*# ------ #*/
	//# renvoie le nombre de clés d'un objet
	Object.prototype.size = function() {
		return Object.keys(this).length;
	};

/*# ----- #*/
/*# Array #*/
/*# ----- #*/
	//# retourne le premier élément d'un tableau
	Array.prototype.first = function() {
		return this[0];
	};

	//# retourne le dernier élément d'un tableau
	Array.prototype.last  = function() {
		return this[this.length - 1];
	};

	//# supprimer un élément à un index spécifique sur un tableau
	Array.prototype.remove = function(i) {
		return this.splice(i, 1);
	};

	//# retourne true si un élément se trouve dans le tableau
	Array.prototype.in_array = function(element) {
		for (var i = 0 ; i < this.length ; i++) {
			if (this[i] == element) {
				return true;
			}
		}

		return false;
	};

	//# détermine si deux tableaux sont identiques
	Array.prototype.equals = function(arr) {
		if (this.length == arr.length) {
			for (var i = 0 ; i < this.length ; i++) {
				if (this[i] != arr[i]) {
					return false;
				}
			}
		} else {
			return false;
		}

		return true;
	};

	//# détermine si une valeur en [y][x] existe dans un tableau multidimenssionel
	Array.prototype.validPos = function(x, y) {
		return typeof this[y] !== 'undefined' && typeof this[y][x] !== 'undefined';
	};

	//# détermine si une valeur en [y][x] existe dans un tableau multidimenssionel
	Array.prototype.getPos = function(x, y) {
		return this[y][x];
	};

	//# permet de trier un tableau suivant une clé et un ordre (asc/desc)
	Array.prototype.sortBy = function(key, order) {
		function sorter(k1, k2) {
			if (order.toLowerCase() == 'asc') {
				return k1[key] > k2[key];
			} else {
				return k1[key] < k2[key];
			}
		}

		return this.sort(sorter);
	};

/*# ----- #*/
/*# Color #*/
/*# ----- #*/
	//# converti un r,g,b en une châine de caractères
	function rgb(r, g, b) {
		return 'rgb(' + r + ', ' + g + ', ' + b + ')';
	}

	//# converti un r,g,b,a en une châine de caractères
	function rgba(r, g, b, a) {
		return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
	}

	//# converti un RGB en Hexadecimal
	function rgbToHex(r, g, b) {
		return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}

/*# ------ #*/
/*# Canvas #*/
/*# ------ #*/
	//# permet d'effacer le context plus facilement
	CanvasRenderingContext2D.prototype.clear = function(can) {
		this.clearRect(0, 0, can.width, can.height);
	};

	//# permet d'effacer le context plus facilement
	CanvasRenderingContext2D.prototype.fillBackground = function(can, color) {
		if (typeof color != 'undefined') {
			var tmp_fillstyle = this.fillStyle;
			this.fillStyle = color;
		}

		this.fillRect(0, 0, can.width, can.height);

		if (typeof color != 'undefined') {
			this.fillStyle = tmp_fillstyle;
		}
	};

	//# rend les deux derniers paramètres de drawImage facultatif
	CanvasRenderingContext2D.prototype.drawImg = function(img, sx, sy, sw, sh, dx, dy) {
		this.drawImage(img, sx, sy, sw, sh, dx, dy, sw, sh);
	};

	//# permet d'afficher un texte sur plusieurs lignes
	CanvasRenderingContext2D.prototype.fillWrapText = function(text, x, y, maxWidth, lineHeight) {
		var words = text.split(' ');
		var line = '';

		for (var n = 0 ; n < words.length ; n++) {
			var testLine  = line + words[n] + ' ';
			var metrics   = this.measureText(testLine);
			var testWidth = metrics.width;

			if (testWidth > maxWidth) {
				this.fillText(line, x, y);
				line = words[n] + ' ';
				y   += lineHeight;
			} else {
				line = testLine;
			}
		}

		this.fillText(line, x, y);
	}

/*# ---------- #*/
/*# Collisions #*/
/*# ---------- #*/
	//# todo test
	//# collision point <-> point
	function pointHitPoint(x1, y1, x2, y2) {
		return (x1 == x2 && y1 == y2);
	}

	//# todo test
	//# collision point <-> boite
	function pointHitBox(x, y, box) {
		if (
			x >= box.x
			&& x < box.x + box.w
			&& y >= box.y
			&& y < box.y + box.h
		) {
		   return true;
		} else {
		   return false;
		}
	}

	//# todo test
	//# collision point <-> cercle
	function pointHitCircle(x, y, circle) {
		var d2 = ((x - circle.x) * (x - circle.x)) + ((y - circle.y) * (y - circle.y));

		if (d2 > circle.r * circle.r) {
			return false;
		} else {
			return true;
		}
	}

	//# todo test
	//# collision point <-> ligne
	function pointHitLine(x, y, x1, y1, x2, y2) {
		return false;
	}

	//# todo test
	//# collision point <-> polygone
	function pointHitPolygon() {
		return false;
	}

	//# todo test
	//# collision boite <-> boite
	function boxHitBox(box1, box2) {
		if (
			box2.x >= box1.x + box1.w
			|| box2.x + box2.w <= box1.x
			|| box2.y >= box1.y + box1.h
			|| box2.y + box2.h <= box1.y
		) {
			return false;
		} else {
			return true;
		}
	}

	//# todo test
	//# collision boite <-> cercle
	function boxHitCircle(box, circle) {
		if (
			pointHitCircle(box.x, box.y, circle)
			|| pointHitCircle(box.x, box.y + box.h, circle)
			|| pointHitCircle(box.x + box.w, box.y, circle)
			|| pointHitCircle(box.x + box.w, box.y + box.h, circle)
		) {
			return true;
		}

		return false;
	}

	//# todo test
	//# collision boite <-> ligne
	function boxHitLine(box, x1, y1, x2, y2) {
		return false;
	}

	//# todo test
	//# collision boite <-> polygone
	function boxHitPolygon(box, polygon) {
		return false;
	}

	//# todo test
	//# collision cercle <-> ligne
	function circleHitLine(circle, x1, y1, x2, y2) {
		var dx, dy, a, b, c, bb4ac;

		dx     = x2 - x1;
		dy     = y2 - y1;
		a      = dx * dx + dy * dy;
		b      = 2 * (dx * (x1 - circle.x) + dy * (y1 - circle.y));
		c      = circle.x * circle.x + circle.y * circle.y;
		c     += x1 * x1 + y1 * y1;
		c     -= 2 * (circle.x * x1 + circle.y * y1);
		c     -= circle.r * circle.r;
		bb4ac  = b * b - 4 * a * c;

		if (bb4ac < 0) {
			return false;
		} else {
			return true;
		}
	}

	//# todo test
	//# collision cercle <-> cercle
	function circleHitCircle(circle1, circle2) {
		var d2 = ((circle1.x - circle2.x) * (circle1.x - circle2.x)) + ((circle1.y - circle2.y) * (circle1.y - circle2.y));

		if (d2 > (circle1.r + circle2.r) * (circle1.r + circle2.r)) {
			return false;
		} else {
			return true;
		}
	}

	//# todo test
	//# collision cercle <-> polygone
	function circleHitPolygon(circle, polygon) {
		return false;
	}

	//# todo test
	//# collision ligne <-> ligne
	function lineHitLine(x1, y1, x2, y2, x3, y3, x4, y4) {
		return false;
	}

	//# todo test
	//# collision ligne <-> polygone
	function lineHitPolygon(x1, y1, x2, y2, polygon) {
		return false;
	}

	//# todo test
	//# collision polygone <-> polygone
	function polygonHitPolygon(polygon1, polygon2) {
		return false;
	}

/*# ------- #*/
/*# Clavier #*/
/*# ------- #*/
	//# gestion du clavier
	var Key = {
		keys: [], last: 0, lasts: [],

		TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17,
		ALT: 18, ESC : 27, SPACE: 32,

		LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40,

		A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77,
		N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,

		NUM0: 48, NUM1: 49, NUM2: 50, NUM3: 51, NUM4: 52,
		NUM5: 53, NUM6: 54, NUM7: 55, NUM8: 56, NUM9: 57,

		NUMPAD0: 96, NUMPAD1: 97, NUMPAD2: 98, NUMPAD3: 99, NUMPAD4: 100,
		NUMPAD5: 101, NUMPAD6: 102, NUMPAD7: 103, NUMPAD8: 104, NUMPAD9: 105,

		ADD: 107, SUB: 109, MUL: 106, DIV: 111,

		CAPSLOCK: 20, PAGEUP: 33, PAGEDOWN: 34, END    : 35,
		HOME    : 36, ISERT : 45, DELETE  : 46, NUMLOCK: 144,

		up: function(k) {
			return !Key.keys[k];
		},

		down: function(k) {
			return Key.keys[k];
		},

		press: function(k) {
			var v = Key.keys[k];

			Key.keys[k] = false;

			return v;
		},

		release: function(k) {
			var lasts = Key.lasts, last = lasts[lasts.indexOf(k)];

			if (typeof last != 'undefined') {
				lasts.splice(lasts.indexOf(k), 1);
			}

			return last == k;
		}
	};

	document.onkeyup = function(e) {
		Key.last            = e.keyCode;
		Key.keys[e.keyCode] = false;
	};

	document.onkeydown = function(e) {
		Key.keys[e.keyCode] = true;
	};

/*# ------ #*/
/*# Souris #*/
/*# ------ #*/
	//# todo code
	//# gestion de la souris
	var Mouse = {
		x: 0,
		y: 0,
		click: false,
		onclick: false,

		up: function() {
			return !Mouse.click;
		},

		down: function() {
			return Mouse.click;
		},

		release: function() {
			var onclick = Mouse.onclick;
			Mouse.onclick = false;

			return onclick;
		}
	};

	document.onmousedown = function(e) {
		Mouse.click = true;
	};

	document.onmouseup = function(e) {
		Mouse.onclick = true;
		Mouse.click   = false;
	};

/*# ------ #*/
/*# Entité #*/
/*# ------ #*/
	//# todo test name code
	//# une entité
	/*function Entity() {
		this.animations       = { base: { frames: [0], speed: 0 } };
		this.currentAnimation = 'base';
		this.frame            = 0;
		this.acDelta          = 0;

		this.addAnimation = function(name, frames, speed) {
			this.animations[name] = { frames: frames, speed: speed };
		};

		this.entityUpdate = function(dt) {
			if (this.currentAnimation.speed != 0) {
				if (this.acDelta < this.currentAnimation.speed) {
					this.acDelta += dt;
				} else {
					this.acDelta = 0;

					this.frame++;

					if (this.frame > this.currentAnimation.frames.length - 1) {
						this.frame = 0;
					}
				}
			}
		};

		this.play = function(name) {
			if (this.currentAnimation != this.animations[name]) {
				this.frame = 0;
				this.currentAnimation = this.animations[name];
			}
		};
	}*/

/*# ------- #*/
/*# A trier #*/
/*# ------- #*/
	//# todo name code
	function newImage(data) {
		var tmp = new Image();

		for (var i in data) {
			tmp[i] = data[i];
		}

		return tmp;
	}

	//# todo test name code
	//# renvoie la chaîne en remplacant le caractère à la position pos par change
	function replace(str, i, change) {
		return str.substring(0, i - 1) + change + str.substring(i);
	}

	//# todo test name code
	//# renvoie un xhr
	function ajax() {
		var xhr = null;

		if (window.XMLHttpRequest || window.ActiveXObject) {
			if (window.ActiveXObject) {
				try {
					xhr = new ActiveXObject('Msxml2.XMLHTTP');
				} catch(e) {
					xhr = new ActiveXObject('Microsoft.XMLHTTP');
				}
			} else {
				xhr = new XMLHttpRequest(); 
			}
		} else {
			alert('Votre navigateur ne supporte pas l\'objet XMLHTTPRequest...');

			return null;
		}

		return xhr;
	}

	//# todo name
	//# permet de gérer un timer
	function TimerManager() {
		this.dt    = 0;
		this.last  = Date.now();
		this.time  = 0;
		this.cross = 0;

		this.update = function() {
			this.dt   = Date.now() - this.last;
			this.last = Date.now();
			this.time += this.dt;
			this.cross++;
		};
	}

	//# todo name
	//# permet de gérer un timer
	function Timer(delay, repeatCount) {
		this.currentTime  = 0;
		this.currentCount = 0;
		this.delay        = delay;
		this.repeatCount  = repeatCount;
		this.running      = true;

		this.update = function(dt) {
			this.currentTime += dt;
		};

		this.reset = function() {
			this.running      = false;
			this.currentCount = 0;
		};

		this.start = function() {
			this.running = true;
		};

		this.stop = function() {
			this.running = false;
		};

		this.finished = function() {
			var ret = this.currentTime > this.delay;

			this.currentTime = 0;
			this.currentCount++;

			return ret;
		};

		this.totalFinished = function() {
			return this.repeatCount != 0 && this.repeatCount >= this.currentCount;
		};
	}

	//# todo name
	//# permet de gérer le préchargement d'images
	function PreloadManager(images, image, callback) {
		var nbImgsLoaded = 0;
		var nbImgsToLoad = images.size();
		var i            = null;

		function imgLoaded() {
			nbImgsLoaded += 1;
		}

		for (i in images) {
			image[i] = newImage({
				onload: imgLoaded,
				src:    images[i]
			});
		}

		function preload() {
			if (nbImgsLoaded == nbImgsToLoad) {
				callback();
			} else {
				setTimeout(preload, 100);
			}
		}

		preload();
	}

	//# permet de faire de l'héritage
	var __extends = this.__extends || function (d, b) {
		function __() {
			this.constructor = d;
		}

		__.prototype = b.prototype;
		d.prototype    = new __();
	};

	//# Récupère la valeur sélectionnée d'un ensemble de bouton radio
	function getCheckedRadio(name) {
		var el = getByName(name);

		for (var i = 0 , len = el.length ; i < len; i++) {
			if (el[i].checked) {
				return el[i].value;
			}
		}
	}

	//# Donne la distance entre deux points
	function distance2P(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	}

	//# data64 d'un pixel transparent
	var transpix = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';

	//# Animation
	/*Object.prototype.animate = function(opts) {
		var start = new Date();

		var id = setInterval(function(me) {
			var timePassed = new Date() - start;
			var progress   = timePassed / opts.duration;

			if (progress > 1)
				progress = 1

			var delta = opts.delta(me, progress);
			opts.step(me, delta);

			if (progress == 1) {
				clearInterval(id);
			}
		}, opts.delay || 10, this);
	};*/
















/*
	=======
	game.js
	=======
*/

var G = {};

G.init = function() {
	G.can.width  = 640;
	G.can.height = 460;

	G.ctx.fillBackground(G.can, rgb(0, 0, 0));
	G.ctx.fillStyle = rgb(255, 255, 255);
	G.ctx.font      = 'normal 16px "Times New Roman", serif';
	G.ctx.textAlign = 'center';
	G.ctx.fillText('Loading game...', G.can.width / 2, G.can.height / 2);

	PreloadManager(G.images, G.image, G.create);
};

G.create = function() {
	G.map.width  = G.image.bg.width;
	G.map.height = G.image.bg.height;
	G.map.cols   = parseInt(G.map.width / G.map.zoom);
	G.map.lines  = parseInt(G.map.height / G.map.zoom);

	G.game.init();

	G.update();
};

G.update = function() {
	if (document.hasFocus()) {
		G.timer.update();
		G[G.state].update();
	}

	requestAnimFrame(G.update);
};

G.can = getById('game');
G.ctx = G.can.getContext('2d');

G.log = getById('log');

G.images = {
	bg:              'assets/gfx/bg.png',
	buildings:       'assets/gfx/buildings.png',
	pointers:        'assets/gfx/pointers.png',
	tool_bar:        'assets/gfx/tool_bar.png',
	tooltip:         'assets/gfx/tooltip.png',
	buttons:         'assets/gfx/buttons.png',
	castles:         'assets/gfx/castles.png',
	start:           'assets/gfx/start.png',
	instructions:    'assets/gfx/instructions.png',
	victory:         'assets/gfx/victory.png',
	defeat:          'assets/gfx/defeat.png',
	units:           'assets/gfx/units.png'
};
G.image = {};

G.camera = {
	x: 0,
	y: 0
};

G.timer = new TimerManager();

G.state = 'start';

G.map = {
	zoom:   100,
	width:  0,
	height: 0,
	cells:  0,
	lines:  0
};

G.change_state = function(newstate) {
	G.state = newstate;
};

document.onmousemove = function(e) {
	Mouse.x = e.pageX - G.can.offsetLeft;
	Mouse.y = e.pageY - G.can.offsetTop;
};















/*
	==============
	states/game.js
	==============
*/

G.game = {};

G.game.init = function() {
	var x = 0;
	var y = 0;

	for (y = 0 ; y < G.map.lines ; y++) {
		G.game.constructions[y] = [];

		for (x = 0 ; x < G.map.cols ; x++) {
			G.game.constructions[y][x] = {
				building: 0,
				owner:    false,
				finish:   0,
				timer:    0,
				level:    1,
				opacity:  0
			};
		}
	}
};

G.game.update = function() {
	if (Key.press(Key.P) || Key.press(Key.ESC)) {
		G.game.pause = !G.game.pause;

		G.game.last_image = G.ctx.getImageData(0, 0, G.can.width, G.can.height);
	}

	if (!G.game.pause) {
		if (G.game.player.life <= 0) {
			G.change_state('defeat');
		}

		if (G.game.enemy.life <= 0) {
			G.change_state('victory');
		}

		if (Mouse.x > G.can.width - 50) {
			G.camera.x += 12;
		} else if (Mouse.x < 50) {
			G.camera.x -= 12;
		}

		var i = 0;
		var j = 0;
		var x = 0;
		var y = 0;

		var construction = false;
		var building     = false;

		var solider = false;
		var knight  = false;

		var opponent = '';

		var choice_building = {};

		if (Mouse.down() && Mouse.x > 0 && Mouse.x < G.can.width && Mouse.y > 0 && Mouse.y < G.can.height - 60) {
			choice_building = G.game.buildings[G.game.choice_building];

			if (G.game.player.gold - choice_building.cost >= 0) {

				x = Math.floor((Mouse.x + G.camera.x) / G.map.zoom);
				y = Math.floor((Mouse.y + G.camera.y) / G.map.zoom);

				construction = G.game.constructions[y][x];

				if (G.game.constructions.validPos(x, y) && construction.owner == false && x > 0 && x < 8) {
					G.game.player.gold -= choice_building.cost;

					construction.building = G.game.choice_building;
					construction.owner    = 'player';
					construction.life     = choice_building.baselife;

					if (construction.building == G.game.STABLE)
						construction.horses = 0;

					Mouse.click = false;

					G.game.push_text('-' + choice_building.cost + ' golds', x * G.map.zoom + 50, y * G.map.zoom + 20);
				}
			}
		}

		G.camera.x = Math.clamp(G.camera.x, 0, G.map.width - G.can.width);

		for (y = 0 ; y < G.map.lines ; y++) {
			for (x = 0 ; x < G.map.cols ; x++) {
				construction = G.game.constructions[y][x];
				building     = G.game.buildings[construction.building];

				if (construction.owner) {
					if (typeof construction.finish == 'number') {
						construction.finish += G.timer.dt;

						if (building.time_creation < construction.finish) {
							construction.finish = true;
						}

						
					} else if (construction.finish == true) {
						construction.timer += G.timer.dt;

						if (building.hasOwnProperty('callback')) {
							if (construction.timer > building.callback.every) {
								construction.timer = 0;
								G.game.callback[building.callback.action](construction.owner, x, y, construction, building);
							}
						}
					}
				}
			}
		}

		for (i = 0 ; i < G.game.teams.length ; i++) {
			for (j = 0 ; j < G.game[G.game.teams[i]].soliders.length ; j++) {
				solider = G.game[G.game.teams[i]].soliders[j];

				x = Math.floor(solider.x / G.map.zoom);
				y = solider.line;

				construction = G.game.constructions[y][x];
				building     = G.game.buildings[construction.building];

				opponent = G.game.teams[i] == 'player' ? 'enemy' : 'player';

				solider.x += G.game.teams[i] == 'player' ? solider.speed : -solider.speed;

				if ((solider.x + 24 > G.map.width && G.game.teams[i] == 'player') || (solider.x < 0 && G.game.teams[i] == 'enemy')) {
					G.game[opponent].life -= solider.damage;
					G.game[G.game.teams[i]].soliders.splice(j, 1);
				}

				if (construction.owner == G.game.teams[i]) {
					if (construction.building == G.game.STABLE) {
						if (construction.horses > 0) {
							construction.horses--;

							G.game[G.game.teams[i]].knights.push({
								x:      solider.x,
								y:      solider.y,
								line:   solider.line,
								speed:  solider.speed + 2 + Math.random(),
								damage: G.game.DAMAGE_KNIGHT
							});

							G.game[G.game.teams[i]].soliders.splice(j, 1);
						}
					}
				} else if (construction.owner == opponent && construction.finish == true) {
					construction.life -= solider.damage;
					G.game[G.game.teams[i]].soliders.splice(j, 1);

					if (construction.life <= 0) {
						G.game[G.game.teams[i]].gold += parseInt(building.cost / 2);
						construction.building = 0;
						construction.owner    = false;
						construction.finish   = 0;
						construction.timer    = 0;
						construction.level    = 1;
					}
				}
			}

			for (j = 0 ; j < G.game[G.game.teams[i]].knights.length ; j++) {
				knight = G.game[G.game.teams[i]].knights[j];

				x = Math.floor(knight.x / G.map.zoom);
				y = knight.line;

				construction = G.game.constructions[y][x];
				building     = G.game.buildings[construction.building];

				opponent = G.game.teams[i] == 'player' ? 'enemy' : 'player';

				knight.x += G.game.teams[i] == 'player' ? knight.speed : -knight.speed;

				if ((knight.x + 24 > G.map.width && G.game.teams[i] == 'player') || (knight.x < 0 && G.game.teams[i] == 'enemy')) {
					G.game[opponent].life -= knight.damage;
					G.game[G.game.teams[i]].knights.splice(j, 1);
				}

				if (construction.owner == opponent && construction.finish == true) {
					construction.life -= knight.damage;
					G.game[G.game.teams[i]].knights.splice(j, 1);

					if (construction.life <= 0) {
						G.game[G.game.teams[i]].gold += parseInt(building.cost / 3);
						construction.building = 0;
						construction.owner    = false;
						construction.finish   = 0;
						construction.timer    = 0;
						construction.level    = 1;
					}
				}
			}
		}

		if (Key.press(Key.Q)) {
			G.game.choice_building = 0;
		} else if (Key.press(Key.W)) {
			G.game.choice_building = 1;
		} else if (Key.press(Key.E)) {
			G.game.choice_building = 2;
		} else if (Key.press(Key.R)) {
			G.game.choice_building = 3;
		}

		//=BEGIN PSEUDO-IA
		if (G.timer.cross % 180 == 0) {

			var free_boxes = [];
			var full_boxes = [];

			var nb_bank   = 0;
			var nb_farm   = 0;
			var nb_arena  = 0;
			var nb_stable = 0;

			var r = 0;

			var nb_builds = [0, 0, 0, 0];

			for (var ey = 0 ; ey < G.map.lines ; ey++) {
				for (var ex = 12 ; ex < G.map.cols - 1 ; ex++) {
					construction = G.game.constructions[ey][ex];
					building     = G.game.buildings[construction.building];

					if (construction.owner == false) {
						free_boxes.push({ x: ex, y: ey });
					} else if (construction.building == G.game.BANK) {
						nb_bank++;
					} else if (construction.building == G.game.FARM) {
						nb_farm++;
					} else if (construction.building == G.game.ARENA) {
						nb_arena++;
					} else if (construction.building == G.game.STABLE) {
						nb_stable++;
					}

					if (construction.owner == 'enemy') {
						nb_builds[ey]++;

						full_boxes.push({ x: ex, y: ey });

						if (construction.building == G.game.ARENA) {
							G.game.gen_solider('enemy', ex, ey, construction, building);
						}

						if (construction.building == G.game.STABLE) {
							G.game.gen_horse('enemy', ex, ey, construction, building);
						}
					}
				}
			}

			if (free_boxes.length > 0) {
				var where = free_boxes[Math.floor(Math.random() * free_boxes.length)];

				for (i = 0 ; i < nb_builds.length ; i++) {
					if (nb_builds[i] == 0) {
						where.y = i;
					}
				}

				if (nb_bank == 0 && where.x > 13) {
					r = G.game.BANK;
				} else if (nb_farm == 0 && where.x > 13) {
					r = G.game.FARM;
				} else if (nb_arena == 0 || (where.x >= 12 && where <= 13 && nb_farm > 2)) {
					r = G.game.ARENA;
				} else if ((nb_stable == 0 && where.x >= 12 && where.x <= 13) || (where.x == 12 && nb_farm > 2)) {
					r = G.game.STABLE;
				} else {
					if (nb_arena <= Math.round((nb_bank + nb_farm + nb_stable) / 2)) {
						r = G.game.ARENA;
					} else if (nb_bank <= Math.round((nb_farm + nb_arena + nb_stable) / 4)) {
						r = G.game.BANK;
					} else if (nb_bank <= Math.round((nb_farm + nb_arena + nb_stable) / 2)) {
						r = Math.rand(0, 1);
					} else {
						r = Math.rand(0, 2);
					}
				}

				if (G.game.enemy.gold - G.game.buildings[r].cost >= 0) {
					switch (r) {
						case G.game.BANK:
							G.game.constructions[where.y][where.x].building = G.game.BANK;
							G.game.constructions[where.y][where.x].owner    = 'enemy';
							G.game.constructions[where.y][where.x].life     = G.game.buildings[G.game.BANK].baselife;
							G.game.enemy.gold -= G.game.buildings[G.game.BANK].cost;
							break;
						case G.game.FARM:
							G.game.constructions[where.y][where.x].building = G.game.FARM;
							G.game.constructions[where.y][where.x].owner    = 'enemy';
							G.game.constructions[where.y][where.x].life     = G.game.buildings[G.game.FARM].baselife;
							G.game.enemy.gold -= G.game.buildings[G.game.FARM].cost;
							break;
						case G.game.ARENA:
							G.game.constructions[where.y][where.x].building = G.game.ARENA;
							G.game.constructions[where.y][where.x].owner    = 'enemy';
							G.game.constructions[where.y][where.x].life     = G.game.buildings[G.game.ARENA].baselife;
							G.game.enemy.gold -= G.game.buildings[G.game.ARENA].cost;
							break;
						case G.game.STABLE:
							G.game.constructions[where.y][where.x].building = G.game.STABLE;
							G.game.constructions[where.y][where.x].owner    = 'enemy';
							G.game.constructions[where.y][where.x].life     = G.game.buildings[G.game.STABLE].baselife;
							G.game.enemy.gold -= G.game.buildings[G.game.STABLE].cost;
							break;
					}
				}
			} else {
				var where = full_boxes[Math.floor(Math.random() * full_boxes.length)];
				var c = G.game.constructions[where.y][where.x];
				var b = G.game.buildings[c.building];

				G.game.upgrade('enemy', where.x, where.y, c, b, parseInt((b.cost) * (1 + (c.level / 8))));
			}

		}
		//=END PSEUDO-IA
	}

	G.game.draw();

	if (G.game.hover)
		document.body.style.cursor = 'pointer';
	else
		document.body.style.cursor = 'auto';

	G.game.hover = false;
};

G.game.draw = function() {
	if (!G.game.pause) {
		var i = 0;
		var j = 0;
		var x = 0;
		var y = 0;

		var construction = false;
		var building     = false;

		var solider = false;
		var knight  = false;

		var size = 0;

		var sell_price = 0;
		var sell_text  = '';

		var upgrade_cost = 0;
		var upgrade_text = '';

		var text = '';

		G.ctx.clear(G.can);

		G.ctx.save();
		G.ctx.translate(-G.camera.x, -G.camera.y);

			G.ctx.drawImage(G.image.bg, 0, 0);

			G.ctx.drawImage(G.image.castles, 0, 0, 100, 400, 0, 0, 100, 400);

			G.ctx.drawImage(G.image.castles, 100, 0, 100, 400, G.map.width - G.map.zoom, 0, 100, 400);

			for (y = 0 ; y < G.map.lines ; y++) {
				for (x = 0 ; x < G.map.cols ; x++) {
					construction = G.game.constructions[y][x];
					building     = G.game.buildings[construction.building];

					if (construction.owner) {
						if (construction.finish == true) {
							G.ctx.drawImage(
								G.image.buildings,
								construction.owner == 'enemy' ? 100 : 0,
								building.offsetY,
								G.map.zoom,
								G.map.zoom,
								x * G.map.zoom,
								y * G.map.zoom,
								G.map.zoom,
								G.map.zoom
							);
						} else {
							size = Math.clamp(((construction.finish) / (building.time_creation)) * G.map.zoom, 1, G.map.zoom);
							construction.opacity = size / G.map.zoom;

							G.ctx.save();
							G.ctx.globalAlpha = construction.opacity;

								G.ctx.drawImage(
									G.image.buildings,
									construction.owner == 'enemy' ? 100 : 0,
									building.offsetY + G.map.zoom - size,
									G.map.zoom,
									size,
									x * G.map.zoom,
									y * G.map.zoom - size + G.map.zoom,
									G.map.zoom,
									size
								);

							G.ctx.restore();
						}

						if (construction.owner == 'player') {
							if (building.can_upgrade && construction.finish == true) {
								G.ctx.drawImage(G.image.buttons, 0, 0, 32, 64, x * G.map.zoom + G.map.zoom - 32, y * G.map.zoom, 32, 64);
							} else {
								G.ctx.drawImage(G.image.buttons, 0, 0, 32, 32, x * G.map.zoom + G.map.zoom - 32, y * G.map.zoom, 32, 32);
							}

							if (construction.building == G.game.ARENA && construction.finish == true) {
								G.ctx.drawImage(G.image.buttons, 0, 64, 32, 32, x * G.map.zoom + 68, y * G.map.zoom + 32, 32, 32);
							}

							if (construction.building == G.game.STABLE && construction.finish == true) {
								G.ctx.save();
									G.ctx.fillStyle = rgb(0, 0, 0);
									G.ctx.textAlign = 'left';
									G.ctx.font      = 'normal 16px "Arial", serif';
									G.ctx.strokeStyle = rgb(255, 255, 255);
									G.ctx.lineWidth = 1;
									G.ctx.fillText(construction.horses, x * G.map.zoom + 6, y * G.map.zoom + 20);
									G.ctx.strokeText(construction.horses, x * G.map.zoom + 6, y * G.map.zoom + 20);
								G.ctx.restore();

								G.ctx.drawImage(G.image.buttons, 0, 96, 32, 32, x * G.map.zoom + 68, y * G.map.zoom + 32, 32, 32);
							}
						}

						if (construction.finish != true) {
							G.ctx.fillStyle = rgb(0, 0, 0);
							G.ctx.fillRect(x * G.map.zoom + 25, y * G.map.zoom + G.map.zoom - 8, 50, 6);

							G.ctx.fillStyle = rgb(255, 255, 0);
							G.ctx.fillRect(x * G.map.zoom + 26, y * G.map.zoom + G.map.zoom - 7, Math.clamp(((construction.finish) / (building.time_creation)) * 48, 0, 48), 4);
						} else {
							G.ctx.fillStyle = rgb(0, 0, 0);
							G.ctx.fillRect(x * G.map.zoom + 25, y * G.map.zoom + G.map.zoom - 8, 50, 6);

							G.ctx.fillStyle = rgb(255, 0, 0);
							G.ctx.fillRect(x * G.map.zoom + 26, y * G.map.zoom + G.map.zoom - 7, Math.clamp(((construction.life) / (building.baselife)) * 48, 0, 48), 4);
						}
					}
				}
			}

			x = Math.floor((Mouse.x + G.camera.x) / G.map.zoom);
			y = Math.floor((Mouse.y + G.camera.y) / G.map.zoom);

			if (x > 0 && x < 8) {
				if (G.game.constructions.validPos(x, y) && !G.game.constructions[y][x].owner) {
					building = G.game.buildings[G.game.choice_building];

					G.ctx.save();
					G.ctx.globalAlpha = 0.5;

						G.ctx.drawImage(
							G.image.buildings,
							0,
							building.offsetY,
							G.map.zoom,
							G.map.zoom,
							x * G.map.zoom,
							y * G.map.zoom,
							G.map.zoom,
							G.map.zoom
						);

					G.ctx.restore();
				}

				G.ctx.drawImage(G.image.pointers, 0, 0, 100, 100, x * G.map.zoom, y * G.map.zoom, 100, 100);
			}

			for (i = 0 ; i < G.game.teams.length ; i++) {
				for (j = 0 ; j < G.game[G.game.teams[i]].soliders.length ; j++) {
					solider = G.game[G.game.teams[i]].soliders[j];

					if (G.game.teams[i] == 'player') {
						G.ctx.drawImage(G.image.units, 0, 0, 24, 24, solider.x, solider.y, 24, 24);
					} else {
						G.ctx.drawImage(G.image.units, 24, 0, 24, 24, solider.x, solider.y, 24, 24);
					}
				}

				for (j = 0 ; j < G.game[G.game.teams[i]].knights.length ; j++) {
					knight = G.game[G.game.teams[i]].knights[j];

					if (G.game.teams[i] == 'player') {
						G.ctx.drawImage(G.image.units, 0, 24, 24, 24, knight.x, knight.y, 24, 24);
					} else {
						G.ctx.drawImage(G.image.units, 24, 24, 24, 24, knight.x, knight.y, 24, 24);
					}
				}
			}

		G.ctx.restore();

		G.ctx.drawImage(G.image.tool_bar, 0, G.map.height);

		G.ctx.fillStyle = rgb(0, 0, 0);
		G.ctx.font      = 'normal 13px "Arial", serif';
		G.ctx.textAlign = 'left';
		G.ctx.fillText(parseInt(G.game.player.gold), 18, 418);
		//G.ctx.fillText(parseInt(G.game.enemy.gold), 450, 418);
		G.ctx.fillText(G.game.player.life + ' / ' + G.game.player.maxlife, 18, 430);
		G.ctx.fillText(G.game.player.food, 18, 444);
		G.ctx.fillText(G.game.player.soliders.length, 18, 457);
		G.ctx.fillText(G.game.player.knights.length, 74, 457);
		G.ctx.textAlign = 'right';
		G.ctx.fillText(G.game.enemy.life + ' / ' + G.game.enemy.maxlife, 618, 437);

		if (pointHitBox(Mouse.x, Mouse.y, { x: 2, y: 408, w: 12, h: 12 })) {
			text = 'Gold';

			G.game.draw_tooltip(Mouse.x, Mouse.y - 24, G.ctx.measureText(text).width, 24);

			G.ctx.save();
			G.ctx.translate(Mouse.x, Mouse.y - 24);

				G.ctx.fillStyle = rgb(0, 0, 0);
				G.ctx.textAlign = 'left';
				G.ctx.font      = 'normal 12px "Arial", serif';
				G.ctx.fillText(text, 5, 16);

			G.ctx.restore();
		}

		if (pointHitBox(Mouse.x, Mouse.y, { x: 2, y: 420, w: 12, h: 12 })) {
			text = 'Life';

			G.game.draw_tooltip(Mouse.x, Mouse.y - 24, G.ctx.measureText(text).width, 24);

			G.ctx.save();
			G.ctx.translate(Mouse.x, Mouse.y - 24);

				G.ctx.fillStyle = rgb(0, 0, 0);
				G.ctx.textAlign = 'left';
				G.ctx.font      = 'normal 12px "Arial", serif';
				G.ctx.fillText(text, 5, 16);

			G.ctx.restore();
		}

		if (pointHitBox(Mouse.x, Mouse.y, { x: 2, y: 433, w: 12, h: 12 })) {
			text = 'Food';

			G.game.draw_tooltip(Mouse.x, Mouse.y - 24, G.ctx.measureText(text).width, 24);

			G.ctx.save();
			G.ctx.translate(Mouse.x, Mouse.y - 24);

				G.ctx.fillStyle = rgb(0, 0, 0);
				G.ctx.textAlign = 'left';
				G.ctx.font      = 'normal 12px "Arial", serif';
				G.ctx.fillText(text, 5, 16);

			G.ctx.restore();
		}

		if (pointHitBox(Mouse.x, Mouse.y, { x: 2, y: 446, w: 12, h: 12 })) {
			text = 'Soliders';

			G.game.draw_tooltip(Mouse.x, Mouse.y - 24, G.ctx.measureText(text).width, 24);

			G.ctx.save();
			G.ctx.translate(Mouse.x, Mouse.y - 24);

				G.ctx.fillStyle = rgb(0, 0, 0);
				G.ctx.textAlign = 'left';
				G.ctx.font      = 'normal 12px "Arial", serif';
				G.ctx.fillText(text, 5, 16);

			G.ctx.restore();
		}

		if (pointHitBox(Mouse.x, Mouse.y, { x: 60, y: 446, w: 12, h: 12 })) {
			text = 'Knights';

			G.game.draw_tooltip(Mouse.x, Mouse.y - 24, G.ctx.measureText(text).width, 24);

			G.ctx.save();
			G.ctx.translate(Mouse.x, Mouse.y - 24);

				G.ctx.fillStyle = rgb(0, 0, 0);
				G.ctx.textAlign = 'left';
				G.ctx.font      = 'normal 12px "Arial", serif';
				G.ctx.fillText(text, 5, 16);

			G.ctx.restore();
		}

		for (i = 0 ; i < 4 ; i++) {
			G.ctx.drawImage(G.image.buildings, 0, i * G.map.zoom, G.map.zoom, G.map.zoom, 137 + i * 33 + i, 418, 33, 33);
		}

		G.ctx.drawImage(G.image.pointers, 100, 0, 33, 33, G.game.choice_building * 33 + 137 + G.game.choice_building, 418, 33, 33);

		for (i = 0 ; i < 4 ; i++) {
			if (pointHitBox(Mouse.x, Mouse.y, { x: 138 + i * 33 + i, y: 418, w: 33, h: 33 })) {
				G.game.hover = true;

				G.game.draw_tooltip(Mouse.x, Mouse.y - 72, G.ctx.measureText(G.game.buildings[i].description).width, 78);

				G.ctx.save();
				G.ctx.translate(Mouse.x, Mouse.y - 72);

					G.ctx.fillStyle = rgb(0, 0, 0);
					G.ctx.font      = 'bold 12px "Arial", serif';
					G.ctx.textAlign = 'left';
					G.ctx.fillText(G.game.buildings[i].name + ' (' + G.game.hotkeys.charAt(i) + ')', 5, 16);
					G.ctx.font      = 'italic 12px "Arial", serif';
					G.ctx.fillText(G.game.buildings[i].description, 5, 30);
					G.ctx.font      = 'normal 12px "Arial", serif';
					G.ctx.fillText('Cost: ' + G.game.buildings[i].cost, 5, 44);
					G.ctx.fillText('Life: ' + G.game.buildings[i].baselife, 5, 58);
					G.ctx.fillText('Build time: ' + parseInt(G.game.buildings[i].time_creation / 1000) + 's', 5, 72);

				G.ctx.restore();

				if (Mouse.down()) {
					G.game.choice_building = i;
					Mouse.click = false;
				}
			}
		}

		G.ctx.save();
		G.ctx.translate(-G.camera.x, -G.camera.y);

			G.ctx.fillStyle = rgb(255, 255, 255);
			G.ctx.textAlign = 'center';
			G.ctx.font      = 'bold 12px "Arial", serif';

			for (i = 0 ; i < G.game.texts.length ; i++) {
				G.ctx.save();
				G.ctx.globalAlpha = G.game.texts[i].opacity;

					G.ctx.fillText(G.game.texts[i].text, G.game.texts[i].x, G.game.texts[i].y);
					G.game.texts[i].update();

					if (G.game.texts[i].opacity < 0) {
						G.game.texts.splice(i, 1);
					}

				G.ctx.restore();
			}

			for (y = 0 ; y < G.map.lines ; y++) {
				for (x = 0 ; x < G.map.cols ; x++) {
					construction = G.game.constructions[y][x];
					building     = G.game.buildings[construction.building];

					if (construction.owner) {
						if (construction.owner == 'player') {
							if (pointHitBox(Mouse.x + G.camera.x, Mouse.y + G.camera.y, { x: x * G.map.zoom + G.map.zoom - 32, y: y * G.map.zoom, w: 32, h: 32 })) {
								G.game.hover = true;

								sell_price = parseInt(building.cost * construction.level / 1.2);

								sell_text = 'Sell - ' + sell_price + ' gold';

								if (Mouse.down()) {
									G.game.sell('player', x, y, construction, sell_price);
									Mouse.click = false;
								}

								G.game.draw_tooltip(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y - 9, G.ctx.measureText(sell_text).width, 24);

								G.ctx.save();
								G.ctx.translate(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y - 9);

									G.ctx.fillStyle = rgb(0, 0, 0);
									G.ctx.textAlign = 'left';
									G.ctx.font      = 'normal 12px "Arial", serif';
									G.ctx.fillText(sell_text, 5, 16);

								G.ctx.restore();
							}

							if (building.can_upgrade && construction.finish == true) {
								if (pointHitBox(Mouse.x + G.camera.x, Mouse.y + G.camera.y, { x: x * G.map.zoom + G.map.zoom - 32, y: y * G.map.zoom + 32, w: 32, h: 32 })) {
									G.game.hover = true;

									upgrade_cost = parseInt((building.cost) * (1 + (construction.level / 8)));
									upgrade_text = 'Upgrade to level ' + (construction.level + 1) + ' - ' + upgrade_cost + ' gold';

									if (Mouse.down()) {
										G.game.upgrade('player', x, y, construction, building, upgrade_cost);
										Mouse.click = false;
									}

									G.game.draw_tooltip(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y - 9, G.ctx.measureText(upgrade_text).width, 24);

									G.ctx.save();
									G.ctx.translate(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y - 9);

										G.ctx.fillStyle = rgb(0, 0, 0);
										G.ctx.textAlign = 'left';
										G.ctx.font      = 'normal 12px "Arial", serif';
										G.ctx.fillText(upgrade_text, 5, 16);

									G.ctx.restore();
								}
							}

							if (construction.building == G.game.ARENA && construction.finish == true) {
								if (pointHitBox(Mouse.x + G.camera.x, Mouse.y + G.camera.y, { x: x * G.map.zoom + G.map.zoom - 32, y: y * G.map.zoom + 32, w: 32, h: 32 })) {
									G.game.hover = true;

									upgrade_text = 'Generate one solider - ' + G.game.PRICE_SOLIDER + ' foods';

									if (Mouse.down()) {
										G.game.gen_solider('player', x, y, construction, building);
										Mouse.click = false;
									}

									G.game.draw_tooltip(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y - 9, G.ctx.measureText(upgrade_text).width, 24);

									G.ctx.save();
									G.ctx.translate(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y - 9);

										G.ctx.fillStyle = rgb(0, 0, 0);
										G.ctx.textAlign = 'left';
										G.ctx.font      = 'normal 12px "Arial", serif';
										G.ctx.fillText(upgrade_text, 5, 16);

									G.ctx.restore();
								}
							}

							if (construction.building == G.game.STABLE && construction.finish == true) {
								if (pointHitBox(Mouse.x + G.camera.x, Mouse.y + G.camera.y, { x: x * G.map.zoom + G.map.zoom - 32, y: y * G.map.zoom + 32, w: 32, h: 32 })) {
									G.game.hover = true;

									upgrade_text = 'Generate one horse - ' + G.game.PRICE_HORSE + ' foods';

									if (G.game.player.food - G.game.PRICE_HORSE >= 0) {
										if (Mouse.down()) {
											G.game.gen_horse('player', x, y, construction, building);
											Mouse.click = false;
										}
									}

									G.game.draw_tooltip(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y - 9, G.ctx.measureText(upgrade_text).width, 24);

									G.ctx.save();
									G.ctx.translate(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y - 9);

										G.ctx.fillStyle = rgb(0, 0, 0);
										G.ctx.textAlign = 'left';
										G.ctx.font      = 'normal 12px "Arial", serif';
										G.ctx.fillText(upgrade_text, 5, 16);

									G.ctx.restore();
								}
							}

							if (pointHitBox(Mouse.x + G.camera.x, Mouse.y + G.camera.y, { x: x * G.map.zoom, y: y * G.map.zoom, w: G.map.zoom, h: G.map.zoom })) {
								G.game.draw_tooltip(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y + 10, G.ctx.measureText(building.description).width, 52);

								G.ctx.save();
								G.ctx.translate(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y + 10);

									G.ctx.fillStyle = rgb(0, 0, 0);
									G.ctx.textAlign = 'left';
									G.ctx.font      = 'bold 12px "Arial", serif';
									G.ctx.fillText(building.name, 5, 16);
									G.ctx.font      = 'italic 12px "Arial", serif';
									G.ctx.fillText(building.description, 5, 30);
									G.ctx.font      = 'normal 12px "Arial", serif';
									G.ctx.fillText('Life: ' + construction.life + '/' + building.baselife, 5, 44);

								G.ctx.restore();
							}
						}
					}
				}
			}

		G.ctx.restore();
	} else {
		G.ctx.putImageData(G.game.last_image, 0, 0);

		if (G.game.pause) {
			G.ctx.fillStyle = rgb(255, 255, 255);
			G.ctx.font      = 'normal 108px "Times New Roman", serif';
			G.ctx.textAlign = 'center';
			G.ctx.fillText('Pause', G.can.width / 2, G.can.height / 2);
		}
	}
};

G.game.texts = [];

G.game.push_text = function(text, x, y) {
	G.game.texts.push(new G.game.text_type(text, x, y));
};

G.game.text_type = function(text, x, y) {
	this.text    = text;
	this.x       = x;
	this.y       = y;
	this.opacity = 1;

	this.update = function() {
		this.y -= 0.2;
		this.opacity -= 0.02;
	};
};

G.game.entity = function() {
	this.gold     = 2000;
	this.life     = 600;
	this.maxlife  = 600;
	this.food     = 0;
	this.soliders = [];
	this.knights  = [];
};

G.game.enemy  = new G.game.entity();
G.game.player = new G.game.entity();

G.game.hover = false;

G.game.buildings = [
	{	name:          'Bank', // 0
		description:   'Makes a piece of gold (per level) every second',
		cost:          180,
		offsetY:       0,
		time_creation: 15000,
		baselife:      100,
		can_upgrade:   true,
		callback: {
			every:  1000,
			action: 'bank'
		}
	},

	{	name:          'Farm', // 1
		description:   'Generate a food (per level) every second',
		cost:          130,
		offsetY:       100,
		time_creation: 10000,
		baselife:      35,
		can_upgrade:   true,
		callback: {
			every:  1000,
			action: 'farm'
		}
	},

	{	name:          'Arena', // 2
		description:   'Create a solider (per level) when you need',
		cost:          210,
		offsetY:       200,
		time_creation: 9000,
		baselife:      130,
		can_upgrade:   false
	},

	{	name:          'Stable', // 3
		description:   'Create an horse (per level) when you need',
		cost:          220,
		offsetY:       300,
		time_creation: 12000,
		baselife:      100,
		can_upgrade:   false
	}
];

G.game.BANK   = 0;
G.game.FARM   = 1;
G.game.ARENA  = 2;
G.game.STABLE = 3;

G.game.PRICE_SOLIDER = 16;
G.game.PRICE_HORSE   = 10;

G.game.DAMAGE_SOLIDER = 7;
G.game.DAMAGE_KNIGHT  = 16;

G.game.choice_building = 0;

G.game.constructions = [];

G.game.hotkeys = 'QWER';

G.game.teams = ['player', 'enemy'];

G.game.pause      = false;
G.game.last_image = [];

G.game.draw_tooltip = function(x, y, w, h) {
	w += 12;

	G.ctx.save();
	G.ctx.translate(x, y);

	// Haut
	G.ctx.drawImage(G.image.tooltip, 0, 0, 8, 8, 0, 0, 8, 8);
	G.ctx.drawImage(G.image.tooltip, 8, 0, 8, 8, 8, 0, w - 16, 8);
	G.ctx.drawImage(G.image.tooltip, 16, 0, 8, 8, w - 8, 0, 8, 8);

	// Centre
	G.ctx.drawImage(G.image.tooltip, 0, 8, 8, 8, 0, 8, 8, h - 16);
	G.ctx.drawImage(G.image.tooltip, 8, 8, 8, 8, 8, 8, w - 16, h - 16);
	G.ctx.drawImage(G.image.tooltip, 16, 8, 8, 8, w  - 8, 8, 8, h - 16);

	// Bas
	G.ctx.drawImage(G.image.tooltip, 0, 16, 8, 8, 0, h - 8, 8, 8);
	G.ctx.drawImage(G.image.tooltip, 8, 16, 8, 8, 8, h - 8, w - 16, 8);
	G.ctx.drawImage(G.image.tooltip, 16, 16, 8, 8, w - 8, h - 8, 8, 8);

	G.ctx.restore();
};

G.game.callback = {
	bank: function(team, x, y, construction, building) {
		G.game[team].gold += 1 * construction.level;
	},

	farm: function(team, x, y, construction, building) {
		G.game[team].food += 1 * construction.level;
	}
};

G.game.gen_solider = function(team, x, y, construction, building) {
	if (G.game[team].food - G.game.PRICE_SOLIDER >= 0 && construction.finish == true) {
		G.game[team].soliders.push({
			x:      x * G.map.zoom + 76,
			y:      y * G.map.zoom + Math.rand(0, 76),
			line:   y,
			speed:  3 + (Math.random() * 2),
			damage: G.game.DAMAGE_SOLIDER
		});

		G.game[team].food -= G.game.PRICE_SOLIDER;

		if (team == 'player')
			G.game.push_text('-' + G.game.PRICE_SOLIDER + ' foods', x * G.map.zoom + 50, y * G.map.zoom + 20);
	}
};

G.game.gen_horse = function(team, x, y, construction, building) {
	if (G.game[team].food - G.game.PRICE_HORSE >= 0 && construction.finish == true) {
		construction.horses++;
		G.game[team].food -= G.game.PRICE_HORSE;

		if (team == 'player')
			G.game.push_text('-' + G.game.PRICE_HORSE + ' foods', x * G.map.zoom + 50, y * G.map.zoom + 20);
	}
};

G.game.sell = function(team, x, y, construction, price) {
	construction.building = 0;
	construction.owner    = false;
	construction.finish   = 0;
	construction.timer    = 0;
	construction.level    = 1;

	G.game[team].gold += price;

	if (team == 'player')
		G.game.push_text('+' + price + ' golds', x * G.map.zoom + 50, y * G.map.zoom + 20);
};

G.game.upgrade = function(team, x, y, construction, building, cost) {
	if (G.game[team].gold - cost >= 0 && construction.finish == true) {
		construction.level++;
		construction.finish = 0;
		construction.life = building.baselife;

		G.game[team].gold -= cost;

		if (team == 'player')
			G.game.push_text('-' + cost + ' golds', x * G.map.zoom + 50, y * G.map.zoom + 20);
	}
};














G.start = {};

G.start.update = function() {
	G.start.draw();

	if (pointHitBox(Mouse.x, Mouse.y, { x: 160, y: 281, w: 400, h: 32 })) {
		G.start.pointer.y = 281;
		G.game.hover      = true;

		if (Mouse.down()) {
			document.body.style.cursor = 'auto';

			G.timer.cross = 0;

			Mouse.click = false;

			G.game.init();
			G.change_state('game');
		}
	}

	if (pointHitBox(Mouse.x, Mouse.y, { x: 160, y: 331, w: 400, h: 32 })) {
		G.start.pointer.y = 331;
		G.game.hover      = true;

		if (Mouse.down()) {
			document.body.style.cursor = 'auto';

			Mouse.click = false;

			G.change_state('instructions');
		}
	}
};

G.start.draw = function() {
	G.ctx.clear(G.can);

	G.start.pointer.x = 160 + Math.sin(G.timer.cross / 5) * 4;

	G.ctx.drawImage(G.image.start, 0, 0);
	G.ctx.drawImage(G.image.pointers, 100, 33, 32, 32, G.start.pointer.x, G.start.pointer.y, 32, 32);

	if (G.game.hover)
		document.body.style.cursor = 'pointer';
	else
		document.body.style.cursor = 'auto';

	G.game.hover = false;
};

G.start.pointer = {
	x: 0,
	y: 281
};

G.start.hover = false;




















G.instructions = {};

G.instructions.update = function() {
	if (pointHitBox(Mouse.x, Mouse.y, { x: 196, y: 432, w: 248, h: 20 })) {
		G.game.hover = true;

		if (Mouse.down()) {
			document.body.style.cursor = 'auto';

			Mouse.click = false;

			G.change_state('start');
		}
	}

	G.instructions.draw();
};

G.instructions.draw = function() {
	G.ctx.clear(G.can);

	G.ctx.drawImage(G.image.instructions, 0, 0);

	if (G.game.hover)
		document.body.style.cursor = 'pointer';
	else
		document.body.style.cursor = 'auto';

	G.game.hover = false;
};

G.instructions.hover = false;
























G.victory = {};

G.victory.update = function() {
	G.victory.draw();

	if (pointHitBox(Mouse.x, Mouse.y, { x: 259, y: 412, w: 122, h: 30 })) {
		G.game.hover = true;

		if (Mouse.down()) {
			window.location.reload();
		}
	}

	if (G.game.hover)
		document.body.style.cursor = 'pointer';
	else
		document.body.style.cursor = 'auto';

	G.game.hover = false;
};

G.victory.draw = function() {
	G.ctx.clear(G.can);

	G.ctx.drawImage(G.image.victory, 0, 0);
};

G.victory.hover = false;


























G.defeat = {};

G.defeat.update = function() {
	G.defeat.draw();

	if (pointHitBox(Mouse.x, Mouse.y, { x: 259, y: 412, w: 122, h: 30 })) {
		G.game.hover = true;

		if (Mouse.down()) {
			window.location.reload();
		}
	}

	if (G.game.hover)
		document.body.style.cursor = 'pointer';
	else
		document.body.style.cursor = 'auto';

	G.game.hover = false;
};

G.defeat.draw = function() {
	G.ctx.clear(G.can);

	G.ctx.drawImage(G.image.defeat, 0, 0);
};

G.defeat.hover = false;











G.init();
