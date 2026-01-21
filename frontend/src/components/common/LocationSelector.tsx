import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import { MapPin, ChevronRight } from 'lucide-react';
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
    
    // Usar el protocolo whatsapp:// que funciona para móvil, desktop y web
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
    
    window.location.href = whatsappUrl;
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
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full mb-4 shadow-lg">
              <FaWhatsapp className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Selecciona tu ubicación
            </h2>
            <p className="text-sm text-gray-600">
              Elige la sucursal más cercana para contactarte
            </p>
          </div>

          {/* Location Buttons */}
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleWhatsAppClick('Quito')}
              className="group w-full bg-white border-2 border-teal-200 hover:border-teal-500 hover:bg-teal-50 text-gray-800 py-5 px-6 rounded-2xl transition-all duration-300 flex items-center justify-between shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-md">
                  <FaWhatsapp className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg text-gray-900 group-hover:text-teal-700 transition-colors">Quito</div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Carcelén</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleWhatsAppClick('Valle')}
              className="group w-full bg-white border-2 border-teal-200 hover:border-teal-500 hover:bg-teal-50 text-gray-800 py-5 px-6 rounded-2xl transition-all duration-300 flex items-center justify-between shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-md">
                  <FaWhatsapp className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg text-gray-900 group-hover:text-teal-700 transition-colors">Valle de los Chillos</div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Plaza París</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
            </motion.button>
          </div>

          {/* Product Info Badge */}
          <div className="mt-6 bg-gradient-to-r from-teal-50 to-teal-100/50 border border-teal-200 rounded-xl p-4">
            <p className="text-sm text-gray-700 text-center">
              <span className="font-semibold text-teal-800">Producto: </span>
              <span className="text-gray-800">{productName}</span>
            </p>
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
