@echo off
if exist java.exe (
   START /B java.exe -jar gnirehtet.jar run
) else (
   START /B java -jar gnirehtet.jar run
)
