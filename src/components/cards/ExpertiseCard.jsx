import React from 'react';
import { motion } from 'framer-motion';
import { FaChevronRight, FaBuilding, FaTools, FaShip, FaWarehouse, FaHammer, FaCogs } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Map keys to icons
const iconMap = {
  "EPC Works": <FaBuilding size={24} />,
  "Design Engineering": <FaTools size={24} />,
  "Offshore Works": <FaShip size={24} />,
  "Steel Fabrication": <FaWarehouse size={24} />,
  "Civil Construction": <FaHammer size={24} />,
  "MEP Works": <FaCogs size={24} />,
};

const ExpertiseCard = ({ item }) => {
  const { t } = useTranslation();
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden group"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative">
        <img src={`https://picsum.photos/seed/${item.title.split(' ')[0]}/600/400`} alt={item.title} className="w-full h-56 object-cover" />
        <div className="absolute top-4 start-4 bg-primary text-white p-3 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110">
          {iconMap[item.title] || <FaBuilding size={24} />}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-heading text-2xl font-semibold text-dark mb-3">{item.title}</h3>
        <p className="font-body text-light mb-5">{item.description}</p>
        <a
          href="#"
          className="font-semibold text-primary hover:text-red-700 transition-colors duration-300 group inline-flex items-center"
        >
          {t('buttons.readMore')}
          <FaChevronRight className="ms-2 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" size={12} />
        </a>
      </div>
    </motion.div>
  );
};

export default ExpertiseCard;