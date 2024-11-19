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
	if (Key.press(Key.P) || Key.press(Key.ESC)) {
		G.game.pause = !G.game.pause;

		G.game.last_image = G.ctx.getImageData(0, 0, G.can.width, G.can.height);
	}

	if (!G.game.pause) {
		if (G.game.player.life <= 0) {
			G.change_state('defeat');
		}

		if (G.game.enemy.life <= 0) {
			G.change_state('victory');
		}

		if (Mouse.x > G.can.width - 50) {
			G.camera.x += 12;
		} else if (Mouse.x < 50) {
			G.camera.x -= 12;
		}

		var i = 0;
		var j = 0;
		var x = 0;
		var y = 0;

		var construction = false;
		var building     = false;

		var solider = false;
		var knight  = false;

		var opponent = '';

		if (Mouse.down() && Mouse.x > 0 && Mouse.x < G.can.width && Mouse.y > 0 && Mouse.y < G.can.height - 60) {
			choice_building = G.game.buildings[G.game.choice_building];

			if (G.game.player.gold - choice_building.cost >= 0) {

				x = Math.floor((Mouse.x + G.camera.x) / G.map.zoom);
				y = Math.floor((Mouse.y + G.camera.y) / G.map.zoom);

				construction = G.game.constructions[y][x];

				if (G.game.constructions.validPos(x, y) && construction.owner == false && x > 0 && x < 8) {
					G.game.player.gold -= choice_building.cost;

					construction.building = G.game.choice_building;
					construction.owner    = 'player';
					construction.life     = choice_building.baselife;

					if (construction.building == G.game.STABLE)
						construction.horses = 0;

					Mouse.click = false;

					G.game.push_text('-' + choice_building.cost + ' golds', x * G.map.zoom + 50, y * G.map.zoom + 20);
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

						if (building.hasOwnProperty('callback')) {
							if (construction.timer > building.callback.every) {
								construction.timer = 0;
								G.game.callback[building.callback.action](construction.owner, x, y, construction, building);
							}
						}
					}
				}
			}
		}

		for (i = 0 ; i < G.game.teams.length ; i++) {
			for (j = 0 ; j < G.game[G.game.teams[i]].soliders.length ; j++) {
				solider = G.game[G.game.teams[i]].soliders[j];

				x = Math.floor(solider.x / G.map.zoom);
				y = solider.line;

				construction = G.game.constructions[y][x];
				building     = G.game.buildings[construction.building];

				opponent = G.game.teams[i] == 'player' ? 'enemy' : 'player';

				solider.x += G.game.teams[i] == 'player' ? solider.speed : -solider.speed;

				if ((solider.x + 24 > G.map.width && G.game.teams[i] == 'player') || (solider.x < 0 && G.game.teams[i] == 'enemy')) {
					G.game[opponent].life -= solider.damage;
					G.game[G.game.teams[i]].soliders.splice(j, 1);
				}

				if (construction.owner == G.game.teams[i]) {
					if (construction.building == G.game.STABLE) {
						if (construction.horses > 0) {
							construction.horses--;

							G.game[G.game.teams[i]].knights.push({
								x:      solider.x,
								y:      solider.y,
								line:   solider.line,
								speed:  solider.speed + 2 + Math.random(),
								damage: G.game.DAMAGE_KNIGHT
							});

							G.game[G.game.teams[i]].soliders.splice(j, 1);
						}
					}
				} else if (construction.owner == opponent && construction.finish == true) {
					construction.life -= solider.damage;
					G.game[G.game.teams[i]].soliders.splice(j, 1);

					if (construction.life <= 0) {
						G.game[G.game.teams[i]].gold += parseInt(building.cost / 2);
						construction.building = 0;
						construction.owner    = false;
						construction.finish   = 0;
						construction.timer    = 0;
						construction.level    = 1;
					}
				}
			}

			for (j = 0 ; j < G.game[G.game.teams[i]].knights.length ; j++) {
				knight = G.game[G.game.teams[i]].knights[j];

				x = Math.floor(knight.x / G.map.zoom);
				y = knight.line;

				construction = G.game.constructions[y][x];
				building     = G.game.buildings[construction.building];

				opponent = G.game.teams[i] == 'player' ? 'enemy' : 'player';

				knight.x += G.game.teams[i] == 'player' ? knight.speed : -knight.speed;

				if ((knight.x + 24 > G.map.width && G.game.teams[i] == 'player') || (knight.x < 0 && G.game.teams[i] == 'enemy')) {
					G.game[opponent].life -= knight.damage;
					G.game[G.game.teams[i]].knights.splice(j, 1);
				}

				if (construction.owner == opponent && construction.finish == true) {
					construction.life -= knight.damage;
					G.game[G.game.teams[i]].knights.splice(j, 1);

					if (construction.life <= 0) {
						G.game[G.game.teams[i]].gold += parseInt(building.cost / 3);
						construction.building = 0;
						construction.owner    = false;
						construction.finish   = 0;
						construction.timer    = 0;
						construction.level    = 1;
					}
				}
			}
		}

		if (Key.press(Key.Q)) {
			G.game.choice_building = 0;
		} else if (Key.press(Key.W)) {
			G.game.choice_building = 1;
		} else if (Key.press(Key.E)) {
			G.game.choice_building = 2;
		} else if (Key.press(Key.R)) {
			G.game.choice_building = 3;
		}

		//=BEGIN PSEUDO-IA
		if (G.timer.cross % 180 == 0) {

			var free_boxes = [];

			var nb_bank   = 0;
			var nb_farm   = 0;
			var nb_arena  = 0;
			var nb_stable = 0;

			var r = 0;

			for (var ey = 0 ; ey < G.map.lines ; ey++) {
				for (var ex = 12 ; ex < G.map.cols - 1 ; ex++) {
					construction = G.game.constructions[ey][ex];
					building     = G.game.buildings[construction.building];

					if (construction.owner == false) {
						free_boxes.push({ x: ex, y: ey });
					} else if (construction.building == G.game.BANK) {
						nb_bank++;
					} else if (construction.building == G.game.FARM) {
						nb_farm++;
					} else if (construction.building == G.game.ARENA) {
						nb_arena++;
					} else if (construction.building == G.game.STABLE) {
						nb_stable++;
					}

					if (construction.owner == 'enemy') {
						if (construction.building == G.game.ARENA) {
							G.game.gen_solider('enemy', ex, ey, construction, building);
						}
					}
				}
			}

			if (free_boxes.length > 0) {
				var where = free_boxes[Math.floor(Math.random() * free_boxes.length)];

				if ((nb_bank == 0 || nb_bank <= nb_farm) && where.x > 13)  {
					r = G.game.BANK;
				} else {
					if (where.x == 12) {
						if (nb_farm == 0) {
							where = free_boxes[Math.floor(Math.random() * free_boxes.length)];
							r = G.game.FARM;
						} else {
							r = G.game.STABLE;
						}
					} else if (where.x >= 13 && where.x <= 14) {
						if (nb_farm == 0) {
							where = free_boxes[Math.floor(Math.random() * free_boxes.length)];
							r = G.game.FARM;
						} else {
							r = G.game.ARENA;
						}
					} else if (where.x >= 15 && where.x <= 16) {
						if (nb_bank <= nb_farm) {
							r = G.game.BANK;
						} else {
							r = Math.rand(0, 2);
						}
					} else {
						if (nb_bank < nb_farm) {
							r = G.game.BANK;
						} else {
							r = Math.rand(0, 1);
						}
					}
				}

				if (G.game.enemy.gold - G.game.buildings[r].cost >= 0) {
					switch (r) {
						case G.game.BANK:
							G.game.constructions[where.y][where.x].building = G.game.BANK;
							G.game.constructions[where.y][where.x].owner    = 'enemy';
							G.game.constructions[where.y][where.x].life     = G.game.buildings[G.game.BANK].baselife;
							G.game.enemy.gold -= G.game.buildings[G.game.BANK].cost;
							break;
						case G.game.FARM:
							G.game.constructions[where.y][where.x].building = G.game.FARM;
							G.game.constructions[where.y][where.x].owner    = 'enemy';
							G.game.constructions[where.y][where.x].life     = G.game.buildings[G.game.FARM].baselife;
							G.game.enemy.gold -= G.game.buildings[G.game.FARM].cost;
							break;
						case G.game.ARENA:
							G.game.constructions[where.y][where.x].building = G.game.ARENA;
							G.game.constructions[where.y][where.x].owner    = 'enemy';
							G.game.constructions[where.y][where.x].life     = G.game.buildings[G.game.ARENA].baselife;
							G.game.enemy.gold -= G.game.buildings[G.game.ARENA].cost;
							break;
						case G.game.STABLE:
							G.game.constructions[where.y][where.x].building = G.game.STABLE;
							G.game.constructions[where.y][where.x].owner    = 'enemy';
							G.game.constructions[where.y][where.x].life     = G.game.buildings[G.game.STABLE].baselife;
							G.game.enemy.gold -= G.game.buildings[G.game.STABLE].cost;
							break;
					}
				}
			}

		}
		//=END PSEUDO-IA
	}

	G.game.draw();

	if (G.game.hover)
		document.body.style.cursor = 'pointer';
	else
		document.body.style.cursor = 'auto';

	G.game.hover = false;
};

