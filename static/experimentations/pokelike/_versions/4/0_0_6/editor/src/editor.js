var E = {};

E.init = function() {
	E.camera.w = E.camera.bw * E.basesize;
	E.camera.h = E.camera.bh * E.basesize;

	E.can.width  = E.camera.w;
	E.can.height = E.camera.h;

	E.ctx.fillBackground(E.can, rgb(0, 0, 0));
	E.ctx.fillStyle = rgb(255, 255, 255);
	E.ctx.font = 'normal 16px "Times New Roman", serif';
	E.ctx.textAlign = 'center';
	E.ctx.fillText('Chargement de l\'editeur...', E.camera.w / 2, E.camera.h / 2);

	if (E.ctx.mozImageSmoothingEnabled) {
		E.ctx.mozImageSmoothingEnabled = false;
	} else if (E.ctx.webkitImageSmoothingEnabled) {
		E.ctx.webkitImageSmoothingEnabled = false;
	}

	if (E.ctx.imageSmoothingEnabled) {
		E.ctx.imageSmoothingEnabled = false;
	}

	PreloadManager(E.images, E.image, E.create);
};

E.create = function() {
	var width  = parseInt(Math.clamp(prompt('Largeur de la map ?'), 6, 200));
	var height = parseInt(Math.clamp(prompt('Hauteur de la map ?'), 6, 200));

	E.map = new Array(height);

	for (var i = 0 ; i < height ; i++) {
		E.map[i] = [];

		for (var j = 0 ; j < width ; j++) {
			E.map[i][j] = {g:0};
		}
	}

	E.map_width  = width;
	E.map_height = height;

	for (i = 0 ; i < 100 ; i++) {
		getById('choice').innerHTML += '<option value="' + i + '">' + i + '</option>';
	}

	E.update();
};

E.update = function() {
	if (Key.down(Key.LEFT) || Key.down(Key.Q)) {
		E.camera.x += 4;
	}

	if (Key.down(Key.UP) || Key.down(Key.Z)) {
		E.camera.y += 4;
	}

	if (Key.down(Key.RIGHT) || Key.down(Key.D)) {
		E.camera.x -= 4;
	}

	if (Key.down(Key.DOWN) || Key.down(Key.S)) {
		E.camera.y -= 4;
	}

	E.draw();

	requestAnimFrame(E.update);
};

