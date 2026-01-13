import update from 'immutability-helper';
import { ToolbarService, utils } from '@ohif/core';
import initToolGroups from './initToolGroups';
import toolbarButtons from './toolbarButtons';
import { id } from './id';

const { TOOLBAR_SECTIONS } = ToolbarService;
const { structuredCloneWithFunctions } = utils;

/**
 * Afya Vision Chest X-Ray Mode
 * 
 * Simplified mode designed for chest radiography in resource-limited settings.
 * Removes complex 3D, MPR, segmentation, and other advanced features.
 * Focuses on essential 2D viewing and measurement tools.
 */

// Extensions this mode depends on
export const extensionDependencies = {
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
};

export const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  thumbnailList: '@ohif/extension-default.panelModule.seriesList',
  hangingProtocol: '@ohif/extension-default.hangingProtocolModule.default',
};

export const cornerstone = {
  measurements: '@ohif/extension-cornerstone.panelModule.panelMeasurement',
  viewport: '@ohif/extension-cornerstone.viewportModule.cornerstone',
};

/**
 * Validate mode - accept all modalities for simplicity
 */
export function isValidMode({ modalities }) {
  return {
    valid: true,
    description: 'Afya Vision Chest X-Ray Mode'
  };
}

export function onModeEnter({
  servicesManager,
  extensionManager,
  commandsManager,
}: withAppTypes) {
  const { toolbarService, toolGroupService, measurementService } = servicesManager.services;

  measurementService.clearMeasurements();

  // Init tool groups
  initToolGroups(extensionManager, toolGroupService, commandsManager);

  // Register toolbar
  toolbarService.register(this.toolbarButtons);

  // Update sections
  for (const [key, section] of Object.entries(this.toolbarSections)) {
    toolbarService.updateSection(key, section);
  }
}

export function onModeExit({ servicesManager }: withAppTypes) {
  const {
    toolGroupService,
    syncGroupService,
    cornerstoneViewportService,
    uiDialogService,
    uiModalService,
  } = servicesManager.services;

  uiDialogService.hideAll();
  uiModalService.hide();
  toolGroupService.destroy();
  syncGroupService.destroy();
  cornerstoneViewportService.destroy();
}

export const toolbarSections = {
  [TOOLBAR_SECTIONS.primary]: [
    'MeasurementTools',
    'Zoom',
    'WindowLevel',
    'Pan',
    'invert',
    'rotate-right',
    'flipHorizontal',
    'Reset',
    'Cine',
    'Layout',
  ],
  MeasurementTools: ['Length', 'Angle', 'ArrowAnnotate'],
};

export const basicLayout = {
  id: ohif.layout,
  props: {
    leftPanels: [ohif.thumbnailList],
    rightPanels: [cornerstone.measurements],
    rightPanelClosed: false,
    viewports: [
      {
        namespace: cornerstone.viewport,
        displaySetsToDisplay: [ohif.sopClassHandler],
      },
    ],
  },
};

export const basicRoute = {
  path: 'afya-chest-xray',
  layoutTemplate: ({ location, servicesManager }) => {
    return structuredCloneWithFunctions(basicLayout);
  },
};

export const modeInstance = {
  id,
  routeName: 'afya-chest-xray',
  displayName: 'Afya Vision - Chest X-Ray',
  toolbarSections,
  onModeEnter,
  onModeExit,
  validationTags: {
    study: [],
    series: [],
  },
  isValidMode,
  routes: [basicRoute],
  extensions: extensionDependencies,
  hangingProtocol: 'default',
  sopClassHandlers: [ohif.sopClassHandler],
  toolbarButtons,
};

export function modeFactory({ modeConfiguration }) {
  let instance = modeInstance;
  if (modeConfiguration) {
    instance = update(instance, modeConfiguration);
  }
  return instance;
}

export const mode = {
  id,
  modeFactory,
  extensionDependencies,
};

export default mode;
export { initToolGroups, toolbarButtons };

