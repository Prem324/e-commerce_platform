import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 py-8 px-6 mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover p-1" />
          </div>
          <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">E-Commerce Platform</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          <Link to="/products" className="hover:text-primary-600 transition-colors">Catalog</Link>
          <a href="#" className="hover:text-primary-600 transition-colors">Shipping</a>
          <a href="#" className="hover:text-primary-600 transition-colors">Returns</a>
          <a href="#" className="hover:text-primary-600 transition-colors">Privacy</a>
        </div>

        {/* Social & Legal */}
        <div className="flex items-center gap-6">
          <div className="flex gap-4 text-slate-400 dark:text-slate-500">
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors"><Twitter size={16} /></a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors"><Instagram size={16} /></a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors"><Github size={16} /></a>
          </div>
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">
            &copy; 2026 E-Commerce
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
