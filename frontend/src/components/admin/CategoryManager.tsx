import React, { useState, useEffect, useCallback } from 'react';
import { FaTimes, FaPlus, FaTrash, FaSpinner, FaTags } from 'react-icons/fa';
import {
  Categoria,
  listCategorias,
  createCategoria,
  deleteCategoria,
} from '../../services/categorias.service';

interface CategoryManagerProps {
  onClose: () => void;
  /** Se llama cuando cambian las categorías, para refrescar el resto del panel. */
  onChanged: () => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ onClose, onChanged }) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [nuevo, setNuevo] = useState('');
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setCategorias(await listCategorias());
    } catch (e: any) {
      setError(e.message || 'Error al cargar categorías.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!nuevo.trim()) return;
    setAdding(true);
    try {
      await createCategoria(nuevo);
      setNuevo('');
      await load();
      onChanged();
    } catch (e: any) {
      setError(e.message || 'No se pudo crear la categoría.');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (cat: Categoria) => {
    setError(null);
    setDeletingId(cat.id);
    try {
      await deleteCategoria(cat);
      setCategorias((prev) => prev.filter((c) => c.id !== cat.id));
      onChanged();
    } catch (e: any) {
      setError(e.message || 'No se pudo eliminar.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-8 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FaTags className="text-teal-600" /> Gestionar categorías
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
            aria-label="Cerrar"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="px-6 py-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          {/* Agregar categoría */}
          <form onSubmit={handleAdd} className="flex gap-2 mb-5">
            <input
              type="text"
              value={nuevo}
              onChange={(e) => setNuevo(e.target.value)}
              placeholder="Nueva categoría (ej: Ortodoncia)"
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              disabled={adding || !nuevo.trim()}
              className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              {adding ? <FaSpinner className="animate-spin" /> : <FaPlus />}
              Agregar
            </button>
          </form>

          {/* Lista de categorías */}
          {loading ? (
            <div className="flex justify-center py-10">
              <FaSpinner className="text-2xl text-teal-600 animate-spin" />
            </div>
          ) : categorias.length === 0 ? (
            <p className="text-center text-gray-500 py-8 text-sm">
              No hay categorías. Agrega la primera arriba.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100 border border-gray-100 rounded-lg max-h-80 overflow-y-auto">
              {categorias.map((cat) => (
                <li
                  key={cat.id}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50"
                >
                  <span className="text-sm text-gray-800">{cat.nombre}</span>
                  <button
                    onClick={() => handleDelete(cat)}
                    disabled={deletingId === cat.id}
                    className="text-red-500 hover:text-white hover:bg-red-600 border border-red-200 rounded-lg px-2.5 py-1 text-sm transition-colors disabled:opacity-50 flex items-center gap-1"
                    aria-label={`Eliminar ${cat.nombre}`}
                  >
                    {deletingId === cat.id ? (
                      <FaSpinner className="animate-spin text-xs" />
                    ) : (
                      <FaTrash className="text-xs" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <p className="text-xs text-gray-400 mt-4">
            No se puede eliminar una categoría que aún tiene productos asignados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
