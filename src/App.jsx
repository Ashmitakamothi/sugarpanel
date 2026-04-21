import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { FilterProvider } from './context/FilterContext';
import TopHeader from './components/TopHeader';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { StatCard, UpgradeBanner } from './components/StatCard';
import { TransactionActivity, SalePerformance, OrdersByTime, ProductStatics } from './components/Charts';
import ProductList from './components/ProductList';
import RightPanel from './components/RightPanel';
import ConversionRate from './components/ConversionRate';

// Pages
import AnalyticsPage      from './pages/AnalyticsPage';
import ProductsPage       from './pages/ProductsPage';
import CustomersPage      from './pages/CustomersPage';
import NotificationsPage  from './pages/NotificationsPage';
import InboxPage          from './pages/InboxPage';
import PagesPage          from './pages/PagesPage';
import ReportsPage        from './pages/ReportsPage';
import SettingsPage       from './pages/SettingsPage';

import './App.css';

/* ── Dashboard (index) ─────────────────────────────────────── */
const DashboardPage = () => (
  <FilterProvider>
    <Header />
    <div className="dashboard-content-area">
      {/* TIER 1 */}
      <div className="stats-grid">
        <UpgradeBanner />
        <StatCard title="Gross Revenue"    value="$2,480.32" change="+8.33%" />
        <StatCard title="Avg. Order Value" value="$320.21"   change="-8.33%" />
        <StatCard title="Total Orders"     value="$1,899.49" change="+8.33%" />
      </div>

      {/* TIER 2 */}
      <div className="main-grid-layout">
        <div className="charts-column">
          <div className="charts-grid-row">
            <TransactionActivity />
            <SalePerformance />
          </div>
          <div className="charts-grid-row">
            <OrdersByTime />
            <ProductStatics />
          </div>
        </div>
        <div className="schedule-column">
          <RightPanel />
        </div>
      </div>

      {/* TIER 3 */}
      <div className="bottom-tier">
        <div className="store-row full-width">
          {['New York Store', 'Los Angeles Store', 'Chicago Store', 'Houston Store'].map(store => (
            <div key={store} className="store-card">
              <div className="store-header">
                <h4>{store}</h4>
                <span className="see-more">See More <ChevronRight size={14} strokeWidth={2} /></span>
              </div>
              <div className="store-stats">
                <div className="perf">
                  <span className="label">Performance Seller - 75%</span>
                  <span className="members">12 Active Members</span>
                </div>
                <div className="avatars">
                  <div className="avatar" /><div className="avatar" /><div className="avatar" />
                  <span className="plus">+9</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="product-conversion-row">
          <div className="product-block"><ProductList /></div>
          <div className="conversion-block"><ConversionRate /></div>
        </div>
      </div>
    </div>
  </FilterProvider>
);

/* ── App Shell ─────────────────────────────────────────────── */
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-wrapper">
      {/* Background */}
      <div className="dashboard-background" aria-hidden="true">
        <div className="dashboard-bg-base" />
        <div className="dashboard-bg-ornament dashboard-bg-ornament--accent" />
        <div className="dashboard-bg-ornament dashboard-bg-ornament--primary" />
        <div className="dashboard-bg-overlay" />
      </div>

      <TopHeader onMenuToggle={() => setSidebarOpen(true)} />

      <div className="dashboard-container">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className={`main-content ${sidebarOpen ? 'sidebar-active' : ''}`}>
          <Routes>
            <Route path="/"              element={<DashboardPage />} />
            <Route path="/analytics"     element={<AnalyticsPage />} />
            <Route path="/products"      element={<ProductsPage />} />
            <Route path="/customers"     element={<CustomersPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/inbox"         element={<InboxPage />} />
            <Route path="/pages"         element={<PagesPage />} />
            <Route path="/reports"       element={<ReportsPage />} />
            <Route path="/settings"      element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
