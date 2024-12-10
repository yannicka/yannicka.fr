class Tile
	constructor: (x, y, id) ->
		@x = x
		@y = y
		@id = id

class TileAnimated extends Tile
	constructor: (x, y, id, length, speed = 20) ->
		super(x, y, id)
		@start_id = @id
		@length = length
		@time_anim = 0
		@speed = 20

	update: () ->
		@time_anim++

		if @time_anim > @speed
			@time_anim = 0
			@id++

			if @id >= @start_id + @length
				@id = @start_id
