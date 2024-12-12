load_levels = (callback) ->
	xhr = new XMLHttpRequest()
	xhr.open('get', 'level.csv', yes)
	xhr.overrideMimeType('text/csv')
	xhr.send(null)

	xhr.onreadystatechange = ->
		levels = []

		if xhr.readyState == 4 and (xhr.status == 200 or xhr.status == 0)
			for level in parse_csv(xhr.responseText)
				result = level[0]

				cells = level[1].split('')
				i = cells.length

				while i--
					cells[i] = parseInt(cells[i])

				format = level[0].split('x')

				levels.push(format: format, cells: cells)

			callback(levels)
