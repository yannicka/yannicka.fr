G.game = {};

G.game.init = function() {
	var x = 0;
	var y = 0;

	for (y = 0 ; y < G.map.lines ; y++) {
		G.game.constructions[y] = [];

		for (x = 0 ; x < G.map.cols ; x++) {
			G.game.constructions[y][x] = {
				building: 0,
				owner:    false,
				finish:   0,
				timer:    0,
				level:    1,
				opacity:  0
			};
		}
	}
};

G.game.update = function() {
	if (Mouse.x > G.can.width - 50) {
		G.camera.x += 10;
	} else if (Mouse.x < 50) {
		G.camera.x -= 10;
	}

	var i = 0;
	var x = 0;
	var y = 0;

	var construction = false;
	var building     = false;

	var solider = false;
	var knight  = false;

	if (Mouse.down() && Mouse.x > 0 && Mouse.x < G.can.width && Mouse.y > 0 && Mouse.y < G.can.height - 60) {
		choice_building = G.game.buildings[G.game.choice_building];

		if (G.game.player.gold - choice_building.cost >= 0) {

			x = Math.floor((Mouse.x + G.camera.x) / G.map.zoom);
			y = Math.floor((Mouse.y + G.camera.y) / G.map.zoom);

			construction = G.game.constructions[y][x];
			building     = G.game.buildings[construction.building];

			if (G.game.constructions.validPos(x, y) && construction.owner == false && x < 10) {
				G.game.player.gold -= choice_building.cost;

				construction.building = G.game.choice_building;
				construction.owner    = 'blue';
				construction.life     = choice_building.baselife;

				Mouse.click = false;
			}
		}
	}

	G.camera.x = Math.clamp(G.camera.x, 0, G.map.width - G.can.width);

	for (y = 0 ; y < G.map.lines ; y++) {
		for (x = 0 ; x < G.map.cols ; x++) {
			construction = G.game.constructions[y][x];
			building     = G.game.buildings[construction.building];

			if (construction.owner) {
				if (typeof construction.finish == 'number') {
					construction.finish += G.timer.dt;

					if (building.time_creation < construction.finish) {
						construction.finish = true;
					}

					
				} else if (construction.finish == true) {
					construction.timer += G.timer.dt;

					if (construction.timer > building.callback.every) {
						construction.timer = 0;
						G.game.callback[building.callback.action](x, y, construction, building);
					}
				}
			}
		}
	}

	for (i = 0 ; i < G.game.player.soliders.length ; i++) {
		solider = G.game.player.soliders[i];

		solider.x += solider.speed;

		if (solider.x + 24 > G.map.width) {
			G.game.player.soliders.splice(i, 1);
			G.game.enemy.life -= solider.damage;
		}

		if (G.game.constructions[solider.line][Math.floor(solider.x / 100)].building == 2) {
			//
		}
	}

	for (i = 0 ; i < G.game.player.knights.length ; i++) {
		knight = G.game.player.knights[i];

		knight.x += knight.speed;

		if (knight.x + 24 > G.map.width) {
			G.game.player.knights.splice(i, 1);
			G.game.enemy.life -= knight.damage;
		}
	}

	if (Key.press(Key.Q)) {
		G.game.choice_building = 0;
	} else if (Key.press(Key.W)) {
		G.game.choice_building = 1;
	} else if (Key.press(Key.E)) {
		G.game.choice_building = 2;
	}

	G.game.draw();
};

