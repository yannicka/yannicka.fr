class Sword extends Entity
	constructor: (img, x, y, dir) ->
		super(x, y)

		@img_sword = img
		@dir = dir

		@add_animation('sword', 0, 4, 20)

		@play('sword')

	draw: (ctx) ->
		x = @x
		y = @y
		rotate = 0

		ctx.save()

		switch @dir
			when 'left'
				x -= 16
				rotate = 90
			when 'up'
				y -= 16
				rotate = -180
			when 'right'
				x += 16
				rotate = 180
			when 'down'
				y += 16
				rotate = 0

		ctx.translate(x - 8, y - 8)
		ctx.rotate(rotate)

		ctx.draw_image_index(@img_sword, 16, 16, @sprite.cur_animation.index, 8, 8)

		ctx.restore()
