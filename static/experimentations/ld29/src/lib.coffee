CanvasRenderingContext2D::draw_image_index = (img, width, height, index, x, y, draw = yes) ->
	nbtiles = Math.ceil(img.width / width)

	basex = index % nbtiles
	basex = basex * width

	basey = Math.floor(index / nbtiles)
	basey = basey * height

	if draw
		@drawImage(img, basex, basey, width, height, x, y, width, height)
	else
		nbtiles: nbtiles
		basex: basex
		basey: basey

CanvasRenderingContext2D::get2darray_image = (img) ->
	@save()

	@drawImage(img, 0, 0)

	list_pixels = @getImageData(0, 0, img.width, img.height).data

	map = []

	for i in [ 0...list_pixels.length ] by 4
		r = list_pixels[i + 0]
		g = list_pixels[i + 1]
		b = list_pixels[i + 2]
		a = list_pixels[i + 3]

		x = Math.floor((i / 4) % img.width)
		y = Math.floor(((i - x) / 4) / img.width)

		if map[x]
			map[x][y] = [ r, g, b, a]
		else
			map[x] = [[ r, g, b, a ]]

	@restore()

	map

CanvasRenderingContext2D::fill_wrap_text = (text, x, y, maxWidth, lineHeight) ->
	words = text.split(' ')
	line = ''

	for n in [ 0...words.length ]
		testLine  = line + words[n] + ' '
		metrics   = @measureText(testLine)
		testWidth = metrics.width

		if (testWidth > maxWidth)
			@fillText(line, x, y)
			line = words[n] + ' '
			y   += lineHeight
		else
			line = testLine

	@fillText(line, x, y)

CanvasRenderingContext2D::tile_from_position = (img, width, height, x, y) ->
	tile_by_line = Math.ceil(img.width / (width + 1))
	x = Math.floor(x / (width + 1))
	y = Math.floor(y / (height + 1))

	x + (y * tile_by_line)

Math.clamp = (min, val, max) ->
	Math.max(min, Math.min(max, val))

Math.sign = (x) ->
	x == 0 ? 0 : (x > 0 ? 1 : -1)

Math.between = (min, val, max) ->
	val >= min && val <= max

Math.rand = (min, max) ->
	Math.floor(Math.random() * (max - min + 1)) + min

window.rgb = (r, g, b, a = 1) ->
	if a == 1
		"rgb(#{r}, #{g}, #{b})"
	else
		"rgba(#{r}, #{g}, #{b}, #{a})"

window.hsl = (h, s, l, a = 1) ->
	if a == 1
		"hsl(#{h}, #{s}%, #{l}%)"
	else
		"hsla(#{h}, #{s}%, #{l}%, #{a})"

window.preload_images = (images, callback) ->
	nb_images_loaded = 0
	nb_images_to_load = Object.keys(images).length
	image_loaded = []

	new_image_loaded = () ->
		nb_images_loaded++
		return

	for i of images
		image_loaded[i] = new Image()
		image_loaded[i].onload = new_image_loaded
		image_loaded[i].src = images[i]

	preload = () ->
		if nb_images_loaded == nb_images_to_load
			callback()
			return
		else
			setTimeout(preload, 100)
			return

	preload()

	image_loaded

clone = (obj) ->
	new_obj = {}

	for k, v of obj
		if v instanceof Object
			new_obj[k] = clone(v)
		else
			new_obj[k] = v

	new_obj

