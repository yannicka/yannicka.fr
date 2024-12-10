function newImage(data) {
	var tmp = new Image();

	for (var i in data) {
		tmp[i] = data[i];
	}

	return tmp;
}

function PreloadManager(images, image, callback) {
	var nbImgsLoaded = 0;
	var nbImgsToLoad = Object.keys(images).length;
	var i            = null;

	function imgLoaded() {
		nbImgsLoaded += 1;
	}

	for (i in images) {
		image[i] = newImage({
			onload: imgLoaded,
			src:    images[i]
		});
	}

	function preload() {
		if (nbImgsLoaded == nbImgsToLoad) {
			callback();
		} else {
			setTimeout(preload, 100);
		}
	}

	preload();
}

(function() {
	var G = {};

	G.init = function() {
		G.can.width  = 662;
		G.can.height = 224;

		PreloadManager(G.images, G.image, G.create);
	};

	G.create = function() {
		G.update();
	};

	G.update = function() {
		var can = G.can, ctx = G.ctx, stick = G.stick, pinata = G.pinata;

		/* Bâton
		--------- */
		if (stick.angle < -130 && stick.speed != 3) {
			stick.speed = 4;
		}

		if (stick.angle > 40 && stick.speed != 0) {
			stick.speed = 0;
		}

		stick.rotate.x = stick.x + stick.w;
		stick.rotate.y = stick.y + stick.h;
		stick.angle   += stick.speed;

		/* Piñata
		---------- */
		pinata.i++;
		pinata.speed -= pinata.slow;
		pinata.angle  = Math.sin(pinata.i / 50) * pinata.speed;

		if (pinata.touchable !== true) {
			pinata.touchable -= 16.5; // timer.dt

			if (pinata.touchable <= 0) {
				pinata.touchable = true;
			}
		}

		if (G.test_collide()) {
			pinata.i         = Math.PI;
			pinata.speed    += Math.max(0, pinata.angle) + 20;
			pinata.touchable = 200;

			if (pinata.speed > 150) {
				pinata.speed = 150;
			}
		}

		G.draw();
		requestAnimationFrame(G.update);
	};

	G.draw = function() {
		var can = G.can, ctx = G.ctx, stick = G.stick, pinata = G.pinata, img = G.image;

		ctx.clearRect(0, 0, can.width, can.height);

		ctx.drawImage(img.bg, 0, 0);

		/* Joueur
		---------- */
		ctx.drawImage(img.player, 340, 100);

		/* Bâton
		--------- */
		ctx.save();
		ctx.translate(stick.rotate.x, stick.rotate.y);
		ctx.rotate(stick.angle * Math.PI / 180);
			ctx.drawImage(img.stick, 0 - (stick.w / 2), 0 - stick.h);
		ctx.restore();

		/* Piñata
		---------- */
		ctx.save();
		ctx.translate(pinata.rotate.x, pinata.rotate.y);
		ctx.rotate(pinata.angle * Math.PI / 180);
			ctx.fillStyle = 'rgb(20, 160, 180)';
			ctx.drawImage(img.pinata, pinata.x - pinata.w, pinata.y - pinata.h);
		ctx.restore();

		/* Debug
		--------- */
		if (G.debug) {
			ctx.fillStyle = 'rgb(255, 0, 0)';
			ctx.fillRect(pinata.rotate.x, pinata.rotate.y, 2, 2);



			ctx.beginPath();
			ctx.arc(
				Math.sin(pinata.angle * Math.PI / 180) * -(pinata.x + (pinata.w * 1.78)) + pinata.rotate.x,
				Math.cos(pinata.angle * Math.PI / 180) * (pinata.y - (pinata.h / 2)) + pinata.rotate.y,
				pinata.radius, 0, 2 * Math.PI, false);
			ctx.lineWidth = 1;
			ctx.strokeStyle = 'rgb(40, 40, 40)';
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(
				Math.sin(stick.angle * Math.PI / 180) * (stick.x / 2) + stick.rotate.x - (stick.w / 2),
				50/*Math.cos(stick.angle * Math.PI / 180) * (stick.y / 2) + stick.rotate.y - stick.h*/,
				stick.radius, 0, 2 * Math.PI, false);
			ctx.lineWidth = 1;
			ctx.strokeStyle = 'rgb(40, 40, 40)';
			ctx.stroke();

			ctx.fillStyle = 'rgb(255, 0, 0)';
			ctx.fillRect(stick.x, stick.y, 2, 2);
		}


		/*ctx.beginPath();
		ctx.moveTo(pinata.rotate.x, pinata.rotate.y);
		ctx.lineTo(pinata.rotate.x + pinata.x *, pinata.rotate.y + pinata.y);
		ctx.lineWidth = 1;
		ctx.fillStyle = 'rgb(128, 128, 128)';
		ctx.stroke();*/
	};

	G.can = document.getElementById('game');
	G.ctx = G.can.getContext('2d');

	G.debug = false;

	G.can.onclick = function(e) {
		var stick = G.stick, pinata = G.pinata;

		if (stick.angle > -20) {
			if (stick.angle >= 40) {
				stick.angle = 39;
			}

			stick.speed = -12;
		}
	};

	G.test_collide = function() {
		var pinata = G.pinata, stick = G.stick;

		// Pinata
		var rx1 = Math.sin(pinata.angle * Math.PI / 180) * -(pinata.x + (pinata.w * 1.78)) + pinata.rotate.x;
		var ry1 = Math.cos(pinata.angle * Math.PI / 180) * (pinata.y - (pinata.h / 2)) + pinata.rotate.y;

		// Stick
		var rx2 = Math.sin(stick.angle * Math.PI / 180) * (stick.x / 2) + stick.rotate.x - (stick.w / 2);
		var ry2 = 50;

		var a  = pinata.radius + stick.radius;

		var dx = rx1 - rx2;
		var dy = ry1 - ry2;

		return a * a > (dx * dx + dy * dy) && pinata.touchable === true && stick.speed < 0;
	};

	G.stick = {
		x: 350,
		y: 30,
		w: 10,
		h: 120,
		angle: 40,
		speed: 0,
		radius: 5,
		rotate: {
			x: 0,
			y: 0
		}
	};

	G.pinata = {
		x: 50,
		y: 275,
		w: 100,
		h: 100,
		angle: 0,
		speed: 5,
		i: 0,
		slow: 0.02,
		radius: 50,
		touchable: true,
		rotate: {
			x: 250,
			y: -150
		}
	};

	G.images = {
		stick: 'stick.png',
		bg: 'bg.png', 
		pinata: 'pinata.png',
		player: 'player.png'
	};

	G.image = {};

	G.init();
})();
