import React, { useRef, useState } from 'react';
import { Search, RotateCcw, TrendingUp, SlidersHorizontal } from 'lucide-react';
import { useFilters } from '../context/FilterContext';

const allProducts = [
  { id: 1, name: 'Liam Anderson Red',      category: 'Electronics',   status: 'In Stock',     revenue: 1240.22, sales: '1,909', reviews: '2,102', views: '3,022', active: true  },
  { id: 2, name: 'Ava Reynolds Blue',       category: 'Clothing',      status: 'In Stock',     revenue: 980.00,  sales: '1,543', reviews: '1,780', views: '2,560', active: true  },
  { id: 3, name: 'Jackson White Blue',      category: 'Accessories',   status: 'Out of Stock', revenue: 450.50,  sales: '760',   reviews: '890',   views: '1,200', active: false },
  { id: 4, name: 'Bennett Reynolds Blue',   category: 'Home & Living', status: 'In Stock',     revenue: 1750.00, sales: '2,100', reviews: '3,000', views: '4,100', active: true  },
  { id: 5, name: 'Run Reynolds Blue',       category: 'Clothing',      status: 'Out of Stock', revenue: 320.00,  sales: '400',   reviews: '512',   views: '900',   active: false },
  { id: 6, name: 'Sofia Martinez Green',    category: 'Electronics',   status: 'In Stock',     revenue: 1895.00, sales: '2,300', reviews: '2,800', views: '5,000', active: true  },
  { id: 7, name: 'Emma Turner Silver',      category: 'Accessories',   status: 'In Stock',     revenue: 620.75,  sales: '1,050', reviews: '1,300', views: '2,100', active: true  },
  { id: 8, name: 'James Clarke Black',      category: 'Home & Living', status: 'Out of Stock', revenue: 199.99,  sales: '220',   reviews: '310',   views: '580',   active: false },
];

const ProductList = () => {
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const {
    selectedCategories,
    selectedStatus,
    priceRange,
    resetFilters,
    computeActiveCount,
  } = useFilters();

  const filtered = allProducts.filter(p => {
    const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchStatus   = selectedStatus === 'All' || p.status === selectedStatus;
    const matchPrice    = p.revenue >= priceRange[0] && p.revenue <= priceRange[1];
    const matchSearch   = searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchStatus && matchPrice && matchSearch;
  });

  const displayProducts = showAll ? filtered : filtered.slice(0, 6);

  const toggleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    if (checked) {
      setSelectedIds(filtered.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleProduct = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const activeCount = computeActiveCount();

  return (
    <div className="product-list-card">
      <h2 className="section-title">Product List</h2>

      <div className="prod-toolbar-shell">
        <div className="prod-toolbar-row">
          <div className="prod-stats">
            <span className="count">{filtered.length}</span>
            <span className="label">{filtered.length === 1 ? 'Item' : 'Items'}</span>
            {activeCount > 0 && (
              <span className="prod-filter-active-badge">
                <SlidersHorizontal size={11} strokeWidth={2.5} />
                {activeCount} filter{activeCount > 1 ? 's' : ''} active
              </span>
            )}
            {activeCount === 0 && (
              <span className="badge-up">
                <TrendingUp size={12} strokeWidth={2.5} aria-hidden="true" />
                +8.33%
              </span>
            )}
          </div>
          <div className="prod-toolbar-actions-top">
            <button 
              type="button" 
              className="prod-see-more-pill"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'See Less' : 'See More'}
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
              placeholder="Search products..."
              autoComplete="off"
              aria-label="Search products"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="prod-icon-circle prod-icon-circle--light"
            aria-label="Refresh"
            onClick={() => { setSearchQuery(''); resetFilters(); }}
          >
            <RotateCcw size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="prod-table-wrapper">
        {filtered.length === 0 ? (
          <div className="prod-empty-state">
            <SlidersHorizontal size={36} strokeWidth={1.5} />
            <p>No products match your filters.</p>
            <button
              type="button"
              className="prod-see-more-pill"
              onClick={() => { resetFilters(); setSearchQuery(''); }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <table className="prod-table">
            <thead>
              <tr>
                <th className="col-check">
                  <input
                    type="checkbox"
                    className="custom-check"
                    aria-label="Select all"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="col-name">Product Name</th>
                <th className="col-revenue">Revenue</th>
                <th className="col-sales">Sales</th>
                <th className="col-reviews">Reviews</th>
                <th className="col-views">Views</th>
                <th className="active-col col-active">Active</th>
              </tr>
            </thead>
            <tbody>
              {displayProducts.map(product => (
                <tr key={product.id} className={selectedIds.includes(product.id) ? 'selected-row' : ''}>
                  <td className="col-check" data-label="Select">
                    <input 
                      type="checkbox" 
                      className="custom-check" 
                      aria-label={`Select ${product.name}`} 
                      checked={selectedIds.includes(product.id)} 
                      onChange={() => toggleProduct(product.id)} 
                    />
                  </td>
                  <td className="col-name" data-label="Product">
                    <div className="prod-cell">
                      <div className="prod-thumb" />
                      <div className="prod-info">
                        <div className="p-name">{product.name}</div>
                        <div className={`p-status ${product.status === 'Out of Stock' ? 'p-status--out' : ''}`}>
                          {product.status}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-bold col-revenue" data-label="Revenue">${product.revenue.toFixed(2)}</td>
                  <td className="p-bold col-sales" data-label="Sales">{product.sales}</td>
                  <td className="p-muted col-reviews" data-label="Reviews">{product.reviews}</td>
                  <td className="p-muted col-views" data-label="Views">{product.views}</td>
                  <td className="active-col col-active" data-label="Active">
                    <label className="p-toggle">
                      <input type="checkbox" defaultChecked={product.active} onChange={() => {}} />
                      <span className="p-slider" />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductList;
