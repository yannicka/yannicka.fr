class SpellFireball extends Spell
	constructor: ->
		super(
			name: 'Boule de feu'
			damage: 20
			margin: 3
			element: Element.Fire)

		@setSmallImage(Img.get('spell-small-fireball'))

		@addEffect(new EffectPoison(
			name: 'Brûlure'
			nbTurns: 2
			damage: 3
			margin: 1))
