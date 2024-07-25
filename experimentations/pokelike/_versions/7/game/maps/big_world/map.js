G.map.big_world = {
	name: 'Le monde extérieur',

	'e10;9': function() {
		G.game.tp_player(4, 6, 'house1');
	},

	'a12;9': function() {
		G.game.show_text([
			G.map.house1.name,

			['Voulez-vous repondre a la question du panneau ?',
				['Oui', function() {
					G.game.show_text([
						['"Vois-tu la lumiere ?"',
							['Oui', function() {
								G.game.show_text(['Rentres dedans et fous moi la paix !']);
							}],

							['Non', function() {
								G.game.show_text(['Achetes-toi des lunettes !']);
							}]
						]
					]);
				}],

				['Non', function() {
					G.game.show_text(['Dommage...']);
				}]
			]
		]);
	}
};
