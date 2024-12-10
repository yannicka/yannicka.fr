"use strict";

/* Liste des variables */
	var can, ctx, maskCan, maskCtx, listPixels, camera,
		player, shots, pointer,
		time,
		AAA, BBB,
		zombies, CCC, canTouch, zombiesSpawns,
		image, images, nbImgsLoaded, nbImgsToLoaded,
		i,
		Key, Mouse,
		zoom;

/* Canvas et Context */
	can = document.getElementById('game');
	ctx = can.getContext('2d');

/* Boucle de jeu */
	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame    || window.webkitRequestAnimationFrame ||
			   window.mozRequestAnimationFrame || window.oRequestAnimationFrame      ||
			   window.msRequestAnimationFrame  || function(callback) { window.setTimeout(callback, 1000 / 60); };
	})();

/* Contrôle du clavier */
	Key = {
		keys: [], lasts: [],

		TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,
		LEFT:37,UP:38,RIGHT:39,DOWN:40,
		A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,
		NUM0:48,NUM1:49,NUM2:50,NUM3:51,NUM4:52,NUM5:53,NUM6:54,NUM7:55,NUM8:56,NUM9:57,
		NUMPAD0:96,NUMPAD1:97,NUMPAD2:98,NUMPAD3:99,NUMPAD4:100,NUMPAD5:101,NUMPAD6:102,NUMPAD7:103,NUMPAD8:104,NUMPAD9:105,
		ADD:107,SUB:109,MUL:106,DIV:111,
		CAPSLOCK:20,PAGEUP:33,PAGEDOWN:34,END:35,HOME:36,ISERT:45,DELETE:46,NUMLOCK:144,

		up: function(k)      { return !Key.keys[k]; }, down: function(k) { return Key.keys[k]; },
		press: function(k)   { var v = Key.keys[k]; Key.keys[k] = false; return v; },
		release: function(k) { var lasts = Key.lasts, last = lasts[lasts.indexOf(k)];
			if (last !== undefined) { lasts.splice(lasts.indexOf(k), 1); } return last == k; }
	};

	document.onkeyup   = function(e) { Key.lasts.push(e.keyCode); Key.keys[e.keyCode] = false; };
	document.onkeydown = function(e) { Key.keys[e.keyCode] = true; };

/* Contrôle de la souris */
	Mouse = {
		x: -1, y: -1, click: false, onclick: false,

		up: function()      { return !Mouse.click; },
		down: function()    { return Mouse.click; },
		release: function() { var onclick = Mouse.onclick; Mouse.onclick = false; return onclick; }
	};

	can.onmousedown      = function(e) { Mouse.x = e.pageX - can.offsetLeft; Mouse.y = e.pageY - can.offsetTop; Mouse.click = true; };
	document.onmouseup   = function(e) { Mouse.onclick = true; Mouse.click = false; };
	document.onmousemove = function(e) { Mouse.x = e.pageX - can.offsetLeft; Mouse.y = e.pageY - can.offsetTop; };

/* Fonctions utiles */
	Math.clamp = function(val, min, max) { return Math.max(min, Math.min(max, val)); };
	Math.rand  = function(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };

	Array.prototype.last  = function()  { return this[this.length - 1]; };
	Array.prototype.first = function()  { return this[0]; };
	Array.prototype.popi  = function(i) { return this.splice(i, 1)[0]; };

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

	Object.prototype.size = function() {};

function Entity(x, y) {
	this.x = x;
	this.y = y;

	this.animations       = [];
	this.currentAnimation = null;
	this.frame            = 0;
	this.acDelta          = 0;

	this.addAnimation = function(name, frames, speed) {
		this.animations[name] = { frames: frames, speed: speed };
	};

	this.entityUpdate = function() {
		if (this.currentAnimation !== null) {
			if (this.acDelta > this.currentAnimation.speed) {
				this.acDelta = 0;

				this.frame++;

				if (this.frame > this.currentAnimation.frames.length - 1) {
					this.frame = 0;
				}
			} else {
				this.acDelta += time.dt;
			}
		}
	};

	this.play = function(name) {
		if (this.currentAnimation != this.animations[name]) {
			this.frame = 0;
			this.currentAnimation = this.animations[name];
		}
	};
}

