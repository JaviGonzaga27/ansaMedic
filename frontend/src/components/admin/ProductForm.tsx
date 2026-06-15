import React, { useState } from 'react';
import { FaPlus, FaTrash, FaSpinner, FaTimes } from 'react-icons/fa';
import ImageUpload from './ImageUpload';
import {
  AdminProduct,
  ProductInput,
  emptyProduct,
} from '../../services/admin.service';

interface ProductFormProps {
  /** Producto a editar; si es null, es creación */
  initial?: AdminProduct | null;
  categorias: string[];
  onSubmit: (input: ProductInput) => Promise<void>;
  onCancel: () => void;
}

function toInput(p: AdminProduct | null | undefined): ProductInput {
  if (!p) return emptyProduct();
  return {
    categoria: p.categoria,
    nombre_producto: p.nombre_producto,
    descripcion: p.descripcion,
    imagen_principal: p.imagen_principal,
    imagenes_adicionales: p.imagenes_adicionales,
    caracteristicas: p.caracteristicas,
    especificaciones: p.especificaciones,
    destacado: p.destacado,
  };
}

const ProductForm: React.FC<ProductFormProps> = ({
  initial,
  categorias,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState<ProductInput>(() => toInput(initial));
  const [caracteristicasText, setCaracteristicasText] = useState(
    () => (initial?.caracteristicas || []).join('\n')
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof ProductInput>(key: K, value: ProductInput[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // --- Especificaciones (filas dinámicas) ---
  const addSpec = () =>
    set('especificaciones', [...form.especificaciones, { name: '', value: '' }]);
  const updateSpec = (i: number, field: 'name' | 'value', value: string) =>
    set(
      'especificaciones',
      form.especificaciones.map((s, idx) =>
        idx === i ? { ...s, [field]: value } : s
      )
    );
  const removeSpec = (i: number) =>
    set('especificaciones', form.especificaciones.filter((_, idx) => idx !== i));

  // --- Imágenes adicionales ---
  const addAdicional = (url: string) => {
    if (url) set('imagenes_adicionales', [...form.imagenes_adicionales, url]);
  };
  const removeAdicional = (i: number) =>
    set(
      'imagenes_adicionales',
      form.imagenes_adicionales.filter((_, idx) => idx !== i)
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.imagen_principal) {
      setError('La imagen principal es obligatoria.');
      return;
    }

    const payload: ProductInput = {
      ...form,
      caracteristicas: caracteristicasText
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean),
    };

    setSaving(true);
    try {
      await onSubmit(payload);
    } catch (e: any) {
      setError(e.message || 'No se pudo guardar el producto.');
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-8 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-lg font-bold text-gray-900">
            {initial ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 p-1"
            aria-label="Cerrar"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Nombre del producto *
            </label>
            <input
              type="text"
              required
              value={form.nombre_producto}
              onChange={(e) => set('nombre_producto', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Categoría *
            </label>
            <select
              required
              value={form.categoria}
              onChange={(e) => set('categoria', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="" disabled>
                Selecciona una categoría…
              </option>
              {categorias.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {categorias.length === 0 && (
              <p className="text-xs text-amber-600 mt-1.5">
                No hay categorías todavía. Crea una desde “Gestionar categorías”.
              </p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Descripción *
            </label>
            <textarea
              required
              rows={3}
              value={form.descripcion}
              onChange={(e) => set('descripcion', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-y"
            />
          </div>

          {/* Imagen principal */}
          <ImageUpload
            label="Imagen principal *"
            value={form.imagen_principal}
            onChange={(url) => set('imagen_principal', url)}
          />

          {/* Imágenes adicionales */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Imágenes adicionales
            </label>
            <div className="flex flex-wrap gap-3 mb-3">
              {form.imagenes_adicionales.map((url, i) => (
                <div key={i} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Adicional ${i + 1}`}
                    className="w-20 h-20 object-contain rounded-lg border border-gray-200 bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => removeAdicional(i)}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow"
                    aria-label="Quitar"
                  >
                    <FaTimes className="text-[10px]" />
                  </button>
                </div>
              ))}
            </div>
            <ImageUpload value="" onChange={addAdicional} />
          </div>

          {/* Características */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Características (una por línea)
            </label>
            <textarea
              rows={3}
              value={caracteristicasText}
              onChange={(e) => setCaracteristicasText(e.target.value)}
              placeholder={'Alta durabilidad\nLibre de látex\nEsterilizable'}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-y"
            />
          </div>

          {/* Especificaciones */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                Especificaciones técnicas
              </label>
              <button
                type="button"
                onClick={addSpec}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
              >
                <FaPlus className="text-xs" /> Agregar
              </button>
            </div>
            <div className="space-y-2">
              {form.especificaciones.map((spec, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nombre (ej: Material)"
                    value={spec.name}
                    onChange={(e) => updateSpec(i, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="text"
                    placeholder="Valor (ej: Acero inoxidable)"
                    value={spec.value}
                    onChange={(e) => updateSpec(i, 'value', e.target.value)}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpec(i)}
                    className="text-red-500 hover:text-red-600 px-2"
                    aria-label="Quitar especificación"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Destacado */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.destacado}
              onChange={(e) => set('destacado', e.target.checked)}
              className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Mostrar como producto destacado en la página principal
            </span>
          </label>

          {/* Acciones */}
          <div className="flex gap-3 pt-2 border-t border-gray-100">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <FaSpinner className="animate-spin" /> Guardando…
                </>
              ) : initial ? (
                'Guardar cambios'
              ) : (
                'Crear producto'
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
