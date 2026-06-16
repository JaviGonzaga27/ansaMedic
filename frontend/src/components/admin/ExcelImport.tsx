import React, { useState, useCallback } from 'react';
import {
  FaFileExcel, FaTimes, FaSpinner, FaCheckCircle, FaExclamationTriangle, FaUpload,
} from 'react-icons/fa';
import { createProduct, ProductInput } from '../../services/admin.service';
import { createCategoria } from '../../services/categorias.service';
import { uploadToCloudinary } from '../../utils/cloudinaryUpload';

interface ExcelImportProps {
  onClose: () => void;
  onImported: () => void;
}

interface ParsedProduct {
  rowNum: number;
  include: boolean;
  nombre: string;
  categoria: string;
  descripcion: string;
  caracteristicas: string[];
  especificaciones: { name: string; value: string }[];
  destacado: boolean;
  mainBlob: Blob | null;
  extraBlobs: Blob[];
  mainUrlText: string;
  extraUrlsText: string[];
  previewUrl: string | null;
  imageCount: number;
}

const norm = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, '_');

const isTruthy = (v: string) =>
  ['si', 'sí', 'x', 'true', '1', 'verdadero', 'yes', 'destacado'].includes(v.toLowerCase().trim());

function parseEspec(text: string): { specs: { name: string; value: string }[]; extra: string[] } {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const specs: { name: string; value: string }[] = [];
  const extra: string[] = [];
  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx > 0 && idx < 40) specs.push({ name: line.slice(0, idx).trim(), value: line.slice(idx + 1).trim() });
    else extra.push(line);
  }
  return { specs, extra };
}

