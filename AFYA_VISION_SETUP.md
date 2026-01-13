# Afya Vision - Chest X-Ray Viewer Setup Guide

## 🎯 Overview

Afya Vision is a production-ready, AI-powered chest X-ray viewer designed for Ethiopian hospitals. Built on OHIF Viewer v3, it provides a simplified interface focused on chest radiography for TB screening, pneumonia detection, and general chest pathology analysis.

## 🚀 Key Features

### ✅ Completed Changes

1. **Removed OHIF Branding**
   - ✅ Removed "investigational use only" disclaimers
   - ✅ Replaced OHIF logo with "Afya Vision" branding
   - ✅ Custom pink/magenta color scheme (#E91E63)
   
2. **Simplified Chest X-Ray Workflow**
   - ✅ Created custom `afya-chest-xray` mode
   - ✅ Essential 2D tools only (Window/Level, Zoom, Pan, Length, Rotate, Flip, Invert)
   - ✅ Removed 3D, MPR, segmentation, and fusion imaging
   - ✅ Chest X-ray window presets (Lung, Mediastinum, Bone, Soft Tissue)
   
3. **Custom Branding**
   - ✅ Pink/magenta (#E91E63) primary color throughout UI
   - ✅ Dark theme optimized for radiology viewing
   - ✅ "Afya Vision" logo with lung emoji (🫁)

## 📋 Prerequisites

- **Node.js**: >= 18.x
- **Yarn**: >= 1.20.0
- **DICOM Server** (Optional): Orthanc recommended for local testing

## 🔧 Installation

### 1. Install Dependencies

From the OHIF Viewer root directory:

```bash
cd frontend/ohif-viewer
yarn install
```

This will install all dependencies including the new `@ohif/mode-afya-chest-xray` mode.

### 2. Build the Afya Vision Mode

```bash
cd modes/afya-chest-xray
yarn build
```

### 3. Build the Complete Application

```bash
cd ../..  # Back to ohif-viewer root
yarn build
```

## 🏃 Running the Application

### Development Mode

For development with hot-reload:

```bash
yarn dev
```

The application will start at `http://localhost:3000`

### Development with Orthanc

If you have Orthanc DICOM server running locally:

```bash
yarn dev:orthanc
```

### Production Build

```bash
yarn build:viewer
```

The production build will be in `platform/app/dist/`

## 🎨 Customization

### Color Scheme

The pink/magenta color scheme is defined in:

- **[platform/ui/tailwind.config.js](../../platform/ui/tailwind.config.js)** - Primary colors
- **[platform/ui/src/tailwind.css](../../platform/ui/src/tailwind.css)** - CSS variables

To change the primary color, update the `#E91E63` color values in these files.

### Branding

The logo is defined in:

- **[platform/app/public/config/default.js](../../platform/app/public/config/default.js)** - Logo component

To change the logo, modify the `whiteLabeling.createLogoComponentFn` section.

### Window Presets

Chest X-ray window presets are defined in:

- **[modes/afya-chest-xray/src/toolbarButtons.ts](../afya-chest-xray/src/toolbarButtons.ts)**

Current presets:
- **Lung**: W: 1500, L: -600 (TB cavities, pneumonia, nodules)
- **Mediastinum**: W: 350, L: 50 (heart, vessels, hilar structures)
- **Bone**: W: 2500, L: 480 (rib fractures, spine)
- **Soft Tissue**: W: 400, L: 40 (chest wall, masses)

## 🔑 Keyboard Shortcuts

- `W` - Window/Level
- `Z` - Zoom
- `P` - Pan
- `L` - Length measurement
- `R` - Rotate right
- `H` - Flip horizontal
- `I` - Invert
- `Space` - Reset viewport

## 📂 Project Structure

```
frontend/ohif-viewer/
├── modes/
│   └── afya-chest-xray/          # Custom Afya Vision mode
│       ├── src/
│       │   ├── index.tsx          # Mode definition
│       │   ├── toolbarButtons.ts  # Simplified toolbar
│       │   ├── initToolGroups.ts  # Tool configuration
│       │   └── id.js
│       ├── package.json
│       └── README.md
├── platform/
│   ├── app/
│   │   ├── public/
│   │   │   └── config/
│   │   │       └── default.js     # Main configuration
│   │   ├── src/
│   │   │   └── pluginImports.js   # Mode imports
│   │   └── package.json
│   └── ui/
│       ├── tailwind.config.js     # Color scheme
│       └── src/
│           └── tailwind.css       # CSS variables
```

## 🔌 DICOM Server Configuration

### Local Orthanc Setup

The default configuration connects to Orthanc at `http://localhost:8042`.

To change DICOM server settings, edit **[platform/app/public/config/default.js](../../platform/app/public/config/default.js)**:

```javascript
dataSources: [
  {
    namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
    sourceName: 'dicomweb',
    configuration: {
      friendlyName: 'Afya Vision DICOM Server',
      name: 'Local Orthanc',
      wadoUriRoot: 'http://localhost:8042/wado',
      qidoRoot: 'http://localhost:8042/dicom-web',
      wadoRoot: 'http://localhost:8042/dicom-web',
      // ... other settings
    },
  },
],
```

### Docker Orthanc

Start Orthanc with Docker:

```bash
yarn orthanc:up
```

## 🧪 Testing

Upload test chest X-rays to Orthanc:

```bash
# Install Orthanc tools
sudo apt-get install orthanc-dicomweb

# Upload DICOM files
storescu -aec ORTHANC localhost 4242 /path/to/dicom/files/
```

Then access the viewer at `http://localhost:3000`

## 🚀 Deployment

### Static File Hosting

Build and deploy the static files:

```bash
yarn build:viewer
# Deploy platform/app/dist/ to your web server
```

### Environment Variables

Set these for production:

```bash
PUBLIC_URL=/                      # Base URL
APP_CONFIG=config/default.js      # Config file
NODE_ENV=production
```

### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name afyavision.example.com;
    
    root /var/www/afyavision/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Proxy DICOM requests to Orthanc
    location /dicom-web/ {
        proxy_pass http://localhost:8042/dicom-web/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🐛 Troubleshooting

### Mode Not Loading

1. Verify the mode is built:
   ```bash
   cd modes/afya-chest-xray
   yarn build
   ```

2. Check pluginImports.js includes the mode:
   ```javascript
   modes.push("@ohif/mode-afya-chest-xray");
   ```

3. Rebuild the app:
   ```bash
   yarn build
   ```

### Color Scheme Not Applying

1. Clear browser cache and hard reload (Ctrl+Shift+R)
2. Verify Tailwind config changes are saved
3. Rebuild UI:
   ```bash
   cd platform/ui
   yarn build
   ```

### DICOM Images Not Loading

1. Check Orthanc is running: `http://localhost:8042`
2. Verify CORS is enabled in Orthanc config
3. Check browser console for network errors
4. Verify DICOMweb plugin is installed in Orthanc

## 📚 Additional Resources

- **OHIF Documentation**: https://docs.ohif.org/
- **Cornerstone.js**: https://www.cornerstonejs.org/
- **Orthanc**: https://www.orthanc-server.com/

## 🤝 Support

For issues or questions:
1. Check the [OHIF Discussions](https://github.com/OHIF/Viewers/discussions)
2. Review logs in browser console (F12)
3. Check Orthanc logs if DICOM server issues

## 📄 License

MIT License - See LICENSE file for details

---

**Afya Vision** - *Empowering Ethiopian Healthcare with AI-Powered Chest Radiology*