create_silhouette = (img, r = 200, g = 200, b = 0, a = 200) ->
	can = document.createElement('canvas')
	ctx = can.getContext('2d')
	width = img.width
	height = img.height
	final_data = null
	data = null

	can.width = width
	can.height = height
	ctx.drawImage(img, 0, 0, width, height)
	data = ctx.getImageData(0, 0, width, height).data
	final_data = ctx.getImageData(0, 0, width, height)
	fdata = final_data.data

	getIndex = (x, y) ->
		return ((width * (y - 1)) + x - 1) * 4

	getPosition = (i) ->
		x = null
		y = null

		i = (i / 4) + 1
		x = i % width
		y = ((i - x) / width) + 1

		return {
			x: x
			y: y
		}

	hasAdjacentPixel = (i) ->
		pos = getPosition(i)

		if pos.x < width && !isBlankPixel(getIndex(pos.x + 1, pos.y))
			return yes

		if pos.x > 1 && !isBlankPixel(getIndex(pos.x - 1, pos.y))
			return yes

		if pos.y < height && !isBlankPixel(getIndex(pos.x, pos.y + 1))
			return yes

		if pos.y > 1 && !isBlankPixel(getIndex(pos.x, pos.y - 1))
			return yes

		return no

	isBlankPixel = (i) ->
		if i < 0 || i >= data.length
			return yes

		return data[i] == 0 && data[i + 1] == 0 && data[i + 2] == 0 && data[i + 3] == 0

	for i in [ 0 .. data.length ] by 4
		if isBlankPixel(i) && hasAdjacentPixel(i)
			fdata[i]     = r
			fdata[i + 1] = g
			fdata[i + 2] = b
			fdata[i + 3] = a

	final_data.data = fdata
	ctx.putImageData(final_data, 0, 0)

	return can

class Mouse
	constructor: (el, scale = 1) ->
		@x      = 0
		@y      = 0
		@click  = null
		@mtime  = 0
		@el     = el
		@loose  = null
		@iwheel = 0
		@scale  = scale

		document.addEventListener('mousedown', @on_mouse_down, no)
		document.addEventListener('mousemove', @on_mouse_move, no)
		document.addEventListener('mouseup', @on_mouse_up, no)
		document.addEventListener('mousewheel', @on_mouse_wheel, no)
		document.addEventListener('DOMMouseScroll', @on_mouse_wheel, no)

	update: ->
		@mtime++
		@iwheel = 0

	on_mouse_up: (e) =>
		@loose = @mtime

		@click = null

	on_mouse_down: (e) =>
		@on_mouse_move(e)

		@click = @mtime

	on_mouse_move: (e) =>
		@x = (e.pageX - (if @el? then @el.offsetLeft else 0)) // @scale
		@y = (e.pageY - (if @el? then @el.offsetTop else 0)) // @scale

	on_mouse_wheel: (e) =>
		@iwheel = -Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))

	up: ->
		return @click == null

	down: ->
		return @click != null

	press: ->
		return @click == @mtime

	release: ->
		return @loose == @mtime

	wheel: ->
		return @iwheel == 1 or @iwheel == 1

window.Key =
	TAB: 9,  ENTER: 13, SHIFT: 16, CTRL: 17
	ALT: 18, ESC : 27,  SPACE: 32

	LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40

	A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77
	N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90

	NUM0: 48, NUM1: 49, NUM2: 50, NUM3: 51, NUM4: 52
	NUM5: 53, NUM6: 54, NUM7: 55, NUM8: 56, NUM9: 57

	NUMPAD0: 96,  NUMPAD1: 97,  NUMPAD2: 98,  NUMPAD3: 99,  NUMPAD4: 100
	NUMPAD5: 101, NUMPAD6: 102, NUMPAD7: 103, NUMPAD8: 104, NUMPAD9: 105

	ADD: 107, SUB: 109, MUL: 106, DIV: 111

	CAPSLOCK: 20, PAGEUP: 33, PAGEDOWN: 34, END    : 35
	HOME    : 36, ISERT : 45, DELETE  : 46, NUMLOCK: 144

class Keyboard
	constructor: ->
		@keys  = []
		@last  = 0
		@ktime = 0

		document.addEventListener('keydown', @onkeydown, no)
		document.addEventListener('keyup', @onkeyup, no)

	update: ->
		@ktime++

	onkeyup: (e) =>
		@keys[e.keyCode] = null

	onkeydown: (e) =>
		@keys[e.keyCode] = @ktime

	up: (k) ->
		!@keys[@str_to_code(k.toUpperCase())]?

	down: (k) ->
		@keys[@str_to_code(k.toUpperCase())]?

	press: (k) ->
		@keys[@str_to_code(k.toUpperCase())] == @ktime

	str_to_code: (k) ->
		if Key[k]
			Key[k]
		else
			null
