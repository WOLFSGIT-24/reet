import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectsGrid from './components/ProjectsGrid';
import ProcessSection from './components/ProcessSection';
import ContactFormSection from './components/ContactFormSection';
import Footer from './components/Footer';
import BrochureModal from './components/BrochureModal';
import './App.css';

export default function App() {
  const [selectedAction, setSelectedAction] = useState(null);
  const [brochureModalProject, setBrochureModalProject] = useState(null);

  const handleSelectProjectAction = (project, actionType) => {
    if (actionType === 'brochure') {
      setBrochureModalProject(project);
    } else {
      setSelectedAction({ project, type: actionType, timestamp: Date.now() });
      const el = document.getElementById('contact-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      
      <main>
        <Hero />
        <ProjectsGrid onSelectProjectAction={handleSelectProjectAction} />
        <ProcessSection />
        <ContactFormSection selectedAction={selectedAction} />
      </main>

      <Footer />

      <BrochureModal 
        isOpen={Boolean(brochureModalProject)}
        project={brochureModalProject}
        onClose={() => setBrochureModalProject(null)}
      />
    </div>
  );
}
