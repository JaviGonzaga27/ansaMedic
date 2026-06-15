import React from 'react';
import { FaTimes, FaStar, FaEdit } from 'react-icons/fa';
import { AdminProduct } from '../../services/admin.service';

interface ProductViewProps {
  product: AdminProduct;
  onClose: () => void;
  onEdit: () => void;
}

const ProductView: React.FC<ProductViewProps> = ({ product, onClose, onEdit }) => {
  const imagenes = [product.imagen_principal, ...(product.imagenes_adicionales || [])].filter(Boolean);

  const fmt = (d?: string) => (d ? new Date(d).toLocaleString('es-EC') : '—');

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-8 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-lg font-bold text-slate-900 truncate pr-4">{product.nombre_producto}</h2>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button onClick={onEdit} className="flex items-center gap-1.5 text-sm text-teal-700 hover:bg-teal-50 px-3 py-1.5 rounded-lg transition-colors">
              <FaEdit className="text-xs" /> Editar
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5" aria-label="Cerrar">
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Galería */}
          {imagenes.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {imagenes.map((url, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={i}
                  src={url}
                  alt={`${product.nombre_producto} ${i + 1}`}
                  className={`object-contain rounded-xl border bg-slate-50 ${i === 0 ? 'w-28 h-28 border-teal-200' : 'w-20 h-20 border-slate-100'}`}
                />
              ))}
            </div>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
              {product.categoria || 'Sin categoría'}
            </span>
            {product.destacado && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                <FaStar className="text-amber-500" /> Destacado
              </span>
            )}
          </div>

          {/* Descripción */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Descripción</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{product.descripcion || '—'}</p>
          </div>

          {/* Características */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Características</h3>
            {product.caracteristicas.length ? (
              <ul className="space-y-1.5">
                {product.caracteristicas.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400">Sin características.</p>
            )}
          </div>

          {/* Especificaciones */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Especificaciones</h3>
            {product.especificaciones.length ? (
              <dl className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                {product.especificaciones.map((s, i) => (
                  <div key={i} className="flex justify-between gap-4 px-4 py-2.5">
                    <dt className="text-sm text-slate-500">{s.name}</dt>
                    <dd className="text-sm font-medium text-slate-800 text-right">{s.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-sm text-slate-400">Sin especificaciones.</p>
            )}
          </div>

          {/* Metadatos */}
          <div className="pt-2 border-t border-slate-100 text-xs text-slate-400 space-y-1">
            <p>ID: <span className="font-mono">{product.id}</span></p>
            <p>Creado: {fmt(product.created_at)} · Actualizado: {fmt(product.updated_at)}</p>
            <p>Imágenes: {imagenes.length} ({product.imagenes_adicionales?.length || 0} adicionales)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
