import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaAward } from 'react-icons/fa';
import { MapPin, ChevronRight, X } from 'lucide-react';
import { CONTACT, WHATSAPP_URLS, CAROUSEL_IMAGES, LOCATIONS } from '@/utils/constants';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const slides = CAROUSEL_IMAGES;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const benefits = [
    { icon: FaAward, text: 'Productos de Alta Calidad' },
    { icon: FaClock, text: 'Servicio Técnico 24/7' },
    { icon: FaMapMarkerAlt, text: '2 Sucursales en Quito' },
  ];

  const openWhatsapp = (location: 'Quito' | 'Valle de los Chillos') => {
    const phoneNumber = location === 'Quito' ? CONTACT.WHATSAPP.QUITO : CONTACT.WHATSAPP.VALLE;
    const message = encodeURIComponent(`Hola, estoy interesado en realizar una cotización. Sector: ${location.toUpperCase()}`);
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
    
    window.location.href = whatsappUrl;
    setIsWhatsAppModalOpen(false);
  };

  useEffect(() => {
    if (isWhatsAppModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isWhatsAppModalOpen]);

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-teal-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-start">
          {/* Left Side - Content & Images (60%) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Image Carousel */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-white"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 p-4"
                >
                  <Image
                    src={slides[currentSlide]}
                    alt={`Equipo dental ${currentSlide + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                </motion.div>
              </AnimatePresence>

              {/* Carousel Indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                {slides.map((_: string, index: number) => (
                  <button
                    key={index}
                    style={{
                      width: index === currentSlide ? '10px' : '8px',
                      height: index === currentSlide ? '10px' : '8px',
                      minWidth: index === currentSlide ? '10px' : '8px',
                      minHeight: index === currentSlide ? '10px' : '8px',
                    }}
                    className={`rounded-full transition-all duration-300 flex-shrink-0 ${
                      index === currentSlide 
                        ? 'bg-teal-500' 
                        : 'bg-white/80 hover:bg-white'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Ir a diapositiva ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
                  Ansa Medic-Dent
                </h1>
                <p className="text-lg md:text-xl text-gray-700 font-light">
                  Transformamos la práctica dental con innovación y calidad superior
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className={`flex items-center space-x-2 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${index === 2 ? 'col-span-2 md:col-span-1' : ''}`}
                  >
                    <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <benefit.icon className="text-white text-base" />
                    </div>
                    <p className="text-xs font-semibold text-gray-700">{benefit.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* Quick Contact Info */}
              <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                <a 
                  href={`tel:${CONTACT.PHONE.MAIN.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center space-x-2 hover:text-teal-600 transition-colors cursor-pointer"
                >
                  <FaPhone className="text-teal-600" />
                  <span>{CONTACT.PHONE.MAIN}</span>
                </a>
                <a 
                  href={`mailto:${CONTACT.EMAIL.MAIN}`}
                  className="flex items-center space-x-2 hover:text-teal-600 transition-colors cursor-pointer"
                >
                  <FaEnvelope className="text-teal-600" />
                  <span>{CONTACT.EMAIL.MAIN}</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Contact Information Card (40%) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/90 backdrop-blur-lg p-4 md:p-6 rounded-3xl shadow-2xl border border-teal-100">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-3"
              >
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">Contáctanos</h2>
                  <p className="text-gray-600 text-sm">Estamos aquí para ayudarte</p>
                </div>

                {/* Phone */}
                <a 
                  href={`tel:${CONTACT.PHONE.MAIN.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg hover:bg-teal-50 hover:border-teal-300 border-2 border-transparent transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaPhone className="text-white text-base" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Teléfono</p>
                    <p className="text-base font-bold text-gray-800 group-hover:text-teal-700">{CONTACT.PHONE.MAIN}</p>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href={`mailto:${CONTACT.EMAIL.MAIN}`}
                  className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg hover:bg-teal-50 hover:border-teal-300 border-2 border-transparent transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaEnvelope className="text-white text-base" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Correo Electrónico</p>
                    <p className="text-sm font-bold text-gray-800 break-all group-hover:text-teal-700">{CONTACT.EMAIL.MAIN}</p>
                  </div>
                </a>

                {/* Locations */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 font-semibold px-2">Ubicaciones</p>
                  
                  {/* Quito */}
                  <a 
                    href={LOCATIONS[0].googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg hover:bg-teal-50 hover:border-teal-300 border-2 border-transparent transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaMapMarkerAlt className="text-white text-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900 group-hover:text-teal-700">Quito - {LOCATIONS[0].address}</p>
                    </div>
                  </a>

                  {/* Valle */}
                  <a 
                    href={LOCATIONS[1].googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg hover:bg-teal-50 hover:border-teal-300 border-2 border-transparent transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaMapMarkerAlt className="text-white text-sm" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900 group-hover:text-teal-700">Valle - {LOCATIONS[1].address}</p>
                    </div>
                  </a>
                </div>

                {/* WhatsApp Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setIsWhatsAppModalOpen(true)}
                    className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-sm"
                  >
                    <FaWhatsapp className="text-lg" />
                    <span>Chatea con Nosotros</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* WhatsApp Location Modal */}
      <AnimatePresence>
        {isWhatsAppModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
            onClick={() => setIsWhatsAppModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-modal-title"
          >
            <motion.div
              initial={{ scale: 0.9, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-700 transition-colors duration-300 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Cerrar modal"
              >
                <X size={24} />
              </button>

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full mb-4 shadow-lg">
                  <FaWhatsapp className="w-10 h-10 text-white" />
                </div>
                <h2 id="whatsapp-modal-title" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Selecciona tu ubicación
                </h2>
                <p className="text-sm text-gray-600">
                  Elige la sucursal más cercana para contactarte
                </p>
              </div>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openWhatsapp('Quito')}
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
                  onClick={() => openWhatsapp('Valle de los Chillos')}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
