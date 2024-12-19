import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const WhatsappNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openWhatsapp = (location: 'Quito' | 'Valle de los Chillos') => {
    const phoneNumber = location === 'Quito' ? '+593979380563' : '+593992339152';
    const message = encodeURIComponent(`Hola, estoy interesado en realizar una cotización. Sector: ${location.toUpperCase()}`);
    
    // Comprobar si el dispositivo es móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    let whatsappUrl;
    if (isMobile) {
      // Para dispositivos móviles, usar la app de WhatsApp
      whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
    } else {
      // Para escritorio, usar WhatsApp Web
      whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    }
    
    window.open(whatsappUrl, '_blank');
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(37, 211, 102, 0.5)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-2 px-3 sm:px-4 rounded-full transition duration-300 flex items-center justify-center shadow-lg relative overflow-hidden group"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
        <span className="hidden sm:inline ml-2 text-xs sm:text-sm md:text-base relative z-10">Contactar</span>
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-6 sm:p-8 rounded-lg shadow-2xl relative w-full max-w-xs sm:max-w-sm md:max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 transition duration-300"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#0f7d80]">Selecciona tu ubicación</h2>
              <div className="flex flex-col space-y-3 sm:space-y-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openWhatsapp('Quito')}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-300 flex items-center justify-center shadow-md text-sm sm:text-base"
                >
                  <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Quito
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openWhatsapp('Valle de los Chillos')}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-300 flex items-center justify-center shadow-md text-sm sm:text-base"
                >
                  <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Valle de los Chillos
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsappNavbar;