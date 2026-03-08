import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, MapPin, Phone } from 'lucide-react';
import { useSelector } from 'react-redux';
import {
  fadeInVariants,
  itemVariants,
  staggerContainerVariants,
  getViewportConfig,
} from '../../../utils/animations';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact', to: '/contact' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const homeData = useSelector((state) => state.home?.data);
  const settings = homeData?.settings;
  const socialMedia = Array.isArray(settings?.socialMedia)
    ? settings.socialMedia
    : [];

  return (
    <footer className="bg-black px-4 py-12 font-open-sans text-white">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center space-y-6 text-center">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={getViewportConfig()}
          variants={fadeInVariants}
        >
          <Link to="/" className="mb-4 flex items-center justify-center">
            {settings?.logo ? (
              <img
                src={settings.logo}
                alt="Logo"
                className="h-14 w-auto object-contain"
              />
            ) : (
              <span className="font-bebas-neue text-[64px] leading-none tracking-tight text-white transition-colors duration-300 hover:text-[#8ED800]">
                LOGO
              </span>
            )}
          </Link>
        </motion.div>

        <motion.nav
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400"
          initial="hidden"
          whileInView="visible"
          viewport={getViewportConfig()}
          variants={staggerContainerVariants}
        >
          {NAV_LINKS.map((link) => (
            <motion.div key={link.to} variants={itemVariants}>
              <Link
                to={link.to}
                className="uppercase tracking-widest transition-colors duration-200 hover:text-[#8ED800]"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        <motion.div
          className="flex flex-col items-center space-y-4 text-sm text-gray-400"
          initial="hidden"
          whileInView="visible"
          viewport={getViewportConfig()}
          variants={staggerContainerVariants}
        >
          <motion.div
            className="flex items-center space-x-2"
            variants={itemVariants}
          >
            <MapPin size={18} className="shrink-0 text-gray-400" />
            <span>{settings?.officeAddress || '123 Print Avenue, Suite 456, Creative City, ZIP 78910'}</span>
          </motion.div>
          <motion.div
            className="flex items-center space-x-2"
            variants={itemVariants}
          >
            <Phone size={18} className="shrink-0 text-gray-400" />
            <span>{settings?.phoneNumber || '403-230-4649'}</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 flex w-full flex-col items-center justify-between space-y-6 border-t border-white/10 pt-8 text-[10px] uppercase tracking-widest text-gray-500 md:flex-row md:space-y-0"
          initial="hidden"
          whileInView="visible"
          viewport={getViewportConfig()}
          variants={staggerContainerVariants}
        >
          <motion.div
            className="hidden flex-1 text-left md:block"
            variants={itemVariants}
          >
            {settings?.footerText || `Copyright © ${currentYear} . All Rights Reserved`}
          </motion.div>
          <motion.div className="md:hidden" variants={itemVariants}>
            {settings?.footerText || `Copyright © ${currentYear} . All Rights Reserved`}
          </motion.div>

          <motion.div
            className="flex items-center space-x-5 text-gray-400"
            variants={staggerContainerVariants}
          >
            {socialMedia.length ? (
              socialMedia.map((item) => (
                <motion.a
                  key={item._id}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                  variants={itemVariants}
                  whileHover={{ scale: 1.2, opacity: 0.8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={item.icon}
                    alt="Social media"
                    className="h-6 w-6 rounded object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </motion.a>
              ))
            ) : (
              <>
                <motion.a
                  href="#"
                  variants={itemVariants}
                  whileHover={{ scale: 1.2, color: '#8ED800' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram size={20} strokeWidth={1.5} />
                </motion.a>
                <motion.a
                  href="#"
                  variants={itemVariants}
                  whileHover={{ scale: 1.2, color: '#8ED800' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  variants={itemVariants}
                  whileHover={{ scale: 1.2, color: '#8ED800' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Facebook size={20} strokeWidth={1.5} />
                </motion.a>
              </>
            )}
          </motion.div>

          <motion.div
            className="flex flex-1 justify-end space-x-4"
            variants={staggerContainerVariants}
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/privacy-policy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
            </motion.div>
            <span className="text-gray-700">|</span>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/terms" className="transition-colors hover:text-white">
                Terms & Conditions
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;