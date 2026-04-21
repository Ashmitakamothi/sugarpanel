import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  ArrowUpDown,
  Download,
  Trash2,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const productsData = [
  { id: 1, name: 'Liam Anderson Red', category: 'Electronics', price: 1240.22, stock: 42, sales: 1909, status: 'Active', image: '' },
  { id: 2, name: 'Ava Reynolds Blue', category: 'Clothing', price: 980.00, stock: 12, sales: 1543, status: 'Active', image: '' },
  { id: 3, name: 'Jackson White Blue', category: 'Accessories', price: 450.50, stock: 0, sales: 760, status: 'Out of Stock', image: '' },
  { id: 4, name: 'Bennett Reynolds Blue', category: 'Home', price: 1750.00, stock: 84, sales: 2100, status: 'Active', image: '' },
  { id: 5, name: 'Run Reynolds Blue', category: 'Clothing', price: 320.00, stock: 0, sales: 400, status: 'Inactive', image: '' },
  { id: 6, name: 'Sofia Martinez Green', category: 'Electronics', price: 1895.00, stock: 23, sales: 2300, status: 'Active', image: '' },
  { id: 7, name: 'Emma Turner Silver', category: 'Accessories', price: 620.75, stock: 15, sales: 1050, status: 'Active', image: '' },
  { id: 8, name: 'James Clarke Black', category: 'Home', price: 199.99, stock: 0, sales: 220, status: 'Out of Stock', image: '' },
];

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = productsData.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="products-page-container">
      {/* Header Row */}
      <div className="p-page-header">
        <div className="p-header-left">
          <h1 className="p-title">Products</h1>
          <div className="p-count-pill">{filteredProducts.length} Total Products</div>
        </div>
        <div className="p-header-right">
          <button className="btn-secondary"><Download size={18} /> Export</button>
          <button className="btn-primary"><Plus size={18} /> Add Product</button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-toolbar">
        <div className="p-search-box">
          <Search size={18} className="p-search-icon" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="p-filter-group">
          <select 
            className="p-select" 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            <option value="Home">Home</option>
          </select>
          <button className="p-filter-btn"><Filter size={18} /> More Filters</button>
        </div>
      </div>

      {/* Product Table */}
      <div className="p-table-card card">
        <table className="p-main-table">
          <thead>
            <tr>
              <th className="col-check"><input type="checkbox" /></th>
              <th>Product Name <ArrowUpDown size={12} /></th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Sales</th>
              <th>Status</th>
              <th className="col-actions"></th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td className="col-check"><input type="checkbox" /></td>
                <td className="p-name-cell">
                  <div className="p-thumb-box" />
                  <div className="p-info">
                    <span className="p-name-text">{product.name}</span>
                    <span className="p-sku">SKU: PROD-00{product.id}</span>
                  </div>
                </td>
                <td>{product.category}</td>
                <td className="p-price-text">${product.price.toFixed(2)}</td>
                <td>
                  <span className={`p-stock-text ${product.stock === 0 ? 'out' : ''}`}>
                    {product.stock === 0 ? 'Out of Stock' : `${product.stock} in stock`}
                  </span>
                </td>
                <td>{product.sales}</td>
                <td>
                  <span className={`p-status-pill ${product.status.toLowerCase().replace(' ', '-')}`}>
                    {product.status}
                  </span>
                </td>
                <td className="col-actions">
                  <button className="p-action-btn"><MoreHorizontal size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Placeholder */}
      <div className="p-pagination">
        <span className="p-page-info">Showing 1 to {filteredProducts.length} of {filteredProducts.length} entries</span>
        <div className="p-page-controls">
          <button disabled>Previous</button>
          <button className="active">1</button>
          <button disabled>Next</button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
