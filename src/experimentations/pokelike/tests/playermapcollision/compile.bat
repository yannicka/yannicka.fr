:: On supprime les affichages inutiles
@echo off

:: On supprime le fichier game.js s'il existe déjà
if exist "test.js" ( del "test.js" )

:: On compile les fichiers et on fait une pause s'il y a une erreur (= fichier game.js inexistant)
coffee -bcj test.js ^
	lib.coffee ^
	test.coffee ^
	& if not exist "test.js" ( pause > nul )
