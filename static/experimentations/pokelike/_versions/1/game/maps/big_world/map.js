G.map.big_world = {
	name: 'Le dehors',
	img:  'big_world',
	map:   [],
	map_t: [],

	'e10;9': function() {
		G.game.tp_player(4, 6, 'house1');
	},

	'a12;9': function() {
		G.game.show_text([
			G.map.house1.name,
			['Un gentil monsieur ?',
				['Oui', function() {
					G.game.show_text([
						['Vraiment gentil ?',
							['Oui', function() {
								G.game.show_text(['Vraiment gentil !']);
							}],
							['Non', function() {
								G.game.show_text(['Gentil mais pas vraiment']);
							}]
						]
					]);
				}],
				['Non', function() {
					G.game.show_text(['Pas gentil :(']);
				}]
			]
		]);
	}
};
