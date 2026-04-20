import React from 'react';
import { 
  Maximize, 
  MessageSquare, 
  Bell, 
  ChevronDown,
  Menu
} from 'lucide-react';

const TopHeader = ({ onMenuToggle }) => {
  return (
    <header className="top-header" role="banner">
      <div className="top-header-inner">
        <button className="hamburger-btn" type="button" onClick={onMenuToggle} aria-label="Open menu">
          <Menu size={22} strokeWidth={2} />
        </button>

        <div className="top-header-actions-wrap">
          <div className="top-header-actions">
            <button type="button" className="lang-selector" aria-label="Language: English">
              <span>EN</span>
              <ChevronDown size={16} strokeWidth={2} className="lang-chevron" />
            </button>
          
            <button type="button" className="top-icon-btn top-btn-maximize" aria-label="Enter fullscreen">
              <Maximize size={18} strokeWidth={2} />
            </button>
          
            <button type="button" className="top-icon-btn badge-btn top-btn-chat" aria-label="Messages">
              <MessageSquare size={20} strokeWidth={2} />
              <span className="notif-dot" aria-hidden="true" />
            </button>
          
            <button type="button" className="top-icon-btn badge-btn top-btn-bell" aria-label="Notifications">
              <Bell size={20} strokeWidth={2} />
              <span className="notif-dot" aria-hidden="true" />
            </button>
          
            <button type="button" className="user-profile" aria-label="Account">
              <span className="avatar-circle" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
