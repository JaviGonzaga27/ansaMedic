/**
 * Compone una foto de producto sobre el fondo de marca usando Cloudinary
 * (sin editar foto por foto). El producto se centra sobre el fondo "blueprint".
 *
 * Cómo activarlo:
 *  1. Sube `public/branding/fondo_producto.png` a tu cuenta de Cloudinary con
 *     public_id = "fondo_producto" (Media Library → Upload).
 *  2. En .env.local: NEXT_PUBLIC_CLOUDINARY_BG="fondo_producto"
 *
 * Es seguro: si la variable no está, o la imagen no es de Cloudinary, devuelve
 * la URL original sin tocarla (no rompe nada).
 */

const BG = process.env.NEXT_PUBLIC_CLOUDINARY_BG;

export function brandedImage(url: string | undefined | null, size = 1000): string {
  if (!url) return '';
  if (!BG || !url.includes('res.cloudinary.com')) return url;

  // Extrae cloud name y public_id de la URL de Cloudinary
  const m = url.match(
    /res\.cloudinary\.com\/([^/]+)\/image\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/
  );
  if (!m) return url;

  const cloud = m[1];
  const publicId = m[2];           // ej: productos/abc123
  const overlay = 'l_' + publicId.replace(/\//g, ':'); // overlay usa ":" en vez de "/"
  const inner = Math.round(size * 0.64); // tamaño del producto dentro del fondo

  return (
    `https://res.cloudinary.com/${cloud}/image/upload/` +
    `c_fill,w_${size},h_${size},q_auto,f_auto/` +
    `${overlay}/c_fit,w_${inner},h_${inner}/fl_layer_apply,g_center/` +
    `${BG}`
  );
}
