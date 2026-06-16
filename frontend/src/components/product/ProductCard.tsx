import React, { useState, useCallback, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaWhatsapp, FaInfoCircle, FaPlus, FaCheck } from 'react-icons/fa';
import LocationSelector from '../common/LocationSelector';
import { useQuote } from '../../context/QuoteContext';
import { brandedImage } from '../../utils/productImage';

interface ProductCardProps {
  product: {
    id: string;
    imageUrl: string;
    name: string;
    description: string;
    availability?: 'disponible' | 'agotado' | 'bajo_pedido';
    details?: {
      images: string[];
      features: string[];
      specifications: { name: string; value: string }[];
    }[];
  };
}

function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { has, toggle } = useQuote();
  const inQuote = has(product.id);
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);

  const href = `/products/${product.id}`;

  const handleWhatsAppClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLocationSelectorOpen(true);
  }, []);

  // La card completa lleva a la ficha del producto
  const handleCardClick = useCallback(() => {
    router.push(href);
  }, [router, href]);

  return (
    <>
      <div
        onClick={handleCardClick}
        className="rounded-3xl overflow-hidden shadow-soft hover:shadow-warm bg-white border border-cream-100 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col h-[350px] sm:h-[380px] md:h-[400px] lg:h-[420px] cursor-pointer active:scale-[0.98] md:active:scale-100"
      >
        <div className="relative h-[150px] sm:h-[170px] md:h-[180px] lg:h-[200px] overflow-hidden flex-shrink-0 bg-cream-50">
          <Image
            src={brandedImage(product.imageUrl, 600)}
            alt={product.name}
            fill
            unoptimized
            sizes="(max-width: 640px) 60vw, (max-width: 1024px) 33vw, 300px"
            quality={90}
            className="object-contain p-2 md:p-3 transition-transform duration-300 hover:scale-110"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggle({ id: product.id, name: product.name, imageUrl: product.imageUrl });
            }}
            className={`absolute top-1.5 right-1.5 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${
              inQuote ? 'bg-teal-600 text-white' : 'bg-white/90 text-teal-600 hover:bg-white'
            }`}
            aria-label={inQuote ? 'Quitar de cotización' : 'Agregar a cotización'}
            title={inQuote ? 'En tu cotización' : 'Agregar a cotización'}
          >
            {inQuote ? <FaCheck className="text-xs" /> : <FaPlus className="text-xs" />}
          </button>
          {product.availability && product.availability !== 'disponible' && (
            <span className={`absolute top-1.5 left-1.5 z-10 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full ${product.availability === 'agotado' ? 'bg-red-500 text-white' : 'bg-amber-400 text-amber-900'}`}>
              {product.availability === 'agotado' ? 'Agotado' : 'Bajo pedido'}
            </span>
          )}
        </div>
        <div className="px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-3 flex-grow flex flex-col overflow-hidden">
          <h2 className="font-bold text-xs sm:text-sm md:text-sm lg:text-base mb-1 sm:mb-2 text-teal-700 line-clamp-2">{product.name}</h2>
          <p className="text-gray-600 text-[10px] sm:text-xs md:text-xs lg:text-sm line-clamp-2 sm:line-clamp-3 overflow-hidden">{product.description}</p>
        </div>
        <div className="px-1.5 sm:px-2 md:px-3 pt-2 pb-2 sm:pb-3 md:pb-4 flex-shrink-0">
          <div className="flex gap-1 sm:gap-1.5">
            <Link
              href={href}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 bg-white hover:bg-gray-100 text-teal-600 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs font-semibold py-1.5 sm:py-2 px-1 sm:px-1.5 md:px-2 rounded-md sm:rounded-lg transition duration-300 flex items-center justify-center border border-teal-600 whitespace-nowrap min-w-0"
            >
              <FaInfoCircle className="mr-0.5 text-[9px] sm:text-[10px] md:text-xs flex-shrink-0" />
              <span className="overflow-hidden text-ellipsis">Detalles</span>
            </Link>
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
