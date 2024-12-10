/* Todo : grand nettoyage */

var G = {};

G.init = function() {
	var can = G.can, ctx = G.ctx, basesize = G.basesize, img = G.image, cam = G.camera, zoom = G.zoom;

	can.width  = cam.bw * basesize * zoom;
	can.height = cam.bh * basesize * zoom;

	if (ctx.mozImageSmoothingEnabled) {
		ctx.mozImageSmoothingEnabled = false;
	} else if (ctx.webkitImageSmoothingEnabled) {
		ctx.webkitImageSmoothingEnabled = false;
	}

	if (ctx.imageSmoothingEnabled) {
		ctx.imageSmoothingEnabled = false;
	}

	ctx.scale(zoom, zoom);

	G.buttons = document.querySelectorAll('[id^="select"]');

	for (var i in G.buttons) {
		G.buttons[i].onclick = function() {
			for (var j in G.buttons) {
				if (typeof G.buttons[j].getAttribute == 'function') {
					document.getElementById(G.buttons[j].getAttribute('data-tab')).style.display = 'none';

					G.buttons[j].className = '';
				}
			}

			document.getElementById(this.getAttribute('data-tab')).style.display = 'block';

			this.className = 'selected';

			G.selected_index = 0;
			G.selected_tab   = this.getAttribute('data-tab');
		};
	}

	G.image = preload_images(G.images, G.create);
};

G.create = function() {
	var img = G.image, can = G.can;

	G.can_tiles_back.width  = img.back.width;
	G.can_tiles_back.height = img.back.height;

	G.can_tiles_top.width  = img.top.width;
	G.can_tiles_top.height = img.top.height;

	var map = [], map_t = [];

	for (var x = 0 ; x < G.map_width ; x++) {
		map[x]   = [];
		map_t[x] = [];

		for (var y = 0 ; y < G.map_height ; y++) {
			map[x][y]   = 2;
			map_t[x][y] = 0;
		}
	}

	G.map   = map;
	G.map_t = map_t;

	G.update();
};

G.update = function() {
	G.mouse.update();
	G.mouse_tiles_back.update();
	G.mouse_tiles_top.update();
	G.key.update();

	if (G.mouse_tiles_back.down()) {
		G.selected_index = G.ctx_tiles_back.tile_from_position(
			G.image.back,
			G.basesize,
			G.basesize,
			G.mouse_tiles_back.x,
			G.mouse_tiles_back.y
		);
	}

	if (G.mouse_tiles_top.down()) {
		G.selected_index = G.ctx_tiles_top.tile_from_position(
			G.image.top,
			G.basesize,
			G.basesize,
			G.mouse_tiles_top.x,
			G.mouse_tiles_top.y
		);
	}

	if (G.mouse.down()) {
		var x = Math.floor((G.mouse.x - G.camera.x) / G.basesize / G.zoom);
		var y = Math.floor((G.mouse.y - G.camera.y) / G.basesize / G.zoom);

		switch (G.selected_tab) {
			case 'tab_back':
				G.map[x][y] = G.selected_index;
				break;

			case 'tab_top':
				G.map_t[x][y] = G.selected_index;
				break;
		}
	}

	G.draw();

	requestAnimationFrame(G.update);
};

