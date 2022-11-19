@echo off

tsc -out app.js src/calculator.ts src/tabtor.ts src/lib.ts src/app.ts

echo.
echo - Compilation terminee -

pause > nul
