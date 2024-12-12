Math.rand = (min, max) -> Math.floor(Math.random() * (max - min + 1)) + min

rgb  = (r, g, b) -> "rgb(#{r}, #{g}, #{b})"
rgba = (r, g, b, a) -> "rgba(#{r}, #{g}, #{b}, #{a})"

hsl  = (h, s, l) -> "hsl(#{h}, #{s}%, #{l}%)"
hsla = (h, s, l, a) -> "hsla(#{h}, #{s}%, #{l}%, #{a})"

clone_arr = (arr) -> arr.slice(0)
rand_arr  = (arr) -> arr[Math.floor(Math.random() * arr.length)]

PI_2 = 2 * Math.PI

if !window.requestAnimationFrame
	window.requestAnimationFrame = (->
		return window.webkitRequestAnimationFrame or
			window.mozRequestAnimationFrame         or
			window.oRequestAnimationFrame           or
			window.msRequestAnimationFrame          or
			(callback, element) ->
				window.setTimeout(callback, 1000 / 60)
	)()

get_offset = (el) ->
	x = 0
	y = 0

	while el and !isNaN(el.offsetLeft) and !isNaN(el.offsetTop)
		x += el.offsetLeft - el.scrollLeft
		y += el.offsetTop - el.scrollTop

		el = el.offsetParent

	return top: y, left: x

class Mouse
	constructor: (el) ->
		@x      = 0
		@y      = 0
		@click  = null
		@mtime  = 0
		@el     = el
		@loose  = null
		@target = null

		document.addEventListener('mousedown', @on_mouse_down, no)
		document.addEventListener('mousemove', @on_mouse_move, no)
		document.addEventListener('mouseup', @on_mouse_up, no)

		document.addEventListener('touchstart', @on_mouse_down, no)
		document.addEventListener('touchmove', @on_mouse_move, no)
		document.addEventListener('touchend', @on_mouse_up, no)

	update: ->
		@mtime++

		return

	on_mouse_up: (e) =>
		@loose  = @mtime
		@click  = null
		@target = e.target

		return

	on_mouse_down: (e) =>
		@on_mouse_move(e)

		@click  = @mtime
		@target = e.target

		return

	on_mouse_move: (e) =>
		if e.changedTouches
			e = e.changedTouches[0]

			if !e?
				return

		if @el and isNaN(@el.offsetLeft + @el.scrollLeft + @el.offsetTop + @el.scrollTop + e.pageX + e.pageY)
			return

		position_el = get_offset(@el)

		@x = e.pageX - (if @el? then position_el.left else 0)
		@y = e.pageY - (if @el? then position_el.top else 0)

		@target = e.target

		return

	press: ->
		return @click == @mtime

class Stopwatch
	constructor: ->
		@dt   = 0
		@last = Date.now()
		@time = 0

	update: ->
		now    = Date.now()

		@dt    = now - @last
		@last  = now
		@time += @dt

		return
