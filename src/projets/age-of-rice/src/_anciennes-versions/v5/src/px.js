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
