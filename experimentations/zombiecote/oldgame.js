var keys, joueur, ennemi, sens;

function Create() {
	JSPif.Canvas('jeu', 400, 400);
	JSPif._context.scale(6, 6);

	keys = [];
	sens = 'Droite';

	joueur = new JSPif.Sprite(0, 0, 'player.png', 12, 12);

	joueur.addAnimation('marcheDroite', [0, 1]);
	joueur.addAnimation('attendDroite', [1]);
	joueur.addAnimation('attendGauche', [2]);
	joueur.addAnimation('marcheGauche', [2, 3]);

	document.addEventListener('keydown', keydown, false);
	document.addEventListener('keyup', keyup, false);
	document.addEventListener('mousedown', mousedown, false);

	Update();
}

function Update() {
	JSPif.Clear();

	if (keys[39]) {
		sens = 'Droite';
		joueur.x++;
		joueur.play('marche' + sens, false);
	}

	if (keys[37]) {
		sens = 'Gauche';
		joueur.x--;
		joueur.play('marche' + sens, false);
	}

	if (keys[38]) {
		joueur.y--;
		joueur.play('marche' + sens, false);
	}

	if (keys[40]) {
		joueur.y++;
		joueur.play('marche' + sens, false);
	}

	if (!keys[37] && !keys[38] && !keys[39] && !keys[40]) {
		joueur.play('attend' + sens);
	}

	joueur.draw();

	requestAnimFrame(Update);
}

function keydown(e) {
	keys[e.keyCode] = true;
}

function keyup(e) {
	keys[e.keyCode] = false;
}

function mousedown(e) {
}

Create();
