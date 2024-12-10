class Card
	constructor: ({ x, y, monster, position, visible, enemy }) ->
		position ?= 'visible'
		visible ?= yes
		enemy ?= no

		@x = x
		@y = y

		@monster = monster

		@hover = no

		@position = position
		@visible = visible
		@enemy = enemy

	draw: (ctx) ->
		img = @monster.img
		sx  = 0
		sy  = @monster.height
		sw  = @monster.width
		sh  = @monster.height
		dx  = @x
		dy  = @y
		dw  = sw
		dh  = sh

		if @hover
			img = @monster.img_hover
			sy  = @monster.height

		if @enemy
			sy = 0

			if !@visible
				img = Assets.get('monster_who')

		ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)

		# Attaque & Défense
		if !@enemy or @visible
			ctx.fillStyle = rgb(255, 255, 255)
			ctx.font = 'normal 6px Cardfont'

			ctx.shadowColor = rgb(0, 0, 0)
			ctx.shadowBlur = 2
			ctx.shadowOffsetX = 0
			ctx.shadowOffsetY = 0

			ctx.textAlign = 'center'

			ctx.fillStyle = rgb(255, 255, 255)
			ctx.shadowColor = rgb(0, 0, 0)

			if @position == 'attack'
				ctx.fillStyle = rgb(200, 0, 0)
				ctx.shadowColor = rgb(255, 0, 0)

			ctx.fillText(@monster.attack, @x + @monster.width / 2, @y + @monster.height + 10)

			ctx.fillStyle = rgb(255, 255, 255)
			ctx.shadowColor = rgb(0, 0, 0)

			if @position == 'defense'
				ctx.fillStyle = rgb(0, 130, 0)
				ctx.shadowColor = rgb(0, 255, 0)

			ctx.fillText(@monster.defense, @x + @monster.width / 2, @y + @monster.height + 20)

			ctx.shadowBlur = 0

		if @position == 'defense'
			ctx.drawImage(Assets.get('shield'), @x + 9, @y + 9)
		else if @position == 'attack'
			ctx.drawImage(Assets.get('sword'), @x + 9, @y + 9)

	update_hover: (mouse) ->
		if !@visible and @enemy
			return

		@hover = no

		if mouse.x > @x and \
		mouse.x <= @x + @monster.width and \
		mouse.y > @y and \
		mouse.y <= @y + @monster.height
			@hover = yes
			document.body.style.cursor = 'pointer'

		@monster.description
