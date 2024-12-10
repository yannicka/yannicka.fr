class Game
	constructor: () ->
		@can = document.getElementById('game')
		@ctx = @can.getContext('2d')

		@can.width  = 640
		@can.height = 480

		@map = [
			[
				[ 0, 1, 0, 4, 4, 4, 4, 4, 4 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
			],

			[
				[ -1, -1,  2, -1, -1, -1, -1, -1, -1 ],
				[ -1, -1, -1, -1, -1, -1, -1,  3, -1 ],
				[ -1, -1, -1, -1, -1, -1, -1,  7, -1 ],
				[ -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
				[ -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
				[ -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
				[ -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
				[ -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
				[ -1, -1, -1, -1, -1, -1, -1, -1, -1 ],
				[ -1, -1, -1, -1, -1, -1, -1, -1, -1 ]
			],
		]

		@collisions = [
			[ 0, 0, 1, 1, 1, 1, 1, 1, 1 ],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ 0, 0, 0, 0, 0, 0, 0, 1, 0 ],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
		]

		# Identifiant du tile animé : nombre de cases
		# todo : durée entre chaque frame
		anims =
			4: 3

		high = [ 3 ]

		@solid = [ 2, 4, 7 ]

		@tiles = []
		@tiles_animated = []

		for layer in @map
			for y in [ 0...layer.length ]
				for x in [ 0...layer.length ]
					if layer[y][x] != -1
						if anims[layer[y][x]]
							@tiles.push(new TileAnimated(x, y, layer[y][x], layer[y][x] in high, anims[layer[y][x]]))
						else
							@tiles.push(new Tile(x, y, layer[y][x], layer[y][x] in high))

		@tiles_animated = (tile for tile in @tiles when tile instanceof TileAnimated)

		@tiles_down = (tile for tile in @tiles when tile.high is false)
		@tiles_high = (tile for tile in @tiles when tile.high is true)

		@mouse = new Mouse(@can)

		@kb = new Keyboard()

		@scale = 3

		@translate =
			x: 0
			y: 0

		@img = preload_images(
			'player':  'game/gfx/player.png'
			'tileset': 'game/gfx/tileset.png'
		, @create)

	create: () =>
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

	update: () =>
		gamepads = null

		@translate.x *= -0.9
		@translate.y *= -0.9

		if navigator.webkitGetGamepads?
			gamepads = navigator.webkitGetGamepads()

		if navigator.getGamepads?
			gamepads = navigator.getGamepads()

		if gamepads?
			for i in [ 0 ... gamepads.length ]
				pad = gamepads[i]

				@player.x += pad.axes[0]
				@player.y += pad.axes[1]

		@draw()

		for tile in @tiles_animated
			tile.update()

		@player.update()

		@player.play('wait_' + @player.dir)

		if @kb.press('space')
			@shake(8, 8)

		dir =
			x: 'right'
			y: 'down'

		new_pos =
			x: @player.x
			y: @player.y

		if @kb.down('up')
			new_pos.y -= 1
			dir.x = 'up'
			@player.play('walk_up')
			@player.dir = 'up'

		if @kb.down('down')
			new_pos.y += 1
			dir.x = 'down'
			@player.play('walk_down')
			@player.dir = 'down'

		if @kb.down('right')
			new_pos.x += 1
			dir.x = 'right'
			@player.play('walk_right')
			@player.dir = 'right'

		if @kb.down('left')
			new_pos.x -= 1
			dir.x = 'left'
			@player.play('walk_left')
			@player.dir = 'left'

		for y in [ Math.floor(@player.y / 16) .. Math.ceil((@player.y + 2) / 16) ]
			the_x = if dir.x == 'left' then Math.floor(new_pos.x / 16) else Math.ceil(new_pos.x / 16)

			console.log(@map[1][y])

			if @map[1][y]? and @solid[@map[1][y][the_x]]
				new_pos.x = Math.round(@player.x / 16) * 16 - (if dir.x == 'right' then -2 else 0)

		for x in [ Math.floor(@player.x / 16) .. Math.ceil((@player.x - 2) / 16) ]
			the_y = if dir.y == 'up' then Math.floor(new_pos.y / 16) else Math.ceil(new_pos.y / 16)

			if @map[1][the_y]? and @solid[@map[1][the_y][x]]
				new_pos.y = Math.round(@player.y / 16) * 16 - (if dir.y == 'down' then 2 else 0)

		@player.x = new_pos.x
		@player.y = new_pos.y

		@mouse.update()
		@kb.update()

		requestAnimationFrame(@update)

	draw: () =>
		@ctx.clearRect(0, 0, @can.width, @can.height)

		for tile in @tiles_down
			tile.draw(@ctx, @img.tileset)

		@player.draw(@ctx)

		for tile in @tiles_high
			tile.draw(@ctx, @img.tileset)

		#translate_game = @can.toDataURL()
		#img = new Image()
		#img.src = translate_game
		#@ctx.clearRect(0, 0, @can.width, @can.height)
		#@ctx.drawImage(img, 0, 0, img.width, img.height, @translate.x, @translate.y, img.width / 4, img.height / 4)

		return

	shake: (x, y) ->
		@translate =
			x: x
			y: y

game = new Game()
