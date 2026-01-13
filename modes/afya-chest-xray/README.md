# Afya Vision Chest X-Ray Mode

A simplified OHIF mode designed specifically for chest radiography in resource-limited settings, such as Ethiopian hospitals.

## Features

### Essential 2D Tools Only
- **Window/Level**: Adjust brightness and contrast with presets for lung, mediastinum, bone, and soft tissue
- **Zoom**: Magnify regions of interest
- **Pan**: Navigate around the image
- **Length Measurement**: Measure distances (lesions, heart size, etc.)
- **Rotate**: Orient PA/AP/Lateral views correctly
- **Flip**: Horizontal and vertical flipping
- **Invert**: View positive/negative images
- **Reset**: Return to default view

### Removed Complex Features
- ❌ 3D MPR (Multi-Planar Reconstruction)
- ❌ Segmentation tools
- ❌ Crosshairs and reference lines
- ❌ Fusion imaging
- ❌ CT/MRI hanging protocols
- ❌ Volume rendering

### Keyboard Shortcuts
- `W` - Window/Level
- `Z` - Zoom
- `P` - Pan
- `L` - Length measurement
- `R` - Rotate right
- `H` - Flip horizontal
- `I` - Invert
- `Space` - Reset viewport

## Chest X-Ray Window Presets

Optimized for common chest pathologies:

1. **Lung Window** (W: 1500, L: -600)
   - Best for: TB cavities, pneumonia, nodules
   
2. **Mediastinum** (W: 350, L: 50)
   - Best for: Heart size, great vessels, hilar structures
   
3. **Bone Window** (W: 2500, L: 480)
   - Best for: Rib fractures, spine pathology
   
4. **Soft Tissue** (W: 400, L: 40)
   - Best for: Chest wall, soft tissue masses

## Target Use Cases

- TB screening programs
- Pneumonia detection
- COVID-19 chest X-ray analysis
- General chest pathology review
- Cardiac silhouette assessment

## Installation

This mode is part of the Afya Vision OHIF Viewer. It will be automatically available when the application starts.

## Development

```bash
# Install dependencies
yarn install

# Build the mode
yarn build

# Development mode with hot reload
yarn dev
```

## License

MIT License
