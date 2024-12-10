class WeaponWand extends Weapon
	constructor: ->
		super(
			name: 'Baguette magique'
			damage: 6
			margin: 2
			dodge: .10
			riposte: .05
			attack: .90
			reattack: .05
			combo: .05)

		@setSmallImage(Img.get('miniatureWeaponWand'))
