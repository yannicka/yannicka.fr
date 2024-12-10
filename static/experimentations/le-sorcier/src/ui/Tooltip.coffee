class Tooltip extends InterfaceElement
	constructor: (x, y, text) ->
		super(x, y)

		@padding = 10

		@sprite.font      = '14px normal Arial'
		@sprite.fillStyle = rgb(0, 0, 0)
		@sprite.textAlign = 'left'

		@lineHeight = 18

		@setText(text)

	setText: (text) ->
		texts = text.split("\n")
		texts = texts.map((str) -> str.trim())

		@texts = texts

		maxWidth = 0

		for text in @texts
			width  = Math.ceil(@sprite.measureText(text).width + @padding * 2)

			if width > maxWidth
				maxWidth = width

		@width  = maxWidth
		@height = @texts.length * @lineHeight - 2

	computeDraw: ->
		@sprite.drawDialog(0, 0, @width, @height)

		y = 10

		for text in @texts
			re = /\*\*(.+)\*\*(.+)/
			parts = text.split(re)

			if parts.length == 4
				@sprite.font = 'bold 12px Arial'
				@sprite.fillText(parts[1], 8, y)

				width = @sprite.measureText(parts[1]).width

				@sprite.font = '12px Arial'
				@sprite.fillText(parts[2], 8 + width, y)
			else
				@sprite.fillText(text, 8, y)

			y += @lineHeight

	getWidth: -> @width
