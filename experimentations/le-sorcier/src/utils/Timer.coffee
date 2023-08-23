class Timer
	constructor: ->
		@dt    = 0
		@last  = Date.now()
		@time  = 0
		@cross = 0

	update: ->
		@dt   = Date.now() - @last
		@last = Date.now()

		@time += @dt

		@cross++

	getDt: -> @dt
	getCross: -> @cross
