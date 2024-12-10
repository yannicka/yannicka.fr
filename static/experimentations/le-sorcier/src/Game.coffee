class Game
	@mouse = null

	@width  = 500
	@height = 300

	@getMouse: -> Game.mouse
	@getWidth: -> Game.width
	@getHeight: -> Game.height

	constructor: ->
		@can = document.getElementById('game')
		@ctx = @can.getContext('2d')

		@ctx.textBaseline = 'top'

		@loadingScreen()

		@timer = new Timer()
		Game.mouse = new Mouse(@can)

	loadingScreen: ->
		# à faire : animer l'écran de chargement
		@ctx.fillStyle = rgb(0, 0, 0)
		@ctx.fillRect(0, 0, Game.getWidth(), Game.getHeight())

		@ctx.font      = '20px normal Arial'
		@ctx.fillStyle = rgb(255, 255, 255)
		@ctx.textAlign = 'center'

		@ctx.fillText('Chargement en cours...',
			Game.getWidth() / 2,
			Game.getHeight() / 2)

	init: =>
		@p1 = new Player()
		@p1.setName('Joueur1')
		@p1.setElement(Element.Ice)
		@p1.addWeapon(new WeaponBroom())
		@p1.addWeapon(new WeaponWand())
		@p1.addSpell(new SpellIceball())
		@p1.addSpell(new SpellFireball())
		@p1.setX(100)

		@p2 = new Player()
		@p2.setName('Joueur2')
		@p2.setElement(Element.Fire)
		@p2.addWeapon(new WeaponBroom())
		@p2.addWeapon(new WeaponWand())
		@p2.addSpell(new SpellFireball())
		@p2.addSpell(new SpellIceball())
		@p2.setX(390)
		@p2.flip()

		@panel1 = new Panel(reversed: no)
		@panel1.fillInformationsWithPlayer(@p1)

		@panel2 = new Panel(reversed: yes)
		@panel2.fillInformationsWithPlayer(@p2)

		setTimeout(=>
			@turnp1()
		, 1000)

		@loopGame()

	loopGame: =>
		@processInput()
		@update()
		@render()

		requestAnimationFrame(@loopGame)

	processInput: ->
		Game.mouse.update()

	update: ->
		@timer.update()

		@p1.update(@timer.getDt())
		@p2.update(@timer.getDt())

		i = Pop.all.length
		while i--
			pop = Pop.all[i]
			pop.update(@timer.getDt())

		@panel1.update()
		@panel2.update()

		@panel1
			.getLifebar()
			.setPercentage(@p1.getLifePercentage())

		@panel2
			.getLifebar()
			.setPercentage(@p2.getLifePercentage())

		winner = @getWinner()

		if winner
			if winner is @p1
				new Pop('Gagnant', @p1.getX(), @p1.getY())
			else if winner is @p2
				new Pop('Gagnant', @p2.getX(), @p2.getY())

		if winner
			clearTimeout(@to1)
			clearTimeout(@to2)
			return

	# à faire : réellement calculer qui sera le premier à attaquer
	computeFirstPlayer: -> @p1

	turnp1: ->
		@p1.turn(@p2)

		@to1 = setTimeout(=>
			@turnp2()
		, 600)

	turnp2: ->
		###
		@p2.turn(@p1)

		@to2 = setTimeout(=>
			@turnp1()
		, 600)
		###

	render: ->
		tmp = document.createElement('canvas')
		tmp.width = Game.getWidth()
		tmp.height = Game.getHeight()

		tmpCtx = tmp.getContext('2d')

		@p1.draw(tmpCtx)
		@p2.draw(tmpCtx)

		@ctx.clearRect(0, 0, Game.getWidth(), Game.getHeight())

		@ctx.drawImage(Img.get('arena'), 0, 0)

		@ctx.drawImage(tmp, 0, 20)

		# à faire : optimisation : les textes sont bouclés deux fois
		for pop in Pop.all
			pop.draw(@ctx)

		@panel1.draw(@ctx)
		@panel2.draw(@ctx)

	getWinner: ->
		if @p1.isAlive() and @p2.isDead()
			@p1
		else if @p1.isDead() and @p2.isAlive()
			@p2
		else
			null

images =
	# Tête et corps
	head: 'player/head.png'
	body: 'player/body.png'

	# Bras gauche
	upLeftArm:     'player/up-left-arm.png'
	bottomLeftArm: 'player/bottom-left-arm.png'
	leftHand:      'player/left-hand.png'

	# Bras droit
	upRightArm:     'player/up-right-arm.png'
	bottomRightArm: 'player/bottom-right-arm.png'
	rightHand:      'player/right-hand.png'

	# Jambe gauche
	upLeftLeg:     'player/up-left-leg.png'
	bottomLeftLeg: 'player/bottom-left-leg.png'
	leftFoot:      'player/left-foot.png'

	# Jambe droite
	upRightLeg:     'player/up-right-leg.png'
	bottomRightLeg: 'player/bottom-right-leg.png'
	rightFoot:      'player/right-foot.png'

	# Armes miniatures
	miniatureWeaponBroom:  'weapon/small/broom.png'
	miniatureWeaponCerals: 'weapon/small/cereals.png'
	miniatureWeaponHand:   'weapon/small/hand.png'
	miniatureWeaponSnake:  'weapon/small/snake.png'
	miniatureWeaponWand:   'weapon/small/wand.png'

	# Sorts miniatures
	'spell-small-fireball': 'spell/small/fireball.png'
	'spell-small-iceball':  'spell/small/iceball.png'

	# Interface utilisateur
	'user-informations': 'ui/user-informations.png'
	lifebar:             'ui/lifebar.png'
	arena:               'ui/arena.png'
	dialog:              'ui/dialog.png'

debug = yes

game = new Game()

Img.setPath('assets/img')
Img.setCallback(game.init)
Img.preload(images)
