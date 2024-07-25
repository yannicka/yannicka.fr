class Tile
	constructor: (x, y, id, high) ->
		@x = x
		@y = y

		@id   = id
		@high = high

	draw: (ctx, img_tileset) ->
		ctx.draw_image_index(img_tileset, 16, 16, @id, @x * 16, @y * 16)

class TileAnimated extends Tile
	constructor: (x, y, id, high, length, speed = 12) ->
		super(x, y, id, high)

		@animation = new Animation(@id, length, speed)

	update: () ->
		@animation.update()
		@id = @animation.index