G.game.draw = function() {
	var i = 0;
	var x = 0;
	var y = 0;

	var construction = false;
	var building     = false;

	var solider = false;
	var knight  = false;

	var size = 0;

	var sell_price = 0;
	var sell_text  = '';

	var upgrade_cost = 0;
	var upgrade_text = '';

	G.ctx.clear(G.can);

	G.ctx.save();
	G.ctx.translate(-G.camera.x, -G.camera.y);

		G.ctx.fillStyle = rgb(0, 0, 255);
		G.ctx.fillRect(G.game.x, 0, 20, 20);

		G.ctx.drawImage(G.image.bg, 0, 0);

		for (y = 0 ; y < G.map.lines ; y++) {
			for (x = 0 ; x < G.map.cols ; x++) {
				construction = G.game.constructions[y][x];
				building     = G.game.buildings[construction.building];

				if (construction.owner) {
					if (construction.finish == true) {
						G.ctx.drawImage(
							G.image.buildings,
							building.offsetX,
							building.offsetY,
							G.map.zoom,
							G.map.zoom,
							x * G.map.zoom,
							y * G.map.zoom,
							G.map.zoom,
							G.map.zoom
						);
					} else {
						size = Math.clamp(((construction.finish) / (building.time_creation)) * G.map.zoom, 0, G.map.zoom);
						construction.opacity = size / G.map.zoom;

						G.ctx.save();
						G.ctx.globalAlpha = construction.opacity;

							G.ctx.drawImage(
								G.image.buildings,
								building.offsetX,
								building.offsetY + G.map.zoom - size,
								G.map.zoom,
								size,
								x * G.map.zoom,
								y * G.map.zoom - size + G.map.zoom,
								G.map.zoom,
								size
							);

						G.ctx.restore();
					}

					if (construction.owner == 'blue') {
						G.ctx.drawImage(G.image.buttons, x * G.map.zoom + G.map.zoom - 32, y * G.map.zoom);
					}

					G.ctx.fillStyle = rgb(0, 0, 0);
					G.ctx.fillRect(x * G.map.zoom + 25, y * G.map.zoom + G.map.zoom - 8, 50, 6);

					G.ctx.fillStyle = rgb(255, 0, 0);
					G.ctx.fillRect(x * G.map.zoom + 26, y * G.map.zoom + G.map.zoom - 7, Math.clamp(((construction.life) / (building.baselife)) * 48, 0, 48), 4);
					
					if (construction.finish != true) {
						G.ctx.fillStyle = rgb(0, 0, 0);
						G.ctx.fillRect(x * G.map.zoom + 25, y * G.map.zoom + G.map.zoom - 16, 50, 6);

						G.ctx.fillStyle = rgb(255, 255, 0);
						G.ctx.fillRect(x * G.map.zoom + 26, y * G.map.zoom + G.map.zoom - 15, Math.clamp(((construction.finish) / (building.time_creation)) * 48, 0, 48), 4);
					}
				}
			}
		}

		x = Math.floor((Mouse.x + G.camera.x) / G.map.zoom) * G.map.zoom;
		y = Math.floor((Mouse.y + G.camera.y) / G.map.zoom) * G.map.zoom;

		building = G.game.buildings[G.game.choice_building];

		if (x / G.map.zoom < 10) {
			G.ctx.drawImage(G.image.pointer, x, y);
		}

		for (i = 0 ; i < G.game.player.soliders.length ; i++) {
			solider = G.game.player.soliders[i];

			G.ctx.drawImage(G.image.solider, solider.x, solider.y);
		}

		for (i = 0 ; i < G.game.player.knights.length ; i++) {
			knight = G.game.player.knights[i];

			G.ctx.drawImage(G.image.knight, knight.x, knight.y);
		}

	G.ctx.restore();

	G.ctx.drawImage(G.image.tool_bar, 0, G.map.height);

	G.ctx.fillStyle = rgb(0, 0, 0);
	G.ctx.font      = 'normal 14px "Arial", serif';
	G.ctx.textAlign = 'left';
	G.ctx.fillText(parseInt(G.game.player.gold), 22, 420);
	G.ctx.fillText(G.game.player.life + ' / ' + G.game.player.maxlife, 22, 438);
	G.ctx.fillText(G.game.player.soliders.length, 22, 456);
	G.ctx.fillText(G.game.player.knights.length, 86, 456);
	G.ctx.textAlign = 'right';
	G.ctx.fillText(G.game.enemy.life + ' / ' + G.game.enemy.maxlife, 618, 437);

	for (i = 0 ; i < 3 ; i++) {
		G.ctx.drawImage(G.image.buildings, 0, i * G.map.zoom, G.map.zoom, G.map.zoom, 141 + i * 38 + i, 413, 38, 38);
	}

	G.ctx.drawImage(G.image.building_choice, G.game.choice_building * 38 + 141 + G.game.choice_building, 413);

	for (i = 0 ; i < 3 ; i++) {
		if (pointHitBox(Mouse.x, Mouse.y, { x: 142 + i * 38 + i, y: 413, w: 38, h: 38 })) {
			G.game.hover = true;

			G.game.draw_tooltip(Mouse.x, Mouse.y - 72, G.ctx.measureText(G.game.buildings[i].description).width, 78);

			G.ctx.save();
			G.ctx.translate(Mouse.x, Mouse.y - 72);

				G.ctx.fillStyle = rgb(0, 0, 0);
				G.ctx.font      = 'bold 12px "Arial", serif';
				G.ctx.textAlign = 'left';
				G.ctx.fillText(G.game.buildings[i].name + ' (' + G.game.hotkeys.charAt(i) + ')', 5, 16);
				G.ctx.font      = 'italic 12px "Arial", serif';
				G.ctx.fillText(G.game.buildings[i].description, 5, 30);
				G.ctx.font      = 'normal 12px "Arial", serif';
				G.ctx.fillText('Cost: ' + G.game.buildings[i].cost, 5, 44);
				G.ctx.fillText('Life: ' + G.game.buildings[i].baselife, 5, 58);
				G.ctx.fillText('Build time: ' + parseInt(G.game.buildings[i].time_creation / 1000) + 's', 5, 72);

			G.ctx.restore();

			if (Mouse.down()) {
				G.game.choice_building = i;
				Mouse.click = false;
			}
		}
	}

	G.ctx.save();
	G.ctx.translate(-G.camera.x, -G.camera.y);

		for (y = 0 ; y < G.map.lines ; y++) {
			for (x = 0 ; x < G.map.cols ; x++) {
				construction = G.game.constructions[y][x];
				building     = G.game.buildings[construction.building];

				if (construction.owner) {
					if (pointHitBox(Mouse.x + G.camera.x, Mouse.y + G.camera.y, { x: x * G.map.zoom, y: y * G.map.zoom, w: G.map.zoom, h: G.map.zoom })) {
						G.game.draw_tooltip(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y + 10, G.ctx.measureText(building.description).width, 52);

						G.ctx.save();
						G.ctx.translate(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y + 10);

							G.ctx.fillStyle = rgb(0, 0, 0);
							G.ctx.textAlign = 'left';
							G.ctx.font      = 'bold 12px "Arial", serif';
							G.ctx.fillText(building.name, 5, 16);
							G.ctx.font      = 'italic 12px "Arial", serif';
							G.ctx.fillText(building.description, 5, 30);
							G.ctx.font      = 'normal 12px "Arial", serif';
							G.ctx.fillText('Life: ' + construction.life + '/' + building.baselife, 5, 44);

						G.ctx.restore();
					}

					if (construction.owner == 'blue') {
						if (pointHitBox(Mouse.x + G.camera.x, Mouse.y + G.camera.y, { x: x * G.map.zoom + G.map.zoom - 32, y: y * G.map.zoom, w: 32, h: 32 })) {
							G.game.hover = true;

							sell_price = parseInt(building.cost * construction.level / 1.3);

							sell_text = 'Sell - ' + sell_price + ' gold';

							if (Mouse.down()) {
								G.game.sell(construction, sell_price);
								Mouse.click = false;
							}

							G.game.draw_tooltip(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y - 9, G.ctx.measureText(sell_text).width, 24);

							G.ctx.save();
							G.ctx.translate(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y - 9);

								G.ctx.fillStyle = rgb(0, 0, 0);
								G.ctx.textAlign = 'left';
								G.ctx.font      = 'normal 12px "Arial", serif';
								G.ctx.fillText(sell_text, 5, 16);

							G.ctx.restore();
						}

						if (pointHitBox(Mouse.x + G.camera.x, Mouse.y + G.camera.y, { x: x * G.map.zoom + G.map.zoom - 32, y: y * G.map.zoom + 32, w: 32, h: 32 })) {
							G.game.hover = true;

							upgrade_cost = parseInt((building.cost) * (1 + (construction.level / 8)));
							upgrade_text = '(' + construction.level + ') Upgrade - ' + upgrade_cost + ' gold';

							if (G.game.player.gold - upgrade_cost >= 0) {
								if (Mouse.down()) {
									G.game.upgrade(construction, upgrade_cost);
									Mouse.click = false;
								}
							}

							G.game.draw_tooltip(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y - 9, G.ctx.measureText(upgrade_text).width, 24);

							G.ctx.save();
							G.ctx.translate(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y - 9);

								G.ctx.fillStyle = rgb(0, 0, 0);
								G.ctx.textAlign = 'left';
								G.ctx.font      = 'normal 12px "Arial", serif';
								G.ctx.fillText(upgrade_text, 5, 16);

							G.ctx.restore();
						}
					}
				}
			}
		}

	G.ctx.restore();

	if (G.game.hover)
		document.body.style.cursor = 'pointer';
	else
		document.body.style.cursor = 'auto';

	G.game.hover = false;
};

