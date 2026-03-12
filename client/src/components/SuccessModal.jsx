import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuccessModal = ({ isOpen, onClose, orderId }) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800"
          >
            <div className="p-10 text-center">
              {/* Animated Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
                className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8 relative"
              >
                <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping" />
                <Check className="text-green-600 dark:text-green-400" size={48} />
              </motion.div>

              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                Order Successful!
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-2 leading-relaxed font-medium">
                Thank you for your purchase. Your order has been placed and is being processed.
              </p>
              {orderId && (
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-10 bg-slate-50 dark:bg-slate-800/50 py-2 rounded-full inline-block px-4">
                  Order ID: #{orderId.slice(-8).toUpperCase()}
                </p>
              )}

              <div className="space-y-4">
                <button
                  onClick={() => {
                    onClose();
                    navigate('/dashboard');
                  }}
                  className="btn btn-primary w-full py-4 flex items-center justify-center space-x-2 text-lg font-bold shadow-lg shadow-primary-200"
                >
                  <ShoppingBag size={20} />
                  <span>View My Orders</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    navigate('/');
                  }}
                  className="w-full py-4 text-slate-500 dark:text-slate-400 font-bold hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Continue Shopping</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="h-2 bg-gradient-to-r from-green-400 to-primary-600 w-full" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
