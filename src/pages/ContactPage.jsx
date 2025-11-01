import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Button from '../components/common/Button';
import PageHeader from '../components/common/PageHeader'; // <-- Import the new component

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <div className="font-body pt-24 md:pt-20">
      <PageHeader 
        title={t('pageHeaders.contactTitle')}
        subtitle={t('pageHeaders.contactSubtitle')}
        imgSeed="contactheader"
      />
      
      <motion.section 
        className="py-16 lg:py-24 bg-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h3 className="font-heading text-3xl font-semibold mb-6">{t('contactPage.formTitle')}</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-dark mb-1">{t('contactPage.formName')}</label>
                    <input type="text" id="name" className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-dark mb-1">{t('contactPage.formEmail')}</label>
                    <input type="email" id="email" className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-dark mb-1">{t('contactPage.formSubject')}</label>
                  <input type="text" id="subject" className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-dark mb-1">{t('contactPage.formMessage')}</label>
                  <textarea id="message" rows="6" className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"></textarea>
                </div>
                <div>
                  <Button type="submit" variant="primary" className="w-full py-4 text-lg">
                    {t('buttons.sendMessage')}
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="font-heading text-3xl font-semibold mb-6">{t('contactPage.infoTitle')}</h3>
              <p className="text-light">{t('contactPage.infoText')}</p>
              
              <a href="#" className="flex items-start space-x-4 rtl:space-x-reverse p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 group">
                {/* ... (contact info items) ... */}
              </a>
              {/* ... (other contact items and map) ... */}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactPage;