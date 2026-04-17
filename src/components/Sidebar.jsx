import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  LineChart, 
  Package, 
  Users, 
  Bell, 
  Inbox, 
  Layers, 
  List, 
  Grid,
  Moon,
  Settings,
  X,
  Menu
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
    { icon: <LineChart size={20} />, label: 'Analytics' },
    { icon: <Package size={20} />, label: 'Products' },
    { icon: <Users size={20} />, label: 'Customers' },
    { icon: <Bell size={20} />, label: 'Notifications' },
    { icon: <Inbox size={20} />, label: 'Inbox' },
    { icon: <Layers size={20} />, label: 'Pages' },
    { icon: <List size={20} />, label: 'Reports' },
    { icon: <Grid size={20} />, label: 'Apps' }
  ];

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Mobile close button */}
        <button className="sidebar-close-btn" onClick={onClose} aria-label="Close menu">
          <X size={20} />
        </button>

        <nav className="sidebar-nav">
          <div className="nav-section">
            {menuItems.map((item, index) => (
              <div 
                key={index} 
                className={`nav-item ${item.active ? 'active' : ''}`}
                onClick={onClose}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="nav-section bottom">
            <div className="nav-item" onClick={onClose}>
               <span className="nav-icon"><Moon size={20} /></span>
               <span className="nav-label">Dark Mode</span>
            </div>
            <div className="nav-item" onClick={onClose}>
               <span className="nav-icon"><Settings size={20} /></span>
               <span className="nav-label">Settings</span>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
