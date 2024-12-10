keywords = [
	'if', 'else', 'switch', 'when', 'loop', 'while', 'do', 'for', 'class',
	'use', 'false', 'true', 'and', 'or', 'not', 'in', 'pack', 'extends', 'break',
	'continue', 'null', 'as', 'from', 'to', 'by', 'public', 'private', 'protected',
	'final', 'const', 'type', 'static', '_'
]

tokenize = (code) ->
	code = code.replace(/&lt;/g, '<')
	code = code.replace(/&gt;/g, '>')

	tokens = []

	pt = 0

	loop
		if code[pt].match(/[a-z@_]/)
			tok = ''

			loop
				tok += code[pt++]

				break if pt >= code.length or not code[pt].match(/[a-zA-Z0-9_]/)

			pt--

			if tok in keywords
				tokens.push({ value: tok, type: 'keyword' })
			else
				tokens.push({ value: tok, type: 'identifier' })
		else if code[pt].match(/[A-Z_]/)
			tok = ''

			loop
				tok += code[pt++]

				break if pt >= code.length or not code[pt].match(/[a-zA-Z0-9_]/)

			pt--

			tokens.push({ value: tok, type: 'identifier-class' })
		else if code[pt].match(/[0-9]/)
			tok = ''

			loop
				tok += code[pt++]

				break if pt >= code.length or not code[pt].match(/[0-9\.]/)

			pt--

			tokens.push({ value: tok, type: 'number' })
		else if code[pt] == '"'
			tok = ''

			i = 0

			loop
				tok += code[pt++]
				i++

				break if pt >= code.length or code[pt] == '"' or i > 200

			tok += '"'

			tokens.push({ value: tok, type: 'string' })
		else if code[pt] == '#'
			tok = ''

			loop
				tok += code[pt++]

				break if pt >= code.length or code[pt].match(/\n/)

			pt--

			tokens.push({ value: tok, type: 'comment' })
		else if code[pt] in [ '+', '-', '*', '/', '%', '^', '=' ]
			next_el = code[pt + 1]

			if next_el == '=' or (code[pt] == next_el and code[pt] in [ '+', '-' ])
				tokens.push({ value: code[pt] + next_el, type: 'op' })
				pt++
			else
				tokens.push({ value: code[pt], type: 'op' })
		else if code[pt] in [ ',', ';', '.', '(', ')', '{', '}', '[', ']', '?', ':' ]
			tokens.push({ value: code[pt], type: 'op' })
		else if code[pt] in [ '<', '>' ]
			next_el = code[pt + 1]

			if (code[pt] == '<' and next_el == '>') or code[pt] == next_el or next_el == '='
				tokens.push({ value: code[pt] + next_el, type: 'op' })
				pt++
			else
				tokens.push({ value: code[pt], type: 'op' })
		else if code[pt] == ':'
			next_el = code[pt + 1]

			if code[pt] == next_el
				tokens.push({ value: code[pt] + next_el, type: 'op' })
				pt++
			else
				tokens.push({ value: code[pt], type: 'op' })
		else
			tokens.push({ value: code[pt], type: 'txt' })

		pt++

		break if pt >= code.length

	return tokens

pres  = document.getElementsByTagName('pre')
codes = document.getElementsByTagName('code')

zones = [].concat(Array.prototype.slice.call(pres), Array.prototype.slice.call(codes))

for pre in zones
	tokens = tokenize(pre.innerHTML)

	html = ''

	for token in tokens
		html += switch token.type
			when 'keyword'          then "<span class=\"sc-keyword\">#{token.value}</span>"
			when 'op'               then "<span class=\"sc-op\">#{token.value}</span>"
			when 'identifier'       then "<span class=\"sc-identifier\">#{token.value}</span>"
			when 'number'           then "<span class=\"sc-number\">#{token.value}</span>"
			when 'string'           then "<span class=\"sc-string\">#{token.value}</span>"
			when 'comment'          then "<span class=\"sc-comment\">#{token.value}</span>"
			when 'identifier-class' then "<span class=\"sc-identifier-class\">#{token.value}</span>"
			else                         token.value

	pre.innerHTML = html
