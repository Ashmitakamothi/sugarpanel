import React from 'react';
import { Search, RotateCcw, ChevronRight } from 'lucide-react';


const products = [
  { id: 1, name: 'Liam Anderson Red', status: 'In Stock', revenue: '$1240.22', sales: '1,909', reviews: '2,102', views: '3,022', active: true },
  { id: 2, name: 'Ava Reynolds Blue', status: 'In Stock', revenue: '$1240.22', sales: '1,909', reviews: '2,102', views: '3,022', active: true },
  { id: 3, name: 'Jackson White Blue', status: 'In Stock', revenue: '$1240.22', sales: '1,909', reviews: '2,102', views: '3,022', active: true },
  { id: 4, name: 'Bennett Reynolds Blue', status: 'In Stock', revenue: '$1240.22', sales: '1,909', reviews: '2,102', views: '3,022', active: true },
  { id: 5, name: 'Run Reynolds Blue', status: 'In Stock', revenue: '$1240.22', sales: '1,909', reviews: '2,102', views: '3,022', active: true },
];

const ProductList = () => {
  return (
    <div className="product-list-card">
      <h2 className="section-title">Product List</h2>
      <div className="prod-header">

        <div className="prod-stats">
          <span className="count">3280</span> <span className="label">Item</span>
          <span className="badge-up">+8.33%</span>
        </div>
        <div className="prod-actions">
          <button className="see-more-btn">See More</button>
          <button className="icon-action"><Search size={20}/></button>
        </div>
      </div>

      <div className="prod-search-row">
        <div className="search-box">
          <Search size={16} className="s-icon" />
          <input type="text" placeholder="Search..." />
        </div>
        <button className="refresh-btn-circle"><RotateCcw size={18}/></button>
      </div>

      <div className="prod-table-wrapper">
        <table className="prod-table">
          <thead>
            <tr>
              <th><input type="checkbox" className="custom-check" /></th>
              <th>Product Name</th>
              <th>Revenue</th>
              <th>Sales</th>
              <th>Reviews</th>
              <th>Views</th>
              <th className="active-col">Active</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td><input type="checkbox" className="custom-check" /></td>
                <td>
                  <div className="prod-cell">
                    <div className="prod-thumb"></div>
                    <div className="prod-info">
                      <div className="p-name">{product.name}</div>
                      <div className="p-status">{product.status}</div>
                    </div>
                  </div>
                </td>
                <td className="p-bold">{product.revenue}</td>
                <td className="p-bold">{product.sales}</td>
                <td className="p-muted">{product.reviews}</td>
                <td className="p-muted">{product.views}</td>
                <td className="active-col">
                  <label className="p-toggle">
                    <input type="checkbox" defaultChecked={product.active} />
                    <span className="p-slider"></span>
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
