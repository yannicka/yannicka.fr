var G = {};

G.init = function() {
	G.can.width  = 352;
	G.can.height = 352;

	G.ctx.fillBackground(G.can, rgb(0, 0, 0));
	G.ctx.fillStyle = rgb(255, 255, 255);
	G.ctx.font = 'normal 16px "Times New Roman", serif';
	G.ctx.textAlign = 'center';
	G.ctx.fillText('Chargement du jeu...', G.can.width / 2, G.can.height / 2);

	PreloadManager(G.images, G.image, G.create);
};

G.create = function() {
	G.update();
};

G.update = function() {
	G.timer.update();

	G.players.sortBy('y', 'asc');

	var nb_players = G.players.length;
	var nb_enemies = G.enemies.length;
	var i, j, player, enemy;

	for (i = 0 ; i < nb_players ; i++) {
		player = G.players[i];

		if (player.timer > 0) {
			player.timer -= G.timer.dt;
		} else {
			player.timer = 0;
		}

		var tx = player.tx - player.x,
			ty = player.ty - player.y,
			dist = Math.sqrt(tx * tx + ty * ty),
			velX = (tx / dist) * player.speed, 
			velY = (ty / dist) * player.speed;

		if (distance2P(player.x, player.y, player.tx, player.ty) > player.speed && dist > 1) {
			player.x += velX;
			player.y += velY;
		}

		player.mx = player.x + player.w / 2;
		player.my = player.y + player.h / 2;

		for (j = 0 ; j < nb_enemies ; j++) {
			enemy = G.enemies[j];

			var atx = enemy.tx - enemy.x,
				aty = enemy.ty - enemy.y,
				adist = Math.sqrt(atx * atx + aty * aty),
				avelX = (atx / adist) * enemy.speed, 
				avelY = (aty / adist) * enemy.speed;

			if (distance2P(enemy.x, enemy.y, enemy.tx, enemy.ty) > enemy.speed && adist > 1) {
				enemy.x += avelX;
				enemy.y += avelY;
			}

			if (distance2P(player.x, player.y, enemy.x, enemy.y) < 60 && enemy.onmove) {
				player.tx = enemy.x;
				player.ty = enemy.y;
			}

			if (distance2P(player.x, player.y, enemy.x, enemy.y) < 20 && player.timer <= 0) {
				enemy.life -= 6;
				player.timer = player.baseTimer;
				break;
			}
		}
	}

	for (j = 0 ; j < nb_enemies ; j++) {
		enemy = G.enemies[j];

		enemy.onmove = true;
	}

	G.draw();

	//log.innerHTML = Math.round(distance2P(G.player.mx, G.player.my, Mouse.x, Mouse.y));

	requestAnimFrame(G.update);
};

G.draw = function() {
	G.ctx.clear(G.can);
	G.ctx.drawImage(G.image.background, 0, 0);

	var nb_players = G.players.length;

	for (var i = 0 ; i < nb_players ; i++) {
		var player = G.players[i];

		if (player.onmove) {
			G.ctx.fillStyle   = rgb(0, 255, 0);
			G.ctx.strokeStyle = rgb(0, 255, 0);

			G.ctx.beginPath();
			G.ctx.arc(Mouse.x, Mouse.y, 8, 0, 2 * Math.PI, false);
			G.ctx.fill();

			G.ctx.beginPath();
			G.ctx.moveTo(player.mx, player.my);
			G.ctx.lineTo(Mouse.x, Mouse.y);
			G.ctx.stroke();
		}

		G.ctx.fillStyle = rgb(0, 0, 160);

		G.ctx.fillRect(player.x, player.y, player.w, player.h);
	}

	var nb_enemies = G.enemies.length;

	for (var i = 0 ; i < nb_enemies ; i++) {
		var enemy = G.enemies[i];

		G.ctx.fillStyle = rgb(160, 0, 0);

		G.ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);

		G.ctx.fillStyle = rgb(255, 255, 255);
		G.ctx.fillRect(enemy.x, enemy.y - 8, enemy.w, 6);
		G.ctx.fillStyle = rgb(255, 0, 0);
		G.ctx.fillRect(enemy.x + 1, enemy.y - 7, Math.roundClamp((enemy.life / enemy.baseLife) * enemy.w - 2, 0, enemy.w - 2), 4);
	}
};

G.can = getById('game');
G.ctx = G.can.getContext('2d');
G.log = getById('log');

G.players = [
	{
		x:  20, y:  160, // position x;y du joueur
		mx: 0,  my: 0,   // position x;y au milieu du joueur
		tx: 20, ty: 160, // position x;y où se déplace le joueur
		w:  36, h:  36,  // largeur et hauteur du joueur
		onmove: false,   // le joueur est-il en déplacement ?
		speed: 5,        // vitesse du joueur
		timer: 0, baseTimer: 200
	},

	{
		x:  50, y:  190,
		mx: 0,  my: 0,
		tx: 50, ty: 190,
		w:  36, h:  36,
		onmove: false,
		speed: 5,
		timer: 0, baseTimer: 200
	}
];

G.enemies = [
	{
		x:  280, y:  200,
		mx: 0,  my: 0,
		tx: 60, ty: 60,
		w:  36, h:  36,
		onmove: false,
		speed:  2,
		life: 100, baseLife: 100
	}
];

G.timer = new TimerManager();

G.images = {
	background: 'assets/gfx/bg1.png'
};

G.image = {};

document.onmousemove = function(evt) {
	Mouse.x = evt.pageX - G.can.offsetLeft;
	Mouse.y = evt.pageY - G.can.offsetTop;
};

document.onmousedown = function(evt) {
	var nb_players = G.players.length;

	for (var i = 0 ; i < nb_players ; i++) {
		var player = G.players[i];

		if (pointHitBox(Mouse.x, Mouse.y, player)) {
			player.onmove = true;
			break;
		}
	}
};

document.onmouseup = function(evt) {
	var nb_players = G.players.length;

	for (var i = 0 ; i < nb_players ; i++) {
		var player = G.players[i];

		if (player.onmove) {
			player.tx = Math.clamp(Mouse.x - (player.w / 2), 0, G.can.width - player.w);
			player.ty = Math.clamp(Mouse.y - (player.h / 2), 50, G.can.height - player.h);

			/*var nb_enemies = G.enemies.length;

			for (var j = 0 ; j < nb_enemies ; j++) {
				var enemy = G.enemies[j];

				if (pointHitBox(Mouse.x, Mouse.y, enemy)) {
					player.tx = enemy.x - enemy.w;
					player.ty = enemy.y;
					break;
				}
			}*/

			player.onmove = false;
			break;
		}
	}
};
