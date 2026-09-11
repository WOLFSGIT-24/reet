import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS_DATA } from '../data/projects';

export default function ContactFormSection({ selectedAction }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (selectedAction && selectedAction.project) {
      const { project, type } = selectedAction;
      if (type === 'brochure') {
        setMessage(`Requesting brochure & floor plans for ${project.title} (${project.location}).`);
      } else {
        setMessage(`Interested in joining group deal for ${project.title} (${project.location}).`);
      }
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }
  }, [selectedAction]);

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
    setMessage('');
  };

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
                  Your inquiry has been received. Sunny Sahay will reach out directly on <b>{phone}</b> to discuss shortlisted projects and active group lock terms.
                </p>

                <div className="success-summary">
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

                <div className="form-row-2">
                  <div className="form-field">
                    <label>Full Name *</label>
                    <input 
                      ref={nameInputRef}
                      type="text" 
                      required 
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-field">
                    <label>Mobile Number *</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                >
                  Submit & Lock Group Tier
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
