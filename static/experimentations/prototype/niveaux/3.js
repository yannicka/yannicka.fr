var niveauActuel = 3;

var niveauZoom = 32;

var niveau = [
	[1,1,1,1],
	[1,0,0,1],
	[1,0,0,1],
	[1,0,0,1],
	[1,0,0,1],
	[1,0,0,1],
	[1,0,0,1],
	[1,2,0,1],
	[1,1,1,1]
];

var joueur = {
	x: 1,
	y: 7,
	sens: 1
};

var caisses = [
	{
		x: 2,
		y: 2
	}
];

var interrupteurs = [
	{
		xInterrupteur: 2,
		yInterrupteur: 7,
		xRocher: 1,
		yRocher: 1,
		ouvert: false,
		signe: ''
	}
];

var piques = [];

var teleporteurs = [];

var portes = [];

var pousseurs = [];

var infinies = [];