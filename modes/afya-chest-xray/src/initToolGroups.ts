/**
 * Initialize tool groups for chest X-ray viewing
 * Sets up basic 2D tools only - no 3D, MPR, or segmentation
 */
function initToolGroups(extensionManager, toolGroupService, commandsManager) {
  const utilityModule = extensionManager.getModuleEntry(
    '@ohif/extension-cornerstone.utilityModule.tools'
  );

  const { toolNames, Enums } = utilityModule.exports;

  const tools = {
    active: [
      {
        toolName: toolNames.WindowLevel,
        bindings: [{ mouseButton: Enums.MouseBindings.Primary }],
      },
      {
        toolName: toolNames.Pan,
        bindings: [{ mouseButton: Enums.MouseBindings.Auxiliary }],
      },
      {
        toolName: toolNames.Zoom,
        bindings: [{ mouseButton: Enums.MouseBindings.Secondary }],
      },
      { toolName: toolNames.StackScrollMouseWheel, bindings: [] },
    ],
    passive: [
      { toolName: toolNames.Length },
      { toolName: toolNames.Angle },
      { toolName: toolNames.ArrowAnnotate },
      { toolName: toolNames.Magnify },
      { toolName: toolNames.StackScroll },
    ],
    enabled: [{ toolName: toolNames.ImageOverlayViewer }],
  };

  // Create default tool group for chest X-ray
  toolGroupService.createToolGroupAndAddTools('default', tools);
}

export default initToolGroups;
