class Tile
	constructor: (x, y, index, high, solid) ->
		@x = x
		@y = y

		@index = index
		@high  = high
		@solid = solid

	draw: (ctx, img_tileset) ->
		ctx.draw_image_index(img_tileset, 16, 16, @index, @x * 16, @y * 16)

class TileAnimated extends Tile
	constructor: (x, y, index, high, solid, length, speed = 200) ->
		super(x, y, index, high, solid)

		@animation = new Animation(@index, length, speed)

	update: (dt) ->
		@animation.update(dt)
		@index = @animation.index
