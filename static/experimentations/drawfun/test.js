function Mouse(el) {
	this.x     = 0;
	this.y     = 0;
	this.click = null;
	this.mtime = 0;
	this.el    = el;
	this.loose = null;

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
}

/* Utilisation
--------------- */
var mouse = new Mouse();
document.onmousedown = mouse.onmousedown;
document.onmousemove = mouse.onmousemove;
document.onmouseup   = mouse.onmouseup;

function update() {
	if (mouse.press()) {
		console.log('PRESS : ' + mouse.x + ' ; ' + mouse.y);
	}

	if (mouse.down()) {
		console.log('DOWN : ' + mouse.x + ' ; ' + mouse.y);
	}

	if (mouse.release()) {
		console.log('RELEASE : ' + mouse.x + ' ; ' + mouse.y);
	}

	if (mouse.up()) {
		console.log('UP : ' + mouse.x + ' ; ' + mouse.y);
	}

	// Tout à la fin
	mouse.update();

	requestAnimationFrame(update);
}

update();
