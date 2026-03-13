import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageGallery = ({ images, title }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef(null);

  const totalImages = images?.length || 0;

  const nextImage = useCallback(() => {
    setDirection(1);
    setActiveImage((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  const prevImage = useCallback(() => {
    setDirection(-1);
    setActiveImage((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  useEffect(() => {
    if (totalImages <= 1 || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextImage();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, totalImages, nextImage]);

  const handleThumbnailClick = (idx) => {
    setDirection(idx > activeImage ? 1 : -1);
    setActiveImage(idx);
    setIsPaused(true);
    // Resume after some time or just keep paused till mouse leave?
    // Let's just keep it simple: manual click pauses temporarily or we can just let the mouseEnter/Leave handle it.
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square relative rounded-3xl overflow-hidden bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
        <img src="https://via.placeholder.com/600" alt="Placeholder" className="w-full h-full object-contain" />
      </div>
    );
  }

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="space-y-6">
      {/* Main Image Display */}
      <div 
        className="relative aspect-square rounded-3xl overflow-hidden bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={activeImage}
            src={images[activeImage]?.url}
            alt={`${title} - ${activeImage + 1}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 w-full h-full object-contain p-4"
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        {totalImages > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-slate-700 shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-slate-700 shadow-lg"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}



        {/* Dots/Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleThumbnailClick(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${activeImage === idx ? 'bg-primary-500 w-6' : 'bg-white/50 hover:bg-white'}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, idx) => (
          <button 
            key={idx}
            onClick={() => handleThumbnailClick(idx)}
            className={`w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${activeImage === idx ? 'border-primary-500 shadow-lg scale-95' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'} dark:bg-slate-950 bg-white shadow-sm`}
          >
            <img src={img.url} alt="" className="w-full h-full object-contain p-2" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
