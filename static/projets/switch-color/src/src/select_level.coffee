# Initialisation du niveau du joueur
if !localStorage.getItem('cur_level')
	localStorage.setItem('cur_level', 0)

# Initialisation des médailles du joueur
if !localStorage.getItem('medals')
	localStorage.setItem('medals', JSON.stringify({}))

# Chargement du nombre de niveaux
# afin d'en afficher la liste
load_file('data/level.csv', (response) ->
	medals    = JSON.parse(localStorage.getItem('medals'))
	nb_grids  = parse_csv(response).length
	cur_level = parseInt(localStorage.getItem('cur_level'))
	choice    = document.getElementById('choice')

	for i in [ 0 ... nb_grids ] by 1
		lvl = document.createElement('li')

		lvl.setAttribute('data-level', i.toString())
		lvl.appendChild(document.createTextNode((i + 1).toString()))

		if i == cur_level
			lvl.className = 'current'
		else if i < cur_level
			lvl.className = 'finished'

		if medals[i] > 0
			lvl_medal = document.createElement('span')

			medal = switch medals[i]
				when 1 then 'bronze'
				when 2 then 'silver'
				when 3 then 'gold'

			lvl_medal.className = "medal-#{medal}"

			lvl.appendChild(lvl_medal)

		choice.appendChild(lvl)

	return
)

# Cacher la liste des niveaux aléatoires
random_level_ul       = document.getElementById('tab_random_level')
random_level_ul_style = random_level_ul.style

random_level_ul.style.display = 'none'

# Evènements lors du "tapotement" de l'écran
new Finger().add_event('tap', (e) ->
	if e.target.hasAttribute('data-level') or e.target.id == 'random_level'
		target = e.target
	else
		target = e.target.parentNode

	if target.getAttribute('data-level')
		target_level = parseInt(target.getAttribute('data-level'))
		cur_level    = parseInt(localStorage.getItem('cur_level'))

		if cur_level >= target_level
			localStorage.setItem('go_level', target_level)
			location.href = 'game.html'
	else if e.target.id == 'random_level'
		if random_level_ul_style.display == 'block'
			random_level_ul_style.display = 'none'
		else
			random_level_ul_style.display = 'block'

	return
)
