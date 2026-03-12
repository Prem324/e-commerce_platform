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
  const maxPriceParam = Number(searchParams.get('maxPrice')) || 200000;
  
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
    maxPriceParam
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
    updateFilters({ category: cat, search: '', page: 1 });
    setKeyword('');
  };

  const clearFilters = () => {
    setSearchParams({});
    setKeyword('');
  };

  const hasActiveFilters = categoryParam !== 'All' || keywordParam || maxPriceParam < 200000;

  return (
    <AnimatedPage>
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-4 md:mt-8">
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
      <aside className={`lg:w-64 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-400" />
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Filters</h3>
          </div>
          {hasActiveFilters && (
            <button 
              onClick={clearFilters}
              className="text-[10px] font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1 uppercase tracking-tighter"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          )}
        </div>

        <div>
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Categories</h4>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  categoryParam === cat
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{cat}</span>
                <ChevronRight size={14} className={categoryParam === cat ? 'opacity-100' : 'opacity-0'} />
              </button>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100">
           <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">Price Range</h4>
           <div className="space-y-4">
              <input 
                type="range" 
                min="0"
                max="200000"
                step="5000"
                value={maxPriceParam}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600" 
              />
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>₹0</span>
                <span className="text-primary-600 px-3 py-1 bg-primary-50 rounded-lg">Up to {formatCurrency(maxPriceParam)}</span>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-10">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight capitalize">
              {categoryParam !== 'All' ? categoryParam : keywordParam ? `Results for "${keywordParam}"` : 'All Products'}
            </h1>
            <p className="text-sm text-slate-500 mt-1">Found {products.length} items matching your criteria</p>
          </div>
          
          <form onSubmit={handleSearchSubmit} className="relative w-72">
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
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
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
