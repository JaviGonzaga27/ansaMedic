import React from 'react';
import { motion } from 'framer-motion';
import { FaTeeth, FaSyringe, FaHandHoldingMedical } from 'react-icons/fa';

const EmprendeSection = () => {
  const benefits = [
    {
      icon: <FaTeeth className="text-4xl mb-4 text-teal-500" />,
      title: "Variedad de Productos",
      description: "Accede a una amplia gama de insumos odontológicos de alta calidad para tu práctica diaria."
    },
    {
      icon: <FaSyringe className="text-4xl mb-4 text-teal-500" />,
      title: "Kits de Inicio",
      description: "Comienza con todo lo necesario gracias a nuestros kits completos para nuevos consultorios."
    },
    {
      icon: <FaHandHoldingMedical className="text-4xl mb-4 text-teal-500" />,
      title: "Asesoría en Insumos",
      description: "Recibe orientación experta para elegir los mejores productos según tus necesidades específicas."
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-teal-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-teal-800">Emprende tu Consultorio con Nuestros Insumos</h2>
          <p className="text-lg sm:text-xl mb-8 text-teal-700 max-w-3xl mx-auto">
            Equipamos tu consultorio con los mejores insumos odontológicos para que inicies tu práctica con confianza.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
            >
              {benefit.icon}
              <h3 className="text-xl font-semibold mb-3 text-teal-700">{benefit.title}</h3>
              <p className="text-teal-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <a 
            href="/products" 
            className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 text-lg"
          >
            Ver Catálogo de Insumos
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default EmprendeSection;