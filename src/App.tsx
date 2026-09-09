import React from 'react';
import { RouteProvider, useAppRoute } from './context/RouteContext';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { AboutSection } from './components/about/AboutSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { TechStackSection } from './components/techstack/TechStackSection';
import { ProjectsArchivePage } from './components/projects/archive/ProjectsArchivePage';

const AppContent: React.FC = () => {
  const { isProjectsArchive } = useAppRoute();

  return (
    <div className="min-h-screen bg-deep-space text-text-primary selection:bg-accent-cyan/30 selection:text-white relative overflow-x-hidden w-full">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className="overflow-x-hidden w-full transition-opacity duration-200 ease-out">
        {isProjectsArchive ? (
          <ProjectsArchivePage />
        ) : (
          <>
            <Hero />
            <AboutSection />
            <ProjectsSection />
            <ExperienceSection />
            <TechStackSection />
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
