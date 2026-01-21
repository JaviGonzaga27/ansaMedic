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
        className="rounded-lg md:rounded-xl overflow-hidden shadow-md hover:shadow-xl bg-white transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-[350px] sm:h-[380px] md:h-[400px] lg:h-[420px] md:cursor-default cursor-pointer active:scale-[0.98] md:active:scale-100"
      >
        <div className="h-[150px] sm:h-[170px] md:h-[180px] lg:h-[200px] overflow-hidden flex-shrink-0 bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-2 md:p-3 transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-3 flex-grow flex flex-col overflow-hidden">
          <h2 className="font-bold text-xs sm:text-sm md:text-sm lg:text-base mb-1 sm:mb-2 text-teal-700 line-clamp-2">{product.name}</h2>
          <p className="text-gray-600 text-[10px] sm:text-xs md:text-xs lg:text-sm line-clamp-2 sm:line-clamp-3 overflow-hidden">{product.description}</p>
        </div>
        <div className="px-1.5 sm:px-2 md:px-3 pt-2 pb-2 sm:pb-3 md:pb-4 flex-shrink-0">
          <div className="flex gap-1 sm:gap-1.5">
            <button
              onClick={handleLearnMoreClick}
              className="flex-1 bg-white hover:bg-gray-100 text-teal-600 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-semibold py-1.5 sm:py-2 px-1 sm:px-1.5 md:px-2 rounded-md sm:rounded-lg transition duration-300 flex items-center justify-center border border-teal-600 whitespace-nowrap min-w-0"
            >
              <FaInfoCircle className="mr-0.5 text-[9px] sm:text-[10px] md:text-xs flex-shrink-0" />
              <span className="overflow-hidden text-ellipsis">Detalles</span>
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="flex-1 bg-gradient-teal hover:opacity-90 text-white text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-semibold py-1.5 sm:py-2 px-1 sm:px-1.5 md:px-2 rounded-md sm:rounded-lg transition-smooth flex items-center justify-center shadow-md whitespace-nowrap min-w-0"
            >
              <FaWhatsapp className="mr-0.5 text-[9px] sm:text-[10px] md:text-xs flex-shrink-0" />
              <span className="overflow-hidden text-ellipsis">Contactar</span>
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