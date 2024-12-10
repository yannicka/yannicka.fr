bounding_box_collision = (b1, b2) ->
	return not ((b1.x > b2.x + b2.width - 1) or
		(b1.y > b2.y + b2.height - 1) or
		(b2.x > b1.x + b1.width - 1) or
		(b2.y > b1.y + b1.height - 1))

class Game
	constructor: ->
		@can = document.getElementById('test')
		@ctx = @can.getContext('2d')

		@can.width  = 640
		@can.height = 480

		@kb = new Keyboard()

		@player = x: 70, y: 70, width: 80, height: 40, dirx: 'left', diry: 'up'
		@enemy  = x: 20, y: 20, width: 42, height: 60

		@create()

	create: =>
		@update()

	update: =>
		@draw()

		dx = 0
		dy = 0

		speed = 5

		if @kb.down('left')
			dx -= speed
			@player.dirx = 'left'

		if @kb.down('right')
			dx += speed
			@player.dirx = 'right'

		if @kb.down('up')
			dy -= speed
			@player.diry = 'up'

		if @kb.down('down')
			dy += speed
			@player.diry = 'down'

		@player.dirx = if dx < 0 then 'left' else if dx > 0 then 'right' else null
		@player.diry = if dy < 0 then 'up' else if dy > 0 then 'down' else null

		@player.x += dx
		@player.y += dy

		if bounding_box_collision(@player, @enemy)
			if @player.y + @player.height > @enemy.y + @enemy.height
				@player.y = @enemy.y + @enemy.height # bas

			if @player.y < @enemy.y
				@player.y = @enemy.y - @player.height # haut

		if bounding_box_collision(@player, @enemy)
			if @player.x + @player.width > @enemy.x + @enemy.width
				@player.x = @enemy.x + @enemy.width # bas

			if @player.x < @enemy.x
				@player.x = @enemy.x - @player.width # haut

		###
		if bounding_box_collision(@player, @enemy)
			if @player.dirx == 'left'
				@player.x = @enemy.x + @enemy.width # droite

			if @player.dirx == 'right'
				@player.x = @enemy.x - @player.width # gauche
		###

		@kb.update()

		requestAnimationFrame(@update)

	draw: =>
		@ctx.clearRect(0, 0, @can.width, @can.height)

		@ctx.fillStyle = rgb(128, 0, 0)
		@ctx.fillRect(@enemy.x, @enemy.y, @enemy.width, @enemy.height)

		@ctx.fillStyle = rgb(0, 0, 128)
		@ctx.fillRect(@player.x, @player.y, @player.width, @player.height)

		return

game = new Game()