function Player(x, y) {
	Entity.call(this, x, y);

	this.x       = x;
	this.y       = y;
	this.w       = 12;
	this.h       = 12;
	this.middleX = 0;
	this.middleY = 0;
	this.angle   = 0;
	this.life    = 4;
	this.canFire = true;
	this.speed   = { x: 0, y: 0 };
	this.cli     = 0;
	this.dir     = 'right';

	this.create = function() {
		this.addAnimation('walk', [0, 1], 75);
		this.addAnimation('wait', [0], 75);

		this.play('wait');
	};

	this.update = function() {
		this.entityUpdate();

		this.middleX = this.x + (this.w / 2);
		this.middleY = this.y + (this.h / 2);
	};

	this.draw = function() {
		if (this.cli == 0 || this.cli % 200 <= 100) {

			if (this.dir == 'right') {
				ctx.drawImage(
					image.player,
					this.currentAnimation.frames[this.frame] * this.w + this.currentAnimation.frames[this.frame],
					0,
					this.w,
					this.h,
					Math.round(this.x),
					Math.round(this.y),
					this.w,
					this.h
				);
			} else {
				ctx.save();
					ctx.translate(this.w, 0);
					ctx.scale(-1, 1);

					ctx.drawImage(
						image.player,
						this.currentAnimation.frames[this.frame] * this.w + this.currentAnimation.frames[this.frame],
						0,
						this.w,
						this.h,
						-Math.round(this.x),
						Math.round(this.y),
						this.w,
						this.h
					);
				ctx.restore();
			}
		}
	};

	this.move = function() {
		var movX = this.x + (3 * this.speed.x);
		var movY = this.y + (3 * this.speed.y);

		if (movX != this.x || movY != this.y) {
			this.play('walk');
		} else {
			this.play('wait');
		}

		if (!compare(getColor(movX + (this.w / 2), this.middleY), [0, 0, 0])) {
			this.x = movX;
		}

		if (!compare(getColor(this.middleX, movY + (this.h / 2)), [0, 0, 0])) {
			this.y = movY;
		}
	};
}

function Zombie(x, y) {
	Entity.call(this, x, y);

	this.x       = x;
	this.y       = y;
	this.w       = 12;
	this.h       = 12;
	this.middleX = 0;
	this.middleY = 0;
	this.angle   = 0;
	this.life    = 4;
	this.canFire = true;
	this.speed   = { x: 0, y: 0 };
	this.dir     = 'left';

	this.create = function() {
		this.addAnimation('walk', [0, 1], 75);
		this.addAnimation('wait', [0], 75);

		this.play('wait');
	};

	this.update = function() {
		this.entityUpdate();

		this.middleX = this.x + (this.w / 2);
		this.middleY = this.y + (this.h / 2);
	};

	this.draw = function() {
		if (this.dir == 'right') {
			ctx.drawImage(
				image.zombie,
				this.currentAnimation.frames[this.frame] * this.w + this.currentAnimation.frames[this.frame],
				0,
				this.w,
				this.h,
				Math.round(this.x),
				Math.round(this.y),
				this.w,
				this.h
			);
		} else {
			ctx.save();
				ctx.translate(this.w, 0);
				ctx.scale(-1, 1);

				ctx.drawImage(
					image.zombie,
					this.currentAnimation.frames[this.frame] * this.w + this.currentAnimation.frames[this.frame],
					0,
					this.w,
					this.h,
					-Math.round(this.x),
					Math.round(this.y),
					this.w,
					this.h
				);
			ctx.restore();
		}
	};

	this.move = function() {
		var movX = this.x + (3 * this.speed.x);
		var movY = this.y + (3 * this.speed.y);

		if (movX != this.x || movY != this.y) {
			this.play('walk');
		} else {
			this.play('wait');
		}

		if (!compare(getColor(movX + (this.w / 2), this.middleY), [0, 0, 0])) {
			this.x = movX;
		}

		if (!compare(getColor(this.middleX, movY + (this.h / 2)), [0, 0, 0])) {
			this.y = movY;
		}
	};
}

document.onmousedown = function(e) {
	Mouse.click = true;
};

document.onmouseup = function(e) {
	Mouse.onclick = true;
	Mouse.click = false;
};

document.onmousemove = function(e) {
	Mouse.x = e.pageX - can.offsetLeft;
	Mouse.y = e.pageY - can.offsetTop;
};

document.onkeyup = function(e) {
	Key.last = e.keyCode;
	Key.keys[e.keyCode] = false;
};

document.onkeydown = function(e) {
	Key.keys[e.keyCode] = true;
};

