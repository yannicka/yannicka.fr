class WeaponSnake extends Weapon
	constructor: ->
		super(
			name: 'Serpent'
			damage: 10
			margin: 1
			dodge: .05
			riposte: .05
			attack: .80
			reattack: .05
			combo: .30)

		@setSmallImage(Img.get('miniatureWeaponSnake'))
