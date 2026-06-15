import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight, FaWhatsapp, FaAward, FaMapMarkerAlt, FaTruck, FaHeadset } from 'react-icons/fa';
import { WHATSAPP_URLS } from '@/utils/constants';

const hechos = [
  { icon: FaAward, title: '+10 años', sub: 'de experiencia en el sector' },
  { icon: FaMapMarkerAlt, title: '2 sucursales', sub: 'Carcelén y Valle de los Chillos' },
  { icon: FaTruck, title: 'Envío', sub: 'a todo el Ecuador' },
  { icon: FaHeadset, title: 'Asesoría', sub: 'y servicio técnico propio' },
];

const emprendeMensaje = encodeURIComponent(
  'Hola, voy a emprender mi consultorio dental y me gustaría cotizar un kit de inicio. ¿Manejan descuentos para nuevos emprendimientos?'
);
const emprendeUrl = `${WHATSAPP_URLS.QUITO}?text=${emprendeMensaje}`;

const ValueProps: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-teal-700 to-teal-600 text-white py-14 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Equipamos tu consultorio de principio a fin
          </h2>
          <p className="text-teal-50 text-base md:text-lg leading-relaxed">
            ¿Vas a abrir tu consultorio? Cotiza tu kit de inicio y pregunta por
            nuestros <span className="font-semibold text-white">descuentos para
            emprendedores</span>. Te asesoramos para elegir lo que realmente necesitas.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-14">
          {hechos.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-3">
                <h.icon className="text-xl md:text-2xl text-white" />
              </div>
              <div className="text-xl md:text-2xl font-bold mb-0.5">{h.title}</div>
              <div className="text-xs md:text-sm text-teal-100 max-w-[12rem]">{h.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* CTAs: Emprende (captación de nuevos negocios) + catálogo */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
          <a
            href={emprendeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 hover:bg-teal-50 font-bold py-3.5 px-8 rounded-full shadow-warm hover:shadow-warm-lg transition-all duration-300 hover:scale-105"
          >
            <FaWhatsapp className="text-xl text-green-600" />
            Emprende con nosotros
          </a>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-bold py-3.5 px-8 rounded-full border-2 border-white/70 hover:border-white transition-all duration-300"
          >
            Ver catálogo
            <FaArrowRight />
          </Link>
        </div>

        <p className="text-center text-teal-100 text-xs mt-4">
          Atención personalizada para nuevos consultorios y clínicas.
        </p>
      </div>
    </section>
  );
};

export default ValueProps;
