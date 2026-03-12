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
      className="card group flex flex-col h-full bg-white"
    >
      <Link to={`/product/${product._id}`} className="block relative aspect-[4/5] overflow-hidden bg-slate-50">
        <img
          src={product.images[0]?.url || 'https://via.placeholder.com/300'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Simple Badge */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-4 left-4 badge-ui bg-amber-100 text-amber-700">
            Low Stock
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-4 left-4 badge-ui bg-slate-100 text-slate-500">
            Out of Stock
          </div>
        )}

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="btn btn-primary shadow-xl scale-90 group-hover:scale-100 transition-transform">
               Quick View
            </div>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">{product.category}</p>
        <Link to={`/product/${product._id}`} className="text-lg font-bold text-slate-900 hover:text-primary-600 transition-colors line-clamp-1 mb-2">
          {product.title}
        </Link>
        <div className="text-xl font-bold text-slate-900 mb-4">{formatCurrency(product.price)}</div>
        
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <StarRating rating={product.ratings} numReviews={product.numReviews} />
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-10 h-10 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all disabled:opacity-20"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
