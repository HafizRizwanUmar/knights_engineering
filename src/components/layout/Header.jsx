import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes, FaGlobe
} from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { t, i18n } = useTranslation();

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.expertise'), href: '/expertise' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navLinkClass = ({ isActive }) =>
    `relative py-2 font-body font-medium transition-colors duration-300 ${
      isActive ? 'text-primary' : 'text-dark hover:text-primary'
    } after:content-[''] after:absolute after:start-0 after:bottom-0 after:h-0.5 after:transition-all after:duration-300 ${
      isActive ? 'after:w-full after:bg-primary' : 'after:w-0 after:bg-secondary'
    } hover:after:w-full`;
    
  const mobileNavLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive ? 'bg-red-50 text-primary' : 'text-dark hover:bg-gray-100 hover:text-primary'
    }`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out font-body ${
      isSticky ? 'shadow-lg bg-white/95 backdrop-blur-sm' : 'bg-white'
    }`}>
      {/* Top Bar */}
      <div className="bg-dark text-white py-1 px-4 md:px-8 lg:px-12 hidden md:flex justify-end items-center text-xs space-x-6 rtl:space-x-reverse">
        <a href="tel:+97165343100" className="flex items-center hover:text-gray-200">
          <FaPhone className="me-2" /> {t('topBar.phone')}
        </a>
        <a href="mailto:info@knights.com" className="flex items-center hover:text-gray-200">
          <FaEnvelope className="me-2" /> {t('topBar.email')}
        </a>
        <span className="flex items-center">
          <FaMapMarkerAlt className="me-2" /> {t('topBar.address')}
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="relative py-4 px-4 md:px-8 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          {/* USE YOUR LOGO HERE */}
          <img src="/logo.png" alt="Knights Engineering Logo" className="h-10 md:h-12 w-auto" />
        </Link>

        {/* Desktop Nav Links & Language Switcher */}
        <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.href} className={navLinkClass}>
              {link.name}
            </NavLink>
          ))}
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center text-dark hover:text-primary transition-colors duration-300 font-medium"
            aria-label="Toggle Language"
          >
            <FaGlobe className="me-1.5" />
            {i18n.language === 'en' ? 'العربية' : 'English'}
          </button>
        </div>

        {/* Hamburger Icon */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="text-dark hover:text-primary transition-colors duration-300 font-medium p-2"
            aria-label="Toggle Language"
          >
            <FaGlobe size={20} />
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-dark focus:outline-none p-2" aria-label="Open menu">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden overflow-hidden bg-white absolute top-full left-0 right-0 shadow-lg`}
          >
            <div className="flex flex-col px-4 pt-2 pb-4 space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={mobileNavLinkClass}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;