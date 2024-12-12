class Game
	constructor: (lvl = 0) ->
		if !localStorage.getItem('cur_level')?
			localStorage.setItem('cur_level', 0)

		# Zone de dessin
		@can = document.getElementById('game')
		@ctx = @can.getContext('2d')

		@shake = 0

		@particles = new ParticleSystem()
		@mouse     = new Mouse(@can)
		@timer     = new Stopwatch()

		@win_message = null
		@grid        = null
		@orig_grid   = null

		@can_click       = yes
		@can_click_timer = 120
		@can_click_time  = 0

		@btn_cancel     = document.getElementById('btn_cancel')
		@btn_skip       = document.getElementById('btn_skip')
		# @btn_restart    = document.getElementById('btn_restart')
		@btn_regenerate = document.getElementById('btn_regenerate')
		# @btn_back       = document.getElementById('btn_back')

		if lvl <= -1
			@btn_skip.style.display = 'none'
		else
			@btn_regenerate.style.display = 'none'

		@btn_cancel.style.display = 'none'

		document.addEventListener('menubutton', @on_menu_button, no)
		# document.addEventListener('backbutton', @on_back_button, no)

		new Finger().add_event('tap', (e) =>
			cur_level = parseInt(localStorage.getItem('cur_level'))
			go_level  = parseInt(localStorage.getItem('go_level'))

			target_id = if e.target.id != '' then e.target.id else e.target.parentNode.id

			switch target_id
				when 'btn_menu'
					@on_menu_button()

				when 'btn_cancel'
					@grid.cancel_last_action()
					@display_menu(no)

					if @grid.actions.length == 0
						@btn_cancel.style.display = 'none'

				when 'btn_skip'
					if go_level < cur_level
						@display_menu(no)
						@change_level(go_level + 1)

				when 'btn_restart'
					@display_menu(no)
					@change_level(go_level)

					if @grid.actions.length == 0
						@btn_cancel.style.display = 'none'

				when 'btn_regenerate'
					@display_menu(no)
					@grid = null
					@change_level(go_level)

					if @grid.actions.length == 0
						@btn_cancel.style.display = 'none'

				when 'btn_back'
					location.href = 'select_level.html'

				else
					@display_menu(no)
		)

		# Chargement des grilles
		@load_grids((grids) =>
			@grids = grids
			@create(lvl)
		)

	on_menu_button: (e) =>
		style_menu = document.getElementById('game-menu').style

		if style_menu.display == 'block'
			@display_menu(no)
		else
			@display_menu(yes)

		if e and e.preventDefault
			e.preventDefault()

		return no

	on_back_button: (e) =>
		style_menu = document.getElementById('game-menu').style

		if style_menu.display == 'block'
			@display_menu(no)

			if e and e.preventDefault
				e.preventDefault()
		else
			location.href = 'select_level.html'

		return no

	display_menu: (display) ->
		style_menu = document.getElementById('game-menu').style
		style_menu.display = if display then 'block' else 'none'

	load_grids: (callback) ->
		load_file('data/level.csv', (response) -> 
			levels = []

			j = 0

			for level in parse_csv(response)
				format    = level[0].split('x')
				nb_clicks = parseInt(level[1])
				cells     = level[2].split('')

				nb_columns = parseInt(format[0])
				nb_rows    = parseInt(format[1])

				i = cells.length
				while i--
					cells[i] = parseInt(cells[i])

				Rand.seed = j * 4

				color = Rand.gen(0, 360)

				levels.push(new Grid(nb_columns, nb_rows, nb_clicks, cells, hsl(color, 100, 38)))

				j++

			callback(levels)

			return
		)

		return

	create: (lvl = 0) ->
		window.addEventListener('resize', @resize)

		@change_level(lvl)

		@update()

		return

	update: =>
		if @win_message
			@win_message.life -= @timer.dt

			if @win_message.life <= 0
				@win_message = null

		@can_click_time += @timer.dt

		if not @can_click and @can_click_time > @can_click_timer
			@can_click      = yes
			@can_click_time = 0

		if @can_click and @mouse.target == @can and @grid.pushed(@mouse.x, @mouse.y, @mouse.press())
			@btn_cancel.style.display = 'block'

			@display_menu(no)
			@shake     = 8
			@can_click = no

			@particles.add_particles(10, @mouse)

			if @grid.is_empty()
				@launch_win()

		@shake *= -0.8

		@timer.update()
		@particles.update()

		# On efface le tremblement s'il est trop léger
		if @shake > -0.01 and @shake < 0.01
			@shake = 0

		@mouse.update()

		@draw()

		# setTimeout(@update, 1000 / 30)
		requestAnimationFrame(@update)

		return

	draw: ->
		# Fond blanc
		@ctx.clearRect(0, 0, @can.width, @can.height)

		# Secousse
		if @shake != 0
			@ctx.save()
			@ctx.translate(@shake, @shake)

		# Grille du jeu
		@grid.draw(@ctx)

		# Particules
		@particles.draw(@ctx)

		# Secousse
		if @shake != 0
			@ctx.restore()

		# Texte de victoire
		if @win_message
			@ctx.save()

			if @win_message.life < 500
				@ctx.globalAlpha = @win_message.life / 500

			go_level = parseInt(localStorage.getItem('go_level'))

			if 1 <= @win_message.medal <= 3 and go_level >= 0
				@ctx.save()

				@ctx.translate(@can.width / 2, 38)
				@ctx.scale(Math.sin(@win_message.life / 200), 1)
				@ctx.fillStyle = switch @win_message.medal
					when 1 then rgb(190, 99, 42)
					when 2 then rgb(198, 198, 198)
					when 3 then rgb(255, 212, 0)
				@ctx.strokeStyle = rgba(0, 0, 0, .2)
				@ctx.lineWidth = 2
				@ctx.beginPath()
				@ctx.arc(0, 0, 50 / 2, 0, 2 * Math.PI, false)
				@ctx.fill()
				@ctx.stroke()
				@ctx.fillStyle = rgba(0, 0, 0, .1)

				@ctx.restore()
			else if go_level < 0
				@ctx.textAlign = 'center'
				@ctx.font = 'normal 42px Arial'
				@ctx.fillStyle = rgba(255, 255, 255, @win_message.life / 1000)
				@ctx.fillText(@win_message.text, @can.width / 2, 50)
				@ctx.strokeStyle = rgba(0, 0, 0, @win_message.life / 1000)
				@ctx.lineWidth = 1
				@ctx.strokeText(@win_message.text, @can.width / 2, 50)

			@ctx.textAlign   = 'center'
			@ctx.font        = 'normal 42px Roboto, sans-serif'
			@ctx.fillStyle   = rgb(255, 255, 255)
			@ctx.strokeStyle = rgb(0, 0, 0)
			@ctx.lineWidth   = 1

			# @ctx.fillText(@win_message.text, @can.width / 2, 50)
			# @ctx.strokeText(@win_message.text, @can.width / 2, 50)

			@ctx.restore()

		return

	launch_win: ->
		@btn_cancel.style.display = 'none'

		texts_victory = [ 'Gagné !', 'Victoire !', 'Bien joué !', 'Bravo !', 'Félicitations !' ]

		medal = @grid.get_medal()

		@win_message =
			text:  rand_arr(texts_victory)
			life:  1000
			medal: medal

		@particles.clear()

		@grid = null

		go_level = parseInt(localStorage.getItem('go_level'))

		if go_level <= -1
			@change_level(go_level)
		else
			medals = JSON.parse(localStorage.getItem('medals'))

			if !medals[go_level] or (medals[go_level] and medal > medals[go_level])
				medals[go_level] = medal

				localStorage.setItem('medals', JSON.stringify(medals))

			@change_level(go_level + 1)

	resize: =>
		screen_width  = window.innerWidth - 12 # 6px à gauche + 6px à droite
		screen_height = window.innerHeight - 48 - 12 # 48px + 6px dessus + 6px dessous

		game_size = @grid.resize(screen_width, screen_height)

		@resize_canvas(game_size.width, game_size.height)

		@can.style.top = "#{screen_height / 2 - @can.height / 2}px"

		return

	resize_canvas: (width, height) ->
		# On redéfinit la taille de l'écran
		@can.width  = width
		@can.height = height

		return

	change_level: (level) ->
		if parseInt(localStorage.getItem('cur_level')) < level
			localStorage.setItem('cur_level', level)

		localStorage.setItem('go_level', level)

		# Mise à jour du texte "Niv. X/Y"
		info_level = document.getElementById('info_level')

		if level >= 0
			info_level.innerHTML = "Niveau #{level + 1} / #{@grids.length}"

			@grid = @grids[level]
			@grid.gen_grid()

			if parseInt(localStorage.getItem('cur_level')) < level + 1
				@btn_skip.style.display = 'none'
			else
				@btn_skip.style.display = 'inline-block'
		else if @grid is null and level < 0
			difficulty_level = switch level
				when -1 then 'd&eacute;butant'
				when -2 then 'facile'
				when -3 then 'moyen'
				when -4 then 'difficile'
				when -5 then 'expert'
				else         'inconnu'

			info_level.innerHTML = "Niveau #{difficulty_level}"

			[ nb_columns, nb_rows ] = switch level
				when -1 then [ Math.rand(2, 4), Math.rand(2, 4) ]
				when -2 then [ Math.rand(3, 4), Math.rand(3, 4) ]
				when -3 then [ Math.rand(3, 5), Math.rand(3, 5) ]
				when -4 then [ Math.rand(4, 5), Math.rand(4, 5) ]
				when -5 then [ Math.rand(5, 6), Math.rand(5, 6) ]
				else         [ Math.rand(5, 6), Math.rand(5, 6) ]

			Rand.seed = Math.rand(0, 360)
			cells     = (0 for i in [ 0 ... nb_columns * nb_rows ] by 1)
			color     = Rand.gen(0, 360)

			@grid = new Grid(nb_columns, nb_rows, 0, cells, hsl(color, 100, 38))

			nb_clicks = switch level
				when -1 then Math.rand(2, 4)
				when -2 then Math.rand(5, 6)
				when -3 then Math.rand(6, 8)
				when -4 then Math.rand(12, 18)
				when -5 then Math.rand(26, 40)
				else         Math.rand(42, 78)

			while @grid.is_empty()
				@grid.random_click(nb_clicks)

			@grid.regen_grid()
		else
			@grid.gen_grid()

		@resize()

		return

new Game(parseInt(localStorage.getItem('go_level')))
