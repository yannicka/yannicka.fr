class Effect
	constructor: ({ name, nbTurns, damage, margin }) ->
		name    ?= 'Effet'
		nbTurns ?= 0
		damage  ?= 0
		margin  ?= 0

		@name    = name
		@nbTurns = nbTurns
		@damage  = damage
		@margin  = margin

		@countTurns = 0

	update: ->
		@countTurns++

	getName: -> @name
	getNbTurns: -> @nbTurns
	getDamage: -> @damage
	getMargin: -> @margin

	isFirstTurn: -> @countTurns == 0
	isLastTurn:  -> @countTurns >= @nbTurns

	# Interface
	beforePlayerAttack: (player) ->
	afterPlayerAttack: (player) ->
	destroy: (player) ->
