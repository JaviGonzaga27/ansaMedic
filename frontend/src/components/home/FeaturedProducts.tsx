import React, { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaChevronLeft, FaChevronRight, FaShoppingCart, FaStar } from 'react-icons/fa';
import { getFeaturedProducts, Product } from '../../services/products.service';

const FeaturedProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Obtener productos destacados de ambas fuentes (JSON + Supabase)
        const featuredProducts = await getFeaturedProducts();
        setProducts(featuredProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!autoplay || products.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, products.length]);

  const handleWhatsAppClick = (productName: string) => {
    const message = encodeURIComponent(`Hola, estoy interesado en obtener más información sobre: ${productName}`);
    const phoneNumber = '+593979380563';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const whatsappUrl = isMobile
      ? `whatsapp://send?phone=${phoneNumber}&text=${message}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(whatsappUrl, '_blank');
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    setAutoplay(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    setAutoplay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setAutoplay(false);
  };

  if (loading) {
    return (
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">Cargando productos destacados...</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-orange-300 to-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 shadow-md">
              <FaStar className="text-yellow-500 text-sm" />
              <span className="text-sm font-semibold text-gray-700">Lo Más Destacado</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Novedades en Insumos Dentales
            </h2>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
              Los productos más innovadores y solicitados por profesionales
            </p>
          </motion.div>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            style={{ width: '28px', height: '28px', minWidth: '28px', minHeight: '28px' }}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-teal-600 hover:text-teal-700 flex items-center justify-center"
            aria-label="Producto anterior"
          >
            <FaChevronLeft style={{ fontSize: '10px' }} />
          </button>
          
          <button
            onClick={nextSlide}
            style={{ width: '28px', height: '28px', minWidth: '28px', minHeight: '28px' }}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-300 text-teal-600 hover:text-teal-700 flex items-center justify-center"
            aria-label="Producto siguiente"
          >
            <FaChevronRight style={{ fontSize: '10px' }} />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden rounded-3xl max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden"
              >
                <div className="grid md:grid-cols-5">
                  {/* Product Image - Larger on desktop */}
                  <div className="md:col-span-2 relative aspect-square md:aspect-auto overflow-hidden bg-gradient-to-br from-teal-50 to-teal-100">
                    <Image
                      src={products[currentIndex].imageUrl}
                      alt={products[currentIndex].name}
                      fill
                      className="object-cover p-6 md:p-10 hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      priority
                    />
                    {/* Badge */}
                    <div className="absolute top-4 left-4 md:top-6 md:left-6">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-xs md:text-sm font-bold shadow-lg flex items-center gap-2">
                        <FaStar className="text-yellow-300" />
                        <span>Destacado</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Info - More space on desktop */}
                  <div className="md:col-span-3 p-6 md:p-10 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-purple-50/30">
                    {/* Product Number */}
                    <div className="text-purple-300 font-bold text-sm mb-3">
                      {String(currentIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
                    </div>

                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900 leading-tight">
                      {products[currentIndex].name}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 md:mb-8 leading-relaxed text-base md:text-lg">
                      {products[currentIndex].description}
                    </p>

                    {/* Features/Benefits */}
                    <div className="grid grid-cols-2 gap-3 mb-6 md:mb-8">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <span>Alta Calidad</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <span>Garantía Incluida</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <span>Envío Rápido</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <span>Asesoría Gratis</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleWhatsAppClick(products[currentIndex].name)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                      >
                        <FaWhatsapp className="text-2xl" />
                        <span>Consultar por WhatsApp</span>
                      </button>
                      <Link
                        href="/products"
                        className="sm:w-auto bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border-2 border-purple-200 hover:border-purple-300"
                      >
                        <FaShoppingCart />
                        <span>Ver Catálogo</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Indicators - Enhanced */}
          <div className="flex justify-center gap-1.5 mt-4">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  width: index === currentIndex ? '10px' : '8px',
                  height: index === currentIndex ? '10px' : '8px',
                  minWidth: index === currentIndex ? '10px' : '8px',
                  minHeight: index === currentIndex ? '10px' : '8px',
                }}
                className={`rounded-full transition-all duration-300 flex-shrink-0 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir al producto ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Products CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12 md:mt-16"
        >
          <Link
            href="/products"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <FaShoppingCart className="text-xl" />
            <span className="text-lg">Ver Todos los Productos</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="font-semibold">Productos Certificados</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
              </svg>
              <span className="font-semibold">Envío a Todo Ecuador</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              <span className="font-semibold">Asesoría Profesional</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(FeaturedProducts);