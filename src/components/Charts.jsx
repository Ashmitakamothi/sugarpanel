import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { ChevronDown, Calendar, Search } from 'lucide-react';


const transactionData = [
  { name: 'Jan', Total : 400, success: 240 },
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

export const TransactionActivity = () => (
  <div className="chart-card tall">
    <div className="chart-header">
      <h3>Transaction Activity</h3>
      <button className="chart-filter-btn">
        Last Year <Calendar size={14} />
      </button>
    </div>
    <div className="chart-container" style={{ height: '250px', width: '100%', minWidth: '0' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={transactionData}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#111827" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#111827" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
          />
          <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="success" stroke="#111827" strokeWidth={3} dot={{ r: 4, fill: '#111827', strokeWidth: 2, stroke: '#fff' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const SalePerformance = () => (
  <div className="chart-card tall">
    <div className="chart-header">
      <div className="header-left-group">
        <h3>Sale Performance</h3>
        <span className="performance-value">91.72%</span>
        <span className="badge badge-success">+8.33%</span>
      </div>
      <button className="chart-filter-btn">
        Last Year <Calendar size={14} />
      </button>
    </div>
    <div className="chart-container" style={{ height: '250px', width: '100%', minWidth: '0' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={performanceData} barGap={8} barCategoryGap="25%">
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} dy={10} />
          <YAxis hide />
          <Tooltip cursor={{fill: 'rgba(243, 244, 246, 0.4)'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
          <Bar dataKey="value" radius={[6, 6, 6, 6]} barSize={34}>
            {performanceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="url(#barGradient)" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const OrdersByTime = () => (
  <div className="chart-card">
    <div className="chart-header">
      <h3>Orders By Time</h3>
      <div className="flex items-center gap-2">
         <div className="heat-legend">0 <div className="heat-dots"><span></span><span></span><span></span><span></span></div> 2500</div>
         <button className="chart-filter-btn">January 2025 <Calendar size={14} /></button>
         <button className="icon-btn-small"><Search size={14}/></button>
      </div>
    </div>
    <div className="heatmap-grid">
       {/* Mock Heatmap Grid */}
       <div className="heatmap-row-header">
         {['8am', '10am', '12pm', '2pm', '4pm', '6pm'].map(h => <span key={h}>{h}</span>)}
       </div>
       <div className="heatmap-cells">
          {Array.from({length: 120}).map((_, i) => (
            <div key={i} className={`heat-cell ${i % 7 === 0 ? 'high' : i % 5 === 0 ? 'med' : ''}`}></div>
          ))}
       </div>
    </div>
  </div>
);

export const ProductStatics = () => (
  <div className="chart-card">
    <div className="chart-header">
      <h3>Product Statics</h3>
      <button className="chart-filter-btn">Last Year <Calendar size={14} /></button>
    </div>
    <div className="chart-container" style={{ height: '230px', width: '100%', minWidth: '0' }}>
       <ResponsiveContainer width="100%" height="100%">
         <BarChart data={transactionData.slice(0, 7)} barGap={4}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
             <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} />
             <YAxis hide />
             <Tooltip cursor={{fill: 'transparent'}} />
             <Bar dataKey="total" fill="#3B82F6" radius={[6, 6, 6, 6]} barSize={14} />
             <Bar dataKey="success" fill="#DBEAFE" radius={[6, 6, 6, 6]} barSize={14} />
         </BarChart>
       </ResponsiveContainer>
    </div>
  </div>
);
