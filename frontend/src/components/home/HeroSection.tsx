import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaAward } from 'react-icons/fa';
import { CONTACT, WHATSAPP_URLS, CAROUSEL_IMAGES } from '@/utils/constants';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const slides = CAROUSEL_IMAGES;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        (e.target as HTMLFormElement).reset();
      }, 5000);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: FaAward, text: 'Productos de Alta Calidad' },
    { icon: FaClock, text: 'Servicio Técnico 24/7' },
    { icon: FaMapMarkerAlt, text: '2 Sucursales en Quito' },
  ];

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
                    layout="fill"
                    objectFit="contain"
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
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
                <div className="flex items-center space-x-2">
                  <FaPhone className="text-teal-600" />
                  <span>{CONTACT.PHONE.MAIN}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-teal-600" />
                  <span>{CONTACT.EMAIL}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Contact Form (40%) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/90 backdrop-blur-lg p-6 md:p-8 rounded-3xl shadow-2xl border border-teal-100">
              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-4">
                    <FaCheckCircle className="text-white text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-gray-600 text-sm">Nos pondremos en contacto contigo pronto.</p>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Solicita Información</h2>
                    <p className="text-gray-600 text-sm">Completa el formulario y te contactaremos</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Juan Pérez"
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="juan@ejemplo.com"
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-1">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="0999 123 456"
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-1">
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="¿En qué podemos ayudarte?"
                        rows={3}
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:bg-gray-100 resize-none text-sm"
                        required
                      ></textarea>
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                      disabled={isLoading}
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <FaEnvelope className="mr-2" />
                          Enviar Solicitud
                        </>
                      )}
                    </motion.button>
                  </form>

                  {/* WhatsApp Quick Contact */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-center text-xs text-gray-600 mb-2">O contáctanos directamente</p>
                    <a
                      href={WHATSAPP_URLS.QUITO}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                    >
                      <FaWhatsapp className="text-lg" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;