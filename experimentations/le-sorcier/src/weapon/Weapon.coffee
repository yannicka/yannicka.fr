class Weapon
	constructor: ({ name, damage, margin, dodge, riposte, attack, reattack,
		combo }) ->
		# Valeurs par défaut des paramètres
		name     ?= 'Attaque'
		damage   ?= 5
		margin   ?= 0
		dodge    ?= .05
		riposte  ?= .05
		attack   ?= .95
		reattack ?= .05
		combo    ?= .05

		@name     = name
		@damage   = damage   # dégâts
		@margin   = margin   # marge de dégâts

		# Pourcentages (de 0 à 1)
		@dodge    = dodge    # esquive
		@riposte  = riposte  # contrattaque
		@attack   = attack   # attaque
		@reattack = reattack # re-attaque
		@combo    = combo    # combo

		@image =
			big: null
			small: null

	getName: -> @name
	getDamage: -> @damage
	getMargin: -> @margin
	getDodge: -> @dodge
	getRiposte: -> @riposte
	getAttack: -> @attack
	getReattack: -> @reattack
	getCombo: -> @combo
	getBigImage: -> @image.big
	getSmallImage: -> @image.small

	setBigImage: (img) ->
		@image.big = img

	setSmallImage: (img) ->
		@image.small = img
