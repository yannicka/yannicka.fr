(function() {
	var VERSION          = '0.1.0',
		PI_180             = Math.PI / 180,
		TIME_BETWEEN_PIPES = 1050,
		GRAVITY            = 0.7,
		MAX_GRAVITY        = 10,
		PIPE_SPEED         = 3.4;

	var can, ctx, state, cur_state,
		mouse, kb, touch, timer, img,
		bird, pipes, ground, bg,
		score;

	function init() {
		can = document.getElementById('game');
		ctx = can.getContext('2d');

		can.width = 360;
		can.height = 480;

		bird = {
			x: 80,
			y: 100,
			r: 10, // rayon
			width: 0, // largeur
			height: 0, // hauteur
			mwidth: 0, // moitié de la largeur
			mheight: 0, // moitié et la hauteur
			dy: 0, // vélocité y
			angle: 0,
			frame: 0, // frame courante
			iframe: 0, // compteur pour évaluer la frame courante
			nb_frames: 3
		};

		mouse = new Mouse(can);
		kb = new Keyboard();
		touch = new Finger();

		timer = new Stopwatch();

		time_before_pipe = 0;

		score = {
			value: 0,
			x: can.width / 2,
			y: 50
		};

		pipes = [];

		ground = {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		};

		bg = {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		};

		cur_state = 'menu';

		img = preload_images({
			'bird': 'birdx2,5.png',
			'pipe': 'pipex2.png',
			'pipe_end': 'pipe_endx2.png',
			'ground': 'groundx2.png',
			'bg': 'bgx2.png',
			'btn_play': 'btn_playx2.png',
			'btn_replay': 'btn_replayx2.png',
			'btn_share': 'btn_sharex2.png',
			'pif_bird': 'pif_bird.png'
		}, create);
	}

	function reset() {
		bird.x = 80;
		bird.y = 100;
		bird.dy = 0;
		bird.angle = 0;
		bird.frame = 0;
		bird.iframe = 0;

		time_before_pipe = 0;

		score.value = 0;

		pipes = [];
	}

	function create() {
		bird.width  = img.bird.width / bird.nb_frames;
		bird.height = img.bird.height;
		bird.mwidth = bird.width / 2;
		bird.mheight = bird.height / 2;

		ground.width = img.ground.width;
		ground.height = img.ground.height;
		ground.y = can.height - ground.height

		bg.y = can.height - img.ground.height - img.bg.height,
		bg.width = can.width,
		bg.height = img.bg.height;

		update();
	}

	function update() {
		state[cur_state].update();

		timer.update();
		mouse.update();
		kb.update();

		requestAnimationFrame(update);
	}

	var state = {};

	state.menu = {};

	state.menu.update = function() {
		if (mouse.release()) {
			if (mouse.x > can.width / 2 - img.btn_play.width / 2 &&
				mouse.x <= can.width / 2 - img.btn_play.width / 2 + img.btn_play.width &&
				mouse.y > can.height / 2 - img.btn_play.height / 2 &&
				mouse.y <= can.height / 2 - img.btn_play.height / 2 + img.btn_play.height
			) {
				cur_state = 'game';
			}
		}

		if (kb.press(Key.ENTER) || touch.press())
			cur_state = 'game';

		state.menu.draw();
	};

	state.menu.draw = function() {
		ctx.clearRect(0, 0, can.width, can.height);

		ctx.fillStyle = 'rgb(113, 197, 207)';
		ctx.fillRect(0, 0, can.width, can.height);

		ctx.drawImage(img.pif_bird,
			can.width / 2 - img.pif_bird.width / 2,
			can.height / 2 - img.pif_bird.height / 2 - 120);

		ctx.drawImage(img.btn_play,
			can.width / 2 - img.btn_play.width / 2,
			can.height / 2 - img.btn_play.height / 2);
	};

	state.game_over = {};

	state.game_over.update = function() {
		if (mouse.release()) {
			if (mouse.x > can.width / 2 - img.btn_replay.width / 2 &&
				mouse.x <= can.width / 2 - img.btn_replay.width / 2 + img.btn_replay.width &&
				mouse.y > can.height / 2 - img.btn_replay.height / 2 &&
				mouse.y <= can.height / 2 - img.btn_replay.height / 2 + img.btn_replay.height
			) {
				reset();
				cur_state = 'game';
			} else if (mouse.x > can.width / 2 - img.btn_replay.width / 2 &&
				mouse.x <= can.width / 2 - img.btn_replay.width / 2 + img.btn_replay.width &&
				mouse.y > can.height / 2 - img.btn_replay.height / 2 + 32 &&
				mouse.y <= can.height / 2 - img.btn_replay.height / 2 + 32 + img.btn_replay.height
			) {
				window.location.href = 'http://twinoid.com/fr/tid/nexus?t=J%27ai+fait+un+score+de+**' + score.value + '**+sur+[link%3Dhttps%3A%2F%2Faylab.bitmycode.com%2Fweb%2Fexperiments%2Fpif_bird%2F]Pif+Bird[%2Flink]+%3A%29';
			}
		}

		if (kb.press(Key.ENTER) || kb.press(Key.SPACE) || touch.press()) {
			reset();
			cur_state = 'game';
		}

		state.game_over.draw();
	};

	state.game_over.draw = function() {
		ctx.clearRect(0, 0, can.width, can.height);

		ctx.fillStyle = 'rgb(113, 197, 207)';
		ctx.fillRect(0, 0, can.width, can.height);

		ctx.drawImage(img.btn_replay,
			can.width / 2 - img.btn_replay.width / 2,
			can.height / 2 - img.btn_replay.height / 2);

		ctx.drawImage(img.btn_share,
			can.width / 2 - img.btn_replay.width / 2,
			can.height / 2 - img.btn_replay.height / 2 + 32);

		ctx.textAlign = 'center';
		ctx.fillStyle = 'rgb(255, 255, 255)';
		ctx.strokeStyle = 'rgb(0, 0, 0)';
		ctx.font = 'normal 42px Calibri';
		ctx.lineWidth = 4;

		ctx.strokeText(score.value, can.width / 2, 50);
		ctx.fillText(score.value, can.width / 2, 50);
	};

	state.game = {};

	state.game.update = function() {
		var pipe, i;

		bird.dy += GRAVITY;
		bird.angle += GRAVITY * 2.5;

		if (bird.dy > MAX_GRAVITY)
			bird.dy = MAX_GRAVITY;

		if (bird.y < 0)
			bird.dy = 1;

		if (bird.angle > 90)
			bird.angle = 90;

		bird.y += bird.dy;

		bird.iframe += timer.dt;

		if (bird.iframe > 80) {
			bird.iframe = 0;
			bird.frame++;
		}

		if (bird.frame > bird.nb_frames - 1)
			bird.frame = 0;

		if (mouse.press() || kb.press(Key.ENTER) || kb.press(Key.SPACE) || touch.press()) {
			bird.angle = -34;
			bird.dy = -10;
		}

		i = pipes.length;

		ground.x -= 3.4;

		if (ground.x < -can.width)
			ground.x = 0;

		while (i--) {
			pipe = pipes[i];

			pipe.x -= PIPE_SPEED;

			if (box_hit_circle(pipe, bird) || box_hit_circle({
					x: pipe.x,
					y: pipe.y + pipe.height + 120,
					width: pipe.width,
					height: can.height - pipe.height - 180
				}, bird) || box_hit_circle({
					x: 0,
					y: can.height - 60,
					width: can.width,
					height: 60
				}, bird)
			) {
				cur_state = 'game_over';
			}

			if (bird.x - pipe.x > 0 && !pipe.crossing) {
				pipe.crossing = true;
				score.value++;
			}

			if (pipe.x < -pipe.width)
				pipes.splice(i, 1);
		}

		time_before_pipe -= timer.dt;

		if (time_before_pipe < 0) {
			pipes.push({
				x: can.width,
				y: 0,
				width: 60,
				height: Math.random() * 200 + 65,
				crossing: false
			});

			time_before_pipe = TIME_BETWEEN_PIPES;
		}

		state.game.draw();
	};

	state.game.draw = function() {
		var pipe, i;

		ctx.clearRect(0, 0, can.width, can.height);

		// Ciel
		ctx.fillStyle = 'rgb(113, 197, 207)';
		ctx.fillRect(0, 0, can.width, can.height);

		// Sol
		ctx.drawImage(img.ground,
			ground.x,
			ground.y);

		ctx.drawImage(img.ground,
			ground.x + ground.width,
			ground.y);

		// Décoration de fond (immeubles, nuages et sommets)
		ctx.drawImage(img.bg,
			bg.x,
			bg.y,
			bg.width,
			bg.height);

		// Tuyaux
		i = pipes.length;
		while (i--) {
			pipe = pipes[i];

			// Tuyau haut
			ctx.drawImage(img.pipe,
				pipe.x,
				pipe.y,
				pipe.width,
				pipe.height);

			// Bout du tuyau haut
			ctx.drawImage(img.pipe_end,
				pipe.x - 2,
				pipe.y + pipe.height - img.pipe_end.height,
				pipe.width + 4,
				img.pipe_end.height);

			// Tuyau bas
			ctx.drawImage(img.pipe,
				pipe.x,
				pipe.y + pipe.height + 120,
				pipe.width,
				can.height - pipe.height - 180);

			ctx.save();
			ctx.translate(pipe.x - 2, pipe.y + pipe.height + 120 + img.pipe_end.height);
			ctx.scale(1, -1);

			// Bout du tuyau bas
			ctx.drawImage(img.pipe_end,
				0,
				0,
				pipe.width + 4,
				img.pipe_end.height);

			ctx.restore();
		}

		// Oiseau
		ctx.save();
		ctx.translate(bird.x, bird.y);
		ctx.rotate(bird.angle * PI_180);

		ctx.drawImage(img.bird,
			bird.frame * bird.width,
			0,
			bird.width,
			bird.height,
			-bird.mwidth,
			-bird.mheight,
			bird.width,
			bird.height);

		ctx.restore();

		// Score
		ctx.textAlign = 'center';
		ctx.fillStyle = 'rgb(255, 255, 255)';
		ctx.strokeStyle = 'rgb(0, 0, 0)';
		ctx.font = 'normal 42px Calibri';
		ctx.lineWidth = 4;

		ctx.strokeText(score.value, score.x, score.y);
		ctx.fillText(score.value, score.x, score.y);
	};

	init();
})();
