import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Zap, ShoppingBag } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';

const Home = () => {
  const { products, loading } = useProducts();

  return (
    <AnimatedPage>
      <div className="space-y-16 md:space-y-24 pb-24">
        {/* Simple & Clean Hero Section */}
        <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden rounded-[2.5rem] mt-4 bg-slate-900">
          <div className="absolute inset-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070" 
              alt="Storefront" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-10 container mx-auto px-6 text-center">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-7xl font-bold text-white leading-tight mb-6 mt-10 md:mt-0">
                Modern Shopping <br />
                Made <span className="text-primary-400">Simple.</span>
              </h1>
              <p className="text-base md:text-lg text-slate-300 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
                Discover our curated collection of high-quality products. We focus on design, functionality, and your satisfaction.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/products" className="btn btn-primary px-10 py-4 text-lg">
                  Shop All Products <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Truck size={28} />, title: "Free Shipping", desc: "Enjoy complimentary delivery on all orders over $100." },
            { icon: <ShieldCheck size={28} />, title: "Secure Checkout", desc: "Your data is protected by industry-standard encryption." },
            { icon: <Zap size={28} />, title: "Fast Support", desc: "Our team is here to help you 24/7 with any inquiries." }
          ].map((feature, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-100 dark:border-slate-800 text-center hover:shadow-lg transition-transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-12 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 dark:text-white">Featured Products</h2>
              <p className="text-slate-500 dark:text-slate-400">Hand-picked items from our latest collection</p>
            </div>
            <Link to="/products" className="text-primary-600 font-bold flex items-center gap-2 hover:underline">
              View All <ArrowRight size={18} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse bg-slate-100 rounded-3xl aspect-[4/5]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </section>

      </div>
    </AnimatedPage>
  );
};

export default Home;
