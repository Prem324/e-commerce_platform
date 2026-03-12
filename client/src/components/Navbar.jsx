import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, User, LogOut, Search, Menu, X, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
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
    <nav className={`navbar-container ${isScrolled ? 'shadow-sm bg-white/95' : 'bg-transparent'} !px-0`}>
      <div className="container mx-auto px-2 sm:px-4 flex items-center justify-between gap-2 md:gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white scale-100 group-hover:scale-110 transition-transform flex-shrink-0">
            <ShoppingBag size={18} />
          </div>
          <span className="text-sm sm:text-xl font-bold text-slate-900 truncate max-w-[100px] xs:max-w-[120px] sm:max-w-none">E-Commerce Platform</span>
        </Link>

        {/* Global Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-grow max-w-md relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-slate-100 border-none rounded-xl transition-all outline-none text-sm"
          />
        </form>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/products" className="text-sm font-semibold text-slate-600 hover:text-primary-600 transition-colors">Catalog</Link>
          <Link to="/products" className="text-sm font-semibold text-slate-600 hover:text-primary-600 transition-colors">Categories</Link>
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

          {user && user.role === 'admin' && (
            <Link
              to="/admin"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-slate-200"
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 w-full bg-white border-b border-slate-100 py-6 px-4 flex flex-col space-y-4 lg:hidden shadow-xl"
          >
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="input-field !pl-12 !py-2.5"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-slate-600">Catalog</Link>
            <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-slate-600">Categories</Link>

            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-slate-600 flex items-center gap-2">
                  <User size={18} />
                  My Account
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-bold text-primary-600 flex items-center gap-2">
                    <Layout size={18} />
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-base font-semibold text-red-500 flex items-center gap-2 pt-4 border-t border-slate-100"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <div className="pt-4 grid grid-cols-2 gap-3 border-t border-slate-100">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="btn btn-secondary text-sm">Login</Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="btn btn-primary text-sm">Sign Up</Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
