/*#--------------------------#*/
/*# CanvasRenderingContext2D #*/
/*#--------------------------#*/
	/** TODO : Name & Code & Test
	 * Récupère le bout d'une image à afficher
	 *
	 * @param img {Image} Image à couper
	 * @param width {int} Taille en largeur à couper
	 * @param height {int} Taille en hauteur à couper
	 * @param x {number} Position x à laquelle l'image sera affichée
	 * @param y {number} Position y à laquelle l'image sera affichée
	 * @param draw {bool} Si true, affiche l'image, sinon renvoie les données calculées
	 *
	 * @return {void|Object} Les données calculées si draw est sur false, sinon rien
	 */
	CanvasRenderingContext2D.prototype.draw_image_index = function(img, width, height, index, x, y, draw) {
		draw = typeof draw == 'undefined' ? true : draw;

		var nbtiles = Math.ceil(img.width / (width + 1));

		var basex = index % nbtiles;
		basex = basex * width + basex;

		var basey = Math.floor(index / nbtiles);
		basey = basey * height + basey;

		if (draw) {
			this.drawImage(img, basex, basey, width, height, x, y, width, height);
		} else {
			return {
				nbtiles: nbtiles,
				basex: basex,
				basey: basey
			};
		}
	};

	/** TODO : Name & Code & Test
	 * Récupère les couleurs d'une image passée en paramètre
	 *
	 * @param img {Image} Image dont on veut récupérer les couleurs dans un tableau 2D
	 *
	 * @return {Array} Tableau 2D de l'image contenant les couleurs de chaque cellules
	 */
	CanvasRenderingContext2D.prototype.get2darray_image = function(img) {
		this.save();

		this.drawImage(img, 0, 0);

		list_pixels = this.getImageData(0, 0, img.width, img.height).data;

		var map = [];

		for (var i = 0 ; i < list_pixels.length ; i += 4) {
			var r = list_pixels[i + 0];
			var g = list_pixels[i + 1];
			var b = list_pixels[i + 2];
			var a = list_pixels[i + 3];

			var x = Math.floor((i / 4) % img.width);  
			var y = Math.floor(((i - x) / 4) / img.width);

			map[x] ? (map[x][y] = [r, g, b, a]) : (map[x] = [[r, g, b, a]]);
		}

		this.restore();

		return map;
	};

	/** TODO Name & Code & Test
	 * Affiche un texte sur plusieurs lignes
	 *
	 * @param text {string} Texte à afficher
	 * @param x {number} Position x du texte à afficher
	 * @param y {number} Position y du texte à afficher
	 * @param lineHeight {number}  Taille d'une ligne
	 *
	 * @return {void} Rien
	 */
	CanvasRenderingContext2D.prototype.fill_wrap_text = function(text, x, y, maxWidth, lineHeight) {
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
	};

/*# ------ #*/
/*# Object #*/
/*# ------ #*/
	Object.prototype.clone = function() {
		return JSON.parse(JSON.stringify(this));
	};

/*# ----- #*/
/*# Maths #*/
/*# ----- #*/
	//# retourne un nombre entre les extrémités de min et max
	Math.clamp = function(val, min, max) {
		return Math.max(min, Math.min(max, val));
	};

/*# ------- #*/
/*# Clavier #*/
/*# ------- #*/
	/**
	 * Liste les valeurs des touches
	 */
	var Key = {
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
		HOME    : 36, ISERT : 45, DELETE  : 46, NUMLOCK: 144
	};

	/*
	 * Créer un nouvel élément Keyboard
	 */
	function Keyboard() {
		this.keys  = [];
		this.last  = 0;
		this.ktime = 0;

		this.update = function() {
			this.ktime++;
		};

		this.onkeyup = function(self) {
			return function(e) {
				self.keys[e.keyCode] = null;
			};
		}(this);

		this.onkeydown = function(self) {
			return function(e) {
				self.keys[e.keyCode] = self.ktime;
			};
		}(this);

		this.up = function(k) {
			return this.keys[k] == null;
		};

		this.down = function(k) {
			return this.keys[k] != null;
		};

		this.press = function(k) {
			return this.keys[k] == this.ktime;
		};
	}

/*# ------ #*/
/*# Souris #*/
/*# ------ #*/
	/**
	 * Créer un nouvel élément Mouse
	 */
	function Mouse(el) {
		this.x     = 0;
		this.y     = 0;
		this.click = null;
		this.mtime = 0;
		this.el    = el;

		this.update = function() {
			this.mtime++;
		};

		this.onmouseup = function(self) {
			return function(e) {
				self.click = null;
			};
		}(this);

		this.onmousedown = function(self) {
			return function(e) {
				self.click = self.mtime;
			};
		}(this);

		this.onmousemove = function(self) {
			return function(e) {
				var el = typeof self.el != undefined ? self.el : null;

				self.x = e.pageX - (el != null ? el.offsetLeft : 0);
				self.y = e.pageY - (el != null ? el.offsetTop : 0);
			};
		}(this);

		this.up = function() {
			return this.click == null;
		};

		this.down = function() {
			return this.click != null;
		};

		this.press = function() {
			return this.click == this.mtime;
		};
	}

/*# ---------------- #*/
/*# Gestion du temps #*/
/*# ---------------- #*/
	// minuteur
	function Timer() {
		// todo
	}

	// chronomètre
	function Stopwatch() {
		this.dt   = 0;
		this.last = Date.now();
		this.time = 0;

		this.update = function() {
			this.dt    = Date.now() - this.last;
			this.last  = Date.now();
			this.time += this.dt;
		};
	}

	function Animation() {

	}

/*# --------------#*/
/*# Préchargement #*/
/*# ------------- #*/
	//# todo name
	//# permet de gérer le préchargement d'images
	function Preload(images, image, callback) {
		var nbImgsLoaded = 0;
		var nbImgsToLoad = Object.keys(images).length;
		var i            = null;

		function imgLoaded() {
			nbImgsLoaded += 1;
		}

		for (i in images) {
			image[i] = new Image();
			image[i].onload = imgLoaded;
			image[i].src = images[i];
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

	/* TODO : Code pour animation de sprite */
	/* TODO : Code pour boîte de dialogue */
	/* TODO : Code pour texte s'affichant lettre par lettre */
