class Particle
	constructor: (x, y, dx, dy, color) ->
		@x     = x
		@y     = y
		@dx    = dx
		@dy    = dy
		@color = color

		@life     = 0
		@max_life = Math.rand(10, 20)
		@size     = @max_life

	update: ->
		@x += @dx
		@y += @dy

		@life++
		@size--

		return

	draw: (ctx) ->
		ctx.fillStyle = @color
		ctx.beginPath()
		ctx.arc(@x, @y, @size / 4, 0, 2 * Math.PI, false)
		ctx.fill()

		return

class ParticleSystem
	constructor: ->
		@particles = []

	add_particles: ({ nb, x, y, dx_min, dx_max, dy_min, dy_max, color }) ->
		for i in [ 0 ... nb ]
			@particles.push(new Particle(
				x
				y
				Math.rand(dx_min, dx_max)
				Math.rand(dy_min, dy_max)
				color
			))

	update: ->
		i = @particles.length

		while i--
			particle = @particles[i]

			particle.update()

			if particle.life >= particle.max_life
				@particles.splice(i, 1)

		return

	draw: (ctx) ->
		for particle in @particles
			particle.draw(ctx)

		return
