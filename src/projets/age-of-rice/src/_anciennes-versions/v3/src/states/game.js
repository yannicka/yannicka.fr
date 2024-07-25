G.game = {};

G.game.init = function() {
	for (var y = 0 ; y < 4 ; y++) {
		G.game.constructions[y] = [];

		for (var x = 0 ; x < 30 ; x++) {
			G.game.constructions[y][x] = {
				building: 0,
				owner:    false,
				finish:   0,
				timer:    0,
				level:    1
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

	var x = y = 0;
	var construction = building = false;

	if (Mouse.down() && Mouse.x > 0 && Mouse.x < G.can.width && Mouse.y > 0 && Mouse.y < G.can.height - 60) {
		choice_building = G.game.buildings[G.game.choice_building];

		if (G.game.gold - choice_building.cost >= 0) {

			x = Math.floor((Mouse.x + G.camera.x) / 100);
			y = Math.floor((Mouse.y + G.camera.y) / 100);

			construction = G.game.constructions[y][x];
			building     = G.game.buildings[construction.building];

			if (G.game.constructions.validPos(x, y) && construction.owner == false && x < 10) {
				G.game.gold -= choice_building.cost;

				construction.building = G.game.choice_building;
				construction.owner    = 'blue';
				construction.life     = choice_building.baselife;

				Mouse.click = false;
			}
		}
	}

	G.camera.x = Math.clamp(G.camera.x, 0, 3000 - G.can.width);

	for (y = 0 ; y < 4 ; y++) {
		for (x = 0 ; x < 30 ; x++) {
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

	var solider = false;

	for (var i = 0 ; i < G.game.player.soliders.length ; i++) {
		solider = G.game.player.soliders[i];

		solider.x += solider.speed;

		if (solider.x + 24 > 3000) {
			G.game.player.soliders.splice(i, 1);
			G.game.enemy.life -= solider.damage;
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
	G.ctx.clear(G.can);

	G.ctx.save();
	G.ctx.translate(-G.camera.x, -G.camera.y);

		G.ctx.fillStyle = rgb(0, 0, 255);
		G.ctx.fillRect(G.game.x, 0, 20, 20);

		G.ctx.drawImage(G.image.bg, 0, 0);

		var construction = false;
		var building     = false;

		for (var y = 0 ; y < 4 ; y++) {
			for (var x = 0 ; x < 30 ; x++) {
				construction = G.game.constructions[y][x];
				building     = G.game.buildings[construction.building];

				if (construction.owner) {
					G.ctx.drawImage(
						G.image.buildings,
						building.offsetX,
						building.offsetY,
						100,
						100,
						x * 100,
						y * 100,
						100,
						100
					);

					if (construction.owner == 'blue') {
						G.ctx.drawImage(G.image.buttons, x * 100 + 100 - 32, y * 100);
					}

					G.ctx.fillStyle = rgb(0, 0, 0);
					G.ctx.fillRect(x * 100 + 25, y * 100 + 100 - 8, 50, 6);

					if (construction.finish == true) {
						G.ctx.fillStyle = rgb(255, 0, 0);
						G.ctx.fillRect(x * 100 + 26, y * 100 + 100 - 7, Math.clamp(((construction.life) / (building.baselife)) * 48, 0, 48), 4);
					} else {
						G.ctx.fillStyle = rgb(255, 255, 0);
						G.ctx.fillRect(x * 100 + 26, y * 100 + 100 - 7, Math.clamp(((construction.finish) / (building.time_creation)) * 48, 0, 48), 4);
					}
				}
			}
		}

		x = Math.floor((Mouse.x + G.camera.x) / 100) * 100;
		y = Math.floor((Mouse.y + G.camera.y) / 100) * 100;

		if (x / 100 < 10)
			G.ctx.drawImage(G.image.pointer, x, y);

		var solider = false;

		for (var i = 0 ; i < G.game.player.soliders.length ; i++) {
			solider = G.game.player.soliders[i];

			G.ctx.drawImage(G.image.solider, solider.x, solider.y);
		}

	G.ctx.restore();

	G.ctx.drawImage(G.image.tool_bar, 0, 400);

	G.ctx.fillStyle = rgb(0, 0, 0);
	G.ctx.font      = 'normal 14px "Arial", serif';
	G.ctx.textAlign = 'left';
	G.ctx.fillText(parseInt(G.game.gold), 22, 420);
	G.ctx.fillText(G.game.player.life + ' / ' + G.game.player.maxlife, 22, 438);
	G.ctx.fillText(G.game.player.soliders.length, 22, 456);
	G.ctx.fillText(G.game.player.knights.length, 86, 456);
	G.ctx.textAlign = 'right';
	G.ctx.fillText(G.game.enemy.life + ' / ' + G.game.enemy.maxlife, 618, 437);

	for (i = 0 ; i < 3 ; i++) {
		G.ctx.drawImage(G.image.buildings, 0, i * 100, 100, 100, 141 + i * 38 + i, 413, 38, 38);
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

	var sell_price = 0;
	var sell_text = upgrade_text = '';

		for (y = 0 ; y < 4 ; y++) {
			for (x = 0 ; x < 30 ; x++) {
				construction = G.game.constructions[y][x];
				building     = G.game.buildings[construction.building];

				if (construction.owner) {
					if (pointHitBox(Mouse.x + G.camera.x, Mouse.y + G.camera.y, { x: x * 100, y: y * 100, w: 100, h: 100 })) {
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
						if (pointHitBox(Mouse.x + G.camera.x, Mouse.y + G.camera.y, { x: x * 100 + 100 - 32, y: y * 100, w: 32, h: 32 })) {
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

						if (pointHitBox(Mouse.x + G.camera.x, Mouse.y + G.camera.y, { x: x * 100 + 100 - 32, y: y * 100 + 32, w: 32, h: 32 })) {
							G.game.hover = true;

							upgrade_text = 'Upgrade - ' + parseInt((building.cost * construction.level) * 1.5) + ' gold';

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

G.game.gold = 400;

G.game.hover = false;

G.game.buildings = [
	{	name:          'Bank', // 0
		description:   'Make one gold every second',
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
		description:   'Create one solider every second',
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
		description:   'Create one knight every second',
		cost:          120,
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
		G.game.gold += 1;
	},

	arena: function(x, y, construction, building) {
		G.game.player.soliders.push({
			x:      x * 100 + 76,
			y:      y * 100 + Math.rand(0, 76),
			line:   y,
			speed:  3 + (Math.random() * 2),
			damage: 2
		});
	},

	stable: function(x, y, construction, building) {
		G.game.player.knights.push({
			x:      0,
			y:      0,
			line:   0,
			speed:  0,
			damage: 0
		});
	}
};

G.game.sell = function(construction, price) {
	construction.building = 0;
	construction.owner    = false;
	construction.finish   = 0;
	construction.timer    = 0;
	construction.level    = 1;

	G.game.gold += price;
};
