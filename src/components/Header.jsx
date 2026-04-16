import React from 'react';
import { Search, Calendar, FileText, Filter, ChevronDown } from 'lucide-react';


const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="welcome-title">Welcome Back Ameerah Howard</h1>
        <p className="notif-subtitle">
          You have <span className="notif-count">2 unread</span> notifications
        </p>
      </div>
      
      <div className="header-right">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search..." />
          <span className="search-shortcut">⌘ + K</span>
        </div>

        <div className="header-actions">
          <button className="action-btn">
            <span className="action-label">Date</span>
            <Calendar size={18} />
          </button>
          
          <button className="action-btn primary">
            <span className="action-label">Export Document</span>
            <FileText size={18} />
          </button>
          
          <button className="icon-btn">
            <Filter size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
