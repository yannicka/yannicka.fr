mouse =
	x: 0
	y: 0

class WinBase
	@id     = 0
	@zIndex = 0

	constructor: (x = 0, y = 0, width = 100, height = 100, title = 'Window title', content = '') ->
		# Définition de l'identifiant (unique) de la fenêtre
		@id = "window#{WinBase.id++}"

		@x = x
		@y = y

		@rx = x
		@ry = y

		@width  = width
		@height = height

		@rwidth  = width
		@rheight = height

		@title      = title
		@content    = content
		@fullscreen = no

		# Création de la fenêtre et ajout au DOM
		@dom = document.createElement('div')
		@dom.className = 'window'
		@dom.id = @id

		@dom.innerHTML = """
			<div class="title">
				#{@title}
			</div>

			<div class="content">
				#{@content}
			</div>

			<div class="infos">
				<div class="resizer"></div>
				<div class="configs"></div>
			</div>
		"""

		app.dom.appendChild(@dom)

		# Définition de la position de la fenêtre dans le DOM (x  y)
		@set_position(@x, @y)

		# Définition de la taille de la fenêtre dans le DOM (hauteur  largeur)
		@set_size(@width, @height)

		# Définition de la profondeur de la fenêtre (au-dessus de toute les autres)
		@dom.style.zIndex = WinBase.zIndex++

	set_position: (x, y) ->
		@x = x
		@y = y

		@dom.style.left = @x + 'px'
		@dom.style.top  = @y + 'px'

	set_size: (width, height) ->
		@width  = Math.max(150, width)
		@height = Math.max(150, height)

		@dom.style.width  = @width + 'px'
		@dom.style.height = @height + 'px'

	set_fullscreen: (fullscreen) ->
		@fullscreen = fullscreen

		if @fullscreen
			@rx = @x
			@ry = @y

			@rwidth  = @width
			@rheight = @height

			@set_position(0, 0)
			@set_size(window.innerWidth, window.innerHeight)
		else
			@set_position(@rx, @ry)
			@set_size(@rwidth, @rheight)

	get_name: ->
		return 'base'

class WinNotepad extends WinBase
	constructor: (x = 0, y = 0, width = 100, height = 100, title = 'Window title') ->
		super(x, y, width, height, title, """
			<textarea></textarea>
		""")

	get_name: ->
		return 'notepad'

class WinTodolist extends WinBase
	constructor: (x = 0, y = 0, width = 100, height = 100, title = 'Window title') ->
		super(x, y, width, height, title, """
			<div class="todolist">
				<ul>
					<li><input type="checkbox" /> a</li>
					<li><input type="checkbox" /> b</li>
					<li><input type="checkbox" /> c</li>
					<li><input type="checkbox" /> d</li>
					<li><input type="checkbox" /> e</li>
					<li><input type="checkbox" /> f</li>
				</ul>
			</div>
		""")

	get_name: ->
		return 'todolist'

class WinCalendar extends WinBase
	constructor: (x = 0, y = 0, width = 100, height = 100, title = 'Window title') ->
		super(x, y, width, height, title, """
			<ul class="super-calendar">
				<li><span class="date">03/06/2014</span> <input type="text" /></li>
				<li><span class="date">04/06/2014</span> <input type="text" /></li>
				<li><span class="date">05/06/2014</span> <input type="text" /></li>
				<li><span class="date">06/06/2014</span> <input type="text" /></li>
				<li><span class="date">07/06/2014</span> <input type="text" /></li>
				<li><span class="date">08/06/2014</span> <input type="text" /></li>
			</ul>
		""")

	get_name: ->
		return 'calendar'