G.game.entity = function() {
	this.gold     = 400;
	this.life     = 1000;
	this.maxlife  = 1000;
	this.soliders = [];
	this.knights  = [];
};

G.game.enemy  = new G.game.entity();
G.game.player = new G.game.entity();

G.game.hover = false;

G.game.buildings = [
	{	name:          'Bank', // 0
		description:   'Makes a piece of gold (per level) every second',
		cost:          100,
		offsetX:       0,
		offsetY:       0,
		time_creation: 16000,
		baselife:      20,
		callback: {
			every:  1000,
			action: 'bank'
		}
	},

	{	name:          'Arena', // 1
		description:   'Create a solider (per level) every two seconds',
		cost:          80,
		offsetX:       0,
		offsetY:       100,
		time_creation: 8000,
		baselife:      60,
		callback: {
			every:  2000,
			action: 'arena'
		}
	},

	{	name:          'Stable', // 2
		description:   'Create a knight (per level) every two seconds',
		cost:          160,
		offsetX:       0,
		offsetY:       200,
		time_creation: 12000,
		baselife:      46,
		callback: {
			every:  2000,
			action: 'stable'
		}
	}
];

G.game.choice_building = 0;

G.game.constructions = [];

G.game.hotkeys = 'QWE';

G.game.draw_tooltip = function(x, y, w, h) {
	G.ctx.save();
	G.ctx.translate(x, y);

	// Haut
	G.ctx.drawImage(G.image.tooltip, 0, 0, 8, 8, 0, 0, 8, 8);
	G.ctx.drawImage(G.image.tooltip, 8, 0, 8, 8, 8, 0, w - 16, 8);
	G.ctx.drawImage(G.image.tooltip, 16, 0, 8, 8, w - 8, 0, 8, 8);

	// Centre
	G.ctx.drawImage(G.image.tooltip, 0, 8, 8, 8, 0, 8, 8, h - 16);
	G.ctx.drawImage(G.image.tooltip, 8, 8, 8, 8, 8, 8, w - 16, h - 16);
	G.ctx.drawImage(G.image.tooltip, 16, 8, 8, 8, w  - 8, 8, 8, h - 16);

	// Bas
	G.ctx.drawImage(G.image.tooltip, 0, 16, 8, 8, 0, h - 8, 8, 8);
	G.ctx.drawImage(G.image.tooltip, 8, 16, 8, 8, 8, h - 8, w - 16, 8);
	G.ctx.drawImage(G.image.tooltip, 16, 16, 8, 8, w - 8, h - 8, 8, 8);

	G.ctx.restore();
};

G.game.callback = {
	bank: function(x, y, construction, building) {
		G.game.player.gold += 1 * construction.level;
	},

	arena: function(x, y, construction, building) {
		var i = 0;

		for (i = 0 ; i < construction.level ; i++) {
			G.game.player.soliders.push({
				x:      x * G.map.zoom + 76,
				y:      y * G.map.zoom + Math.rand(0, 76),
				line:   y,
				speed:  3 + (Math.random() * 2),
				damage: 2
			});
		}
	},

	stable: function(x, y, construction, building) {
		var i = 0;

		for (i = 0 ; i < construction.level ; i++) {
			G.game.player.knights.push({
				x:      x * G.map.zoom + 76,
				y:      y * G.map.zoom + Math.rand(0, 76),
				line:   y,
				speed:  5 + (Math.random() * 2),
				damage: 3
			});
		}
	}
};

G.game.sell = function(construction, price) {
	construction.building = 0;
	construction.owner    = false;
	construction.finish   = 0;
	construction.timer    = 0;
	construction.level    = 1;

	G.game.player.gold += price;
};

G.game.upgrade = function(construction, cost) {
	construction.level++;

	G.game.player.gold -= cost;
};
