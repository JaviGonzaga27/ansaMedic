import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaInfoCircle } from 'react-icons/fa';

const FeaturedProducts = () => {
  const products = [
    {
      name: "Sillón Dental Ergonómico",
      image: "/images/sillon-dental.jpg",
      slug: "sillon-dental-ergonomico",
      description: "Máximo confort para ti y tus pacientes con tecnología de punta"
    },
    {
      name: "Lámpara LED para Odontología",
      image: "/images/lampara-led.jpg",
      slug: "lampara-led-odontologia",
      description: "Iluminación precisa y ajustable para procedimientos detallados"
    },
    {
      name: "Kit de Instrumentos Dentales",
      image: "/images/kit-instrumentos.jpg",
      slug: "kit-instrumentos-dentales",
      description: "Herramientas esenciales de alta calidad para tu consultorio"
    }
  ];

  const handleWhatsAppClick = (productName: string) => {
    const message = encodeURIComponent(`Hola, estoy interesado en obtener más información sobre: ${productName}`);
    const phoneNumber = '+593979380563';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const whatsappUrl = isMobile
      ? `whatsapp://send?phone=${phoneNumber}&text=${message}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-orange-300 to-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
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
            className="inline-block"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Productos Destacados
            </h2>
          </motion.div>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Descubre nuestra selección de equipamiento dental de primera calidad
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="transition-transform duration-700 group-hover:scale-110 object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Hover Overlay with Details Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Link
                    href={`/productos/${product.slug}`}
                    className="bg-white/95 backdrop-blur-sm text-purple-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-white transition-all duration-300 flex items-center space-x-2 transform hover:scale-110"
                  >
                    <FaInfoCircle />
                    <span>Ver Detalles</span>
                  </Link>
                </div>

                {/* Gradient Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                  Destacado
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2">
                  {product.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/productos/${product.slug}`}
                    className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-300 text-center text-sm"
                  >
                    Más Info
                  </Link>
                  <button
                    onClick={() => handleWhatsAppClick(product.name)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg text-sm transform hover:scale-105"
                  >
                    <FaWhatsapp className="text-lg" />
                    <span>Consultar</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Products CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span>Ver Todos los Productos</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(FeaturedProducts);