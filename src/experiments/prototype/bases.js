requestAnimFrame = (function() {
	return window.requestAnimationFrame     ||
		window.webkitRequestAnimationFrame  ||
		window.mozRequestAnimationFrame     ||
		window.oRequestAnimationFrame       ||
		window.msRequestAnimationFrame      ||

		function (callback) {
			window.setTimeout(callback, 1000 / 60);
		}
	;
})();

function Create() {
	niveauLargeur = niveau[0].length;
	niveauHauteur = niveau.length;

	canvas.width  = niveauLargeur * niveauZoom;
	canvas.height = niveauHauteur * niveauZoom;

	for (var lien in images) {
		image[lien] = new Image();
		image[lien].src = images[lien];
	}

	Update();
}

function Update() {
	if (nbDeplacementsTotalNecessaire == 0) {
		nbDeplacementsTotalNecessaire = nbCasesVide - nbCaisses - nbInfinies;
	}

	dessineNiveau();
	dessinePiques();
	dessineTeleporteurs();
	dessinePortes();
	dessinePousseurs();
	dessineInterrupteurs();
	dessineInfinies();
	dessineCaisses();
	dessineJoueur();

	victoire();

	requestAnimFrame(Update);
}

function Destroy(couleurFondDebut, couleurFondFin, couleurTexte, texte) {
	context.rect(0, 0, canvas.width, canvas.height);

	var degrade = context.createRadialGradient(canvas.width / 2, canvas.width / 2, 0, canvas.width / 2, canvas.width / 2, canvas.width / 2);
	degrade.addColorStop(0, couleurFondDebut);
	degrade.addColorStop(1, couleurFondFin);
	context.fillStyle = degrade;
	context.fill();

	context.font = '36px Arial';
	context.fillStyle  = couleurTexte;
	context.textAlign = 'center';
	context.fillText(texte, canvas.width / 2, canvas.height / 2 + 18);
}

Create();
