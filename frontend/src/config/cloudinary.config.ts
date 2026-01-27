/**
 * Configuración de Next Cloudinary
 * 
 * Este archivo configura las opciones globales para el uso de Cloudinary
 * en la aplicación Next.js
 */

export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
};

/**
 * Configuración de CldImage por defecto
 */
export const defaultImageProps = {
  // Habilitar carga lazy por defecto
  loading: 'lazy' as const,
  
  // Placeholder mientras carga
  placeholder: 'blur' as const,
  
  // Calidad automática
  quality: 'auto' as const,
  
  // Formato automático (WebP cuando sea compatible)
  format: 'auto' as const,
};

/**
 * Tamaños responsivos para srcset
 */
export const imageSizes = {
  mobile: 400,
  tablet: 768,
  desktop: 1200,
};

/**
 * Configuración de caché para imágenes
 */
export const cacheConfig = {
  // Tiempo de vida en el navegador
  maxAge: 31536000, // 1 año
  
  // Revalidar en segundo plano
  staleWhileRevalidate: 86400, // 1 día
};
