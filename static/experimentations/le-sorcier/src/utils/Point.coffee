class Point
	constructor: (x, y) ->
		@x = x
		@y = y

	getX: -> @x
	getY: -> @y

	setX: (x) ->
		@x = x

	setY: (y) ->
		@y = y

	add: (point) ->
		@x += point.getX()
		@y += point.getY()
