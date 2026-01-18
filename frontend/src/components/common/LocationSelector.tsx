import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import { CONTACT } from '@/utils/constants';

interface LocationSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productId?: string;
}

export default function LocationSelector({ isOpen, onClose, productName, productId }: LocationSelectorProps) {
  const handleWhatsAppClick = (location: 'Quito' | 'Valle') => {
    const phoneNumber = location === 'Quito' ? CONTACT.WHATSAPP.QUITO : CONTACT.WHATSAPP.VALLE;
    const productUrl = typeof window !== 'undefined' ? `${window.location.origin}/products${productId ? `#${productId}` : ''}` : '';
    const message = encodeURIComponent(`Hola, estoy interesado en ${productName}. Link: ${productUrl}`);
    
    // Detectar si es móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    const whatsappUrl = isMobile 
      ? `whatsapp://send?phone=${phoneNumber}&text=${message}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: -20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl relative w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Cerrar selector de ubicación"
          >
            <FaTimes size={20} />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4">
              <FaMapMarkerAlt className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Elige tu sucursal
            </h2>
            <p className="text-sm text-gray-600">
              Selecciona la ubicación más cercana
            </p>
          </div>

          {/* Product Info */}
          <div className="bg-teal-50 border border-teal-100 rounded-xl p-3 mb-6">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Producto:</span> {productName}
            </p>
          </div>

          {/* Location Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleWhatsAppClick('Quito')}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-between shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <div className="flex items-center">
                <FaWhatsapp className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="font-bold text-base">Quito</div>
                  <div className="text-xs opacity-90">Carcelén</div>
                </div>
              </div>
              <div className="text-xs opacity-75">{CONTACT.WHATSAPP.QUITO}</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleWhatsAppClick('Valle')}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-between shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <div className="flex items-center">
                <FaWhatsapp className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="font-bold text-base">Valle de los Chillos</div>
                  <div className="text-xs opacity-90">Plaza París</div>
                </div>
              </div>
              <div className="text-xs opacity-75">{CONTACT.WHATSAPP.VALLE}</div>
            </motion.button>
          </div>

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="w-full mt-4 text-gray-600 hover:text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancelar
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
