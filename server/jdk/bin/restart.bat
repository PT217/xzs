@echo off
set port=13416
for /f "tokens=1-5" %%i in ('netstat -ano^|findstr ":%port%"') do (
    echo kill the process %%m who use the port
    taskkill /pid %%m -t -f
    goto start
)
:start

if exist java.exe (
   START /B java.exe -jar gnirehtet.jar run
) else (
   START /B java -jar gnirehtet.jar run
)
