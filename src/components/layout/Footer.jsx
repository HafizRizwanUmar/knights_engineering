import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const year = new Date().getFullYear();

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.expertise'), href: '/expertise' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <footer className="bg-dark font-body">
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542308962-eac374872c67?auto=format&fit=crop&w=1920&q=60')" }}
      >
        <div className="w-full h-full bg-black/60"></div>
      </div>

      <div className="container mx-auto px-4 py-16 text-gray-400">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: About */}
          <div className="space-y-4">
            <img src="/logo.png" alt="Knights Engineering Logo" className="h-10 w-auto bg-white p-2 rounded" />
            <p className="text-sm">{t('footer.about')}</p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4 font-heading">{t('footer.links')}</h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm hover:text-white transition-colors duration-300 flex items-center group">
                    <FaChevronRight size={10} className="me-2 text-primary transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4 font-heading">{t('footer.contact')}</h4>
            <a href="#" className="flex items-start space-x-3 rtl:space-x-reverse group">
              <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" size={16} />
              <p className="text-sm group-hover:text-white transition-colors duration-300">{t('topBar.address')}</p>
            </a>
            <a href="tel:+97165343100" className="flex items-start space-x-3 rtl:space-x-reverse group">
              <FaPhone className="text-primary mt-1 flex-shrink-0" size={16} />
              <p className="text-sm group-hover:text-white transition-colors duration-300">{t('topBar.phone')}</p>
            </a>
            <a href="mailto:info@knights.com" className="flex items-start space-x-3 rtl:space-x-reverse group">
              <FaEnvelope className="text-primary mt-1 flex-shrink-0" size={16} />
              <p className="text-sm group-hover:text-white transition-colors duration-300">{t('topBar.email')}</p>
            </a>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4 font-heading">{t('footer.newsletter')}</h4>
            <p className="text-sm">{t('footer.newsletterSub')}</p>
            <form className="flex mt-4">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="w-full px-4 py-2 rounded-s-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-e-md hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Subscribe"
              >
                <FaChevronRight />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright Strip */}
      <div className="bg-black text-gray-500 text-center text-sm py-4">
        <div className="container mx-auto px-4">
          {t('footer.copyright', { year })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;