import React, { createContext, useContext, useState } from 'react';

export const CATEGORIES = ['Electronics', 'Clothing', 'Accessories', 'Home & Living'];
export const STATUSES = ['All', 'In Stock', 'Out of Stock'];
export const PRICE_MIN = 0;
export const PRICE_MAX = 2000;

const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX]);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedStatus('All');
    setPriceRange([PRICE_MIN, PRICE_MAX]);
  };

  const computeActiveCount = () => {
    let count = 0;
    if (selectedCategories.length > 0) count++;
    if (selectedStatus !== 'All') count++;
    if (priceRange[0] !== PRICE_MIN || priceRange[1] !== PRICE_MAX) count++;
    return count;
  };

  return (
    <FilterContext.Provider value={{
      selectedCategories,
      selectedStatus,
      setSelectedStatus,
      priceRange,
      setPriceRange,
      toggleCategory,
      resetFilters,
      computeActiveCount,
    }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilters must be used within FilterProvider');
  return ctx;
};
