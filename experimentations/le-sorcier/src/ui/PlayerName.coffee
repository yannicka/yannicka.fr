class PlayerName extends InterfaceElement
	constructor: (x, y, { reversed }) ->
		super(x, y)

		@reversed = reversed

		@setName('Inconnu')

		@lineWidth = 2

		@sprite.strokeStyle = rgb(41, 35, 26)
		@sprite.fillStyle   = rgb(255, 255, 255)
		@sprite.font        = 'bold 22px Grobold'
		@sprite.lineWidth   = @lineWidth

	# à faire : revoir l'affichage (le pseudo est décalé)
	computeDraw: ->
		@sprite.fillText(@name, @lineWidth, @lineWidth)
		@sprite.strokeText(@name, @lineWidth, @lineWidth)

	setName: (name) ->
		@name = name

		if @reversed
			width = @sprite.measureText(@name).width

			# à faire : nettoyer ce nombre magique
			@setX(Game.getWidth() - width - 10)
