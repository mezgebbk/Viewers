#!/bin/bash

# Afya Vision - Quick Start Script
# This script builds and starts the Afya Vision chest X-ray viewer

set -e  # Exit on error

echo "🫁 Afya Vision - Chest X-Ray Viewer Setup"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the ohif-viewer root directory"
    exit 1
fi

# Step 1: Install dependencies
echo "📦 Step 1/4: Installing dependencies..."
yarn install

# Step 2: Build Afya Vision mode
echo "🔨 Step 2/4: Building Afya Vision chest X-ray mode..."
cd modes/afya-chest-xray
yarn build
cd ../..

# Step 3: Build UI libraries
echo "🎨 Step 3/4: Building UI libraries..."
cd platform/ui
yarn build
cd ../..

# Step 4: Start development server
echo "🚀 Step 4/4: Starting development server..."
echo ""
echo "✅ Setup complete! Starting Afya Vision..."
echo ""
echo "🌐 The viewer will be available at: http://localhost:3000"
echo "🔑 Default mode: Afya Vision Chest X-Ray"
echo "🎨 Theme: Pink/Magenta (#E91E63)"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

yarn dev
