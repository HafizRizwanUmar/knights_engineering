import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => (
  <motion.div 
    className="relative rounded-lg overflow-hidden shadow-lg group aspect-w-4 aspect-h-3"
    whileHover={{ scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 400 }}
  >
    <img
      src={`https://picsum.photos/seed/${project.title.split(' ')[0]}/400/300`}
      alt={project.title}
      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ease-in-out flex items-end p-6">
      <h3 className="font-heading text-white text-2xl font-semibold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        {project.title}
      </h3>
    </div>
  </motion.div>
);

export default ProjectCard;