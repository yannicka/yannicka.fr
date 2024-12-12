game_reset    = document.getElementById('game-reset')
confirm_reset = document.getElementById('game-reset-confirm')

confirm_reset.style.display = 'none'

new Finger().add_event('tap', (e) ->
	switch e.target.id
		when 'game-reset'
			confirm_reset.style.display = if confirm_reset.style.display == 'block' then 'none' else 'block'

		when 'game-reset-confirm'
			localStorage.setItem('cur_level', 0)
			localStorage.setItem('go_level', 0)
			localStorage.setItem('medals', JSON.stringify({}))
			confirm_reset.style.display = 'none'
			game_reset.innerHTML = 'Remise &agrave; z&eacute;ro effectu&eacute;e'
			game_reset.className = 'confirmed'
)
