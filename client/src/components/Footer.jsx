import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-white tracking-tight mb-6 block">
              MERN<span className="text-primary-500">Shop</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              The ultimate destination for premium tech and lifestyle products. We curate only the best for our community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-primary-500 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-primary-500 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-primary-500 transition-colors"><Github size={20} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Shopping Cart</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Create Account</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-primary-500" />
                <span>123 Tech Lane, Silicon Valley, CA</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-500" />
                <span>+1 (555) 000-SHOP</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-500" />
                <span>support@mernemshop.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest">
          <p>&copy; 2026 MERN Shop. Engineered with ❤️ by Antigravity.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
