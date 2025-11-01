import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const Button = ({ children, variant = 'primary', className = '', as = 'button', ...props }) => {
  const styles = {
    primary: `bg-primary text-white hover:bg-red-700`,
    secondary: `bg-off-white text-primary border border-primary hover:bg-gray-100`,
  };
  const Tag = as;
  
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      <Tag
        className={`py-3 px-7 rounded font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 group inline-flex items-center justify-center gap-2 ${styles[variant]} ${className}`}
        {...props}
      >
        {children}
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" size={12} />
      </Tag>
    </motion.div>
  );
};

export default Button;