class Miniature extends InterfaceElement
	constructor: (img, text, x, y, width, height, { reversed }) ->
		super(x, y)

		@img = img

		@setPosition(new Point(x, y))

		@width  = width
		@height = height

		@reversed = reversed

		@tooltip = new Tooltip(0, 0, text)
		@addChild(@tooltip)

		@hovered = no

	update: (dt) ->
		mouse = Game.getMouse()
		mousePos = mouse.getPos()

		position = @getAbsolutePosition()

		[ x, y ] = [ position.getX(), position.getY() ]

		if mousePos.x > x and
		mousePos.x <= x + @width and
		mousePos.y > y and
		mousePos.y <= y + @height
			@hovered = yes
			mouse.setHovered(yes)
		else
			@hovered = no

	computeDraw: ->
		@sprite.drawImage(@img, 0, 0, @width, @height)

		mouse = Game.getMouse()

		if @hovered
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
