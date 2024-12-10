class Animation
	constructor: (index, length, framerate = 100, looped = true) ->
		@start_index = index
		@length      = length
		@framerate   = framerate
		@looped      = looped
		@index       = index
		@time_anim   = 0

	update: (dt) ->
		@time_anim += dt

		if @time_anim > @framerate
			@time_anim = 0
			@index++

			if @index >= @start_index + @length
				@index = if @looped then @start_index else @start_index + @length
