import React from 'react';

export function StudyInfoPanel({ servicesManager }) {
  const { displaySetService, viewportGridService } = servicesManager.services;
  
  // Get active viewport
  const activeViewportId = viewportGridService.getActiveViewportId();
  const viewportInfo = viewportGridService.getState().viewports.get(activeViewportId);
  
  // Get display set info
  const displaySetInstanceUIDs = viewportInfo?.displaySetInstanceUIDs || [];
  const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUIDs[0]);

  const studyInfo = displaySet?.StudyInstanceUID ? {
    patientName: displaySet.PatientName || 'N/A',
    patientId: displaySet.PatientID || 'N/A',
    patientAge: displaySet.PatientAge || 'N/A',
    patientSex: displaySet.PatientSex || 'N/A',
    studyDate: displaySet.StudyDate || 'N/A',
    studyTime: displaySet.StudyTime || 'N/A',
    studyDescription: displaySet.StudyDescription || 'N/A',
    modality: displaySet.Modality || 'N/A',
    seriesNumber: displaySet.SeriesNumber || 'N/A',
    instanceNumber: displaySet.InstanceNumber || 'N/A',
    manufacturer: displaySet.Manufacturer || 'N/A',
    stationName: displaySet.StationName || 'N/A',
  } : null;

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between border-b border-[#333333] py-2">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );

  return (
    <div className="flex h-full flex-col bg-[#1a1a1a] p-4">
      <div className="mb-4 border-b border-[#424242] pb-3">
        <h2 className="text-lg font-semibold text-white">Study Information</h2>
      </div>

      {studyInfo ? (
        <div className="flex-1 space-y-4 overflow-y-auto">
          {/* Patient Information */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-primary">Patient</h3>
            <div className="rounded-lg border border-[#333333] bg-[#2a2a2a] p-3">
              <InfoRow label="Name" value={studyInfo.patientName} />
              <InfoRow label="ID" value={studyInfo.patientId} />
              <InfoRow label="Age" value={studyInfo.patientAge} />
              <InfoRow label="Sex" value={studyInfo.patientSex} />
            </div>
          </div>

          {/* Study Information */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-primary">Study</h3>
            <div className="rounded-lg border border-[#333333] bg-[#2a2a2a] p-3">
              <InfoRow label="Date" value={studyInfo.studyDate} />
              <InfoRow label="Time" value={studyInfo.studyTime} />
              <InfoRow label="Description" value={studyInfo.studyDescription} />
            </div>
          </div>

          {/* Series Information */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-primary">Series</h3>
            <div className="rounded-lg border border-[#333333] bg-[#2a2a2a] p-3">
              <InfoRow label="Modality" value={studyInfo.modality} />
              <InfoRow label="Series #" value={studyInfo.seriesNumber} />
              <InfoRow label="Instance #" value={studyInfo.instanceNumber} />
            </div>
          </div>

          {/* Equipment Information */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-primary">Equipment</h3>
            <div className="rounded-lg border border-[#333333] bg-[#2a2a2a] p-3">
              <InfoRow label="Manufacturer" value={studyInfo.manufacturer} />
              <InfoRow label="Station" value={studyInfo.stationName} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-gray-500">No study loaded</p>
        </div>
      )}
    </div>
  );
}

export default StudyInfoPanel;
