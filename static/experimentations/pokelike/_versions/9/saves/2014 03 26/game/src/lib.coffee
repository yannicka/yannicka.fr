CanvasRenderingContext2D::draw_image_index = (img, width, height, index, x, y, draw = true) ->
	nbtiles = Math.ceil(img.width / width)

	basex = index % nbtiles
	basex = basex * width

	basey = Math.floor(index / nbtiles)
	basey = basey * height

	if draw
		@drawImage(img, basex, basey, width, height, x, y, width, height)
	else
		nbtiles: nbtiles,
		basex: basex,
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

rgb = (r, g, b, a = 1) ->
	if a == 1
		'rgb(' + r + ', ' + g + ', ' + b + ')'
	else
		'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')'

preload_images = (images, callback) ->
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

window.rgb = rgb
window.preload_images = preload_images

#	var Key = {
#		TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17,
#		ALT: 18, ESC : 27, SPACE: 32,
#
#		LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40,
#
#		A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77,
#		N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,
#
#		NUM0: 48, NUM1: 49, NUM2: 50, NUM3: 51, NUM4: 52,
#		NUM5: 53, NUM6: 54, NUM7: 55, NUM8: 56, NUM9: 57,
#
#		NUMPAD0: 96, NUMPAD1: 97, NUMPAD2: 98, NUMPAD3: 99, NUMPAD4: 100,
#		NUMPAD5: 101, NUMPAD6: 102, NUMPAD7: 103, NUMPAD8: 104, NUMPAD9: 105,
#
#		ADD: 107, SUB: 109, MUL: 106, DIV: 111,
#
#		CAPSLOCK: 20, PAGEUP: 33, PAGEDOWN: 34, END    : 35,
#		HOME    : 36, ISERT : 45, DELETE  : 46, NUMLOCK: 144
#	};
#
#	function Keyboard() {
#		this.init = function() {
#			this.keys  = [];
#			this.last  = 0;
#			this.ktime = 0;
#
#			document.addEventListener('keydown', this.onkeydown, false);
#			document.addEventListener('keyup', this.onkeyup, false);
#		};
#
#		var self = this;
#
#		this.update = function() {
#			this.ktime++;
#		};
#
#		this.onkeyup = function(e) {
#			self.keys[e.keyCode] = null;
#		};
#
#		this.onkeydown = function(e) {
#			self.keys[e.keyCode] = self.ktime;
#		};
#
#		this.up = function(k) {
#			return this.keys[k] == null;
#		};
#
#		this.down = function(k) {
#			return this.keys[k] != null;
#		};
#
#		this.press = function(k) {
#			return this.keys[k] == this.ktime;
#		};
#
#		this.init();
#	}
#

