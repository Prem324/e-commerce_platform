import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div className="card group">
      <Link to={`/product/${product._id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images[0]?.url || 'https://via.placeholder.com/300'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <button 
             onClick={handleAddToCart}
             className="p-2 bg-white rounded-full shadow-lg text-primary-600 hover:bg-primary-600 hover:text-white transition-colors"
           >
             <ShoppingCart size={18} />
           </button>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <Link to={`/product/${product._id}`} className="text-gray-900 font-semibold truncate flex-1 hover:text-primary-600 transition-colors">
            {product.title}
          </Link>
          <span className="text-primary-600 font-bold ml-2">${product.price}</span>
        </div>
        
        <p className="text-gray-500 text-sm mb-3">{product.category}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-1 text-yellow-400">
            <Star size={14} fill="currentColor" />
            <span className="text-gray-700 text-sm font-medium">{product.ratings || 0}</span>
            <span className="text-gray-400 text-xs text-sm">({product.numReviews})</span>
          </div>
          <button 
            onClick={handleAddToCart}
            className="text-xs font-bold text-primary-600 uppercase tracking-wider hover:text-primary-700"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
