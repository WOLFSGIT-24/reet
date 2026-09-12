import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS_DATA } from '../data/projects';
import { submitLead } from '../utils/submitLead';

export default function ContactFormSection({ selectedAction }) {
  const [selectedProjectId, setSelectedProjectId] = useState(PROJECTS_DATA[0].id);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (selectedAction && selectedAction.project) {
      const { project, type } = selectedAction;
      setSubmitted(false);
      setSubmitting(false);
      setSelectedProjectId(project.id);
      if (type === 'brochure') {
        setMessage(`Requesting brochure & floor plans for ${project.title} (${project.location}).`);
      } else {
        setMessage(`Interested in joining group deal for ${project.title} (${project.location}).`);
      }
      setTimeout(() => {
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }, 150);
    }
  }, [selectedAction]);

  const handleNameChange = (e) => {
    // Only alphabets, spaces, apostrophes, and dots
    const val = e.target.value.replace(/[^a-zA-Z\s'.]/g, '');
    setName(val);
  };

  const handlePhoneChange = (e) => {
    // Only numeric digits, max 10 characters
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
  };

  const handleProjectChange = (e) => {
    const pid = e.target.value;
    setSelectedProjectId(pid);
    const proj = PROJECTS_DATA.find((p) => p.id === pid);
    if (proj) {
      setMessage(`Interested in joining group deal for ${proj.title} (${proj.location}).`);
    } else {
      setMessage('General inquiry for Hyderabad luxury group-buy portfolio.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (cleanName.length < 2) {
      alert('Please enter a valid name with letters only.');
      return;
    }
    if (cleanPhone.length !== 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Extract chosen project title
    const chosenProject = PROJECTS_DATA.find((p) => p.id === selectedProjectId);
    const projectTitle = chosenProject ? chosenProject.title : (selectedAction?.project?.title ?? 'General Inquiry');

    // Instantly transition to registered confirmation
    setSubmitted(true);
    setSubmitting(false);

    // Concurrently dispatch to CRM & Webhook
    submitLead({
      name:         cleanName,
      phone:        cleanPhone,
      email:        email.trim(),
      message:      message.trim(),
      projectTitle,
      source:       'ContactForm',
    }).catch((err) => console.error('Contact form submission error:', err));
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmitting(false);
    setSubmitError(false);
    setSelectedProjectId(PROJECTS_DATA[0].id);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  const currentChosenProject = PROJECTS_DATA.find((p) => p.id === selectedProjectId);

  return (
    <section className="section" id="contact-form">
      <div className="wrap">
        <div className="contact-section-grid">
          {/* Left Column: Context & Contact info */}
          <div className="contact-info-col">
            <div className="contact-tag">Direct Facilitation Desk</div>
            <h2>Join a group or discuss your shortlist</h2>
            <p className="contact-lede">
              Tell us which project you are exploring. We will walk you through available towers, current group occupancy, and lock in your institutional developer rate.
            </p>

          </div>

          {/* Right Column: Form */}
          <div className="contact-form-card">
            {submitted ? (
              <div className="form-success-box">
                <div className="success-badge">Request Registered</div>
                <h3>Thank you, {name}</h3>
                <p>
                  Your inquiry has been received for <b>{currentChosenProject ? currentChosenProject.title : 'REET Spaces'}</b>. Sunny Sahay will reach out directly on <b>+91 {phone}</b> to discuss shortlisted projects and active group lock terms.
                </p>

                <div className="success-summary">
                  <div><span>Selected Project:</span> <b className="gold">{currentChosenProject ? currentChosenProject.title : 'General Portfolio'}</b></div>
                  <div><span>Direct Desk:</span> <b className="gold">Sunny Sahay (+91 91824 19241)</b></div>
                </div>

                <button className="navcta" style={{ width: '100%' }} onClick={handleReset}>
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="inquiry-form">
                <h3 style={{ fontSize: '1.4rem', marginBottom: '6px' }}>Group Enrollment Form</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.86rem', marginBottom: '22px' }}>
                  No upfront commitments. 100% direct developer billing and zero buyer fees.
                </p>

                <div className="form-field">
                  <label>Selected Project *</label>
                  <select 
                    value={selectedProjectId} 
                    onChange={handleProjectChange}
                    style={{ cursor: 'pointer' }}
                  >
                    {PROJECTS_DATA.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} ({p.location}) — REET Price: {p.groupPrice}
                      </option>
                    ))}
                    <option value="general">Other / General Portfolio Consultation</option>
                  </select>
                </div>

                <div className="form-row-2">
                  <div className="form-field">
                    <label>Full Name *</label>
                    <input 
                      ref={nameInputRef}
                      type="text" 
                      required 
                      placeholder="Your Name (letters only)"
                      value={name}
                      onChange={handleNameChange}
                      pattern="^[a-zA-Z\s'.]{2,50}$"
                      title="Please enter your name using letters only (minimum 2 characters)"
                    />
                  </div>

                  <div className="form-field">
                    <label>Mobile Number *</label>
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
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                    title="Please enter a valid email address (e.g. name@example.com)"
                  />
                </div>

                <div className="form-field">
                  <label>Specific Unit / Floor / Tower Requirement (Optional)</label>
                  <textarea 
                    rows={2}
                    placeholder="e.g. Higher floor east-facing 4 BHK unit, looking to purchase in next 30 days."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button 
                  type="submit" 
                  className="form-submit-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting…' : 'Submit & Lock Group Tier'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
