import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import AnimatedPage from '../components/AnimatedPage';

const Cart = () => {
  const { cartItems, removeFromCart, cartTotal, loading, addToCart } = useCart();
  const navigate = useNavigate();

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <AnimatedPage>
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        <ShoppingBag className="text-primary-600" size={32} />
        Your Shopping Bag
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-gray-200 shadow-sm">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={48} className="text-gray-200" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your bag is empty</h2>
          <p className="text-gray-500 mb-8 text-lg">Don't miss out on our newest arrivals!</p>
          <Link to="/products" className="btn btn-primary inline-flex items-center px-12 py-4 text-lg font-bold">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'} In Bag</p>
                </div>
                <div className="divide-y divide-gray-100">
                    {cartItems.map((item) => (
                    <div key={item.product} className="flex flex-col sm:flex-row items-start sm:items-center p-6 hover:bg-gray-50/50 transition-colors">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 mb-4 sm:mb-0">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="sm:ml-6 flex-grow">
                            <Link to={`/product/${item.product}`} className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors block mb-1">
                                {item.title}
                            </Link>
                            <p className="text-gray-500 text-sm font-medium mb-3">Unit Price: {formatCurrency(item.price)}</p>
                            
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
                                    <button 
                                        onClick={() => item.quantity > 1 ? addToCart({_id: item.product, title: item.title, price: item.price, images: [{url: item.image}]}, -1) : removeFromCart(item.product)}
                                        className="p-1.5 hover:bg-gray-50 text-gray-500 transition-colors"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                                    <button 
                                        onClick={() => addToCart({_id: item.product, title: item.title, price: item.price, images: [{url: item.image}]}, 1)}
                                        className="p-1.5 hover:bg-gray-50 text-gray-500 transition-colors"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.product)}
                                    className="text-red-400 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="text-right mt-4 sm:mt-0 ml-auto pt-4 sm:pt-0">
                            <p className="text-xl font-bold text-gray-900">{formatCurrency(item.price * item.quantity)}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Summary</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-gray-500 text-lg">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-lg">
                  <span>Standard Shipping</span>
                  <span className="text-green-600 font-bold uppercase tracking-widest text-xs py-1 px-2 bg-green-50 rounded-lg">Complimentary</span>
                </div>
                <div className="border-t border-gray-100 pt-6 flex justify-between items-end">
                  <div>
                      <span className="text-lg font-bold text-gray-900 block">Total</span>
                      <span className="text-xs text-gray-400 font-medium">Included VAT for USA</span>
                  </div>
                  <span className="text-3xl font-bold text-primary-600 tracking-tight">{formatCurrency(cartTotal)}</span>
                </div>
              </div>

              <div className="space-y-4">
                  <button 
                    onClick={() => navigate('/checkout')}
                    className="btn btn-primary w-full py-5 flex items-center justify-center space-x-3 text-lg font-bold shadow-primary-200"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={20} />
                  </button>
                  
                  <Link 
                    to="/products"
                    className="btn btn-secondary w-full py-4 flex items-center justify-center font-bold text-gray-500"
                  >
                    Continue Shopping
                  </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </AnimatedPage>
  );
};

export default Cart;
