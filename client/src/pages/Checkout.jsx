import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API from '../services/api';
import { toast } from 'react-toastify';
import { CreditCard, Truck, MapPin, CheckCircle } from 'lucide-react';

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
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary mt-4">Go Shopping</button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Shipping Form */}
        <div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
            <h2 className="text-xl font-bold flex items-center mb-6">
              <MapPin className="mr-2 text-primary-600" size={24} />
              Shipping Information
            </h2>
            
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  className="input"
                  placeholder="123 Street Name"
                  value={shippingAddress.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    className="input"
                    placeholder="New York"
                    value={shippingAddress.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    className="input"
                    placeholder="10001"
                    value={shippingAddress.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  className="input"
                  placeholder="USA"
                  value={shippingAddress.country}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="pt-6">
                 <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full py-4 flex items-center justify-center space-x-2 text-lg font-bold"
                >
                  {loading ? (
                    <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      <span>Place My Order</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Review */}
        <div>
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <CreditCard className="mr-2 text-primary-600" size={24} />
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <div key={item.product} className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="ml-3">
                      <p className="font-bold text-sm line-clamp-1">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.quantity} x ${item.price}</p>
                    </div>
                  </div>
                  <p className="font-bold text-sm text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-bold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-200">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-primary-600">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-2 text-gray-400">
              <Truck size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Delivered in 3-5 business days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