G.draw = function() {
	var can = G.can, ctx = G.ctx, img = G.image, map = G.map, map_t = G.map_t, basesize = G.basesize,
	camera = G.camera;




	G.ctx_tiles_back.clearRect(0, 0, G.can_tiles_back.width, G.can_tiles_back.height);

	G.ctx_tiles_back.drawImage(img.back, 0, 0);

	var a = G.ctx_tiles_back.draw_image_index(img.back, G.basesize, G.basesize, G.selected_index, 0, 0, false);

	G.ctx_tiles_back.beginPath();
	G.ctx_tiles_back.rect(a.basex, a.basey, G.basesize, G.basesize);
	G.ctx_tiles_back.lineWidth = 2;
	G.ctx_tiles_back.strokeStyle = 'rgba(255, 0, 0, .8)';
	G.ctx_tiles_back.stroke();





	G.ctx_tiles_top.clearRect(0, 0, G.can_tiles_top.width, G.can_tiles_top.height);

	G.ctx_tiles_top.drawImage(img.top, 0, 0);

	var b = G.ctx_tiles_top.draw_image_index(img.top, G.basesize, G.basesize, G.selected_index, 0, 0, false);

	G.ctx_tiles_top.beginPath();
	G.ctx_tiles_top.rect(b.basex, b.basey, G.basesize, G.basesize);
	G.ctx_tiles_top.lineWidth = 2;
	G.ctx_tiles_top.strokeStyle = 'rgba(255, 0, 0, .8)';
	G.ctx_tiles_top.stroke();





	ctx.clearRect(0, 0, can.width, can.height);

	ctx.save();
	ctx.translate(camera.x, camera.y);

	var bx = Math.clamp(Math.floor(-camera.x / basesize), 0, G.map_width - camera.bw - 1);
	var by = Math.clamp(Math.floor(-camera.y / basesize), 0, G.map_height - camera.bh - 1);

	var my = Math.clamp(by + camera.bh + 1, 0, G.map_width);
	var mx = Math.clamp(bx + camera.bw + 1, 0, G.map_height);

	var tile, basex, basey;

	for (var x = bx ; x < mx ; x++) {
		for (var y = by ; y < my ; y++) {
			ctx.draw_image_index(
				img.back,
				basesize,
				basesize,
				map[x][y],
				x * basesize,
				y * basesize
			);

			if (G.map_t[x][y]) {
				ctx.draw_image_index(
					img.top,
					basesize,
					basesize,
					map_t[x][y],
					x * basesize,
					y * basesize
				);
			}

			ctx.save();
				ctx.shadowColor = rgb(255, 255, 255);
				ctx.shadowBlur = 1;
				ctx.shadowOffsetX = 1;
				ctx.shadowOffsetY = 1;

				if (G.map_events['e' + x + ';' + y]) {
					ctx.beginPath();
					ctx.rect(x * basesize, y * basesize, basesize, basesize);
					ctx.lineWidth = 1;
					ctx.strokeStyle = 'rgba(0, 0, 255, .8)';
					ctx.stroke();

					ctx.font = 'normal 5px Consolas';
					ctx.fillText(x, x * basesize + 1, y * basesize + 5);
					ctx.fillText(y, x * basesize + 1, y * basesize + 10);
				}

				if (G.map_events['a' + x + ';' + y]) {
					ctx.beginPath();
					ctx.rect(x * basesize, y * basesize, basesize, basesize);
					ctx.lineWidth = 1;
					ctx.strokeStyle = 'rgba(255, 0, 0, .8)';
					ctx.stroke();

					ctx.font = 'normal 5px Consolas';
					ctx.fillText(x, x * basesize + 1, y * basesize + 5);
					ctx.fillText(y, x * basesize + 1, y * basesize + 10);
				}
			ctx.restore();
		}
	}

	if (G.cur_action == 'add_onenter') {
		var x = Math.floor(G.mouse.x / G.basesize / G.zoom) * basesize;
		var y = Math.floor(G.mouse.y / G.basesize / G.zoom) * basesize;

		ctx.beginPath();
		ctx.rect(x, y, G.basesize, G.basesize);
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'rgba(0, 0, 255, .8)';
		ctx.stroke();

		if (G.mouse.down()) {
			G.map_events['e' + (x / basesize) + ';' + (y / basesize)] = function() {};
			G.cur_action = '';
			G.list_evs_onenter.update();
		}
	}

	if (G.cur_action == 'add_onaction') {
		var x = Math.floor(G.mouse.x / G.basesize / G.zoom) * basesize;
		var y = Math.floor(G.mouse.y / G.basesize / G.zoom) * basesize;

		ctx.beginPath();
		ctx.rect(x, y, G.basesize, G.basesize);
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'rgba(255, 0, 0, .8)';
		ctx.stroke();

		if (G.mouse.down()) {
			G.map_events['a' + (x / basesize) + ';' + (y / basesize)] = function() {};
			G.cur_action = '';
			G.list_evs_onaction.update();
		}
	}



	ctx.restore();
};

G.open_map = function() {

};

G.save_map = function() {
};

G.can = document.getElementById('editor');
G.ctx = G.can.getContext('2d');

G.can_tiles_back = document.getElementById('tiles_back');
G.ctx_tiles_back = G.can_tiles_back.getContext('2d');

