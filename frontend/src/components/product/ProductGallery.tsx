import React, { useState } from 'react';
import Image from 'next/image';
import { brandedImage } from '../../utils/productImage';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, alt }) => {
  // Quitar duplicados y vacíos
  const fotos = Array.from(new Set(images.filter(Boolean)));
  const [activa, setActiva] = useState(0);

  if (fotos.length === 0) {
    return (
      <div className="aspect-square w-full rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
        Sin imagen
      </div>
    );
  }

  return (
    <div>
      {/* Imagen principal */}
      <div className="relative aspect-square w-full rounded-4xl overflow-hidden bg-white border border-cream-200 shadow-warm">
        <Image
          src={brandedImage(fotos[activa], 1000)}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 600px"
          quality={90}
          className="object-contain p-6"
        />
      </div>

      {/* Miniaturas */}
      {fotos.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
          {fotos.map((url, i) => (
            <button
              key={url}
              onClick={() => setActiva(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                i === activa
                  ? 'border-teal-500 ring-2 ring-teal-200'
                  : 'border-cream-200 hover:border-teal-300'
              }`}
            >
              <Image
                src={url}
                alt={`${alt} miniatura ${i + 1}`}
                fill
                sizes="(max-width: 1024px) 18vw, 120px"
                quality={85}
                className="object-contain p-1 bg-white"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
