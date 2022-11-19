:: On supprime les affichages inutiles
@echo off

:: On supprime le fichier game.js s'il existe déjà
if exist "game.js" ( del "game.js" )

:: On compile les fichiers et on fait une pause s'il y a une erreur (= fichier game.js inexistant)
coffee -cj game.js ^
	lib.coffee ^
	assets.coffee ^
	monster.coffee ^
	card.coffee ^
	player.coffee ^
	game.coffee ^
	& if not exist "game.js" ( pause > nul )