G.can_tiles_top = document.getElementById('tiles_top');
G.ctx_tiles_top = G.can_tiles_top.getContext('2d');

G.zoom = 2;
G.basesize = 16;

G.camera = {
	x:  0,
	y:  0,
	w:  0,
	h:  0,
	bw: 19,
	bh: 19
};

G.map   = [];
G.map_t = [];

G.map_width = 20;
G.map_height = 20;

G.selected_index = 0;
G.selected_tab   = 'tiles_back';

G.cur_action = '';

G.images = {
	back: '../../game/gfx/back.png',
	top:  '../../game/gfx/top.png'
};

G.buttons = [];

G.image = {};

G.mouse = new Mouse(G.can);
G.can.onmouseup = G.mouse.onmouseup;
G.can.onmousedown = G.mouse.onmousedown;
G.can.onmousemove = G.mouse.onmousemove;

G.mouse_tiles_back = new Mouse(G.can_tiles_back);
G.can_tiles_back.onmouseup   = G.mouse_tiles_back.onmouseup;
G.can_tiles_back.onmousedown = G.mouse_tiles_back.onmousedown;
G.can_tiles_back.onmousemove = G.mouse_tiles_back.onmousemove;

G.mouse_tiles_top = new Mouse(G.can_tiles_top);
G.can_tiles_top.onmouseup   = G.mouse_tiles_top.onmouseup;
G.can_tiles_top.onmousedown = G.mouse_tiles_top.onmousedown;
G.can_tiles_top.onmousemove = G.mouse_tiles_top.onmousemove;

G.key = new Keyboard();
document.onkeyup = G.key.onkeyup;
document.onkeydown = G.key.onkeydown;

G.map_events = {};

G.btn_map_valid = document.getElementById('btn_map_valid');
G.btn_map_valid.onclick = function() {

};

G.btn_map_save = document.getElementById('btn_map_save');
G.btn_map_save.onclick = function() {
	var can_back = document.getElementById('save_map_back');
	var ctx_back = can_back.getContext('2d');

	var can_top = document.getElementById('save_map_top');
	var ctx_top = can_top.getContext('2d');

	var hexToRGB = function(hex){
		var r = hex >> 16;
		var g = hex >> 8 & 0xFF;
		var b = hex & 0xFF;

		return [r, g, b];
	}

	can_back.width = G.map_width;
	can_back.height = G.map_height;

	can_top.width = G.map_width;
	can_top.height = G.map_height;

	for (var x = 0 ; x < G.map_width ; x++) {
		for (var y = 0 ; y < G.map_height ; y++) {
			var color   = hexToRGB(G.map[x][y]);
			var color_t = hexToRGB(G.map_t[x][y]);

			ctx_back.fillStyle = 'rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')';
			ctx_back.fillRect(x, y, 1, 1);

			ctx_top.fillStyle = 'rgb(' + color_t[0] + ', ' + color_t[1] + ', ' + color_t[2] + ')';
			ctx_top.fillRect(x, y, 1, 1);
		}
	}
};

G.btn_add_onenter = document.getElementById('btn_add_onenter');
G.btn_add_onenter.onclick = function() {
	G.cur_action = 'add_onenter';
};

G.btn_delete_onenter = document.getElementById('btn_delete_onenter');
G.btn_delete_onenter.onclick = function() {

};

G.btn_add_onaction = document.getElementById('btn_add_onaction');
G.btn_add_onaction.onclick = function() {
	G.cur_action = 'add_onaction';
};

G.btn_delete_onaction = document.getElementById('btn_delete_onaction');
G.btn_delete_onaction.onclick = function() {

};

G.list_evs_onenter  = document.getElementById('list_evs_onenter');
G.list_evs_onenter.update = function() {
	this.innerHTML = '';

	for (var i in G.map_events) {
		if (i.charAt(0) == 'e') {
			this.innerHTML += '<strong>' + i + '</strong><li><textarea></textarea></li>';
		}
	}
};

G.list_evs_onaction = document.getElementById('list_evs_onaction');
G.list_evs_onaction.update = function() {
	this.innerHTML = '';

	for (var i in G.map_events) {
		if (i.charAt(0) == 'a') {
			this.innerHTML += '<strong>' + i + '</strong><li><textarea></textarea></li>';
		}
	}
};
