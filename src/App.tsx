import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-deep-space text-text-primary selection:bg-accent-cyan/30 selection:text-white relative overflow-x-hidden w-full">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className="overflow-x-hidden w-full">
        <Hero />
      </main>
    </div>
  );
};

export default App;
