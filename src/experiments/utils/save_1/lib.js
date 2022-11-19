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
var Key = {
	TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17,
	ALT: 18, ESC : 27, SPACE: 32,

	LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40,

	A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77,
	N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,

	NUM0: 48, NUM1: 49, NUM2: 50, NUM3: 51, NUM4: 52,
	NUM5: 53, NUM6: 54, NUM7: 55, NUM8: 56, NUM9: 57,

	NUMPAD0: 96,  NUMPAD1: 97,  NUMPAD2: 98,  NUMPAD3: 99,  NUMPAD4: 100,
	NUMPAD5: 101, NUMPAD6: 102, NUMPAD7: 103, NUMPAD8: 104, NUMPAD9: 105,

	ADD: 107, SUB: 109, MUL: 106, DIV: 111,

	CAPSLOCK: 20, PAGEUP: 33, PAGEDOWN: 34, END    : 35,
	HOME    : 36, INSERT: 45, DELETE  : 46, NUMLOCK: 144,

	BACKSPACE: 8
};

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

	this.up = function() {
		var ret = false;

		for (var i = 0 ; i < arguments.length ; i++) {
			ret |= this.keys[arguments[i]] == null;
		}

		return ret;
	};

	this.down = function() {
		var ret = false;

		for (var i = 0 ; i < arguments.length ; i++) {
			ret |= this.keys[arguments[i]] != null;
		}

		return ret;
	};

	this.press = function() {
		var ret = false;

		for (var i = 0 ; i < arguments.length ; i++) {
			ret |= this.keys[arguments[i]] == this.ktime;
		}

		return ret;
	};

	this.get_downs = function() {
		return this.keys;
	};
}

/*# ------ #*/
/*# Souris #*/
/*# ------ #*/
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
