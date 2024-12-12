class Cell
	# Création de la cellule avec son état initial
	constructor: (active) ->
		@active = active

	# Affichage de la cellule à sa position
	draw: (ctx) ->
		if @active
			ctx.drawImage(Grid.img_active, @x, @y)
		else
			ctx.drawImage(Grid.img_inactive, @x, @y)

		return

	# Déplacement de la cellule sur les axes x et y
	move: (x, y) ->
		@x = x
		@y = y

		return
