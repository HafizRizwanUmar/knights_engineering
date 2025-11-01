import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from '../common/Button';

// Slider Images
const heroImages = [
  'https://images.unsplash.com/photo-1542308962-eac374872c67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80', // Modern Arab Architecture
  'https://images.unsplash.com/photo-1519630485217-39b1b65b3c3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80', // Dubai Skyline / Engineering
  'https://images.unsplash.com/photo-1602013894762-1b94d1b8f152?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80', // Industrial / Energy
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();
  const heroSlides = t('hero', { returnObjects: true });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden pt-[100px] md:pt-[76px]">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <img
            src={heroImages[currentSlide]}
            alt={heroSlides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 z-10"></div>
        </motion.div>
      </AnimatePresence>

      {/* Content - Now Left Aligned */}
      <div className="relative z-20 h-full flex flex-col items-start justify-center text-start text-white p-4 container mx-auto px-4 md:px-8 lg:px-12">
        <motion.h1 
          key={`title-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="font-heading text-5xl md:text-7xl font-bold mb-4"
        >
          {heroSlides[currentSlide].title}
        </motion.h1>
        <motion.p 
          key={`subtitle-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="font-body text-xl md:text-2xl mb-8 max-w-2xl"
        >
          {heroSlides[currentSlide].subtitle}
        </motion.p>
        <motion.div
          key={`button-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        >
          <Button variant="primary" as={Link} to="/about" className="py-3 px-8 text-lg rounded-full">
            {t('buttons.exploreMore')}
          </Button>
        </motion.div>
      </div>
      
      {/* Slider Dots */}
      <div className="absolute z-30 bottom-10 start-1/2 -translate-x-1/2 flex space-x-3 rtl:space-x-reverse">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;