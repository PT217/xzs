@echo off
setlocal enabledelayedexpansion
set port=31416

if exist java.exe (
   START /B java.exe -jar gnirehtet.jar stop
) else (
   START /B java -jar gnirehtet.jar stop
)

for /f "tokens=1-5" %%a in ('netstat -ano ^| find ":%port%"') do (
    if "%%e%" == "" (
        set pid=%%d
    ) else (
        set pid=%%e
    )
    echo !pid!
    taskkill /f /pid !pid!
)
