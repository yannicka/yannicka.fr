class WeaponCerals extends Weapon
	constructor: ->
		super(
			name: 'Céréales'
			damage: 5
			margin: 2
			dodge: .10
			riposte: .00
			attack: .65
			reattack: .70
			combo: .05)

		@setSmallImage(Img.get('miniatureWeaponCereals'))
