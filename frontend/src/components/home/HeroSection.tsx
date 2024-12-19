import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaEnvelope } from 'react-icons/fa';

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const slides = ['/images1.jpg', '/images2.jpg', '/images3.jpg'];

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
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simular envío
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative h-screen bg-gradient-to-r from-teal-800 to-teal-600 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide]}
              alt={`Equipo dental ${currentSlide + 1}`}
              layout="fill"
              objectFit="cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight font-sans">
            Ansa <span className="text-teal-300">Medic-Dent</span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto font-light">
            Transformamos la práctica dental con innovación, calidad superior y soporte técnico excepcional
          </p>
          <motion.button
            className="bg-teal-500 text-white hover:bg-teal-400 font-bold py-3 px-8 rounded-full transition duration-300 text-lg shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(0,255,255,0.5)" }}
            whileTap={{ scale: 0.95 }}
            aria-label="Descubre nuestros productos"
          >
            Descubre Nuestros Productos <FaArrowRight className="inline-block ml-2" />
          </motion.button>
        </motion.div>

        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {isSubmitted ? (
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl text-center">
              <h3 className="text-2xl font-semibold mb-4 text-teal-300">¡Gracias por tu solicitud!</h3>
              <p className="text-white">Nos pondremos en contacto contigo pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl">
              <h3 className="text-2xl font-semibold mb-6 text-center text-teal-300">Solicita Información</h3>
              <div className="mb-4">
                <input type="text" id="name" name="name" placeholder="Nombre" className="w-full px-4 py-3 bg-white/20 border border-teal-300/50 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-white placeholder-teal-200 transition-all duration-300 hover:bg-white/30" required />
              </div>
              <div className="mb-4">
                <input type="email" id="email" name="email" placeholder="Correo electrónico" className="w-full px-4 py-3 bg-white/20 border border-teal-300/50 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-white placeholder-teal-200 transition-all duration-300 hover:bg-white/30" required />
              </div>
              <div className="mb-6">
                <textarea id="message" name="message" placeholder="Mensaje" rows={3} className="w-full px-4 py-3 bg-white/20 border border-teal-300/50 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-white placeholder-teal-200 transition-all duration-300 hover:bg-white/30" required></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 px-4 rounded-md transition duration-300 flex items-center justify-center shadow-lg"
                disabled={isLoading}
                whileHover={{ scale: 1.03, boxShadow: "0px 0px 8px rgba(0,255,255,0.5)" }}
                whileTap={{ scale: 0.97 }}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Solicitud <FaEnvelope className="ml-2" />
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-teal-300 scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;