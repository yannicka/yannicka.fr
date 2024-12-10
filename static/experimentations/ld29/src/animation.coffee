class Animation
	constructor: (index, length, framerate = 8, looped = true) ->
		@start_index = index
		@length      = length
		@framerate   = framerate
		@looped      = looped
		@index       = index
		@time_anim   = 0

	update: () ->
		@time_anim++

		if @time_anim > @framerate
			@time_anim = 0
			@index++

			if @index >= @start_index + @length
				@index = if @looped then @start_index else @start_index + @length
