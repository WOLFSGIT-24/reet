import React from 'react';
import { MessageSquare, Users } from 'lucide-react';

export default function FloatingCTA({ onOpenJoinModal }) {
  return (
    <div className="floating-cta">
      <a 
        href="https://wa.me/919182419241?text=Hi%20Sunny,%20I%20am%20exploring%20REET%20Spaces%20group%20buying%20deals%20in%20Hyderabad."
        target="_blank" 
        rel="noreferrer"
        className="whatsapp-float-btn"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare size={18} />
        <span>WhatsApp Desk</span>
      </a>

      <button 
        className="btn-primary"
        style={{ 
          boxShadow: '0 4px 20px rgba(214, 171, 92, 0.5)',
          borderRadius: 'var(--radius-full)',
          padding: '12px 20px',
          display: 'none'
        }}
        onClick={() => onOpenJoinModal(null)}
      >
        <Users size={16} />
        <span>Join Group</span>
      </button>
    </div>
  );
}
