@echo off
haxe compile.hxml
nekotools boot Befunge.n
Befunge.exe code.befunge
pause > nul
