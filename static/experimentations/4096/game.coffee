class Game
	constructor: ->
		@can = document.getElementById('game')
		@ctx = @can.getContext('2d')

		@width  = 350
		@height = 350
		@scale  = 1

		@cell_size = 73

		@can.width  = @width * @scale
		@can.height = @height * @scale

		@ctx.scale(@scale, @scale)

		@cells = [
			[0, 2, 0, 2]
			[0, 0, 0, 0]
			[4, 0, 2, 8]
			[0, 0, 0, 0]
		]

		@kb = new Keyboard()

		@colors = [
			rgb(255, 255, 255) # impossible
			rgb(0, 0, 0)       # 0
			rgb(0, 0, 0)       # 2
			rgb(60, 60, 60)    # 4
			rgb(200, 0, 0)     # 8
			rgb(0, 200, 0)     # 16
			rgb(0, 0, 200)     # 32
			rgb(255, 0, 0)     # 64
			rgb(180, 180, 180) # 128
		]

		@create()

	create: ->
		@update()

	update: =>
		if @kb.press('left')
			for i in [ 0 ... 4 ]
				for y in [ 0 ... @cells.length ]
					for x in [ 1 ... @cells[y].length ]
						if @cells[y][x - 1] == 0
							@cells[y][x - 1] = @cells[y][x]
							@cells[y][x] = 0
						else if @cells[y][x - 1] == @cells[y][x]
							@cells[y][x - 1] *= 2
							@cells[y][x] = 0

			free_cells = []

			for y in [ 0 ... @cells.length ]
				for x in [ 0 ... @cells[y].length ]
					if @cells[y][x] == 0
						free_cells.push(x: x, y: y)

			choice_cell = free_cells[Math.rand(0, free_cells.length - 1)]
			@cells[choice_cell.y][choice_cell.x] = 2

		else if @kb.press('right')
			for i in [ 0 ... 4 ]
				for y in [ 0 ... @cells.length ]
					for x in [ 0 ... @cells[y].length - 1 ]
						if @cells[y][x + 1] == 0
							@cells[y][x + 1] = @cells[y][x]
							@cells[y][x] = 0
						else if @cells[y][x + 1] == @cells[y][x]
							@cells[y][x + 1] *= 2
							@cells[y][x] = 0

			free_cells = []

			for y in [ 0 ... @cells.length ]
				for x in [ 0 ... @cells[y].length ]
					if @cells[y][x] == 0
						free_cells.push(x: x, y: y)

			choice_cell = free_cells[Math.rand(0, free_cells.length - 1)]
			@cells[choice_cell.y][choice_cell.x] = 2

		else if @kb.press('up')
			for i in [ 0 ... 4 ]
				for y in [ 1 ... @cells.length ]
					for x in [ 0 ... @cells[y].length ]
						if @cells[y - 1][x] == 0
							@cells[y - 1][x] = @cells[y][x]
							@cells[y][x] = 0
						else if @cells[y - 1][x] == @cells[y][x]
							@cells[y - 1][x] *= 2
							@cells[y][x] = 0

			free_cells = []

			for y in [ 0 ... @cells.length ]
				for x in [ 0 ... @cells[y].length ]
					if @cells[y][x] == 0
						free_cells.push(x: x, y: y)

			choice_cell = free_cells[Math.rand(0, free_cells.length - 1)]
			@cells[choice_cell.y][choice_cell.x] = 2

		else if @kb.press('down')
			for i in [ 0 ... 4 ]
				for y in [ 0 ... @cells.length - 1 ]
					for x in [ 0 ... @cells[y].length ]
						if @cells[y + 1][x] == 0
							@cells[y + 1][x] = @cells[y][x]
							@cells[y][x] = 0
						else if @cells[y + 1][x] == @cells[y][x]
							@cells[y + 1][x] *= 2
							@cells[y][x] = 0

			free_cells = []

			for y in [ 0 ... @cells.length ]
				for x in [ 0 ... @cells[y].length ]
					if @cells[y][x] == 0
						free_cells.push(x: x, y: y)

			choice_cell = free_cells[Math.rand(0, free_cells.length - 1)]
			@cells[choice_cell.y][choice_cell.x] = 2

		@draw()

		@kb.update()

		requestAnimationFrame(@update)

	draw: ->
		@ctx.clearRect(0, 0, @width, @height)

		for y in [ 0 ... @cells.length ]
			for x in [ 0 ... @cells[y].length ]
				tx = x * @cell_size + @cell_size / 2
				ty = y * @cell_size + @cell_size / 2 + 10

				@ctx.fillStyle = @colors[(Math.log(Math.max(1, @cells[y][x])) / Math.LN2) + 1]
				@ctx.fillRect(x * @cell_size, y * @cell_size, @cell_size, @cell_size)

				if @cells[y][x] != 0
					@ctx.fillStyle = rgb(255, 255, 255)
					@ctx.font = 'normal 30px Arial'
					@ctx.textAlign = 'center'
					@ctx.fillText(@cells[y][x], tx, ty)

new Game()
