window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame        ||
		  window.webkitRequestAnimationFrame ||
		  window.mozRequestAnimationFrame    ||
		  window.oRequestAnimationFrame      ||
		  window.msRequestAnimationFrame     ||
		  function (callback){ window.setTimeout(callback, 1000 / 60); };
})();

var SIZE_WIDTH  = 59;
var SIZE_HEIGHT = 31;
var SIZE_PIXEL  = 10;

var can = document.getElementById('game');
var ctx = can.getContext('2d');

var p1   = { x: 1, y: 1, w: 1, h: 5 };
var p2   = { x: SIZE_WIDTH - 2, y: 20, w: 1, h: 5 };
var ball = { x: Math.floor(SIZE_WIDTH / 2), y: Math.floor(SIZE_HEIGHT / 2), w: 1, h: 1, dirX: 1, dirY: 1 };

var keys = [];

var state = 'menu';

var scoreP1 = 0;
var scoreP2 = 0;

var clignote      = 0;
var choosePlayers = ['Demo', '1 player', '2 players'];
var chooseAcutal  = 0;
var nbPlayers     = 1;

function create() {
	can.width  = SIZE_WIDTH  * SIZE_PIXEL;
	can.height = SIZE_HEIGHT * SIZE_PIXEL;

	update();
}

function update() {
	if (state == 'menu') {
		if (keys[13]) { state = 'choose'; keys[13] = false; }
	} else if (state == 'choose') {
		if (keys[40] && chooseAcutal < choosePlayers.length - 1) { chooseAcutal++; keys[40] = false; }
		if (keys[38] && chooseAcutal > 0) { chooseAcutal--; keys[38] = false; }
		if (keys[13]) { nbPlayers = chooseAcutal; state = 'game'; }
	} else if (state == 'game') {
		if (keys[40]) { p1.y += 0.2; }
		if (keys[38]) { p1.y -= 0.2; }

		if (p1.y > SIZE_HEIGHT - p1.h) { p1.y = SIZE_HEIGHT - p1.h; }
		if (p1.y < 0) { p1.y = 0; }

		if (p2.y > SIZE_HEIGHT - p2.h) { p2.y = SIZE_HEIGHT - p2.h; }
		if (p2.y < 0) { p2.y = 0; }

		if (hitBoxBox(ball, p1)) {
			if (ball.y > p1.y + (p1.h / 2)) { ball.dirY = 1; }
			if (ball.y < p1.y + (p1.h / 2)) { ball.dirY = -1; }

			ball.dirX = 1;
		}

		if (hitBoxBox(ball, p2)) {
			if (ball.y > p2.y + (p2.h / 2)) { ball.dirY = 1; }
			if (ball.y < p2.y + (p2.h / 2)) { ball.dirY = -1; }

			ball.dirX = -1;
		}

		if (ball.y >= SIZE_HEIGHT) { ball.dirY = -1; }
		if (ball.y <= 0) { ball.dirY = 1; }

		if (ball.x > SIZE_WIDTH) {
			ball.x = Math.floor(SIZE_WIDTH / 2);
			ball.y = Math.floor(SIZE_HEIGHT / 2);
			ball.dirX = -1;
			scoreP1++;
		}

		if (ball.x < 0) {
			ball.x = Math.floor(SIZE_WIDTH / 2);
			ball.y = Math.floor(SIZE_HEIGHT / 2);
			ball.dirX = 1;
			scoreP2++;
		}

		ball.x += ball.dirX * 0.3;
		ball.y += ball.dirY * 0.3;

		if (nbPlayers == 0) {
			var a = 0;

			if (ball.y + Math.round(ball.w / 2) > p1.y) { a = 0.2; }
			if (ball.y - Math.round(ball.w / 2) < p1.y) { a = -0.2; }

			p1.y += a;

			a = 0;

			if (ball.y + Math.round(ball.w / 2) > p2.y) { a = 0.2; }
			if (ball.y - Math.round(ball.w / 2) < p2.y) { a = -0.2; }

			p2.y += a;
		} else if (nbPlayers == 1) {
			var a = 0;

			if (ball.y + Math.round(ball.w / 2) > p2.y) { a = 0.2; }
			if (ball.y - Math.round(ball.w / 2) < p2.y) { a = -0.2; }

			p2.y += a;
		} else if (nbPlayers == 2) {
			if (keys[90] || keys[109]) { p2.y -= 0.2; }
			if (keys[83] || keys[107]) { p2.y += 0.2; }
		}
	}

	draw();

	requestAnimFrame(update);
}

function draw() {
	if (state == 'menu') {
		ctx.fillStyle = 'rgb(0, 0, 0)';
		ctx.fillRect(0, 0, can.width, can.height);

		clignote++;

		if (clignote < 40) {
			ctx.fillStyle = 'rgb(255, 255, 255)';
			ctx.font = '44px Fixedsys';
			ctx.textAlign = 'center';
			ctx.fillText('Insert coin to play', can.width / 2, can.height / 2);
		} else if (clignote > 80) { clignote = 0; }
	} else if (state == 'choose') {
		ctx.fillStyle = 'rgb(0, 0, 0)';
		ctx.fillRect(0, 0, can.width, can.height);
		ctx.textAlign = 'left';

		for (var i = 0 ; i < choosePlayers.length ; i++) {
			ctx.fillStyle = 'rgb(255, 255, 255)';
			ctx.font = '44px Fixedsys';

			if (chooseAcutal == i) {
				ctx.fillText('> ', can.width / 2 - 100, can.height / 2 + (i * 46) - 15);
			}

			ctx.fillText(choosePlayers[i], can.width / 2 - 70, can.height / 2 + (i * 46) - 15);
		}
	} else if (state == 'game') {
		ctx.fillStyle = 'rgb(0, 0, 0)';
		ctx.fillRect(0, 0, can.width, can.height);

		ctx.fillStyle = 'rgb(255, 255, 255)';

		for (var i = 0 ; i < SIZE_HEIGHT ; i += 2) {
			ctx.fillRect(Math.floor(SIZE_WIDTH / 2) * SIZE_PIXEL, i * SIZE_PIXEL, 1 * SIZE_PIXEL, 1 * SIZE_PIXEL);
		}

		ctx.fillRect(Math.floor(p1.x) * SIZE_PIXEL, Math.floor(p1.y) * SIZE_PIXEL, p1.w * SIZE_PIXEL, p1.h * SIZE_PIXEL);
		ctx.fillRect((Math.floor(p2.x) * SIZE_PIXEL) - ((p2.w - 1) * SIZE_PIXEL), Math.floor(p2.y) * SIZE_PIXEL, p2.w * SIZE_PIXEL, p2.h * SIZE_PIXEL);
		ctx.fillRect(Math.floor(ball.x) * SIZE_PIXEL, Math.floor(ball.y) * SIZE_PIXEL, ball.w * SIZE_PIXEL, ball.h * SIZE_PIXEL);
	
		ctx.font = '42px Fixedsys';
		ctx.textAlign = 'right';
		ctx.fillText(scoreP1, 26 * SIZE_PIXEL, 4 * SIZE_PIXEL);
		ctx.textAlign = 'left';
		ctx.fillText(scoreP2, 32 * SIZE_PIXEL, 4 * SIZE_PIXEL);
	}
}

function hitBoxBox(box1, box2) {
	return !(box1.y + box1.h < box2.y || box1.y > box2.y + box2.h || box1.x + box1.w < box2.x || box1.x > box2.x + box2.w);
}

document.onkeydown = function(e) { keys[e.keyCode] = true; }

document.onkeyup = function(e) { keys[e.keyCode] = false; }

create();
