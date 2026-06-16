import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaAward, FaMapMarkerAlt, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import { MapPin, ChevronRight, X } from 'lucide-react';
import { CONTACT, CAROUSEL_IMAGES } from '@/utils/constants';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const slides = CAROUSEL_IMAGES;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const trust = [
    { icon: FaAward, text: '+10 años de experiencia' },
    { icon: FaMapMarkerAlt, text: '2 sucursales en Quito' },
    { icon: FaShieldAlt, text: 'Calidad garantizada' },
  ];

  const openWhatsapp = (location: 'Quito' | 'Valle de los Chillos') => {
    const phoneNumber = location === 'Quito' ? CONTACT.WHATSAPP.QUITO : CONTACT.WHATSAPP.VALLE;
    const message = encodeURIComponent(`Hola, estoy interesado en realizar una cotización. Sector: ${location.toUpperCase()}`);
    const url = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${message}`;
    window.location.href = url;
    setIsWhatsAppModalOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isWhatsAppModalOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isWhatsAppModalOpen]);

  return (
    <section className="relative bg-gradient-to-br from-cream-50 via-cream-100 to-teal-50 overflow-hidden">
      <div className="absolute inset-0 bg-dots-warm opacity-60 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cream-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Contenido */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <span className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-5 shadow-soft">
              <FaAward className="text-teal-600" /> Tu aliado dental en Quito
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-5 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 bg-clip-text text-transparent">
              Insumos y equipos dentales de calidad
            </h1>

            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
              Explora nuestro catálogo de insumos odontológicos y médicos, con
              servicio técnico especializado y atención cercana por WhatsApp.
            </p>

            {/* CTAs principales */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-full shadow-warm hover:shadow-warm-lg transition-all duration-300 hover:scale-105"
              >
                Ver catálogo
                <FaArrowRight />
              </Link>
              <button
                onClick={() => setIsWhatsAppModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-teal-50 text-teal-700 font-bold py-4 px-8 rounded-full border-2 border-teal-200 hover:border-teal-400 transition-all duration-300"
              >
                <FaWhatsapp className="text-xl text-green-600" />
                Cotizar por WhatsApp
              </button>
            </div>

            {/* Chips de confianza */}
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {trust.map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <t.icon className="text-teal-600" />
                  <span className="font-medium">{t.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Carrusel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative h-[280px] sm:h-[380px] lg:h-[480px] rounded-5xl overflow-hidden shadow-warm-lg bg-white ring-1 ring-cream-200"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 p-5"
              >
                <Image
                  src={slides[currentSlide]}
                  alt={`Equipo dental ${currentSlide + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {slides.map((_: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{ width: index === currentSlide ? '24px' : '8px', height: '8px' }}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-teal-500' : 'bg-teal-200 hover:bg-teal-300'
                  }`}
                  aria-label={`Ir a diapositiva ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal WhatsApp (selección de sucursal) */}
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
              className="bg-white p-6 sm:p-8 rounded-4xl shadow-warm-lg relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsWhatsAppModalOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Cerrar modal"
              >
                <X size={24} />
              </button>

              <div className="text-center mb-7">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full mb-4 shadow-warm">
                  <FaWhatsapp className="w-10 h-10 text-white" />
                </div>
                <h2 id="whatsapp-modal-title" className="text-2xl font-bold text-gray-900 mb-2">
                  Selecciona tu sucursal
                </h2>
                <p className="text-sm text-gray-600">Te atendemos por WhatsApp al instante</p>
              </div>

              <div className="space-y-3">
                {([
                  { loc: 'Quito' as const, label: 'Quito', sub: 'Carcelén' },
                  { loc: 'Valle de los Chillos' as const, label: 'Valle de los Chillos', sub: 'Plaza París' },
                ]).map((b) => (
                  <motion.button
                    key={b.label}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openWhatsapp(b.loc)}
                    className="group w-full bg-white border-2 border-teal-200 hover:border-teal-500 hover:bg-teal-50 text-gray-800 py-4 px-6 rounded-3xl transition-all duration-300 flex items-center justify-between shadow-soft hover:shadow-warm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-md">
                        <FaWhatsapp className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-base text-gray-900 group-hover:text-teal-700">{b.label}</div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{b.sub}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
