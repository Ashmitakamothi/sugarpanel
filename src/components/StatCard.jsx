import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';


export const UpgradeBanner = () => (
  <div className="upgrade-banner">
    <div className="banner-content">
      <h2>Sharpen your Skill with Professional Online</h2>
      <button className="upgrade-now-btn">Upgrade Now</button>
    </div>
  </div>
);

export const StatCard = ({ title, value, change, color }) => {
  const isPositive = !change.startsWith('-');

  return (
    <div className="stat-card">
      <div className="stat-info">
        <span className="stat-title">{title}</span>
        <div className="stat-value-row">
          <div className="stat-value-group">
            <h3 className="stat-value">{value.split('.')[0]}</h3>
            <span className="stat-decimal">.{value.split('.')[1] || '00'}</span>
          </div>
          <div className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {change}
          </div>
        </div>
        <p className="stat-period">From Jan 01, 2025 - March 30, 2024</p>
      </div>
    </div>
  );
};
