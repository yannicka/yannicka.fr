window.rgb = (r, g, b, a = 1) ->
	if a == 1
		'rgb(' + r + ', ' + g + ', ' + b + ')'
	else
		'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')'

Math.rand = (min, max) ->
	Math.floor(Math.random() * (max - min + 1)) + min

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
	constructor: () ->
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
