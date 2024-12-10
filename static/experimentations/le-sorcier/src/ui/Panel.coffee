class Panel extends InterfaceElement
	constructor: ({ reversed }) ->
		super(4, 20)

		@reversed = reversed

		@playerName   = new PlayerName(0, -19, reversed: @reversed)
		@lifebar      = new Lifebar(2, 2, reversed: @reversed)
		# @avatar       = new InterfaceElement(0, 0)
		@weaponsPanel = new WeaponsPanel(64, 20, reversed: @reversed)
		@spellsPanel  = new SpellsPanel(0, 82, reversed: @reversed)
		@informations = new PlayerInformations(2, 17, reversed: @reversed)

		@addChild(@lifebar)
		@addChild(@playerName)
		# @addChild(@avatar)
		@addChild(@weaponsPanel)
		@addChild(@spellsPanel)
		@addChild(@informations)

	update: (dt) ->
		@informations.update(dt)
		@weaponsPanel.update(dt)
		@spellsPanel.update(dt)

	computeDraw: ->
		# à faire : nettoyer ce nombre magique
		if @reversed
			@sprite.save()
			@sprite.scale(-1, 1)
			@sprite.drawImage(Img.get('user-informations'), -Game.getWidth() + 8, 0)
			@sprite.restore()
		else
			@sprite.drawImage(Img.get('user-informations'), 0, 0)

	getLifebar: -> @lifebar

	fillInformationsWithPlayer: (player) ->
		@lifebar.setPercentage(player.getLifePercentage())
		@playerName.setName(player.getName())
		@informations.fillTextWithPlayer(player)
		@weaponsPanel.fillWeaponsWithPlayer(player)
		@spellsPanel.fillSpellsWithPlayer(player)
