import React from 'react';
import { AboutModal } from '@ohif/ui-next';
import detect from 'browser-detect';

function AboutModalDefault() {
  const { os, version, name } = detect();
  const browser = `${name[0].toUpperCase()}${name.substr(1)} ${version}`;
  const versionNumber = process.env.VERSION_NUMBER;
  const commitHash = process.env.COMMIT_HASH;

  const [main, beta] = versionNumber.split('-');

  return (
    <AboutModal className="w-[460px]">
      <AboutModal.ProductName>AfyaScan</AboutModal.ProductName>
      <AboutModal.ProductVersion>{main}</AboutModal.ProductVersion>
      {beta && <AboutModal.ProductBeta>Medical Imaging Platform</AboutModal.ProductBeta>}

      <AboutModal.Body>
        <AboutModal.DetailItem
          label="Description"
          value="AI-Powered Chest X-Ray Diagnostic Platform for Ethiopian Hospitals"
        />
        <AboutModal.DetailItem
          label="Version Build"
          value={commitHash.substring(0, 12)}
        />
        <AboutModal.DetailItem
          label="System Information"
          value={`${browser}, ${os}`}
        />
        <AboutModal.DetailItem
          label="Copyright"
          value="© 2026 AfyaScan. All rights reserved."
        />
        <div className="mt-4 pt-3 border-t border-white/10">
          <AboutModal.DetailItem
            label="Support & Contact"
            value="support@afyascan.com"
          />
        </div>
      </AboutModal.Body>
    </AboutModal>
  );
}

export default {
  'ohif.aboutModal': AboutModalDefault,
};
