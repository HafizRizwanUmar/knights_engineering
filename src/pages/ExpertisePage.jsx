import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHeader from '../components/common/SectionHeader';
import PageHeader from '../components/common/PageHeader'; // <-- Import the new component
import ExpertiseCard from '../components/cards/ExpertiseCard';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ExpertisePage = () => {
  const { t } = useTranslation();
  const expertiseData = t('expertise.items', { returnObjects: true });

  return (
    <div className="font-body pt-24 md:pt-20">
      <PageHeader 
        title={t('pageHeaders.expertiseTitle')}
        subtitle={t('pageHeaders.expertiseSubtitle')}
        imgSeed="expertiseheader"
      />
      
      <motion.section 
        className="py-16 lg:py-24 bg-off-white bg-geometric-pattern"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <SectionHeader
            title={t('expertise.title')}
            subtitle={t('expertise.subtitle')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {expertiseData.map((item) => (
              <ExpertiseCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ExpertisePage;