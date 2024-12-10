# Object
Object.keys ?= (obj) -> key for own key of obj

Object.clone = (obj) ->
	return obj if obj is null or typeof obj isnt 'object'

	temp = new obj.constructor()

	for key of obj
		temp[key] = Object.clone(obj[key])

	return temp

# Math
Math.rand = (min, max) ->
	Math.floor(Math.random() * (max - min + 1) + min)

# Fonctions
linear = (variation, value) ->
	variation[0] + (variation[1] - variation[0]) * value

rgb = (r, g, b, a = 1) ->
	if a == 1
		"rgb(#{r}, #{g}, #{b})"
	else
		"rgba(#{r}, #{g}, #{b}, #{a})"

log = (message) ->
	if debug
		console.log(message)
