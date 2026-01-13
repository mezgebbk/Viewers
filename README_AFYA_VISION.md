# 🫁 Afya Vision - Chest X-Ray Viewer

**Production-ready chest X-ray viewer for Ethiopian hospitals**

Built on OHIF Viewer v3, Afya Vision provides a simplified, focused interface for radiologists working in resource-limited settings. Optimized for TB screening, pneumonia detection, and general chest pathology analysis.

## ✨ Key Features

- ✅ **No "Investigational Use" disclaimers** - Production ready
- ✅ **Afya Vision branding** - Pink/magenta theme (#E91E63)
- ✅ **Simplified chest X-ray workflow** - 11 essential tools only
- ✅ **Chest X-ray window presets** - Lung, Mediastinum, Bone, Soft Tissue
- ✅ **Keyboard shortcuts optimized** - For radiologist efficiency
- ✅ **2D imaging only** - No complex 3D/MPR/segmentation features

## 🚀 Quick Start

### Windows
```cmd
cd frontend\ohif-viewer
start-afya-vision.bat
```

### Linux/Mac
```bash
cd frontend/ohif-viewer
chmod +x start-afya-vision.sh
./start-afya-vision.sh
```

The viewer will start at **http://localhost:3000**

## 📚 Documentation

- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Complete implementation details
- **[AFYA_VISION_SETUP.md](AFYA_VISION_SETUP.md)** - Setup and deployment guide
- **[modes/afya-chest-xray/README.md](modes/afya-chest-xray/README.md)** - Mode documentation

## 🎨 What's Changed

### Branding
- Removed OHIF logo and disclaimers
- Added "🫁 Afya Vision" branding
- Custom pink/magenta color scheme

### User Interface
- Simplified toolbar with essential tools only
- Chest X-ray window presets
- Dark theme optimized for radiology

### Functionality
- Removed 3D rendering, MPR, segmentation
- Focused on 2D chest radiography
- Optimized keyboard shortcuts

## 🎯 Target Users

- Radiologists in Ethiopian hospitals
- TB screening programs
- Pneumonia detection clinics
- Rural healthcare facilities

## 🔧 System Requirements

- **Node.js**: >= 18.x
- **Yarn**: >= 1.20.0
- **Browser**: Chrome 90+, Firefox 88+, Edge 90+, Safari 14+
- **DICOM Server** (optional): Orthanc recommended

## 📦 Installation

```bash
# From the ohif-viewer directory
yarn install
cd modes/afya-chest-xray
yarn build
cd ../..
yarn dev
```

## 🛠️ Technology Stack

- **OHIF Viewer v3** - Medical imaging platform
- **Cornerstone.js** - Image rendering
- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

## 📋 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `W` | Window/Level |
| `Z` | Zoom |
| `P` | Pan |
| `L` | Length measurement |
| `R` | Rotate right |
| `H` | Flip horizontal |
| `I` | Invert |
| `Space` | Reset viewport |

## 🏥 Window Presets

1. **Lung** (W: 1500, L: -600) - TB cavities, pneumonia, nodules
2. **Mediastinum** (W: 350, L: 50) - Heart, vessels, hilar structures
3. **Bone** (W: 2500, L: 480) - Rib fractures, spine pathology
4. **Soft Tissue** (W: 400, L: 40) - Chest wall, soft tissue masses

## 🚀 Deployment

### Development
```bash
yarn dev
```

### Production
```bash
yarn build:viewer
# Deploy platform/app/dist/ to web server
```

## 📁 Project Structure

```
frontend/ohif-viewer/
├── modes/
│   └── afya-chest-xray/          # Custom Afya Vision mode
├── platform/
│   ├── app/                      # Main application
│   └── ui/                       # UI library (with pink theme)
├── AFYA_VISION_SETUP.md          # Setup guide
├── IMPLEMENTATION_SUMMARY.md     # Implementation details
├── start-afya-vision.bat         # Windows quick start
└── start-afya-vision.sh          # Linux/Mac quick start
```

## 🔌 DICOM Server

Connects to Orthanc by default at `http://localhost:8042`

### Start Orthanc with Docker
```bash
yarn orthanc:up
```

### Configure different server
Edit [platform/app/public/config/default.js](platform/app/public/config/default.js)

## 🐛 Troubleshooting

### Mode not loading?
```bash
cd modes/afya-chest-xray
yarn build
cd ../..
yarn build
```

### Colors not applying?
Clear browser cache (Ctrl+Shift+R) and rebuild:
```bash
cd platform/ui
yarn build
cd ../..
yarn dev
```

### DICOM images not showing?
1. Check Orthanc is running: `http://localhost:8042`
2. Verify DICOMweb plugin is installed
3. Check browser console for errors

## 📖 Additional Resources

- [OHIF Documentation](https://docs.ohif.org/)
- [Cornerstone.js](https://www.cornerstonejs.org/)
- [Orthanc Setup](https://www.orthanc-server.com/)

## 📄 License

MIT License

## 🤝 Contributing

This is a custom implementation for Ethiopian hospitals. For the base OHIF Viewer, see [OHIF/Viewers](https://github.com/OHIF/Viewers).

---

**Afya Vision** - *Empowering Ethiopian Healthcare with AI-Powered Chest Radiology* 🫁