class WinSuperCalendar extends WinBase
	constructor: (x = 0, y = 0, width = 100, height = 100, title = 'Window title') ->
		super(x, y, width, height, title, """
			<ul class="calendar">
				<li><span class="date">03/06/2014</span> <input type="text" /></li>
				<li><span class="date">04/06/2014</span> <input type="text" /></li>
				<li><span class="date">05/06/2014</span> <input type="text" /></li>
				<li><span class="date">06/06/2014</span> <input type="text" /></li>
				<li><span class="date">07/06/2014</span> <input type="text" /></li>
				<li><span class="date">08/06/2014</span> <input type="text" /></li>
			</ul>
		""")

	get_name: ->
		return 'calendar'

class WinNotelist extends WinBase
	constructor: (x = 0, y = 0, width = 100, height = 100, title = 'Window title') ->
		super(x, y, width, height, title, """
			<div class="notelist">
				<ul>
					<li data-tab="txt_a">Note num&eacutero 1</li>
					<li data-tab="txt_b" class="active">Note num&eacutero 2</li>
					<li data-tab="txt_c">Note num&eacutero 3</li>
					<li data-tab="txt_d">Note num&eacutero 4</li>
					<li data-tab="txt_e">Note num&eacutero 5</li>
					<li data-tab="txt_f">Note num&eacutero 6</li>
					<li data-tab="txt_g">Note num&eacutero 7</li>
					<li data-tab="txt_h">Note num&eacutero 8</li>
					<li data-tab="txt_i">Note num&eacutero 9</li>
					<li data-tab="txt_j">Note num&eacutero 10</li>
				</ul>
				<textarea id="txt_a"></textarea>
				<textarea id="txt_b"></textarea>
				<textarea id="txt_c"></textarea>
				<textarea id="txt_d"></textarea>
				<textarea id="txt_e"></textarea>
				<textarea id="txt_f"></textarea>
				<textarea id="txt_g"></textarea>
				<textarea id="txt_h"></textarea>
				<textarea id="txt_i"></textarea>
				<textarea id="txt_j"></textarea>
			</div>
		""")

		script = document.createElement('script')
		script.type = 'text/javascript'
		script.innerHTML = 'tabtor(\'.notelist ul li\')'
		document.getElementsByTagName('head')[0].appendChild(script)

	get_name: ->
		return 'notelist'

app = {}

app.dom = document.getElementById('app')

app.windows = [
	new WinNotepad(5, 5, 150, 150, 'Bloc-notes'),
	new WinTodolist(160, 5, 150, 150, 'Todolist'),
	new WinCalendar(315, 5, 250, 150, 'Calendrier'),
	new WinSuperCalendar(570, 5, 250, 150, 'Calendrier avanc&eacute;'),
	new WinNotelist(825, 5, 300, 150, 'Liste de notes')
]

app.drag = undefined
app.resize = undefined

app.init = ->
	app.load_configs()

app.load_configs = ->
	###
	if (localStorage) {
		if (localStorage.getItem('windows')) {
			app.windows = []

			JSON.parse(localStorage.getItem('windows')).forEach(function(win, index, windows) {
				switch (win.type) {
					case 'window':
						app.windows.push(new AWindow(win.x, win.y, win.width, win.height, win.title))
						break

					case 'notepad':
						app.windows.push(new Notepad(win.x, win.y, win.width, win.height, win.title))
						break

					case 'todolist':
						app.windows.push(new Todolist(win.x, win.y, win.width, win.height, win.title))
						break

					case 'calendar':
						app.windows.push(new Calendar(win.x, win.y, win.width, win.height, win.title))
						break

					case 'notelist':
						app.windows.push(new Notelist(win.x, win.y, win.width, win.height, win.title))
						break
				}
			})
		}
	}
	###

app.save_configs = ->
	if localStorage
		wins = []

		@windows.forEach((win, index, windows) ->
			wins.push({
				type:      win.get_name()
				id:        win.id
				innerHTML: win.dom.innerHTML
				x:         win.x
				y:         win.y
				width:     win.width
				height:    win.height
				title:     win.title
				zIndex:    win.dom.style.zIndex
			})
		)

		localStorage.setItem('windows', JSON.stringify(wins))

