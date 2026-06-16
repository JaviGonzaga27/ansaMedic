/**
 * Imágenes de producto vía Cloudinary.
 *
 * - cldOptimize(url, w): entrega la imagen desde el CDN de Cloudinary ya
 *   optimizada (formato y calidad automáticos, ancho fijo). Mucho más rápida
 *   que pasar por el optimizador de Next, porque Cloudinary ya es un CDN.
 * - brandedImage(url, size): además compone el producto sobre el fondo de marca
 *   si NEXT_PUBLIC_CLOUDINARY_BG está configurado.
 *
 * Para imágenes que no son de Cloudinary, devuelven la URL tal cual.
 */

const BG = process.env.NEXT_PUBLIC_CLOUDINARY_BG;

function parseCloudinary(url: string): { cloud: string; publicId: string } | null {
  const m = url.match(
    /res\.cloudinary\.com\/([^/]+)\/image\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/
  );
  if (!m) return null;
  return { cloud: m[1], publicId: m[2] };
}

/** Versión optimizada y servida directo desde el CDN de Cloudinary. */
export function cldOptimize(url: string | undefined | null, width = 600): string {
  if (!url) return '';
  if (!url.includes('res.cloudinary.com')) return url;
  const p = parseCloudinary(url);
  if (!p) return url;
  return `https://res.cloudinary.com/${p.cloud}/image/upload/f_auto,q_auto,w_${width},c_limit/${p.publicId}`;
}

/** Producto compuesto sobre el fondo de marca (si está configurado) u optimizado. */
export function brandedImage(url: string | undefined | null, size = 1000): string {
  if (!url) return '';
  if (!url.includes('res.cloudinary.com')) return url;
  const p = parseCloudinary(url);
  if (!p) return url;

  if (BG) {
    const overlay = 'l_' + p.publicId.replace(/\//g, ':');
    const inner = Math.round(size * 0.64);
    return (
      `https://res.cloudinary.com/${p.cloud}/image/upload/` +
      `c_fill,w_${size},h_${size},q_auto,f_auto/` +
      `${overlay}/c_fit,w_${inner},h_${inner}/fl_layer_apply,g_center/` +
      `${BG}`
    );
  }
  return cldOptimize(url, size);
}
