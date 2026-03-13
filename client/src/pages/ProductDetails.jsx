import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { ShoppingCart, ShieldCheck, Truck, RefreshCw, Plus, Minus, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import StarRating from '../components/StarRating';
import Breadcrumbs from '../components/Breadcrumbs';
import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';
import ImageGallery from '../components/ImageGallery';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Product not found');
        navigate('/products');
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success('Successfully added to your cart');
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin"></div>
    </div>
  );
  if (!product) return null;

  return (
    <AnimatedPage>
      <div className="max-w-7xl mx-auto pb-24">
        <div className="mb-10">
          <Breadcrumbs
            items={[
              { label: 'Shop', path: '/products' },
              { label: product.category, path: `/products?category=${product.category}` },
              { label: product.title }
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Gallery Section */}
          <div className="lg:col-span-6">
            <ImageGallery images={product.images} title={product.title} />
          </div>

          {/* Info Section */}
          <div className="lg:col-span-6 flex flex-col pt-4">
            <p className="text-[10px] md:text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-[0.2em] mb-4">{product.category}</p>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 tracking-tight leading-tight">{product.title}</h1>

            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
              <StarRating rating={product.ratings} numReviews={product.numReviews} />
              <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800"></div>
              {product.stock > 0 ? (
                <span className="text-green-600 dark:text-green-500 text-sm font-bold uppercase tracking-wider">In Stock</span>
              ) : (
                <span className="text-slate-400 dark:text-slate-600 text-sm font-bold uppercase tracking-wider">Out of Stock</span>
              )}
            </div>

            <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 md:mb-8">{formatCurrency(product.price)}</div>

            <div className="prose prose-slate dark:prose-invert mb-10">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {product.stock > 0 && (
              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-3 sm:gap-6">
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 overflow-hidden h-14 sm:h-auto">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="p-3 text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 sm:w-14 text-center font-bold text-slate-900 dark:text-white text-base sm:text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                      className="p-3 text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="btn btn-primary flex-grow h-14 text-lg sm:text-lg font-bold shadow-lg shadow-primary-500/20 px-4 whitespace-nowrap"
                  >
                    <ShoppingCart size={18} className="sm:hidden" />
                    <ShoppingCart size={22} className="hidden sm:block" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: <Truck size={20} />, title: "Quick Delivery" },
                { icon: <ShieldCheck size={20} />, title: "Secure Checkout" },
                { icon: <RefreshCw size={20} />, title: "30-Day Returns" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <div className="text-primary-600 dark:text-primary-400">
                    {item.icon}
                  </div>
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ProductDetails;
