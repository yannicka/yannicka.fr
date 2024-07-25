class Animation
	constructor: (index, length, speed = 8) ->
		@start_index = index
		@length      = length
		@speed       = speed
		@index       = index
		@time_anim   = 0

	update: () ->
		@time_anim++

		if @time_anim > @speed
			@time_anim = 0
			@index++

			if @index >= @start_index + @length
				@index = @start_index
