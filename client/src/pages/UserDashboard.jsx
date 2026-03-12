import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Package, MapPin, Calendar, CheckCircle, Clock, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { formatCurrency, formatDate } from '../utils/formatters';
import OrderStatusBadge from '../components/OrderStatusBadge';
import AnimatedPage from '../components/AnimatedPage';

const UserDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get('/orders/myorders');
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await API.delete(`/orders/${id}`);
        toast.success('Order cancelled successfully');
        setOrders(orders.filter(order => order._id !== id));
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to cancel order');
      }
    }
  };

  return (
    <AnimatedPage>
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
             <span className="text-2xl font-bold">{user?.name?.charAt(0)}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{user?.name}</h1>
            <p className="text-slate-500 dark:text-slate-400">{user?.email}</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
        <Package className="mr-2 text-primary-600" size={24} />
        My Orders
      </h2>

      {loading ? (
        <div className="text-center py-10">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-12 text-center rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
               <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b dark:border-slate-800 flex justify-between items-center">
                  <div className="flex flex-wrap gap-x-8 gap-y-4">
                    <div>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-widest">Order Placed</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-widest">Total</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(order.totalPrice)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-widest text-right">Order #</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{order._id.slice(-8).toUpperCase()}</p>
                  </div>
               </div>
                <div className="p-6 flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-grow">
                     <div className="mb-4">
                        <OrderStatusBadge status={order.orderStatus} />
                     </div>
                     <div className="space-y-2">
                        {order.orderItems.map((item, idx) => (
                           <p key={idx} className="text-sm text-slate-600 dark:text-slate-400">
                             Product ID: {item.product.slice(-6)}... x {item.quantity}
                           </p>
                        ))}
                     </div>
                  </div>
                  <div className="min-w-[200px] border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6">
                     <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-widest mb-2">Shipping to</p>
                     <p className="text-sm font-medium text-slate-900 dark:text-white">{order.shippingAddress.address}</p>
                     <p className="text-sm text-slate-500 dark:text-slate-400">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                     
                     {order.orderStatus === 'Processing' && (
                       <button
                         onClick={() => handleDeleteOrder(order._id)}
                         className="mt-6 flex items-center space-x-2 text-xs font-bold text-red-500 hover:text-red-600 transition-colors uppercase tracking-widest"
                       >
                         <Trash2 size={14} />
                         <span>Cancel Order</span>
                       </button>
                     )}
                  </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </AnimatedPage>
  );
};

export default UserDashboard;
