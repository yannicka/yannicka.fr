G.map.house1 = {
	name: 'Maison de Bernard',
	img:  'house1',
	map:   [],
	map_t: []
};

G.map.house1['e4;7'] = G.map.house1['e5;7'] = function() {
	G.game.tp_player(10, 10, 'big_world');
};
