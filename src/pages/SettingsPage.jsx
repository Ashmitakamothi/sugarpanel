import React, { useState } from 'react';
import { Settings, Bell, Globe, Shield, Palette, User, ChevronRight } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';

const SettingsGroup = ({ title, icon: Icon, children }) => (
  <div className="settings-group">
    <div className="settings-group-header">
      <Icon size={20} strokeWidth={2} className="group-icon" />
      <h3>{title}</h3>
    </div>
    <div className="settings-group-content">{children}</div>
  </div>
);

const SettingsRow = ({ label, sub, children, icon: Icon }) => (
  <div className="settings-list-item">
    <div className="item-left">
      {Icon && <Icon size={18} className="item-icon" />}
      <div className="item-text">
        <span className="item-label">{label}</span>
        {sub && <span className="item-sub">{sub}</span>}
      </div>
    </div>
    <div className="item-right">{children}</div>
  </div>
);

const SettingsPage = () => {
  const { isDark, toggleDark } = useDarkMode();
  const [notifs, setNotifs] = useState({ email: true, push: false, sms: false });
  const [lang, setLang] = useState('en');
  const [activeAccent, setActiveAccent] = useState('#2563EB');

  return (
    <div className="settings-container">
      <header className="settings-header-minimal">
        <h1 className="settings-main-title">Settings</h1>
        <p className="settings-main-sub">Personalize your experience and account preferences</p>
      </header>

      <div className="settings-main-list">
        <SettingsGroup title="Appearance" icon={Palette}>
          <SettingsRow label="Dark Mode" sub="Toggle between light and dark themes">
            <label className="p-toggle">
              <input type="checkbox" checked={isDark} onChange={toggleDark} />
              <span className="p-slider" />
            </label>
          </SettingsRow>
          <SettingsRow label="Theme Accent" sub="Choose your primary dashboard color">
            <div className="accent-picker">
              {['#4F46E5','#2563EB','#059669','#DC2626','#D97706'].map(c => (
                <button 
                  key={c} 
                  className={`accent-dot ${activeAccent === c ? 'active' : ''}`} 
                  style={{ background: c }} 
                  aria-label={`Select ${c}`}
                  onClick={() => setActiveAccent(c)}
                />
              ))}
            </div>
          </SettingsRow>
        </SettingsGroup>

        <SettingsGroup title="Profile" icon={User}>
          <SettingsRow label="Display Name">
            <input className="settings-minimal-input" defaultValue="Ameerah Howard" />
          </SettingsRow>
          <SettingsRow label="Email Address">
            <input className="settings-minimal-input" defaultValue="ameerah@sugarpanel.io" type="email" />
          </SettingsRow>
        </SettingsGroup>

        <SettingsGroup title="Notifications" icon={Bell}>
          <SettingsRow label="Email Alerts" sub="Daily summary of your activity">
            <label className="p-toggle">
              <input type="checkbox" checked={notifs.email} onChange={() => setNotifs(n => ({...n, email: !n.email}))} />
              <span className="p-slider" />
            </label>
          </SettingsRow>
          <SettingsRow label="Push Notifications" sub="Real-time browser updates">
             <label className="p-toggle">
              <input type="checkbox" checked={notifs.push} onChange={() => setNotifs(n => ({...n, push: !n.push}))} />
              <span className="p-slider" />
            </label>
          </SettingsRow>
        </SettingsGroup>

        <SettingsGroup title="System" icon={Globe}>
          <SettingsRow label="Language">
            <div className="select-wrap">
              <select className="settings-minimal-select" value={lang} onChange={e => setLang(e.target.value)}>
                <option value="en">English (US)</option>
                <option value="hi">Hindi (India)</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
              <ChevronRight size={14} className="select-arrow" />
            </div>
          </SettingsRow>
        </SettingsGroup>

        <SettingsGroup title="Security" icon={Shield}>
          <SettingsRow label="Two-Factor Authentication" sub="Add an extra layer of security">
            <button className="settings-action-link">Enable</button>
          </SettingsRow>
          <SettingsRow label="Account Privacy" sub="Manage who can see your activity">
             <button className="settings-action-link">Configure</button>
          </SettingsRow>
        </SettingsGroup>
      </div>

      <footer className="settings-footer-actions">
        <button className="cancel-link">Discard Changes</button>
        <button className="save-prime-btn">Save Preferences</button>
      </footer>
    </div>
  );
};

export default SettingsPage;
