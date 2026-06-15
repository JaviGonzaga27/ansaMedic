import React, { useState, useCallback } from 'react';
import { FaCloudUploadAlt, FaSpinner, FaTimes } from 'react-icons/fa';

interface ImageUploadProps {
  label?: string;
  /** URL(s) actuales */
  value: string;
  onChange: (url: string) => void;
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

/**
 * Sube una imagen a Cloudinary mediante un "unsigned upload preset".
 * No expone el API secret: el preset debe crearse en el dashboard de
 * Cloudinary (Settings → Upload → Upload presets → Unsigned).
 */
async function uploadToCloudinary(file: File): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      'Falta configurar NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME y NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.'
    );
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', 'ansamedic/productos');

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || 'Error al subir la imagen.');
  }

  const data = await res.json();
  return data.secure_url as string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File | undefined) => {
      if (!file) return;
      setError(null);
      setUploading(true);
      try {
        const url = await uploadToCloudinary(file);
        onChange(url);
      } catch (e: any) {
        setError(e.message || 'No se pudo subir la imagen.');
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Vista previa"
            className="w-32 h-32 object-contain rounded-lg border border-gray-200 bg-gray-50"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow"
            aria-label="Quitar imagen"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>
      ) : (
        <label
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            uploading
              ? 'border-teal-400 bg-teal-50'
              : 'border-gray-300 hover:border-teal-400 hover:bg-teal-50'
          }`}
        >
          {uploading ? (
            <>
              <FaSpinner className="text-2xl text-teal-600 animate-spin mb-2" />
              <span className="text-sm text-gray-600">Subiendo…</span>
            </>
          ) : (
            <>
              <FaCloudUploadAlt className="text-3xl text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Haz clic para subir</span>
              <span className="text-xs text-gray-400">JPG, PNG o WebP</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
      )}

      {error && <p className="text-sm text-red-600 mt-1.5">{error}</p>}
    </div>
  );
};

export default ImageUpload;
