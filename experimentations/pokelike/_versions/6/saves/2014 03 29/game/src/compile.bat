@echo off

coffee -cj game.js ^
	lib.coffee ^
	animation.coffee ^
	sprite.coffee ^
	entity.coffee ^
	tile.coffee ^
	player.coffee ^
	game.coffee

:: pause > nul
