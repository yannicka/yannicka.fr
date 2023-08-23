class Skeleton
	constructor: ->
		@body = new Bone(null, 140, 80)
		@torso = new Bone(Img.get('body'), 0, 0, { x: 26, y: 0 })
		@head  = new Bone(Img.get('head'), -27, -78, { x: 47, y: 88 })

		@frontTopArm    = new Bone(Img.get('upLeftArm'), -15, 6, { x: 15, y: 0 })
		@frontBottomArm = new Bone(Img.get('bottomLeftArm'), 0, 30, { x: 17, y: 0 })
		@frontHand      = new Bone(Img.get('leftHand'), 6, 24, { x: 8, y: 3 })

		@rearTopArm    = new Bone(Img.get('upRightArm'), 27, 0, { x: 9, y: 1 })
		@rearBottomArm = new Bone(Img.get('bottomRightArm'), 3, 28, { x: 9, y: 0 })
		@rearHand      = new Bone(Img.get('rightHand'), -11, 23, { x: 17, y: 3 })

		@frontThigh = new Bone(Img.get('upLeftLeg'), -1, 48, { x: 14, y: 0 })
		@frontShin  = new Bone(Img.get('bottomLeftLeg'), -8, 33, { x: 21, y: 2 })
		@frontFoot  = new Bone(Img.get('leftFoot'), 0, 28, { x: 14, y: 0 })

		@rearThigh = new Bone(Img.get('upRightLeg'), 19, 48, { x: 15, y: 0 })
		@rearShin  = new Bone(Img.get('bottomRightLeg'), 4, 25, { x: 15, y: 0 })
		@rearFoot  = new Bone(Img.get('rightFoot'), 0, 24, { x: 15, y: 6 })

		###
		@frontBottomArm.drawAtLast = yes
		@rearBottomArm.drawAtLast = yes

		@frontShin.drawAtLast = yes
		@rearShin.drawAtLast = yes
		###

		@body.addBone(@rearThigh)
		@body.addBone(@frontThigh)
		@body.addBone(@torso)

		@torso.addBone(@rearTopArm)
		@torso.addBone(@frontTopArm)
		@torso.addBone(@head)

		@frontTopArm.addBone(@frontBottomArm)
		@frontBottomArm.addBone(@frontHand)

		@rearTopArm.addBone(@rearBottomArm)
		@rearBottomArm.addBone(@rearHand)

		@frontThigh.addBone(@frontShin)
		@frontShin.addBone(@frontFoot)

		@rearThigh.addBone(@rearShin)
		@rearShin.addBone(@rearFoot)

	update: (dt) ->
		if @time <= 0
			@incr = 0.1
		else if @time >= 1
			@incr = -0.1

		@time += @incr

		# Position de course
		###
		player.angle = 20
		head.angle = -20
		head.x += 8

		upLeftArm.angle = -70
		bottomLeftArm.angle = -20
		bottomLeftArm.y -= 4
		upLeftArm.x += 18
		upLeftArm.y += 8

		upRightArm.x -= 28
		upRightArm.y += 14
		upRightArm.angle = 70
		bottomRightArm.angle = -41
		rightHand.angle -= 50

		upLeftLeg.angle = -106
		bottomLeftLeg.angle = 20
		upLeftLeg.x += 8
		upLeftLeg.y += 16
		leftFoot.angle = -18

		upRightLeg.angle = 60
		bottomRightLeg.angle = 16
		upRightLeg.x -= 12
		upRightLeg.y += 4
		rightFoot.angle = -40
		###

		###
		AplayerAngle = [ 0, 20 ]
		AheadAngle = [ 0, -20 ]
		AheadX = [ -27, -19 ]

		AupLeftArmAngle = [ 0, -70 ]
		AbottomLeftArmAngle = [ 0, -20 ]
		AbottomLeftArmY = [ 30, 26 ]
		AupLeftArmX = [ -15, 3 ]
		AupLeftArmY = [ 6, 14 ]

		AupRightArmX = [ 27, -1 ]
		AupRightArmY = [ 0, 14 ]
		AupRightArmAngle = [ 0, 70 ]
		AbottomRightArmAngle = [ 0, -41 ]
		ArightHandAngle = [ 0, -50 ]

		AupLeftLegAngle = [ 0, -106 ]
		AbottomLeftLegAngle = [ 0, 20 ]
		AupLeftLegX = [ -1, 7 ]
		AupLeftLegY = [ 48, 64 ]
		AleftFootAngle = [ 0, -18 ]

		AupRightLegAngle = [ 0, 60 ]
		AbottomRightLegAngle = [ 0, 16 ]
		AupRightLegX = [ 19, 7 ]
		AupRightLegY = [ 48, 52 ]
		ArightFootAngle = [ 0, -40 ]

		@skeleton.angle = linear(AplayerAngle, @time)
		@head.angle = linear(AheadAngle, @time)
		@head.x = linear(AheadX, @time)

		@upLeftArm.angle = linear(AupLeftArmAngle, @time)
		@bottomLeftArm.angle = linear(AbottomLeftArmAngle, @time)
		@bottomLeftArm.y = linear(AbottomLeftArmY, @time)
		@upLeftArm.x = linear(AupLeftArmX, @time)
		@upLeftArm.y = linear(AupLeftArmY, @time)

		@upRightArm.x = linear(AupRightArmX, @time)
		@upRightArm.y = linear(AupRightArmY, @time)
		@upRightArm.angle = linear(AupRightArmAngle, @time)
		@bottomRightArm.angle = linear(AbottomRightArmAngle, @time)
		@rightHand.angle = linear(ArightHandAngle, @time)

		@upLeftLeg.angle = linear(AupLeftLegAngle, @time)
		@bottomLeftLeg.angle = linear(AbottomLeftLegAngle, @time)
		@upLeftLeg.x = linear(AupLeftLegX, @time)
		@upLeftLeg.y = linear(AupLeftLegY, @time)
		@leftFoot.angle = linear(AleftFootAngle, @time)

		@upRightLeg.angle = linear(AupRightLegAngle, @time)
		@bottomRightLeg.angle = linear(AbottomRightLegAngle, @time)
		@upRightLeg.x = linear(AupRightLegX, @time)
		@upRightLeg.y = linear(AupRightLegY, @time)
		@rightFoot.angle = linear(ArightFootAngle, @time)
		###

		# @body.x += 8

	draw: (ctx) ->
		@body.draw(ctx)
