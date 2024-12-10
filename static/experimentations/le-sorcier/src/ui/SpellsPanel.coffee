class SpellsPanel extends InterfaceElement
	constructor: (x, y, { reversed }) ->
		super(x, y)

		@reversed = reversed

		# à faire : nettoyer ce truc
		if @reversed
			@setX(Game.getWidth() - 24)

	update: (dt) ->
		for miniature in @children
			miniature.update(dt)

	fillSpellsWithPlayer: (player) ->
		spells = player.getSpells()

		incr = if @reversed then -20 else 20

		spells.forEach (spell, index) =>
			miniature = new Miniature(
				spell.getSmallImage(),
				spell.getName(),
				index * incr, 0, 16, 16,
				reversed: @reversed)

			@addChild(miniature)
