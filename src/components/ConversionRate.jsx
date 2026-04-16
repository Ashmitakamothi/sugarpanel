import React from 'react';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';


const conversionData = [
  { label: 'Product Views', value: '6,575', sub: '29%' },
  { label: 'Add to Cart', value: '6,575', sub: '29%' },
  { label: 'Checkout Initiated', value: '6,575', sub: '29%' },
  { label: 'Completed Purchases', value: '6,575', sub: '29%' },
  { label: 'Completed Purchases', value: '6,575', sub: '29%' },
   { label: 'Completed Purchases', value: '6,575', sub: '29%' },
    { label: 'Completed Purchases', value: '6,575', sub: '29%' },
  
 
   
];

const ConversionRate = () => {
  return (
    <div className="conversion-card-v2">
      <div className="conv-header">
        <h3>Conversion Rate</h3>
        <button className="conv-filter">Last Year <Calendar size={14}/></button>
      </div>

      <div className="calendar-pill">
        <ChevronLeft size={16} className="nav-icon" />
        <span className="month">January 2025</span>
        <ChevronRight size={16} className="nav-icon" />
      </div>

      <div className="conv-list">
        {conversionData.map((item, idx) => (
          <div key={idx} className="conv-item">
            <div className="item-labels">
              <span className="main-label">{item.label}</span>
              <span className="sub-label">{item.sub}</span>
            </div>
            <span className="item-value">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="conv-footer">
        <button className="learn-more">Learn More <ChevronRight size={14}/></button>
      </div>
    </div>
  );
};

export default ConversionRate;
