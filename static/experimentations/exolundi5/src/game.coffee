SIZE = 20

panel_stats   = document.getElementById('panel_stats')
panel_infos   = document.getElementById('panel_infos')
btn_play      = document.getElementById('btn_play')
btn_random    = document.getElementById('btn_random')
in_speed      = document.getElementById('in_speed')
lbl_speed     = document.getElementById('lbl_speed')
in_nb_zombies = document.getElementById('in_nb_zombies')
in_nb_victims = document.getElementById('in_nb_victims')
in_nb_hunters = document.getElementById('in_nb_hunters')
in_nb_turns   = document.getElementById('in_nb_turns')

class Person
	constructor: (x, y) ->
		@x = x
		@y = y

		@color = rgb(255, 255, 255)

	draw: (ctx) ->

	move: ->

	move_cross: ->
		switch Math.rand(0, 3)
			when 0 then @go_right()
			when 1 then @go_left()
			when 2 then @go_down()
			when 3 then @go_up()

	move_diagonal: ->
		switch Math.rand(0, 7)
			when 0 then @go_right()
			when 1 then @go_left()
			when 2 then @go_down()
			when 3 then @go_up()
			when 4
				@go_right()
				@go_down()
			when 5
				@go_left()
				@go_up()
			when 6
				@go_right()
				@go_up()
			when 7
				@go_left()
				@go_down()

	go_up: ->
		if @y > 0
			new_y = @y - 1
		else
			new_y = @y + 1

		if is_free_cell(@x, new_y)
			@y = new_y

	go_down: ->
		if @y < SIZE - 1
			new_y = @y + 1
		else
			new_y = @y - 1

		if is_free_cell(@x, new_y)
			@y = new_y

	go_left: ->
		if @x > 0
			new_x = @x - 1
		else
			new_x = @x + 1

		if is_free_cell(new_x, @y)
			@x = new_x

	go_right: ->
		if @x < SIZE - 1
			new_x = @x + 1
		else
			new_x = @x - 1

		if is_free_cell(new_x, @y)
			@x = new_x

class Zombie extends Person
	constructor: (x, y) ->
		super(x, y)

	draw: (ctx) ->
		ctx.drawImage(img.persons, 0, 0, SIZE, SIZE, @x * SIZE, @y * SIZE, SIZE, SIZE)

	move: ->
		@move_cross()

	bite: ->
		humans = []
		pos = [
			[ @x, @y - 1 ],
			[ @x + 1, @y ],
			[ @x, @y + 1 ],
			[ @x - 1, @y ]
		]

		for human in persons when human instanceof Hunter or human instanceof Victim
			if pos.has([ human.x, human.y ])
				humans.push(human)

		for human in humans
			persons.push(new Zombie(human.x, human.y))
			persons.splice(persons.indexOf(human), 1)

class Victim extends Person
	constructor: (x, y) ->
		super(x, y)

	draw: (ctx) ->
		ctx.drawImage(img.persons, 40, 0, SIZE, SIZE, @x * SIZE, @y * SIZE, SIZE, SIZE)

	move: ->
		zombies = []
		pos = [
			[ @x, @y - 1 ],
			[ @x + 1, @y ],
			[ @x, @y + 1 ],
			[ @x - 1, @y ]
		]

		have_zombies = false

		for zombie in persons when zombie instanceof Zombie
			if pos.has([ zombie.x, zombie.y ])
				have_zombies = true
				break

		if have_zombies
			@move_cross()

class Hunter extends Person
	constructor: (x, y) ->
		super(x, y)

	draw: (ctx) ->
		ctx.drawImage(img.persons, 20, 0, SIZE, SIZE, @x * SIZE, @y * SIZE, SIZE, SIZE)

	move: ->
		@move_diagonal()

	hunt: ->
		zombies = []
		pos = [
			[ @x, @y ],
			[ @x, @y - 1 ],
			[ @x + 1, @y ],
			[ @x, @y + 1 ],
			[ @x - 1, @y ]
		]

		for zombie in persons when zombie instanceof Zombie
			if pos.has([ zombie.x, zombie.y ])
				zombies.push(zombie)

		i = 0
		for zombie in zombies when i++ < 1
			persons.splice(persons.indexOf(zombie), 1)

nbZombies = 0
nbVictims = 0
nbHunters = 0

can = document.getElementById('game')
ctx = can.getContext('2d')

can.width  = 400
can.height = 400

persons = nb_turns = timer = img = null

if nbZombies + nbVictims + nbHunters > 20 * 20
	alert 'STOP!'

init = ->
	persons = []

	for i in [ 0 ... in_nb_zombies.value ]
		[x, y] = get_free_cell()
		persons.push(new Zombie(x, y))

	for i in [ 0 ... in_nb_victims.value ]
		[x, y] = get_free_cell()
		persons.push(new Victim(x, y))

	for i in [ 0 ... in_nb_hunters.value ]
		[x, y] = get_free_cell()
		persons.push(new Hunter(x, y))

	nb_turns = 0

	img = preload_images(
		persons: 'persons.png'
	, create)

create = ->
	timer = setInterval(update, in_speed.value)

update = ->
	for victim in persons when victim instanceof Victim
		victim.move()

	for hunter in persons when hunter instanceof Hunter
		hunter.move()

	for zombie in persons when zombie instanceof Zombie
		zombie.move()

	for hunter in persons when hunter instanceof Hunter
		hunter.hunt()

	for zombie in persons when zombie instanceof Zombie
		zombie.bite()

	nb_hunters = (persons.filter (person) -> person instanceof Hunter).length
	nb_victims = (persons.filter (person) -> person instanceof Victim).length
	nb_zombies = (persons.filter (person) -> person instanceof Zombie).length

	panel_stats.innerHTML = """
		Nb. chasseurs : #{nb_hunters}<br />
		Nb. victimes : #{nb_victims}<br />
		Nb. zombies : #{nb_zombies}<br />
		Nb. tours : #{nb_turns}
	"""

	nb_turns++

	if nb_turns > in_nb_turns.value
		clearInterval(timer)

	draw()

draw = ->
	ctx.fillStyle = rgb(0, 0, 0)
	ctx.fillRect(0, 0, can.width, can.height)

	for person in persons
		person.draw(ctx)

	return

is_free_cell = (x, y) ->
	for person in persons
		if x == person.x and y == person.y
			return false

	return true

get_free_cell = ->
	loop
		x = Math.rand(0, 19)
		y = Math.rand(0, 19)

		break if is_free_cell(x, y)

	return [x, y]

btn_play.addEventListener 'click', ->
	init()
	panel_infos.style.display = 'none'

btn_random.addEventListener 'click', ->
	in_nb_zombies.value = Math.rand(0, 130)
	in_nb_victims.value = Math.rand(0, 170)
	in_nb_hunters.value = Math.rand(0, 100)
	init()
	panel_infos.style.display = 'none'

in_speed.addEventListener 'mousemove', ->
	lbl_speed.innerHTML = 'Vitesse de jeu : ' + in_speed.value
