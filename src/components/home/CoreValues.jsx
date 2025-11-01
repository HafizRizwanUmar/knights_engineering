import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHeader from '../common/SectionHeader';
import { FaShieldAlt, FaStar, FaHandshake, FaLightbulb } from 'react-icons/fa';

const CoreValues = () => {
  const { t } = useTranslation();

  const values = [
    { title: t('values.safety'), desc: t('values.safetyDesc'), icon: <FaShieldAlt size={32} /> },
    { title: t('values.quality'), desc: t('values.qualityDesc'), icon: <FaStar size={32} /> },
    { title: t('values.integrity'), desc: t('values.integrityDesc'), icon: <FaHandshake size={32} /> },
    { title: t('values.innovation'), desc: t('values.innovationDesc'), icon: <FaLightbulb size={32} /> },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <motion.section 
      className="py-16 lg:py-24 bg-white"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          title={t('values.title')}
          subtitle={t('values.subtitle')}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              className="text-center p-6"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                {value.icon}
              </div>
              <h3 className="font-heading text-2xl font-semibold text-dark mb-3">{value.title}</h3>
              <p className="font-body text-light">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default CoreValues;