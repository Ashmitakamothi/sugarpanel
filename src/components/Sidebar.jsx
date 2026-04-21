import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  X, 
  LayoutDashboard, 
  BarChart2, 
  Package, 
  Users, 
  Bell, 
  Inbox, 
  Layers, 
  FileText,
  Moon,
  Sun,
  Settings
} from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';

const menuItems = [
  { label: 'Dashboard',      icon: LayoutDashboard, path: '/' },
  { label: 'Analytics',      icon: BarChart2,        path: '/analytics' },
  { label: 'Products',       icon: Package,          path: '/products' },
  { label: 'Customers',      icon: Users,            path: '/customers' },
  { label: 'Notifications',  icon: Bell,             path: '/notifications' },
  { label: 'Inbox',          icon: Inbox,            path: '/inbox' },
  { label: 'Pages',          icon: Layers,           path: '/pages' },
  { label: 'Reports',        icon: FileText,         path: '/reports' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { isDark, toggleDark } = useDarkMode();
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/settings');
    onClose();
  };

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
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `sidebar-nav-btn${isActive ? ' active' : ''}`
                }
                onClick={onClose}
              >
                <item.icon size={20} strokeWidth={2} className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="nav-section nav-section-bottom">
            {/* Dark Mode toggle */}
            <button
              type="button"
              className={`sidebar-nav-btn dark-mode-btn ${isDark ? 'active' : ''}`}
              onClick={toggleDark}
              aria-label="Toggle dark mode"
            >
              {isDark
                ? <Sun  size={20} strokeWidth={2} className="nav-icon" />
                : <Moon size={20} strokeWidth={2} className="nav-icon" />
              }
              <span className="nav-label">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            {/* Settings */}
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `sidebar-nav-btn${isActive ? ' active' : ''}`
              }
              onClick={onClose}
            >
              <Settings size={20} strokeWidth={2} className="nav-icon" />
              <span className="nav-label">Settings</span>
            </NavLink>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
