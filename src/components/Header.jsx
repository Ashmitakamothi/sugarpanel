import React from 'react';
import { Search, Calendar, FileDown, SlidersHorizontal } from 'lucide-react';

const Header = () => {
  return (
    <header className="header" aria-label="Dashboard header">
      <div className="header-left">
        <div className="header-welcome-text">
          <h1 className="welcome-title">Welcome Back Ameerah Howard</h1>
          <p className="header-subtitle">
            <span className="header-subtitle-muted">You have </span>
            <button type="button" className="header-subtitle-em">
              2 unread
            </button>
            <span className="header-subtitle-muted"> notifications</span>
          </p>
        </div>
      </div>

      <div className="header-right">
        <div className="search-bar">
          <Search size={18} strokeWidth={2.5} className="search-icon" aria-hidden="true" />
          <input type="search" placeholder="Search..." autoComplete="off" aria-label="Search" />
          <div className="shortcut-hint">
            <span className="cmd-icon">⌘</span>
            <span className="plus-icon">+</span>
            <span className="key-icon">K</span>
          </div>
        </div>

        <button
          type="button"
          className="header-date-btn"
          aria-label="Date"
        >
          <span className="header-date-label">Date</span>
          <Calendar size={16} strokeWidth={2.5} className="btn-right-icon" aria-hidden="true" />
        </button>

        <button type="button" className="header-export-btn" aria-label="Export Document">
          <span className="header-export-label">Export Document</span>
          <FileDown size={16} strokeWidth={2.5} className="btn-right-icon" aria-hidden="true" />
        </button>

        <button type="button" className="header-menu-btn" aria-label="Filter or Settings">
          <SlidersHorizontal size={18} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};

export default Header;
