import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { ShoppingCart, Star, ArrowLeft, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

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
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success('Added to cart!');
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft size={18} className="mr-2" />
        <span>Back to results</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm">
            <img 
              src={product.images[0]?.url || 'https://via.placeholder.com/600'} 
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col">
          <div className="mb-6">
            <p className="text-primary-600 font-semibold uppercase tracking-wider text-sm mb-2">{product.category}</p>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center text-yellow-500">
                <Star size={20} fill="currentColor" />
                <span className="ml-1 text-gray-900 font-bold">{product.ratings}</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500">{product.numReviews} Reviews</span>
              {product.stock > 0 ? (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">In Stock</span>
              ) : (
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase">Out of Stock</span>
              )}
            </div>
            <p className="text-3xl font-bold text-gray-900">${product.price}</p>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          {product.stock > 0 && (
            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 py-2 hover:bg-gray-50 text-gray-600 font-bold border-r border-gray-200"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-bold min-w-[60px] text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="px-4 py-2 hover:bg-gray-50 text-gray-600 font-bold border-l border-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="btn btn-primary w-full md:w-auto px-12 py-4 flex items-center justify-center space-x-3 text-lg"
              >
                <ShoppingCart size={24} />
                <span>Add to Cart</span>
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t pt-8">
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-50">
              <Truck size={24} className="text-primary-600 mb-2" />
              <p className="text-xs font-bold text-gray-900">Free Shipping</p>
              <p className="text-[10px] text-gray-500">On orders over $99</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-50">
              <ShieldCheck size={24} className="text-primary-600 mb-2" />
              <p className="text-xs font-bold text-gray-900">Secure Payment</p>
              <p className="text-[10px] text-gray-500">100% Secure Transaction</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-50">
              <RefreshCw size={24} className="text-primary-600 mb-2" />
              <p className="text-xs font-bold text-gray-900">Easy Returns</p>
              <p className="text-[10px] text-gray-500">30 Day Money Back</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
