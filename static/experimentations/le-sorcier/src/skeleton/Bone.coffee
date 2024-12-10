class Bone
	constructor: (img, x, y, pivot = { x: 0, y: 0 }) ->
		@img = img
		@x = x
		@y = y

		@angle      = 0
		@pivot      = pivot
		@subBones   = []
		@drawAtLast = no
		@flipped    = no

	addBone: (bone) ->
		@subBones.push(bone)

	draw: (ctx) ->
		ctx.save()
		ctx.translate(@x + @pivot.x, @y + @pivot.y)

		ctx.rotate(@angle * Math.PI / 180)

		###
		ctx.beginPath()
		ctx.arc(0, 0, 5, 0, 2 * Math.PI)
		ctx.fillStyle = rgb(255, 5, 128)
		ctx.fill()
		###

		ctx.translate(-@pivot.x, -@pivot.y)

		if @flipped
			ctx.scale(-1, 1)

		if not @drawAtLast and @img
			ctx.drawImage(@img, 0, 0)

		for bone in @subBones
			bone.draw(ctx)

		if @drawAtLast and @img
			ctx.drawImage(@img, 0, 0)

		ctx.restore()
