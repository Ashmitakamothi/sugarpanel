import React, { useRef } from 'react';
import { Search, RotateCcw, TrendingUp } from 'lucide-react';


const products = [
  { id: 1, name: 'Liam Anderson Red', status: 'In Stock', revenue: '$1240.22', sales: '1,909', reviews: '2,102', views: '3,022', active: true },
  { id: 2, name: 'Ava Reynolds Blue', status: 'In Stock', revenue: '$1240.22', sales: '1,909', reviews: '2,102', views: '3,022', active: true },
  { id: 3, name: 'Jackson White Blue', status: 'In Stock', revenue: '$1240.22', sales: '1,909', reviews: '2,102', views: '3,022', active: true },
  { id: 4, name: 'Bennett Reynolds Blue', status: 'In Stock', revenue: '$1240.22', sales: '1,909', reviews: '2,102', views: '3,022', active: true },
  { id: 5, name: 'Run Reynolds Blue', status: 'In Stock', revenue: '$1240.22', sales: '1,909', reviews: '2,102', views: '3,022', active: true },
];

const ProductList = () => {
  const searchInputRef = useRef(null);

  return (
    <div className="product-list-card">
      <h2 className="section-title">Product List</h2>

      <div className="prod-toolbar-shell">
        <div className="prod-toolbar-row">
          <div className="prod-stats">
            <span className="count">3280</span>
            <span className="label">Item</span>
            <span className="badge-up">
              <TrendingUp size={12} strokeWidth={2.5} aria-hidden="true" />
              +8.33%
            </span>
          </div>
          <div className="prod-toolbar-actions-top">
            <button type="button" className="prod-see-more-pill">
              See More
            </button>
            <button
              type="button"
              className="prod-icon-circle prod-icon-circle--light"
              aria-label="Search"
              onClick={() => searchInputRef.current?.focus()}
            >
              <Search size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="prod-toolbar-row prod-toolbar-row--search">
          <div className="search-box prod-main-search prod-search-pill">
            <Search size={16} strokeWidth={2} className="s-icon" aria-hidden="true" />
            <input
              ref={searchInputRef}
              type="search"
              placeholder="Search..."
              autoComplete="off"
              aria-label="Search products"
            />
          </div>
          <button type="button" className="prod-icon-circle prod-icon-circle--light" aria-label="Refresh">
            <RotateCcw size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="prod-table-wrapper">
        <table className="prod-table">
          <thead>
            <tr>
              <th className="col-check"><input type="checkbox" className="custom-check" aria-label="Select all" /></th>
              <th className="col-name">Product Name</th>
              <th className="col-revenue">Revenue</th>
              <th className="col-sales">Sales</th>
              <th className="col-reviews">Reviews</th>
              <th className="col-views">Views</th>
              <th className="active-col col-active">Active</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td className="col-check" data-label="Select"><input type="checkbox" className="custom-check" aria-label={`Select ${product.name}`} /></td>
                <td className="col-name" data-label="Product">
                  <div className="prod-cell">
                    <div className="prod-thumb" />
                    <div className="prod-info">
                      <div className="p-name">{product.name}</div>
                      <div className="p-status">{product.status}</div>
                    </div>
                  </div>
                </td>
                <td className="p-bold col-revenue" data-label="Revenue">{product.revenue}</td>
                <td className="p-bold col-sales" data-label="Sales">{product.sales}</td>
                <td className="p-muted col-reviews" data-label="Reviews">{product.reviews}</td>
                <td className="p-muted col-views" data-label="Views">{product.views}</td>
                <td className="active-col col-active" data-label="Active">
                  <label className="p-toggle">
                    <input type="checkbox" defaultChecked={product.active} />
                    <span className="p-slider" />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
