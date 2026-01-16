import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Dra. María Rodríguez",
      role: "Odontóloga General",
      text: "Ansa Medic-Dent ha revolucionado mi práctica. Sus productos son de primera calidad y su servicio técnico es inigualable. ¡Altamente recomendado!",
      rating: 5,
      gradient: "from-pink-500 to-rose-500"
    },
    {
      name: "Dr. Carlos Mendoza",
      role: "Especialista en Ortodoncia",
      text: "El soporte técnico es excepcional. Me mantienen actualizado con las últimas tecnologías sin salir de mi consultorio. Excelente servicio.",
      rating: 5,
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      name: "Dra. Ana Pérez",
      role: "Endodoncista",
      text: "La calidad de los productos y la atención personalizada hacen la diferencia. Llevo años trabajando con ellos y siempre superan mis expectativas.",
      rating: 5,
      gradient: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-indigo-300 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Lo que dicen nuestros clientes
            </h2>
          </motion.div>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Testimonios reales de profesionales que confían en nosotros
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 relative"
            >
              {/* Quote Icon */}
              <div className={`absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                <FaQuoteLeft className="text-white text-2xl" />
              </div>

              {/* Rating Stars */}
              <div className="flex mb-4 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-lg" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="border-t border-gray-200 pt-4">
                <p className={`font-bold text-lg bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`}>
                  {testimonial.name}
                </p>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>

              {/* Decorative gradient line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.gradient} rounded-b-3xl`}></div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-2xl" />
              ))}
            </div>
            <span className="text-gray-700 font-semibold ml-4">
              Calificación promedio: 5.0/5.0
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;