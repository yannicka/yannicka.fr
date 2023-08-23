class WeaponsPanel extends InterfaceElement
	constructor: (x, y, { reversed }) ->
		super(x, y)

		@reversed = reversed

		# à faire : nettoyer ce truc
		if @reversed
			@setX(Game.getWidth() - 88)

	update: (dt) ->
		for miniature in @children
			miniature.update(dt)

	fillWeaponsWithPlayer: (player) ->
		weapons = player.getWeapons()

		incr = if @reversed then -20 else 20

		weapons.forEach (weapon, index) =>
			miniature = new Miniature(
				weapon.getSmallImage(),
				weapon.getName(),
				index * incr, 0, 16, 16,
				reversed: @reversed)

			@addChild(miniature)
