class Spell
	constructor: ({ name, damage, margin, element }) ->
		name    ?= 'Sort'
		damage  ?= 0
		margin  ?= 0
		element ?= Element.Neutral

		@name    = name
		@damage  = damage
		@margin  = margin
		@element = element

		@effects = []

		@image =
			small: null

	getName: -> @name
	getDamage: -> @damage
	getMargin: -> @margin
	getElement: -> @element
	getSmallImage: -> @image.small

	setSmallImage: (img) ->
		@image.small = img

	addEffect: (effect) ->
		@effects.push(effect)
