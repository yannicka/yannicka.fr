class Player
	constructor: ->
		# à faire : éviter d'avoir trop de variables concentrées au même endroit
		# à faire : renommer weapon en currentWeapon ?
		@name      = 'Joueur'
		@maxlife   = 100
		@life      = @maxlife
		@strength  = 0 # à faire : dégâts des poings et armes
		@defense   = 0 # à faire : prendre en compte la défense
		@speed     = 0 # à faire : capacité à frapper rapidement et à esquiver les coups
		@magic     = 0 # à faire : dégâts des pouvoirs
		@element   = Element.Fire # Elément du joueur, détermine les sorts qu'il gagnera
		@weapons   = [] # Arme dont dispose le joueur
		@weapon    = new WeaponHand() # Arme courante du joueur (celle qu'il a en main)
		@spells    = [] # Sorts son dispose le joueur
		@effects   = [] # Effets influents sur le joueur
		@canAttack = yes

		@skeleton = new Skeleton()

	update: (dt) ->

	draw: (ctx) ->
		@skeleton.draw(ctx)

	getName: -> @name
	getMaxlife: -> @maxlife
	getLife: -> @life
	getLifePercentage: -> @life / @maxlife
	getStrength: -> @strength
	getDefense: -> @defense
	getSpeed: -> @speed
	getMagic: -> @magic
	getElement: -> @element
	getWeapons: -> @weapons
	getWeapon: -> @weapon
	getSpells: -> @spells
	getEffects: -> @effects
	getCanAttack: -> @canAttack
	getX: -> @skeleton.body.x
	getY: -> @skeleton.body.y
	getPos: -> { x: @getX(), y: @getY() }

	setName: (name) ->
		@name = name

	setMaxlife: (maxlife) ->
		@maxlife = maxlife

	setLife: (life) ->
		@life = life

	setStrength: (strength) ->
		@strength = strength

	setDefense: (defense) ->
		@defense = defense

	setMagic: (magic) ->
		@magic = magic

	setElement: (element) ->
		@element = element

	setWeapon: (weapon) ->
		@weapon = weapon

	setCanAttack: (canAttack) ->
		@canAttack = canAttack

	setX: (x) ->
		@skeleton.body.x = x

	setY: (y) ->
		@skeleton.body.y = y

	setPos: (x, y) ->
		@setX(x)
		@setY(y)

	isAlive: -> @life > 0
	isDead: -> not @isAlive()

	hasSpells: -> @spells.length > 0
	hasWeaponInHand: -> @weapon not instanceof WeaponHand
	hasWeapons: -> @weapons.length > 0

	addWeapon: (weapon) ->
		@weapons.push(weapon)

	addSpell: (spell) ->
		@spells.push(spell)

	addEffect: (effect) ->
		@effects.push(effect)

	removeEffect: (effect) ->
		index = @effects.indexOf(effect)
		effect.destroy(@)
		@effects.splice(index, 1)

	# Baisser la vie du joueur
	decreaseLife: (life) ->
		@life -= life

	# Augmenter la vie du joueur
	increaseLife: (life) ->
		@life += life

	# Tourne horizontalement le joueur
	flip: ->
		@skeleton.body.flipped = yes

	# Supprime l'arme que le joueur a en main
	# puis lui affecte au hasard une arme de son inventaire
	takeWeaponInHand: ->
		@dropWeaponInHand()

		if @hasWeapons()
			index = Math.rand(0, @weapons.length - 1)
			@weapon = @weapons[index]
			@weapons.splice(index, 1)

			log("#{@name} a pris en main l'arme #{@weapon.getName()}")

	# Supprime l'arme du joueur (lui affecte une « Main »)
	dropWeaponInHand: ->
		if @weapon not instanceof WeaponHand
			log("#{@name} a jeté son arme #{@weapon.getName()}")

		@weapon = new WeaponHand()










	# Tour de jeu
	# à faire :
	# - changement d'arme
	# - utilisation des sorts
	# - prise en compte de la vitesse des joueurs
	# - ...
	turn: (opponent) ->
		log("===== Tour de #{@name} =====")

		i = @effects.length
		while i--
			effect = @effects[i]

			effect.update()
			effect.beforePlayerAttack(@)

			if effect.isLastTurn()
				@removeEffect(effect)

		if not @canAttack
			log("#{@name} ne peut pas attaquer")
			return

		if @dice(.20)
			@takeWeaponInHand()

		@attackPhase(opponent)

		for effect in @effects
			effect.afterPlayerAttack(@)

	# Donne un coup à l'adversaire
	knock: (opponent) ->
		damage = @computeDamage()

		opponent.decreaseLife(damage)

		new Pop("#{damage}",
			opponent.getX(),
			opponent.getY())

		log("#{@name} porte un coup à #{opponent.getName()}
			avec #{@weapon.getName()} : #{damage} dégâts")

	computeDamage: ->
		damage  = @weapon.damage
		damage += Math.rand(-@weapon.getMargin(), @weapon.getMargin())
		damage += @strength * 2

		return damage

	# Le joueur esquive l'attaque
	evade: (opponent) ->

	# Remet le joueur a sa position initiale
	goBack: ->
		log("#{@name} retourne à sa position initiale")

	# Phase d'attaque
	attackPhase: (opponent) ->
		if @attack(opponent)
			@dodgePhase(opponent)
		else
			log("#{@name} rate son attaque envers #{opponent.getName()}")
			@goBack()

		if @reAttack(opponent)
			log("#{@name} attaque à nouveau #{opponent.getName()}")
			@attackPhase(opponent)

	dodgePhase: (opponent) ->
		if @dodge(opponent)
			log("#{opponent.getName()} a esquivé l'attaque de #{@name}")

			if @riposte(opponent)
				log("#{opponent.getName()} contrattaque #{@name}")
				opponent.knock(@)
			else
				opponent.evade(@)

			@goBack()
		else
			@knock(opponent)

			if @combo(opponent)
				log("#{@name} effectue un combo envers #{opponent.getName()}")
				@dodgePhase(opponent)
			else
				@goBack()

	# Booléens déterminant quelles phases réussissent
	# attaque l'adversaire
	attack: (opponent) -> @dice(@weapon.getAttack())

	# esquive de l'adversaire
	dodge: (opponent) -> @dice(opponent.getWeapon().getDodge())

	# contrattaque de l'adversaire
	riposte: (opponent) -> @dice(opponent.getWeapon().getRiposte())

	# attaque à nouveau
	combo: (opponent) -> @dice(@weapon.getCombo())

	# attaque à nouveau après s'être remis en place
	reAttack: (opponent) -> @dice(@weapon.getReattack())

	dice: (value) ->
		rand = Math.random()
		# à faire : prendre en compte la vitesse du joueur (des joueurs ?)
		return value >= rand
