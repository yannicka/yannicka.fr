:: On supprime les affichages inutiles
@echo off

:: On supprime le fichier game.js s'il existe déjà
if exist "game.js" ( del "game.js" )

:: On compile les fichiers et on fait une pause s'il y a une erreur (= fichier game.js inexistant)
coffee -bcj game.js ^
	src/lib.coffee ^
	src/game.coffee ^
	& if not exist "game.js" ( pause > nul )
