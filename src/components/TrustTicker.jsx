import React from 'react';
import { ShieldCheck, FileCheck, BadgePercent, Building2 } from 'lucide-react';

export default function TrustTicker() {
  return (
    <div className="trust-strip">
      <div className="wrap">
        <div className="trust-flex">
          <div className="trust-item">
            <ShieldCheck size={18} />
            <span>100% Direct Developer Agreement</span>
          </div>
          <div className="trust-item">
            <FileCheck size={18} />
            <span>Telangana RERA Registered Projects</span>
          </div>
          <div className="trust-item">
            <BadgePercent size={18} />
            <span>Zero Brokerage / Facilitation Fee to Buyers</span>
          </div>
          <div className="trust-item">
            <Building2 size={18} />
            <span>Pre-Approved Home Loans (HDFC, SBI, ICICI)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
