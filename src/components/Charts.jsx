import React, { useRef } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend
} from 'recharts';
import { Calendar, Search } from 'lucide-react';
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
      <button type="button" className="chart-filter-btn" onClick={handleOpenPicker}>
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

const transactionData = [
  { name: 'Jan', total: 400, success: 240 },
  { name: 'Feb', total: 300, success: 139 },
  { name: 'Mar', total: 600, success: 480 },
  { name: 'Apr', total: 400, success: 390 },
  { name: 'May', total: 500, success: 480 },
  { name: 'Jun', total: 700, success: 687 },
  { name: 'Jul', total: 600, success: 500 },
  { name: 'Aug', total: 500, success: 400 },
  { name: 'Sep', total: 600, success: 550 },
  { name: 'Oct', total: 400, success: 300 },
  { name: 'Nov', total: 500, success: 450 },
  { name: 'Dec', total: 700, success: 650 },
];

const performanceData = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 30 },
  { name: 'Mar', value: 65 },
  { name: 'Apr', value: 45 },
  { name: 'May', value: 80 },
  { name: 'Jun', value: 91.72 },
  { name: 'Jul', value: 70 },
  { name: 'Aug', value: 60 },
  { name: 'Sep', value: 75 },
  { name: 'Oct', value: 65 },
  { name: 'Nov', value: 85 },
  { name: 'Dec', value: 70 },
];

export const TransactionActivity = () => {
  const { t } = useLanguage();
  return (
    <div className="chart-card tall">
      <div className="chart-header">
        <h3>{t('transactionActivity')}</h3>
        <DatePickerButton label={t('lastYear')} />
      </div>
      <div className="chart-container chart-container-line" style={{ height: '250px', width: '100%', minWidth: '0' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={transactionData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} dy={8} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            />
            <Line
              type="monotone"
              dataKey="total"
              name={t('totalTransaction') || "Total Transaction"}
              stroke="#2563EB"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#2563EB', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="success"
              name={t('successTransaction') || "Success Transaction"}
              stroke="#111827"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#111827', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 5 }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ fontSize: '12px', color: '#6B7280', paddingTop: '4px' }}
              iconType="circle"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const SalePerformance = () => {
  const { t } = useLanguage();
  return (
    <div className="chart-card tall">
      <div className="chart-header">
        <div className="header-left-group">
          <h3>{t('salePerformance')}</h3>
          <span className="performance-value">91.72%</span>
          <span className="badge badge-success">+8.33%</span>
        </div>
        <DatePickerButton label={t('lastYear')} />
      </div>
      <div className="chart-container chart-container-bar" style={{ height: '250px', width: '100%', minWidth: '0' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={performanceData} barGap={8} barCategoryGap="25%" margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="saleBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.35} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} dy={8} />
            <YAxis hide />
            <Tooltip cursor={{ fill: 'rgba(243, 244, 246, 0.4)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={34}>
              {performanceData.map((_, index) => (
                <Cell key={`cell-${index}`} fill="url(#saleBarGradient)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const OrdersByTime = () => {
  const { t } = useLanguage();
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>{t('ordersByTime')}</h3>
        <div className="flex items-center gap-2 orders-by-time-tools">
          <div className="heat-legend">0 <div className="heat-dots"><span></span><span></span><span></span><span></span></div> 2500</div>
          <DatePickerButton label={t('january') + " 2025"} />
          <button type="button" className="icon-btn-small" aria-label="Search"><Search size={14} strokeWidth={2}/></button>
        </div>
      </div>
    <div className="heatmap-grid">
       <div className="heatmap-row-header">
         {['8am', '10am', '12pm', '2pm', '4pm', '6pm'].map(h => <span key={h}>{h}</span>)}
       </div>
       <div className="heatmap-cells">
          {Array.from({ length: 120 }).map((_, i) => (
            <div key={i} className={`heat-cell ${i % 7 === 0 ? 'high' : i % 5 === 0 ? 'med' : ''}`} />
          ))}
      </div>
    </div>
  </div>
)};

export const ProductStatics = () => {
  const { t } = useLanguage();
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>{t('productStatics')}</h3>
        <DatePickerButton label={t('lastYear')} />
      </div>
    <div className="chart-container chart-container-product-statics" style={{ height: '230px', width: '100%', minWidth: '0' }}>
       <ResponsiveContainer width="100%" height="100%">
         <BarChart data={transactionData.slice(0, 7)} barGap={4} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
             <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
             <YAxis hide />
             <Tooltip cursor={{ fill: 'transparent' }} />
             <Bar dataKey="total" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={14} />
             <Bar dataKey="success" fill="#DBEAFE" radius={[6, 6, 0, 0]} barSize={14} />
         </BarChart>
       </ResponsiveContainer>
    </div>
  </div>
)};
