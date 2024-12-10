###
Trouver inspiration :
- https://github.com/playcanvas/engine/blob/master/src/input/input_mouse.js
- https://github.com/gamelab/kiwi.js/blob/master/src/input/Mouse.ts
- https://github.com/photonstorm/phaser/blob/v2.4.3/src/input/Mouse.js
###

class Mouse
	constructor: (el) ->
		@el = el

		@x = 0
		@y = 0

		@click = null
		@mtime = 0
		@loose = null

		@hovered = no

		@el.addEventListener('touchstart', @handleStart)
		@el.addEventListener('touchmove', @handleMove)
		@el.addEventListener('touchend', @handleEnd)

		@el.addEventListener('mousedown', @handleStart)
		@el.addEventListener('mousemove', @handleMove)
		@el.addEventListener('mouseup', @handleEnd)

	update: ->
		@setCursor()
		@setHovered(no)

		@mtime++

	getX: -> @x
	getY: -> @y
	getPos: -> { x: @getX(), y: @getY() }
	getHover: -> @hover

	setHovered: (hovered) ->
		@hovered = hovered

	setCursor: ->
		bodyStyle = document.body.style

		if @hovered # and bodyStyle.cursor != 'pointer'
			bodyStyle.cursor = 'pointer'
		else # if bodyStyle.cursor == 'pointer'
			bodyStyle.cursor = 'auto'

	isHovered: -> @hovered

	handleStart: (e) =>
		@handleMove(e)
		@click = @mtime

	handleMove: (e) =>
		@x = e.pageX - (if @el then @el.offsetLeft else 0)
		@y = e.pageY - (if @el then @el.offsetTop else 0)

	handleEnd: (e) =>
		@loose = @mtime
		@click = null

	up:      -> @click == null
	down:    -> @click != null
	press:   -> @click == @mtime
	release: -> @loose == @mtime
