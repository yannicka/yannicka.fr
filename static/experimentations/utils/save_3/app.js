(function() {

var app = {};

app.init = function() {
	// Récupération du DOM de l'application
	this.dom = document.getElementById('app');

	// Fenêtres
	this.b1 = new Window(5, 5, 150, 150, 'Blocnotesestvraimentsuper');
	this.b2 = new Window(160, 5, 150, 150, 'B2');
	this.b3 = new Window(315, 5, 150, 150, 'B3');
};

var Window = function(x, y, width, height, title) {
	// Position de la fenêtre (x ; y)
	this.x = x || 0;
	this.y = y || 0;

	// Taille de la fenêtre (largeur ; hauteur)
	this.width  = width || 100;
	this.height = height || 100;

	// Titre de la fenêtre
	this.title = title || 'Window title';

	// Définition de l'identifiant (unique) de la fenêtre
	this.id = 'window' + Window.id++;

	// Création de la fenêtre et ajout au DOM
	this.dom = document.createElement('div');
	this.dom.className = 'window';
	this.dom.id = this.id;

	this.dom.innerHTML = '' +
		'<div class="title">' +
			this.title +
		'</div>' +

		'<div class="content">' +
			'<textarea></textarea>' +
		'</div>' +

		'<div class="infos">' +
			'<div class="resizer"></div>' +
			'<div class="configs"></div>' +
		'</div>';

	app.dom.appendChild(this.dom);

	// Définition de la position de la fenêtre dans le DOM (x ; y)
	this.set_position(this.x, this.y);

	// Définition de la taille de la fenêtre dans le DOM (hauteur ; largeur)
	this.set_size(this.width, this.height);

	// Définition de la profondeur de la fenêtre (au-dessus de toute les autres)
	this.dom.style.zIndex = Window.zIndex++;

	// Déplacement et redimensionnement de la fenêtre avec la souris
	this.drag   = undefined;
	this.resize = undefined;
	var self = this;

	this.dom.onmousedown = function(e) {
		// Glisser
		if (e.pageX > self.x &&
			e.pageY > self.y &&
			e.pageX < self.x + self.width &&
			e.pageY < self.y + 25
		) {
			self.drag = {
				dist_x: e.pageX - self.x,
				dist_y: e.pageY - self.y
			};
		}

		// Redimensionner
		if (e.pageX > self.x + self.width - 16 &&
			e.pageX < self.x + self.width &&
			e.pageY > self.y + self.height - 16 &&
			e.pageY < self.y + self.height
		) {
			// On garde en mémoire la position de la souris et la taille de la fenêtre
			self.resize = {
				dist_x: e.pageX,
				dist_y: e.pageY,
				init_w: self.width,
				init_h: self.height
			};
		}

		// On affiche la fenêtre voulue au premier plan
		self.dom.style.zIndex = ++Window.zIndex;
	};

	this.dom.onmouseup = function() {
		self.drag   = undefined;
		self.resize = undefined;
	};

	this.dom.onmousemove = function(e) {
		if (typeof self.drag != 'undefined') {
			self.set_position(
				e.pageX - self.drag.dist_x,
				e.pageY - self.drag.dist_y
			);
		}

		if (typeof self.resize != 'undefined') {
			self.set_size(
				e.pageX - self.resize.dist_x + self.resize.init_w,
				e.pageY - self.resize.dist_y + self.resize.init_h
			);
		}
	};
};

Window.id = 0;
Window.zIndex = 0;

Window.prototype.set_position = function(x, y) {
	this.x = x;
	this.y = y;

	this.dom.style.left = this.x + 'px';
	this.dom.style.top  = this.y + 'px';
};

Window.prototype.set_size = function(width, height) {
	this.width  = Math.max(150, width);
	this.height = Math.max(150, height);

	this.dom.style.width  = this.width + 'px';
	this.dom.style.height = this.height + 'px';
};

app.init();

})();
