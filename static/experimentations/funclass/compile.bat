@echo off

echo Debut de la compilation
echo.

haxe compile.hxml

:: if exist out.swf ( start out.swf & exit )
if exist funclass.n ( cls & neko funclass.n & nekotools boot funclass.n & exit )

echo.
echo Il y a eu une (des) erreur(s) durant la compilation...

pause > nul
