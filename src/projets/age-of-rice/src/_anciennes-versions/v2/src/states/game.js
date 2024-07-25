G.game = {};

G.game.init = function() {
	for (var y = 0 ; y < 20 ; y++) {
		G.game.constructions[y] = [];

		for (var x = 0 ; x < 20 ; x++) {
			G.game.constructions[y][x] = {
				building: 0,
				owner:    false,
				finish:   0,
				timer:    0
			};
		}
	}
};

G.game.update = function() {
	/* Déplacement de la caméra à la souris
	---------------------------------------- */
	if (Mouse.x > G.can.width - 50) {
		G.camera.x += 4;
	} else if (Mouse.x < 50) {
		G.camera.x -= 4;
	}

	var x = y = 0;
	var construction = building = false;

	if (Mouse.release() && Mouse.x > 0 && Mouse.x < G.can.width && Mouse.y > 0 && Mouse.y < G.can.height - 80) {
		choice_building = G.game.buildings[G.game.choice_building];

		if (G.game.gold - choice_building.cost >= 0) {

			x = Math.floor((Mouse.x + G.camera.x) / 100);
			y = Math.floor((Mouse.y + G.camera.y) / 100);

			construction = G.game.constructions[y][x];
			building     = G.game.buildings[construction.building];

			if (G.game.constructions.validPos(x, y) && construction.owner == false) {
				G.game.gold -= choice_building.cost;

				construction.building = G.game.choice_building;
				construction.owner    = 'blue';
				construction.life     = choice_building.baselife;
			}
		}
	}

	G.camera.x = Math.clamp(G.camera.x, 0, 2000 - G.can.width);

	for (y = 0 ; y < 20 ; y++) {
		for (x = 0 ; x < 20 ; x++) {
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
						G.game.callback[building.callback.action]();
					}
				}
			}
		}
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

		for (var y = 0 ; y < 20 ; y++) {
			for (var x = 0 ; x < 20 ; x++) {
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

					G.ctx.drawImage(G.image.buttons, x * 100 + 100 - 32, y * 100);

					// alert(construction.finish);

					if (construction.finish == true) {
						G.ctx.fillStyle = rgb(0, 0, 0);
						G.ctx.fillRect(x * 100 + 25, y * 100 + 100 - 6, 50, 6);
						G.ctx.fillStyle = rgb(255, 0, 0);
						G.ctx.fillRect(x * 100 + 26, y * 100 + 100 - 5, Math.clamp(((construction.life) / (building.baselife)) * 48, 0, 48), 4);
					} else {
						G.ctx.fillStyle = rgb(0, 0, 0);
						G.ctx.fillRect(x * 100 + 25, y * 100 + 100 - 6, 50, 6);
						G.ctx.fillStyle = rgb(0, 255, 0);
						G.ctx.fillRect(x * 100 + 26, y * 100 + 100 - 5, Math.clamp(((construction.finish) / (building.time_creation)) * 48, 0, 48), 4);
					}
				}
			}
		}

		G.ctx.drawImage(G.image.pointer, Math.floor((Mouse.x + G.camera.x) / 100) * 100, Math.floor((Mouse.y + G.camera.y) / 100) * 100);

	G.ctx.restore();

	G.ctx.drawImage(G.image.tool_bar, 0, 400);

	G.ctx.fillStyle = rgb(0, 0, 0);
	G.ctx.font      = 'normal 12px "Arial", serif';
	G.ctx.textAlign = 'right';
	G.ctx.fillText(parseInt(G.game.gold), 90, 412);

	for (var i = 0 ; i < 3 ; i++) {
		G.ctx.drawImage(G.image.buildings, 0, i * 100, 100, 100, 118 + i * 40 + i, 401, 40, 40);
	}

	G.ctx.drawImage(G.image.building_choice, G.game.choice_building * 40 + 118 + G.game.choice_building, 401);

	for (i = 0 ; i < 3 ; i++) {
		if (pointHitBox(Mouse.x, Mouse.y, { x: 119 + i * 40 + i, y: 401, w: 40, h: 40 })) {
			G.game.draw_tooltip(Mouse.x, Mouse.y - 72, G.ctx.measureText(G.game.buildings[i].description).width + 14, 62);

			G.ctx.save();
			G.ctx.translate(Mouse.x, Mouse.y - 72);

				G.ctx.fillStyle = rgb(0, 0, 0);
				G.ctx.font      = 'bold 12px "Arial", serif';
				G.ctx.textAlign = 'left';
				G.ctx.fillText(G.game.buildings[i].name, 5, 16);
				G.ctx.font      = 'italic 12px "Arial", serif';
				G.ctx.fillText(G.game.buildings[i].description, 5, 30);
				G.ctx.font      = 'normal 12px "Arial", serif';
				G.ctx.fillText('Cost: ' + G.game.buildings[i].cost, 5, 44);
				G.ctx.fillText('Life: ' + G.game.buildings[i].baselife, 5, 58);
				G.ctx.fillText('Build time: ' + parseInt(G.game.buildings[i].time_creation / 1000) + 's', 5, 72);

			G.ctx.restore();

			if (Mouse.down()) {
				G.game.choice_building = i;
			}
		}
	}

	G.ctx.save();
	G.ctx.translate(-G.camera.x, -G.camera.y);

		for (y = 0 ; y < 20 ; y++) {
			for (x = 0 ; x < 20 ; x++) {
				construction = G.game.constructions[y][x];
				building     = G.game.buildings[construction.building];

				if (construction.owner) {
					if (pointHitBox(Mouse.x + G.camera.x, Mouse.y + G.camera.y, { x: x * 100, y: y * 100, w: 100, h: 100 })) {
						G.game.draw_tooltip(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y + 10, G.ctx.measureText(building.description).width + 14, 36);

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

					if (pointHitBox(Mouse.x + G.camera.x, Mouse.y + G.camera.y, { x: x * 100 + 100 - 32, y: y * 100, w: 32, h: 32 })) {
						G.game.draw_tooltip(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y + 10, 34, 8);

						G.ctx.save();
						G.ctx.translate(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y + 10);

							G.ctx.fillStyle = rgb(0, 0, 0);
							G.ctx.textAlign = 'left';
							G.ctx.font      = 'normal 12px "Arial", serif';
							G.ctx.fillText('Sell', 5, 16);

						G.ctx.restore();
					}

					if (pointHitBox(Mouse.x + G.camera.x, Mouse.y + G.camera.y, { x: x * 100 + 100 - 32, y: y * 100 + 32, w: 32, h: 32 })) {
						G.game.draw_tooltip(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y + 10, 62, 8);

						G.ctx.save();
						G.ctx.translate(Mouse.x + G.camera.x + 6, Mouse.y + G.camera.y + 10);

							G.ctx.fillStyle = rgb(0, 0, 0);
							G.ctx.textAlign = 'left';
							G.ctx.font      = 'normal 12px "Arial", serif';
							G.ctx.fillText('Upgrade', 5, 16);

						G.ctx.restore();
					}
				}
			}
		}

	G.ctx.restore();

	document.body.style.cursor = 'normal';
};

