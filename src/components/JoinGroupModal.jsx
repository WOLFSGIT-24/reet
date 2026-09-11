import React, { useState, useEffect } from 'react';
import { X, Download, Check } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';

export default function JoinGroupModal({ isOpen, onClose, defaultProject, mode = 'join' }) {
  const [projectId, setProjectId] = useState(defaultProject ? defaultProject.id : PROJECTS_DATA[0].id);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultProject) {
      setProjectId(defaultProject.id);
    }
  }, [defaultProject]);

  if (!isOpen) return null;

  const currentProject = PROJECTS_DATA.find(p => p.id === projectId) || PROJECTS_DATA[0];

  const handleDownloadBrochure = () => {
    const brochureText = `
=====================================================
REET SPACES | EXCLUSIVE PROJECT DOSSIER & GROUP TERMS
=====================================================

Project: ${currentProject.title}
Location: ${currentProject.location}
Configurations: ${currentProject.builder}
Standard Builder Rate: ${currentProject.builderPrice}
REET Locked Group Rate: ${currentProject.groupPrice}
Minimum Group Size: ${currentProject.minGroupPill}

100% Direct Developer Contract
Zero Buyer Brokerage
RERA Compliant & Bank Pre-Approved

Managing Partner Direct Desk:
Sunny Sahay (+91 91824 19241)
Email: info@reetspaces.com
Location: Hyderabad, Telangana

=====================================================
Thank you for requesting this brochure via REET Spaces.
=====================================================
`.trim();

    const blob = new Blob([brochureText], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${currentProject.title.toLowerCase().replace(/\s+/g, '-')}-brochure.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
    if (mode === 'brochure') {
      handleDownloadBrochure();
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    onClose();
  };

  const isBrochure = mode === 'brochure';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 10px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--teal-bg)',
              border: '1px solid var(--teal-border)',
              color: 'var(--teal-bright)',
              marginBottom: '16px'
            }}>
              <Check size={24} />
            </div>

            <h3 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>
              {isBrochure ? 'Brochure Ready & Downloaded' : 'Group Interest Registered'}
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.94rem', lineHeight: '1.5', marginBottom: '24px' }}>
              {isBrochure ? (
                <>Thank you, <b>{name}</b>. The official project overview for <b>{currentProject.title}</b> has been downloaded. Our team will also WhatsApp you high-res unit layout plans on <b>{phone}</b>.</>
              ) : (
                <>Thank you, <b>{name}</b>. Your interest for <b>{currentProject.title}</b> has been received. Sunny Sahay will reach out shortly with unit availability and group lock terms.</>
              )}
            </p>

            <div style={{ 
              background: 'rgba(244, 241, 234, 0.03)', 
              border: '1px solid var(--line)', 
              padding: '16px', 
              borderRadius: '2px',
              marginBottom: '24px',
              textAlign: 'left',
              fontSize: '0.88rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--muted)' }}>Project:</span>
                <b>{currentProject.title}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--muted)' }}>REET Group Price:</span>
                <b style={{ color: 'var(--brass-bright)' }}>{currentProject.groupPrice}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>Managing Partner:</span>
                <span>Sunny Sahay (+91 91824 19241)</span>
              </div>
            </div>

            {isBrochure && (
              <button 
                className="btn-primary" 
                style={{ width: '100%', marginBottom: '10px' }}
                onClick={handleDownloadBrochure}
              >
                <Download size={16} /> Re-download Brochure
              </button>
            )}

            <button className="btn-secondary" style={{ width: '100%' }} onClick={handleReset}>
              Close
            </button>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--brass-bright)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '6px' }}>
              {isBrochure ? 'REET Spaces | Official Dossier' : 'REET Spaces'}
            </div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
              {isBrochure ? 'Download Project Brochure' : 'Join a Buying Group'}
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '22px' }}>
              {isBrochure 
                ? `Get complete floor plans, master layout, and developer specifications for ${currentProject.title}.`
                : 'Connect with 4+ verified buyers to unlock developer channel partner pricing.'}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Selected Project</label>
                <select 
                  value={projectId} 
                  onChange={(e) => setProjectId(e.target.value)}
                >
                  {PROJECTS_DATA.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.location}) | Group Price: {p.groupPrice}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Mobile Number *</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="+91 XXXXX XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', padding: '13px 20px', fontSize: '0.94rem', marginTop: '10px' }}
              >
                {isBrochure ? 'Download Brochure' : 'Submit Interest'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

