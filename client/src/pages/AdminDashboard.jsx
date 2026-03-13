import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, Package, Users, ShoppingCart, TrendingUp } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';
import { formatCurrency } from '../utils/formatters';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    images: []
  });

  const uploadFileHandler = async (e) => {
    const files = e.target.files;
    const uploadFormData = new FormData();
    
    for (let i = 0; i < files.length; i++) {
      uploadFormData.append('images', files[i]);
    }
    
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await API.post('/upload', uploadFormData, config);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...data] }));
      setUploading(false);
      toast.success('Images uploaded to Cloudinary');
    } catch (error) {
      console.error(error);
      setUploading(false);
      toast.error('Image upload failed');
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products?pageSize=100');
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders');
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchOrders()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await API.put(`/products/${editingProduct._id}`, formData);
        toast.success('Product updated');
      } else {
        await API.post('/products', formData);
        toast.success('Product created');
      }
      fetchProducts();
      setShowAddModal(false);
      setEditingProduct(null);
      setFormData({ title: '', price: '', description: '', category: '', stock: '', images: [] });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      stock: product.stock,
      images: product.images || []
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.delete(`/products/${id}`);
        toast.success('Product deleted');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };
  const handleDeleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await API.delete(`/orders/${id}`);
        toast.success('Order deleted');
        fetchOrders();
      } catch (error) {
        toast.error('Failed to delete order');
      }
    }
  };

  return (
    <AnimatedPage>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Admin Panel</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your inventory and orders</p>
          </div>
          {activeTab === 'products' && (
            <button
              onClick={() => {
                setEditingProduct(null);
                setFormData({ title: '', price: '', description: '', category: '', stock: '', images: [] });
                setShowAddModal(true);
              }}
              className="btn btn-primary w-full md:w-auto shadow-none hover:shadow-none flex items-center space-x-2 px-6 py-3"
            >
              <Plus size={20} />
              <span>Add New Product</span>
            </button>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'products'
                ? 'bg-primary-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
              }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'orders'
                ? 'bg-primary-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
              }`}
          >
            Orders
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center md:items-center gap-3 md:gap-4 text-center md:text-left">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl md:rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Package size={20} className="md:w-6 md:h-6" />
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Products</p>
              <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{products.length}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center md:items-center gap-3 md:gap-4 text-center md:text-left">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 dark:bg-green-900/20 rounded-xl md:rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400">
              <TrendingUp size={20} className="md:w-6 md:h-6" />
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Revenue</p>
              <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(845000)}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center md:items-center gap-3 md:gap-4 text-center md:text-left">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl md:rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Users size={20} className="md:w-6 md:h-6" />
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Users</p>
              <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">85</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center md:items-center gap-3 md:gap-4 text-center md:text-left">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl md:rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400">
              <ShoppingCart size={20} className="md:w-6 md:h-6" />
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Orders</p>
              <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{orders.length}</p>
            </div>
          </div>
        </div>

        {activeTab === 'products' ? (
          <div className="space-y-4">
            {/* Mobile Products View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {loading ? (
                <div className="text-center py-10 card">Loading...</div>
              ) : products.map((product) => (
                <div key={product._id} className="card p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-800">
                        {product.images?.[0] ? (
                          <img src={product.images[0].url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Package size={20} className="text-slate-300" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">{product.title}</h4>
                        <p className="text-[10px] text-slate-400 font-mono">#{product._id.slice(-6).toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(product)} className="p-2 text-slate-400 hover:text-primary-600 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(product._id)} className="p-2 text-slate-400 hover:text-red-500 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Price</p>
                      <p className="font-bold text-primary-600 dark:text-primary-400">{formatCurrency(product.price)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Stock</p>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.stock} Units
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Products Table */}
            <div className="hidden md:block bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">ID</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Product</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Category</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Price</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Stock</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {loading ? (
                      <tr><td colSpan="6" className="px-6 py-10 text-center">Loading...</td></tr>
                    ) : products.map((product) => (
                      <tr key={product._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-400 dark:text-slate-500 font-mono">#{product._id.slice(-6).toUpperCase()}</td>
                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{product.title}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{product.category}</td>
                        <td className="px-6 py-4 font-bold text-primary-600 dark:text-primary-400">{formatCurrency(product.price)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                            {product.stock} in stock
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Mobile Orders View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {loading ? (
                <div className="text-center py-10 card">Loading...</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-10 card">No orders found.</div>
              ) : orders.map((order) => (
                <div key={order._id} className="card p-5 flex flex-col gap-4">
                   <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-0.5">Order ID</p>
                      <h4 className="font-bold text-slate-900 dark:text-white font-mono">#{order._id.slice(-8).toUpperCase()}</h4>
                    </div>
                    <button onClick={() => handleDeleteOrder(order._id)} className="p-2 text-slate-400 hover:text-red-500 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-0.5">Customer</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{order.user?.name || 'Unknown'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-0.5">Date</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-0.5">Total Amount</p>
                      <p className="font-bold text-primary-600 dark:text-primary-400">{formatCurrency(order.totalPrice)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-0.5">Status</p>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-700">
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Orders Table */}
            <div className="hidden md:block bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Order ID</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Customer</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Total</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {loading ? (
                      <tr><td colSpan="6" className="px-6 py-10 text-center">Loading...</td></tr>
                    ) : orders.length === 0 ? (
                      <tr><td colSpan="6" className="px-6 py-10 text-center">No orders found.</td></tr>
                    ) : orders.map((order) => (
                      <tr key={order._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-400 dark:text-slate-500 font-mono">#{order._id.slice(-8).toUpperCase()}</td>
                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{order.user?.name || 'Unknown User'}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 font-bold text-primary-600 dark:text-primary-400">{formatCurrency(order.totalPrice)}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-700">
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDeleteOrder(order._id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Modal Overlay */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200 border dark:border-slate-800">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <Plus size={24} className="rotate-45" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 overflow-y-auto flex-grow scrollbar-thin">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Product Title</label>
                    <input type="text" name="title" className="input" placeholder="e.g. Wireless Headphones" value={formData.title} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Category</label>
                    <input type="text" name="category" className="input" placeholder="e.g. Electronics" value={formData.category} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Price (₹)</label>
                    <input type="number" name="price" className="input" placeholder="99,900" value={formData.price} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Stock Count</label>
                    <input type="number" name="stock" className="input" placeholder="50" value={formData.stock} onChange={handleInputChange} required />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Product Images</label>
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-wrap gap-4 mb-2">
                      {formData.images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={img.url} 
                            alt={`Preview ${index}`} 
                            className="w-20 h-20 object-cover rounded-xl border border-slate-200 dark:border-slate-800" 
                          />
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({
                              ...prev,
                              images: prev.images.filter((_, i) => i !== index)
                            }))}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Plus size={12} className="rotate-45" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="relative">
                      <input
                        type="file"
                        id="image-file"
                        className="hidden"
                        multiple
                        onChange={uploadFileHandler}
                      />
                      <label
                        htmlFor="image-file"
                        className={`btn ${uploading ? 'btn-secondary' : 'btn-primary'} shadow-none hover:shadow-none w-full flex items-center justify-center cursor-pointer py-2`}
                      >
                        {uploading ? 'Uploading to Cloudinary...' : 'Choose Local Files (Multiple)'}
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Description</label>
                  <textarea name="description" className="input min-h-[120px]" placeholder="Tell us more about the product..." value={formData.description} onChange={handleInputChange} required />
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary shadow-none hover:shadow-none flex-1 py-3.5 text-base md:text-lg order-2 sm:order-1">Cancel</button>
                  <button type="submit" className="btn btn-primary shadow-none hover:shadow-none flex-1 py-3.5 text-base md:text-lg font-bold order-1 sm:order-2">
                    {editingProduct ? 'Save Changes' : 'Create Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AnimatedPage>
  );
};

export default AdminDashboard;
