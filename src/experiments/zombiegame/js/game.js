var can, ctx, maskCan, maskCtx, listPixels, camera,
	player, shots, pointer,
	time,
	AAA, BBB,
	zombies, CCC, canTouch, nbZombies, maxZombies, zombiesSpawns,
	image, images;

var Key = {
	keys: [],
	last: 0,

	TAB  : 9,
	ENTER: 13,
	SHIFT: 16,
	CTRL : 17,
	ALT  : 18,
	ESC  : 27,
	SPACE: 32,

	LEFT : 37,
	UP   : 38,
	RIGHT: 39,
	DOWN : 40,

	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90,

	NUM0: 48,
	NUM1: 49,
	NUM2: 50,
	NUM3: 51,
	NUM4: 52,
	NUM5: 53,
	NUM6: 54,
	NUM7: 55,
	NUM8: 56,
	NUM9: 57,

	NUMPAD0: 96,
	NUMPAD1: 97,
	NUMPAD2: 98,
	NUMPAD3: 99,
	NUMPAD4: 100,
	NUMPAD5: 101,
	NUMPAD6: 102,
	NUMPAD7: 103,
	NUMPAD8: 104,
	NUMPAD9: 105,

	ADD: 107,
	SUB: 109,
	MUL: 106,
	DIV: 111,

	CAPSLOCK: 20,
	PAGEUP  : 33,
	PAGEDOWN: 34,
	END     : 35,
	HOME    : 36,
	ISERT   : 45,
	DELETE  : 46,
	NUMLOCK : 144,

	up: function(k) {
		return !Key.keys[k];
	},

	down: function(k) {
		return Key.keys[k];
	},

	release: function(k) {
		var last = Key.last;
		Key.last = 0;

		return last == k;
	}
};

var Mouse = {
	x: 0,
	y: 0,
	click: false,
	onclick: false,

	up: function() {
		return !Mouse.click;
	},

	down: function() {
		return Mouse.click;
	},

	release: function() {
		var onclick = Mouse.onclick;
		Mouse.onclick = false;

		return onclick;
	}
};
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame       ||
		   window.webkitRequestAnimationFrame ||
		   window.mozRequestAnimationFrame    ||
		   window.oRequestAnimationFrame      ||
		   window.msRequestAnimationFrame     ||
		   function(callback) { window.setTimeout(callback, 1000 / 60); };
})();

Math.clamp = function(val, min, max) {
	return Math.max(min, Math.min(max, val));
};

Math.rand = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

Object.size = function() {
	
}
function pointHitPoint(x1, y1, x2, y2) {
	return (x1 == x2 && y1 == y2);
}

function pointHitBox(x, y, box) {
	if (
		x >= box.x
		&& x < box.x + box.w
		&& y >= box.y
		&& y < box.y + box.h
	) {
	   return true;
	} else {
	   return false;
	}
}

function pointHitCircle(x, y, circle) {
	var d2 = ((x - circle.x) * (x - circle.x)) + ((y - circle.y) * (y - circle.y));

	if (d2 > circle.r * circle.r) {
		return false;
	} else {
		return true;
	}
}

function pointHitLine(x, y, x1, y1, x2, y2) {
	return false;
}

function pointHitPolygon() {
	return false;
}

function boxHitBox(box1, box2) {
	if (
		box2.x >= box1.x + box1.w
		|| box2.x + box2.w <= box1.x
		|| box2.y >= box1.y + box1.h
		|| box2.y + box2.h <= box1.y
	) {
		return false;
	} else {
		return true;
	}
}

function boxHitCircle(box, circle) {
	if (
		pointHitCircle(box.x, box.y, circle)
		|| pointHitCircle(box.x, box.y + box.h, circle)
		|| pointHitCircle(box.x + box.w, box.y, circle)
		|| pointHitCircle(box.x + box.w, box.y + box.h, circle)
	) {
		return true;
	}

	return false;
}

function boxHitLine(box, x1, y1, x2, y2) {
	return false;
}

function boxHitPolygon(box, polygon) {
	return false;
}

function circleHitLine(circle, x1, y1, x2, y2) {
	var dx, dy, a, b, c, bb4ac;

	dx     = x2 - x1;
	dy     = y2 - y1;
	a      = dx * dx + dy * dy;
	b      = 2 * (dx * (x1 - circle.x) + dy * (y1 - circle.y));
	c      = circle.x * circle.x + circle.y * circle.y;
	c     += x1 * x1 + y1 * y1;
	c     -= 2 * (circle.x * x1 + circle.y * y1);
	c     -= circle.r * circle.r;
	bb4ac  = b * b - 4 * a * c;

	if (bb4ac < 0) {
		return false;
	} else {
		return true;
	}
}

function circleHitCircle(circle1, circle2) {
	var d2 = ((circle1.x - circle2.x) * (circle1.x - circle2.x)) + ((circle1.y - circle2.y) * (circle1.y - circle2.y));

	if (d2 > (circle1.r + circle2.r) * (circle1.r + circle2.r)) {
		return false;
	} else {
		return true;
	}
}

function circleHitPolygon(circle, polygon) {
	return false;
}

function lineHitLine(x1, y1, x2, y2, x3, y3, x4, y4) {
	return false;
}

function lineHitPolygon(x1, y1, x2, y2, polygon) {
	return false;
}

function polygonHitPolygon(polygon1, polygon2) {
	return false;
}
function Entity(x, y) {
	this.x = x;
	this.y = y;

	this.animations = {};
	this.currentAnimation = null;
	this.frame = 0;
	this.acDelta = 0;

	this.addAnimation = function(name, frames, speed) {
		this.animations[name] = { frames: frames, speed: speed };
	};

	this.entityUpdate = function() {
		if (this.acDelta > this.currentAnimation.speed) {
			this.acDelta = 0;

			this.frame++;

			if (this.frame > this.currentAnimation.frames.length - 1) {
				this.frame = 0;
			}
		} else {
			this.acDelta += time.dt;
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
	this.w       = 23;
	this.h       = 28;
	this.r       = (this.w + this.h) / 2;
	this.middleX = 0;
	this.middleY = 0;
	this.angle   = 0;
	this.life    = 2;
	this.canFire = true;
	this.speed   = { x: 0, y: 0 };

	this.create = function() {
		this.addAnimation('wait', [0], 1000);
		this.addAnimation('walk', [1, 2], 100);

		this.play('wait');
	};

	this.update = function() {
		this.entityUpdate();

		this.middleX = this.x + (this.w / 2);
		this.middleY = this.y + (this.h / 2);
	};

	this.draw = function() {
		ctx.save();
		ctx.translate(this.x + (this.w / 2), this.y + (this.h / 2));
		ctx.rotate(this.angle);
		ctx.drawImage(image.player, this.currentAnimation.frames[this.frame] * this.w, 0, this.w, this.h, 0 - (this.w / 2), 0 - (this.h / 2), this.w, this.h);
		ctx.restore();
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
function create() {
	can = document.getElementById('game');
	ctx = can.getContext('2d');

	maskCan = document.getElementById('mask');
	maskCtx = maskCan.getContext('2d');

	can.width  = 640;
	can.height = 480;

	image   = {};
	camera  = { x: 0, y: 0, w: 980, h: 660 };
	player  = new Player(250, 50);
	player.create();
	pointer = { x: 0, y: 0, w: 10, h: 10 };
	time    = { timer: 0, dt: 0, last: Date.now(), now: 0 };
	images  = {
		player:     'data/img/perso.png',
		zombie:     'data/img/zombie.png',
		pointer:    'data/img/mouse.png',
		background: 'data/img/background.png',
		collide:    'data/img/collide.png',
		level:      'data/img/image.png',
		light:      'data/img/light.png'
	};

	maskCan.width  = camera.w;
	maskCan.height = camera.h;

	shots         = [];
	zombies       = [];
	listPixels    = [];
	zombiesSpawns = [];

	AAA        = 0;
	BBB        = 0;
	CCC		   = 0;
	nbZombies  = 0;
	maxZombies = 50;

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
			maskCtx.clearRect(0, 0, maskCan.width, maskCan.height);
			maskCtx.drawImage(image.collide, 0, 0);

			listPixels = maskCtx.getImageData(0, 0, camera.w, camera.h).data;

			for (var i = 0 ; i < listPixels.length ; i += 4) {
				//if (listPixels[i] > 0) alert('ok1');
				//if (listPixels[i + 1] > 0) alert('ok2');
				//if (listPixels[i + 2] > 0) alert('ok3');
				if (listPixels[i] == 0 && listPixels[i + 1] == 0 && listPixels[i + 2] == 255) {
					zombiesSpawns.push(i);
				}
			}

			update();
			showDt();
		} else {
			setTimeout(preload, 100);
		}
	}

	preload();
}

create();

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

function showDt() {
	document.getElementById('log').innerHTML = time.dt;

	window.setTimeout(showDt, 500);
}
function update() {
	camera.x = Math.clamp(-player.middleX + can.width / 2, (-camera.w) + can.width, 0);
	camera.y = Math.clamp(-player.middleY + can.height / 2, (-camera.h) + can.height, 0);

	player.update();

	pointer.x = Mouse.x - camera.x;
	pointer.y = Mouse.y - camera.y;

	if (player.life > 0) {
		time.now  = Date.now();
		time.dt   = time.now - time.last;
		time.last = Date.now();

		if (Key.down(Key.Q) || Key.down(Key.LEFT)) {
			player.speed.x = -1;
		} else if (Key.down(Key.D) || Key.down(Key.RIGHT)) {
			player.speed.x = 1;
		} else {
			player.speed.x = 0;
		}

		if (Key.down(Key.Z) || Key.down(Key.UP)) {
			player.speed.y = -1;
		} else if (Key.down(Key.S) || Key.down(Key.DOWN)) {
			player.speed.y = 1;
		} else {
			player.speed.y = 0;
		}

		player.move();

		if (Mouse.down() && player.canFire) {
			shots.push({ x: player.middleX - 10, y: player.middleY - 5, w: 10, h: 5, angle: player.angle });
			player.canFire = false;
		}

		for (var i = 0 ; i < shots.length ; i++) {
			var shot = shots[i];
			var movX = shot.x + Math.cos(shot.angle) * 16;
			var movY = shot.y + Math.sin(shot.angle) * 16;

			if (!compare(getColor(movX + (shot.w / 2), shot.y + (shot.h / 2)), [0, 0, 0])) {
				shot.x = movX;
			} else {
				shots.splice(i, 1);
			}

			if (!compare(getColor(shot.x + (shot.w / 2), movY + (shot.h / 2)), [0, 0, 0])) {
				shot.y = movY;
			} else {
				shots.splice(i, 1);
			}

			for (var j = 0 ; j < zombies.length ; j++) {
				var zombie = zombies[j];

				if (boxHitBox(shot, zombie) && !zombie.killed) {
					shots.splice(i, 1);
					zombie.killed = true;
				}
			}
		}

		if (!canTouch) {
			CCC += time.dt;
		}

		if (CCC >= 2000) {
			canTouch = true;
			CCC = 0;
		}

		for (var i = 0 ; i < zombies.length ; i++) {
			var zombie, fx, fy;

			zombie = zombies[i];

			if (!zombie.killed) {
				zombie.angle = Math.atan2(player.middleY - zombie.y - (zombie.h / 2), player.middleX - zombie.x - (zombie.w / 2));

				moveEnnemy(zombie, i);

				if (boxHitBox(zombie, player) && canTouch) {
					player.life -= zombie.degats;
					canTouch = false;
					CCC = 0;
				}
			}
		}


		AAA += time.dt;

		if (AAA >= 360) {
			player.canFire = true;
			AAA = 0;
		}

		if (nbZombies < maxZombies) {
			newZombie();
		}

		player.angle = Math.atan2(pointer.y - player.middleY, pointer.x - player.middleX);

		draw();

		requestAnimFrame(update);
	}
	
}

function moveEnnemy(ennemy, index) {
	var movX = ennemy.x + (Math.cos(ennemy.angle) + ennemy.anglePlus) * ennemy.speed;
	var movY = ennemy.y + (Math.sin(ennemy.angle) + ennemy.anglePlus) * ennemy.speed;

	for (var i = 0 ; i < zombies.length ; i++) {
		if (boxHitBox({ x: movX, y: ennemy.y, w: ennemy.w, h: ennemy.h }, zombies[i]) && index != i && !zombies[i].killed) {
			movX = ennemy.x;
		}

		if (boxHitBox({ x: ennemy.x, y: movY, w: ennemy.w, h: ennemy.h }, zombies[i]) && index != i && !zombies[i].killed) {
			movY = ennemy.y;
		}
	}

	if (compare(getColor(movX + (ennemy.w / 2), ennemy.y + (ennemy.h / 2)), [255, 255, 255])) {
		ennemy.x = movX;
	}

	if (compare(getColor(ennemy.x + (ennemy.w / 2), movY + (ennemy.h / 2)), [255, 255, 255])) {
		ennemy.y = movY;
	}
}

function getColor(x, y) {
	var i = (camera.w * Math.round(y) + Math.round(x)) * 4;

	return [listPixels[i], listPixels[i + 1], listPixels[i + 2]];
}

function compare(a, b) {
	for (var i = 0 ; i < a.length ; i++) {
		if (a[i] != b[i]) {
			return false;
		}
	}

	return true;
}

function newZombie() {
	var t = (100 * (Math.floor(Math.random() * 1000))) + 100;

	BBB += time.dt;

	if (BBB >= t) {
		var i = zombiesSpawns[Math.rand(0, zombiesSpawns.length - 1)] / 4;

		var x = i % camera.w;
		var y = (i - x) / camera.w;

		zombies.push({ x: x, y: y, w: 17, h: 28, angle: 0, anglePlus: 0, canTouch:true, killed: false, degats: 1, speed: Math.random() * 2 + 1 });
		nbZombies += 1;
		BBB = 0;
	}
}

function getDead() {
	var compteur = 0;

	for (var i = 0 ; i < zombies.length ; i++) {
		var zombie = zombies[i];

		if (zombie.killed) {
			compteur += 1;
		}
	}

	return compteur;
}
function draw() {
	if (player.life > 0) {
		var pattern, grd;

		ctx.clearRect(0, 0, can.width, can.height);
		ctx.drawImage(image.level, camera.x, camera.y);

		ctx.save();
		ctx.translate(camera.x, camera.y);

		ctx.fillStyle = 'rgb(0, 0, 0)';
		player.draw();

		for (var i = 0 ; i < shots.length ; i++) {
			var shot = shots[i];

			ctx.save();

			ctx.translate(shot.x + (shot.w / 2), shot.y + (shot.h / 2));
			ctx.rotate(shot.angle);
			ctx.fillStyle = 'rgb(100, 80, 0)';
			ctx.fillRect(0 - (shot.w / 2), 0 - (shot.h / 2), shot.w, shot.h);

			ctx.restore();
		}

		for (var i = 0 ; i < zombies.length ; i++) {
			var zombie = zombies[i];

			if (!zombie.killed) {
				ctx.save();

				ctx.translate(zombie.x + (zombie.w / 2), zombie.y + (zombie.h / 2));
				ctx.rotate(zombie.angle);
				ctx.drawImage(image.zombie, 0, 0, zombie.w, zombie.h,0 - (zombie.w / 2), 0 - (zombie.h / 2), zombie.w, zombie.h);

				ctx.restore();
			}
		}

		ctx.drawImage(image.pointer, 0, 0, pointer.w, pointer.h, pointer.x - 5, pointer.y - 5, 10, 10);

		ctx.restore();

		ctx.fillStyle = 'rgb(0, 0, 0)';
		ctx.fillText('Vie : ' +  player.life, 20, 20);
		ctx.fillText('Zombies restants : ' + (maxZombies - getDead()), can.width - 150, 20);
	} else {
		ctx.fillStyle = 'rgb(0, 0, 0)';
		ctx.font = 'bold 40px Arial';
		ctx.fillText('GAME OVER', (can.width / 2) - 90, can.height / 2);

		document.getElementById('game').style.cursor = 'auto';
	}
}
