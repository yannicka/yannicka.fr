class EffectPoison extends Effect
	constructor: (args = {}) ->
		super(args)

	computeDamage: ->
		damage  = @damage
		damage += Math.rand(-@margin, @margin)

	beforePlayerAttack: (player) ->
		damage = @computeDamage()
		player.decreaseLife(damage)

		new Pop("#{@name} : #{damage}", player.skeleton.body.x + 50,
			player.skeleton.body.y)

		log("#{player.getName()} subit un poison « #{@name} » : #{damage} dégâts")
