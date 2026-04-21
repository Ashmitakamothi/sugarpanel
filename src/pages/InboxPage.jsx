import React from 'react';
import { Inbox } from 'lucide-react';

const InboxPage = () => (
  <div className="blank-page">
    <div className="blank-page-icon"><Inbox size={48} strokeWidth={1.5} /></div>
    <h1 className="blank-page-title">Inbox</h1>
    <p className="blank-page-sub">Messages and communication threads from your team will appear here.</p>
    <span className="blank-page-badge">Coming Soon</span>
  </div>
);

export default InboxPage;
