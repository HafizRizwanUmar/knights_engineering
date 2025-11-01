import React, { useState } from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaProjectDiagram, FaCalendarAlt, FaUsers, FaUserTie } from 'react-icons/fa';

const StatsCounter = () => {
  const [didView, setDidView] = useState(false);
  const { t } = useTranslation();

  const onVisibilityChange = (isVisible) => {
    if (isVisible && !didView) {
      setDidView(true);
    }
  };

  const stats = [
    { num: 350, title: t('stats.projects'), icon: <FaProjectDiagram size={40} /> },
    { num: 20, title: t('stats.experience'), icon: <FaCalendarAlt size={40} /> },
    { num: 150, title: t('stats.clients'), icon: <FaUsers size={40} /> },
    { num: 200, title: t('stats.experts'), icon: <FaUserTie size={40} /> },
  ];

  return (
    <VisibilitySensor onChange={onVisibilityChange} partialVisibility>
      <section className="py-16 lg:py-24 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={didView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="mb-4 text-secondary">{stat.icon}</div>
                <div className="font-heading text-5xl font-bold">
                  <CountUp end={didView ? stat.num : 0} duration={3} />+
                </div>
                <p className="font-body text-lg mt-2 opacity-90">{stat.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </VisibilitySensor>
  );
};

export default StatsCounter;