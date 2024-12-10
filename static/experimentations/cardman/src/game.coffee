class Game
	constructor: () ->
		@can = document.getElementById('game')
		@ctx = @can.getContext('2d')

		@width  = 400
		@height = 300
		@scale  = 2

		@can.width  = @width * @scale
		@can.height = @height * @scale

		if @ctx.mozImageSmoothingEnabled
			@ctx.mozImageSmoothingEnabled = no
		else if @ctx.webkitImageSmoothingEnabled
			@ctx.webkitImageSmoothingEnabled = no
		else if @ctx.oImageSmoothingEnabled
			@ctx.oImageSmoothingEnabled = no

		if @ctx.imageSmoothingEnabled
			ctx.imageSmoothingEnabled = no

		@ctx.scale(@scale, @scale)

		@img = {}
		@pp = null

		@mouse = new Mouse(@can, @scale)

		Assets.init_images(
			ground:      'gfx/ground.png'
			monster_a:   'gfx/monster_a.png'
			monster_b:   'gfx/monster_b.png'
			monster_who: 'gfx/monster_who.png'
			shield:      'gfx/shield.png'
			sword:       'gfx/sword.png'
			message:     'gfx/dialog.png'
		, @create)

	create: () =>
		@monsters = [
			new Monster(
				name: 'A'
				description: 'Attaque 1000 et defense 500'
				attack: 1000
				defense: 500
				width: 16
				height: 20
				img: Assets.get('monster_a')
			)

			new Monster(
				name: 'B'
				description: 'Attaque 2000 et defense nulle'
				attack: 2000
				defense: 0
				width: 16
				height: 19
				img: Assets.get('monster_b')
			)
		]

		@j1 = new Player()

		@j1.add_card(new Card(
			x: 0
			y: 0
			monster: @monsters[0]
			position: 'defense'
		))

		@j1.add_card(new Card(
			x: 50
			y: 0
			monster: @monsters[1]
			position: 'attack'
		))

		@description = null

		@update()

	update: () =>
		@description = null

		# Survol des cartes du joueur UN sur le terrain
		document.body.style.cursor = 'default'

		for card in @j1.cards_ground
			card.update_hover(@mouse)

		# Ajouter une carte au clic
		if @mouse.press()
			@j1.add_card(new Card(
				x: @j1.cards_ground.length * 50
				y: 0
				monster: @monsters[1]
				position: ['attack', 'defense'][Math.rand(0, 1)]
				visible: [yes, no][Math.rand(0, 1)]
				enemy: [yes, no][Math.rand(0, 1)]
			))

		@draw()

		@mouse.update()

		requestAnimationFrame(@update)

	draw: () ->
		# ctx.clearRect(0, 0, can.width, can.height)

		@ctx.fillStyle = rgb(255, 255, 255)
		@ctx.fillRect(0, 0, @can.width, @can.height)

		@ctx.drawImage(Assets.get('ground'), 0, 0)

		for card in @j1.cards_ground
			card.draw(@ctx)

		if @description?
			@window_message(@width - 100, @height - 50, 100, 50, @description)

		return

	window_message: (x, y, w, h, text) ->
		@ctx.save()
		@ctx.translate(x, y)

		img_dialog = Assets.get('message')

		# Haut
		@ctx.drawImage(img_dialog, 0, 0, 8, 8, 0, 0, 8, 8)
		@ctx.drawImage(img_dialog, 8, 0, 8, 8, 8, 0, w - 16, 8)
		@ctx.drawImage(img_dialog, 16, 0, 8, 8, w - 8, 0, 8, 8)

		# Centre
		@ctx.drawImage(img_dialog, 0, 8, 8, 8, 0, 8, 8, h)
		@ctx.drawImage(img_dialog, 8, 8, 8, 8, 8, 8, w - 16, h)
		@ctx.drawImage(img_dialog, 16, 8, 8, 8, w  - 8, 8, 8, h)

		# Bas
		@ctx.drawImage(img_dialog, 0, 16, 8, 8, 0, h + 8, 8, 8)
		@ctx.drawImage(img_dialog, 8, 16, 8, 8, 8, h + 8, w - 16, 8)
		@ctx.drawImage(img_dialog, 16, 16, 8, 8, w - 8, h + 8, 8, 8)

		# Texte (inutile ?)
		if text?
			@ctx.font = 'normal 8px Cardfont'
			@ctx.fillStyle = rgb(0, 0, 0)
			@ctx.textAlign = 'left'
			@ctx.fill_wrap_text(text, 8, 18, w - 8, 12)

		# On restaure l'affichage
		@ctx.restore()

new Game()
