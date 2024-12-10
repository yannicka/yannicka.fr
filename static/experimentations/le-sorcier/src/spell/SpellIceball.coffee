class SpellIceball extends Spell
	constructor: ->
		super(
			name: 'Boule de glace'
			damage: 14
			margin: 6
			element: Element.Ice)

		@setSmallImage(Img.get('spell-small-iceball'))

		@addEffect(new EffectParalysis(
			name: 'Glacé'
			nbTurns: 2
			damage: 0
			margin: 0))
