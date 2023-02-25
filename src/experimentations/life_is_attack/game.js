(function() {
	var MAX_FIRE_LEVEL = 6,
		GAME_WIDTH = 150,
		GAME_HEIGHT = 200;

	var can, ctx,
		mouse, timer,
		cur_state, state, img, zoom,
		banner,
		player, score, fire_level,
		enemies, enemies_shots, type_enemies,
		bonuses, explosions, stars;

	// à renommer
	var aaa = document.createElement('canvas');
	var aaa_ctx = aaa.getContext('2d');

	function init() {
		can = document.getElementById('game');
		ctx = can.getContext('2d');

		mouse = new Mouse(can);
		timer = new Stopwatch();

		cur_state = 'menu';

		zoom = 2;

		can.width  = GAME_WIDTH;
		can.height = GAME_HEIGHT;

		player = {
			x: can.width / 4 - 5,
			y: can.height / 4 + 50,
			width: 10,
			height: 10,
			speed: 2.5,
			shot_timer: 0,
			can_shot: true,
			shots: []
		};

		fire_level = 1;
		score = 0;

		bonuses = [];
		explosions = [];
		enemies = [];
		enemies_shots = [];
		stars = [];

		banner = {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			alpha: 0,
			zoom: 0
		};

		type_enemies = [
			{ width: 8,
				height: 10,
				speed: 3,
				life: 1 },

			{ width: 6,
				height: 8,
				speed: 3,
				life: 1 },

			{ width: 6,
				height: 10,
				speed: 3,
				life: 1 },

			{ width: 16,
				height: 16,
				speed: 2,
				life: 3 },

			{ width: 18,
				height: 16,
				speed: 2.5,
				life: 2 },

			{ width: 22,
				height: 14,
				speed: 2.5,
				life: 2 }
		];

		img = preload_images({
			bg:        'assets/gfx/bg.png',
			bonus:     'assets/gfx/bonus.png',
			cursor:    'assets/gfx/cursor.png',
			player:    'assets/gfx/player.png',
			fire1:     'assets/gfx/fire1.png',
			star1:     'assets/gfx/star1.png',
			star2:     'assets/gfx/star2.png',
			banner:    'assets/gfx/banner.png',
			explosion: 'assets/gfx/explosion.png',
			enemy_0:   'assets/gfx/enemies/1.png',
			enemy_1:   'assets/gfx/enemies/2.png',
			enemy_2:   'assets/gfx/enemies/3.png',
			enemy_3:   'assets/gfx/enemies/4.png',
			enemy_4:   'assets/gfx/enemies/5.png',
			enemy_5:   'assets/gfx/enemies/6.png'
		}, create);
	}

	function reset() {
		timer = new Stopwatch();

		ctx.scale(zoom, zoom);

		player = {
			x: can.width / 4 - 5,
			y: can.height / 4 + 50,
			width: 10,
			height: 10,
			speed: 2.5,
			shot_timer: 0,
			can_shot: true,
			shots: []
		};

		fire_level = 1;
		score = 0;

		bonuses = [];
		explosions = [];
		enemies = [];
		enemies_shots = [];
		stars = [];

		resize();

	}

	var change_state = function(new_state) {
		cur_state = new_state;
	};

	function create() {
		aaa_ctx.drawImage(img.banner, 0, 0);

    var imageData = aaa_ctx.getImageData(0, 0, img.banner.width, img.banner.height);
    var data = imageData.data;

		for(var i = 0; i < data.length; i += 4) {
			if (data[i + 3] == 255) {
				data[i]     = 255;
				data[i + 1] = 255;
				data[i + 2] = 255;
			}
		}

		aaa_ctx.clearRect(0, 0, aaa.width, aaa.height);
		aaa_ctx.putImageData(imageData, 0, 0);

		resize();

		update();
	}

	function update() {
		timer.update();

		state[cur_state].update();

		mouse.update();

		requestAnimationFrame(update);
	}

	var state = {};

	state.menu = {};

	state.menu.update = function() {
		banner.zoom += 0.008;
		if (banner.zoom > 1)
			banner.zoom = 1;
		state.menu.draw();
	};

	state.menu.draw = function() {
		ctx.drawImage(img.bg, 0, 0);

		if (banner.zoom < 1) {
			ctx.save();
			ctx.translate(150 / 2, 80 / 2);
			ctx.scale(banner.zoom, banner.zoom);
			ctx.drawImage(aaa, 0, 0, 150, 80, -150 / 2, -80 / 2, 150, 80);
			ctx.restore();
		} else {
			ctx.drawImage(img.banner, 0, 0);
		}

		if (timer.time % 1000 >= 400) {
			ctx.fillStyle = rgb(255, 255, 255);
			ctx.textAlign = 'center';
			ctx.font = 'bold 12px Arial';
			ctx.fillText('Cliquez pour jouer', can.width / zoom / 2, 160);
		}

		if (mouse.down()) {
			change_state('game');
		}
	};

	state.game = {};

	state.game.update = function() {
		var shot, enemy, bonus, explosion, bg, star, i, j;

		if (Math.random() >= 0.98) {
			add_enemy(5 + Math.random() * (GAME_WIDTH - 5), -10);
		}

		player.x = Math.clamp(-player.width / 2,
			mouse.x / zoom - player.width / 2,
			GAME_WIDTH - player.width / 2);

		player.y = Math.clamp(-player.height / 2,
			mouse.y / zoom - player.height / 2,
			GAME_HEIGHT - player.width / 2);

		//player.x = mouse.x / zoom - player.width / 2;
		//player.y = mouse.y / zoom - player.height / 2;

		if (Math.random() >= 0.95) {
			add_star();
		}

		if (mouse.down(Key.SPACE)) {
			if (player.can_shot) {
				switch (fire_level) {
					case 1:
						add_player_shot(player.x + 4, player.y, 0);
						break;

					case 2:
						add_player_shot(player.x, player.y, 0);
						add_player_shot(player.x + 8, player.y, 0);
						break;

					case 3:
						[-0.5, 0, 0.5].forEach(function(val) {
							add_player_shot(player.x + 4, player.y, val);
						});
						break;

					case 4:
						[-0.4, -0.1, 0.1, 0.4].forEach(function(val) {
							add_player_shot(player.x + 4, player.y, val);
						});
						break;

					case 5:
						[-1, -0.5, 0, 0.5, 1].forEach(function(val) {
							add_player_shot(player.x + 4, player.y, val);
						});
						break;

					case 6:
						[-1.5, -1, -0.5, 0, 0.5, 1, 1.5].forEach(function(val) {
							add_player_shot(player.x + 4, player.y, val);
						});
						break;
				}

				player.can_shot   = false;
				player.shot_timer = 200;
			}
		}

		if (!player.can_shot && player.shot_timer > 0) {
			player.shot_timer -= timer.dt;

			if (player.shot_timer <= 0) {
				player.can_shot = true;
			}
		}

		i = player.shots.length;
		while (i--) {
			shot = player.shots[i];

			shot.y -= shot.speed;
			shot.x -= shot.angle;

			if (shot.y <= -shot.h) {
				player.shots.splice(i, 1);
			}

			j = enemies.length;
			while (j--) {
				enemy = enemies[j];

				if (box_hit_box(shot, enemy)) {
					add_explosion(Math.round(enemy.x), Math.round(enemy.y));
					enemy.life--;
					score++;

					if (Math.random() >= 0.926) {
						add_bonus(enemy.x, enemy.y);
					}

					if (enemy.life <= 0) {
						enemies.splice(j, 1);
					}

					player.shots.splice(i, 1);
				}
			}
		}

		i = enemies_shots.length;
		while (i--) {
			shot = enemies_shots[i];

			shot.x -= shot.angle;
			shot.y -= shot.speed;

			if (shot.y > (can.height / zoom) + shot.h) {
				enemies_shots.splice(i, 1);
			}

			if (box_hit_box(shot, player)) {
				score--;

				if (fire_level > 1) {
					fire_level--;
				} else {
					change_state('game_over');
				}
			}
		}

		i = enemies.length;
		while (i--) {
			enemy = enemies[i];

			enemy.y += enemy.speed;

			enemy.count += 0.04;
			enemy.x      = enemy.bx + (Math.sin(enemy.count) * 14);

			if (Math.random() >= 0.988) {
				switch (fire_level) {
					case 1:
						add_enemy_shot(enemy.x + 4, enemy.y, 0);
						break;

					case 2:
						add_enemy_shot(enemy.x, enemy.y, 0);
						add_enemy_shot(enemy.x + 8, enemy.y, 0);
						break;

					case 3:
						[-0.5, 0, 0.5].forEach(function(val) {
							add_enemy_shot(enemy.x + 4, enemy.y, val);
						});
						break;

					case 4:
						[-0.4, -0.1, 0.1, 0.4].forEach(function(val) {
							add_enemy_shot(enemy.x + 4, enemy.y, val);
						});
						break;

					case 5:
						[-1, -0.5, 0, 0.5, 1].forEach(function(val) {
							add_enemy_shot(enemy.x + 4, enemy.y, val);
						});
						break;

					case 6:
						[-1.5, -1, -0.5, 0, 0.5, 1, 1.5].forEach(function(val) {
							add_enemy_shot(enemy.x + 4, enemy.y, val);
						});
						break;
				}
			}

			if (box_hit_box(enemy, player)) {
				change_state('game_over');
			}

			if (enemy.y >= (can.height / zoom) + enemy.height) {
				enemies.splice(i, 1);
			}
		}

		i = bonuses.length;
		while (i--) {
			bonus = bonuses[i];

			bonus.y += bonus.speed;

			if (box_hit_box(player, bonus)) {
				bonuses.splice(i, 1);
				score++;

				if (fire_level < MAX_FIRE_LEVEL) {
					fire_level++;
				}
			}
		}

		i = explosions.length;
		while (i--) {
			explosion = explosions[i];

			explosion.t -= timer.dt;

			if (explosion.t <= 0) {
				explosion.b++;
				explosion.t = explosion.bt;
			}

			if (explosion.b > 4) {
				explosions.splice(i, 1);
			}
		}

		i = stars.length;
		while (i--) {
			star = stars[i];

			star.y += star.speed;

			if (star.y - img['star' + star.type].height > GAME_HEIGHT) {
				stars.splice(i, 1);
			}
		}

		state.game.draw();
	};

	state.game.draw = function() {
		var shot, enemy, bonus, explosion, star, i;

		// Fond
		ctx.drawImage(img.bg, 0, 0);

		// Etoiles
		i = stars.length;
		while (i--) {
			star = stars[i];

			ctx.save();
			ctx.globalAlpha = star.alpha;

			ctx.drawImage(img['star' + star.type],
				star.x,
				star.y);

			ctx.restore();
		}

		// Tirs du joueurs
		i = player.shots.length;
		while (i--) {
			shot = player.shots[i];

			ctx.drawImage(img.fire1,
				shot.x,
				shot.y);
		}

		// Vaisseau du joueur
		ctx.drawImage(img.player,
			player.x,
			player.y);

		// Ennemis
		i = enemies.length;
		while (i--) {
			enemy = enemies[i];

			ctx.drawImage(img['enemy_' + enemy.t],
				enemy.x,
				enemy.y);
		}

		// Tirs ennemis
		i = enemies_shots.length;
		while (i--) {
			shot = enemies_shots[i];

			ctx.drawImage(img.fire1,
				shot.x,
				shot.y);
		}

		// Bonus
		i = bonuses.length;
		while (i--) {
			bonus = bonuses[i];

			ctx.drawImage(img.bonus,
				bonus.x,
				bonus.y);
		}

		// Explosion
		i = explosions.length;
		while (i--) {
			explosion = explosions[i];

			ctx.drawImage(img.explosion,
				explosion.b * explosion.width,
				0,
				explosion.width,
				explosion.height,
				explosion.x,
				explosion.y,
				explosion.width,
				explosion.height
			);
		}

		// Score
		ctx.fillStyle = rgb(255, 255, 255);
		ctx.textAlign = 'center';
		ctx.font = 'normal 12px Arial';
		ctx.fillText(score.toString(), GAME_WIDTH / 2, 14);
	};

	state.game_over = {};

	state.game_over.update = function() {
		state.game_over.draw();
	};

	state.game_over.draw = function() {
		ctx.clearRect(0, 0, can.width / zoom, can.height / zoom);

		ctx.drawImage(img.bg, 0, 0);

		ctx.fillStyle = rgb(255, 255, 255);
		ctx.textAlign = 'center';
		ctx.font = 'normal 12px Arial';
		ctx.fillText('Score : ' + score, can.width / zoom / 2, can.height / zoom - 10);

		if (timer.time % 1000 >= 400) {
			ctx.fillStyle = rgb(255, 255, 255);
			ctx.textAlign = 'center';
			ctx.font = 'bold 12px Arial';
			ctx.fillText('Cliquez pour rejouer', can.width / zoom / 2, 160);
		}

		if (mouse.press()) {
			reset();
			change_state('game');
		}
	};

	function add_player_shot(x, y, angle) {
		player.shots.push({
			x: x,
			y: y,
			angle: angle,
			speed: 3,
			width: 2,
			height: 6
		});
	};

	function add_enemy_shot(x, y, angle) {
		enemies_shots.push({
			x: x,
			y: y,
			angle: angle,
			speed: -3,
			width: 2,
			height: 6
		});
	};

	function add_explosion(x, y) {
		explosions.push({
			x: x,
			y: y,
			width: 10,
			height: 10,
			t: 150,
			bt: 150,
			b: 0
		});
	};

	function add_enemy(x, y) {
		var type_new  = Math.rand(0, 5);
		var new_enemy = type_enemies[type_new];

		enemies.push({
			x: x,
			y: y,
			bx: x,
			width: new_enemy.width,
			height: new_enemy.height,
			t: type_new,
			life: new_enemy.life,
			speed: new_enemy.speed,
			count: 0
		});
	};

	function add_bonus(x, y) {
		bonuses.push({
			x: x,
			y: y,
			speed: 0.5,
			width: 10,
			height: 10
		});
	};

	function add_star(x, y, type, alpha) {
		x    = x || Math.rand(0, GAME_WIDTH);
		y    = y || -20;
		type = type || Math.rand(1, 2);
		alpha = alpha || Math.random() / 2;
		speed = 1 + Math.random();

		stars.push({
			x: x,
			y: y,
			speed: speed,
			type: type,
			alpha: alpha
		});
	};

	function resize() {
		can.height = window.innerHeight;
		can.width  = can.height * .75;

		if (can.width >= window.innerWidth) {
			can.width = window.innerWidth;
			can.height = can.width * (1 + 1 / 3);
		}

		zoom = can.height / 200;

		ctx.scale(zoom, zoom);

		if (ctx.webkitImageSmoothingEnabled)
			ctx.webkitImageSmoothingEnabled = false;

		if (ctx.mozImageSmoothingEnabled)
			ctx.mozImageSmoothingEnabled = false;

		if (ctx.oImageSmoothingEnabled)
			ctx.oImageSmoothingEnabled = false;

		if (ctx.imageSmoothingEnabled)
			ctx.imageSmoothingEnabled = false;
	}

	init();

	window.onresize = resize;
})();
