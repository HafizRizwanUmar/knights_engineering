import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHeader from '../components/common/SectionHeader';
import ProjectCard from '../components/cards/ProjectCard';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ProjectsPage = () => {
  const { t } = useTranslation();
  const projectsData = t('projects.items', { returnObjects: true });

  return (
    // Note: Added padding-top to account for the fixed header
    <div className="font-body pt-24 md:pt-20"> 
      <motion.section 
        className="py-16 lg:py-24 bg-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <SectionHeader
            title={t('projects.title')}
            subtitle={t('projects.subtitle')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {/* Repeating the data to fill the page, as in original code */}
            {[...projectsData, ...projectsData.slice(0, 4)].map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ProjectsPage;