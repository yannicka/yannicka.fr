# Récupérer le contenu d'un fichier
load_file = (file, callback) ->
	xhr = new XMLHttpRequest()
	xhr.open('get', file, yes)
	xhr.overrideMimeType('text/csv')
	xhr.send(null)

	xhr.onreadystatechange = ->
		if xhr.readyState == 4 and (xhr.status == 200 or xhr.status == 0)
			callback(xhr.responseText)

		return

	return

# Générer un nombre aléatoire avec une graine
Rand =
	seed: 5

	gen: (min, max) ->
		min = min || 0
		max = max || 1

		@seed = (@seed * 9301 + 49297) % 233280
		rnd = @seed / 233280

		return min + rnd * (max - min)

# "Parser" un texte au format csv
parse_csv = (txt, sep = ',') ->
	lines = txt.split(/\r\n|\n|\r/)

	tab = []

	for line in lines
		tab.push(line.split(sep))

	return tab

# Création d'un évènement au touché
# element.ontouchstart réagissait dès le touché
# element.ontouchend réagissait dès que l'on enlevé le doigt de l'écran sur l'élément touché
#   peut importe si l'on avait bouger l'ascenseur
# Cette classe vérifie donc que l'on a cliqué sur l'élément sans bouger le doigt
class Finger
	constructor: ->
		@target = null
		@valid  = yes
		@events = []

		document.addEventListener('mousedown', @on_finger_down, no)
		document.addEventListener('mouseup',   @on_finger_up, no)
		document.addEventListener('mousemove', @on_finger_move, no)

	on_finger_down: (e) =>
		@on_finger_move(e)

		@valid  = yes
		@target = e.target

		return

	on_finger_up: (e) =>
		@target = e.target

		if @valid and @events.tap
			@events.tap(@)

		return

	on_finger_move: (e) =>
		@target = e.target
		@valid  = no

		return

	add_event: (name, event) ->
		@events[name] = event

		return
