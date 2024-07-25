class Sprite
	constructor: (name) ->
		@name = name
		@animations = {}
		@cur_animation = null

	add_animation: (name, index, length, speed) ->
		@animations[name] = new Animation(name, index, length, speed)

	play: (name) ->
		if @animations[name]?
			@cur_animation = @animations[name]

	update: () ->
		@cur_animation.update()
