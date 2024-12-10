class InterfaceElement
	constructor: (x, y, parent) ->
		@position = new Point(x, y)
		@parent   = parent

		@children = []

		@visible = yes

		@spriteCanvas = document.createElement('canvas')
		@spriteCanvas.width  = Game.getWidth()
		@spriteCanvas.height = Game.getHeight()

		@sprite = @spriteCanvas.getContext('2d')
		@sprite.textBaseline = 'top'

	# overridable
	update: (dt) ->

	# overridable
	computeDraw: ->

	# final
	draw: (ctx) ->
		# à faire : à optimiser
		position = @getAbsolutePosition()
		x = position.getX()
		y = position.getY()

		ctx.save()
		ctx.translate(x, y)

		@sprite.clearRect(
			0,
			0,
			@spriteCanvas.width,
			@spriteCanvas.height)

		if @visible
			@computeDraw()

		ctx.drawImage(@spriteCanvas, 0, 0)

		ctx.restore()

		for child in @children
			child.draw(ctx)

	getRelativePosition: -> @position

	getPosition: -> @getRelativePosition()

	getAbsolutePosition: ->
		position = new Point(@position.getX(), @position.getY())

		if @parent
			position.add(@parent.getAbsolutePosition())

		return position

	getParent: -> @parent

	getX: -> @position.getX()

	getY: -> @position.getY()

	getVisible: -> @visible

	setX: (x) ->
		@position.setX(x)

	setY: (y) ->
		@position.setY(y)

	setPosition: (position) ->
		@setX(position.x)
		@setY(position.y)

	setParent: (parent) ->
		if @parent
			@parent.removeChild(@)

		@parent = parent

	setVisible: (visible) ->
		@visible = visible

	hasChildren: -> @children.length > 0

	hasParent: -> @parent isnt null

	addChild: (child) ->
		child.setParent(@)
		@children.push(child)

	removeChild: (child) ->
		index = @children.indexOf(value)

		if index != -1
			@children.splice(index, 1)

	clearChildren: ->
		@children = []
