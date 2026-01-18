import React, { useState, useCallback, memo } from 'react';
import { FaWhatsapp, FaInfoCircle } from 'react-icons/fa';
import ProductDetail from './ProductDetail';
import LocationSelector from '../common/LocationSelector';

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



function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);

  const handleWhatsAppClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que se abra el modal
    setIsLocationSelectorOpen(true);
  }, []);

  const handleLearnMoreClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar doble trigger
    setIsModalOpen(true);
  }, []);

  const handleCardClick = useCallback(() => {
    // Solo abrir en móvil (pantallas menores a 768px)
    if (window.innerWidth < 768) {
      setIsModalOpen(true);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div 
        onClick={handleCardClick}
        className="rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-xl bg-white transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-[340px] sm:h-[380px] md:h-[420px] md:cursor-default cursor-pointer active:scale-[0.98] md:active:scale-100"
      >        <div className="aspect-square overflow-hidden flex-shrink-0 bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-2 md:p-3 transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="px-3 py-2 md:px-6 md:py-4 flex-grow overflow-hidden">
          <h2 className="font-bold text-xs sm:text-sm md:text-base mb-1 md:mb-2 text-teal-700 line-clamp-2">{product.name}</h2>
          <p className="text-gray-600 text-xs md:text-sm line-clamp-2 md:line-clamp-3">{product.description}</p>
        </div>
        <div className="px-3 md:px-6 pt-2 pb-3 md:pb-6 flex-shrink-0">
          <div className="flex gap-1.5 md:gap-2">
            <button
              onClick={handleLearnMoreClick}
              className="flex-1 bg-white hover:bg-gray-100 text-teal-600 text-[10px] sm:text-xs md:text-sm font-bold py-1.5 md:py-2 px-2 md:px-4 rounded-lg transition duration-300 flex items-center justify-center border border-teal-600"
            >
              <FaInfoCircle className="mr-1 text-xs md:text-sm" />
              <span className="hidden sm:inline">Detalles</span>
              <span className="sm:hidden">Ver</span>
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="flex-1 bg-gradient-teal hover:opacity-90 text-white text-[10px] sm:text-xs md:text-sm font-bold py-1.5 md:py-2.5 px-2 md:px-4 rounded-lg transition-smooth flex items-center justify-center shadow-md"
            >
              <FaWhatsapp className="mr-1 text-xs md:text-sm" />
              <span className="hidden sm:inline">Contactar</span>
              <span className="sm:hidden">Chat</span>
            </button>
          </div>
        </div>
      </div>
      <ProductDetail
        product={product}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <LocationSelector
        isOpen={isLocationSelectorOpen}
        onClose={() => setIsLocationSelectorOpen(false)}
        productName={product.name}
        productId={product.id}
      />
    </>
  );
}

const MemoizedProductCard = memo(ProductCard);
MemoizedProductCard.displayName = 'ProductCard';
export default MemoizedProductCard;