import React from 'react';
import { ProjectItem } from '@/data/portfolioData';
import { CampusArchitecturePreview } from './CampusArchitecturePreview';
import { F1PipelinePreview } from './F1PipelinePreview';
import { ServiceRegressionPreview } from './ServiceRegressionPreview';
import { GenericProjectPreview } from './GenericProjectPreview';

export interface ProjectPreviewProps {
  project: ProjectItem;
}

export const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project }) => {
  if (project.visualType === 'campus' || project.id === '01') {
    return <CampusArchitecturePreview />;
  }
  if (project.visualType === 'f1' || project.id === '02') {
    return <F1PipelinePreview />;
  }
  if (project.visualType === 'service' || project.id === '03') {
    return <ServiceRegressionPreview />;
  }
  return <GenericProjectPreview title={project.title} category={project.category} />;
};
