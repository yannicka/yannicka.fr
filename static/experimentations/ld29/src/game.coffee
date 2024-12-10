class Game
	constructor: ->
		@can = document.getElementById('game')
		@ctx = @can.getContext('2d')

		@width  = 500
		@height = 500

		@can.width  = @width
		@can.height = @height

		@mouse = new Mouse(@can)
		@kb    = new Keyboard()

		@angle = 0
		@size  = 30
		@dir   = -0.5
		@speed = 0

		@player =
			x:            @width / 2 - 16 / 2
			y:            100
			width:        16
			height:       16
			speed:        0
			acceleration: 0.2
			max_speed:    2

		Assets.init_images(
			player: 'gfx/player.png'
		, @create)

	create: =>
		@update()

	update: =>
		@angle += 1.5

		if @size < 10
			@dir  = 0.5
			@size = 11
		else if @size > 50
			@dir  = -0.5
			@size = 49

		@speed += 0.1 * @dir

		@size += @speed

		if @mouse.press()
			@player.speed = -2.8

		@player.speed += @player.acceleration

		@player.y += @player.speed

		@mouse.update()
		@kb.update()

		@draw()

		requestAnimationFrame(@update)

	draw: ->
		@ctx.fillStyle = rgb(100, 220, 220)
		@ctx.fillRect(0, 0, @width, @height)

		@ctx.strokeStyle = rgb(255, 255, 255)
		@ctx.lineWidth = 75
		@ctx.beginPath()
		@ctx.arc(@width / 2, @height / 2, 190, 0, Math.PI * 2)
		@ctx.stroke()

		@ctx.fillStyle = rgb(255, 255, 255)
		@ctx.beginPath()
		@ctx.arc(@width / 2, @height / 2, 60, 0, Math.PI * 2)
		@ctx.fill()

		for i in [ 0 ... 4 ]
			@ctx.save()
			@ctx.translate(
				@width / 2 - Math.sin(i * Math.PI / 2 - @angle / 180) * 56
				@height / 2 - Math.cos(i * Math.PI / 2 - @angle / 180) * 56
			)

			diff = switch i
				when 0 then 180
				when 1 then 90
				when 2 then 0
				when 3 then 270

			@ctx.rotate((@angle / 180) + diff * Math.PI / 180)

			@ctx.fillStyle = rgb(255, 255, 255)
			@ctx.fillRect(-25 / 2, 0, 25, @size)
			@ctx.fillRect(-25 / 2, @size + 40, 25, 60 - @size)

			@ctx.restore()

		@ctx.drawImage(Assets.get('player'), @player.x, @player.y)

		return

new Game()
