import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import AnimatedPage from '../components/AnimatedPage';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cartItems, removeFromCart, cartTotal, loading, addToCart } = useCart();
  const navigate = useNavigate();

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <AnimatedPage>
    <div className="max-w-7xl mx-auto pb-24 px-4">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 md:mb-12 mt-4 md:mt-8 gap-4">
        <h1 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight flex flex-wrap items-center gap-2 md:gap-4">
          Shopping Cart
          <span className="text-base md:text-lg font-normal text-slate-400">({cartItems.length} items)</span>
        </h1>
        <Link to="/products" className="text-sm font-bold text-primary-600 hover:underline hidden md:block">
          Continue Shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-24 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShoppingBag size={40} className="text-slate-200" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-slate-500 mb-10 max-w-sm mx-auto">Explore our collection and add items to your cart to begin.</p>
          <Link to="/products" className="btn btn-primary inline-flex items-center px-12 py-4">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div 
                  key={item.product}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-4 md:p-6 rounded-3xl border border-slate-100 flex flex-col sm:flex-row items-center gap-6"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <Link to={`/product/${item.product}`} className="text-lg font-bold text-slate-900 hover:text-primary-600 transition-colors">
                          {item.title}
                      </Link>
                      <p className="text-slate-500 text-sm mt-1">{formatCurrency(item.price)}</p>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                        <button 
                            onClick={() => item.quantity > 1 ? addToCart({_id: item.product, title: item.title, price: item.price, images: [{url: item.image}]}, -1) : removeFromCart(item.product)}
                            className="p-2.5 text-slate-500 hover:text-primary-600 transition-colors"
                        >
                            <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button 
                            onClick={() => addToCart({_id: item.product, title: item.title, price: item.price, images: [{url: item.image}]}, 1)}
                            className="p-2.5 text-slate-500 hover:text-primary-600 transition-colors"
                        >
                            <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-lg font-bold text-slate-900 min-w-[80px] text-right">
                        {formatCurrency(item.price * item.quantity)}
                      </div>

                      <button 
                          onClick={() => removeFromCart(item.product)}
                          className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                      >
                          <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
              <h2 className="text-xl font-bold mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span className="text-primary-400 font-bold">Free</span>
                </div>
                <div className="border-t border-slate-800 pt-6 flex justify-between items-end">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-3xl font-bold">{formatCurrency(cartTotal)}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="btn btn-primary w-full py-4 flex items-center justify-center gap-2 text-base font-bold"
              >
                Checkout Now
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AnimatedPage>
  );
};

export default Cart;