G.game.gold = 400;

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
		cost:          50,
		offsetX:       0,
		offsetY:       100,
		time_creation: 5000,
		baselife:      30,
		callback: {
			every:  600,
			action: 'arena'
		}
	},

	{	name:          'Stable', // 2
		description:   'Create one knight every second',
		cost:          20,
		offsetX:       0,
		offsetY:       200,
		time_creation: 6000,
		baselife:      80,
		callback: {
			every:  600,
			action: 'stable'
		}
	}
];

G.game.choice_building = 0;

G.game.constructions = [];

G.castel = {
	life:     1000,
	baselife: 1000
};

G.game.draw_tooltip = function(x, y, w, h) {
	G.ctx.save();
	G.ctx.translate(x, y);

	// Haut
	G.ctx.drawImage(G.image.tooltip, 0, 0, 8, 8, 0, 0, 8, 8);
	G.ctx.drawImage(G.image.tooltip, 8, 0, 8, 8, 8, 0, w - 16, 8);
	G.ctx.drawImage(G.image.tooltip, 16, 0, 8, 8, w - 8, 0, 8, 8);

	// Centre
	G.ctx.drawImage(G.image.tooltip, 0, 8, 8, 8, 0, 8, 8, h);
	G.ctx.drawImage(G.image.tooltip, 8, 8, 8, 8, 8, 8, w - 16, h);
	G.ctx.drawImage(G.image.tooltip, 16, 8, 8, 8, w  - 8, 8, 8, h);

	// Bas
	G.ctx.drawImage(G.image.tooltip, 0, 16, 8, 8, 0, h + 8, 8, 8);
	G.ctx.drawImage(G.image.tooltip, 8, 16, 8, 8, 8, h + 8, w - 16, 8);
	G.ctx.drawImage(G.image.tooltip, 16, 16, 8, 8, w - 8, h + 8, 8, 8);

	G.ctx.restore();
};

G.game.callback = {
	bank: function() {
		G.game.gold += 1;
	},

	arena: function() {
	},

	stable: function() {
	}
};
