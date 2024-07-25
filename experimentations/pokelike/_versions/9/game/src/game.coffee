class Game
	constructor: ->
		@can = document.getElementById('game')
		@ctx = @can.getContext('2d')

		@can.width  = 640
		@can.height = 480

		@map = [
			[
				[ 0, 1, 0, 4, 4, 4, 4, 4, 4 ]
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
				[ 0, 0, 0, 4, 4, 0, 0, 0, 0 ]
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
			]

			[
				[ -1, -1,  2, -1, -1, -1, -1, -1, -1 ]
				[ -1, -1, -1, -1, -1, -1, -1,  3, -1 ]
				[ -1, -1, -1, -1, -1, -1, -1,  7, -1 ]
				[ -1, -1, -1, -1, -1, -1, -1, -1, -1 ]
				[ -1, -1, -1, -1, -1, -1, -1, -1, -1 ]
				[ -1, -1, -1, -1, -1, -1, -1, -1, -1 ]
				[ -1, -1, -1, -1, -1, -1, -1, -1, -1 ]
				[ -1, -1, -1, -1, -1, -1, -1,  3, -1 ]
				[ -1, -1, -1, -1, -1, -1, -1,  7, -1 ]
				[ -1, -1, -1, -1, -1, -1, -1, -1, -1 ]
			]
		]

		@collisions = [
			[ 0, 0, 1, 1, 1, 1, 1, 1, 1 ]
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
			[ 0, 0, 0, 0, 0, 0, 0, 1, 0 ]
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
		]

		# Identifiant du tile animé : nombre de cases
		# todo : durée entre chaque frame
		anims =
			4: 3

		high = [ 3 ]

		solid = [ 2, 4, 7 ]

		@tiles = []
		@tiles_animated = []

		for layer in @map
			for y in [ 0...layer.length ]
				for x in [ 0...layer.length ]
					t = layer[y][x]

					if t != -1
						if anims[t]
							@tiles.push(new TileAnimated(
								x
								y
								t
								t in high
								t in solid
								anims[t]
							))
						else
							@tiles.push(new Tile(
								x
								y
								t
								t in high
								t in solid
							))

		@tiles_animated = (tile for tile in @tiles when tile instanceof TileAnimated)

		@tiles_down = (tile for tile in @tiles when tile.high is false)
		@tiles_high = (tile for tile in @tiles when tile.high is true)

		@mouse = new Mouse(@can)

		@kb = new Keyboard()

		@scale = 3

		@timer = new Stopwatch()

		@expand = ->

		@img = preload_images(
			player:  'game/gfx/player.png'
			tileset: 'game/gfx/tileset.png'
		, @create)

	create: =>
		@player = new Player(@img.player)

		if @ctx.mozImageSmoothingEnabled
			@ctx.mozImageSmoothingEnabled = false
		else if @ctx.webkitImageSmoothingEnabled
			@ctx.webkitImageSmoothingEnabled = false
		else if @ctx.oImageSmoothingEnabled
			@ctx.oImageSmoothingEnabled = false

		if @ctx.imageSmoothingEnabled
			@ctx.imageSmoothingEnabled = false

		@ctx.scale(@scale, @scale)

		@update()

	update: =>
		###
		gamepads = null

		if navigator.webkitGetGamepads?
			gamepads = navigator.webkitGetGamepads()

		if navigator.getGamepads?
			gamepads = navigator.getGamepads()

		if gamepads?
			for i in [ 0 ... gamepads.length ]
				pad = gamepads[i]

				@player.x += pad.axes[0]
				@player.y += pad.axes[1]
		###

		@draw()

		for tile in @tiles_animated
			tile.update(@timer.dt)

		@player.update(@timer.dt)

		dir =
			x: 'right'
			y: 'down'

		new_pos =
			x: @player.x
			y: @player.y

		if @kb.down('up')
			new_pos.y -= 1
			@player.dir = dir.y = 'up'

		if @kb.down('down')
			new_pos.y += 1
			@player.dir = dir.y = 'down'

		if @kb.down('right')
			new_pos.x += 1
			@player.dir = dir.x = 'right'

		if @kb.down('left')
			new_pos.x -= 1
			@player.dir = dir.x = 'left'

		for tile in @tiles
			for y in [ Math.floor(@player.y / 16) .. Math.floor((@player.y + @player.height) / 16) ]
				the_x = if dir.x == 'left' then Math.floor(new_pos.x / 16) else Math.ceil(new_pos.x / 16)

				if tile.solid and tile.x == the_x and tile.y == y
					new_pos.x = Math.round(@player.x / 16) * 16 - (if dir.x == 'right' then -2 else 0)

			for x in [ Math.floor(@player.x / 16) .. Math.floor((@player.x + @player.width) / 16) ]
				the_y = if dir.y == 'up' then Math.floor(new_pos.y / 16) else Math.ceil(new_pos.y / 16)

				if tile.solid and tile.x == x and tile.y == the_y
					new_pos.y = Math.round(@player.y / 16) * 16 - (if dir.y == 'down' then 2 else 0)

		@expand = ->
			@ctx.lineWidth = 2
			@ctx.strokeStyle = rgb(255, 0, 0)

			for y in [ Math.floor(@player.y / 16) .. Math.floor((@player.y + @player.height) / 16) ]
				the_x = if dir.x == 'left' then Math.floor(new_pos.x / 16) else Math.ceil(new_pos.x / 16)
				@ctx.strokeRect(the_x * 16, y * 16, 16, 16)

			@ctx.lineWidth = 1
			@ctx.strokeStyle = rgb(0, 0, 255)

			for x in [ Math.floor(@player.x / 16) .. Math.floor((@player.x + @player.width) / 16) ]
				the_y = if dir.y == 'up' then Math.floor(new_pos.y / 16) else Math.ceil(new_pos.y / 16)
				@ctx.strokeRect(x * 16, the_y * 16, 16, 16)

		if @player.x == new_pos.x and @player.y == new_pos.y
			@player.play("wait_#{@player.dir}")
		else
			@player.play("walk_#{@player.dir}")

		@player.x = new_pos.x
		@player.y = new_pos.y

		@mouse.update()
		@kb.update()
		@timer.update()

		requestAnimationFrame(@update)

	draw: =>
		@ctx.clearRect(0, 0, @can.width, @can.height)

		for tile in @tiles_down
			tile.draw(@ctx, @img.tileset)

		@player.draw(@ctx)

		for tile in @tiles_high
			tile.draw(@ctx, @img.tileset)

		@expand()

		return

game = new Game()
