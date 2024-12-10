class Pop extends InterfaceElement
	@all     = []
	@maxLife = 800
	@midLife = 400 # Pop.maxLive / 2

	constructor: (text, x, y) ->
		@text = text
		@x    = x
		@y    = y

		@life = Pop.maxLife

		Pop.all.push(@)

	update: (dt) ->
		@life -= dt
		@y    -= 0.2

		if @life <= 0
			index = Pop.all.indexOf(@)
			Pop.all.splice(index, 1)

	draw: (ctx) ->
		ctx.save()
		ctx.translate(@x, @y)

		if @life < Pop.midLife
			ctx.scale(@life / Pop.midLife, @life / Pop.midLife)

		ctx.font        = 'bold 30px Grobold'
		ctx.fillStyle   = rgb(255, 255, 255)
		ctx.strokeStyle = rgb(0, 0, 0)
		ctx.textAlign   = 'center'
		ctx.lineWidth   = 2

		ctx.fillText(@text, 0, 0)
		ctx.strokeText(@text, 0, 0)
		ctx.restore()
