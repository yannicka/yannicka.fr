var can,
	ctx;

function init() {
	can = document.getElementById('test');
	ctx = can.getContext('2d');

	can.width  = 400;
	can.height = 400;

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
	ctx.fillStyle = rgb(128, 128, 128);
	ctx.fillRect(0, 0, can.width, can.height);
}

init();
