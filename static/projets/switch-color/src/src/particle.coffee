class Particle
	constructor: ({ x, y, dx, dy, color }) ->
		@x        = x
		@y        = y
		@dx       = dx
		@dy       = dy
		@life     = 0
		@max_life = Math.rand(10, 20)
		@color    = color
		@size     = @max_life

	update: (dt) ->
		@x    += @dx
		@y    += @dy
		@life++
		@size--

		return

	draw: (ctx) ->
		ctx.fillStyle = @color
		ctx.beginPath()
		ctx.arc(@x, @y, @size / 2, 0, 2 * Math.PI, false)
		ctx.fill()

		return
