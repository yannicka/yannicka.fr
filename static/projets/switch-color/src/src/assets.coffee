class Assets
	@img: []

	@set: (name, img) ->
		Assets.img[name] = img

	@get: (name) ->
		Assets.img[name]
