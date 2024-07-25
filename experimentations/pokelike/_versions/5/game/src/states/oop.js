// Classe A
var A = {
	attr1: 'default_value',
	attr2: 5
};

// Objet de la classe A
var player = A.clone(); // TODO -> créer méthode de clonage

function a_move(a, param1, param2) {
	a.attr1 = param1;
	a.attr2 = param2;
}

function a_truc(a, param) {
	a.attr2 += param;
}

// Appeler une méthode
a_move(player, 'salut', 2); // = player->move('salut', 2);
