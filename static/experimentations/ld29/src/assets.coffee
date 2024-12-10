class Assets
	@img: null

	@init_images: (assets, callback) ->
		Assets.img = preload_images(assets, callback)

	@get: (str) ->
		Assets.img[str]
