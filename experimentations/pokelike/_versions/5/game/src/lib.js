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
	window.requestAnimationFrame = (function() {
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
	Math.degToRad = function(deg) {
		return deg * Math.PI180;
	};

	//# arrondi un clamp
	Math.roundClamp = function(val, min, max) {
		return Math.round(Math.clamp(val, min, max));
	};

/*# ------ #*/
/*# Object #*/
/*# ------ #*/
	//# donne la taille d'un objet
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
	Array.prototype.inarray = function(element) {
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

/*# ----- #*/
/*# Color #*/
/*# ----- #*/
	//# converti un r,g,b en une châine de caractères
	function rgb(r, g, b, a) {
		return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (typeof a == 'undefined' ? 1 : a) + ')';
	}

	//# converti un RGB en Hexadecimal
	function rgb_to_str_hex(r, g, b) {
		return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}

	//# converti un RGB en Hexadecimal
	function rgb_to_hex(r, g, b) {
		// alert(((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1));
		return parseInt(((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1), 16);
	}

	function hex_to_rgb(hex) {
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
			hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});

		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}

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

	//# todo name
	//# permet de gérer un timer
	function TimerManager() {
		this.dt   = 0;
		this.last = Date.now();
		this.time = 0;

		this.update = function() {
			this.dt   = Date.now() - this.last;
			this.last = Date.now();
			this.time += this.dt;
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
