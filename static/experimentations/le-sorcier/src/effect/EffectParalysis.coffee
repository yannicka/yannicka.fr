class EffectParalysis extends Effect
	constructor: (args = {}) ->
		super(args)

	beforePlayerAttack: (player) ->
		player.setCanAttack(no)

		log("#{player.getName()} ne peut pas attaqué, il est paralysé par « #{@name} » :
			#{@damage} dégâts")

	destroy: (player) ->
		player.setCanAttack(yes)
