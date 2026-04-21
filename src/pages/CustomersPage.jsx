import React from 'react';
import { Users } from 'lucide-react';

const CustomersPage = () => (
  <div className="blank-page">
    <div className="blank-page-icon"><Users size={48} strokeWidth={1.5} /></div>
    <h1 className="blank-page-title">Customers</h1>
    <p className="blank-page-sub">View and manage your customer database and segments here.</p>
    <span className="blank-page-badge">Coming Soon</span>
  </div>
);

export default CustomersPage;
