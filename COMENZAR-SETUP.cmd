@echo off
chcp 65001 >nul
cls

echo ╔════════════════════════════════════════════════════════════════╗
echo ║   🏭 TRAKWERK PARQUES - SETUP AUTOMÁTICO                      ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo Iniciando setup automático...
echo.

PowerShell -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup-automatico.ps1"

pause
