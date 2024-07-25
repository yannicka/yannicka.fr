var G = {};

G.init = function() {
	G.can.width  = 640;
	G.can.height = 460;

	G.ctx.fillBackground(G.can, rgb(0, 0, 0));
	G.ctx.fillStyle = rgb(255, 255, 255);
	G.ctx.font      = 'normal 16px "Times New Roman", serif';
	G.ctx.textAlign = 'center';
	G.ctx.fillText('Loading game...', G.can.width / 2, G.can.height / 2);

	G.game.init();

	PreloadManager(G.images, G.image, G.create);
};

G.create = function() {
	G.update();
};

G.update = function() {
	G.timer.update();

	G[G.state].update();

	requestAnimFrame(G.update);
};

G.can = getById('game');
G.ctx = G.can.getContext('2d');

G.log = getById('log');

G.images = {
	bg:              'assets/gfx/bg.png',
	buildings:       'assets/gfx/buildings.png',
	pointer:         'assets/gfx/pointer.png',
	tool_bar:        'assets/gfx/tool_bar.png',
	building_choice: 'assets/gfx/building_choice.png',
	tooltip:         'assets/gfx/tooltip.png',
	buttons:         'assets/gfx/buttons.png',
	solider:         'assets/gfx/solider.png'
};
G.image = {};

G.camera = {
	x: 0,
	y: 0
};

G.timer = new TimerManager();

G.state = 'game';

G.change_state = function(newstate) {
	G.state = newstate;
};

document.onmousemove = function(e) {
	Mouse.x = e.pageX - G.can.offsetLeft;
	Mouse.y = e.pageY - G.can.offsetTop;
};
