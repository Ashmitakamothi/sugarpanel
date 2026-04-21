import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, ChevronDown } from 'lucide-react';

const scheduleData = {
  Meetings: [
    { 
      id: 1, 
      title: 'Meeting with Arthur Bell', 
      time: '09:00 - 09:45 AM (UTC)', 
      tag: 'Product Design', 
      color: '#3B82F6' 
    },
    { 
      id: 2, 
      title: 'Meeting with Leslie Perez', 
      time: '11:30 - 12:15 PM (UTC)', 
      tag: 'Marketing Business', 
      color: '#10B981' 
    },
    { 
      id: 3, 
      title: 'Sync with Dev Team', 
      time: '02:00 - 03:00 PM (UTC)', 
      tag: 'Brainstorming Session', 
      color: '#EF4444' 
    },
  ],
  Events: [
    {
      id: 4,
      title: 'Dashboard Reveal 2025',
      time: 'All Day',
      tag: 'Major Event',
      color: '#8B5CF6'
    },
    {
      id: 5,
      title: 'Networking Brunch',
      time: '10:00 - 11:30 AM',
      tag: 'Social',
      color: '#F59E0B'
    }
  ],
  Holiday: [
    {
      id: 6,
      title: 'New Year Day',
      time: 'January 1st',
      tag: 'Public Holiday',
      color: '#6B7280'
    }
  ]
};

const months = [
  'January 2025', 'February 2025', 'March 2025', 'April 2025', 
  'May 2025', 'June 2025', 'July 2025', 'August 2025', 
  'September 2025', 'October 2025', 'November 2025', 'December 2025'
];

const RightPanel = () => {
  const [activeTab, setActiveTab] = useState('Meetings');
  const [monthIndex, setMonthIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const nextMonth = () => setMonthIndex((prev) => (prev + 1) % months.length);
  const prevMonth = () => setMonthIndex((prev) => (prev - 1 + months.length) % months.length);

  // Simulate data changing based on month
  const getDisplayData = () => {
    const data = scheduleData[activeTab];
    if (monthIndex % 2 === 0) return data;
    return data.slice(0, 1); // Just show first item on odd months for variety
  };

  const filteredData = getDisplayData();

  return (
    <div className="right-panel">
      <div className="schedule-card-v2">
        <div className="schedule-header">
          <h3>Schedule</h3>
          <div className="header-actions">
            <button className="see-all-pill" onClick={() => alert('Viewing full schedule...')}>See All</button>
            <button 
              className={`search-btn-circle ${isSearching ? 'active' : ''}`} 
              aria-label="Search schedule"
              onClick={() => setIsSearching(!isSearching)}
            >
              <Search size={18}/>
            </button>
          </div>
        </div>

        {isSearching && (
          <div className="schedule-search-input-wrap">
            <input type="text" placeholder="Search events..." autoFocus className="sch-mini-search" />
          </div>
        )}

        <div className="calendar-nav-v2">
          <div className="nav-arrow-hitbox" onClick={prevMonth}>
            <ChevronLeft size={16} className="nav-arrow" />
          </div>
          <span className="current-date">{months[monthIndex]}</span>
          <div className="nav-arrow-hitbox" onClick={nextMonth}>
            <ChevronRight size={16} className="nav-arrow" />
          </div>
        </div>

        <div className="schedule-tabs-v2">
          {['Meetings', 'Events', 'Holiday'].map(tab => (
            <button 
              key={tab}
              className={`sch-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="meeting-blocks-list">
          {filteredData.map(item => (
            <div key={item.id} className="meeting-block">
              <div className="block-header">
                <span className="block-tag" style={{ color: item.color, background: `${item.color}15` }}>
                  {item.tag}
                </span>
                <ChevronDown size={18} className="block-chevron" />
              </div>
              <h4 className="block-title">{item.title}</h4>
              <p className="block-time">{item.time}</p>
              
              <div className="block-footer">
                <span className="block-location">On Google Meet</span>
                <div className="member-avatars">
                   <div className="m-avatar"></div>
                   <div className="m-avatar"></div>
                   <div className="m-avatar"></div>
                   <span className="m-plus">+3</span>
                </div>
              </div>
            </div>
          ))}
          {filteredData.length === 0 && (
            <p className="empty-msg">No {activeTab.toLowerCase()} scheduled for this month.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
