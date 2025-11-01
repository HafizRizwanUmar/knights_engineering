import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaChevronRight, FaLightbulb, FaProjectDiagram, FaUserCheck } from 'react-icons/fa';
import SectionHeader from '../components/common/SectionHeader';
import PageHeader from '../components/common/PageHeader'; // <-- Import the new component

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="font-body pt-24 md:pt-20">
      <PageHeader 
        title={t('pageHeaders.aboutTitle')}
        subtitle={t('pageHeaders.aboutSubtitle')}
        imgSeed="aboutheader"
      />

      {/* Main About Section */}
      <motion.section 
        className="py-16 lg:py-24 bg-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                title={t('aboutPage.title')}
                subtitle={t('aboutPage.subtitle')}
                centered={false}
              />
              <p className="text-light my-6">{t('aboutPage.text')}</p>
              <ul className="space-y-3">
                <li className="flex items-center font-semibold text-dark text-lg">
                  <FaChevronRight className="me-3 text-primary" size={14} />
                  {t('aboutPage.listItem1')}
                </li>
                <li className="flex items-center font-semibold text-dark text-lg">
                  <FaChevronRight className="me-3 text-primary" size={14} />
                  {t('aboutPage.listItem2')}
                </li>
                <li className="flex items-center font-semibold text-dark text-lg">
                  <FaChevronRight className="me-3 text-primary" size={14} />
                  {t('aboutPage.listItem3')}
                </li>
              </ul>
            </div>
            <motion.div 
              className="w-full h-80 lg:h-full min-h-[400px]"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src="https://images.unsplash.com/photo-1556761175-59736f6230ba?auto=format&fit=crop&w=600&q=80"
                alt="Our Team"
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Mission & Vision Section */}
      <motion.section 
        className="py-16 lg:py-24 bg-off-white bg-geometric-pattern"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} className="p-8 bg-white rounded-lg shadow-lg text-center">
              <FaLightbulb size={48} className="mx-auto text-primary mb-4" />
              <h3 className="font-heading text-2xl font-semibold mb-3">{t('aboutPage.mission')}</h3>
              <p className="text-light">{t('aboutPage.missionText')}</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="p-8 bg-white rounded-lg shadow-lg text-center">
              <FaProjectDiagram size={48} className="mx-auto text-primary mb-4" />
              <h3 className="font-heading text-2xl font-semibold mb-3">{t('aboutPage.vision')}</h3>
              <p className="text-light">{t('aboutPage.visionText')}</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="p-8 bg-white rounded-lg shadow-lg text-center">
              <FaUserCheck size={48} className="mx-auto text-primary mb-4" />
              <h3 className="font-heading text-2xl font-semibold mb-3">{t('aboutPage.values')}</h3>
              <p className="text-light">{t('aboutPage.valuesText')}</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;