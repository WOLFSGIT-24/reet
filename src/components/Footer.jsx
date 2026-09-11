import React from 'react';
import logoImg from '../assets/reet-logo.webp';

export default function Footer() {
  return (
    <footer id="contact">
      <div className="wrap">
        <div className="foot-grid">
          <div className="fcol">
            <div className="logo" style={{ marginBottom: '14px' }}>
              <img src={logoImg} alt="REET Spaces" />
            </div>
            <span>Hyderabad, Telangana</span>
          </div>

          <div className="fcol">
            <span><a href="#projects">Group Deals</a></span>
            <span><a href="#process">How it works</a></span>
            <span><a href="#contact">Talk to us</a></span>
          </div>

          <div className="fcol">
            <span><a href="mailto:info@reetspaces.com">info@reetspaces.com</a></span>
            <span>Sunny Sahay, Managing Partner</span>
            <span><a href="tel:+919182419241">+91 91824 19241</a></span>
          </div>
        </div>

        <p className="fine">
          Prices and group terms shown are indicative and drawn from developer price lists current as of Sept 2026; they are subject to unit availability and change without notice. REET Spaces acts as a group-buying facilitator between buyers and developers. Every purchase is executed directly between the buyer and the respective developer. RERA registration details for each project available on request.
        </p>
      </div>
    </footer>
  );
}
