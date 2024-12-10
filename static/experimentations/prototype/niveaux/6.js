var niveauActuel = 6;

var niveauZoom = 32;

var niveau = [
	[1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,1],
	[1,0,0,1,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,1,0,0,1],
	[1,2,0,0,0,0,0,1,1],
	[1,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1]
];

var joueur = {
	x: 1,
	y: 6,
	sens: 2
};

var caisses = [];

var interrupteurs = [];

var piques = [];

var teleporteurs = [];

var portes = [];

var pousseurs = [
	{
		x: 6,
		y: 7,
		sens: 4
	}
];

var infinies = [];