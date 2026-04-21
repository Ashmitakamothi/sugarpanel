import React from 'react';
import { Package } from 'lucide-react';

const ProductsPage = () => (
  <div className="blank-page">
    <div className="blank-page-icon"><Package size={48} strokeWidth={1.5} /></div>
    <h1 className="blank-page-title">Products</h1>
    <p className="blank-page-sub">Manage your product catalog, inventory, and pricing here.</p>
    <span className="blank-page-badge">Coming Soon</span>
  </div>
);

export default ProductsPage;
