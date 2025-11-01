import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import Page Components
import HeroSlider from '../components/home/HeroSlider';
import SectionHeader from '../components/common/SectionHeader';
import Button from '../components/common/Button';
import ExpertiseCard from '../components/cards/ExpertiseCard';
import ProjectCard from '../components/cards/ProjectCard';
import ClientCarousel from '../components/home/ClientCarousel';
import CoreValues from '../components/home/CoreValues'; // <-- NEW
import StatsCounter from '../components/home/StatsCounter'; // <-- NEW
import Testimonials from '../components/home/Testimonials'; // <-- NEW

// Animation Variant
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] } 
  },
};

// Component for the "About" summary section
const AboutSummary = () => {
  const { t } = useTranslation();
  return (
    <motion.section 
      className="py-16 lg:py-24 bg-off-white"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              title={t('aboutSummary.title')}
              subtitle={t('aboutSummary.subtitle')}
              centered={false}
            />
            <p className="text-light my-6">{t('aboutSummary.text')}</p>
            <Button as={Link} to="/about" variant="primary" className="mt-4">
              {t('buttons.learnMore')}
            </Button>
          </div>
          <motion.div 
            className="w-full h-80 lg:h-full min-h-[300px]"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src="https://images.unsplash.com/photo-1581093582121-7c01f2216b50?auto=format&fit=crop&w=600&q=80"
              alt="Industrial Site"
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Component for the "Expertise" summary section
const ExpertiseSummary = () => {
  const { t } = useTranslation();
  const expertiseData = t('expertise.items', { returnObjects: true });
  
  return (
    <motion.section 
      className="py-16 lg:py-24 bg-white bg-geometric-pattern"
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
          {expertiseData.slice(0, 3).map((item) => (
            <ExpertiseCard key={item.title} item={item} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button as={Link} to="/expertise" variant="secondary">
            {t('buttons.viewAllExpertise')}
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

// Component for the "Projects" summary section
const ProjectsSummary = () => {
  const { t } = useTranslation();
  const projectsData = t('projects.items', { returnObjects: true });
  
  return (
    <motion.section 
      className="py-16 lg:py-24 bg-off-white"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {projectsData.slice(0, 4).map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button as={Link} to="/projects" variant="primary">
            {t('buttons.seeAllProjects')}
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

// Component for the "Clients" summary section
const ClientsSummary = () => {
  const { t } = useTranslation();
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
          title={t('clients.title')}
          subtitle={t('clients.subtitle')}
        />
        <div className="mt-12">
          <ClientCarousel />
        </div>
      </div>
    </motion.section>
  );
};


// Main Home Page Component
const HomePage = () => {
  return (
    <div className="font-body">
      <HeroSlider />
      <AboutSummary />
      <CoreValues /> {/* <-- NEW SECTION */}
      <StatsCounter /> {/* <-- NEW SECTION */}
      <ExpertiseSummary />
      <ProjectsSummary />
      <Testimonials /> {/* <-- NEW SECTION */}
      <ClientsSummary />
    </div>
  );
};

export default HomePage;