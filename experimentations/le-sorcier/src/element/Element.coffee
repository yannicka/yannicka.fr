class Element
	@Neutral = -1 # neutre

	@Fire  = 0 # feu
	@Water = 1 # eau
	@Grass = 2 # terre
	@Air   = 3 # air

	@Magma    = 4 # magma
	@Ice      = 5 # glace
	@Electric = 6 # électrique
	@Psychic  = 7 # psychique

	@toString: (element) ->
		switch element
			when Element.Neutral  then 'Neutre'
			when Element.Fire     then 'Feu'
			when Element.Water    then 'Eau'
			when Element.Grass    then 'Terre'
			when Element.Air      then 'Air'
			when Element.Magma    then 'Magma'
			when Element.Ice      then 'Glace'
			when Element.Electric then 'Électrique'
			when Element.Psychic  then 'Psychique'
			else                       'Inconnu'