E.draw = function() {
	E.ctx.fillBackground(E.can, rgb(0, 0, 0));

	E.ctx.save();
	E.ctx.translate(E.camera.x, E.camera.y);

	var bx = Math.clamp(Math.floor(-E.camera.x / E.basesize), 0, E.map_width - E.camera.bw - 1);
	var by = Math.clamp(Math.floor(-E.camera.y / E.basesize), 0, E.map_height - E.camera.bh - 1);

	var mx = Math.clamp(Math.round(bx + E.camera.bw + 1), 0, E.map_width);
	var my = Math.clamp(Math.round(by + E.camera.bh + 1), 0, E.map_height);

	E.ctx.font = 'normal "Courier New" 12px';
	E.ctx.textAlign = 'left';

	var tile_by_line, aa, bb, basex, basey;

	for (var y = by ; y < my ; y++) {
		for (var x = bx ; x < mx ; x++) {
			var tile = E.map[y][x];

			basex = tile.g * E.basesize + tile.g;
			basey = 0;

			tile_by_line = Math.ceil(E.image.grounds.width / (E.basesize + 1));

			bb = tile.g % tile_by_line;
			basex = bb * E.basesize + bb;

			aa = Math.floor(tile.g / tile_by_line);
			basey = aa * E.basesize + aa;

			E.pushGround(basex, basey, x, y);

			if (E.getBlock(x, y) == 2) { // chemin
				if ([0, 1].inarray(E.getBlock(x, y - 1))) { E.pushLink(0,  34, x, y); } // terre
				if ([0, 1].inarray(E.getBlock(x, y + 1))) { E.pushLink(34, 34, x, y); } // terre
				if ([0, 1].inarray(E.getBlock(x - 1, y))) { E.pushLink(51, 34, x, y); } // terre
				if ([0, 1].inarray(E.getBlock(x + 1, y))) { E.pushLink(17, 34, x, y); } // terre
			}

			if (E.getBlock(x, y) == 3) { // eau
				if ([0, 1].inarray(E.getBlock(x, y - 1))) { E.pushLink(0,  0,  x, y); } // terre
				if ([0, 1].inarray(E.getBlock(x, y + 1))) { E.pushLink(34, 0,  x, y); } // terre
				if ([0, 1].inarray(E.getBlock(x - 1, y))) { E.pushLink(51, 0,  x, y); } // terre
				if ([0, 1].inarray(E.getBlock(x + 1, y))) { E.pushLink(17, 0,  x, y); } // terre
				if (E.getBlock(x, y - 1) == 2)            { E.pushLink(0,  17, x, y); } // chemin
				if (E.getBlock(x, y + 1) == 2)            { E.pushLink(34, 17, x, y); } // chemin
				if (E.getBlock(x - 1, y) == 2)            { E.pushLink(51, 17, x, y); } // chemin
				if (E.getBlock(x + 1, y) == 2)            { E.pushLink(17, 17, x, y); } // chemin
			}

			if (typeof tile.i != 'undefined' && tile.i != -1) {
				basex = tile.i * E.basesize + tile.i;
				basey = 0;

				tile_by_line = Math.ceil(E.image.items.width / (E.basesize + 1));

				bb = tile.i % tile_by_line;
				basex = bb * E.basesize + bb;

				aa = Math.floor(tile.i / tile_by_line);
				basey = aa * E.basesize + aa;

				E.pushItem(basex, basey, x, y);
			}

			if (typeof tile.onenter != 'undefined' && tile.onenter != -1) {
				E.ctx.fillStyle = rgb(255, 0, 0);
				E.ctx.fillText(tile.onenter, x * E.basesize + 2, y * E.basesize + 12);
			}

			if (typeof tile.onaction != 'undefined' && tile.onaction != -1) {
				E.ctx.fillStyle = rgb(0, 0, 255);
				E.ctx.fillText(tile.onaction, x * E.basesize + 2, y * E.basesize + 12);
			}

			if (typeof tile.s != 'undefined' && tile.s) {
				E.ctx.beginPath();
				E.ctx.fillStyle = rgba(255, 255, 0, 0.4);
				E.ctx.strokeStyle = rgba(0, 0, 0, 0.4);
				E.ctx.lineWidth = 2;
				E.ctx.rect(x * E.basesize, y * E.basesize, E.basesize, E.basesize);
				E.ctx.fill();
				E.ctx.stroke();
			}
		}
	}

	E.ctx.restore();

	switch (getCheckedRadio('type')) {
		case 'ground':
			E.can_choiceblock.width = E.image.grounds.width;
			E.can_choiceblock.height = E.image.grounds.height;
			E.ctx_choiceblock.drawImage(E.image.grounds, 0, 0);
			break;

		case 'item':
			E.can_choiceblock.width = E.image.items.width;
			E.can_choiceblock.height = E.image.items.height;
			E.ctx_choiceblock.drawImage(E.image.items, 0, 0);
			break;

		case 'onenter':
			E.can_choiceblock.height = 1;
			break;

		case 'onaction':
			E.can_choiceblock.height = 1;
			break;
	}

	tile_by_line = Math.ceil(E.can_choiceblock.width / (E.basesize + 1));

	bb = E.block % tile_by_line;
	basex = bb * E.basesize + bb;

	aa = Math.floor(E.block / tile_by_line);
	basey = aa * E.basesize + aa;

	E.ctx_choiceblock.fillStyle = rgba(255, 0, 0, 0.4);
	E.ctx_choiceblock.fillRect(basex, basey, E.basesize, E.basesize);
};

