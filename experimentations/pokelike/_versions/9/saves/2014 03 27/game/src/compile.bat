@echo off

coffee -cj game.js ^
	lib.coffee ^
	animation.coffee ^
	sprite.coffee ^
	entity.coffee ^
	tile.coffee ^
	game.coffee

:: pause > nul
