class Player
	constructor: () ->
		@cards_hands = []
		@cards_ground = []
		@cards_trash_bin = []
		@life = 0

	add_card: (card) ->
		if @cards_ground.length < 8
			@cards_hands.push(card)

			@cards_ground.push(@cards_hands[@cards_hands.length - 1])
