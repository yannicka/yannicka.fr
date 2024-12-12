new Finger().add_event('tap', (e) ->
	target = e.target

	while target
		if target.hasAttribute and target.hasAttribute('data-href')
			location.href = target.getAttribute('data-href')
			break

		target = target.parentNode
)
