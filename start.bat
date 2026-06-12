@echo off
title React Dev Server
echo ==========================================
echo  Starting React development server...
echo  The browser will open automatically.
echo ==========================================
echo.
npm.cmd run dev -- --open
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to start the server.
    pause
)
