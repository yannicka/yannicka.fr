class Monster
	constructor: ({ name, description, attack, defense, width, height, img }) ->
		@name = name
		@description = description

		@attack = attack
		@defense = defense

		@width = width
		@height = height

		@img = img
		@img_hover = create_silhouette(@img, 0, 0, 0, 255)
