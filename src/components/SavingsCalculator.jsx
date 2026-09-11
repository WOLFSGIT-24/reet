import React, { useState } from 'react';
import { Calculator, ArrowRight, TrendingDown, CheckCircle2, Shield } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';

export default function SavingsCalculator({ onOpenJoinModal }) {
  const [selectedProjectId, setSelectedProjectId] = useState(PROJECTS_DATA[0].id);
  const [downpaymentPct, setDownpaymentPct] = useState(20);

  const currentProject = PROJECTS_DATA.find(p => p.id === selectedProjectId) || PROJECTS_DATA[0];

  // Calculate approximate average figures
  const avgBuilderCostCr = (currentProject.builderPriceMin + currentProject.builderPriceMax) / 2;
  const avgGroupCostCr = (currentProject.groupPriceMin + currentProject.groupPriceMax) / 2;
  const directSavingsLakhs = Math.round((avgBuilderCostCr - avgGroupCostCr) * 100);

  // EMI difference estimate (8.5% interest, 20 years)
  const loanBuilder = (avgBuilderCostCr * 10000000) * (1 - downpaymentPct / 100);
  const loanGroup = (avgGroupCostCr * 10000000) * (1 - downpaymentPct / 100);

  const calculateEmi = (principal) => {
    const r = 0.085 / 12;
    const n = 240;
    return Math.round((principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  };

  const emiBuilder = calculateEmi(loanBuilder);
  const emiGroup = calculateEmi(loanGroup);
  const monthlyEmiSavings = emiBuilder - emiGroup;

  return (
    <section className="section" id="calculator" style={{ background: 'var(--ink-surface)' }}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2>Group Savings Calculator</h2>
            <p style={{ marginTop: '8px' }}>
              Compare standard retail builder price vs REET institutional group rate and see your direct upfront & monthly EMI savings.
            </p>
          </div>
        </div>

        <div className="calculator-box">
          {/* Controls */}
          <div>
            <div className="calc-form-group">
              <label className="calc-label">Select Hyderabad Launch</label>
              <select 
                className="calc-select"
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
              >
                {PROJECTS_DATA.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.location}) — {p.type}
                  </option>
                ))}
              </select>
            </div>

            <div className="calc-form-group">
              <label className="calc-label">
                Planned Down Payment: <b style={{ color: 'var(--brass-bright)' }}>{downpaymentPct}%</b>
              </label>
              <input 
                type="range" 
                min="10" 
                max="50" 
                step="5"
                value={downpaymentPct}
                onChange={(e) => setDownpaymentPct(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--brass-bright)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted)', marginTop: '4px' }}>
                <span>10% (Min)</span>
                <span>20% (Standard)</span>
                <span>50%</span>
              </div>
            </div>

            <div style={{ 
              background: 'rgba(44, 86, 82, 0.18)', 
              border: '1px solid var(--teal-border)', 
              padding: '16px', 
              borderRadius: 'var(--radius-sm)',
              marginTop: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#72dbd0', fontSize: '0.88rem', fontWeight: '600', marginBottom: '4px' }}>
                <CheckCircle2 size={16} />
                <span>Group Formation Guarantee</span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '0.84rem', lineHeight: '1.4' }}>
                Currently <b>{currentProject.currentBuyers} of {currentProject.minGroup} verified buyers</b> committed for {currentProject.title}. Your enrollment locks this group tier immediately.
              </p>
            </div>
          </div>

          {/* Results Summary */}
          <div className="calc-results-card">
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--muted)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Estimated Savings Analysis
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '18px' }}>{currentProject.title}</h3>

              <div className="calc-stat-row">
                <span style={{ color: 'var(--muted)' }}>Individual Buyer Price:</span>
                <b>{currentProject.builderPrice}</b>
              </div>

              <div className="calc-stat-row">
                <span style={{ color: 'var(--muted)' }}>REET Group Price:</span>
                <b style={{ color: 'var(--brass-bright)' }}>{currentProject.groupPrice}</b>
              </div>

              <div className="calc-stat-row highlight">
                <span>Net Direct Savings:</span>
                <b>₹{directSavingsLakhs} Lakhs</b>
              </div>

              <div className="calc-stat-row" style={{ borderBottom: 'none', paddingTop: '10px' }}>
                <span style={{ color: 'var(--muted)', fontSize: '0.86rem' }}>Approx. Monthly EMI Savings:</span>
                <span style={{ color: '#72dbd0', fontWeight: '600', fontSize: '1rem' }}>
                  ~₹{monthlyEmiSavings.toLocaleString('en-IN')}/mo
                </span>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '14px 20px' }}
                onClick={() => onOpenJoinModal(currentProject)}
              >
                <span>Lock Group Price for this Project</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
