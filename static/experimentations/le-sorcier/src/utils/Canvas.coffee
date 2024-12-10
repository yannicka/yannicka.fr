dArr = [-1,-1, 0,-1, 1,-1, -1,0, 1,0, -1,1, 0,1, 1,1]

CanvasRenderingContext2D::drawOutlinedImage = (img, x, y, borderSize, color) ->
	for i in [ 0 .. dArr.length ] by 2
		@drawImage(img, x + dArr[i] * borderSize, y + dArr[i + 1] * borderSize)

	@globalCompositeOperation = 'source-in'
	@fillStyle = color
	@fillRect(0, 0, can.width, can.height)

	@globalCompositeOperation = 'source-over'
	@drawImage(img, x, y)

CanvasRenderingContext2D::drawDialog = (x, y, w, h) ->
	@save()
	@translate(x, y)

	imgDialog = Img.get('dialog')

	# Haut
	@drawImage(imgDialog, 0, 0, 8, 8, 0, 0, 8, 8)
	@drawImage(imgDialog, 8, 0, 8, 8, 8, 0, w - 16, 8)
	@drawImage(imgDialog, 16, 0, 8, 8, w - 8, 0, 8, 8)

	# Centre
	@drawImage(imgDialog, 0, 8, 8, 8, 0, 8, 8, h)
	@drawImage(imgDialog, 8, 8, 8, 8, 8, 8, w - 16, h)
	@drawImage(imgDialog, 16, 8, 8, 8, w  - 8, 8, 8, h)

	# Bas
	@drawImage(imgDialog, 0, 16, 8, 8, 0, h + 8, 8, 8)
	@drawImage(imgDialog, 8, 16, 8, 8, 8, h + 8, w - 16, 8)
	@drawImage(imgDialog, 16, 16, 8, 8, w - 8, h + 8, 8, 8)

	@restore()

###
CanvasRenderingContext2D::fillWrapText = (text, x, y, maxWidth, lineHeight) ->
	words = text.split(' ')
	line = ''

	for n in [ 0 ... words.length ]
		testLine	= line + words[n] + ' '
		metrics	 = @measureText(testLine)
		testWidth = metrics.width

		if testWidth > maxWidth
			@fillText(line, x, y)
			line = words[n] + ' '
			y	 += lineHeight
		else
			line = testLine

	@fillText(line, x, y)
###
