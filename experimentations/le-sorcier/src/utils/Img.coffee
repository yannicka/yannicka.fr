class Img
	@images   = {}
	@path     = 'img/'
	@callback = ->

	@preload: (images, callback) ->
		Img.images = Img.preloadImages(images, callback)

	@get: (name) ->
		Img.images[name]

	@setAttribute: (name, attribute, value) ->
		Img.images[name][attribute] = value

	@setPath: (path) ->
		Img.path = path + '/'

	@setCallback: (callback) ->
		Img.callback = callback

	@getPath: ->
		Img.path

	@preloadImages: (images) ->
		nbImagesLoaded = 0
		nbImagesToLoad = Object.keys(images).length
		imagesLoaded   = {}

		newImageLoaded = ->
			nbImagesLoaded++

		for i of images
			imagesLoaded[i]        = new Image()
			imagesLoaded[i].onload = newImageLoaded
			imagesLoaded[i].src    = Img.getPath() + images[i]

		preload = ->
			if nbImagesLoaded == nbImagesToLoad
				Img.callback()
			else
				setTimeout(preload, 100)

		preload()

		imagesLoaded
