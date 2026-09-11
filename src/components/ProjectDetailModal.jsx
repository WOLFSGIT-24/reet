import React from 'react';
import { X, MapPin, CheckCircle2, ArrowRight, Building, Calendar, ShieldCheck, Sparkles } from 'lucide-react';

export default function ProjectDetailModal({ project, isOpen, onClose, onJoinGroup }) {
  if (!isOpen || !project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Header Media */}
        <div style={{ position: 'relative', height: '220px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: '20px' }}>
          <img 
            src={project.image} 
            alt={project.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="card-badge" style={{ top: '12px', left: '12px' }}>
            <MapPin size={12} color="var(--brass-bright)" />
            <span>{project.location}</span>
          </div>
          <div className="card-tag" style={{ bottom: '12px', right: '12px' }}>
            <Sparkles size={11} style={{ display: 'inline', marginRight: '4px' }} />
            <span>{project.savingsText}</span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--brass-bright)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '4px' }}>
            {project.area} · {project.type}
          </div>
          <h3 style={{ fontSize: '1.7rem', marginBottom: '4px' }}>{project.title}</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '18px' }}>
            Developed by <b>{project.builder}</b>
          </p>

          {/* Quick Specs Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            background: 'rgba(244, 241, 234, 0.03)',
            border: '1px solid var(--line)',
            padding: '14px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '20px'
          }}>
            <div>
              <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--muted)' }}>Configuration</span>
              <b style={{ fontSize: '0.9rem', color: 'var(--paper)' }}>{project.config}</b>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--muted)' }}>Unit Size</span>
              <b style={{ fontSize: '0.9rem', color: 'var(--paper)' }}>{project.size}</b>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--muted)' }}>Possession</span>
              <b style={{ fontSize: '0.9rem', color: 'var(--brass-bright)' }}>{project.possession}</b>
            </div>
          </div>

          {/* Price Breakdown */}
          <div style={{
            background: 'rgba(184, 147, 74, 0.06)',
            border: '1px solid rgba(184, 147, 74, 0.35)',
            padding: '16px 18px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '22px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--muted)' }}>Standard Retail Builder Price:</span>
              <span>{project.builderPrice}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--brass-bright)', fontWeight: '500' }}>REET Group Buying Price:</span>
              <b style={{ color: 'var(--brass-bright)', fontSize: '1.2rem' }}>{project.groupPrice}</b>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--line)', fontSize: '0.82rem', color: '#72dbd0' }}>
              <span>Group Requirement: Minimum 4 buyers</span>
              <span><b>{project.status}</b></span>
            </div>
          </div>

          {/* Project Highlights */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '10px', color: 'var(--paper)' }}>Project Highlights & Amenities</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {project.highlights.map((h, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: 'var(--muted)' }}>
                  <CheckCircle2 size={16} color="var(--brass-bright)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              className="btn-primary" 
              style={{ flex: 1, padding: '13px' }}
              onClick={() => {
                onClose();
                onJoinGroup(project);
              }}
            >
              <span>Join Group for {project.title}</span>
              <ArrowRight size={16} />
            </button>
            <a 
              href="tel:+919182419241"
              className="btn-secondary"
              style={{ padding: '12px 18px' }}
            >
              Call RM
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
