import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut, Package, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary-600 tracking-tight">
          MERN<span className="text-gray-900">Shop</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/products" className="text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200">Products</Link>
          <Link to="/" className="text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200">Categories</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary-600">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                <User size={20} />
                <span className="font-medium hidden sm:inline">{user.name}</span>
              </Link>
              {user.role === 'admin' && (
                 <Link to="/admin" className="p-2 text-gray-600 hover:text-primary-600" title="Admin Dashboard">
                    <LayoutDashboard size={20} />
                 </Link>
              )}
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-red-600"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login" className="btn btn-secondary py-1.5 px-3 text-sm">Login</Link>
              <Link to="/register" className="btn btn-primary py-1.5 px-3 text-sm">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
