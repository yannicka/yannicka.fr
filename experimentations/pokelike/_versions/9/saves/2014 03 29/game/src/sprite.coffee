class Sprite
	constructor: (name) ->
		@name = name
		@animations = {}
		@cur_animation = null

	add_animation: (name, index, length, speed) ->
		@animations[name] = new Animation(index, length, speed)

	play: (name) ->
		if @animations[name]?
			@cur_animation = @animations[name]

	update: () ->
		if @cur_animation.length > 1
			@cur_animation.update()
