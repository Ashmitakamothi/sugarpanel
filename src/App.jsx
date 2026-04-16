import React, { useState } from 'react';
import TopHeader from './components/TopHeader';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { StatCard, UpgradeBanner } from './components/StatCard';
import { TransactionActivity, SalePerformance, OrdersByTime, ProductStatics } from './components/Charts';
import ProductList from './components/ProductList';
import RightPanel from './components/RightPanel';
import ConversionRate from './components/ConversionRate';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-wrapper">
      <TopHeader onMenuToggle={() => setSidebarOpen(true)} />
      <div className="dashboard-container">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="main-content">
          <Header />
          
          <div className="dashboard-content-area">
            {/* TIER 1: Top Row Stats - Spans Full Width */}
            <div className="stats-grid">
              <UpgradeBanner />
              <StatCard 
                title="Gross Revenue" 
                value="$2,480.32" 
                change="+8.33%" 
                color="#10B981" 
              />
              <StatCard 
                title="Avg. Order Value" 
                value="$320.21" 
                change="-8.33%" 
                color="#EF4444" 
              />
              <StatCard 
                title="Total Orders" 
                value="$1,899.49" 
                change="+8.33%" 
                color="#10B981" 
              />
            </div>

            {/* TIER 2: Middle Integrated Layout: Charts + Schedule */}
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

            {/* TIER 3: Bottom Unified Card Section (Stores above, Unified Card below) */}
            <div className="bottom-tier">
              {/* Store Performance Row - Full Width */}
              <div className="store-row full-width">
                {['New York Store', 'Los Angeles Store', 'Chicago Store', 'Houston Store'].map(store => (
                  <div key={store} className="store-card">
                    <div className="store-header">
                      <h4>{store}</h4>
                      <span className="see-more">See More</span>
                    </div>
                    <div className="store-stats">
                      <div className="perf">
                        <span className="label">Performance Seller - 78%</span>
                        <span className="members">12 Active Members</span>
                      </div>
                      <div className="avatars">
                        <div className="avatar"></div>
                        <div className="avatar"></div>
                        <div className="avatar"></div>
                        <span className="plus">+9</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Separate Product and Conversion Cards */}
              <div className="product-conversion-row">
                <div className="product-block">
                  <ProductList />
                </div>
                <div className="conversion-block">
                  <ConversionRate />
                </div>
              </div>
            </div>


          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
