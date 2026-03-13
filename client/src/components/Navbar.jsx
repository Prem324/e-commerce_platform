import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, User, LogOut, Search, Menu, X, Layout, Sun, Moon, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar-container ${isScrolled ? 'shadow-sm bg-white/95 dark:bg-slate-950/95' : 'bg-transparent'} !px-0`}>
      <div className="container mx-auto px-2 sm:px-4 flex items-center justify-between gap-2 md:gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white scale-100 group-hover:scale-110 transition-transform flex-shrink-0">
            <ShoppingBag size={18} />
          </div>
          <span className="text-sm sm:text-xl font-bold text-slate-900 dark:text-white truncate max-w-[100px] xs:max-w-[120px] sm:max-w-none">E-Commerce Platform</span>
          {/* Debug Indicator - Hidden in production */}
          <span className="sr-only">Current Theme: {theme}</span>
        </Link>

        {/* Global Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-grow max-w-md relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-slate-100 dark:bg-slate-900 border-none rounded-xl transition-all outline-none text-sm dark:text-white"
          />
        </form>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/products" className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors uppercase tracking-wider">
            <Package size={18} className="text-slate-400 group-hover:text-primary-600" />
            <span>Products</span>
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1 sm:space-x-3">
          <Link to="/cart">
            <div className="relative p-2 text-slate-600 hover:text-primary-600 transition-colors">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>

          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
          </button>

          {user && user.role === 'admin' && (
            <Link
              to="/admin"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all"
            >
              <Layout size={14} className="text-primary-400" />
              Admin Panel
            </Link>
          )}

          <div className="hidden sm:block h-6 w-[1px] bg-slate-200"></div>

          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 overflow-hidden border border-slate-200">
                  {user.avatar ? <img src={user.avatar} alt="" /> : <User size={16} />}
                </div>
                <span className="hidden xl:block text-sm font-semibold text-slate-700">{user.name.split(' ')[0]}</span>
              </Link>
              <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1 sm:gap-2">
              <Link to="/login" className="px-2 sm:px-4 py-2 text-sm font-semibold text-slate-600 hover:text-primary-600">Login</Link>
              <Link to="/register" className="hidden xs:flex btn btn-primary !px-4 sm:!px-5 !py-2 text-sm flex-shrink-0">Sign Up</Link>
            </div>
          )}

          {/* Toggle */}
          <button className="lg:hidden p-2 text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mob Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-[80px] left-2 right-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 flex flex-col lg:hidden shadow-2xl z-50 rounded-[2.5rem]"
          >
            {/* Search Section */}
            <form onSubmit={handleSearch} className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <div className="flex flex-col space-y-2 mb-6">
              <Link
                to="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary-600 transition-all"
              >
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center">
                  <Package size={20} />
                </div>
                <span className="font-bold">Products</span>
              </Link>

              {user && (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-primary-600 transition-all"
                  >
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center">
                      <User size={20} />
                    </div>
                    <span className="font-bold">My Account</span>
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/10 hover:bg-primary-100 dark:hover:bg-primary-900/20 transition-all"
                    >
                      <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center shadow-sm">
                        <Layout size={20} />
                      </div>
                      <span className="font-bold">Admin Panel</span>
                    </Link>
                  )}
                </>
              )}
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4">
              <button
                onClick={() => {
                  toggleTheme();
                }}
                className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-400"
              >
                <div className="flex items-center gap-3">
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                  <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                </div>
                <div className={`w-11 h-6 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-primary-600' : 'bg-slate-300'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${theme === 'dark' ? 'left-6' : 'left-1'}`} />
                </div>
              </button>

              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full h-[56px] flex items-center justify-center gap-3 px-4 rounded-2xl text-base font-bold text-red-500 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 transition-all"
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="h-14 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-2xl"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="h-14 flex items-center justify-center font-bold text-white bg-primary-600 rounded-2xl shadow-lg shadow-primary-500/20"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
