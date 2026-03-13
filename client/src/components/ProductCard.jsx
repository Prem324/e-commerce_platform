import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { formatCurrency } from '../utils/formatters';
import StarRating from './StarRating';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success('Added to cart');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card group flex flex-col h-full bg-white dark:bg-slate-900"
    >
      <Link to={`/product/${product._id}`} className="block relative aspect-[4/5] overflow-hidden bg-white dark:bg-slate-950 px-2 sm:px-4 pt-2 sm:pt-4">
        <img
          src={product.images[0]?.url || 'https://via.placeholder.com/300'}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Simple Badge */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 badge-ui bg-amber-100 text-amber-700 scale-75 sm:scale-100 origin-top-left">
            Low Stock
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 badge-ui bg-slate-100 text-slate-500 scale-75 sm:scale-100 origin-top-left">
            Out of Stock
          </div>
        )}


      </Link>
      
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <p className="text-[8px] sm:text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 sm:mb-1.5">{product.category}</p>
        <Link to={`/product/${product._id}`} className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-1 mb-1 sm:mb-1.5">
          {product.title}
        </Link>
        <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">{formatCurrency(product.price)}</div>
        
        <div className="mt-auto pt-2 sm:pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <div className="scale-90 sm:scale-100 origin-left">
            <StarRating rating={product.ratings} numReviews={product.numReviews} />
          </div>
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all disabled:opacity-20 flex-shrink-0"
          >
            <ShoppingCart size={14} className="sm:hidden" />
            <ShoppingCart size={18} className="hidden sm:block" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
