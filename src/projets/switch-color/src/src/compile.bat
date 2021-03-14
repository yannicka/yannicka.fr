:: On supprime les affichages inutiles
@echo off

:: On supprime le fichier game.js s'il existe déjà
if exist "../js/common.js" ( del "../js/common.js" )
if exist "../js/game.js" ( del "../js/game.js" )
if exist "../js/select_level.js" ( del "../js/select_level.js" )
if exist "../js/page.js" ( del "../js/page.js" )
if exist "../js/options.js" ( del "../js/options.js" )

:: On compile les fichiers et on fait une pause s'il y a une erreur (= fichier game.js inexistant)
coffee -bcj ../js/common.js ^
	common.coffee ^

	& coffee -bcj ../js/game.js ^
	lib.coffee ^
	cell.coffee ^
	grid.coffee ^
	particle_system.coffee ^
	game.coffee ^

	& coffee -bcj ../js/select_level.js ^
	select_level.coffee ^

	& coffee -bcj ../js/page.js ^
	page.coffee ^

	& coffee -bcj ../js/options.js ^
	options.coffee ^

	& if not exist "../js/common.js" ( pause > nul ) ^
	& if not exist "../js/game.js" ( pause > nul ) ^
	& if not exist "../js/select_level.js" ( pause > nul )
	& if not exist "../js/page.js" ( pause > nul )
	& if not exist "../js/options.js" ( pause > nul )
