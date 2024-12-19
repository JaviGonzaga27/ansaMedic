import React, { useState } from 'react';
import { FaWhatsapp, FaInfoCircle } from 'react-icons/fa';
import ProductDetail from './ProductDetail';

interface ProductCardProps {
  product: {
    id: string;
    imageUrl: string;
    name: string;
    description: string;
    details?: {
      images: string[];
      features: string[];
      specifications: { name: string; value: string }[];
    }[]; 
  };
}



export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/0999120734', '_blank');
  };

  const handleLearnMoreClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="max-w-sm rounded-lg overflow-hidden shadow-[0_4px_10px_rgba(20,184,166,0.1)] hover:shadow-[0_10px_20px_rgba(20,184,166,0.2)] bg-white transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col h-[330px]">
        <div className="h-36 overflow-hidden flex-shrink-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        </div>
        <div className="px-6 py-4 flex-grow overflow-hidden">
          <h2 className="font-bold text-sm mb-2 text-teal-700 line-clamp-2">{product.name}</h2>
          <p className="text-gray-700 text-xs text-justify line-clamp-4">{product.description}</p>
        </div>
        <div className="px-6 pt-2 pb-6 flex-shrink-0">
          <div className="flex gap-2">
            <button
              onClick={handleLearnMoreClick}
              className="flex-1 bg-white hover:bg-gray-100 text-teal-600 text-sm font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center border border-teal-600"
            >
              <FaInfoCircle className="mr-2" />
              Detalles
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
            >
              <FaWhatsapp className="mr-2" />
              Contactar
            </button>
          </div>
        </div>
      </div>
      <ProductDetail 
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}