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
    <div className="top-header">
      <div className="top-header-left">
        {/* Hamburger - only visible on mobile */}
        <button className="hamburger-btn" onClick={onMenuToggle} aria-label="Open menu">
          <Menu size={22} />
        </button>

        <div className="top-header-logo">
          <img 
            src="/sugarpanel_logo.png" 
            alt="Sugarpanel Logo" 
            className="brand-logo"
          />
        </div>
      </div>

      <div className="top-header-content">
        <div className="top-header-actions-wrap">
          <div className="top-header-actions">
          <div className="lang-selector">
            <span>EN</span>
            <ChevronDown size={14} />
          </div>
          
          <button className="top-icon-btn top-btn-maximize">
            <Maximize size={20} />
          </button>
          
          <button className="top-icon-btn top-btn-chat">
            <MessageSquare size={20} />
          </button>
          
          <button className="top-icon-btn badge-btn top-btn-bell">
            <Bell size={20} />
            <span className="notif-dot"></span>
          </button>
          
          <div className="user-profile">
            <div className="avatar-circle"></div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
