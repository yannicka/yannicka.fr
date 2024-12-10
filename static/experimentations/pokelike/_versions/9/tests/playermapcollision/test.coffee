class Game
	constructor: ->
		@can = document.getElementById('test')
		@ctx = @can.getContext('2d')

		@can.width  = 640
		@can.height = 480

		@kb = new Keyboard()

		@SIZE = 20

		@player = x: 40, y: 40, width: @SIZE, height: @SIZE

		@map = [
			[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ]
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ]
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ]
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ]
			[ 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1 ]
			[ 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1 ]
			[ 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1 ]
			[ 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1 ]
			[ 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1 ]
			[ 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1 ]
			[ 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1 ]
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ]
			[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
		]

		@create()

	create: =>
		@update()

	update: =>
		@draw()

		dx = 0
		dy = 0

		speed = 1



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

		dt = 2

		bounds = x: 4, w: 8, y: 8, h: 8

		s = speed * dt
		px1 = parseInt((@player.x * @SIZE + bounds.x) / @SIZE + dx * s, 10)
		px2 = parseInt((@player.x * @SIZE + bounds.x + bounds.w - 1) / @SIZE + dx * s, 10)
		py1 = parseInt((@player.y * @SIZE + bounds.y) / @SIZE + dy * s, 10)
		py2 = parseInt((@player.y * @SIZE + bounds.y + bounds.h - 1) / @SIZE + dy * s, 10)

		if @collide(px1, py1) or @collide(px2, py1) or @collide(px1, py2) or @collide(px2, py2)
			push += dt

			if push > 25
				push = 0

				if dirY == 1 and px1 == 64 and py2 == 58
					game.world.remove(64, 58)
					game.world.remove(64, 61)
					game.getChest(CPushBlock, 0, 0)

			return

		push = 0
		@player.x += dx * s
		@player.y += dy * s

		@kb.update()

		requestAnimationFrame(@update)

	collide: (x, y) ->
		return typeof @map[y] != 'undefined' and @map[y][x] == 1

	draw: =>
		@ctx.clearRect(0, 0, @can.width, @can.height)

		for y in [ 0 ... @map.length ]
			for x in [ 0 ... @map[y].length ]
				if @map[y][x] == 1
					@ctx.fillStyle = rgb(128, 0, 0)
					@ctx.fillRect(x * @SIZE, y * @SIZE, @SIZE, @SIZE)

		@ctx.fillStyle = rgb(0, 0, 128)
		@ctx.fillRect(@player.x, @player.y, @player.width, @player.height)

		return

game = new Game()
