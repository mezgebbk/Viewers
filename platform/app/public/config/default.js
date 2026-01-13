window.config = {
  // ========================================
  // 1. REMOVE INVESTIGATIONAL DISCLAIMER
  // ========================================
  investigationalUseDialog: {
    option: 'never'  // No more "research only" warning
  },

  // ========================================
  // 2. AFYA VISION BRANDING
  // ========================================
  whiteLabeling: {
    createLogoComponentFn: function (React) {
      return React.createElement(
        'a',
        {
          href: '/',
          style: {
            display: 'flex',
            alignItems: 'center',
            padding: '8px 12px',
            transition: 'opacity 0.2s ease',
            cursor: 'pointer'
          },
          onMouseEnter: function(e) {
            e.currentTarget.style.opacity = '0.8';
          },
          onMouseLeave: function(e) {
            e.currentTarget.style.opacity = '1';
          }
        },
        React.createElement('img', {
          src: './afyascan-logo.png',
          alt: 'AfyaScan',
          style: {
            height: '55px',
            width: 'auto',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
          }
        })
      );
    },
  },

  // ========================================
  // 3. BASIC SETTINGS
  // ========================================
  routerBasename: '/',
  showStudyList: true,
  maxNumberOfWebWorkers: 3,
  showWarningMessageForCrossOrigin: false,
  showCPUFallbackMessage: false,

  // ========================================
  // 4. CHEST X-RAY OPTIMIZED WINDOW PRESETS
  // ========================================
  defaultDataSourceName: 'dicomweb',
  
  // ========================================
  // 5. CONNECT TO LOCAL DICOM SERVER (Orthanc)
  // ========================================
  dataSources: [
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb',
      configuration: {
        friendlyName: 'Afya Vision DICOM Server',
        name: 'DCM4CHEE Demo',
        wadoUriRoot: 'https://d14fa38qiwhyfd.cloudfront.net/dicomweb',
        qidoRoot: 'https://d14fa38qiwhyfd.cloudfront.net/dicomweb',
        wadoRoot: 'https://d14fa38qiwhyfd.cloudfront.net/dicomweb',
        qidoSupportsIncludeField: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: false,
        supportsWildcard: true,
        omitQuotationForMultipartRequest: true,
      },
    },
  ],

  // ========================================
  // 6. SIMPLIFIED STUDY LIST (only chest X-ray relevant columns)
  // ========================================
  filterQueryParam: false,
  
  // ========================================
  // 7. EXTENSIONS (what features are available)
  // ========================================
  extensions: [],
  modes: ['@ohif/mode-afya-chest-xray'],  // Only show Afya Vision mode

  // ========================================
  // 8. CHEST X-RAY HANGING PROTOCOL
  // ========================================
  customizationService: {
    // Overlay information on the image (top-left corner)
    cornerstoneOverlayTopLeft: {
      id: 'cornerstoneOverlayTopLeft',
      items: [
        {
          id: 'PatientNameOverlay',
          customizationType: 'ohif.overlayItem',
          label: '',
          color: 'yellow',
          contentF: ({ instance }) => {
            return instance?. PatientName?. Alphabetic || 'Unknown Patient';
          },
        },
        {
          id:  'PatientSex',
          customizationType:  'ohif.overlayItem',
          label: 'Sex:  ',
          color: 'yellow',
          contentF: ({ instance }) => instance?.PatientSex || '',
        },
        {
          id: 'PatientAge',
          customizationType: 'ohif.overlayItem',
          label: 'Age: ',
          color: 'yellow',
          contentF: ({ instance }) => instance?.PatientAge || '',
        },
      ],
    },
    
    // Overlay bottom-left (window/level info)
    cornerstoneOverlayBottomLeft: {
      id: 'cornerstoneOverlayBottomLeft',
      items: [
        {
          id: 'WindowLevel',
          customizationType:  'ohif.overlayItem',
          label: 'W/L: ',
          color: 'white',
          contentF: ({ instance, viewport }) => {
            const { windowWidth, windowCenter } = viewport || {};
            if (windowWidth && windowCenter) {
              return `${Math.round(windowWidth)} / ${Math.round(windowCenter)}`;
            }
            return '';
          },
        },
      ],
    },
  },

  // ========================================
  // 9. HOTKEYS (keyboard shortcuts)
  // ========================================
  hotkeys: [
    {
      commandName: 'setToolActive',
      commandOptions: { toolName: 'Zoom' },
      label: 'Zoom',
      keys: ['z'],
    },
    {
      commandName: 'setToolActive',
      commandOptions: { toolName: 'WindowLevel' },
      label: 'Window Level',
      keys:  ['w'],
    },
    {
      commandName: 'setToolActive',
      commandOptions: { toolName: 'Pan' },
      label: 'Pan',
      keys: ['p'],
    },
    {
      commandName: 'resetViewport',
      label: 'Reset Viewport',
      keys: ['space'],
    },
  ],
};