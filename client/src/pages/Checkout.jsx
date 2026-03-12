import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API from '../services/api';
import { toast } from 'react-toastify';
import { CreditCard, Truck, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import AnimatedPage from '../components/AnimatedPage';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderItems = cartItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price
      }));

      const { data } = await API.post('/orders', {
        orderItems,
        shippingAddress,
        paymentMethod: 'Stripe',
        totalPrice: cartTotal
      });

      toast.success('Order placed successfully!');
      clearCart();
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Checkout failed');
    }
    setLoading(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">No items to checkout</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary px-8">Browse Products</button>
      </div>
    );
  }

  return (
    <AnimatedPage>
    <div className="max-w-6xl mx-auto">
      <button 
        onClick={() => navigate('/cart')}
        className="flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors text-sm font-bold uppercase tracking-widest"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to cart
      </button>

      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 tracking-tight">Checkout Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Shipping Form */}
        <div>
          <div className="bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-gray-100 shadow-xl shadow-gray-100/50 mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary-600"></div>
            <h2 className="text-xl md:text-2xl font-bold flex items-center mb-6 md:mb-8">
              <MapPin className="mr-3 text-primary-600" size={28} />
              Delivery Destination
            </h2>
            
            <form onSubmit={handleCheckout} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Street Address</label>
                <input
                  type="text"
                  name="address"
                  className="input py-3"
                  placeholder="e.g. 5th Avenue, Suite 100"
                  value={shippingAddress.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    className="input py-3"
                    placeholder="e.g. New York"
                    value={shippingAddress.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    className="input py-3"
                    placeholder="e.g. 10001"
                    value={shippingAddress.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Country / Region</label>
                <input
                  type="text"
                  name="country"
                  className="input py-3"
                  placeholder="e.g. United States"
                  value={shippingAddress.country}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="pt-10">
                 <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full py-5 flex items-center justify-center space-x-3 text-xl font-bold shadow-lg shadow-primary-200"
                >
                  {loading ? (
                    <div className="h-7 w-7 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <CheckCircle size={24} />
                      <span>Confirm & Place Order</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Review */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-gray-50 p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-gray-100 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center">
              <CreditCard className="mr-3 text-primary-600" size={28} />
              Review Your Order
            </h2>
            
            <div className="space-y-4 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map((item) => (
                <div key={item.product} className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="ml-4">
                      <p className="font-bold text-gray-900 line-clamp-1">{item.title}</p>
                      <p className="text-sm font-medium text-gray-400">{item.quantity} × {formatCurrency(item.price)}</p>
                    </div>
                  </div>
                  <p className="font-bold text-gray-900 ml-4">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-8 space-y-4">
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Products Total</span>
                <span className="text-gray-900">{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Shipping & Handling</span>
                <span className="text-green-600 font-bold uppercase tracking-wider text-[10px] bg-green-50 px-2 py-1 rounded">Free</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 pt-6 border-t border-gray-200">
                <span className="text-xl md:text-2xl font-bold text-gray-900">Amount Due</span>
                <span className="text-2xl md:text-3xl font-bold text-primary-600 tracking-tight">{formatCurrency(cartTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AnimatedPage>
  );
};

export default Checkout;
