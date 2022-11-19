(function() {

var app = {};

app.init = function() {
	// Récupération du DOM de l'application
	this.dom = document.getElementById('app');

	// Fenêtres
	this.b1 = new Window(50, 50, 200, 200, 'Blocnotes');
	this.b2 = new Window(80, 150, 200, 250, 'B2');
	this.b3 = new Window(200, 120, 250, 200, 'B3');

	console.log(this.b3.dom.onmousedown);
};

var Window = function(x, y, width, height, title) {
	// Position
	this.x = x || 0;
	this.y = y || 0;

	// Taille
	this.width  = width || 100;
	this.height = height || 100;

	// Titre
	this.title = title || 'Window title';

	// Identifiant
	this.id = 'window' + Window.id++;

	// Ajout au DOM
	app.dom.innerHTML += '' +
		'<div class="window" id="' + this.id + '">' +
			'<div class="title">' +
				this.title +
			'</div>' +

			'<div class="content">' +
				'<textarea></textarea>' +
			'</div>' +

			'<div class="infos">' +
				'<div class="resizer"></div>' +
			'</div>' +
		'</div>';

	// Récupération de l'élément du DOM
	this.dom = document.getElementById(this.id);
	this.dom.style.position = 'absolute';

	this.set_position(this.x, this.y);
	this.set_size(this.width, this.height);

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
			self.resize = {
				dist_x: e.pageX,
				dist_y: e.pageY,
				init_w: self.width,
				init_h: self.height
			};
		}

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
	this.width  = width;
	this.height = height;

	this.dom.style.width  = this.width + 'px';
	this.dom.style.height = this.height + 'px';
};

app.init();

})();
