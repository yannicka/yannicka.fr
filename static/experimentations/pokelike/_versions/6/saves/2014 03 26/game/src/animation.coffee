class Animation
	constructor: (name, index, length, speed = 20) ->
		@start_index = index
		@length = length
		@speed = speed
		@time_anim = 0
		@index = 0

	update: () ->
		@time_anim++

		if @time_anim > @speed
			@time_anim = 0
			@index++

			if @index >= @start_index + @length
				@index = @start_index
