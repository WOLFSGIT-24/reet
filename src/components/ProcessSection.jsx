import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/projects';

export default function ProcessSection() {
  return (
    <section className="section" id="process">
      <div className="wrap">
        <div className="section-head">
          <h2>How a REET group closes</h2>
          <p>
            Same shortlist-to-savings flow buyers already trust from group-buying platforms — run by REET's channel-partner desk instead of a marketplace.
          </p>
        </div>

        <div className="process-grid">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div key={step.step} className="step">
              <div className="n">{step.step}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
