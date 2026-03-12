import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, User, LogOut, Package, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-lg shadow-gray-100/20' : ''}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-primary-600 tracking-tight"
          >
            MERN<span className="text-gray-900">Shop</span>
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/products" className="text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200">Products</Link>
          <Link to="/products" className="text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200">Categories</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/cart">
            <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-all"
            >
              <ShoppingBag size={24} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-0 right-0 bg-primary-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>

          {user ? (
            <div className="flex items-center space-x-3">
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                <User size={20} />
                <span className="font-medium hidden sm:inline">{user.name}</span>
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="p-2 text-gray-700 hover:text-primary-600">
                  <LayoutDashboard size={20} />
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login" className="px-4 py-2 text-sm font-bold text-gray-700 hover:text-primary-600 transition-all">Sign In</Link>
              <Link to="/register" className="btn btn-primary px-5 py-2 text-sm">Join Now</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
