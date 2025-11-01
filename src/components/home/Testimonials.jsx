import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHeader from '../common/SectionHeader';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  const { t } = useTranslation();
  const testimonials = t('testimonials.items', { returnObjects: true });

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section 
      className="py-16 lg:py-24 bg-off-white bg-geometric-pattern"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          title={t('testimonials.title')}
          subtitle={t('testimonials.subtitle')}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {testimonials.map((item, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <FaQuoteLeft className="text-primary/50 text-5xl mb-4" />
              <p className="font-body text-light italic text-lg mb-6">"{item.quote}"</p>
              <div className="flex items-center">
                {/* Placeholder image */}
                <img src={`https://i.pravatar.cc/100?img=${index + 1}`} alt={item.name} className="w-16 h-16 rounded-full me-4" />
                <div>
                  <h4 className="font-heading text-xl font-semibold text-dark">{item.name}</h4>
                  <p className="font-body text-primary">{item.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;