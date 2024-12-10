class Game
	constructor: () ->
		@can = document.getElementById('game')
		@ctx = @can.getContext('2d')

		@can.width  = 640
		@can.height = 480

		@map = [
			[ 0, 1, 2, 3, 4, 5, 6, 7, 8 ],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
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

	create: () =>
		@update()

	update: () =>
		@draw()

		for tile in @tiled_animated
			tile.update()

		requestAnimationFrame(@update)

	draw: () =>
		for tile in @tiles
			@ctx.draw_image_index(
				@img.tileset,
				16,
				16,
				tile.id,
				tile.x * 16,
				tile.y * 16
			)

		return

game = new Game()
