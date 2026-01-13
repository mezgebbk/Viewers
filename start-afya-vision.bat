@echo off
REM Afya Vision - Quick Start Script (Windows)
REM This script builds and starts the Afya Vision chest X-ray viewer

echo.
echo 🫁 Afya Vision - Chest X-Ray Viewer Setup
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the ohif-viewer root directory
    exit /b 1
)

REM Step 1: Install dependencies
echo 📦 Step 1/4: Installing dependencies...
call yarn install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    exit /b 1
)

REM Step 2: Build Afya Vision mode
echo 🔨 Step 2/4: Building Afya Vision chest X-ray mode...
cd modes\afya-chest-xray
call yarn build
if errorlevel 1 (
    echo ❌ Failed to build Afya Vision mode
    cd ..\..
    exit /b 1
)
cd ..\..

REM Step 3: Build UI libraries
echo 🎨 Step 3/4: Building UI libraries...
cd platform\ui
call yarn build
if errorlevel 1 (
    echo ❌ Failed to build UI libraries
    cd ..\..
    exit /b 1
)
cd ..\..

REM Step 4: Start development server
echo 🚀 Step 4/4: Starting development server...
echo.
echo ✅ Setup complete! Starting Afya Vision...
echo.
echo 🌐 The viewer will be available at: http://localhost:3000
echo 🔑 Default mode: Afya Vision Chest X-Ray
echo 🎨 Theme: Pink/Magenta (#E91E63)
echo.
echo Press Ctrl+C to stop the server
echo.

call yarn dev