function create() {
	zoom = 6;

	can.width  = 120 * zoom; 
	can.height = 60 * zoom;

	ctx.scale(zoom, zoom);

	if (ctx.mozImageSmoothingEnabled) {
		ctx.mozImageSmoothingEnabled = false;
	}

	image   = {};
	camera  = { x: 0, y: 0, w: 980, h: 660 };
	player  = new Player(3, 36);
	time    = { timer: 0, dt: 0, last: Date.now(), now: 0 };
	player.create();
	images  = {
		player:     'player.png',
		zombie:     'zombie.png',
		background: 'background.png',
		guns:       'guns.png'
	};
	zombies = [];

	nbImgsLoaded   = 0, // Nombre d'images chargées
	nbImgsToLoaded = Object.keys(images).length, // Nombre d'images à charger
	i              = null;

	function imgLoaded() { nbImgsLoaded += 1; }

	/* Création des images */
	for (i in images) {
		image[i] = new Image();
		image[i].src = images[i];
		image[i].onload = imgLoaded;
	}

	/* Préchargement des images */
	function preload() {
		if (nbImgsLoaded == nbImgsToLoaded) { // Si toutes les images sont chargées, on lance l'initialisation du jeu, sinon on relance le preload
			update();
		} else {
			setTimeout(preload, 100);
		}
	}

	preload();
}

function update() {
	time.now  = Date.now();
	time.dt   = time.now - time.last;
	time.last = Date.now();

	document.getElementById('log').innerHTML = 'Mouse.x = ' + (Mouse.x / 10) + ' ; Player.x = ' + player.x;

	if ((Mouse.x / zoom) - (player.w / 2) < player.x) {
		player.dir = 'left';
	} else {
		player.dir = 'right';
	}

	var newX = player.x;
	var newY = player.y;

	if (Math.rand(0, 80) < 1) {
		var zombie = new Zombie(120, Math.rand(30, 48));

		zombie.create();
		zombies.push(zombie);
	}

	if (Key.down(Key.RIGHT) || Key.down(Key.D)) {
		newX++;
	}

	if (Key.down(Key.LEFT) || Key.down(Key.Q)) {
		newX--;
	}

	if (Key.down(Key.UP) || Key.down(Key.Z)) {
		newY--;
	}

	if (Key.down(Key.DOWN) || Key.down(Key.S)) {
		newY++;
	}

	if (newX > 0 && newX < image.background.width) {
		player.x = newX;
	}

	if (newY > 28 && newY < 48) {
		player.y = newY;
	}

	if (
		!Key.down(Key.RIGHT) && !Key.down(Key.LEFT) && !Key.down(Key.UP) && !Key.down(Key.DOWN) &&
		!Key.down(Key.D) && !Key.down(Key.Q) && !Key.down(Key.Z) && !Key.down(Key.S)
	) {
		player.play('wait');
	} else {
		player.play('walk');
	}

	player.update();

	var nbZombies = zombies.length;
	for (var i = 0 ; i < nbZombies ; i++) {
		zombies[i].x--;
		zombies[i].update();

		if (zombies[i].x < -12) {
			zombies.splice(i, 1);
			nbZombies--;
		}
	}

	zombies.sortBy('y', 'asc');

	draw();

	requestAnimFrame(update);
}

function draw() {
	var nbZombies = zombies.length;

	ctx.clearRect(0, 0, can.width, can.height);

	ctx.fillRect(20, 20, 10, 10);
	ctx.drawImage(image.background, 0, 0, can.width / zoom, can.height / zoom, 0, 0, can.width / zoom, can.height / zoom);

	for (var i = 0 ; i < nbZombies ; i++) {
		if (zombies[i].y <= player.y) {
			zombies[i].draw();
		}
	}

	player.draw();

	if (player.dir == 'right') {
		ctx.drawImage(image.guns, 19, 0, 3, 2, player.x + player.w, player.y + 7, 3, 2);
	} else {
		ctx.save();
			ctx.translate(player.w, 0);
			ctx.scale(-1, 1);
				ctx.drawImage(image.guns, 19, 0, 3, 2, -player.x + player.w, player.y + 7, 3, 2);
		ctx.restore();
	}

	for (i = 0 ; i < nbZombies ; i++) {
		if (zombies[i].y > player.y) {
			zombies[i].draw();
		}
	}

	ctx.save();
		ctx.scale(1 / zoom, 1 / zoom);
		ctx.fillStyle = 'rgba(0, 0, 0, .04)';

		for (var i = 0 ; i < can.width / zoom ; i++) {
			ctx.fillRect(i * zoom, 0, 1, can.height);
		}

		for (var j = 0 ; j < can.height / zoom ; j++) {
			ctx.fillRect(0, j * zoom, can.width, 1);
		}
	ctx.restore();
}

create();
