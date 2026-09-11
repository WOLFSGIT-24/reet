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

  const handleOpenJoinModal = (project = null) => {
    setSelectedProjectForJoin(project);
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
        <ProjectsGrid onOpenJoinModal={handleOpenJoinModal} />
        <ProcessSection />
        <ContactFormSection />
      </main>

      <Footer />

      {/* Join Group Modal */}
      <JoinGroupModal 
        isOpen={joinModalOpen} 
        onClose={handleCloseJoinModal} 
        defaultProject={selectedProjectForJoin} 
      />
    </div>
  );
}
