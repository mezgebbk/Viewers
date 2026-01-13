import React, { useState } from 'react';
import { Typography, Icon, Button } from '@ohif/ui';

interface Finding {
  id: string;
  name: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'normal';
  confidence: number;
  location?: string;
}

const mockFindings: Finding[] = [
  { id: '1', name: 'Cardiomegaly', severity: 'medium', confidence: 0.78, location: 'Cardiac silhouette' },
  { id: '2', name: 'Pleural Effusion', severity: 'high', confidence: 0.85, location: 'Left costophrenic angle' },
  { id: '3', name: 'Consolidation', severity: 'high', confidence: 0.72, location: 'Right lower lobe' },
  { id: '4', name: 'Normal', severity: 'normal', confidence: 0.92, location: 'Overall assessment' },
];

const severityColors = {
  critical: 'text-red-500',
  high: 'text-orange-500',
  medium: 'text-yellow-500',
  low: 'text-blue-400',
  normal: 'text-green-500',
};

const severityBgColors = {
  critical: 'bg-red-500/10 border-red-500/30',
  high: 'bg-orange-500/10 border-orange-500/30',
  medium: 'bg-yellow-500/10 border-yellow-500/30',
  low: 'bg-blue-400/10 border-blue-400/30',
  normal: 'bg-green-500/10 border-green-500/30',
};

export function AIFindingsPanel() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showFindings, setShowFindings] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowFindings(true);
    }, 2000);
  };

  return (
    <div className="flex h-full flex-col bg-[#1a1a1a] p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-[#424242] pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/20">
            <Icon name="icon-brain" className="text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-white">AI Analysis</h2>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
          <span className="text-xs text-primary">Afya AI v2.1</span>
        </div>
      </div>

      {/* Analyze Button */}
      {!showFindings && (
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="mb-6 text-center">
            <Icon name="icon-chest" className="text-6xl text-gray-500 mb-4" />
            <p className="text-gray-400 text-sm mb-6">
              No analysis performed yet. Click below to analyze this chest X-ray with AI.
            </p>
          </div>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Icon name="icon-play" />
                <span>Run AI Analysis</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Findings List */}
      {showFindings && (
        <div className="flex-1 space-y-3 overflow-y-auto">
          {/* Summary Card */}
          <div className="rounded-lg border border-[#424242] bg-[#2a2a2a] p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Summary</h3>
              <span className="text-xs text-gray-400">4 findings detected</span>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 rounded bg-[#333333] p-2 text-center">
                <div className="text-xs text-gray-400">Critical</div>
                <div className="text-lg font-bold text-red-500">0</div>
              </div>
              <div className="flex-1 rounded bg-[#333333] p-2 text-center">
                <div className="text-xs text-gray-400">High</div>
                <div className="text-lg font-bold text-orange-500">2</div>
              </div>
              <div className="flex-1 rounded bg-[#333333] p-2 text-center">
                <div className="text-xs text-gray-400">Medium</div>
                <div className="text-lg font-bold text-yellow-500">1</div>
              </div>
            </div>
          </div>

          {/* Individual Findings */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white">Detected Findings</h3>
            {mockFindings.map((finding) => (
              <div
                key={finding.id}
                className={`rounded-lg border p-3 transition hover:bg-[#2a2a2a] ${severityBgColors[finding.severity]}`}
              >
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-semibold ${severityColors[finding.severity]}`}>
                        {finding.name}
                      </h4>
                      {finding.severity !== 'normal' && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${severityColors[finding.severity]}`}
                        >
                          {finding.severity.toUpperCase()}
                        </span>
                      )}
                    </div>
                    {finding.location && (
                      <p className="mt-1 text-xs text-gray-400">{finding.location}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#333333]">
                      <div
                        className={`h-full ${severityColors[finding.severity].replace('text-', 'bg-')}`}
                        style={{ width: `${finding.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {(finding.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-4 space-y-2 border-t border-[#424242] pt-4">
            <button className="w-full rounded-lg border border-[#424242] bg-[#2a2a2a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#333333]">
              Generate Report
            </button>
            <button
              onClick={handleAnalyze}
              className="w-full rounded-lg border border-[#424242] bg-[#2a2a2a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#333333]"
            >
              Re-analyze
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIFindingsPanel;
