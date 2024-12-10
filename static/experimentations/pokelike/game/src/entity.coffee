class Entity
	constructor: (x, y) ->
		@sprite = new Sprite()

		@x = x
		@y = y

	# todo : ajouter la possibilité de choisir la largeur et hauteur
	add_animation: (name, index, length, framerate = 100, looped = true) ->
		@sprite.add_animation(name, index, length, framerate, looped)

	play: (name) ->
		@sprite.play(name)

	update: (dt) ->
		@sprite.update(dt)

	draw: (ctx) ->
		ctx.draw_image_index(@img_player, 14, 16, @sprite.cur_animation.index, @x, @y)
