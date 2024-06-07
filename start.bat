@echo off
setlocal

REM Перейти в папку Frontend и запустить реакт и hardhat ноду
echo Starting Frontend systems...
cd Frontend

REM Запуск реакт-приложения
start cmd /c "echo Starting react... && npm start"

REM Запуск hardhat ноды
start cmd /c "echo Starting hardhat... && npx hardhat node"

REM Перейти в папку Backend и запустить express сервер
echo Starting Backend systems...
cd ..\Backend

REM Запуск express сервера
start cmd /c "echo Starting Express server... && node server.js"

REM Вернуться в корневую папку
cd ..

echo All systems are running!

endlocal
pause
