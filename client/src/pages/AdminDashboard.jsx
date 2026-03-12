import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, Package, Users, ShoppingCart, TrendingUp } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';
import { formatCurrency } from '../utils/formatters';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
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
    image: ''
  });

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await API.post('/upload', formData, config);
      setFormData(prev => ({ ...prev, image: data.url }));
      setUploading(false);
      toast.success('Image uploaded to Cloudinary');
    } catch (error) {
      console.error(error);
      setUploading(false);
      toast.error('Image upload failed');
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
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
      setFormData({ title: '', price: '', description: '', category: '', stock: '', image: '' });
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
      image: product.images[0]?.url || ''
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

  return (
    <AnimatedPage>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Admin Panel</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your inventory and orders</p>
          </div>
          <button
            onClick={() => {
              setEditingProduct(null);
              setFormData({ title: '', price: '', description: '', category: '', stock: '', image: '' });
              setShowAddModal(true);
            }}
            className="btn btn-primary shadow-none hover:shadow-none flex items-center space-x-2 px-6 py-3"
          >
            <Plus size={20} />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Package size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Products</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{products.length}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Revenue</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(845000)}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Customers</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">85</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400">
              <ShoppingCart size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Active Orders</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">14</p>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
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

        {/* Modal Overlay */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border dark:border-slate-800">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <Plus size={24} className="rotate-45" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Product Title</label>
                    <input type="text" name="title" className="input" placeholder="e.g. Wireless Headphones" value={formData.title} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Category</label>
                    <input type="text" name="category" className="input" placeholder="e.g. Electronics" value={formData.category} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
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
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Product Image</label>
                  <div className="flex flex-col space-y-4">
                    <input
                      type="text"
                      name="image"
                      className="input"
                      placeholder="Enter image URL or upload below"
                      value={formData.image}
                      onChange={handleInputChange}
                    />
                    <div className="relative">
                      <input
                        type="file"
                        id="image-file"
                        className="hidden"
                        onChange={uploadFileHandler}
                      />
                      <label
                        htmlFor="image-file"
                        className={`btn ${uploading ? 'btn-secondary' : 'btn-primary'} shadow-none hover:shadow-none w-full flex items-center justify-center cursor-pointer py-2`}
                      >
                        {uploading ? 'Uploading to Cloudinary...' : 'Choose Local File'}
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Description</label>
                  <textarea name="description" className="input min-h-[120px]" placeholder="Tell us more about the product..." value={formData.description} onChange={handleInputChange} required />
                </div>

                <div className="pt-4 flex gap-4">
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary shadow-none hover:shadow-none flex-1 py-3 text-lg">Cancel</button>
                  <button type="submit" className="btn btn-primary shadow-none hover:shadow-none flex-1 py-3 text-lg font-bold">
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
