import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaSearch, FaStar, FaRegStar,
  FaSpinner, FaBoxOpen, FaTags, FaFileExcel, FaEye, FaExclamationTriangle,
  FaChartLine, FaCopy, FaDownload, FaChevronLeft, FaChevronRight,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import ProductForm from '../../components/admin/ProductForm';
import CategoryManager from '../../components/admin/CategoryManager';
import ExcelImport from '../../components/admin/ExcelImport';
import ProductView from '../../components/admin/ProductView';
import { listCategorias } from '../../services/categorias.service';
import {
  AdminProduct, ProductInput, Disponibilidad, listProducts, createProduct,
  updateProduct, deleteProduct, duplicateProduct, bulkDelete, bulkPatch, patchProduct,
} from '../../services/admin.service';
import { cldOptimize } from '../../utils/productImage';

const PER_PAGE = 20;

const DISP: Record<Disponibilidad, { label: string; cls: string }> = {
  disponible: { label: 'Disponible', cls: 'text-green-700 bg-green-50' },
  bajo_pedido: { label: 'Bajo pedido', cls: 'text-amber-700 bg-amber-50' },
  agotado: { label: 'Agotado', cls: 'text-red-700 bg-red-50' },
};

const AdminPage: NextPage = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading, user, logout } = useAuth();

  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [imgFilter, setImgFilter] = useState<'todos' | 'sin' | 'baja'>('todos');
  const [page, setPage] = useState(1);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [catManagerOpen, setCatManagerOpen] = useState(false);
  const [excelOpen, setExcelOpen] = useState(false);
  const [viewing, setViewing] = useState<AdminProduct | null>(null);
  const [lowResIds, setLowResIds] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ type: 'ok' | 'error'; msg: string } | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace('/admin/login');
  }, [isLoading, isAuthenticated, router]);

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
    } catch { /* el modal muestra sus errores */ }
  }, []);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(t);
  }, [notice]);

  // Reiniciar página y selección al filtrar
  useEffect(() => { setPage(1); }, [search, catFilter, imgFilter]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      if (catFilter !== 'all' && p.categoria !== catFilter) return false;
      if (imgFilter === 'sin' && p.imagen_principal) return false;
      if (imgFilter === 'baja' && !lowResIds.has(p.id)) return false;
      if (!q) return true;
      return (
        p.nombre_producto.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q) ||
        p.codigo.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q)
      );
    });
  }, [products, search, catFilter, imgFilter, lowResIds]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = useMemo(
    () => filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [filtered, page]
  );

  const totalDestacados = useMemo(() => products.filter((p) => p.destacado).length, [products]);

  // --- Acciones individuales ---
  const handleCreate = () => { setEditing(null); setFormOpen(true); };
  const handleEdit = (p: AdminProduct) => { setEditing(p); setFormOpen(true); };
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
    if (!window.confirm(`¿Eliminar "${p.nombre_producto}"?`)) return;
    setDeletingId(p.id);
    try {
      await deleteProduct(p.id);
      setProducts((prev) => prev.filter((x) => x.id !== p.id));
      setNotice({ type: 'ok', msg: 'Producto eliminado.' });
    } catch (e: any) {
      setNotice({ type: 'error', msg: e.message || 'No se pudo eliminar.' });
    } finally { setDeletingId(null); }
  };
  const handleDuplicate = async (p: AdminProduct) => {
    try {
      await duplicateProduct(p);
      setNotice({ type: 'ok', msg: 'Producto duplicado.' });
      await loadData();
    } catch (e: any) {
      setNotice({ type: 'error', msg: e.message || 'No se pudo duplicar.' });
    }
  };
  const toggleDestacado = async (p: AdminProduct) => {
    const nuevo = !p.destacado;
    setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, destacado: nuevo } : x)));
    try {
      await patchProduct(p.id, { destacado: nuevo });
    } catch {
      setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, destacado: !nuevo } : x)));
      setNotice({ type: 'error', msg: 'No se pudo actualizar.' });
    }
  };

  // --- Selección ---
  const toggleSelect = (id: string) =>
    setSelected((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  const allPageSelected = pageItems.length > 0 && pageItems.every((p) => selected.has(p.id));
  const toggleSelectPage = () =>
    setSelected((prev) => {
      const n = new Set(prev);
      if (allPageSelected) pageItems.forEach((p) => n.delete(p.id));
      else pageItems.forEach((p) => n.add(p.id));
      return n;
    });
  const clearSelection = () => setSelected(new Set());

  // --- Acciones en lote ---
  const runBulk = async (fn: () => Promise<void>, msg: string) => {
    setBusy(true);
    try {
      await fn();
      setNotice({ type: 'ok', msg });
      clearSelection();
      await loadData();
    } catch (e: any) {
      setNotice({ type: 'error', msg: e.message || 'Error en la acción.' });
    } finally { setBusy(false); }
  };
  const ids = () => Array.from(selected);
  const bulkDestacar = (v: boolean) => runBulk(() => bulkPatch(ids(), { destacado: v }), v ? 'Marcados como destacados.' : 'Quitado destacado.');
  const bulkDisp = (d: Disponibilidad) => runBulk(() => bulkPatch(ids(), { disponibilidad: d }), 'Disponibilidad actualizada.');
  const bulkCat = (c: string) => { if (c) runBulk(() => bulkPatch(ids(), { categoria: c }), 'Categoría actualizada.'); };
  const bulkDel = () => {
    if (!window.confirm(`¿Eliminar ${selected.size} producto(s)? No se puede deshacer.`)) return;
    runBulk(() => bulkDelete(ids()), 'Productos eliminados.');
  };

  // --- Exportar CSV ---
  const exportCSV = () => {
    const esc = (v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const headers = ['codigo', 'nombre', 'categoria', 'disponibilidad', 'precio', 'destacado', 'imagen_principal'];
    const lines = filtered.map((p) =>
      [p.codigo, p.nombre_producto, p.categoria, p.disponibilidad, p.precio ?? '', p.destacado ? 'si' : 'no', p.imagen_principal]
        .map(esc).join(',')
    );
    const csv = '﻿' + [headers.join(','), ...lines].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `productos_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLogout = async () => { await logout(); router.replace('/admin/login'); };

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
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Ansa Medic Dent" width={132} height={48} className="h-8 w-auto" quality={90} />
              <span className="hidden sm:block h-6 w-px bg-slate-200" />
              <span className="hidden sm:block text-sm font-semibold text-slate-700">Panel de administración</span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/admin/metricas" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-teal-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                <FaChartLine /> <span className="hidden sm:inline">Métricas</span>
              </Link>
              <span className="hidden sm:block h-6 w-px bg-slate-200" />
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold text-xs uppercase">
                  {(user?.email || 'A').charAt(0)}
                </div>
                <span className="text-slate-600 max-w-[180px] truncate">{user?.email}</span>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-slate-600 hover:text-red-600 font-medium px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                <FaSignOutAlt /> <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
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

          {notice && (
            <div className={`mb-6 text-sm rounded-xl px-4 py-3 border ${notice.type === 'ok' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`} role="alert">
              {notice.msg}
            </div>
          )}

          {/* KPIs */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
            {kpis.map((k) => (
              <div key={k.label} className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5 flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${k.tint}`}><k.icon className="text-lg" /></div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 leading-none">{k.value}</div>
                  <div className="text-xs md:text-sm text-slate-500 mt-1">{k.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-3 md:p-4 mb-4 space-y-3">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nombre, código, categoría…" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors" />
              </div>
              <div className="flex flex-wrap gap-2">
                <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="text-sm bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option value="all">Todas las categorías</option>
                  {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={imgFilter} onChange={(e) => setImgFilter(e.target.value as any)} className="text-sm bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option value="todos">Todas las imágenes</option>
                  <option value="sin">Sin imagen</option>
                  <option value="baja">Baja resolución</option>
                </select>
                <button onClick={exportCSV} className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap">
                  <FaDownload /> CSV
                </button>
                <button onClick={() => setExcelOpen(true)} className="flex items-center gap-2 text-sm font-medium text-green-700 bg-green-50 border border-green-200 hover:bg-green-100 px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap">
                  <FaFileExcel /> Importar
                </button>
                <button onClick={() => setCatManagerOpen(true)} className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap">
                  <FaTags /> Categorías
                </button>
                <button onClick={handleCreate} className="flex items-center gap-2 text-sm bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap shadow-sm">
                  <FaPlus /> Nuevo
                </button>
              </div>
            </div>

            {/* Barra de acciones en lote */}
            {selected.size > 0 && (
              <div className="flex flex-wrap items-center gap-2 bg-teal-50 border border-teal-200 rounded-xl px-3 py-2.5">
                <span className="text-sm font-semibold text-teal-800">{selected.size} seleccionado(s)</span>
                <button disabled={busy} onClick={() => bulkDestacar(true)} className="text-xs bg-white border border-teal-200 px-3 py-1.5 rounded-lg hover:bg-teal-100 disabled:opacity-50">Destacar</button>
                <button disabled={busy} onClick={() => bulkDestacar(false)} className="text-xs bg-white border border-teal-200 px-3 py-1.5 rounded-lg hover:bg-teal-100 disabled:opacity-50">Quitar destacado</button>
                <select disabled={busy} onChange={(e) => { bulkDisp(e.target.value as Disponibilidad); e.target.value=''; }} defaultValue="" className="text-xs bg-white border border-teal-200 px-2 py-1.5 rounded-lg">
                  <option value="" disabled>Disponibilidad…</option>
                  <option value="disponible">Disponible</option>
                  <option value="bajo_pedido">Bajo pedido</option>
                  <option value="agotado">Agotado</option>
                </select>
                <select disabled={busy} onChange={(e) => { bulkCat(e.target.value); e.target.value=''; }} defaultValue="" className="text-xs bg-white border border-teal-200 px-2 py-1.5 rounded-lg">
                  <option value="" disabled>Cambiar categoría…</option>
                  {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <button disabled={busy} onClick={bulkDel} className="text-xs bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100 disabled:opacity-50">Eliminar</button>
                <button onClick={clearSelection} className="text-xs text-slate-500 hover:text-slate-700 ml-auto">Limpiar</button>
              </div>
            )}
          </div>

          {/* Tabla */}
          {loadingData ? (
            <div className="flex justify-center items-center py-24 bg-white rounded-2xl border border-slate-200"><FaSpinner className="text-3xl text-teal-600 animate-spin" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <FaBoxOpen className="mx-auto text-4xl text-slate-300 mb-3" />
              <p className="text-slate-600 font-medium">{search || catFilter !== 'all' || imgFilter !== 'todos' ? 'Sin resultados.' : 'Aún no hay productos.'}</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="hidden md:grid grid-cols-[36px_64px_1fr_150px_120px_70px_150px] gap-4 px-4 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide items-center">
                <input type="checkbox" checked={allPageSelected} onChange={toggleSelectPage} className="w-4 h-4 accent-teal-600" aria-label="Seleccionar página" />
                <span>Imagen</span><span>Producto</span><span>Categoría</span><span>Disponibilidad</span><span>Destac.</span>
                <span className="text-right">Acciones</span>
              </div>

              <ul className="divide-y divide-slate-100">
                {pageItems.map((p) => (
                  <li key={p.id} className="grid grid-cols-[36px_56px_1fr] md:grid-cols-[36px_64px_1fr_150px_120px_70px_150px] gap-3 md:gap-4 px-4 py-3 items-center hover:bg-slate-50 transition-colors">
                    <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleSelect(p.id)} className="w-4 h-4 accent-teal-600" aria-label="Seleccionar" />
                    <div className="relative w-14 h-14">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={cldOptimize(p.imagen_principal, 120) || 'https://placehold.co/64x64?text=?'} alt={p.nombre_producto} onLoad={(e) => { const w = e.currentTarget.naturalWidth; if (w && w < 500) setLowResIds((prev) => (prev.has(p.id) ? prev : new Set(prev).add(p.id))); }} className="w-14 h-14 object-contain rounded-xl border border-slate-100 bg-slate-50" />
                      {lowResIds.has(p.id) && (
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 text-amber-900 rounded-full flex items-center justify-center shadow" title="Imagen de baja resolución"><FaExclamationTriangle className="text-[9px]" /></span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <button onClick={() => setViewing(p)} className="font-semibold text-slate-900 text-sm truncate hover:text-teal-700 text-left block max-w-full">{p.nombre_producto}</button>
                      <p className="text-xs text-slate-400 line-clamp-1">{p.codigo ? `${p.codigo} · ` : ''}{p.descripcion}</p>
                      <span className="md:hidden inline-block mt-1 text-xs text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">{p.categoria}</span>
                    </div>
                    <span className="hidden md:inline-flex items-center text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md truncate max-w-full w-fit">{p.categoria}</span>
                    <span className="hidden md:flex items-center">
                      <span className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-md ${DISP[p.disponibilidad].cls}`}>{DISP[p.disponibilidad].label}</span>
                    </span>
                    <span className="hidden md:flex items-center justify-center">
                      <button onClick={() => toggleDestacado(p)} className="p-1.5 rounded-lg hover:bg-amber-50 transition-colors" title={p.destacado ? 'Quitar destacado' : 'Marcar destacado'} aria-label="Destacado">
                        {p.destacado ? <FaStar className="text-amber-500" /> : <FaRegStar className="text-slate-300" />}
                      </button>
                    </span>
                    <div className="col-span-3 md:col-span-1 flex md:justify-end gap-1.5">
                      <button onClick={() => setViewing(p)} className="flex items-center justify-center text-slate-500 hover:text-teal-700 hover:bg-teal-50 border border-slate-200 w-9 h-9 rounded-lg transition-colors" aria-label="Ver" title="Ver"><FaEye className="text-xs" /></button>
                      <button onClick={() => handleDuplicate(p)} className="flex items-center justify-center text-slate-500 hover:text-teal-700 hover:bg-teal-50 border border-slate-200 w-9 h-9 rounded-lg transition-colors" aria-label="Duplicar" title="Duplicar"><FaCopy className="text-xs" /></button>
                      <button onClick={() => handleEdit(p)} className="flex items-center justify-center text-slate-500 hover:text-teal-700 hover:bg-teal-50 border border-slate-200 w-9 h-9 rounded-lg transition-colors" aria-label="Editar" title="Editar"><FaEdit className="text-xs" /></button>
                      <button onClick={() => handleDelete(p)} disabled={deletingId === p.id} className="flex items-center justify-center text-slate-500 hover:text-white hover:bg-red-600 border border-slate-200 hover:border-red-600 w-9 h-9 rounded-lg transition-colors disabled:opacity-50" aria-label="Eliminar" title="Eliminar">
                        {deletingId === p.id ? <FaSpinner className="animate-spin text-xs" /> : <FaTrash className="text-xs" />}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Pie + paginación */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                <span>Mostrando {pageItems.length} de {filtered.length} productos</span>
                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white disabled:opacity-40 hover:bg-slate-100"><FaChevronLeft className="text-xs" /></button>
                    <span className="font-medium text-slate-700">{page} / {totalPages}</span>
                    <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white disabled:opacity-40 hover:bg-slate-100"><FaChevronRight className="text-xs" /></button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Panel de filtros (también abajo de la tabla) */}
          {products.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-3 md:p-4 mt-4">
              <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">Filtrar productos</span>
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nombre, código, categoría…" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-colors" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="text-sm bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="all">Todas las categorías</option>
                    {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select value={imgFilter} onChange={(e) => setImgFilter(e.target.value as any)} className="text-sm bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option value="todos">Todas las imágenes</option>
                    <option value="sin">Sin imagen</option>
                    <option value="baja">Baja resolución</option>
                  </select>
                  {(search || catFilter !== 'all' || imgFilter !== 'todos') && (
                    <button onClick={() => { setSearch(''); setCatFilter('all'); setImgFilter('todos'); }} className="text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap">
                      Limpiar
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {formOpen && (
        <ProductForm initial={editing} categorias={categorias} onSubmit={handleSubmit} onCancel={() => { setFormOpen(false); setEditing(null); }} />
      )}
      {catManagerOpen && (
        <CategoryManager onClose={() => setCatManagerOpen(false)} onChanged={reloadCategorias} />
      )}
      {excelOpen && (
        <ExcelImport onClose={() => setExcelOpen(false)} onImported={loadData} />
      )}
      {viewing && (
        <ProductView product={viewing} onClose={() => setViewing(null)} onEdit={() => { handleEdit(viewing); setViewing(null); }} />
      )}
    </>
  );
};

export default AdminPage;