document.onmousedown = (e) ->
	if e.target != cm
		parent_node = e.target.parentNode

		while parent_node != cm
			parent_node = parent_node.parentNode

			if parent_node == null
				cm.style.display = 'none'
				break

	# On tri les fenêtres en plaçant la plus en avant au début de la file
	app.windows.sort((a, b) ->
		return b.dom.style.zIndex - a.dom.style.zIndex
	)

	for i in [ 0 ... app.windows.length ]
		win = app.windows[i]

		# Glisser
		if e.pageX > win.x and
		e.pageY > win.y and
		e.pageX < win.x + win.width and
		e.pageY < win.y + 25
			app.drag = {
				win:    win
				dist_x: e.pageX - win.x
				dist_y: e.pageY - win.y
			}

			if win.fullscreen
				win.set_fullscreen(no)

		# Redimensionner
		if e.pageX > win.x + win.width - 16 and
		e.pageX < win.x + win.width and
		e.pageY > win.y + win.height - 16 and
		e.pageY < win.y + win.height
			# On garde en mémoire la position de la souris et la taille de la fenêtre
			app.resize = {
				win:    win
				dist_x: e.pageX
				dist_y: e.pageY
				init_w: win.width
				init_h: win.height
			}

		# On affiche la fenêtre voulue au premier plan
		if e.pageX > win.x and
		e.pageY > win.y and
		e.pageX < win.x + win.width and
		e.pageY < win.y + win.height
			win.dom.style.zIndex = ++WinBase.zIndex
			break

document.ondblclick = (e) ->
	if e.target != cm
		parent_node = e.target.parentNode

		while parent_node != cm
			parent_node = parent_node.parentNode

			if parent_node == null
				cm.style.display = 'none'
				break

	# On tri les fenêtres en plaçant la plus en avant au début de la file
	app.windows.sort((a, b) ->
		return b.dom.style.zIndex - a.dom.style.zIndex
	)

	for i in [ 0 ... app.windows.length ]
		win = app.windows[i]

		# Glisser
		if e.pageX > win.x and
		e.pageY > win.y and
		e.pageX < win.x + win.width and
		e.pageY < win.y + 25
			if not win.fullscreen
				win.set_fullscreen(yes)
			else
				win.set_fullscreen(no)

			break

document.onmouseup = ->
	app.drag   = undefined
	app.resize = undefined

	for i in [ 0 ... app.windows.length ]
		win = app.windows[i]

		x = Math.clamp(0, win.x, window.innerWidth - win.width)
		y = Math.clamp(0, win.y, window.innerHeight - 25)

		if win.y < 0
			win.set_fullscreen(yes)
		else
			win.set_position(x, y)

	app.save_configs()

document.onmousemove = (e) ->
	mouse.x = e.pageX
	mouse.y = e.pageY

	if (typeof app.drag != 'undefined')
		app.drag.win.set_position(
			e.pageX - app.drag.dist_x
			e.pageY - app.drag.dist_y
		)

	if (typeof app.resize != 'undefined')
		app.resize.win.set_size(
			e.pageX - app.resize.dist_x + app.resize.init_w
			e.pageY - app.resize.dist_y + app.resize.init_h
		)

cm = document.getElementById('contextmenu')

document.oncontextmenu = (e) ->
	if e.target != cm and e.target != document.body
		parent_node = e.target.parentNode

		if parent_node != cm
			while parent_node != cm
				parent_node = parent_node.parentNode

				if parent_node == null
					cm.style.display = 'none'
					break
	# Sinon on l'affiche pour pouvoir sélectionner un jour
	else
		cm.style.display = 'block'

		cm.style.left = e.pageX + 'px'
		cm.style.top  = e.pageY + 'px'

		return no

	return yes

document.getElementById('create-window').onclick = ->
	cm.style.display = 'none'
	app.windows.push(new WinNotelist(mouse.x, mouse.y, 300, 150, 'Liste de notes'))

app.init()
