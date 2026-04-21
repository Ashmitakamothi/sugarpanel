import React, { useState } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MousePointer2, 
  Clock, 
  Globe,
  ArrowUpRight,
  ChevronDown
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

const analyticsData = [
  { name: 'Mon', users: 4000, bounce: 2400 },
  { name: 'Tue', users: 3000, bounce: 1398 },
  { name: 'Wed', users: 2000, bounce: 9800 },
  { name: 'Thu', users: 2780, bounce: 3908 },
  { name: 'Fri', users: 1890, bounce: 4800 },
  { name: 'Sat', users: 2390, bounce: 3800 },
  { name: 'Sun', users: 3490, bounce: 4300 },
];

const channelData = [
  { name: 'Organic Search', value: 45, color: '#3B82F6' },
  { name: 'Direct', value: 25, color: '#10B981' },
  { name: 'Social', value: 15, color: '#F59E0B' },
  { name: 'Referral', value: 10, color: '#8B5CF6' },
  { name: 'Email', value: 5, color: '#EF4444' },
];

const AnalyticsPage = () => {
  const [selectedRange, setSelectedRange] = useState('Last 7 Days');

  return (
    <div className="analytics-page-container">
      {/* Header */}
      <div className="analytics-header">
        <div className="a-header-left">
          <h1 className="a-title">Analytics Overview</h1>
          <p className="a-subtitle">Track your website performance and user behavior</p>
        </div>
        <div className="a-header-right">
          <button className="a-date-btn">
            {selectedRange} <ChevronDown size={16} />
          </button>
          <button className="btn-primary">Download Report</button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="analytics-stats-grid">
        <div className="a-stat-card">
          <div className="a-stat-top">
            <div className="a-stat-icon-box users"><Users size={20} /></div>
            <span className="a-stat-change pos">+12.5%</span>
          </div>
          <div className="a-stat-bottom">
            <span className="a-stat-label">Total Visitors</span>
            <h3 className="a-stat-value">124,842</h3>
          </div>
        </div>
        <div className="a-stat-card">
          <div className="a-stat-top">
            <div className="a-stat-icon-box bounce"><MousePointer2 size={20} /></div>
            <span className="a-stat-change neg">-2.4%</span>
          </div>
          <div className="a-stat-bottom">
            <span className="a-stat-label">Bounce Rate</span>
            <h3 className="a-stat-value">32.41%</h3>
          </div>
        </div>
        <div className="a-stat-card">
          <div className="a-stat-top">
            <div className="a-stat-icon-box duration"><Clock size={20} /></div>
            <span className="a-stat-change pos">+5.2%</span>
          </div>
          <div className="a-stat-bottom">
            <span className="a-stat-label">Avg. Session</span>
            <h3 className="a-stat-value">4m 32s</h3>
          </div>
        </div>
        <div className="a-stat-card">
          <div className="a-stat-top">
            <div className="a-stat-icon-box geo"><Globe size={20} /></div>
            <span className="a-stat-change pos">+8.1%</span>
          </div>
          <div className="a-stat-bottom">
            <span className="a-stat-label">Active Countries</span>
            <h3 className="a-stat-value">42</h3>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="analytics-main-row">
        <div className="a-chart-main card">
          <div className="a-chart-header">
            <h3>Visitor Traffic</h3>
            <div className="a-chart-legends">
              <span className="leg users">Users</span>
              <span className="leg bounce">Bounce</span>
            </div>
          </div>
          <div className="a-chart-body" style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                <Area type="monotone" dataKey="bounce" stroke="#10B981" strokeWidth={3} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="a-chart-side card">
          <div className="a-chart-header">
            <h3>Traffic Channels</h3>
          </div>
          <div className="a-chart-body" style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelData} layout="vertical" margin={{ left: -20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6B7280'}} width={100} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="analytics-bottom-row">
        <div className="a-table-card card">
          <div className="a-table-header">
            <h3>Top Pages</h3>
            <button className="see-more">View All <ArrowUpRight size={14} /></button>
          </div>
          <table className="a-table">
            <thead>
              <tr>
                <th>Page URL</th>
                <th>Views</th>
                <th>Unique</th>
                <th>Time on Page</th>
              </tr>
            </thead>
            <tbody>
              {[
                { url: '/dashboard', views: '12,402', unique: '8,210', time: '1m 24s' },
                { url: '/products/premium-kit', views: '8,575', unique: '5,102', time: '2m 10s' },
                { url: '/analytics/realtime', views: '6,210', unique: '4,102', time: '3m 15s' },
                { url: '/blog/how-to-scale', views: '4,890', unique: '3,210', time: '4m 05s' },
              ].map((page, i) => (
                <tr key={i}>
                  <td className="p-url">{page.url}</td>
                  <td>{page.views}</td>
                  <td>{page.unique}</td>
                  <td>{page.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
