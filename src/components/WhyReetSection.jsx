import React from 'react';
import { TRUST_ADVANTAGES } from '../data/projects';
import { TrendingDown, ShieldCheck, BadgePercent, UserCheck, Check, X } from 'lucide-react';

const iconMap = {
  TrendingDown: TrendingDown,
  ShieldCheck: ShieldCheck,
  BadgePercent: BadgePercent,
  UserCheck: UserCheck
};

export default function WhyReetSection() {
  return (
    <section className="section" id="why-reet" style={{ background: 'var(--ink-surface)' }}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2>Why buy through REET Spaces</h2>
            <p style={{ marginTop: '8px' }}>
              We replace opaque broker negotiations with transparent, institutional volume discounts directly backed by developers.
            </p>
          </div>
        </div>

        <div className="trust-grid" style={{ marginBottom: '48px' }}>
          {TRUST_ADVANTAGES.map((adv, idx) => {
            const IconComp = iconMap[adv.icon] || ShieldCheck;
            return (
              <div key={idx} className="trust-card">
                <div className="trust-icon-box">
                  <IconComp size={24} />
                </div>
                <div>
                  <h3>{adv.title}</h3>
                  <p>{adv.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div style={{
          background: 'var(--ink-card)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-sm)',
          overflowX: 'auto',
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '18px' }}>
            Single Buyer vs. REET Group Buying Comparison
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line-strong)', color: 'var(--muted)' }}>
                <th style={{ textAlign: 'left', padding: '12px 14px', fontWeight: '500' }}>Feature</th>
                <th style={{ textAlign: 'left', padding: '12px 14px', fontWeight: '500', color: 'var(--muted)' }}>Buying Alone (Retail)</th>
                <th style={{ textAlign: 'left', padding: '12px 14px', fontWeight: '600', color: 'var(--brass-bright)' }}>Buying via REET Group</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '14px', color: 'var(--paper)' }}>Pricing Tier</td>
                <td style={{ padding: '14px', color: 'var(--muted)' }}>Standard builder rack rate</td>
                <td style={{ padding: '14px', color: 'var(--brass-bright)', fontWeight: '600' }}>
                  Institutional volume slab (Save ₹10L–₹86L)
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '14px', color: 'var(--paper)' }}>Negotiation Power</td>
                <td style={{ padding: '14px', color: 'var(--muted)' }}>Limited to 1 unit negotiation</td>
                <td style={{ padding: '14px', color: 'var(--brass-bright)', fontWeight: '600' }}>
                  4+ units combined leverage
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--line)' }}>
                <td style={{ padding: '14px', color: 'var(--paper)' }}>Facilitation & Brokerage Fee</td>
                <td style={{ padding: '14px', color: 'var(--muted)' }}>Often 1% – 2% requested by local brokers</td>
                <td style={{ padding: '14px', color: 'var(--brass-bright)', fontWeight: '600' }}>
                  ₹0 (100% Free for buyers)
                </td>
              </tr>
              <tr>
                <td style={{ padding: '14px', color: 'var(--paper)' }}>Legal & Registration Ownership</td>
                <td style={{ padding: '14px', color: 'var(--muted)' }}>Direct with Developer</td>
                <td style={{ padding: '14px', color: 'var(--brass-bright)', fontWeight: '600' }}>
                  100% Direct with Developer (No middleman title)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
