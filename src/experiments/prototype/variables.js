var
	canvas  = document.getElementById('canvas'),
	context = canvas.getContext('2d'),

	niveauLargeur = 0,
	niveauHauteur = 0,

	nbCasesVide = 0,

	zoomBase = 32,

	nbCaisses  = caisses.length,
	nbInfinies = infinies.length,

	nbDeplacementsTotalNecessaire = 0,
	nbDeplacementsJoueur          = 0,
	nbDeplacementsCaisses         = 0,

	image  = {},
	images = {
		joueur:            'images/joueur.png',

		mur:               'images/mur.png',

		sol:               'images/sol.png',
		solTraverse:       'images/solTraverse.png',

		caisse:            'images/caisse.png',

		interrupteur:      'images/interrupteur.png',
		rocher:            'images/rocher.png',

		piques:            'images/piques.png',

		teleporteurDepart: 'images/teleporteurDepart.png',
		teleporteurArrive: 'images/teleporteurArrive.png',

		cle:               'images/cle.png',
		porte:             'images/porte.png',

		pousseur:          'images/pousseur.png',

		infinie:           'images/infinie.png'
	},

	cases = {
		sol:         0,
		mur:         1,
		solTraverse: 2
	}
;
