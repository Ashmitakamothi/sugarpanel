import React from 'react';
import { X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { label: 'Dashboard' },
    { label: 'Analytics' },
    { label: 'Products' },
    { label: 'Customers' },
    { label: 'Notifications' },
    { label: 'Inbox' },
    { label: 'Pages' },
    { label: 'Reports' },
    
  ];

  const bottomItems = [
    { label: 'Dark Mode' },
    { label: 'Settings' },
  ];

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`} aria-label="Main navigation">
        <button type="button" className="sidebar-close-btn" onClick={onClose} aria-label="Close menu">
          <X size={20} strokeWidth={2} />
        </button>

        <div className="sidebar-brand">
          <div className="brand-mark" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
          <span className="sidebar-brand-text">Sugarpanel</span>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section nav-section-main">
            {menuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`sidebar-nav-btn ${item.active ? 'active' : ''}`}
                aria-current={item.active ? 'page' : undefined}
                onClick={onClose}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="nav-section nav-section-bottom">
            {bottomItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className="sidebar-nav-btn"
                onClick={onClose}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
