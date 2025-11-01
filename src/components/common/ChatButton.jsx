import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ChatButton = () => {
  const { t } = useTranslation();
  // Replace with your company's WhatsApp number
  const whatsappNumber = "97165343100";
  const message = t('buttons.chatOnWhatsApp');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 end-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg group flex items-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 300 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp size={28} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ms-2 transition-all duration-300">
        {t('buttons.chatOnWhatsApp')}
      </span>
    </motion.a>
  );
};

export default ChatButton;