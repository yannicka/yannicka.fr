class PlayerInformations extends InterfaceElement
	constructor: (x, y, { reversed }) ->
		super(x, y)

		@reversed = reversed

		@width  = 58
		@height = 58

		@texts = ''

		# à faire : nettoyer
		if @reversed
			@setX(Game.getWidth() - 68)

		@tooltip = new Tooltip(0, 0, 'Hello')
		@addChild(@tooltip)

		@hovered = no

	update: (dt) ->
		mouse = Game.getMouse()
		mousePos = mouse.getPos()

		{ x, y, width, height } = @getBounds()

		if mousePos.x > x and
		mousePos.x <= x + width and
		mousePos.y > y and
		mousePos.y <= y + height
			@hovered = yes
			mouse.setHovered(yes)
		else
			@hovered = no

	computeDraw: ->
		if @hovered
			mouse = Game.getMouse()

			pos = @getAbsolutePosition()
			x = mouse.getX() - pos.getX() + 8
			y = mouse.getY() - pos.getY() + 14

			if @reversed
				x -= @tooltip.getWidth() + 8

			@tooltip.setVisible(yes)
			@tooltip.setX(x)
			@tooltip.setY(y)
		else
			@tooltip.setVisible(no)

	getBounds: ->
		position = @getAbsolutePosition()

		x = position.getX()
		y = position.getY()

		return {
			x: x
			y: y
			width: @width
			height: @height
		}

	setText: (text) ->
		@tooltip.setText(text)

	fillTextWithPlayer: (player) ->
		text = """
			**Vie :** #{player.life}/#{player.maxlife}
			**Force :** #{player.strength}
			**Défense :** #{player.defense}
			**Vitesse :** #{player.speed}
			**Magie :** #{player.magic}
			**Élément :** #{Element.toString(player.element)}
		"""

		@setText(text)
