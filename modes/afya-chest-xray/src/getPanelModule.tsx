import React from 'react';
import { AIFindingsPanel, StudyInfoPanel } from './panels';
import i18n from 'i18next';

function getPanelModule({ servicesManager }) {
  return [
    {
      name: 'aiFindings',
      iconName: 'icon-brain',
      iconLabel: 'AI',
      label: i18n.t('AI Findings'),
      component: (props) => <AIFindingsPanel {...props} servicesManager={servicesManager} />,
    },
    {
      name: 'studyInfo',
      iconName: 'icon-info',
      iconLabel: 'Info',
      label: i18n.t('Study Info'),
      component: (props) => <StudyInfoPanel {...props} servicesManager={servicesManager} />,
    },
  ];
}

export default getPanelModule;
