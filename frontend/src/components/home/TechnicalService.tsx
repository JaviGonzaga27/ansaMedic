import React from 'react';
import { motion } from 'framer-motion';
import { FaTools, FaBolt, FaPhoneAlt, FaShieldAlt, FaClock } from 'react-icons/fa';
import { WHATSAPP_URLS } from '@/utils/constants';

const TechnicalService = () => {
  const services = [
    {
      title: "Mantenimiento Preventivo",
      description: "Programas personalizados para extender la vida útil de tus equipos con revisiones trimestrales.",
      icon: <FaTools className="text-5xl mb-4 text-blue-500" />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Reparaciones Rápidas",
      description: "Soluciones eficientes con tiempo de respuesta garantizado en 24 horas.",
      icon: <FaBolt className="text-5xl mb-4 text-yellow-500" />,
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      title: "Garantía Extendida",
      description: "Protección completa para tu inversión con cobertura extendida disponible.",
      icon: <FaShieldAlt className="text-5xl mb-4 text-green-500" />,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Soporte 24/7",
      description: "Asistencia técnica disponible en todo momento para emergencias críticas.",
      icon: <FaClock className="text-5xl mb-4 text-purple-500" />,
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-teal-300 to-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-300 to-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl w-full relative z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent"
          >
            Servicio Técnico Especializado
          </motion.h2>
          <p className="text-base sm:text-lg mb-6 text-gray-700 max-w-3xl mx-auto">
            Nuestro equipo de expertos está listo para mantener tu equipo en óptimas condiciones
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-white/90 backdrop-blur-sm p-5 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 text-center"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="inline-block"
              >
                {service.icon}
              </motion.div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">{service.description}</p>
              <div className={`mt-3 h-1 w-16 mx-auto rounded-full bg-gradient-to-r ${service.gradient}`}></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <a
            href={WHATSAPP_URLS.SERVICIO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 hover:from-blue-700 hover:via-cyan-700 hover:to-teal-700 text-white font-bold py-3 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <FaPhoneAlt className="mr-2 text-base sm:text-lg" />
            Solicitar Servicio Técnico
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalService;