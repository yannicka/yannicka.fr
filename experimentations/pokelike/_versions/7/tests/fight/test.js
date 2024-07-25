var can,
	ctx,
	player,
	enemy;

function init() {
	can = document.getElementById('test');
	ctx = can.getContext('2d');

	can.width  = 400;
	can.height = 300;

	player = {
		name: 'Player',
		life: 88,
		max_life: 88,
		level: 21
	};

	enemy = {
		name: 'Enemy',
		life: 72,
		max_life: 72,
		level: 22
	};

	create();
}

function create() {
	update();
}

function update() {
	draw();

	requestAnimationFrame(update);
}

function draw() {
	// Fond
	ctx.fillStyle = rgb(200, 240, 255);
	ctx.fillRect(0, 0, can.width, can.height);

	// Ennemi
	ctx.fillStyle = rgb(255, 0, 0);
	ctx.fillRect(310, 10, 60, 60);
	ctx.fillStyle = rgb(0, 0, 0);
	ctx.font = 'normal 14px Consolas';
	ctx.textAlign = 'left';
	ctx.fillText(enemy.name, 20, 20);
	ctx.textAlign = 'right';
	ctx.fillText('N.' + enemy.level, 120, 20);
	ctx.textAlign = 'left';
	ctx.fillText('Vie : ' + enemy.life + '/' + enemy.max_life, 20, 36);

	// Joueur
	ctx.fillStyle = rgb(0, 0, 255);
	ctx.fillRect(20, 180, 100, 100);
	ctx.fillStyle = rgb(0, 0, 0);
	ctx.font = 'normal 14px Consolas';
	ctx.textAlign = 'left';
	ctx.fillText(player.name, 200, 200);
	ctx.textAlign = 'right';
	ctx.fillText('N.' + player.level, 320, 200);
	ctx.textAlign = 'left';
	ctx.fillText('Vie : ' + player.life + '/' + player.max_life, 200, 216);

}

init();
