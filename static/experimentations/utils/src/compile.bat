:: On supprime les affichages inutiles
@echo off

:: On supprime le fichier game.js s'il existe déjà
if exist "../app.js" ( del "../app.js" )

:: On compile les fichiers et on fait une pause s'il y a une erreur (= fichier game.js inexistant)
coffee -bcj ../app.js ^
	tabtor.coffee ^
	calculator.coffee ^
	lib.coffee ^
	app.coffee ^

	& if not exist "../app.js" ( pause > nul )
