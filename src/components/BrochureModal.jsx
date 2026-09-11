import React, { useState, useEffect, useRef } from 'react';
import { X, Download, Check, FileText } from 'lucide-react';
import { submitLead } from '../utils/submitLead';

export default function BrochureModal({ isOpen, onClose, project }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setSubmitting(false);
      setTimeout(() => {
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  const handleNameChange = (e) => {
    // Only letters and spaces
    const val = e.target.value.replace(/[^a-zA-Z\s'.]/g, '');
    setName(val);
  };

  const handlePhoneChange = (e) => {
    // Only numbers, max 10 digits
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
  };

  const triggerDownload = () => {
    if (!project.brochurePdf) return;

    if (project.brochurePdf.startsWith('http')) {
      window.open(project.brochurePdf, '_blank', 'noopener,noreferrer');
    } else {
      const link = document.createElement('a');
      link.href = project.brochurePdf;
      link.setAttribute('download', `${project.title} Brochure.pdf`);
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = email.trim();

    if (cleanName.length < 2) {
      alert('Please enter a valid name using letters only.');
      return;
    }
    if (cleanPhone.length !== 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!cleanEmail) {
      alert('Please enter your email address.');
      return;
    }

    // Instantly trigger brochure download / open link
    triggerDownload();

    // Instantly switch to success screen
    setSubmitted(true);
    setSubmitting(false);

    // Fire webhook & CRM submission in background
    submitLead({
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      message: `Requested official brochure for ${project.title} (${project.location})`,
      projectTitle: project.title,
      source: 'BrochureDownloadPopup',
    }).catch((err) => console.error('Lead submission error:', err));
  };

  const handleClose = () => {
    setName('');
    setPhone('');
    setEmail('');
    setSubmitted(false);
    setSubmitting(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '16px 8px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'var(--teal-bg)',
              border: '1px solid var(--teal-border)',
              color: 'var(--teal-bright)',
              marginBottom: '16px'
            }}>
              <Check size={28} />
            </div>

            <h3 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
              Brochure Unlocked!
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.94rem', lineHeight: '1.55', marginBottom: '20px' }}>
              Thank you, <b>{name}</b>. Click the button below to view the official brochure for <b>{project.title}</b>. Our desk will also WhatsApp you full unit floor plans on <b>+91 {phone}</b>.
            </p>

            <div style={{
              background: 'rgba(244, 241, 234, 0.03)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              marginBottom: '20px',
              textAlign: 'left',
              fontSize: '0.88rem'
            }}>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ color: 'var(--muted)' }}>Project: </span>
                <b className="gold">{project.title}</b>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ color: 'var(--muted)' }}>REET Group Price: </span>
                <b>{project.groupPrice}</b>
              </div>
              <div>
                <span style={{ color: 'var(--muted)' }}>Direct Facilitation: </span>
                <span>Sunny Sahay (+91 91824 19241)</span>
              </div>
            </div>

            <a 
              href={project.brochurePdf}
              {...(!project.brochurePdf?.startsWith('http') ? { download: `${project.title} Brochure.pdf` } : {})}
              target="_blank"
              rel="noopener noreferrer"
              className="card-cta-btn" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px', 
                width: '100%', 
                marginBottom: '10px', 
                padding: '12px', 
                fontSize: '0.94rem',
                textDecoration: 'none'
              }}
            >
              <Download size={16} />
              Open / Download Brochure Now
            </a>

            <button 
              type="button"
              className="card-brochure-btn" 
              style={{ width: '100%', padding: '10px' }} 
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span className="save-pill" style={{ fontSize: '0.75rem', padding: '3px 10px' }}>
                Official Dossier
              </span>
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '6px', lineHeight: '1.25' }}>
              Download {project.title} Brochure
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '22px', lineHeight: '1.5' }}>
              Enter your details below to instantly unlock and download the complete project dossier, master plan & floor layouts.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '6px', fontWeight: 500 }}>
                  Full Name *
                </label>
                <input 
                  ref={nameInputRef}
                  type="text" 
                  required 
                  placeholder="Your Name (letters only)"
                  value={name}
                  onChange={handleNameChange}
                  pattern="^[a-zA-Z\s'.]{2,50}$"
                  title="Please enter letters only (minimum 2 characters)"
                  style={{
                    width: '100%',
                    background: 'var(--ink)',
                    border: '1px solid var(--line-strong)',
                    color: 'var(--paper)',
                    padding: '11px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '15px',
                    outline: 'none'
                  }}
                />
              </div>

              <div className="form-field">
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '6px', fontWeight: 500 }}>
                  Mobile Number *
                </label>
                <input 
                  type="tel" 
                  inputMode="numeric"
                  required 
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  pattern="^[0-9]{10}$"
                  title="Please enter exactly 10 digits"
                  value={phone}
                  onChange={handlePhoneChange}
                  style={{
                    width: '100%',
                    background: 'var(--ink)',
                    border: '1px solid var(--line-strong)',
                    color: 'var(--paper)',
                    padding: '11px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '15px',
                    outline: 'none'
                  }}
                />
              </div>

              <div className="form-field" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '6px', fontWeight: 500 }}>
                  Email Address *
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                  title="Please enter a valid email address"
                  style={{
                    width: '100%',
                    background: 'var(--ink)',
                    border: '1px solid var(--line-strong)',
                    color: 'var(--paper)',
                    padding: '11px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '15px',
                    outline: 'none'
                  }}
                />
              </div>

              <button 
                type="submit" 
                className="form-submit-btn" 
                style={{ width: '100%', padding: '13px 20px', fontSize: '0.94rem' }}
                disabled={submitting}
              >
                {submitting ? 'Submitting & Unlocking...' : 'Download Brochure'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