G.game.draw = function() {
	if (!G.game.pause) {
		var i = 0;
		var j = 0;
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

		var text = '';

		G.ctx.clear(G.can);

		G.ctx.save();
		G.ctx.translate(-G.camera.x, -G.camera.y);

			G.ctx.drawImage(G.image.bg, 0, 0);

			G.ctx.drawImage(G.image.blue_castle, 0, 0);

			G.ctx.drawImage(G.image.red_castle, G.map.width - G.map.zoom, 0);

			for (y = 0 ; y < G.map.lines ; y++) {
				for (x = 0 ; x < G.map.cols ; x++) {
					construction = G.game.constructions[y][x];
					building     = G.game.buildings[construction.building];

					if (construction.owner) {
						if (construction.finish == true) {
							G.ctx.drawImage(
								G.image.buildings,
								construction.owner == 'enemy' ? 100 : 0,
								building.offsetY,
								G.map.zoom,
								G.map.zoom,
								x * G.map.zoom,
								y * G.map.zoom,
								G.map.zoom,
								G.map.zoom
							);
						} else {
							size = Math.clamp(((construction.finish) / (building.time_creation)) * G.map.zoom, 1, G.map.zoom);
							construction.opacity = size / G.map.zoom;

							G.ctx.save();
							G.ctx.globalAlpha = construction.opacity;

								G.ctx.drawImage(
									G.image.buildings,
									construction.owner == 'enemy' ? 100 : 0,
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

						if (construction.owner == 'player') {
							if (building.can_upgrade && construction.finish == true) {
								G.ctx.drawImage(G.image.buttons, 0, 0, 32, 64, x * G.map.zoom + G.map.zoom - 32, y * G.map.zoom, 32, 64);
							} else {
								G.ctx.drawImage(G.image.buttons, 0, 0, 32, 32, x * G.map.zoom + G.map.zoom - 32, y * G.map.zoom, 32, 32);
							}

							if (construction.building == G.game.ARENA && construction.finish == true) {
								G.ctx.drawImage(G.image.buttons, 0, 64, 32, 32, x * G.map.zoom + 68, y * G.map.zoom + 32, 32, 32);
							}

							if (construction.building == G.game.STABLE && construction.finish == true) {
								G.ctx.save();
									G.ctx.fillStyle = rgb(0, 0, 0);
									G.ctx.textAlign = 'left';
									G.ctx.font      = 'normal 16px "Arial", serif';
									G.ctx.strokeStyle = rgb(255, 255, 255);
									G.ctx.lineWidth = 1;
									G.ctx.fillText(construction.horses, x * G.map.zoom + 6, y * G.map.zoom + 20);
									G.ctx.strokeText(construction.horses, x * G.map.zoom + 6, y * G.map.zoom + 20);
								G.ctx.restore();

								G.ctx.drawImage(G.image.buttons, 0, 96, 32, 32, x * G.map.zoom + 68, y * G.map.zoom + 32, 32, 32);
							}
						}

						if (construction.finish != true) {
							G.ctx.fillStyle = rgb(0, 0, 0);
							G.ctx.fillRect(x * G.map.zoom + 25, y * G.map.zoom + G.map.zoom - 8, 50, 6);

							G.ctx.fillStyle = rgb(255, 255, 0);
							G.ctx.fillRect(x * G.map.zoom + 26, y * G.map.zoom + G.map.zoom - 7, Math.clamp(((construction.finish) / (building.time_creation)) * 48, 0, 48), 4);
						} else {
							G.ctx.fillStyle = rgb(0, 0, 0);
							G.ctx.fillRect(x * G.map.zoom + 25, y * G.map.zoom + G.map.zoom - 8, 50, 6);

							G.ctx.fillStyle = rgb(255, 0, 0);
							G.ctx.fillRect(x * G.map.zoom + 26, y * G.map.zoom + G.map.zoom - 7, Math.clamp(((construction.life) / (building.baselife)) * 48, 0, 48), 4);
						}
					}
				}
			}

			x = Math.floor((Mouse.x + G.camera.x) / G.map.zoom);
			y = Math.floor((Mouse.y + G.camera.y) / G.map.zoom);

			if (x > 0 && x < 8) {
				if (G.game.constructions.validPos(x, y) && !G.game.constructions[y][x].owner) {
					building = G.game.buildings[G.game.choice_building];

					G.ctx.save();
					G.ctx.globalAlpha = 0.5;

						G.ctx.drawImage(
							G.image.buildings,
							0,
							building.offsetY,
							G.map.zoom,
							G.map.zoom,
							x * G.map.zoom,
							y * G.map.zoom,
							G.map.zoom,
							G.map.zoom
						);

					G.ctx.restore();
				}

				G.ctx.drawImage(G.image.pointers, 0, 0, 100, 100, x * G.map.zoom, y * G.map.zoom, 100, 100);
			}

			for (i = 0 ; i < G.game.teams.length ; i++) {
				for (j = 0 ; j < G.game[G.game.teams[i]].soliders.length ; j++) {
					solider = G.game[G.game.teams[i]].soliders[j];

					if (G.game.teams[i] == 'player') {
						G.ctx.drawImage(G.image.units, 0, 0, 24, 24, solider.x, solider.y, 24, 24);
					} else {
						G.ctx.drawImage(G.image.units, 24, 0, 24, 24, solider.x, solider.y, 24, 24);
					}
				}

				for (j = 0 ; j < G.game[G.game.teams[i]].knights.length ; j++) {
					knight = G.game[G.game.teams[i]].knights[j];

					if (G.game.teams[i] == 'player') {
						G.ctx.drawImage(G.image.units, 0, 24, 24, 24, knight.x, knight.y, 24, 24);
					} else {
						G.ctx.drawImage(G.image.units, 24, 24, 24, 24, knight.x, knight.y, 24, 24);
					}
				}
			}

		G.ctx.restore();

		G.ctx.drawImage(G.image.tool_bar, 0, G.map.height);

		G.ctx.fillStyle = rgb(0, 0, 0);
		G.ctx.font      = 'normal 13px "Arial", serif';
		G.ctx.textAlign = 'left';
		G.ctx.fillText(parseInt(G.game.player.gold), 18, 418);
		//G.ctx.fillText(parseInt(G.game.enemy.gold), 450, 418);
		G.ctx.fillText(G.game.player.life + ' / ' + G.game.player.maxlife, 18, 430);
		G.ctx.fillText(G.game.player.food, 18, 444);
		G.ctx.fillText(G.game.player.soliders.length, 18, 457);
		G.ctx.fillText(G.game.player.knights.length, 74, 457);
		G.ctx.textAlign = 'right';
		G.ctx.fillText(G.game.enemy.life + ' / ' + G.game.enemy.maxlife, 618, 437);

		if (pointHitBox(Mouse.x, Mouse.y, { x: 2, y: 408, w: 12, h: 12 })) {
			text = 'Gold';

			G.game.draw_tooltip(Mouse.x, Mouse.y - 24, G.ctx.measureText(text).width, 24);

			G.ctx.save();
			G.ctx.translate(Mouse.x, Mouse.y - 24);

				G.ctx.fillStyle = rgb(0, 0, 0);
				G.ctx.textAlign = 'left';
				G.ctx.font      = 'normal 12px "Arial", serif';
				G.ctx.fillText(text, 5, 16);

			G.ctx.restore();
		}

		if (pointHitBox(Mouse.x, Mouse.y, { x: 2, y: 420, w: 12, h: 12 })) {
			text = 'Life';

			G.game.draw_tooltip(Mouse.x, Mouse.y - 24, G.ctx.measureText(text).width, 24);

			G.ctx.save();
			G.ctx.translate(Mouse.x, Mouse.y - 24);

				G.ctx.fillStyle = rgb(0, 0, 0);
				G.ctx.textAlign = 'left';
				G.ctx.font      = 'normal 12px "Arial", serif';
				G.ctx.fillText(text, 5, 16);

			G.ctx.restore();
		}

		if (pointHitBox(Mouse.x, Mouse.y, { x: 2, y: 433, w: 12, h: 12 })) {
			text = 'Food';

			G.game.draw_tooltip(Mouse.x, Mouse.y - 24, G.ctx.measureText(text).width, 24);

			G.ctx.save();
			G.ctx.translate(Mouse.x, Mouse.y - 24);

				G.ctx.fillStyle = rgb(0, 0, 0);
				G.ctx.textAlign = 'left';
				G.ctx.font      = 'normal 12px "Arial", serif';
				G.ctx.fillText(text, 5, 16);

			G.ctx.restore();
		}

		if (pointHitBox(Mouse.x, Mouse.y, { x: 2, y: 446, w: 12, h: 12 })) {
			text = 'Soliders';

			G.game.draw_tooltip(Mouse.x, Mouse.y - 24, G.ctx.measureText(text).width, 24);

			G.ctx.save();
			G.ctx.translate(Mouse.x, Mouse.y - 24);

				G.ctx.fillStyle = rgb(0, 0, 0);
				G.ctx.textAlign = 'left';
				G.ctx.font      = 'normal 12px "Arial", serif';
				G.ctx.fillText(text, 5, 16);

			G.ctx.restore();
		}

		if (pointHitBox(Mouse.x, Mouse.y, { x: 60, y: 446, w: 12, h: 12 })) {
			text = 'Knights';

			G.game.draw_tooltip(Mouse.x, Mouse.y - 24, G.ctx.measureText(text).width, 24);

			G.ctx.save();
			G.ctx.translate(Mouse.x, Mouse.y - 24);

				G.ctx.fillStyle = rgb(0, 0, 0);
				G.ctx.textAlign = 'left';
				G.ctx.font      = 'normal 12px "Arial", serif';
				G.ctx.fillText(text, 5, 16);

			G.ctx.restore();
		}

		for (i = 0 ; i < 4 ; i++) {
			G.ctx.drawImage(G.image.buildings, 0, i * G.map.zoom, G.map.zoom, G.map.zoom, 137 + i * 33 + i, 418, 33, 33);
		}

		G.ctx.drawImage(G.image.pointers, 100, 0, 33, 33, G.game.choice_building * 33 + 137 + G.game.choice_building, 418, 33, 33);

		for (i = 0 ; i < 4 ; i++) {
			if (pointHitBox(Mouse.x, Mouse.y, { x: 138 + i * 33 + i, y: 418, w: 33, h: 33 })) {
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

			G.ctx.fillStyle = rgb(255, 255, 255);
			G.ctx.textAlign = 'center';
			G.ctx.font      = 'bold 12px "Arial", serif';

			for (i = 0 ; i < G.game.texts.length ; i++) {
				G.ctx.save();
				G.ctx.globalAlpha = G.game.texts[i].opacity;

					G.ctx.fillText(G.game.texts[i].text, G.game.texts[i].x, G.game.texts[i].y);
					G.game.texts[i].update();

					if (G.game.texts[i].opacity < 0) {
						G.game.texts.splice(i, 1);
					}

				G.ctx.restore();
			}

			for (y = 0 ; y < G.map.lines ; y++) {
				for (x = 0 ; x < G.map.cols ; x++) {
					construction = G.game.constructions[y][x];
					building     = G.game.buildings[construction.building];

					if (construction.owner) {
						if (construction.owner == 'player') {
							if (pointHitBox(Mouse.x + G.camera.x, Mouse.y + G.camera.y, { x: x * G.map.zoom + G.map.zoom - 32, y: y * G.map.zoom, w: 32, h: 32 })) {
								G.game.hover = true;

								sell_price = parseInt(building.cost * construction.level / 1.2);

								sell_text = 'Sell - ' + sell_price + ' gold';

								if (Mouse.down()) {
									G.game.sell('player', x, y, construction, sell_price);
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

							if (building.can_upgrade && construction.finish == true) {
								if (pointHitBox(Mouse.x + G.camera.x, Mouse.y + G.camera.y, { x: x * G.map.zoom + G.map.zoom - 32, y: y * G.map.zoom + 32, w: 32, h: 32 })) {
									G.game.hover = true;

									upgrade_cost = parseInt((building.cost) * (1 + (construction.level / 8)));
									upgrade_text = 'Upgrade to level ' + (construction.level + 1) + ' - ' + upgrade_cost + ' gold';

									if (Mouse.down()) {
										G.game.upgrade('player', x, y, construction, building, upgrade_cost);
										Mouse.click = false;
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

							if (construction.building == G.game.ARENA && construction.finish == true) {
								if (pointHitBox(Mouse.x + G.camera.x, Mouse.y + G.camera.y, { x: x * G.map.zoom + G.map.zoom - 32, y: y * G.map.zoom + 32, w: 32, h: 32 })) {
									G.game.hover = true;

									upgrade_text = 'Generate one solider - ' + G.game.PRICE_SOLIDER + ' foods';

									if (Mouse.down()) {
										G.game.gen_solider('player', x, y, construction, building);
										Mouse.click = false;
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

							if (construction.building == G.game.STABLE && construction.finish == true) {
								if (pointHitBox(Mouse.x + G.camera.x, Mouse.y + G.camera.y, { x: x * G.map.zoom + G.map.zoom - 32, y: y * G.map.zoom + 32, w: 32, h: 32 })) {
									G.game.hover = true;

									upgrade_text = 'Generate one horse - ' + G.game.PRICE_HORSE + ' foods';

									if (G.game.player.food - G.game.PRICE_HORSE >= 0) {
										if (Mouse.down()) {
											G.game.gen_horse('player', x, y, construction, building);
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
						}
					}
				}
			}

		G.ctx.restore();
	} else {
		G.ctx.putImageData(G.game.last_image, 0, 0);

		if (G.game.pause) {
			G.ctx.fillStyle = rgb(255, 255, 255);
			G.ctx.font      = 'normal 108px "Times New Roman", serif';
			G.ctx.textAlign = 'center';
			G.ctx.fillText('Pause', G.can.width / 2, G.can.height / 2);
		}
	}
};

G.game.texts = [];

G.game.push_text = function(text, x, y) {
	G.game.texts.push(new G.game.text_type(text, x, y));
};

G.game.text_type = function(text, x, y) {
	this.text    = text;
	this.x       = x;
	this.y       = y;
	this.opacity = 1;

	this.update = function() {
		this.y -= 0.2;
		this.opacity -= 0.02;
	};
};

G.game.entity = function() {
	this.gold     = 2000;
	this.life     = 600;
	this.maxlife  = 600;
	this.food     = 0;
	this.soliders = [];
	this.knights  = [];
};

G.game.enemy  = new G.game.entity();
G.game.player = new G.game.entity();

G.game.hover = false;

G.game.buildings = [
	{	name:          'Bank', // 0
		description:   'Makes a piece of gold (per level) every second',
		cost:          180,
		offsetY:       0,
		time_creation: 15000,
		baselife:      100,
		can_upgrade:   true,
		callback: {
			every:  1000,
			action: 'bank'
		}
	},

	{	name:          'Farm', // 1
		description:   'Generate a food (per level) every second',
		cost:          130,
		offsetY:       100,
		time_creation: 10000,
		baselife:      35,
		can_upgrade:   true,
		callback: {
			every:  1000,
			action: 'farm'
		}
	},

	{	name:          'Arena', // 2
		description:   'Create a solider (per level) when you need',
		cost:          210,
		offsetY:       200,
		time_creation: 9000,
		baselife:      130,
		can_upgrade:   false
	},

	{	name:          'Stable', // 3
		description:   'Create an horse (per level) when you need',
		cost:          220,
		offsetY:       300,
		time_creation: 12000,
		baselife:      100,
		can_upgrade:   false
	}
];

G.game.BANK   = 0;
G.game.FARM   = 1;
G.game.ARENA  = 2;
G.game.STABLE = 3;

G.game.PRICE_SOLIDER = 16;
G.game.PRICE_HORSE   = 10;

G.game.DAMAGE_SOLIDER = 7;
G.game.DAMAGE_KNIGHT  = 16;

G.game.choice_building = 0;

G.game.constructions = [];

G.game.hotkeys = 'QWER';

G.game.teams = ['player', 'enemy'];

G.game.pause      = false;
G.game.last_image = [];

G.game.draw_tooltip = function(x, y, w, h) {
	w += 12;

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
	bank: function(team, x, y, construction, building) {
		G.game[team].gold += 1 * construction.level;
	},

	farm: function(team, x, y, construction, building) {
		G.game[team].food += 1 * construction.level;
	}
};

G.game.gen_solider = function(team, x, y, construction, building) {
	if (G.game[team].food - G.game.PRICE_SOLIDER >= 0 && construction.finish == true) {
		G.game[team].soliders.push({
			x:      x * G.map.zoom + 76,
			y:      y * G.map.zoom + Math.rand(0, 76),
			line:   y,
			speed:  3 + (Math.random() * 2),
			damage: G.game.DAMAGE_SOLIDER
		});

		G.game[team].food -= G.game.PRICE_SOLIDER;

		G.game.push_text('-' + G.game.PRICE_SOLIDER + ' foods', x * G.map.zoom + 50, y * G.map.zoom + 20);
	}
};

G.game.gen_horse = function(team, x, y, construction, building) {
	if (G.game[team].food - G.game.PRICE_HORSE >= 0 && construction.finish == true) {
		construction.horses++;
		G.game[team].food -= G.game.PRICE_HORSE;

		G.game.push_text('-' + G.game.PRICE_HORSE + ' foods', x * G.map.zoom + 50, y * G.map.zoom + 20);
	}
};

G.game.sell = function(team, x, y, construction, price) {
	construction.building = 0;
	construction.owner    = false;
	construction.finish   = 0;
	construction.timer    = 0;
	construction.level    = 1;

	G.game[team].gold += price;

	G.game.push_text('+' + price + ' golds', x * G.map.zoom + 50, y * G.map.zoom + 20);
};

G.game.upgrade = function(team, x, y, construction, building, cost) {
	if (G.game[team].gold - cost >= 0 && construction.finish == true) {
		construction.level++;
		construction.finish = 0;
		construction.life = building.baselife;

		G.game[team].gold -= cost;

		G.game.push_text('-' + cost + ' golds', x * G.map.zoom + 50, y * G.map.zoom + 20);
	}
};
