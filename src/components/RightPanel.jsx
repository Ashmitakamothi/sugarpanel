import React from 'react';
import { ChevronLeft, ChevronRight, Search, ChevronDown } from 'lucide-react';


const meetings = [
  { 
    id: 1, 
    title: 'Meeting with Arthur Bell', 
    time: '09:00 - 09:45 AM (UTC)', 
    tag: 'Product Design', 
    type: 'On Google Meet', 
    color: '#3B82F6' 
  },
  { 
    id: 2, 
    title: 'Meeting with Leslie Perez', 
    time: '09:00 - 09:45 AM (UTC)', 
    tag: 'Marketing Business', 
    type: 'On Google Meet', 
    color: '#10B981' 
  },
  { 
    id: 3, 
    title: 'Meeting with Leslie Perez', 
    time: '09:00 - 09:45 AM (UTC)', 
    tag: 'Brainstorming Session', 
    type: 'On Google Meet', 
    color: '#EF4444' 
  },
];

const RightPanel = () => {
  return (
    <div className="right-panel">
      <div className="schedule-card-v2">
        <div className="schedule-header">
          <h3>Schedule</h3>
          <div className="header-actions">
            <button className="see-all-pill">See All</button>
            <button className="search-btn-circle"><Search size={18}/></button>
          </div>
        </div>

        <div className="calendar-nav-v2">
          <ChevronLeft size={16} className="nav-arrow" />
          <span className="current-date">January 2025</span>
          <ChevronRight size={16} className="nav-arrow" />
        </div>

        <div className="schedule-tabs-v2">
          <button className="sch-tab active">Meetings</button>
          <button className="sch-tab">Events</button>
          <button className="sch-tab">Holiday</button>
        </div>

        <div className="meeting-blocks-list">
          {meetings.map(meeting => (
            <div key={meeting.id} className="meeting-block">
              <div className="block-header">
                <span className="block-tag" style={{ color: meeting.color, background: `${meeting.color}15` }}>
                  {meeting.tag}
                </span>
                <ChevronDown size={18} className="block-chevron" />
              </div>
              <h4 className="block-title">{meeting.title}</h4>
              <p className="block-time">{meeting.time}</p>
              
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
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
