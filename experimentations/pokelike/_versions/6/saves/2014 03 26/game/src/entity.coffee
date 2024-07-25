class Entity
	constructor: (sprite) ->
		@sprite = sprite

	# todo : ajouter la possibilité de choisir la largeur et hauteur
	add_animation: (name, index, length, speed) ->
		@sprite.add_animation(name, index, length, speed)

	play: (name) ->
		@sprite.play(name)

	update: () ->
		@sprite.update()

player = new Entity()
player.add_animation('walk_left', 0, 3)
player.add_animation('walk_up', 3, 3)
player.add_animation('walk_right', 6, 3)
player.add_animation('walk_down', 9, 3)
player.play(walk_down)
