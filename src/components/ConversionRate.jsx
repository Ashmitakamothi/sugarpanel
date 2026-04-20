import React from 'react';
import { Calendar, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';


const funnelMetrics = [
  { label: 'Product Views', value: '6,575', sub: '29%', up: true },
  { label: 'Add to Cart', value: '4,210', sub: '18%', up: true },
  { label: 'Checkout Initiated', value: '2,890', sub: '12%', up: false },
  { label: 'Completed Purchases', value: '1,902', sub: '8%', up: true },
];

const ConversionRate = () => {
  return (
    <div className="conversion-card-v2">
      <div className="conv-header">
        <h3>Conversion Rate</h3>
        <button type="button" className="conv-filter">Last Year <Calendar size={14} strokeWidth={2} /></button>
      </div>

      <div className="conv-list">
        {funnelMetrics.map((item) => (
          <div key={item.label} className="conv-item">
            <div className="item-labels">
              <span className="main-label">{item.label}</span>
              <span className="sub-label">{item.sub}</span>
            </div>
            <div className="conv-item-right">
              <span className="item-value">{item.value}</span>
              <span className={`conv-trend ${item.up ? 'conv-trend-up' : 'conv-trend-down'}`} aria-hidden="true">
                {item.up ? <TrendingUp size={16} strokeWidth={2} /> : <TrendingDown size={16} strokeWidth={2} />}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="conv-footer">
        <button type="button" className="learn-more">Learn More <ChevronRight size={14} strokeWidth={2} /></button>
      </div>
    </div>
  );
};

export default ConversionRate;
