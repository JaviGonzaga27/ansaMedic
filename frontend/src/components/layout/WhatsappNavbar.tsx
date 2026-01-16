import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const WhatsappNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  const modalContent = (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="whatsapp-modal-title"
        >
          <motion.div
            initial={{ scale: 0.9, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl relative w-full max-w-xs sm:max-w-sm md:max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-700 transition-colors duration-300 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Cerrar modal"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full mb-4">
                <FaWhatsapp className="w-8 h-8 text-white" />
              </div>
              <h2 id="whatsapp-modal-title" className="text-2xl sm:text-3xl font-bold text-gray-800">
                Selecciona tu ubicación
              </h2>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Elige la sucursal más cercana para contactarte
              </p>
            </div>

            <div className="flex flex-col space-y-3 sm:space-y-4">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openWhatsapp('Quito')}
                className="bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#25D366] text-white font-bold py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-xl text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
              >
                <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
                <div className="text-left">
                  <div className="font-bold">Quito</div>
                  <div className="text-xs opacity-90">Carcelén</div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openWhatsapp('Valle de los Chillos')}
                className="bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#25D366] text-white font-bold py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-xl text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
              >
                <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
                <div className="text-left">
                  <div className="font-bold">Valle de los Chillos</div>
                  <div className="text-xs opacity-90">Plaza París</div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(37, 211, 102, 0.6)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#25D366] text-white font-bold py-2.5 px-4 sm:px-5 rounded-full transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label="Abrir opciones de contacto por WhatsApp"
      >
        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
        </motion.div>
        <span className="hidden sm:inline ml-2 text-sm md:text-base relative z-10 font-semibold">Contactar</span>
      </motion.button>

      {mounted && createPortal(modalContent, document.body)}
    </>
  );
};

export default WhatsappNavbar;