import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectsGrid from './components/ProjectsGrid';
import ProcessSection from './components/ProcessSection';
import ContactFormSection from './components/ContactFormSection';
import Footer from './components/Footer';
import JoinGroupModal from './components/JoinGroupModal';
import './App.css';

export default function App() {
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [selectedProjectForJoin, setSelectedProjectForJoin] = useState(null);
  const [modalMode, setModalMode] = useState('join');

  const handleOpenJoinModal = (project = null) => {
    setSelectedProjectForJoin(project);
    setModalMode('join');
    setJoinModalOpen(true);
  };

  const handleOpenBrochureModal = (project = null) => {
    setSelectedProjectForJoin(project);
    setModalMode('brochure');
    setJoinModalOpen(true);
  };

  const handleCloseJoinModal = () => {
    setJoinModalOpen(false);
    setSelectedProjectForJoin(null);
  };

  return (
    <div className="app-container">
      <Navbar onOpenJoinModal={handleOpenJoinModal} />
      
      <main>
        <Hero onOpenJoinModal={handleOpenJoinModal} />
        <ProjectsGrid 
          onOpenJoinModal={handleOpenJoinModal} 
          onOpenBrochureModal={handleOpenBrochureModal}
        />
        <ProcessSection />
        <ContactFormSection />
      </main>

      <Footer />

      {/* Group & Brochure Modal */}
      <JoinGroupModal 
        isOpen={joinModalOpen} 
        onClose={handleCloseJoinModal} 
        defaultProject={selectedProjectForJoin} 
        mode={modalMode}
      />
    </div>
  );
}
