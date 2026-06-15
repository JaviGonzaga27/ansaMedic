import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaSearch, FaStar,
  FaSpinner, FaBoxOpen, FaTags, FaFileExcel, FaEye, FaExclamationTriangle,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import ProductForm from '../../components/admin/ProductForm';
import CategoryManager from '../../components/admin/CategoryManager';
import ExcelImport from '../../components/admin/ExcelImport';
import ProductView from '../../components/admin/ProductView';
import { listCategorias } from '../../services/categorias.service';
import {
  AdminProduct, ProductInput, listProducts, createProduct,
  updateProduct, deleteProduct,
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
  const [excelOpen, setExcelOpen] = useState(false);
  const [viewing, setViewing] = useState<AdminProduct | null>(null);
  const [lowResIds, setLowResIds] = useState<Set<string>>(new Set());
  const [notice, setNotice] = useState<{ type: 'ok' | 'error'; msg: string } | null>(null);

  // --- Guard de sesión ---
  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace('/admin/login');
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

  const totalDestacados = useMemo(
    () => products.filter((p) => p.destacado).length,
    [products]
  );

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
    if (!window.confirm(`¿Eliminar "${p.nombre_producto}"? Esta acción no se puede deshacer.`)) return;
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

  // --- Carga / redirección ---
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <FaSpinner className="text-3xl text-teal-600 animate-spin" />
      </div>
    );
  }

  const kpis = [
    { icon: FaBoxOpen, label: 'Productos', value: products.length, tint: 'bg-teal-50 text-teal-700' },
    { icon: FaTags, label: 'Categorías', value: categorias.length, tint: 'bg-slate-100 text-slate-700' },
    { icon: FaStar, label: 'Destacados', value: totalDestacados, tint: 'bg-amber-50 text-amber-700' },
  ];

  return (
    <>
      <Head>
        <title>Panel de administración | Ansa Medic Dent</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-slate-100">
        {/* App bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Ansa Medic Dent" width={132} height={48} className="h-8 w-auto" quality={90} />
              <span className="hidden sm:block h-6 w-px bg-slate-200" />
              <span className="hidden sm:block text-sm font-semibold text-slate-700">Panel de administración</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold text-xs uppercase">
                  {(user?.email || 'A').charAt(0)}
                </div>
                <span className="text-slate-600 max-w-[180px] truncate">{user?.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-red-600 font-medium px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FaSignOutAlt /> <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
          {/* Título */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900">Productos</h1>
              <p className="text-sm text-slate-500">Gestiona el catálogo de tu tienda</p>
              {lowResIds.size > 0 && (
                <p className="text-xs text-amber-600 mt-1 flex items-center gap-1.5">
                  <FaExclamationTriangle /> {lowResIds.size} con imagen de baja resolución
                </p>
              )}
            </div>
          </div>

          {/* Aviso */}
          {notice && (
            <div
              className={`mb-6 text-sm rounded-xl px-4 py-3 border ${
                notice.type === 'ok'
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}
              role="alert"
            >
              {notice.msg}
            </div>
          )}

          {/* KPIs */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
            {kpis.map((k) => (
              <div key={k.label} className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5 flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${k.tint}`}>
                  <k.icon className="text-lg" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 leading-none">{k.value}</div>
                  <div className="text-xs md:text-sm text-slate-500 mt-1">{k.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3 md:p-4 mb-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre, categoría o descripción…"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setExcelOpen(true)}
                className="flex items-center gap-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 hover:bg-green-100 px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap"
              >
                <FaFileExcel /> Importar Excel
              </button>
              <button
                onClick={() => setCatManagerOpen(true)}
                className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap"
              >
                <FaTags /> Categorías
              </button>
              <button
                onClick={handleCreate}
                className="flex items-center gap-2 text-sm bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap shadow-sm"
              >
                <FaPlus /> Nuevo producto
              </button>
            </div>
          </div>

          {/* Tabla */}
          {loadingData ? (
            <div className="flex justify-center items-center py-24 bg-white rounded-2xl border border-slate-200">
              <FaSpinner className="text-3xl text-teal-600 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <FaBoxOpen className="mx-auto text-4xl text-slate-300 mb-3" />
              <p className="text-slate-600 font-medium">
                {search ? 'Sin resultados para tu búsqueda.' : 'Aún no hay productos.'}
              </p>
              {!search && (
                <button onClick={handleCreate} className="mt-4 inline-flex items-center gap-2 text-sm bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors">
                  <FaPlus /> Crear el primero
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {/* Encabezado (desktop) */}
              <div className="hidden md:grid grid-cols-[72px_1fr_180px_110px_140px] gap-4 px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <span>Imagen</span><span>Producto</span><span>Categoría</span><span>Destacado</span>
                <span className="text-right">Acciones</span>
              </div>

              <ul className="divide-y divide-slate-100">
                {filtered.map((p) => (
                  <li
                    key={p.id}
                    className="grid grid-cols-[56px_1fr] md:grid-cols-[72px_1fr_180px_110px_140px] gap-3 md:gap-4 px-4 md:px-5 py-3 items-center hover:bg-slate-50 transition-colors"
                  >
                    <div className="relative w-14 h-14">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.imagen_principal || 'https://placehold.co/64x64?text=?'}
                        alt={p.nombre_producto}
                        onLoad={(e) => {
                          const w = e.currentTarget.naturalWidth;
                          if (w && w < 500) setLowResIds((prev) => (prev.has(p.id) ? prev : new Set(prev).add(p.id)));
                        }}
                        className="w-14 h-14 object-contain rounded-xl border border-slate-100 bg-slate-50"
                      />
                      {lowResIds.has(p.id) && (
                        <span
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 text-amber-900 rounded-full flex items-center justify-center shadow"
                          title="Imagen de baja resolución: se verá borrosa. Súbela en mayor tamaño (≥800px)."
                        >
                          <FaExclamationTriangle className="text-[9px]" />
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <button onClick={() => setViewing(p)} className="font-semibold text-slate-900 text-sm truncate hover:text-teal-700 text-left">{p.nombre_producto}</button>
                      <p className="text-xs text-slate-500 line-clamp-1">{p.descripcion}</p>
                      <span className="md:hidden inline-block mt-1 text-xs text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">{p.categoria}</span>
                    </div>
                    <span className="hidden md:inline-flex items-center text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md truncate max-w-full w-fit">
                      {p.categoria}
                    </span>
                    <span className="hidden md:flex items-center">
                      {p.destacado ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                          <FaStar className="text-amber-500" /> Sí
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </span>
                    <div className="col-span-2 md:col-span-1 flex md:justify-end gap-2">
                      <button
                        onClick={() => setViewing(p)}
                        className="flex items-center justify-center text-slate-500 hover:text-teal-700 hover:bg-teal-50 border border-slate-200 hover:border-teal-200 w-9 h-9 rounded-lg transition-colors"
                        aria-label="Ver detalle"
                      >
                        <FaEye className="text-xs" />
                      </button>
                      <button
                        onClick={() => handleEdit(p)}
                        className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-teal-700 hover:bg-teal-50 border border-slate-200 hover:border-teal-200 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <FaEdit className="text-xs" /> Editar
                      </button>
                      <button
                        onClick={() => handleDelete(p)}
                        disabled={deletingId === p.id}
                        className="flex items-center justify-center text-slate-500 hover:text-white hover:bg-red-600 border border-slate-200 hover:border-red-600 w-9 h-9 rounded-lg transition-colors disabled:opacity-50"
                        aria-label="Eliminar"
                      >
                        {deletingId === p.id ? <FaSpinner className="animate-spin text-xs" /> : <FaTrash className="text-xs" />}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Footer de tabla */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
                Mostrando {filtered.length} de {products.length} productos
              </div>
            </div>
          )}
        </main>
      </div>

      {formOpen && (
        <ProductForm
          initial={editing}
          categorias={categorias}
          onSubmit={handleSubmit}
          onCancel={() => { setFormOpen(false); setEditing(null); }}
        />
      )}

      {catManagerOpen && (
        <CategoryManager onClose={() => setCatManagerOpen(false)} onChanged={reloadCategorias} />
      )}

      {excelOpen && (
        <ExcelImport onClose={() => setExcelOpen(false)} onImported={loadData} />
      )}

      {viewing && (
        <ProductView
          product={viewing}
          onClose={() => setViewing(null)}
          onEdit={() => { handleEdit(viewing); setViewing(null); }}
        />
      )}
    </>
  );
};

export default AdminPage;
