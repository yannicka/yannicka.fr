class Player extends Entity
	constructor: (img) ->
		super()

		@img_player = img

		@add_animation('walk_left', 1, 2)
		@add_animation('walk_up', 4, 2)
		@add_animation('walk_right', 7, 2)
		@add_animation('walk_down', 10, 2)

		@add_animation('wait_left', 0, 1)
		@add_animation('wait_up', 3, 1)
		@add_animation('wait_right', 6, 1)
		@add_animation('wait_down', 9, 1)

		@play('walk_down')

		@dir = 'down'

	draw: (ctx) ->
		ctx.draw_image_index(@img_player, 14, 18, @sprite.cur_animation.index, @x, @y - 2) # offset.y = 2
