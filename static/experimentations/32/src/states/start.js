/* -------------------------------------------------------
	Créer la variable de la scène de l'écran d'accueil
------------------------------------------------------- */
G.start = {};

/* ---------------------------------
	Met à jour l'écran d'accueil
--------------------------------- */
G.start.update = function() {
	if (Key.press(Key.X) || Key.press(Key.C) || Key.press(Key.ESC) || Key.press(Key.ENTER)) {
		G.game.change_map(0);
		G.change_state('game');
	}

	G.start.draw();
};

/* ------------------------------
	Dessine l'écran d'accueil
------------------------------ */
G.start.draw = function() {
	G.ctx.clear(G.can);

	G.ctx.drawImage(G.image.start_screen, 0, 0);
};
