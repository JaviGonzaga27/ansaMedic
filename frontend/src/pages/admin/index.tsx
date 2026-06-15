import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
  FaSearch,
  FaStar,
  FaSpinner,
  FaBoxOpen,
  FaTags,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import ProductForm from '../../components/admin/ProductForm';
import CategoryManager from '../../components/admin/CategoryManager';
import { listCategorias } from '../../services/categorias.service';
import {
  AdminProduct,
  ProductInput,
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../services/admin.service';

const AdminPage: NextPage = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading, user, logout } = useAuth();

  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [search, setSearch] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [catManagerOpen, setCatManagerOpen] = useState(false);
  const [notice, setNotice] = useState<{ type: 'ok' | 'error'; msg: string } | null>(
    null
  );

  // --- Guard de sesión ---
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/admin/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // --- Cargar datos ---
  const loadData = useCallback(async () => {
    setLoadingData(true);
    try {
      const [prods, cats] = await Promise.all([listProducts(), listCategorias()]);
      setProducts(prods);
      setCategorias(cats.map((c) => c.nombre));
    } catch (e: any) {
      setNotice({ type: 'error', msg: e.message || 'Error al cargar productos.' });
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) loadData();
  }, [isAuthenticated, loadData]);

  const reloadCategorias = useCallback(async () => {
    try {
      const cats = await listCategorias();
      setCategorias(cats.map((c) => c.nombre));
    } catch {
      /* el modal ya muestra sus propios errores */
    }
  }, []);

  // Limpia el aviso automáticamente
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(t);
  }, [notice]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.nombre_producto.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q)
    );
  }, [products, search]);

  // --- Acciones ---
  const handleCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const handleEdit = (p: AdminProduct) => {
    setEditing(p);
    setFormOpen(true);
  };

  const handleSubmit = async (input: ProductInput) => {
    if (editing) {
      await updateProduct(editing.id, input);
      setNotice({ type: 'ok', msg: 'Producto actualizado.' });
    } else {
      await createProduct(input);
      setNotice({ type: 'ok', msg: 'Producto creado.' });
    }
    setFormOpen(false);
    setEditing(null);
    await loadData();
  };

  const handleDelete = async (p: AdminProduct) => {
    if (!window.confirm(`¿Eliminar "${p.nombre_producto}"? Esta acción no se puede deshacer.`)) {
      return;
    }
    setDeletingId(p.id);
    try {
      await deleteProduct(p.id);
      setProducts((prev) => prev.filter((x) => x.id !== p.id));
      setNotice({ type: 'ok', msg: 'Producto eliminado.' });
    } catch (e: any) {
      setNotice({ type: 'error', msg: e.message || 'No se pudo eliminar.' });
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/admin/login');
  };

  // --- Pantalla de carga / redirección ---
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="text-3xl text-teal-600 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Administración de productos | Ansa Medic Dent</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Barra superior */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-xs text-gray-500">
                {user?.email} · {products.length} productos
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCatManagerOpen(true)}
                className="flex items-center gap-2 text-sm text-teal-700 hover:text-teal-800 font-medium px-3 py-2 rounded-lg hover:bg-teal-50 transition-colors"
              >
                <FaTags /> Categorías
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaSignOutAlt /> Salir
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-6">
          {/* Aviso */}
          {notice && (
            <div
              className={`mb-4 text-sm rounded-lg px-4 py-3 ${
                notice.type === 'ok'
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}
              role="alert"
            >
              {notice.msg}
            </div>
          )}

          {/* Controles */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre, categoría o descripción…"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button
              onClick={handleCreate}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <FaPlus /> Nuevo producto
            </button>
          </div>

          {/* Tabla / lista */}
          {loadingData ? (
            <div className="flex justify-center items-center py-20">
              <FaSpinner className="text-3xl text-teal-600 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
              <FaBoxOpen className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-600">
                {search ? 'No hay productos que coincidan con la búsqueda.' : 'Aún no hay productos. Crea el primero.'}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Encabezado de tabla (desktop) */}
              <div className="hidden md:grid grid-cols-[64px_1fr_180px_120px_120px] gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <span>Imagen</span>
                <span>Producto</span>
                <span>Categoría</span>
                <span>Destacado</span>
                <span className="text-right">Acciones</span>
              </div>

              <ul className="divide-y divide-gray-100">
                {filtered.map((p) => (
                  <li
                    key={p.id}
                    className="grid grid-cols-[56px_1fr] md:grid-cols-[64px_1fr_180px_120px_120px] gap-3 md:gap-4 px-4 py-3 items-center hover:bg-gray-50 transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.imagen_principal || 'https://placehold.co/64x64?text=?'}
                      alt={p.nombre_producto}
                      className="w-14 h-14 md:w-16 md:h-16 object-contain rounded-lg border border-gray-100 bg-gray-50"
                    />

                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">
                        {p.nombre_producto}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {p.descripcion}
                      </p>
                      {/* Categoría visible en móvil */}
                      <span className="md:hidden inline-block mt-1 text-xs text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                        {p.categoria}
                      </span>
                    </div>

                    <span className="hidden md:inline text-sm text-gray-600 truncate">
                      {p.categoria}
                    </span>

                    <span className="hidden md:flex items-center">
                      {p.destacado ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded">
                          <FaStar className="text-amber-500" /> Sí
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">No</span>
                      )}
                    </span>

                    <div className="col-span-2 md:col-span-1 flex md:justify-end gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="flex items-center gap-1 text-sm text-teal-600 hover:text-white hover:bg-teal-600 border border-teal-200 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <FaEdit className="text-xs" /> Editar
                      </button>
                      <button
                        onClick={() => handleDelete(p)}
                        disabled={deletingId === p.id}
                        className="flex items-center gap-1 text-sm text-red-600 hover:text-white hover:bg-red-600 border border-red-200 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deletingId === p.id ? (
                          <FaSpinner className="animate-spin text-xs" />
                        ) : (
                          <FaTrash className="text-xs" />
                        )}
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </div>

      {/* Modal de formulario */}
      {formOpen && (
        <ProductForm
          initial={editing}
          categorias={categorias}
          onSubmit={handleSubmit}
          onCancel={() => {
            setFormOpen(false);
            setEditing(null);
          }}
        />
      )}

      {/* Modal de gestión de categorías */}
      {catManagerOpen && (
        <CategoryManager
          onClose={() => setCatManagerOpen(false)}
          onChanged={reloadCategorias}
        />
      )}
    </>
  );
};

export default AdminPage;
