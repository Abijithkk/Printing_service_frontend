import React, { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Headphones, Star, ShoppingCart, Clock } from 'lucide-react';
import HighlightCard from './HighlightCard';
import {
  headlineVariants,
  slideUpVariants,
  buttonVariants,
  staggerContainerVariants,
  itemVariants,
  getViewportConfig,
} from '../../../utils/animations';

const HeroSection = ({ hero, highlights, cta }) => {
  const sections = Array.isArray(hero?.sections) ? hero.sections : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!sections.length) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sections.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [sections.length]);

  const mainSection =
    sections.length > 0 ? sections[currentIndex % sections.length] : null;

  const resolvedHighlights = useMemo(() => {
    if (Array.isArray(highlights) && highlights.length) {
      const icons = [Headphones, Star, ShoppingCart, Clock];
      return highlights.map((item, index) => ({
        icon: icons[index % icons.length],
        title: item.title || '',
      }));
    }

    return [
      { icon: Headphones, title: 'Excellent Customer Service' },
      { icon: Star, title: 'High-Quality Printing' },
      { icon: ShoppingCart, title: 'Convenient Online Ordering' },
      { icon: Clock, title: 'Fast Production Time' },
    ];
  }, [highlights]);

  const headline =
    mainSection?.headline || 'High-Quality Custom Printing, Delivered Fast';
  const subtext =
    mainSection?.subtext ||
    'From business cards to banners, we bring your ideas to life with precision and speed.';
  const ctaText =
    cta?.text || mainSection?.ctaText || 'Instant Pricing & Order Online';

  const backgroundImage = mainSection?.backgroundImage || null;

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] flex-col justify-between overflow-hidden bg-black">
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60" />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-grow flex-col justify-center px-5 py-16 sm:px-6 md:px-8 md:py-20 lg:px-12">
        <motion.div
          className="flex max-w-5xl flex-col items-center text-center md:items-start md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={getViewportConfig()}
          variants={staggerContainerVariants}
        >
          <motion.h1
            className="mb-6 text-[2.2rem] font-bold leading-[1.2] tracking-tight text-white sm:max-w-2xl sm:text-5xl md:mb-8 md:max-w-none md:text-7xl md:leading-[1.15]"
            variants={headlineVariants}
          >
            {headline}
          </motion.h1>

          <motion.p
            className="mb-10 max-w-[280px] text-[15px] font-light leading-[1.6] text-gray-400 sm:max-w-xl sm:text-base md:mb-12 md:text-lg md:leading-[1.7]"
            variants={slideUpVariants}
          >
            {subtext}
          </motion.p>

          <motion.button
            className="w-full max-w-[320px] transform rounded-full bg-[#8ED800] px-8 py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-black shadow-[0_0_30px_rgba(142,216,0,0.2)] transition-all duration-300 hover:bg-white active:scale-95 sm:w-auto sm:max-w-none sm:px-10"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            {ctaText}
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="relative bottom-0 left-0 w-full border-t border-white/5 bg-black/80 backdrop-blur-md lg:bg-black/60"
        initial="hidden"
        whileInView="visible"
        viewport={getViewportConfig()}
        variants={staggerContainerVariants}
      >
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-3 p-5 sm:grid-cols-2 lg:flex lg:flex-nowrap lg:gap-0 lg:px-6 lg:py-0 xl:px-12">
          {resolvedHighlights.map((item, index) => (
            <React.Fragment key={index}>
              <motion.div
                className="flex w-full lg:w-auto lg:flex-1"
                variants={itemVariants}
              >
                <HighlightCard icon={item.icon} title={item.title} />
              </motion.div>
              {index < resolvedHighlights.length - 1 && (
                <div className="my-6 hidden w-[1px] bg-white/10 lg:block" />
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
