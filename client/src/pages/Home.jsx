import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] rounded-[40px] overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <span className="px-4 py-1.5 bg-primary-600/20 text-primary-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-primary-500/30">
            2026 Collection Out Now
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Elevate Your Style,<br />
            <span className="text-primary-500">Simplify Your Life.</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            Discover our curated collection of premium electronics, fashion, and lifestyle essentials designed for the modern world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products" className="btn btn-primary px-10 py-4 text-lg font-bold flex items-center justify-center gap-2">
              <span>Shop Collection</span>
              <ArrowRight size={20} />
            </Link>
            <Link to="/register" className="btn bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 text-lg font-bold hover:bg-white/20 transition-colors">
              Join Rewards
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: <Truck />, title: "Express Delivery", desc: "Arrives in 2-3 business days" },
          { icon: <ShieldCheck />, title: "Secure Checkout", desc: "Encryption for every transaction" },
          { icon: <Zap />, title: "Instant Support", desc: "24/7 dedicated customer care" },
          { icon: <ShoppingBag />, title: "Easy Returns", desc: "30-day hassle-free policy" }
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 shrink-0">
               {item.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Featured Categories */}
      <section>
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">Shop by Category</h2>
            <p className="text-gray-500 mt-2 text-lg">Browse through our most popular departments</p>
          </div>
          <Link to="/products" className="text-primary-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight size={18} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Electronics", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070", color: "bg-blue-600" },
            { name: "Fashion", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071", color: "bg-purple-600" },
            { name: "Accessories", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2099", color: "bg-orange-600" }
          ].map((cat, i) => (
             <Link key={i} to={`/products?category=${cat.name}`} className="group relative h-80 rounded-[32px] overflow-hidden">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                   <h3 className="text-2xl font-bold text-white mb-2">{cat.name}</h3>
                   <span className="text-white/70 text-sm font-medium">Explore Collection &rarr;</span>
                </div>
             </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary-600 rounded-[40px] px-8 py-16 text-center text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -ml-32 -mb-32"></div>
         
         <h2 className="text-4xl font-bold mb-4 relative z-10">Get 15% off your first order</h2>
         <p className="text-primary-100 mb-10 text-lg relative z-10">Join our community and stay updated with the latest trends and exclusive offers.</p>
         
         <form className="max-w-md mx-auto flex gap-2 relative z-10">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/30"
            />
            <button type="submit" className="bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold hover:bg-primary-50 transition-colors">
              Subscribe
            </button>
         </form>
      </section>
    </div>
  );
};

export default Home;
