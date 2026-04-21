import React, { useState, useEffect, useRef } from 'react';
import { 
  Maximize, 
  MessageSquare, 
  Bell, 
  ChevronDown,
  Menu,
  User,
  Settings,
  LogOut,
  Globe,
  Check
} from 'lucide-react';

const TopHeader = ({ onMenuToggle }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const dropdownRef = useRef(null);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const selectLanguage = (code) => {
    setSelectedLang(code);
    setActiveDropdown(null);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'HI', name: 'Hindi' }
  ];

  const notifications = [
    { id: 1, title: 'New Order Received', time: '5 min ago', type: 'order' },
    { id: 2, title: 'Server Rebooted', time: '12 min ago', type: 'system' },
    { id: 3, title: 'New Review on Product X', time: '1 hour ago', type: 'review' }
  ];

  return (
    <header className="top-header" role="banner" ref={dropdownRef}>
      <div className="top-header-inner">
        <button className="hamburger-btn" type="button" onClick={onMenuToggle} aria-label="Open menu" data-tooltip="Menu">
          <Menu size={22} strokeWidth={2} />
        </button>

        {/* Mobile-only brand logo — visible when sidebar is hidden */}
        <div className="top-header-brand-mobile" aria-label="Sugarpanel">
          <div className="brand-mark" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
          <span className="top-header-brand-text">Sugarpanel</span>
        </div>

        <div className="top-header-actions-wrap">
          <div className="top-header-actions">
            
            {/* Language Selector */}
            <div className="dropdown-container">
              <button 
                type="button" 
                className={`lang-selector ${activeDropdown === 'lang' ? 'active' : ''}`} 
                onClick={() => toggleDropdown('lang')}
                aria-label="Language selector"
                data-tooltip="Language"
              >
                <span>{selectedLang}</span>
                <ChevronDown size={16} strokeWidth={2} className="lang-chevron" />
              </button>
              
              {activeDropdown === 'lang' && (
                <div className="dropdown-menu lang-dropdown">
                  <div className="dropdown-header">Select Language</div>
                  {languages.map(lang => (
                    <button 
                      key={lang.code} 
                      className={`dropdown-item ${selectedLang === lang.code ? 'selected' : ''}`}
                      onClick={() => selectLanguage(lang.code)}
                    >
                      <Globe size={14} className="item-icon" />
                      <span>{lang.name}</span>
                      {selectedLang === lang.code && <Check size={14} className="check-icon" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          
            {/* Fullscreen Button */}
            <button 
              type="button" 
              className={`top-icon-btn top-btn-maximize ${isFullscreen ? 'active' : ''}`} 
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              data-tooltip="Fullscreen"
            >
              <Maximize size={18} strokeWidth={2} />
            </button>
          
            {/* Messages */}
            <div className="dropdown-container">
              <button 
                type="button" 
                className={`top-icon-btn badge-btn top-btn-chat ${activeDropdown === 'chat' ? 'active' : ''}`}
                onClick={() => toggleDropdown('chat')}
                aria-label="Messages"
                data-tooltip="Messages"
              >
                <MessageSquare size={20} strokeWidth={2} />
                <span className="notif-dot" aria-hidden="true" />
              </button>

              {activeDropdown === 'chat' && (
                <div className="dropdown-menu chat-dropdown">
                  <div className="dropdown-header">Messages</div>
                  <div className="dropdown-scroll">
                    {[1, 2].map(i => (
                      <div key={i} className="dropdown-item chat-item">
                        <div className="chat-avatar" />
                        <div className="chat-info">
                          <div className="chat-name">User {i}</div>
                          <div className="chat-preview">Hey, how's the progress?</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="dropdown-footer">View All Messages</div>
                </div>
              )}
            </div>
          
            {/* Notifications */}
            <div className="dropdown-container">
              <button 
                type="button" 
                className={`top-icon-btn badge-btn top-btn-bell ${activeDropdown === 'notif' ? 'active' : ''}`}
                onClick={() => toggleDropdown('notif')}
                aria-label="Notifications"
                data-tooltip="Notifications"
              >
                <Bell size={20} strokeWidth={2} />
                <span className="notif-dot" aria-hidden="true" />
              </button>

              {activeDropdown === 'notif' && (
                <div className="dropdown-menu notif-dropdown">
                  <div className="dropdown-header">Notifications</div>
                  <div className="dropdown-scroll">
                    {notifications.map(notif => (
                      <div key={notif.id} className="dropdown-item notif-item">
                        <div className="notif-icon-box">
                          <Bell size={14} />
                        </div>
                        <div className="notif-info">
                          <div className="notif-title">{notif.title}</div>
                          <div className="notif-time">{notif.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="dropdown-footer">View All Notifications</div>
                </div>
              )}
            </div>
          
            {/* User Profile */}
            <div className="dropdown-container">
              <button 
                type="button" 
                className={`user-profile ${activeDropdown === 'profile' ? 'active' : ''}`}
                onClick={() => toggleDropdown('profile')}
                aria-label="Account"
                data-tooltip="Profile"
              >
                <span className="avatar-circle" />
              </button>

              {activeDropdown === 'profile' && (
                <div className="dropdown-menu profile-dropdown">
                  <div className="dropdown-user-info">
                    <span className="user-name">Ashmita K.</span>
                    <span className="user-role">Administrator</span>
                  </div>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item">
                    <User size={16} className="item-icon" />
                    <span>My Profile</span>
                  </button>
                  <button className="dropdown-item">
                    <Settings size={16} className="item-icon" />
                    <span>Settings</span>
                  </button>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item logout">
                    <LogOut size={16} className="item-icon" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;

