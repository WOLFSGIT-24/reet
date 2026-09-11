import React, { useState } from 'react';
import { X } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';

export default function JoinGroupModal({ isOpen, onClose, defaultProject }) {
  const [projectId, setProjectId] = useState(defaultProject ? defaultProject.id : PROJECTS_DATA[0].id);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentProject = PROJECTS_DATA.find(p => p.id === projectId) || PROJECTS_DATA[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 10px' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>Group Interest Registered</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.94rem', lineHeight: '1.5', marginBottom: '24px' }}>
              Thank you, <b>{name}</b>. Your interest for <b>{currentProject.title}</b> has been received. Sunny Sahay will reach out shortly with unit availability and group lock terms.
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

            <button className="btn-secondary" style={{ width: '100%' }} onClick={handleReset}>
              Close
            </button>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--brass-bright)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '6px' }}>
              REET Spaces
            </div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>Join a Buying Group</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '22px' }}>
              Connect with 4+ verified buyers to unlock developer channel partner pricing.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Select Project</label>
                <select 
                  value={projectId} 
                  onChange={(e) => setProjectId(e.target.value)}
                >
                  {PROJECTS_DATA.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.location}) — Group Price: {p.groupPrice}
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
                  placeholder="+91 98765 43210"
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
                Submit Interest
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
