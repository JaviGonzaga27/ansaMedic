/**
 * Subida de imágenes a Cloudinary mediante "unsigned upload preset".
 * Reutilizable desde cualquier componente del cliente (formulario e importador).
 *
 * Requiere en .env.local:
 *   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
 *   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET  (preset en modo Unsigned)
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export async function uploadToCloudinary(
  file: Blob | File,
  filename = 'imagen'
): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      'Falta configurar NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME y NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.'
    );
  }

  const formData = new FormData();
  formData.append('file', file, filename);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', 'ansamedic/productos');

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'Error al subir la imagen a Cloudinary.');
  }

  const data = await res.json();
  return data.secure_url as string;
}
