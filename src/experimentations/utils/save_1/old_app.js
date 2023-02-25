(function() {

var app = {};

app.init = function() {
	app.can = document.getElementById('app');
	app.ctx = app.can.getContext('2d');

	app.can.width  = window.innerWidth;
	app.can.height = window.innerHeight;

	// Fenêtres
	app.windows = [];
	app.windows.push(new Window(50, 50, 200, 200, 'Salut'));
	app.windows.push(new Window(280, 60, 300, 200, 'Hello :D'));
	app.windows.push(new Window(120, 120, 300, 200, 'Hihi'));

	app.last_focus = undefined;

	// Zone de saisie bloc-notes
	app.notepad = new Input(20, 20, 100, 20);

	// Souris
	app.mouse = new Mouse(app.can);
	document.onmouseup = app.mouse.onmouseup;
	document.onmousedown = app.mouse.onmousedown;
	document.onmousemove = app.mouse.onmousemove;

	// Clavier
	app.keyboard = new Keyboard(app.ctx);
	document.onkeyup = app.keyboard.onkeyup;
	document.onkeydown = app.keyboard.onkeydown;

	app.create();
};

app.create = function() {
	app.update();
};

app.update = function() {
	var can = app.can,
		mouse = app.mouse,
		windows = app.windows,
		keyboard = app.keyboard;

	windows.sort(function(a, b) {
		return a.last_drag >= b.last_drag ? -1 : 1;
	});

	for (var i = 0 ; i < windows.length ; i++) {
		windows[i].update();
	}

	app.notepad.update();

	app.draw();

	mouse.update();
	keyboard.update();

	requestAnimationFrame(app.update);
};

app.draw = function() {
	var can = app.can,
		ctx = app.ctx,
		windows = app.windows;

	ctx.clearRect(0, 0, can.width, can.height);

	ctx.fillStyle = 'rgb(240, 240, 240)';
	ctx.fillRect(0, 0, can.width, can.height);

	for (var i = 0 ; i < windows.length ; i++) {
		windows[i].draw();
	}

	app.notepad.draw();
};




var EventDispatcher = Class.extend({
	init: function() {
		this.events = {};
	},

	on: function(type, listener) {
		this.events[type] = listener;
	},

	off: function(type) {
		delete this.events;
	},

	hasEventListener: function(type) {
		return this.events[type] != 'undefined';
	}
});



var DisplayObject = Class.extend({
	init: function(x, y, width, height, options) {
		options = options || {};

		// Position
		this.x = x || 0;
		this.y = y || 0;

		// Taille
		this.width  = width  || 100;
		this.height = height || 100;

		// Etats
		this.enabled = true;
		this.focus   = false;

		// Informations
		this.cursor = options.cursor || 0;
		this.time   = options.time   || 0;
		this.parent = options.parent || undefined;
	}
});



var Window = DisplayObject.extend({
	init: function(x, y, width, height, title, options) {
		this._super(x, y, width, height, options);

		// Titre
		this.title = title || 'Window title';

		// Couleurs
		this.top_color_fill      = 'rgb(220, 220, 220)';
		this.window_color_fill   = 'rgb(244, 244, 244)';
		this.window_color_shadow = 'rgb(164, 164, 164)';
		this.title_color_fill    = 'rgb(64, 64, 64)';

		// Informations
		this.last_drag = Window.id++;
	},

	update: function() {
		var mouse = app.mouse;

		if (mouse.x > this.x && mouse.y > this.y && mouse.x < this.x + this.width && mouse.y < this.y + 20) {
			if (mouse.press()) {
				if (app.last_focus == this) {
					this.last_drag = 0;
				}

				app.last_focus = this;

				this.drag = {
					dist_x: mouse.x - this.x,
					dist_y: mouse.y - this.y,
				};
			} else if (mouse.up()) {
				this.drag = undefined;
			}
		}

		if (mouse.x > this.x && mouse.y > this.y && mouse.x < this.x + this.width && mouse.y < this.y + this.height) {
			if (mouse.press()) {
				app.last_focus = this;
				this.last_drag = 0;
			}
		}

		if (typeof this.drag != 'undefined' && app.last_focus == this) {
			this.x = mouse.x - this.drag.dist_x;
			this.y = mouse.y - this.drag.dist_y;
		}

		this.last_drag++;
	},

	draw: function() {
		var can = app.can,
			ctx = app.ctx;

		ctx.save();

		ctx.fillStyle = this.window_color_fill;
		ctx.shadowColor = this.window_color_shadow;
		ctx.shadowBlur = 20;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.fillRect(this.x, this.y, this.width, Math.clamp(this.height, 20, 10000));

		ctx.restore();

		ctx.fillStyle = this.top_color_fill;
		ctx.fillRect(this.x, this.y, this.width, 20);

		ctx.fillStyle = this.title_color_fill;
		ctx.font = 'normal 16px Consolas';
		ctx.fillText(this.title, this.x + 4, this.y + 15);
	}
});

Window.id = 0;

var Input = DisplayObject.extend({
	init: function(x, y, width, height, text, options) {
		this._super(x, y, width, height, options);

		options = options || {};

		this.text = options.text   || 'salut les amis <3';
	},

	update: function() {
		var mouse = app.mouse,
			keyboard = app.keyboard;

		if (mouse.x > this.x && mouse.y > this.y && mouse.x < this.x + this.width && mouse.y < this.y + 20) {
			if (mouse.press()) {
				app.last_focus = this;
				this.focus = true;
				this.cursor = Math.round((mouse.x - this.x) / 9);
				this.time = 0;
			}
		}

		if (keyboard.press(Key.LEFT)) {
			this.cursor--;
			this.time = 0;
			return;
		} else if (keyboard.press(Key.RIGHT)) {
			this.cursor++;
			this.time = 0;
			return;
		}

		if (this.is_focus()) {
			if (keyboard.press(Key.BACKSPACE)) {
				var new_text = '';

				for (var i = 0 ; i < Math.clamp(this.cursor - 1, 0, this.text.length) ; i++) {
					new_text += this.text[i];
				}

				for (i = this.cursor + 1 ; i < this.text.length + 1 ; i++) {
					new_text += this.text[i - 1];
				}

				this.text = new_text;
				this.cursor--;
				this.time = 0;
				return;
			}
			var key_downs = keyboard.get_downs();
			var a = [];

			for (var i in key_downs) {
				if (key_downs[i] != null)
					a.push(i);
			}

			if (a.length > 0) {
				var new_text = '';

				for (var i = 0 ; i < Math.clamp(this.cursor, 0, this.text.length) ; i++) {
					new_text += this.text[i];
				}

				new_text += String.fromCharCode(a[0]);

				for (i = this.cursor + 1 ; i < this.text.length + 1 ; i++) {
					if (i != 0)
						new_text += this.text[i - 1];
				}

				this.text = new_text;
				this.cursor++;
				this.time = 0;
			}

		}

		this.cursor = Math.clamp(this.cursor, 0, this.text.length);

		this.time++;
	},

	draw: function() {
		var ctx = app.ctx;

		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = 'rgb(255, 255, 255)';
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'rgb(0, 0, 0)';
		ctx.stroke();
		ctx.closePath();

		ctx.fillStyle = 'rgb(64, 64, 64)'
		ctx.font = 'normal 16px Consolas';

		var text = '';

		for (var i = 0 ; i < this.text.length ; i++) {
			var width = ctx.measureText(text).width;

			if (width > this.width) {
				break;
			}

			text += this.text[i];
		}

		ctx.fillText(text, this.x + 4, this.y + 15);

		if (this.is_focus() && this.time % 60 < 30) {
			ctx.fillStyle = 'rgb(0, 0, 0)';
			ctx.fillRect(this.x + (9 * this.cursor) + 2, this.y, 2, this.height);
		}
	},

	is_focus: function() {
		return app.last_focus == this;
	}
});

/*
	// checkbox
	ctx.beginPath();
	ctx.rect(70, 100, 20, 20);
	ctx.fillStyle = 'rgb(255, 255, 255)';
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'rgb(0, 0, 0)';
	ctx.stroke();
	ctx.closePath();

	// radio
	ctx.beginPath();
	ctx.arc(50, 110, 10, 0, 2 * Math.PI, false);
	ctx.fillStyle = 'rgb(255, 255, 255)';
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'rgb(0, 0, 0)';
	ctx.stroke();
	ctx.closePath();

	// textarea
	ctx.beginPath();
	ctx.rect(100, 130, 200, 200);
	ctx.fillStyle = 'rgb(255, 255, 255)';
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'rgb(0, 0, 0)';
	ctx.stroke();
	ctx.closePath();

	// button
	ctx.beginPath();
	ctx.rect(310, 100, 80, 20);
	ctx.fillStyle = 'rgb(255, 255, 255)';
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'rgb(0, 0, 0)';
	ctx.stroke();
	ctx.closePath();
*/

app.init();

})();
