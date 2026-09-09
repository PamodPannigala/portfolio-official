import React from 'react';
import { CampusOperationsVisual } from './visuals/CampusOperationsVisual';
import { F1DataPipelineVisual } from './visuals/F1DataPipelineVisual';
import { ServiceAnalysisVisual } from './visuals/ServiceAnalysisVisual';

interface ProjectVisualStageProps {
  activeProjectId: string;
  isCrossFading?: boolean;
  className?: string;
}

export const ProjectVisualStage: React.FC<ProjectVisualStageProps> = ({
  activeProjectId,
  isCrossFading = false,
  className = '',
}) => {
  const renderVisual = () => {
    switch (activeProjectId) {
      case '01':
        return <CampusOperationsVisual isCrossFading={isCrossFading} />;
      case '02':
        return <F1DataPipelineVisual isCrossFading={isCrossFading} />;
      case '03':
        return <ServiceAnalysisVisual isCrossFading={isCrossFading} />;
      default:
        return <CampusOperationsVisual isCrossFading={isCrossFading} />;
    }
  };

  return (
    <div
      className={`relative w-full h-full min-h-[360px] sm:min-h-[420px] lg:min-h-[480px] xl:min-h-[520px] transition-all duration-300 ease-out ${className}`}
    >
      {/* Visual Render Switcher with Controlled Crossfade */}
      <div
        className={`w-full h-full transition-all duration-300 ease-out ${
          isCrossFading ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
        }`}
      >
        {renderVisual()}
      </div>
    </div>
  );
};
