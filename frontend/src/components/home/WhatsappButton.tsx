import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface WhatsappButtonProps {
  quitoPhoneNumber: string;
  vallePhoneNumber: string;
  message?: string;
}

const WhatsappButton: React.FC<WhatsappButtonProps> = ({ quitoPhoneNumber, vallePhoneNumber, message = '' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openWhatsapp = (location: 'quito' | 'valle') => {
    const phoneNumber = location === 'quito' ? quitoPhoneNumber : vallePhoneNumber;
    const whatsappUrl = `https://wa.me/${phoneNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
    window.open(whatsappUrl, '_blank');
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 flex items-center justify-center animate-fade-in-up animation-delay-900"
      >
        <FaWhatsapp className="w-6 h-6 mr-2" />
        Contactar por WhatsApp
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-6 rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">Selecciona tu ubicación</h2>
              <div className="flex space-x-4">
                <button
                  onClick={() => openWhatsapp('quito')}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Quito
                </button>
                <button
                  onClick={() => openWhatsapp('valle')}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Valle de los Chillos
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsappButton;