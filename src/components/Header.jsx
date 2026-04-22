import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Calendar, 
  FileDown, 
  SlidersHorizontal,
  FileText,
  Table,
  Check,
  Clock,
  X
} from 'lucide-react';
import { exportToCSV, exportToExcel, exportToPDF } from '../utils/exportUtils';
import { useFilters, CATEGORIES, STATUSES, PRICE_MIN, PRICE_MAX } from '../context/FilterContext';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const { language, t } = useLanguage();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedDate, setSelectedDate] = useState('Date');
  const [customRange, setCustomRange] = useState({ start: '', end: '' });
  const [localPrice, setLocalPrice] = useState([PRICE_MIN, PRICE_MAX]);
  const searchInputRef = useRef(null);
  const headerRef = useRef(null);

  const {
    selectedCategories,
    selectedStatus,
    setSelectedStatus,
    priceRange,
    setPriceRange,
    toggleCategory,
    resetFilters,
    computeActiveCount,
  } = useFilters();

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleApplyRange = () => {
    if (customRange.start && customRange.end) {
      const start = new Date(customRange.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const end = new Date(customRange.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      setSelectedDate(`${start} - ${end}`);
    }
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dateOptions = [
    'Today',
    'Yesterday',
    'Last 7 Days',
    'Last 30 Days',
    'This Month',
    'Custom Range'
  ];

  const exportOptions = [
    { name: 'Export as PDF', icon: FileText },
    { name: 'Export as CSV', icon: Table },
    { name: 'Export as Excel', icon: Table }
  ];

  const getExportFileName = () => {
    const safeDate =
      selectedDate && selectedDate !== 'Date'
        ? String(selectedDate).replaceAll('/', '-').replaceAll(' ', '_')
        : 'All_Time';
    const stamp = new Date().toISOString().slice(0, 10);
    return `SugarPanel_Report_${safeDate}_${stamp}`;
  };

  const getExportData = () => ([
    { Metric: 'Gross Revenue', Value: '$2,480.32', Change: '+8.33%' },
    { Metric: 'Avg. Order Value', Value: '$320.21', Change: '-8.33%' },
    { Metric: 'Total Orders', Value: '$1,899.49', Change: '+8.33%' },
    { Metric: 'Selected Date Range', Value: selectedDate || 'Date', Change: '' },
  ]);

  const handleExport = (formatName) => {
    const fileName = getExportFileName();
    const data = getExportData();

    switch (formatName) {
      case 'Export as PDF':
        exportToPDF(data, fileName);
        break;
      case 'Export as CSV':
        exportToCSV(data, fileName);
        break;
      case 'Export as Excel':
        exportToExcel(data, fileName);
        break;
      default:
        break;
    }

    setActiveDropdown(null);
  };

  return (
    <header className="header" aria-label="Dashboard header" ref={headerRef}>
      <div className="header-left">
        <div className="header-welcome-text">
          <h1 className="welcome-title">{t('welcomeBack')} Ameerah Howard</h1>
          <p className="header-subtitle">
            <span className="header-subtitle-muted">{language === 'HI' ? '' : 'You have '}</span>
            <button type="button" className="header-subtitle-em" data-tooltip="View Notifications">
              2 {t('unreadNotifications')}
            </button>
            <span className="header-subtitle-muted"> {t('notifications')}</span>
          </p>
        </div>
      </div>

      <div className="header-right">
        <div className="search-bar">
          <Search size={18} strokeWidth={2.5} className="search-icon" aria-hidden="true" />
          <input 
            ref={searchInputRef}
            type="search" 
            placeholder={t('search')} 
            autoComplete="off" 
            aria-label="Search" 
          />
          <div className="shortcut-hint">
            <span className="cmd-icon">⌘</span>
            <span className="plus-icon">+</span>
            <span className="key-icon">K</span>
          </div>
        </div>

        {/* Date Selection */}
        <div className="dropdown-container">
          <button
            type="button"
            className={`header-date-btn ${activeDropdown === 'date' ? 'active' : ''}`}
            onClick={() => toggleDropdown('date')}
            aria-label="Date"
            data-tooltip="Select Date Range"
          >
            <span className="header-date-label">{selectedDate}</span>
            <Calendar size={18} strokeWidth={2.5} className="btn-right-icon" aria-hidden="true" />
          </button>

          {activeDropdown === 'date' && (
            <div className="dropdown-menu date-dropdown">
              <div className="dropdown-header">Select Range</div>
              <div className="dropdown-scroll">
                {dateOptions.map(option => (
                  <button 
                    key={option} 
                    className={`dropdown-item ${selectedDate === option ? 'selected' : ''}`}
                    onClick={() => { 
                      if (option !== 'Custom Range') {
                        setSelectedDate(option); 
                        setActiveDropdown(null); 
                      } else {
                        setSelectedDate('Custom Range');
                      }
                    }}
                  >
                    <Clock size={14} className="item-icon" />
                    <span>{option}</span>
                    {selectedDate === option && option !== 'Custom Range' && <Check size={14} className="check-icon" />}
                  </button>
                ))}
              </div>
              
              {selectedDate === 'Custom Range' && (
                <div className="custom-date-inputs">
                  <div className="input-group">
                    <label>Start</label>
                    <input 
                      type="date" 
                      className="date-input" 
                      value={customRange.start}
                      onChange={(e) => setCustomRange({ ...customRange, start: e.target.value })}
                    />
                  </div>
                  <div className="input-group">
                    <label>End</label>
                    <input 
                      type="date" 
                      className="date-input" 
                      value={customRange.end}
                      onChange={(e) => setCustomRange({ ...customRange, end: e.target.value })}
                    />
                  </div>
                  <button 
                    type="button" 
                    className="dropdown-footer" 
                    style={{ width: '100%', marginTop: '8px', cursor: (customRange.start && customRange.end) ? 'pointer' : 'not-allowed', opacity: (customRange.start && customRange.end) ? 1 : 0.6 }}
                    onClick={handleApplyRange}
                    disabled={!customRange.start || !customRange.end}
                  >
                    Apply Range
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Export Options */}
        <div className="dropdown-container">
          <button 
            type="button" 
            className={`header-export-btn ${activeDropdown === 'export' ? 'active' : ''}`}
            onClick={() => toggleDropdown('export')}
            aria-label="Export Document"
            data-tooltip="Download Report"
          >
            <span className="header-export-label">{t('exportDocument')}</span>
            <FileDown size={18} strokeWidth={2.5} className="btn-right-icon" aria-hidden="true" />
          </button>

          {activeDropdown === 'export' && (
            <div className="dropdown-menu export-dropdown">
              <div className="dropdown-header">Export Format</div>
              {exportOptions.map(opt => (
                <button
                  key={opt.name}
                  className="dropdown-item"
                  onClick={() => handleExport(opt.name)}
                >
                  <opt.icon size={14} className="item-icon" />
                  <span>{opt.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter Menu */}
        <div className="dropdown-container">
          <button 
            type="button" 
            className={`header-menu-btn ${activeDropdown === 'filter' ? 'active' : ''}`}
            onClick={() => {
              if (activeDropdown !== 'filter') setLocalPrice([...priceRange]);
              toggleDropdown('filter');
            }}
            aria-label="Filter"
            data-tooltip="Filter Data"
          >
            <SlidersHorizontal size={18} strokeWidth={2.5} aria-hidden="true" />
            {computeActiveCount() > 0 && (
              <span className="filter-badge">{computeActiveCount()}</span>
            )}
          </button>

          {activeDropdown === 'filter' && (
            <div className="dropdown-menu filter-dropdown">
              {/* Header row */}
              <div className="filter-dropdown-header">
                <span className="filter-dropdown-title">Filters</span>
                {computeActiveCount() > 0 && (
                  <button
                    type="button"
                    className="filter-reset-btn"
                    onClick={resetFilters}
                  >
                    <X size={12} /> Reset
                  </button>
                )}
              </div>

              {/* Category */}
              <div className="filter-section">
                <div className="filter-section-label">Category</div>
                <div className="filter-check-group">
                  {CATEGORIES.map(cat => (
                    <label key={cat} className="filter-check-item">
                      <input
                        type="checkbox"
                        className="filter-checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                      />
                      <span className="filter-check-box">
                        {selectedCategories.includes(cat) && <Check size={10} strokeWidth={3} />}
                      </span>
                      <span className="filter-check-label">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-divider" />

              {/* Status */}
              <div className="filter-section">
                <div className="filter-section-label">Status</div>
                <div className="filter-radio-group">
                  {STATUSES.map(s => (
                    <label key={s} className="filter-radio-item">
                      <input
                        type="radio"
                        name="filter-status"
                        className="filter-radio"
                        checked={selectedStatus === s}
                        onChange={() => setSelectedStatus(s)}
                      />
                      <span className={`filter-radio-dot ${selectedStatus === s ? 'checked' : ''}`} />
                      <span className="filter-check-label">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-divider" />

              {/* Price Range */}
              <div className="filter-section">
                <div className="filter-section-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Price Range</span>
                  <span className="filter-price-display">${localPrice[0]} – ${localPrice[1]}</span>
                </div>
                <div className="filter-range-track">
                  <div
                    className="filter-range-fill"
                    style={{
                      left: `${((localPrice[0] - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
                      width: `${((localPrice[1] - localPrice[0]) / (PRICE_MAX - PRICE_MIN)) * 100}%`
                    }}
                  />
                </div>
                <div className="filter-range-inputs">
                  <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={50}
                    value={localPrice[0]}
                    className="filter-range"
                    onChange={e => {
                      const val = Math.min(Number(e.target.value), localPrice[1] - 50);
                      setLocalPrice([val, localPrice[1]]);
                    }}
                  />
                  <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={50}
                    value={localPrice[1]}
                    className="filter-range"
                    onChange={e => {
                      const val = Math.max(Number(e.target.value), localPrice[0] + 50);
                      setLocalPrice([localPrice[0], val]);
                    }}
                  />
                </div>
                <div className="filter-range-labels">
                  <span>${PRICE_MIN}</span>
                  <span>${PRICE_MAX}</span>
                </div>
              </div>

              {/* Apply */}
              <button
                type="button"
                className="filter-apply-btn"
                onClick={() => {
                  setPriceRange(localPrice);
                  setActiveDropdown(null);
                }}
              >
                Apply Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;

