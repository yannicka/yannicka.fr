(function() {

/* Petite librairie
-------------------- */
function Mouse(el) {
	this.x     = 0;
	this.y     = 0;
	this.click = null;
	this.mtime = 0;
	this.el    = el;
	this.end   = null;

	this.update = function() {
		this.mtime++;
	};

	this.onmouseup = function(self) {
		return function(e) {
			self.end = self.mtime;

			self.click = null;
		};
	}(this);

	this.onmousedown = function(self) {
		return function(e) {
			self.onmousemove(e);

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

	this.release = function() {
		return this.end == this.mtime;
	};
}

/* Variables
------------- */
var can, ctx, // zone de dessin
	mouse, // actions utilisateurs
	points, historical, after, img, image_data, // données du dessin
	color, diameter, // informations sélectionnées
	btn_undo, btn_redo, btn_clear, btns_colors, btns_sizes; // zones HTML

/* Création de l'application
----------------------------- */
function create() {
	// Création de la zone de dessin
	can = document.getElementById('drawzone');
	can.width  = 300;
	can.height = 250;

	ctx = can.getContext('2d');
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';

	// Création de la souris
	mouse = new Mouse(can);
	can.addEventListener('mousedown', mouse.onmousedown);
	document.addEventListener('mousemove', mouse.onmousemove);
	document.addEventListener('mouseup', mouse.onmouseup);
	can.addEventListener('touchstart', mouse.onmousedown);
	document.addEventListener('touchmove', mouse.onmousemove);
	document.addEventListener('touchend', mouse.onmouseup);

	// Aucun point dessiné
	points = [];

	// Aucun historique
	historical = [];
	after = [];

	// Image de fond
	img = ctx.createImageData(can.width, can.height);

	// Zones HTML
	btn_undo     = document.getElementById('btn_undo');
	btn_redo     = document.getElementById('btn_redo');
	btn_clear    = document.getElementById('btn_clear');
	btns_colors  = document.querySelectorAll('#tool_colors li');
	btns_sizes   = document.querySelectorAll('#tool_sizes a');

	// Informations du tracé
	color    = 'rgb(0, 0, 0)';
	diameter = 13;

	// Clic "Annuler"
	btn_undo.onclick = function() {
		if (historical.length > 0) {
			after.push(historical.pop());
			var new_img = historical.pop();

			img = new_img;

			if (new_img)
				historical.push(img);
		}

		return false;
	};

	// Clic "Répéter"
	btn_redo.onclick = function() {
		if (after.length > 0)
			historical.push(img = after.pop());

		return false;
	};

	// Clic "Effacer tout"
	btn_clear.onclick = function() {
		ctx.fillStyle = 'rgb(255, 255, 255)';
		ctx.fillRect(0, 0, can.width, can.height);
		image_data = ctx.getImageData(0, 0, can.width, can.height);
		historical.push(image_data);
		img = image_data;
	};

	// Changement de la couleur
	for (var i = 0, len = btns_colors.length ; i < len ; i++) {
		btns_colors[i].onclick = function() {
			for (var i = 0, len = btns_colors.length ; i < len ; i++) {
				btns_colors[i].classList.remove('active');
			};

			this.classList.add('active');
			color = this.getAttribute('data-color');
		};
	}

	// Changement du diamètre
	for (var i = 0, len = btns_sizes.length ; i < len ; i++) {
		btns_sizes[i].onclick = function() {
			for (var i = 0, len = btns_sizes.length ; i < len ; i++) {
				btns_sizes[i].classList.remove('active');
			};

			this.classList.add('active');
			diameter = this.getAttribute('data-size');
		};
	}

	update();
}

/* Mise à jour
--------------- */
function update() {
	if (mouse.down()) {
		points.push({
			x: mouse.x - 1,
			y: mouse.y - 1,
			diameter: diameter,
			color: color
		});
	}

	if (mouse.release()) {
		inside = false;

		for (var i = 0, len = points.length, point ; i < len ; i++) {
			point = points[i];

			if (point.x > 0 && point.x < can.width && point.y > 0 && point.y < can.height) {
				inside = true;
				break;
			}
		}

		if (inside) {
			image_data = ctx.getImageData(0, 0, can.width, can.height);
			historical.push(image_data);
			img = image_data;

			after = [];
			points = [];
		}
	}

	draw();

	mouse.update();

	requestAnimationFrame(update);
}

/* Affichage du dessin
----------------------- */
function draw() {
	ctx.fillStyle = 'rgb(255, 255, 255)';
	ctx.fillRect(0, 0, can.width, can.height);

	if (img)
		ctx.putImageData(img, 0, 0);

	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.strokeStyle = color;
	ctx.beginPath();

	for (var i = 0, len = points.length, point ; i < len ; i++) {
		point = points[i];

		ctx.lineWidth = point.diameter;

		if (i == 0)
			ctx.moveTo(point.x, point.y);
		else
			ctx.lineTo(point.x, point.y);
	}

	ctx.stroke();
}

// Lancement de l'application
create();

})();
