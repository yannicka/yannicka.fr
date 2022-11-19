var niveauActuel = 7;

var niveauZoom = 32;

var niveau = [
	[1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,0,1],
	[1,0,0,0,0,0,0,0,1],
	[1,0,0,0,2,0,0,0,1],
	[1,0,0,0,0,0,0,0,1],
	[1,0,1,1,0,1,1,1,1],
	[1,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1]
];

var joueur = {
	x: 4,
	y: 4,
	sens: 4
};

var caisses = [];

var interrupteurs = [];

var piques = [];

var teleporteurs = [
	{
		xDepart: 1,
		yDepart: 1,
		xArrive: 7,
		yArrive: 7,
	}
];

var portes = [];

var pousseurs = [];

var infinies = [];