import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/reet-logo.png';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header>
        <div className="nav">
          <div className="logo">
            <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
              <img src={logoImg} alt="REET Spaces" />
            </a>
          </div>

          <nav className="navlinks">
            <a href="#projects">Group Deals</a>
            <a href="#process">How it works</a>
            <a href="#contact">Talk to us</a>
          </nav>

          <a 
            href="#contact-form"
            className="navcta"
          >
            Join a group
          </a>

          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-navlinks">
          <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Group Deals</a>
          <a href="#process" onClick={() => setMobileMenuOpen(false)}>How it works</a>
          <a href="#contact-form" onClick={() => setMobileMenuOpen(false)}>Talk to us</a>
        </div>
        <a 
          href="#contact-form"
          className="navcta" 
          style={{ width: '100%', textAlign: 'center', padding: '12px' }}
          onClick={() => setMobileMenuOpen(false)}
        >
          Join a group
        </a>
      </div>
    </>
  );
}
