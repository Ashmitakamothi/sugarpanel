import React, { useRef, useState } from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const DatePickerButton = ({ label }) => {
  const inputRef = useRef(null);
  
  const handleOpenPicker = () => {
    if (inputRef.current) {
      if ('showPicker' in HTMLInputElement.prototype) {
        inputRef.current.showPicker();
      } else {
        inputRef.current.click();
      }
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button type="button" className="conv-filter" onClick={handleOpenPicker}>
        {label} <Calendar size={14} strokeWidth={2} />
      </button>
      <input 
        type="date" 
        ref={inputRef} 
        style={{ 
          position: 'absolute', 
          opacity: 0, 
          pointerEvents: 'none', 
          width: '1px', 
          height: '1px',
          bottom: 0,
          left: '50%'
        }} 
      />
    </div>
  );
};

const funnelMetrics = [
  { label: 'Product Views', value: '6,575', sub: '29%', key: 'productViews' },
  { label: 'Add to Cart', value: '4,210', sub: '18%', key: 'addToCart' },
  { label: 'Checkout Initiated', value: '2,890', sub: '12%', key: 'checkoutInitiated' },
  { label: 'Completed Purchases', value: '1,902', sub: '80%', key: 'completedPurchases' },
];

const ConversionRate = () => {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const displayMetrics = showAll ? funnelMetrics : funnelMetrics.slice(0, 3);

  return (
    <div className="conversion-card-v2">
      <div className="conv-header">
        <h3>{t('conversionRate')}</h3>
        <DatePickerButton label={t('lastYear')} />
      </div>

      <div className="conv-list">
        {displayMetrics.map((item) => (
          <div key={item.label} className="conv-item">
            <div className="item-labels">
              <span className="main-label">{t(item.key)}</span>
              <span className="sub-label">{item.sub}</span>
            </div>
            <div className="conv-item-right">
              <span className="item-value">{item.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="conv-footer">
        <button 
          type="button" 
          className="learn-more"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? (t('showLess') || 'Show Less') : t('learnMore')} <ChevronRight size={14} strokeWidth={2} style={{ transform: showAll ? 'rotate(-90deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>
      </div>
    </div>
  );
};

export default ConversionRate;
