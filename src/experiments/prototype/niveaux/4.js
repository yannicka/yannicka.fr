var niveauActuel = 4;

var niveauZoom = 32;

var niveau = [
	[1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,1,0,0,0,1],
	[1,1,1,1,0,0,0,0,0,1],
	[1,0,0,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,2,1],
	[1,1,1,1,1,1,1,1,1,1]
];

var joueur = {
	x: 8,
	y: 5,
	sens: 3
};

var caisses = [];

var interrupteurs = [];

var piques = [
	{
		x: 8,
		y: 3,
		o: 2,
		c: 5,
		ouvert: true
	}
];

var teleporteurs = [
	{
		xDepart: 2,
		yDepart: 4,
		xArrive: 3,
		yArrive: 1,
	}
];

var portes = [];

var pousseurs = [];

var infinies = [];