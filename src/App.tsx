import React from 'react';
import { RouteProvider, useAppRoute } from './context/RouteContext';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { AboutSection } from './components/about/AboutSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { TechStackSection } from './components/techstack/TechStackSection';
import { EducationSection } from './components/education/EducationSection';
import { ProjectsArchivePage } from './components/projects/archive/ProjectsArchivePage';
import { CertificationsArchivePage } from './components/education/archive/CertificationsArchivePage';

const AppContent: React.FC = () => {
  const { isProjectsArchive, isCertificationsArchive } = useAppRoute();

  return (
    <div className="min-h-screen bg-deep-space text-text-primary selection:bg-accent-cyan/30 selection:text-white relative overflow-x-hidden w-full">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className="overflow-x-hidden w-full transition-opacity duration-200 ease-out">
        {isProjectsArchive ? (
          <ProjectsArchivePage />
        ) : isCertificationsArchive ? (
          <CertificationsArchivePage />
        ) : (
          <>
            <Hero />
            <AboutSection />
            <ProjectsSection />
            <ExperienceSection />
            <TechStackSection />
            <EducationSection />
          </>
        )}
      </main>
    </div>
  );
};


export const App: React.FC = () => {
  return (
    <RouteProvider>
      <AppContent />
    </RouteProvider>
  );
};

export default App;