const ExcelImport: React.FC<ExcelImportProps> = ({ onClose, onImported }) => {
  const [phase, setPhase] = useState<'select' | 'parsing' | 'preview' | 'importing' | 'done'>('select');
  const [parsed, setParsed] = useState<ParsedProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0, name: '' });
  const [result, setResult] = useState<{ ok: number; fail: number; errs: string[] }>({ ok: 0, fail: 0, errs: [] });

  const handleFile = useCallback(async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setPhase('parsing');
    try {
      const buffer = await file.arrayBuffer();
      // exceljs se carga solo aquí (no infla el bundle del sitio público)
      // @ts-ignore  -> instalar con: npm install exceljs
      const ExcelJS = (await import('exceljs')).default;
      const wb = new ExcelJS.Workbook();
      await wb.xlsx.load(buffer);
      const ws = wb.worksheets[0];
      if (!ws) throw new Error('El archivo no tiene ninguna hoja.');

      const colByKey: Record<string, number> = {};
      ws.getRow(1).eachCell((cell: any, col: number) => {
        colByKey[norm(String(cell.text || ''))] = col;
      });
      if (colByKey['nombre'] === undefined || colByKey['categoria'] === undefined) {
        throw new Error('El Excel debe tener al menos las columnas "Categoria" y "Nombre".');
      }

      // Imágenes incrustadas agrupadas por fila (de la celda de anclaje)
      const imagesByRow: Record<number, { col: number; blob: Blob }[]> = {};
      for (const img of ws.getImages()) {
        const media = (wb.model.media as any[])[Number(img.imageId)];
        if (!media || !media.buffer) continue;
        const tl = (img as any).range?.tl;
        const rowIdx = (tl?.nativeRow ?? 0) + 1;
        const col = (tl?.nativeCol ?? 0) + 1;
        const blob = new Blob([media.buffer], { type: `image/${media.extension || 'png'}` });
        (imagesByRow[rowIdx] = imagesByRow[rowIdx] || []).push({ col, blob });
      }

      const colD = colByKey['imagen_principal'];
      const out: ParsedProduct[] = [];
      for (let r = 2; r <= ws.rowCount; r++) {
        const row = ws.getRow(r);
        const txt = (key: string) => {
          const c = colByKey[key];
          return c ? String(row.getCell(c).text || '').trim() : '';
        };
        const nombre = txt('nombre');
        const categoria = txt('categoria');
        if (!nombre && !categoria) continue;

        const rowImgs = (imagesByRow[r] || []).slice().sort((a, b) => a.col - b.col);
        let mainBlob: Blob | null = null;
        const extraBlobs: Blob[] = [];
        for (const it of rowImgs) {
          if (mainBlob === null && (colD === undefined || it.col <= colD)) mainBlob = it.blob;
          else extraBlobs.push(it.blob);
        }
        if (mainBlob === null && rowImgs.length) mainBlob = rowImgs[0].blob;

        const mainUrlRaw = txt('imagen_principal');
        const mainUrlText = /^https?:\/\//.test(mainUrlRaw) ? mainUrlRaw : '';
        const extraUrlsText = txt('imagenes_adicionales')
          .split(/[\n,;]+/).map((s) => s.trim()).filter((s) => /^https?:\/\//.test(s));

        const caracteristicas = txt('caracteristicas').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
        const { specs, extra } = parseEspec(txt('especificaciones'));

        out.push({
          rowNum: r, include: true, nombre, categoria,
          descripcion: txt('descripcion'),
          caracteristicas: [...caracteristicas, ...extra],
          especificaciones: specs,
          destacado: isTruthy(txt('destacado')),
          mainBlob, extraBlobs, mainUrlText, extraUrlsText,
          previewUrl: mainBlob ? URL.createObjectURL(mainBlob) : mainUrlText || null,
          imageCount: (mainBlob ? 1 : mainUrlText ? 1 : 0) + extraBlobs.length + extraUrlsText.length,
        });
      }

      if (out.length === 0) throw new Error('No se encontraron filas con productos.');
      setParsed(out);
      setPhase('preview');
    } catch (e: any) {
      const msg = String(e?.message || e);
      if (/Cannot find module 'exceljs'|exceljs/i.test(msg) && /find module|resolve/i.test(msg)) {
        setError('Falta instalar la librería: ejecuta "npm install exceljs" y vuelve a intentar.');
      } else {
        setError(msg || 'No se pudo leer el Excel.');
      }
      setPhase('select');
    }
  }, []);

  const toggle = (rowNum: number) =>
    setParsed((prev) => prev.map((p) => (p.rowNum === rowNum ? { ...p, include: !p.include } : p)));

  const runImport = useCallback(async () => {
    const items = parsed.filter((p) => p.include);
    setPhase('importing');
    let ok = 0, fail = 0;
    const errs: string[] = [];

    // Asegurar que las categorías del Excel existan en la tabla (para el selector/gestor)
    const cats = Array.from(new Set(items.map((p) => p.categoria.trim()).filter(Boolean)));
    for (const c of cats) {
      try { await createCategoria(c); } catch { /* ya existe: ignorar */ }
    }
    for (let i = 0; i < items.length; i++) {
      const p = items[i];
      setProgress({ current: i + 1, total: items.length, name: p.nombre });
      try {
        let principal = p.mainUrlText;
        if (p.mainBlob) principal = await uploadToCloudinary(p.mainBlob, `${p.nombre || 'producto'}.png`);
        if (!principal) throw new Error('Sin imagen principal');
        const adicionales: string[] = [...p.extraUrlsText];
        for (const b of p.extraBlobs) adicionales.push(await uploadToCloudinary(b));

        const input: ProductInput = {
          categoria: p.categoria,
          nombre_producto: p.nombre,
          descripcion: p.descripcion,
          imagen_principal: principal,
          imagenes_adicionales: adicionales,
          caracteristicas: p.caracteristicas,
          especificaciones: p.especificaciones,
          destacado: p.destacado,
          disponibilidad: 'disponible',
          codigo: '',
          precio: null,
          orden: 0,
        };
        await createProduct(input);
        ok++;
      } catch (e: any) {
        fail++;
        errs.push(`Fila ${p.rowNum} (${p.nombre || 's/n'}): ${e?.message || e}`);
      }
    }
    setResult({ ok, fail, errs });
    setPhase('done');
  }, [parsed]);

  const incluidos = parsed.filter((p) => p.include).length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-8 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FaFileExcel className="text-green-600" /> Importar productos desde Excel
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1" aria-label="Cerrar">
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="px-6 py-5">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          {/* Paso 1: seleccionar archivo */}
          {(phase === 'select' || phase === 'parsing') && (
            <label className={`flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${phase === 'parsing' ? 'border-teal-400 bg-teal-50' : 'border-slate-300 hover:border-teal-400 hover:bg-slate-50'}`}>
              {phase === 'parsing' ? (
                <>
                  <FaSpinner className="text-3xl text-teal-600 animate-spin mb-2" />
                  <span className="text-sm text-slate-600">Leyendo el Excel e imágenes…</span>
                </>
              ) : (
                <>
                  <FaUpload className="text-3xl text-slate-400 mb-2" />
                  <span className="text-sm font-medium text-slate-700">Haz clic para elegir tu archivo .xlsx</span>
                  <span className="text-xs text-slate-400 mt-1">Columnas: Categoria, Nombre, descripcion, imagen_principal, imagenes_adicionales, caracteristicas, especificaciones, destacado</span>
                </>
              )}
              <input type="file" accept=".xlsx" className="hidden" disabled={phase === 'parsing'}
                onChange={(e) => handleFile(e.target.files?.[0])} />
            </label>
          )}

          {/* Paso 2: vista previa */}
          {phase === 'preview' && (
            <>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-slate-600">
                  Se detectaron <span className="font-bold text-slate-900">{parsed.length}</span> productos.
                  Revisa que cada imagen corresponda a su producto antes de importar.
                </p>
              </div>
              <div className="border border-slate-200 rounded-xl overflow-hidden max-h-[50vh] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-xs text-slate-500 uppercase sticky top-0">
                    <tr>
                      <th className="p-2 w-10"></th>
                      <th className="p-2 w-16 text-left">Imagen</th>
                      <th className="p-2 text-left">Producto</th>
                      <th className="p-2 text-left hidden sm:table-cell">Categoría</th>
                      <th className="p-2 text-center">Imgs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {parsed.map((p) => (
                      <tr key={p.rowNum} className={p.include ? '' : 'opacity-40'}>
                        <td className="p-2 text-center">
                          <input type="checkbox" checked={p.include} onChange={() => toggle(p.rowNum)}
                            className="w-4 h-4 accent-teal-600" aria-label="Incluir" />
                        </td>
                        <td className="p-2">
                          {p.previewUrl ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={p.previewUrl} alt="" className="w-12 h-12 object-contain rounded-lg border border-slate-100 bg-slate-50" />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-300 text-xs">—</div>
                          )}
                        </td>
                        <td className="p-2">
                          <p className="font-medium text-slate-800 line-clamp-1">{p.nombre || <span className="text-red-500">Sin nombre</span>}</p>
                          <p className="text-xs text-slate-400 line-clamp-1">{p.descripcion}</p>
                        </td>
                        <td className="p-2 hidden sm:table-cell text-slate-600">{p.categoria}</td>
                        <td className="p-2 text-center text-slate-600">{p.imageCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button onClick={runImport} disabled={incluidos === 0}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition-colors">
                  Importar {incluidos} producto{incluidos === 1 ? '' : 's'}
                </button>
                <button onClick={() => { setParsed([]); setPhase('select'); }}
                  className="px-6 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">
                  Elegir otro archivo
                </button>
              </div>
            </>
          )}

          {/* Paso 3: importando */}
          {phase === 'importing' && (
            <div className="py-8 text-center">
              <FaSpinner className="text-3xl text-teal-600 animate-spin mx-auto mb-4" />
              <p className="font-medium text-slate-800">Importando {progress.current} de {progress.total}…</p>
              <p className="text-sm text-slate-500 truncate mt-1">{progress.name}</p>
              <div className="w-full bg-slate-100 rounded-full h-2.5 mt-4 overflow-hidden">
                <div className="bg-teal-600 h-2.5 transition-all duration-300"
                  style={{ width: `${progress.total ? (progress.current / progress.total) * 100 : 0}%` }} />
              </div>
              <p className="text-xs text-slate-400 mt-3">Subiendo imágenes y guardando. No cierres esta ventana.</p>
            </div>
          )}

          {/* Paso 4: resultado */}
          {phase === 'done' && (
            <div className="py-6 text-center">
              <FaCheckCircle className="text-4xl text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">Importación finalizada</h3>
              <p className="text-sm text-slate-600">
                {result.ok} producto{result.ok === 1 ? '' : 's'} creado{result.ok === 1 ? '' : 's'} correctamente.
              </p>
              {result.fail > 0 && (
                <div className="mt-4 text-left bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-amber-800 flex items-center gap-2 mb-2">
                    <FaExclamationTriangle /> {result.fail} con problemas (revísalos):
                  </p>
                  <ul className="text-xs text-amber-700 space-y-1 max-h-32 overflow-y-auto">
                    {result.errs.map((e, i) => <li key={i}>• {e}</li>)}
                  </ul>
                </div>
              )}
              <button onClick={() => { onImported(); onClose(); }}
                className="mt-5 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors">
                Listo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExcelImport;
