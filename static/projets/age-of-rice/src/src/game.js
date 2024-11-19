var G = {};

G.init = function() {
	G.can.width  = 640;
	G.can.height = 460;

	G.ctx.fillBackground(G.can, rgb(0, 0, 0));
	G.ctx.fillStyle = rgb(255, 255, 255);
	G.ctx.font      = 'normal 16px "Times New Roman", serif';
	G.ctx.textAlign = 'center';
	G.ctx.fillText('Loading game...', G.can.width / 2, G.can.height / 2);

	PreloadManager(G.images, G.image, G.create);
};

G.create = function() {
	G.map.width  = G.image.bg.width;
	G.map.height = G.image.bg.height;
	G.map.cols   = parseInt(G.map.width / G.map.zoom);
	G.map.lines  = parseInt(G.map.height / G.map.zoom);

	G.game.init();

	G.update();
};

G.update = function() {
	if (document.hasFocus()) {
		G.timer.update();
		G[G.state].update();
	}

	requestAnimFrame(G.update);
};

G.can = getById('game');
G.ctx = G.can.getContext('2d');

G.log = getById('log');

G.images = {
	bg:              'assets/gfx/bg.png',
	buildings:       'assets/gfx/buildings.png',
	pointers:        'assets/gfx/pointers.png',
	tool_bar:        'assets/gfx/tool_bar.png',
	tooltip:         'assets/gfx/tooltip.png',
	buttons:         'assets/gfx/buttons.png',
	blue_castle:     'assets/gfx/blue_castle.png',
	red_castle:      'assets/gfx/red_castle.png',
	start:           'assets/gfx/start.png',
	instructions:    'assets/gfx/instructions.png',
	victory:         'assets/gfx/victory.png',
	defeat:          'assets/gfx/defeat.png',
	units:           'assets/gfx/units.png'
};
G.image = {};

G.camera = {
	x: 0,
	y: 0
};

G.timer = new TimerManager();

G.state = 'start';

G.map = {
	zoom:   100,
	width:  0,
	height: 0,
	cells:  0,
	lines:  0
};

G.change_state = function(newstate) {
	G.state = newstate;
};

document.onmousemove = function(e) {
	Mouse.x = e.pageX - G.can.offsetLeft;
	Mouse.y = e.pageY - G.can.offsetTop;
};
