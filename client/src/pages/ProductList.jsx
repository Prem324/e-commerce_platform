import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { productService } from '../services/apiServices';
import { Search, SlidersHorizontal, ChevronRight, X, Filter, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { formatCurrency } from '../utils/formatters';

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Current filter state from URL
  const categoryParam = searchParams.get('category') || 'All';
  const keywordParam = searchParams.get('search') || '';
  const pageParam = Number(searchParams.get('page')) || 1;
  const maxPriceParam = Number(searchParams.get('maxPrice')) || 1000000;
  const sortParam = searchParams.get('sort') || '';
  
  const [keyword, setKeyword] = useState(keywordParam);
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Sync keyword state with URL (e.g. when searching from Navbar)
  useEffect(() => {
    setKeyword(keywordParam);
  }, [keywordParam]);

  // Fetch categories once
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const { data } = await productService.getCategories();
        setCategories(['All', ...data]);
      } catch (err) {
        console.error('Failed to fetch categories');
      }
    };
    fetchCats();
  }, []);

  // Main data fetching hook
  const { products, loading, pages } = useProducts(
    keywordParam, 
    pageParam, 
    categoryParam === 'All' ? '' : categoryParam, 
    0, 
    maxPriceParam,
    sortParam
  );

  const updateFilters = (updates) => {
    const params = new URLSearchParams(searchParams);
    
    // Default: Reset page when filters change
    if (!updates.page) params.delete('page');

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || value === 'All') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilters({ search: keyword, page: 1 });
  };

  const handlePriceChange = (value) => {
    updateFilters({ maxPrice: value, page: 1 });
  };

  const handleCategoryClick = (cat) => {
    updateFilters({ category: cat, search: '', page: 1, sort: '' });
    setKeyword('');
  };

  const clearFilters = () => {
    setSearchParams({});
    setKeyword('');
  };

  const hasActiveFilters = categoryParam !== 'All' || keywordParam || maxPriceParam < 1000000;

  return (
    <AnimatedPage>
    <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 mt-4 md:mt-8 min-h-screen">
      {/* Mobile Search & Filter */}
      <div className="lg:hidden flex gap-2">
        <form onSubmit={handleSearchSubmit} className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            className="input-field pl-12 py-3"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </form>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`btn btn-secondary !px-4 ${hasActiveFilters ? 'border-primary-500 text-primary-600' : ''}`}
        >
          <SlidersHorizontal size={20} />
        </button>
      </div>

      {/* Sidebar Filters */}
      <aside className={`lg:w-72 lg:min-w-[18rem] lg:shrink-0 lg:sticky lg:top-24 space-y-10 ${showFilters ? 'fixed inset-0 z-50 bg-white dark:bg-slate-950 p-6 overflow-y-auto lg:relative lg:inset-auto lg:p-0 lg:bg-transparent lg:dark:bg-transparent lg:overflow-visible lg:block' : 'hidden lg:block'}`}>
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Filter size={20} className="text-primary-600" />
            Filters
          </h2>
          <button onClick={() => setShowFilters(false)} className="p-2 text-slate-400">
            <X size={24} />
          </button>
        </div>

        {/* Filter Section: Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 dark:text-primary-400">
              <SlidersHorizontal size={16} />
            </div>
            <h3 className="text-[13px] font-bold text-slate-900 dark:text-white uppercase tracking-[0.1em]">Browse Filters</h3>
          </div>
          {hasActiveFilters && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={clearFilters}
              className="text-[11px] font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1.5 uppercase tracking-wider group px-3 py-1.5 bg-primary-50 dark:bg-primary-900/10 rounded-full transition-all"
            >
              <RotateCcw size={12} className="group-hover:rotate-[-45deg] transition-transform" />
              Reset
            </motion.button>
          )}
        </div>

        {/* Categories Section */}
        <div className="space-y-5">
          <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-1 h-3 bg-primary-500 rounded-full"></span>
            Categories
          </h4>
          <div className="grid grid-cols-1 gap-1.5">
            {categories.map((cat) => (
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                key={cat}
                onClick={() => {
                  handleCategoryClick(cat);
                  if (window.innerWidth < 1024) setShowFilters(false);
                }}
                className={`group w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all border ${
                  categoryParam === cat
                    ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-200 dark:shadow-none'
                    : 'bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-primary-200 dark:hover:border-primary-900/30 hover:text-primary-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    categoryParam === cat ? 'bg-primary-400' : 'bg-slate-200 dark:bg-slate-700 group-hover:bg-primary-400'
                  }`} />
                  <span>{cat}</span>
                </div>
                {categoryParam === cat && <ChevronRight size={14} className="opacity-100" />}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Price Ranger Section */}
        <div className="space-y-6 pt-8 border-t border-slate-100 dark:border-slate-800/50">
           <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
             <span className="w-1 h-3 bg-primary-500 rounded-full"></span>
             Price Limit
           </h4>
           <div className="p-6 bg-slate-50 dark:bg-slate-900/30 rounded-[2rem] border border-slate-100 dark:border-slate-800">
              <div className="space-y-4">
                <div className="flex justify-between items-end mb-1">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Budget</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(maxPriceParam)}</span>
                  </div>
                  <span className="text-[10px] font-bold text-primary-600 bg-primary-100 dark:bg-primary-900/30 px-2 py-0.5 rounded">MAX</span>
                </div>
                
                <input 
                  type="range" 
                  min="0"
                  max="1000000"
                  step="10000"
                  value={maxPriceParam}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-600" 
                />
                
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  <span>FREE</span>
                  <span>{formatCurrency(1000000)}</span>
                </div>
              </div>
           </div>
        </div>

        {/* Sort Section (Integrated in Filters for Mobile/Desktop clean look) */}
        <div className="space-y-5 pt-8 border-t border-slate-100 dark:border-slate-800/50">
          <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-1 h-3 bg-primary-500 rounded-full"></span>
            Sort By
          </h4>
          <div className="grid grid-cols-1 gap-1.5">
            {[
              { id: 'newest', label: 'Latest Arrivals' },
              { id: 'trending', label: 'Popularity' },
              { id: 'priceLow', label: 'Price: Low to High' },
              { id: 'priceHigh', label: 'Price: High to Low' }
            ].map((sort) => (
              <button
                key={sort.id}
                onClick={() => updateFilters({ sort: sort.id, page: 1 })}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all border ${
                  sortParam === sort.id || (!sortParam && sort.id === 'newest')
                    ? 'bg-primary-50 dark:bg-primary-900/10 border-primary-100 dark:border-primary-900/20 text-primary-600'
                    : 'bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                   (sortParam === sort.id || (!sortParam && sort.id === 'newest'))
                   ? 'border-primary-600' 
                   : 'border-slate-300 dark:border-slate-700'
                }`}>
                  {(sortParam === sort.id || (!sortParam && sort.id === 'newest')) && (
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
                  )}
                </div>
                <span>{sort.label}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10 min-h-[80px]">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              key={categoryParam + keywordParam}
              className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight capitalize"
            >
              {categoryParam !== 'All' ? categoryParam : keywordParam ? `Results for "${keywordParam}"` : 'All Products'}
            </motion.h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Found {products.length} items matching your criteria</p>
          </div>
          
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search in results..."
              className="input-field pl-11 py-2.5 text-sm"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </form>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-slate-50 rounded-3xl aspect-[4/5]" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
               <X size={32} className="text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No items found</h2>
            <p className="text-slate-500">Try broadening your search or resetting filters.</p>
            <button onClick={clearFilters} className="btn btn-secondary mt-8 mx-auto">
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start"
            >
              <AnimatePresence>
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </AnimatePresence>
            </motion.div>
            
            {pages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-2">
                {[...Array(pages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => updateFilters({ page: i + 1 })}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                      pageParam === i + 1 
                        ? 'bg-primary-600 text-white shadow-md' 
                        : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
    </AnimatedPage>
  );
};

export default ProductList;
