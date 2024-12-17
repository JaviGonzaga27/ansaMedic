import React from 'react';
import { motion } from 'framer-motion';
import { FaTools, FaBolt, FaPhoneAlt } from 'react-icons/fa';

const TechnicalService = () => {
  const services = [
    {
      title: "Mantenimiento Preventivo",
      description: "Programas personalizados para extender la vida útil de tus equipos. Revisiones trimestrales disponibles.",
      icon: <FaTools className="text-4xl mb-4 text-teal-500" />
    },
    {
      title: "Reparaciones Rápidas",
      description: "Soluciones eficientes con tiempo de respuesta garantizado en 24 horas para minimizar el tiempo de inactividad.",
      icon: <FaBolt className="text-4xl mb-4 text-teal-500" />
    }
  ];

  const faqs = [
    {
      question: "¿Cuál es el tiempo promedio de reparación?",
      answer: "Nuestro tiempo promedio de reparación es de 48 horas, dependiendo de la complejidad del problema."
    },
    {
      question: "¿Ofrecen servicio de emergencia?",
      answer: "Sí, contamos con servicio de emergencia disponible 24/7 para situaciones críticas."
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-teal-600">Servicio Técnico Especializado</h2>
          <p className="text-lg sm:text-xl mb-8 text-gray-600 max-w-3xl mx-auto">
            Nuestro equipo de expertos está listo para mantener tu equipo en óptimas condiciones, 
            asegurando el funcionamiento continuo de tu práctica dental.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-teal-50 p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
            >
              {service.icon}
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-teal-600">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-semibold mb-6 text-teal-600 text-center">Preguntas Frecuentes</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-teal-50 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-700 mb-2">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <a 
            href="#contact" 
            className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 sm:px-8 rounded-full transition duration-300 transform hover:scale-105"
          >
            <FaPhoneAlt className="mr-2" />
            Solicitar Servicio Técnico
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalService;