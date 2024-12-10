"use strict";

var Entity = (function() {
	function Entity(x, y, w, h) {
		this.x       = x;
		this.y       = y;
		this.w       = w;
		this.h       = h;
		this.middlex = x + w / 2;
		this.middley = y + h / 2;

		this.animations       = { base: { frames: [0], speed: 0 } };
		this.currentAnimation = 'base';
		this.frame            = 0;
		this.acDelta          = 0;

		this.currentAnimation = this.animations['base'];
		//this.play('base');
	}

	Entity.prototype.addAnimation = function(name, frames, speed) {
		this.animations[name] = { frames: frames, speed: speed };
	};

	Entity.prototype.update = function(dt) {
		this.middlex = this.x + this.w / 2;
		this.middley = this.y + this.h / 2;

		if (this.currentAnimation.speed != 0) {
			if (this.acDelta < this.currentAnimation.speed) {
				this.acDelta += dt;
			} else {
				this.acDelta = 0;

				this.frame++;

				if (this.frame > this.currentAnimation.frames.length - 1) {
					this.frame = 0;
				}
			}
		}
	};

	Entity.prototype.play = function(name) {
		if (this.currentAnimation != this.animations[name]) {
			this.frame = 0;
			this.currentAnimation = this.animations[name];
		}
	};

	return Entity;
})();

var Player = (function(_super) {
	__extends(Player, _super);

	function Player() {
		_super.call(this, the_screen.w / 2 - 16, 0, 0, 0);

		this.image     = image.player;
		this.bullets   = [];
		this.canshot   = true;
		this.shottimer = 0;
		this.shotblock = 200;
		this.life      = 2;
		this.maxlife   = this.life;
		this.flash     = 0;
	}

	Player.prototype.update = function(dt) {
		_super.prototype.update.call(this, dt);

		this.x = Math.clamp(Mouse.x - this.w / 2, 0 - this.w / 2, the_screen.w - this.w / 2);
		this.y = Math.clamp(Mouse.y - this.h / 2, 0 - this.h / 2, the_screen.h - this.h / 2);

		if (this.flash > 0) {
			this.flash -= dt;
		} else if (this.flash < 0) {
			this.flash = 0;
		}

		this.middlex = this.x + this.w / 2;
		this.middley = this.y + this.h / 2;
	};

	Player.prototype.touchable = function() {
		return this.flash <= 0;
	};

	return Player;
})(Entity);

var Enemy = (function(_super) {
	__extends(Enemy, _super);

	function Enemy(img, x, y, shotblock, score, life) {
		this.image     = img;

		_super.call(this, x, y, this.image.width, this.image.height);

		this.shottimer = 0;
		this.shotblock = shotblock;
		this.canshot   = false;
		this.score     = score;
		this.life      = life;
		this.baseLife  = life;
	}

	return Enemy;
})(Entity);

var Enemy1 = (function(_super) {
	__extends(Enemy1, _super);

	function Enemy1() {
		var img  = image.enemy1;
		var rand = Math.rand(20, 50);

		this.basex    = Math.rand(0, the_screen.w - rand);
		this.rotation = 3;
		this.i        = 0;

		_super.call(this, img, this.basex, -img.height, 150, 50, 0);
	}

	Enemy1.prototype.update = function(dt) {
		_super.prototype.update.call(this, dt);

		if (!this.canshot) {
			this.shottimer += timer.dt;

			if (this.shottimer > this.shotblock) {
				this.shottimer = 0;
				this.canshot = true;
			}
		}

		if (this.canshot) {
			this.canshot = false;

			this.rotation += 0.4;

			enemies_bullets.push(new Bullet2(image.bullet1_enemy, this.middlex, this.middley, this.rotation));
		}

		this.i += 0.06;

		this.x = this.basex + Math.sin(this.i) * 20;
		this.y += speed * 0.4;
	};

	return Enemy1;
})(Enemy);

var Enemy2 = (function(_super) {
	__extends(Enemy2, _super);

	function Enemy2() {
		var img  = image.enemy2;
		var rand = Math.rand(20, 50);

		this.basex    = Math.rand(0, the_screen.w - rand);
		this.basey    = -img.height;
		this.i        = 0;
		this.rotation = 3;

		_super.call(this, img, this.basex, this.basey, 500, 50, 0);
	}

	Enemy2.prototype.update = function(dt) {
		_super.prototype.update.call(this, dt);

		if (!this.canshot) {
			this.shottimer += timer.dt;

			if (this.shottimer > this.shotblock) {
				this.shottimer = 0;
				this.canshot = true;
			}
		}

		if (this.canshot) {
			this.canshot = false;

			this.rotation += 0.4;

			enemies_bullets.push(new Bullet1(image.bullet1_enemy, this.middlex, this.middley));
		}

		this.i     += 0.1;
		this.basey += speed * 0.4;

		this.x = this.basex + (Math.sin(this.i) * 20);
		this.y = this.basey + (Math.cos(this.i) * 20);
	};

	return Enemy2;
})(Enemy);

var Enemy3 = (function(_super) {
	__extends(Enemy3, _super);

	function Enemy3() {
		var img  = image.enemy3;
		var rand = Math.rand(20, 50);

		this.rotation = 3;

		_super.call(this, img, Math.rand(0, the_screen.w - rand), -img.height, 380, 50, 2);
	}

	Enemy3.prototype.update = function(dt) {
		_super.prototype.update.call(this, dt);

		if (!this.canshot) {
			this.shottimer += timer.dt;

			if (this.shottimer > this.shotblock) {
				this.shottimer = 0;
				this.canshot = true;
			}
		}

		if (this.canshot) {
			this.canshot = false;

			this.rotation += 0.4;

			enemies_bullets.push(new Bullet2(image.bullet1_enemy, this.middlex, this.middley, this.rotation));
		}

		this.y += speed * 0.6;
	};

	return Enemy3;
})(Enemy);

var Bullet = (function(_super) {
	__extends(Bullet, _super);

	function Bullet(img, x, y, w, h) {
		this.image = img;

		_super.call(this, x, y, this.image.width, this.image.height);
	}

	Bullet.prototype.update = function(dt) {
		_super.prototype.update.call(this, dt);
	};

	return Bullet;
})(Entity);

var Bullet1 = (function(_super) {
	__extends(Bullet1, _super);

	function Bullet1(img, x, y) {
		var w = img.width;
		var h = img.height;

		_super.call(this, img, x, y, w, h);
	}

	Bullet1.prototype.update = function(dt) {
		_super.prototype.update.call(this, dt);

		this.y += speed;
	};

	return Bullet1;
})(Bullet);

var Bullet2 = (function(_super) {
	__extends(Bullet2, _super);

	function Bullet2(img, x, y, rotation) {
		var w = img.width;
		var h = img.height;

		_super.call(this, img, x, y, w, h);

		this.rotation = rotation;
	}

	Bullet2.prototype.update = function(dt) {
		_super.prototype.update.call(this, dt);

		this.x -= Math.cos(this.rotation) * 2;
		this.y -= Math.sin(this.rotation) * 2;
	};

	return Bullet2;
})(Bullet);

/* Le canvas */
var can = getById('game');
var ctx = can.getContext('2d');
var log = getById('log');

/* La taille de l'écran de jeu */
var the_screen = {
	w: 380,
	h: 520
};

/* Les images à charger */
var images = {
	background:     'data/image/background.png',
	stars1:         'data/image/stars1.png',
	stars2:         'data/image/stars2.png',
	player:         'data/image/player.png',
	enemy1:         'data/image/enemy1.png',
	enemy2:         'data/image/enemy2.png',
	enemy3:         'data/image/enemy3.png',
	bullet1_player: 'data/image/bullet1_player.png',
	bullet1_enemy:  'data/image/bullet1_enemy.png',
	coin1:          'data/image/coin1.png',
	heart:          'data/image/heart.png',
	shield:         'data/image/shield.png'
};

/* Les images chargées */
var image = {};

/* Position des fonds */
var background = {
	x: 0,
	y: 0,
	w: 0,
	h: 0,
	image: null
};

var stars1 = {
	x: 0,
	y: 0,
	w: 0,
	h: 0,
	image: null
};

var stars2 = {
	x: 0,
	y: 0,
	w: 0,
	h: 0,
	image: null
};

/* Vitesse de base du jeu */
var speed = 3;

/* Timer du jeu */
var timer = new TimerManager();

/* Le joueur */
var player = null;

/* Les informations de la partie */
var score = 0;
var money = 0;

/* Les pièces */
var coins = [];

/* Les ennemis */
var enemies = [];

/* Les tirs ennemis */
var enemies_bullets = [];

/* Le générateur d'ennemi */
var generator = 220;
var geni      = 0;
var genj      = 700;
var genmin    = 50;

/* Défini si un objet est encore dans l'écran ou non */
function isOutOfScreen(obj) {
	return obj.y > the_screen.h || obj.y + obj.h < 0 || obj.x > the_screen.w || obj.x + obj.w < 0;
}

/* Initialisation du jeu */
function init() {
	can.width  = the_screen.w;
	can.height = the_screen.h;

	ctx.fillBackground(can, rgbToStr(0, 0, 0));
	ctx.fillStyle = rgbToStr(255, 255, 255);
	ctx.font = 'normal 32px "Times New Roman", serif';
	ctx.textAlign = 'center';
	ctx.fillText('Chargement du jeu...', the_screen.w / 2, the_screen.h / 2);

	PreloadManager(images, image, create);
}

/* Création du jeu */
function create() {
	background.image = image.background;
	background.w     = background.image.width;
	background.h     = background.image.height;

	stars1.image = image.stars1;
	stars1.w     = stars1.image.width;
	stars1.h     = stars1.image.height;

	stars2.image = image.stars2;
	stars2.w     = stars2.image.width;
	stars2.h     = stars2.image.height;

	player = new Player();

	player.image = image.player;
	player.w     = image.player.width;
	player.h     = image.player.height;

	update();
}

/* Mise à jour du jeu */
function update() {
	var i = 0;
	var j = 0;

	/* On écrit les logs */
	log.innerHTML = 'vies restantes : ' + player.life + ' ; argent : ' + money + ' ; score : ' + score + ' ; dt: ' + timer.dt + ' ; temps total : ' + timer.time + ' ; difficulte : ' + generator;

	/* On met à jour le timer */
	timer.update();

	/* On met à jour le joueur */
	player.update(timer.dt);

	/* On tue le joueur si il n'a plus de vie */
	if (player.life < 0) {
		alert('TU ES MORT !');
	}

	/* On met à jour les fonds */
	stars1.y += speed * 0.2;
	stars2.y += speed * 0.4;

	if (background.y > background.h) {
		background.y = 0;
	}

	if (stars1.y > stars1.h) {
		stars1.y = 0;
	}

	if (stars2.y > stars2.h) {
		stars2.y = 0;
	}

	/* On met à jour le générateur d'ennemis */
	geni += timer.dt;

	if (geni >= genj) {
		geni = 0;

		if (generator > genmin) {
			generator--;
		}
	}

	/* On génère les ennemis */
	if (Math.rand(0, generator) < 1) {
		var rand = Math.rand(1, 3);

		switch (rand) {
			case 1: enemies.push(new Enemy1()); break;
			case 2: enemies.push(new Enemy2()); break;
			case 3: enemies.push(new Enemy3()); break;
		}
	}

	/* Tir du joueur */
	if (Mouse.down() && player.canshot) {
		player.canshot = false;

		player.bullets.push({
			x: player.x + (player.w / 4),
			y: player.y + (player.h / 4),
			w: image.bullet1_player.width,
			h: image.bullet1_player.height
		});
	}

	if (!player.canshot) {
		player.shottimer += timer.dt;

		if (player.shottimer > player.shotblock) {
			player.shottimer = 0;
			player.canshot = true;
		}
	}

	/* Mise à jour des ennemis */
	for (i = 0 ; i < enemies.length ; i++) {
		var enemy = enemies[i];

		enemy.update(timer.dt);

		if (isOutOfScreen(enemy)) {
			enemies.remove(i);
		}

		/* if (pointHitBox(player.middlex, player.middlex, enemy)) {
			if (player.touchable()) {
				player.flash = 2000;
				player.life--;
			}
		} */

		if (enemy.life < 0) {

			coins.push({
				x: enemy.x,
				y: enemy.y,
				w: image.coin1.width,
				h: image.coin1.height
			});

			enemies.remove(i);
		}
	}

	/* Mise à jour des tirs ennemis */
	for (i = 0 ; i < enemies_bullets.length ; i++) {
		var bullet = enemies_bullets[i];

		bullet.update(timer.dt);

		if (pointHitBox(player.middlex, player.middley, bullet)) {
			if (player.touchable()) {
				player.flash = 2000;
				player.life--;
			}
		}

		if (isOutOfScreen(bullet)) {
			enemies_bullets.remove(i);
		}
	}

	for (i = 0 ; i < player.bullets.length ; i++) {
		var bullet = player.bullets[i];

		bullet.y -= speed * 3.4;

		if (isOutOfScreen(bullet)) {
			player.bullets.remove(i);
		}

		for (j = 0 ; j < enemies.length ; j++) {
			var enemy = enemies[j];

			if (bullet != undefined && enemy != undefined && boxHitBox(bullet, enemy)) {
				score += enemy.score;

				player.bullets.remove(i);
				enemy.life--;
				//enemies.remove(j);

				break;
			}
		}
	}

	/* Mise à jour des pièces */
	for (i = 0 ; i < coins.length ; i++) {
		var coin = coins[i];

		coin.y += speed * 0.5;

		if (isOutOfScreen(coin)) {
			coins.remove(i);
		}

		if (boxHitBox(player, coin)) {
			coins.remove(i);
			money++;
		}
	}

	/* On dessine */
	draw();

	/* On rafraîchit */
	requestAnimFrame(update);
}

/* On dessine le jeu */
function draw() {
	var i = 0;
	var j = 0;

	/* On nettoie la zone de jeu */
	ctx.clear(can);

	/* On dessine les fonds */
	ctx.drawImage(background.image, background.x, background.y - background.h);
	ctx.drawImage(background.image, background.x, background.y);

	ctx.drawImage(stars1.image, stars1.x, stars1.y - stars1.h);
	ctx.drawImage(stars1.image, stars1.x, stars1.y);

	ctx.drawImage(stars2.image, stars2.x, stars2.y - stars2.h);
	ctx.drawImage(stars2.image, stars2.x, stars2.y);

	/* On dessine le joueur */
	if (player.flash == 0 || player.flash % 200 <= 100) {
		ctx.drawImage(player.image, player.x, player.y);
	}

	/* On dessine les pièces */
	for (i = 0 ; i < coins.length ; i++) {
		var coin = coins[i];

		ctx.drawImage(image.coin1, coin.x, coin.y);
	}

	/* On dessine les ennemis et leurs barres de vie */
	for (var i = 0 ; i < enemies.length ; i++) {
		var enemy = enemies[i];

		ctx.drawImage(enemy.image, enemy.x, enemy.y);

		ctx.fillStyle = rgbToStr(255, 255, 255);
		ctx.fillRect(enemy.x - 1, enemy.y + enemy.h + 3, enemy.w + 2, 6);
		ctx.fillStyle = rgbToStr(255, 0, 0);
		ctx.fillRect(enemy.x, enemy.y + enemy.h + 4, Math.clamp(((enemy.life + 1) / (enemy.baseLife + 1)) * enemy.w, 0, enemy.w), 4);
	}

	/* On dessine les tirs du joueur */
	for (i = 0 ; i < player.bullets.length ; i++) {
		var bullet = player.bullets[i];

		ctx.drawImage(image.bullet1_player, bullet.x, bullet.y);
	}

	/* On dessine les tirs ennemis */
	for (i = 0 ; i < enemies_bullets.length ; i++) {
		var bullet = enemies_bullets[i];

		ctx.drawImage(image.bullet1_enemy, bullet.x, bullet.y);
	}

	/* On dessine les vies */
	for (i = 0 ; i < player.life ; i++) {
		ctx.drawImage(image.shield, 14 * i + 2, 2);
	}
}

/* Met à jour la position de la souris */
document.onmousemove = function(e) {
	Mouse.x = e.pageX - can.offsetLeft;
	Mouse.y = e.pageY - can.offsetTop;
};

/* On lance le jeu ! */
init();
