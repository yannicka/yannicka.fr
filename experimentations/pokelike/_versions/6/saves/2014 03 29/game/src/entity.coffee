class Entity
	constructor: () ->
		@sprite = new Sprite()

		@x = 0
		@y = 0

	# todo : ajouter la possibilité de choisir la largeur et hauteur
	add_animation: (name, index, length, speed = 4) ->
		@sprite.add_animation(name, index, length, speed)

	play: (name) ->
		@sprite.play(name)

	update: () ->
		@sprite.update()

	draw: (ctx) ->
		ctx.draw_image_index(@img_player, 14, 16, @sprite.cur_animation.index, @x, @y)
