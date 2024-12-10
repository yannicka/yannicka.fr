class Lifebar extends InterfaceElement
	constructor: (x, y, { reversed }) ->
		super(x, y)

		@reversed = reversed

		@percentage = 100
		@width      = 240

		# à faire : nettoyer ce nombre magique
		if @reversed
			@setX(@getX() - 12)

	computeDraw: ->
		# à faire : éviter les nombres magiques
		if @reversed
			@sprite.save()
			@sprite.translate(Game.getWidth(), 0)
			@sprite.scale(-1, 1)

		if @percentage > 0
			@sprite.drawImage(Img.get('lifebar'),
				0, 0, 4, 14,
				0, 0, 4, 14)

			@sprite.drawImage(Img.get('lifebar'),
				4, 0, 4, 14,
				4, 0, @percentage * @width - 8, 14)

			@sprite.drawImage(Img.get('lifebar'),
				17, 0, 4, 14,
				@percentage * @width - 5, 0, 4, 14)

		if @reversed
			@sprite.restore()

	getWidth: -> @width
	getPercentage: -> @percentage

	setWidth: (width) ->
		@width = width

	setPercentage: (percentage) ->
		@percentage = percentage
