import React, { useState } from 'react';
import { FAQ_DATA } from '../data/projects';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="section-head" style={{ justifyContent: 'center', textAlign: 'center', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--brass-bright)', fontSize: '0.86rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
              <HelpCircle size={15} />
              <span>Clarity & Security</span>
            </div>
            <h2>Frequently Asked Questions</h2>
            <p style={{ margin: '8px auto 0', maxWidth: '560px' }}>
              Everything you need to know about joining a REET buying group, legal registration, and developer safeguards.
            </p>
          </div>
        </div>

        <div className="faq-list">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="faq-item">
                <button 
                  className="faq-question"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  {isOpen ? (
                    <ChevronUp size={18} color="var(--brass-bright)" />
                  ) : (
                    <ChevronDown size={18} color="var(--muted)" />
                  )}
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
