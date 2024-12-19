import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const FeaturedProducts = () => {
  const products = [
    {
      name: "Sillón Dental Ergonómico",
      image: "/images/sillon-dental.jpg",
      slug: "sillon-dental-ergonomico",
      description: "Máximo confort para ti y tus pacientes"
    },
    {
      name: "Lámpara LED para Odontología",
      image: "/images/lampara-led.jpg",
      slug: "lampara-led-odontologia",
      description: "Iluminación precisa para procedimientos detallados"
    },
    {
      name: "Kit de Instrumentos Dentales",
      image: "/images/kit-instrumentos.jpg",
      slug: "kit-instrumentos-dentales",
      description: "Herramientas esenciales de alta calidad"
    }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-12 text-center text-teal-600"
        >
          Productos Destacados
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product, index) => (
            <motion.div 
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
            >
              <div className="relative w-full pt-[66.67%] group">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link href={`/productos/${product.slug}`} className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Ver detalles
                  </Link>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-teal-600">{product.name}</h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">{product.description}</p>
                <button className="inline-block bg-teal-100 hover:bg-teal-200 text-teal-800 font-bold py-2 px-4 rounded transition duration-300 text-sm sm:text-base">
                  Añadir al carrito
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;