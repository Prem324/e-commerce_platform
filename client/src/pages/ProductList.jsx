import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { Search, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';

const ProductList = () => {
  const [keyword, setKeyword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(keyword);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  const { products, loading, pages } = useProducts(searchTerm, page);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <AnimatedPage>
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
           <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Discover Products</h1>
           <p className="text-gray-500 mt-1">Found {products.length} incredible items for you</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative flex-grow md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products by title or category..."
              className="input pl-12 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-primary-500"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary flex items-center gap-2 py-3 px-5 border-2 border-gray-100 hover:border-primary-200">
            <SlidersHorizontal size={20} />
            <span className="font-bold">Filter</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card animate-pulse rounded-[32px]">
              <div className="aspect-square bg-gray-100" />
              <div className="p-6 space-y-4">
                <div className="h-5 bg-gray-100 rounded-full w-3/4" />
                <div className="h-4 bg-gray-100 rounded-full w-1/4" />
                <div className="flex justify-between items-center pt-2">
                    <div className="h-4 bg-gray-100 rounded-full w-1/3" />
                    <div className="h-4 bg-gray-100 rounded-full w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-32 bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
             <Search size={32} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No results found</h2>
          <p className="text-gray-500">We couldn't find anything matching "{searchTerm}". Try a different keyword.</p>
        </div>
      ) : (
        <>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
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
    </AnimatedPage>
  );
};

export default ProductList;
