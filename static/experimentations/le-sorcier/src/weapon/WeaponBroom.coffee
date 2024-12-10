class WeaponBroom extends Weapon
	constructor: ->
		super(
			name: 'Balai'
			damage: 10
			margin: 2
			dodge: .05
			riposte: .20
			attack: .85
			reattack: .10
			combo: .05)

		@setSmallImage(Img.get('miniatureWeaponBroom'))
