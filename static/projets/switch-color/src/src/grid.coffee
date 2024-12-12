class Grid
	# Images représentant les cellules dans les deux états possible :
	# - 0 = inactive
	# - 1 = active
	@img_active   = null
	@img_inactive = null

	# Création de la grille avec son nom de colonnes, son nombre de lignes,
	# ses cellules et la couleur des cellules actives
	constructor: (nb_columns, nb_rows, nb_clicks, cells, color) ->
		@nb_columns = nb_columns
		@nb_rows    = nb_rows
		@nb_cells   = @nb_columns * @nb_rows

		@nb_clicks_gold   = nb_clicks
		@nb_clicks_silver = Math.ceil(nb_clicks * 1.5)
		@nb_clicks_bronze = nb_clicks * 2
		@nb_clicks_empty  = nb_clicks * 3
		@user_clicks      = 0

		@cell_spacing      = 2
		@cell_size         = 50
		@cell_size_spacing = @cell_size + @cell_spacing
		@cell_color        = color

		@actions = []

		@orig_grid = clone_arr(cells)

		@gen_grid()

	# Génération des cellules de la grille
	gen_grid: ->
		@actions     = []
		@user_clicks = 0

		@cells = []

		i = @orig_grid.length
		while i--
			active = @orig_grid[i]

			@cells.push(new Cell(active))

		return

	# Regénération des cellules la grille
	regen_grid: ->
		@actions     = []
		@user_clicks = 0

		tab = []

		for cell in @cells
			tab.push(cell.active)

		@orig_grid = clone_arr(tab.reverse())

		@gen_grid()

		return

	# Affichage de la grille
	draw: (ctx) ->
		for cell in @cells
			cell.draw(ctx)

		return

	# Redimensionnement des cellules de la grille
	resize: (width, height) ->
		@cell_size = (height - @cell_spacing * (@nb_rows - 1)) / @nb_rows

		game_width = @cell_size * @nb_columns + (@cell_spacing * (@nb_rows - 1))

		if game_width > width
			@cell_size = (width - @cell_spacing * (@nb_columns - 1)) / @nb_columns

		@cell_size_spacing = @cell_size + @cell_spacing

		@gen_img()

		i = @cells.length
		while i--
			cell = @cells[i]

			x = (@cells.length - i - 1) % @nb_columns * @cell_size_spacing
			y = (@cells.length - i - 1) // @nb_columns * @cell_size_spacing

			cell.move(x, y)

		return @get_game_size()

	# Récupération de la taille de la grille
	get_game_size: ->
		width:  @cell_size_spacing * @nb_columns
		height: @cell_size_spacing * @nb_rows

	# Génération des images des cellules actives et inactives
	gen_img: ->
		Grid.img_active   = @gen_img_cell(@cell_color)
		Grid.img_inactive = @gen_img_cell(rgb(220, 220, 220))

		return

	# Génération d'une image d'une cellule
	gen_img_cell: (color) ->
		size = @cell_size

		cell = document.createElement('canvas')
		ctx  = cell.getContext('2d')

		cell.width = size
		cell.height = size

		ctx.fillStyle = color
		ctx.fillRect(0, 0, size, size)

		ctx.fillStyle = rgba(0, 0, 0, .05)
		ctx.beginPath()
		ctx.moveTo(0, 0)
		ctx.lineTo(size, 0)
		ctx.lineTo(size, size)
		ctx.lineTo(size * 0.8, size * 0.2)
		ctx.closePath()
		ctx.fill()

		return cell

	pushed: (x, y, press) ->
		i = @cells.length
		while i--
			cell = @cells[i]

			if x > cell.x and
			x <= cell.x + @cell_size and
			y > cell.y and
			y <= cell.y + @cell_size
				if press
					@cell_click(i, @nb_columns)

					return yes

		return no

	# Action au clic d'une cellule
	cell_click: (i) ->
		@actions.push(i)
		@user_clicks++

		neighbors = [ i - @nb_columns, i, i + @nb_columns ]

		if i % @nb_columns != 0
			neighbors.push(i - 1)

		if i % @nb_columns != @nb_columns - 1
			neighbors.push(i + 1)

		j = neighbors.length
		while j--
			neighbor = neighbors[j]

			if neighbor < 0 or neighbor >= @cells.length
				neighbors.splice(j, 1)

		for neighbor in neighbors
			@cells[neighbor].active = 1 - @cells[neighbor].active

		return

	# Annuler la dernière action
	cancel_last_action: ->
		last_action = @actions.pop()
		@cell_click(last_action)
		@actions.pop()

	# Clic sur une cellule au hasard
	random_click: (nb_clicks = 1) ->
		for [ 0 ... nb_clicks ]
			@cell_click(Math.rand(0, @nb_cells - 1))

		return

	# La grille est-elle vide ?
	is_empty: ->
		finished = yes

		for cell in @cells
			if cell.active == 1
				finished = no
				break

		return finished

	get_medal: ->
		return switch
			when @user_clicks <= @nb_clicks_gold   then 3
			when @user_clicks <= @nb_clicks_silver then 2
			when @user_clicks <= @nb_clicks_bronze then 1
			else                                        0
