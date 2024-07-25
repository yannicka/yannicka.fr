class Game
	constructor: () ->
		@can = document.getElementById('game')
		@ctx = @can.getContext('2d')

		@can.width  = 640
		@can.height = 480

		@map = [
			[ 0, 1, 2, 4, 4, 4, 4, 4, 4 ],
			[ 0, 0, 0, 0, 0, 0, 0, 3, 0 ],
			[ 0, 0, 0, 0, 0, 0, 0, 7, 0 ],
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

		@solid = [ 2, 4, 7 ]

		@tiles = []
		@tiled_animated = []

		for y in [ 0...@map.length ]
			for x in [ 0...@map[y].length ]
				if anims[@map[y][x]]
					@tiles.push(new TileAnimated(x, y, @map[y][x], anims[@map[y][x]]))
				else
					@tiles.push(new Tile(x, y, @map[y][x]))

		@tiled_animated = (tile for tile in @tiles when tile instanceof TileAnimated)

		@img = preload_images(
			'tileset': 'game/gfx/tileset.png'
		, @create)

		@player = new Entity()

		@mouse = new Mouse(@can)

		@kb = new Keyboard()

		@scale = 3

	create: () =>
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
		@draw()

		for tile in @tiled_animated
			tile.update()

		@player.update()

		@player.play('wait_' + @player.dir)

		if @kb.down(Key.UP)
			@player.y -= 2
			@player.play('walk_up')
			@player.dir = 'up'

		if @kb.down(Key.DOWN)
			@player.y += 2
			@player.play('walk_down')
			@player.dir = 'down'

		if @kb.down(Key.RIGHT)
			@player.x += 2
			@player.play('walk_right')
			@player.dir = 'right'

		if @kb.down(Key.LEFT)
			@player.x -= 2
			@player.play('walk_left')
			@player.dir = 'left'

		@mouse.update()
		@kb.update()

		requestAnimationFrame(@update)

	draw: () =>
		@ctx.clearRect(0, 0, @can.width, @can.height)

		for tile in @tiles
			@ctx.draw_image_index(
				@img.tileset,
				16,
				16,
				tile.id,
				tile.x * 16,
				tile.y * 16
			)

		@player.draw(@ctx)

		return

game = new Game()
