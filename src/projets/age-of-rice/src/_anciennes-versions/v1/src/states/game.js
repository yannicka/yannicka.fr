G.game = {};

G.game.init = function() {
	for (var y = 0 ; y < 20 ; y++) {
		G.game.constructions[y] = [];

		for (var x = 0 ; x < 20 ; x++) {
			G.game.constructions[y][x] = {
				building: 0,
				owner:    false
			};
		}
	}
};

G.game.update = function() {
	G.game.gold += G.timer.dt / 1000;

	if (Mouse.x > 590) {
		G.camera.x += 3;
	} else if (Mouse.x < 50) {
		G.camera.x -= 3;
	}

	if (Mouse.release() && Mouse.x > 0 && Mouse.x < 640 && Mouse.y > 0 && Mouse.y < 400) {
		if (G.game.gold - G.game.buildings[G.game.choice_building].price >= 0) {

			var x = Math.floor((Mouse.x + G.camera.x) / 100);
			var y = Math.floor((Mouse.y + G.camera.y) / 100);

			if (G.game.constructions.validPos(x, y) && G.game.constructions[y][x].owner == false) {
				G.game.gold -= G.game.buildings[G.game.choice_building].price;

				G.game.constructions[y][x].building = G.game.choice_building;
				G.game.constructions[y][x].owner    = 'blue';
				G.game.constructions[y][x].baselife = Math.rand(50, 100);
				G.game.constructions[y][x].life     = Math.rand(0, G.game.constructions[y][x].baselife);
			}
		}
	}

	G.camera.x = Math.clamp(G.camera.x, 0, 2000 - G.can.width);

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

		for (var y = 0 ; y < 20 ; y++) {
			for (var x = 0 ; x < 20 ; x++) {
				construction = G.game.constructions[y][x];

				if (construction.owner) {
					G.ctx.drawImage(
						G.image.buildings,
						G.game.buildings[construction.building].offsetX,
						G.game.buildings[construction.building].offsetY,
						100,
						100,
						x * 100,
						y * 100,
						100,
						100
					);


					G.ctx.fillStyle = rgb(255, 255, 255);
					G.ctx.fillRect(x * 100, y * 100 + 100 - 50, 80, 6);
					G.ctx.fillStyle = rgb(255, 0, 0);
					G.ctx.fillRect(x * 100 + 1, y * 100 + 100 - 49, (Math.clamp(((construction.life + 1) / (100 + 1)) * construction.baselife, 0, 100) / 1.25 - 1), 4);
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

	for (var i = 0 ; i < 3 ; i++) {
		if (pointHitBox(Mouse.x, Mouse.y, { x: 119 + i * 40 + i, y: 401, w: 40, h: 40 })) {
			G.game.draw_tooltip(Mouse.x, Mouse.y, 24, 24);

			//if (Mouse.release()) {
				G.game.choice_building = i;
			//}
		}
	}

	G.ctx.save();
	G.ctx.translate(-G.camera.x, -G.camera.y);

		for (y = 0 ; y < 20 ; y++) {
			for (x = 0 ; x < 20 ; x++) {
				construction = G.game.constructions[y][x];

				if (construction.owner) {
					if (pointHitBox(Mouse.x + G.camera.x, Mouse.y + G.camera.y, { x: x * 100, y: y * 100, w: 100, h: 100 })) {
						G.game.draw_tooltip(Mouse.x + G.camera.x, Mouse.y + G.camera.y, 24, 24);
					}
				}
			}
		}

	G.ctx.restore();
};

G.game.gold = 200;

G.game.buildings = [
	{	name:        'blue_castle', // 0
		description: 'DESC',
		price:       50,
		offsetX:     0,
		offsetY:     0
	},

	{	name:        'blue_truc1', // 1
		description: 'DESC',
		price:       50,
		offsetX:     0,
		offsetY:     100
	},

	{	name:        'blue_truc2', // 2
		description: 'DESC',
		price:       20,
		offsetX:     0,
		offsetY:     200
	},

	{	name:        'red_castle', // 3
		description: 'DESC',
		price:       50,
		offsetX:     100,
		offsetY:     0
	},

	{	name:        'red_truc1', // 4
		description: 'DESC',
		price:       50,
		offsetX:     100,
		offsetY:     100
	},

	{	name:        'red_truc2', // 5
		description: 'DESC',
		price:       20,
		offsetX:     100,
		offsetY:     200
	}
];

G.game.choice_building = 0;

G.game.constructions = [];

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
