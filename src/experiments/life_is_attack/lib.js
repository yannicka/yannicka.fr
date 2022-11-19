(function() {
	function Mouse(el) {
		this.init = function() {
			this.x     = 0;
			this.y     = 0;
			this.click = null;
			this.mtime = 0;
			this.el    = el;
			this.loose = null;

			document.addEventListener('mousedown', this.onmousedown, false);
			document.addEventListener('mousemove', this.onmousemove, false);
			document.addEventListener('mouseup', this.onmouseup, false);
		};

		var self = this;

		this.update = function() {
			this.mtime++;
		};

		this.onmouseup = function(e) {
			self.loose = self.mtime;

			self.click = null;
		};

		this.onmousedown = function(e) {
			self.onmousemove(e);

			self.click = self.mtime;
		};

		this.onmousemove = function(e) {
			var el = typeof self.el != undefined ? self.el : null;

			self.x = e.pageX - (el != null ? el.offsetLeft : 0);
			self.y = e.pageY - (el != null ? el.offsetTop : 0);
		};

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
			return this.loose == this.mtime;
		};

		this.init();
	}

	function Finger(el) {
		this.init = function() {
			this.x     = 0;
			this.y     = 0;
			this.click = null;
			this.mtime = 0;
			this.el    = el;
			this.loose = null;

			document.addEventListener('touchstart', this.ontouchstart, false);
			document.addEventListener('touchmove', this.ontouchmove, false);
			document.addEventListener('touchend', this.ontouchend, false);
		};

		var self = this;

		this.update = function() {
			this.mtime++;
		};

		this.ontouchend = function(e) {
			self.loose = self.mtime;

			self.click = null;
		};

		this.ontouchstart = function(e) {
			self.ontouchmove(e);

			self.click = self.mtime;
		};

		this.ontouchmove = function(e) {
			var el = typeof self.el != undefined ? self.el : null;

			self.x = e.changedTouches[0].pageX - (el != null ? el.offsetLeft : 0);
			self.y = e.changedTouches[0].pageY - (el != null ? el.offsetTop : 0);
		};

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
			return this.loose == this.mtime;
		};

		this.init();
	}

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

	function Keyboard() {
		this.init = function() {
			this.keys  = [];
			this.last  = 0;
			this.ktime = 0;

			document.addEventListener('keydown', this.onkeydown, false);
			document.addEventListener('keyup', this.onkeyup, false);
		};

		var self = this;

		this.update = function() {
			this.ktime++;
		};

		this.onkeyup = function(e) {
			self.keys[e.keyCode] = null;
		};

		this.onkeydown = function(e) {
			self.keys[e.keyCode] = self.ktime;
		};

		this.up = function(k) {
			return this.keys[k] == null;
		};

		this.down = function(k) {
			return this.keys[k] != null;
		};

		this.press = function(k) {
			return this.keys[k] == this.ktime;
		};

		this.init();
	}

	function Stopwatch() {
		this.dt = 0;
		this.last = Date.now();
		this.time = 0;
		 
		this.update = function() {
			this.dt = Date.now() - this.last;
			this.last = Date.now();
			this.time += this.dt;
		};
	}

	function preload_images(images, callback) {
		var nb_images_loaded = 0,
		nb_images_to_load = Object.keys(images).length,
		image_loaded = [],
		i = null;

		var image_loaded = function() {
			nb_images_loaded++;
		}

		for (i in images) {
			image_loaded[i] = new Image();
			image_loaded[i].onload = image_loaded;
			image_loaded[i].src = images[i];
		}

		var preload = function () {
			if (nb_images_loaded == nb_images_to_load) {
				callback();
			} else {
				setTimeout(preload, 100);
			}
		}

		preload();

		return image_loaded;
	}

	function box_hit_circle(box, circle) {
		var half_width = box.width / 2;
		var half_height = box.height / 2;

		var cx = Math.abs(circle.x - box.x - half_width);
		var xDist = half_width + circle.r;

		if (cx > xDist)
			return false;

		var cy = Math.abs(circle.y - box.y - half_height);
		var yDist = half_height + circle.r;

		if (cy > yDist)
			return false;

		if (cx <= half_width || cy <= half_height)
			return true;

		var xCornerDist = cx - half_width;
		var yCornerDist = cy - half_height;
		var xCornerDistSq = xCornerDist * xCornerDist;
		var yCornerDistSq = yCornerDist * yCornerDist;
		var maxCornerDistSq = circle.r * circle.r;

		return xCornerDistSq + yCornerDistSq <= maxCornerDistSq;
	}

	function rgb(r, g, b, a) {
		if (typeof a == 'undefined')
			return 'rgb(' + r + ', ' + g + ', ' + b + ')';
		else
			return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
	}

	function box_hit_box(box1, box2) {
		if (
			box2.x >= box1.x + box1.width
			|| box2.x + box2.width <= box1.x
			|| box2.y >= box1.y + box1.height
			|| box2.y + box2.height <= box1.y
		) {
			return false;
		} else {
			return true;
		}
	}

	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = (function() {
			return window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function(callback, element) {
				window.setTimeout(callback, 1000 / 60);
			};
		})();
	}

	Math.rand = function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	Math.clamp = function(min, val, max) {
		return Math.max(min, Math.min(max, val));
	};

	window.Mouse = Mouse;
	window.Finger = Finger;
	window.Key = Key;
	window.Keyboard = Keyboard;
	window.Stopwatch = Stopwatch;
	window.preload_images = preload_images;
	window.box_hit_circle = box_hit_circle;
	window.box_hit_box = box_hit_box;
	window.rgb = rgb;
})();
