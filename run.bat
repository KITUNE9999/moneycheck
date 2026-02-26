@echo off
chcp 65001 >nul
cd /d %~dp0

echo ========================================
echo  Claude Code Auto-Restart Runner
echo  Ctrl+C で終了
echo ========================================
echo.

:loop
echo [%date% %time%] Starting Claude Code...
echo.
claude
echo.
echo [%date% %time%] Session ended. Restarting in 3 seconds...
echo (Ctrl+C to stop)
timeout /t 3 /nobreak >nul
goto loop
