import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaWhatsapp, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { WHATSAPP_URLS } from '@/utils/constants';

const cotizaUrl = `${WHATSAPP_URLS.QUITO}?text=${encodeURIComponent(
  'Hola, quisiera cotizar insumos para mi consultorio dental.'
)}`;

const CallToAction = () => {
  return (
    <section className="bg-gradient-to-br from-teal-700 to-teal-600 py-16 md:py-20 px-4 relative overflow-hidden">
      {/* Textura sutil (marca teal) */}
      <div className="absolute inset-0 bg-dots-warm opacity-10 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-300 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center text-white relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
            Equipa tu consultorio con un solo mensaje
          </h2>
          <p className="text-lg md:text-xl mb-9 text-teal-50 max-w-2xl mx-auto leading-relaxed">
            Explora el catálogo, arma tu lista y confirma precio y disponibilidad
            por WhatsApp. Sin complicaciones, con asesoría real.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center mb-9">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 hover:bg-teal-50 font-bold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-warm hover:shadow-warm-lg"
            >
              Ver catálogo
              <FaArrowRight />
            </Link>
            <a
              href={cotizaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <FaWhatsapp className="text-xl" />
              Cotizar por WhatsApp
            </a>
          </div>

          {/* Señales de confianza */}
          <div className="flex flex-wrap justify-center gap-x-7 gap-y-2 text-sm text-teal-100">
            <span className="inline-flex items-center gap-2">
              <FaMapMarkerAlt className="text-teal-200" /> 2 sucursales en Quito
            </span>
            <span className="inline-flex items-center gap-2">
              <FaClock className="text-teal-200" /> Respuesta rápida por WhatsApp
            </span>
            <span className="inline-flex items-center gap-2">
              <FaArrowRight className="text-teal-200" /> Envíos a todo el Ecuador
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
