/* Préchargement des images */
function load() {
	/* On défini la taille du canvas à la taille du jeu */
	can.width  = camera.w;
	can.height = camera.h;

	/* On met un fond noir */
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillRect(0, 0, can.width, can.height);

	/* On affiche la barre de chargement */
	ctx.fillStyle = 'rgb(255, 255, 255)';
	ctx.fillRect(10, can.height / 2 - 5, imgsload / imgstoload * 100, 10);

	/* On affiche le pourcentage chargé */
	ctx.fillText('Chargement... ' + (imgsload / imgstoload * 100) + '%', 10, 20);
	ctx.fillText(Object.keys(img)[imgsload], 10, 40);

	/* Si toutes les images sont chargées, on lance l'initialisation du jeu, sinon on relance le chargement */
	if (imgsload == imgstoload) {
		init();
	} else {
		setTimeout(load, 100);
	}
}
