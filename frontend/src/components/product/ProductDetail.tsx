import React, { useState } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

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

  if (!isOpen) return null;

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/0999120734', '_blank');
  };

  // Usar las imágenes del primer elemento de detalles si existen, de lo contrario usar imageUrl
  const images =
    product.details && product.details.length > 0 && product.details[0].images?.length
      ? product.details[0].images
      : [product.imageUrl];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-teal-700">{product.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
          </div>
          
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
              
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
              >
                <FaWhatsapp className="mr-2" />
                Contactar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}