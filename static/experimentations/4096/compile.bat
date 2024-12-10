@echo off

if exist "game.js" ( del "game.js" )

coffee -cj game.js ^
	lib.coffee ^
	game.coffee ^
	& if not exist "game.js" ( pause > nul )