E.pushItem = function(bx, by, x, y) {
	E.ctx.drawImage(E.image.items, bx, by, E.basesize, E.basesize, x * E.basesize, y * E.basesize, E.basesize, E.basesize);
};

E.pushGround = function(bx, by, x, y) {
	E.ctx.drawImage(E.image.grounds, bx, by, E.basesize, E.basesize, x * E.basesize, y * E.basesize, E.basesize, E.basesize);
};

E.pushLink = function(bx, by, x, y) {
	E.ctx.drawImage(E.image.links, bx, by, E.basesize, E.basesize, x * E.basesize, y * E.basesize, E.basesize, E.basesize);
};

E.getBlock = function(x, y) {
	if (E.map.validPos(x, y)) {
		return E.map[y][x].g;
	}

	return null;
};

E.can = getById('editor');
E.ctx = E.can.getContext('2d');
E.log = getById('log');

E.can_choiceblock = getById('choice_block');
E.ctx_choiceblock = E.can_choiceblock.getContext('2d');

E.basesize = 16;

E.camera = {
	x:  0,  // x
	y:  0,  // y
	w:  0,  // w
	h:  0,  // h
	bw: 20, // bw
	bh: 20  //bh
};

E.images = {
	grounds: '../assets/gfx/grounds.png',
	items:   '../assets/gfx/items.png',
	links:   '../assets/gfx/links.png'
};

E.image = {};

E.map        = null;
E.map_height = 0;
E.map_width  = 0;

E.block = 0;

var Mouse_choice = { x: 0, y: 0 };

document.onmousemove = function(evt) {
	Mouse.x = evt.pageX - E.can.offsetLeft;
	Mouse.y = evt.pageY - E.can.offsetTop;

	Mouse_choice.x = evt.pageX - E.can_choiceblock.offsetLeft;
	Mouse_choice.y = evt.pageY - E.can_choiceblock.offsetTop;
};

E.click = false;

E.can.onmousedown = function(evt) {
	E.click = true;
	E.can.onmousemove();
};

E.can.onmouseup = function(evt) {
	E.click = false;
};

E.can.onmousemove = function(evt) {
	var x = Math.floor((Mouse.x - E.camera.x) / E.basesize);
	var y = Math.floor((Mouse.y - E.camera.y) / E.basesize);

	if (E.click && E.map.validPos(x, y)) {
		if (getCheckedRadio('type') == 'ground') {
			E.map[y][x].g = E.block;
		} else if (getCheckedRadio('type') == 'item') {
			E.map[y][x].i = E.block;
		} else if (getCheckedRadio('type') == 'onenter') {
			E.map[y][x].onenter = getById('choice').value;
		} else if (getCheckedRadio('type') == 'onaction') {
			E.map[y][x].onaction = getById('choice').value;
		} else if (getCheckedRadio('type') == 'solid') {
			E.map[y][x].s = 1;
		} else if (getCheckedRadio('type') == 'nosolid') {
			E.map[y][x].s = 0;
		}
	}
};

E.can_choiceblock.onclick = function(evt) {
	var tile_by_line = Math.ceil(E.can_choiceblock.width / (E.basesize + 1));

	var x = Math.floor(Mouse_choice.x / (E.basesize + 1));
	var y = Math.floor(Mouse_choice.y / (E.basesize + 1));

	E.block = x + (y * tile_by_line);
};

getById('reset').onclick = function() {
	if (getCheckedRadio('type') == 'item') {
		E.block = -1;
	}
};

getById('download').onclick = function() {
	getById('code').innerHTML = E.map.toSource();
};

getById('choice_ground').onclick = function() {
	E.block = 0;
};

getById('choice_item').onclick = function() {
	E.block = 0;
};

/*
	var bb = tile.g % tile_by_line;
	basex = bb * E.basesize + bb;

	var aa = Math.floor(tile.g / tile_by_line);
	basey = aa * E.basesize + aa;
*/
