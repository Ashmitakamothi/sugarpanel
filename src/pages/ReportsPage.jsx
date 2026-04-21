import React from 'react';
import { FileText } from 'lucide-react';

const ReportsPage = () => (
  <div className="blank-page">
    <div className="blank-page-icon"><FileText size={48} strokeWidth={1.5} /></div>
    <h1 className="blank-page-title">Reports</h1>
    <p className="blank-page-sub">Generate and download detailed business reports here.</p>
    <span className="blank-page-badge">Coming Soon</span>
  </div>
);

export default ReportsPage;
