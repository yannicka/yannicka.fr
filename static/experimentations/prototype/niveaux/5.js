var niveauActuel = 5;

var niveauZoom = 32;

var niveau = [
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,1,0,1],
	[1,0,0,0,0,0,0,1,1,1,1,1],
	[1,0,0,0,0,0,0,1,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1,0,1],
	[1,1,1,1,1,1,1,1,1,1,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,2,1],
	[1,1,1,1,1,1,1,1,1,1,1,1]
];

var joueur = {
	x: 10,
	y: 10,
	sens: 3
};

var caisses = [];

var interrupteurs = [];

var piques = [
	{
		x: 1,
		y: 3,
		o: 2,
		c: 5,
		ouvert: true
	},
	{
		x: 2,
		y: 3,
		o: 2,
		c: 5,
		ouvert: true
	},
	{
		x: 2,
		y: 4,
		o: 2,
		c: 5,
		ouvert: true
	}
];

var teleporteurs = [
	{
		xDepart: 8,
		yDepart: 1,
		xArrive: 10,
		yArrive: 1,
	}
];

var portes = [
	{
		xPorte: 7,
		yPorte: 1,
		xCle: 1,
		yCle: 4,
		cleRamasse: false,
		porteOuverte: false
	}
];

var pousseurs = [];

var infinies = [];
