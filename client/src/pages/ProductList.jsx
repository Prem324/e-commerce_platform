import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { productService } from '../services/apiServices';
import { Search, SlidersHorizontal, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  
  const [keyword, setKeyword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(keyword);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  // Fetch categories
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

  const { products, loading, pages } = useProducts(searchTerm, page, categoryParam);

  const handleCategoryClick = (cat) => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
    setPage(1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <AnimatedPage>
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Sidebar Filters */}
      <aside className={`lg:w-64 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Categories</h3>
          <div className="flex flex-col space-y-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  (categoryParam === cat || (cat === 'All' && !categoryParam))
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-100 scale-[1.02]'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-primary-600'
                }`}
              >
                <span>{cat}</span>
                <ChevronRight size={16} className={(categoryParam === cat || (cat === 'All' && !categoryParam)) ? 'opacity-100' : 'opacity-0'} />
              </button>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Price Range</h3>
           <div className="space-y-4">
              <input type="range" className="w-full accent-primary-600" />
              <div className="flex justify-between text-xs font-bold text-gray-400">
                <span>$0</span>
                <span>$1000+</span>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              {categoryParam ? `${categoryParam}` : 'All Products'}
            </h1>
            <p className="text-gray-500 mt-1">Showing {products.length} premium results</p>
          </div>
          
          <div className="flex gap-2">
            <div className="relative flex-grow md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                className="input pl-12 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-primary-500"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-secondary flex lg:hidden items-center gap-2 py-3 px-5 border-2 border-gray-100 hover:border-primary-200"
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse rounded-[32px]">
                <div className="aspect-square bg-gray-100" />
                <div className="p-6 space-y-4">
                  <div className="h-5 bg-gray-100 rounded-full w-3/4" />
                  <div className="h-4 bg-gray-100 rounded-full w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
               <X size={32} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Nothing found</h2>
            <p className="text-gray-500">We couldn't find any products in this category.</p>
          </div>
        ) : (
          <>
            <motion.div 
              initial="hidden" animate="visible" variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                  {products.map((product) => (
                  <motion.div key={product._id} variants={itemVariants} layout>
                      <ProductCard product={product} />
                  </motion.div>
                  ))}
              </AnimatePresence>
            </motion.div>
            
            {pages > 1 && (
              <div className="mt-16 flex justify-center space-x-3">
                {[...Array(pages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => { setPage(i + 1); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                    className={`w-12 h-12 rounded-2xl font-bold transition-all ${
                      page === i + 1 
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-200 scale-110' 
                        : 'bg-white text-gray-400 border-2 border-gray-100 hover:border-primary-200 hover:text-primary-600'
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
