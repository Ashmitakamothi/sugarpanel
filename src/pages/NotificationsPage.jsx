import React from 'react';
import { Bell } from 'lucide-react';

const NotificationsPage = () => (
  <div className="blank-page">
    <div className="blank-page-icon"><Bell size={48} strokeWidth={1.5} /></div>
    <h1 className="blank-page-title">Notifications</h1>
    <p className="blank-page-sub">All your alerts, system messages, and activity notifications will appear here.</p>
    <span className="blank-page-badge">Coming Soon</span>
  </div>
);

export default NotificationsPage;
