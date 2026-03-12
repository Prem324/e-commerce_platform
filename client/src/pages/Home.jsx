import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Zap } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

const Home = () => {
  return (
    <AnimatedPage>
    <div className="space-y-24 pb-12">
      {/* Hero Section */}
      <section className="relative h-[600px] rounded-[40px] overflow-hidden bg-gray-900 flex items-center group">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-transparent"></div>
        </div>
        
        <div className="relative z-10 px-12 max-w-2xl">
          <h1 className="text-6xl font-extrabold text-white leading-tight mb-6">
            Future of Shopping <br />
            <span className="text-primary-500">Starts Here</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Experience the next generation of e-commerce. Curated tech gadgets and premium lifestyle products delivered to your door.
          </p>
          <div className="flex space-x-4">
            <Link 
              to="/products" 
              className="btn btn-primary px-8 py-4 text-lg font-bold flex items-center space-x-2"
            >
              <span>Explore Collection</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
           <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
             <Truck size={32} />
           </div>
           <h3 className="text-xl font-bold text-gray-900 mb-3">Global Logistics</h3>
           <p className="text-gray-500 leading-relaxed">Free international shipping on all orders over $200. Express delivery within 48 hours.</p>
        </div>
        
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
           <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
             <ShieldCheck size={32} />
           </div>
           <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Payments</h3>
           <p className="text-gray-500 leading-relaxed">Multi-layer encryption and 3D secure checkout with Stripe integration and fraud protection.</p>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
           <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
             <Zap size={32} />
           </div>
           <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Support</h3>
           <p className="text-gray-500 leading-relaxed">Dedicated concierge team available 24/7. Average response time under 5 minutes.</p>
        </div>
      </section>
    </div>
    </AnimatedPage>
  );
};

export default Home;
