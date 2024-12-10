(->
	tabtor = (where) ->
		links = document.querySelectorAll(where)

		for i in [ 0 ... links.length ]
			links[i]['onclick'] = ->
				hide_all()

				document.getElementById(@getAttribute('data-tab')).style.display = 'block'

				@className = 'active'

		hide_all = ->
			for i in [ 0 ... links.length ]
				document.getElementById(links[i].getAttribute('data-tab')).style.display = 'none'

				links[i].className = ''

		hide_all()

	window.tabtor = tabtor
)()
