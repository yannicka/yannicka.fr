class WeaponHand extends Weapon
	constructor: ->
		super(
			name: 'Poings'
			damage: 8
			margin: 1
			dodge: .15
			riposte: .50
			attack: .95
			reattack: .05
			combo: .05)

		@setSmallImage(Img.get('miniatureWeaponHand'))
