/**
 * Utilidades para trabajar con imágenes de Cloudinary
 */

/**
 * Extrae el public_id de una URL completa de Cloudinary
 * @param url - URL completa de Cloudinary
 * @returns public_id de la imagen
 */
export function getCloudinaryPublicId(url: string): string {
  // Ejemplo: https://res.cloudinary.com/demo/image/upload/v1234567/ansamedic/productos/producto-1/imagen-principal.jpg
  // Retorna: ansamedic/productos/producto-1/imagen-principal
  
  const matches = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/);
  return matches ? matches[1] : url;
}

/**
 * Genera una URL de Cloudinary con transformaciones
 * @param publicId - Public ID de la imagen en Cloudinary
 * @param transformations - Objeto con las transformaciones deseadas
 * @returns URL transformada
 */
export function buildCloudinaryUrl(
  publicId: string,
  transformations?: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb' | 'limit';
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    gravity?: 'auto' | 'face' | 'center';
  }
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  if (!cloudName) {
    console.error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME no está configurado');
    return publicId;
  }

  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;
  
  const transforms: string[] = [];
  
  if (transformations?.width) transforms.push(`w_${transformations.width}`);
  if (transformations?.height) transforms.push(`h_${transformations.height}`);
  if (transformations?.crop) transforms.push(`c_${transformations.crop}`);
  if (transformations?.quality) transforms.push(`q_${transformations.quality}`);
  if (transformations?.format) transforms.push(`f_${transformations.format}`);
  if (transformations?.gravity) transforms.push(`g_${transformations.gravity}`);
  
  const transformString = transforms.length > 0 ? `/${transforms.join(',')}` : '';
  
  return `${baseUrl}${transformString}/${publicId}`;
}

/**
 * Tipos de transformaciones comunes para productos
 */
export const cloudinaryPresets = {
  thumbnail: {
    width: 200,
    height: 200,
    crop: 'fill' as const,
    quality: 'auto' as const,
    format: 'auto' as const,
    gravity: 'auto' as const,
  },
  card: {
    width: 400,
    height: 400,
    crop: 'fill' as const,
    quality: 'auto' as const,
    format: 'auto' as const,
    gravity: 'auto' as const,
  },
  detail: {
    width: 800,
    height: 800,
    crop: 'limit' as const,
    quality: 'auto' as const,
    format: 'auto' as const,
  },
  hero: {
    width: 1200,
    height: 600,
    crop: 'fill' as const,
    quality: 'auto' as const,
    format: 'auto' as const,
    gravity: 'auto' as const,
  },
};

/**
 * Valida si una URL es de Cloudinary
 */
export function isCloudinaryUrl(url: string): boolean {
  return url.includes('res.cloudinary.com') || url.includes('cloudinary.com');
}

/**
 * Obtiene una URL optimizada para Open Graph
 */
export function getOgImageUrl(publicId: string): string {
  return buildCloudinaryUrl(publicId, {
    width: 1200,
    height: 630,
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
    gravity: 'auto',
  });
}
