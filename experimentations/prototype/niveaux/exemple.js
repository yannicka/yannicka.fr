var niveauActuel = 4;

var niveauZoom = 32;

var niveau = [
	[1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,1,1,1,1],
	[1,0,0,0,0,0,1,0,0,1],
	[1,0,0,0,0,0,1,0,0,1],
	[1,0,0,0,0,0,1,0,0,1],
	[1,0,0,0,0,0,1,0,0,1],
	[1,0,0,0,0,0,1,0,0,1],
	[1,0,0,0,0,0,1,0,0,1],
	[1,0,0,0,0,0,1,0,2,1],
	[1,1,1,1,1,1,1,1,1,1]
];

var joueur = {
	x: 8,
	y: 8,
	sens: 3
};

var caisses = [
	{
		x: 4,
		y: 5
	}
];

var interrupteurs = [
	{
		xInterrupteur: 1,
		yInterrupteur: 1,
		xRocher: 1,
		yRocher: 8,
		ouvert: false,
		signe: '' // -> ▲
	}
];

var piques = [
	{
		x: 5,
		y: 5,
		o: 2,
		c: 5,
		ouvert: true
	}
];

var teleporteurs = [
	{
		xDepart: 7,
		yDepart: 2,
		xArrive: 3,
		yArrive: 1,
	}
];

var portes = [
	{
		xPorte: 5,
		yPorte: 8,
		xCle: 3,
		yCle: 8,
		cleRamasse: false,
		porteOuverte: false
	}
];

var pousseurs = [
	{
		x: 1,
		y: 3,
		sens: 2
	}
];

var infinies = [
	{
		x: 4,
		y: 7
	}
];