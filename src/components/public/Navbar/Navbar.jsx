import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Phone, Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fallbackNavLinks = [
    { title: 'Digital Printing', href: '#' },
    { title: 'Large Format', href: '#' },
    { title: 'Print & Scan', href: '#' },
    { title: 'Blueprint Printing', href: '#' },
    { title: 'Graphic Design', href: '#' },
    { title: 'Upload File', href: '#' },
  ];

  const homeData = useSelector((state) => state.home?.data);
  const header = homeData?.header;
  const settings = homeData?.settings;

  const navLinks = useMemo(() => {
    if (Array.isArray(header?.navigation) && header.navigation.length) {
      return header.navigation
        .filter((item) => item.isActive)
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((item) => ({
          title: item.title || '',
          href: '#',
        }));
    }
    return fallbackNavLinks;
  }, [header?.navigation]);

  const ctaButton = header?.ctaButton;

  const navLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.4,
      },
    }),
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.15,
      color: '#8ED800',
      transition: { duration: 0.3 },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const mobileMenuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <nav className="grid-background sticky top-0 z-50 border-b border-white/5 bg-black px-4 py-4 font-open-sans text-white">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
        <motion.div
          className="w-[120px] flex-shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex items-center">
            {settings?.logo ? (
              <img
                src={settings.logo}
                alt="Logo"
                className="h-10 w-auto object-contain"
              />
            ) : (
              <span className="font-bebas-neue text-[32px] font-normal leading-none tracking-tight text-white transition-colors duration-300 hover:text-[#8ED800]">
                LOGO
              </span>
            )}
          </Link>
        </motion.div>

        <motion.div
          className="hidden flex-1 items-center justify-center space-x-8 text-[14px] font-medium leading-none tracking-wide lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {navLinks.map((link, index) => (
            <motion.div
              key={link.title}
              custom={index}
              variants={navLinkVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.3 }}>
                <Link
                  to={link.href}
                  className="whitespace-nowrap text-gray-400 transition-colors duration-300 hover:text-[#8ED800]"
                >
                  {link.title}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-shrink-0 items-center space-x-6">
          <motion.div
            className="hidden items-center space-x-5 sm:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              className="text-white/70 transition-colors duration-300"
              aria-label="Search"
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
            >
              <Search size={20} strokeWidth={1.5} />
            </motion.button>
            <motion.button
              className="text-white/70 transition-colors duration-300"
              aria-label="Cart"
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
            >
              <ShoppingCart size={20} strokeWidth={1.5} />
            </motion.button>
            <motion.button
              className="text-white/70 transition-colors duration-300"
              aria-label="Profile"
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
            >
              <User size={20} strokeWidth={1.5} />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              to={ctaButton?.link || '/request-quote'}
              className="hidden whitespace-nowrap rounded-full bg-[#8ED800] px-6 py-2 text-[11px] font-bold uppercase tracking-widest text-black transition-all duration-300 hover:bg-white sm:inline-block"
            >
              {ctaButton?.text || 'Request A Quote'}
            </Link>
          </motion.div>

          <motion.button
            className="p-1 text-white lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="absolute left-0 top-full flex w-full flex-col space-y-4 border-t border-gray-800 bg-black px-6 py-6 lg:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {navLinks.map((link) => (
              <motion.div key={link.title} variants={mobileMenuItemVariants}>
                <Link
                  to={link.href}
                  className="block border-b border-gray-800 pb-3 text-sm text-gray-200 transition-colors duration-200 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              </motion.div>
            ))}
            <motion.div
              className="flex items-center justify-between pt-4"
              variants={mobileMenuItemVariants}
            >
              <div className="flex space-x-5 text-gray-200">
                <motion.div whileHover={{ scale: 1.15 }}>
                  <Search size={20} strokeWidth={1.5} />
                </motion.div>
                <motion.div whileHover={{ scale: 1.15 }}>
                  <ShoppingCart size={20} strokeWidth={1.5} />
                </motion.div>
                <motion.div whileHover={{ scale: 1.15 }}>
                  <User size={20} strokeWidth={1.5} />
                </motion.div>
                <motion.div whileHover={{ scale: 1.15 }}>
                  <Phone size={20} strokeWidth={1.5} />
                </motion.div>
              </div>
              <Link
                to={ctaButton?.link || '/request-quote'}
                className="rounded-full border border-[#c8f135] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-[#c8f135] transition-all duration-300 hover:bg-[#c8f135] hover:text-black"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {ctaButton?.text || 'Request A Quote'}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
