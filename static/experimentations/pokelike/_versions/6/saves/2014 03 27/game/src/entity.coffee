class Entity
	constructor: (sprite) ->
		@sprite = new Sprite()

		@x = 0
		@y = 0

		@img_player = new Image()
		@img_player.src = 'game/gfx/play.png'

		@add_animation('walk_left', 2, 2)
		@add_animation('walk_up', 4, 2)
		@add_animation('walk_right', 0, 2)
		@add_animation('walk_down', 6, 2)

		@add_animation('wait_left', 2, 1)
		@add_animation('wait_up', 4, 1)
		@add_animation('wait_right', 0, 1)
		@add_animation('wait_down', 6, 1)

		@play('walk_down')

		@dir = 'down'

	# todo : ajouter la possibilité de choisir la largeur et hauteur
	add_animation: (name, index, length, speed) ->
		@sprite.add_animation(name, index, length, speed)

	play: (name) ->
		@sprite.play(name)

	update: () ->
		@sprite.update()

	draw: (ctx) ->
		ctx.draw_image_index(@img_player, 17, 17, @sprite.cur_animation.index, @x, @y)
