class ParticleSystem
	constructor: ->
		@particles = []

	add_particles: (nb, pos) ->
		for i in [ 0 ... nb ] by 1
			@particles.push(new Particle(
				pos.x
				pos.y
				Math.rand(-2, 2) # dx
				Math.rand(5, 10) # dy
			))

		return

	clear: ->
		@particles = []

	update: ->
		i = @particles.length
		while i--
			particle = @particles[i]

			particle.update()

			if particle.life >= particle.max_life
				@particles.splice(i, 1)

		return

	draw: (ctx) ->
		ctx.fillStyle = rgb(255, 255, 255)

		for particle in @particles
			particle.draw(ctx)

		return

class Particle
	constructor: (x, y, dx, dy) ->
		@x     = x
		@y     = y
		@dx    = dx
		@dy    = dy

		@life     = 0
		@max_life = Math.rand(10, 20)
		@size     = @max_life

	# Mise à jour d'une particule
	update: ->
		@x += @dx
		@y += @dy

		@life++
		@size--

		return

	# Affichage d'une particule
	draw: (ctx) ->
		ctx.beginPath()
		ctx.arc(@x, @y, @size / 2, 0, PI_2, false)
		ctx.fill()

		return
