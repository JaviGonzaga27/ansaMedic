import React, { useState } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import LocationSelector from '../common/LocationSelector';

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    details?: {
      images?: string[];
      features?: string[];
      specifications?: { name: string; value: string }[];
    }[]; // Ajustamos a un arreglo de detalles
  };
  isOpen: boolean;
  onClose: () => void;
}


export default function ProductDetail({ product, isOpen, onClose }: ProductDetailProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);

  if (!isOpen) return null;

  const handleWhatsAppClick = () => {
    setIsLocationSelectorOpen(true);
  };

  // Siempre mostrar primero la imagen principal (imageUrl), luego agregar imágenes adicionales de details si existen
  const getProductImages = () => {
    const mainImage = product.imageUrl;
    const additionalImages = 
      product.details && product.details.length > 0 && product.details[0].images?.length
        ? product.details[0].images.filter(img => img !== mainImage) // Evitar duplicados
        : [];
    
    return [mainImage, ...additionalImages];
  };

  const images = getProductImages();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header fijo */}
        <div className="sticky top-0 bg-white rounded-t-lg border-b border-gray-200 px-4 md:px-6 py-4 flex justify-between items-center z-10 flex-shrink-0">
          <h2 className="text-lg md:text-2xl font-bold text-teal-700 pr-4 line-clamp-2">{product.name}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Cerrar"
          >
            <FaTimes size={24} />
          </button>
        </div>
        
        {/* Contenido con scroll */}
        <div className="overflow-y-auto flex-1 p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img 
                src={images[currentImage]} 
                alt={product.name} 
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              {images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {images.map((img, index) => (
                    <img 
                      key={index}
                      src={img} 
                      alt={`${product.name} ${index + 1}`}
                      className={`w-20 h-20 object-cover rounded cursor-pointer ${index === currentImage ? 'border-2 border-teal-500' : ''}`}
                      onClick={() => setCurrentImage(index)}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              {product.details && product.details.length > 0 && product.details[0].features && product.details[0].features.length > 0 && (
                <>
                  <h3 className="font-semibold text-lg mb-2 text-teal-700">Características:</h3>
                  <ul className="list-disc list-inside mb-4">
                    {product.details[0].features.map((feature, index) => (
                      <li key={index} className="text-gray-600">{feature}</li>
                    ))}
                  </ul>
                </>
              )}
              
              {product.details && product.details.length > 0 && product.details[0].specifications && product.details[0].specifications.length > 0 && (
                <>
                  <h3 className="font-semibold text-lg mb-2 text-teal-700">Especificaciones:</h3>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {product.details[0].specifications.map((spec, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium text-gray-700">{spec.name}:</span> {spec.value}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer fijo con botón de WhatsApp */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 md:px-6 py-3 md:py-4 flex-shrink-0 rounded-b-lg shadow-lg">
          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 md:py-3.5 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center shadow-md hover:shadow-lg"
          >
            <FaWhatsapp className="mr-2 text-lg md:text-xl" />
            <span className="text-sm md:text-base">Contactar por WhatsApp</span>
          </button>
        </div>
      </div>
      
      <LocationSelector
        isOpen={isLocationSelectorOpen}
        onClose={() => setIsLocationSelectorOpen(false)}
        productName={product.name}
        productId={product.id}
      />
    </div>
  );
}