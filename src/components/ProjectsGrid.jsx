import React from 'react';
import { PROJECTS_DATA } from '../data/projects';

export default function ProjectsGrid({ onOpenJoinModal, onOpenBrochureModal }) {
  return (
    <section className="section" id="projects">
      <div className="wrap">
        <div className="section-head">
          <h2>Group-buy projects, this week</h2>
          <p>
            Builder price is what any individual buyer pays today. Group price is what unlocks once REET closes a buying group of 4 or more for that project.
          </p>
        </div>

        <div className="grid">
          {PROJECTS_DATA.map((project) => (
            <div key={project.id} className="card">
              <div className="card-img-wrap">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="card-body">
                <div className="card-loc">{project.location}</div>
                <h3>{project.title}</h3>
                <div className="builder">{project.builder}</div>
                <div className="price-row">
                  <div className="price-col">
                    <span>Builder price</span>
                    <b>{project.builderPrice}</b>
                  </div>
                  <div className="price-col group">
                    <span>REET group price</span>
                    <b>{project.groupPrice}</b>
                  </div>
                </div>
                <div className="card-action-row">
                  <span className="save-pill">{project.minGroupPill}</span>
                  <div className="card-btns">
                    <button 
                      className="card-brochure-btn"
                      onClick={() => onOpenBrochureModal ? onOpenBrochureModal(project) : onOpenJoinModal(project)}
                    >
                      Download brochure
                    </button>
                    <button 
                      className="card-cta-btn"
                      onClick={() => onOpenJoinModal(project)}
                    >
                      Join group
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
