class Sprite
	constructor: (name) ->
		@name = name
		@animations = []
		@cur_animation = null

	add_animation: (name, index, length, speed) ->
		@animations.push(new Animation(name, index, length, speed))

	play: (name) ->
		if @animations[name]?
			@cur_animation = @animations[name]

	update: () ->
		@cur_animation.update()

# class Sprite
# 	constructor: (name, scale) ->
# 		@name = name
# 		@offsetX = 0
# 		@offsetY = 0
# 		@loadJSON(sprites[name])
# 
# 	loadJSON: (data) ->
# 		@id = data.id
# 		@filepath = "img/#{@id}.png"
# 		@animationData = data.animations
# 		@width = data.width
# 		@height = data.height
# 		@offsetX = (data.offset_x !== undefined) ? data.offset_x : -16
# 		@offsetY = (data.offset_y !== undefined) ? data.offset_y : -16
# 
# 		@load()
# 
# 	load: () ->
# 		@image = new Image()
# 		@image.src = @filepath
# 
# 		@image.onload = function() {
# 			@isLoaded = true
# 
# 			if @onload_func
# 				@onload_func()
# 
# 	createAnimations: () ->
# 		animations = {}
# 
# 		for name of @animationData
# 			a = @animationData[name]
# 			animations[name] = new Animation(name, a.length, a.row, @width, @height)
# 
# 		animations
# 
# 
# 
# class Entity
# 	constructor: (id, kind) ->
# 		@id = id
# 		@kind = kind
# 
# 		# Renderer
# 		@sprite = null
# 		@flipSpriteX = false
# 		@flipSpriteY = false
# 		@animations = null
# 		@currentAnimation = null
# 		@shadowOffsetY = 0
# 
# 		@setGridPosition(0, 0)
# 
# 		@isLoaded = false
# 		@isHighlighted = false
# 		@visible = true
# 		@isFading = false
# 		@setDirty()
# 	
# 		setName: (name) ->
# 			@name = name
# 	
# 		setPosition: (x, y) ->
# 			@x = x
# 			@y = y
# 	
# 		setGridPosition: (x, y) ->
# 			@gridX = x
# 			@gridY = y
# 
# 			@setPosition(x * 16, y * 16)
# 
#   	setSprite: (sprite) ->
# 			if not sprite
# 				log.error(@id + " : sprite is null", true)
# 				throw "Error"
#     
# 			if @sprite && @sprite.name === sprite.name
# 				return
# 
# 			@sprite = sprite
# 			@normalSprite = @sprite
#       
# 			if Types.isMob(@kind) || Types.isPlayer(@kind)
# 				@hurtSprite = sprite.getHurtSprite()
# 
# 			@animations = sprite.createAnimations()
# 
# 			@isLoaded = true
# 
# 			if @ready_func
# 				@ready_func()
# 
# 		getSprite: () ->
# 			@sprite
# 
# 		getSpriteName: () ->
# 			Types.getKindAsString(@kind)
# 
# 		getAnimationByName: (name) ->
# 			animation = null
# 
# 			if(name in @animations) ->
# 				animation = @animations[name]
# 			else
# 				log.error("No animation called "+ name)
# 
# 			animation
#   
#   	setAnimation: (name, speed, count, onEndCount) ->
#     
# 			if @isLoaded
# 				if @currentAnimation && @currentAnimation.name === name
# 					return
# 
# 			s = @sprite,
# 			a = @getAnimationByName(name);
# 	
# 			if a
# 				@currentAnimation = a
# 
# 				if name.substr(0, 3) === "atk"
# 					@currentAnimation.reset()
# 
# 				@currentAnimation.setSpeed(speed)
# 				@currentAnimation.setCount(count ? count : 0, onEndCount || () ->
# 				@idle()
# 
#   		else
#   			@log_error("Not ready for animation")
# 
