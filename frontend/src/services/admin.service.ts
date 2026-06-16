/**
 * Servicio de administración de productos (CRUD contra Supabase).
 * Usa el cliente del navegador con la sesión autenticada, de modo que
 * las políticas RLS (rol `authenticated`) permitan insertar/editar/eliminar.
 */

import { createClient } from '../lib/supabase/client';

const supabase = createClient();

export type Disponibilidad = 'disponible' | 'agotado' | 'bajo_pedido';

export interface AdminProduct {
  id: string;
  categoria: string;
  nombre_producto: string;
  descripcion: string;
  imagen_principal: string;
  imagenes_adicionales: string[];
  caracteristicas: string[];
  especificaciones: { name: string; value: string }[];
  destacado: boolean;
  disponibilidad: Disponibilidad;
  codigo: string;
  precio: number | null;
  orden: number;
  created_at?: string;
  updated_at?: string;
}

/** Datos del formulario (sin campos autogenerados) */
export type ProductInput = Omit<AdminProduct, 'id' | 'created_at' | 'updated_at'>;

// ---- Mapeos ----

function parseMaybeJson(val: any): any {
  if (val == null) return null;
  if (typeof val === 'string') {
    const t = val.trim();
    if (!t) return null;
    try { return JSON.parse(t); } catch { return t; }
  }
  return val;
}

const valStr = (v: any): string =>
  Array.isArray(v) ? v.map(String).join(', ') : String(v);

function rowToProduct(row: any): AdminProduct {
  let caracteristicas: string[] = [];
  const c = parseMaybeJson(row.caracteristicas);
  if (Array.isArray(c)) {
    caracteristicas = c.map(String);
  } else if (typeof c === 'string') {
    if (c.trim()) caracteristicas = [c.trim()];
  } else if (c && typeof c === 'object') {
    if (Array.isArray(c.lista)) caracteristicas = c.lista.map(String);
    else caracteristicas = Object.values(c).flatMap((v) =>
      Array.isArray(v) ? v.map(String) : [String(v)]
    );
  }

  let especificaciones: { name: string; value: string }[] = [];
  const e = parseMaybeJson(row.especificaciones);
  if (e && typeof e === 'object' && !Array.isArray(e)) {
    especificaciones = Object.entries(e).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: valStr(value),
    }));
  }

  const disp = row.disponibilidad;
  const disponibilidad: Disponibilidad =
    disp === 'agotado' || disp === 'bajo_pedido' ? disp : 'disponible';

  return {
    id: row.id,
    categoria: row.categoria ?? '',
    nombre_producto: row.nombre_producto ?? '',
    descripcion: row.descripcion ?? '',
    imagen_principal: row.imagen_principal ?? '',
    imagenes_adicionales: row.imagenes_adicionales ?? [],
    caracteristicas,
    especificaciones,
    destacado: !!row.destacado,
    disponibilidad,
    codigo: row.codigo ?? '',
    precio: row.precio != null ? Number(row.precio) : null,
    orden: row.orden != null ? Number(row.orden) : 0,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function productToRow(input: ProductInput) {
  const especificacionesObj: Record<string, string> = {};
  input.especificaciones
    .filter((s) => s.name.trim())
    .forEach((s) => { especificacionesObj[s.name.trim()] = s.value; });

  return {
    categoria: input.categoria.trim(),
    nombre_producto: input.nombre_producto.trim(),
    descripcion: input.descripcion.trim(),
    imagen_principal: input.imagen_principal.trim(),
    imagenes_adicionales: input.imagenes_adicionales.filter(Boolean),
    caracteristicas: { lista: input.caracteristicas.filter((f) => f.trim()) },
    especificaciones: especificacionesObj,
    destacado: input.destacado,
    disponibilidad: input.disponibilidad,
    codigo: input.codigo.trim() || null,
    precio: input.precio,
    orden: input.orden,
  };
}

// ---- CRUD ----

export async function listProducts(): Promise<AdminProduct[]> {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .order('orden', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data || []).map(rowToProduct);
}

export async function createProduct(input: ProductInput): Promise<AdminProduct> {
  const { data, error } = await supabase
    .from('productos')
    .insert(productToRow(input) as never)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return rowToProduct(data);
}

export async function updateProduct(id: string, input: ProductInput): Promise<AdminProduct> {
  const { data, error } = await supabase
    .from('productos')
    .update(productToRow(input) as never)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return rowToProduct(data);
}

/** Actualiza solo algunos campos (edición rápida desde la tabla). */
export async function patchProduct(id: string, patch: Partial<ProductInput>): Promise<void> {
  const { error } = await supabase.from('productos').update(patch as never).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from('productos').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

/** Duplica un producto (crea una copia con "(copia)" en el nombre). */
export async function duplicateProduct(p: AdminProduct): Promise<AdminProduct> {
  const input: ProductInput = {
    categoria: p.categoria,
    nombre_producto: `${p.nombre_producto} (copia)`,
    descripcion: p.descripcion,
    imagen_principal: p.imagen_principal,
    imagenes_adicionales: p.imagenes_adicionales,
    caracteristicas: p.caracteristicas,
    especificaciones: p.especificaciones,
    destacado: false,
    disponibilidad: p.disponibilidad,
    codigo: p.codigo,
    precio: p.precio,
    orden: p.orden,
  };
  return createProduct(input);
}

/** Elimina varios productos. */
export async function bulkDelete(ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  const { error } = await supabase.from('productos').delete().in('id', ids);
  if (error) throw new Error(error.message);
}

/** Actualiza varios productos con los mismos campos (destacado, categoría, disponibilidad). */
export async function bulkPatch(
  ids: string[],
  patch: Partial<Pick<ProductInput, 'destacado' | 'categoria' | 'disponibilidad'>>
): Promise<void> {
  if (ids.length === 0) return;
  const { error } = await supabase.from('productos').update(patch as never).in('id', ids);
  if (error) throw new Error(error.message);
}

export async function listCategorias(): Promise<string[]> {
  const { data, error } = await supabase.from('productos').select('categoria');
  if (error) return [];
  const set = new Set<string>();
  (data || []).forEach((r: any) => r.categoria && set.add(r.categoria));
  return Array.from(set).sort();
}

export function emptyProduct(): ProductInput {
  return {
    categoria: '',
    nombre_producto: '',
    descripcion: '',
    imagen_principal: '',
    imagenes_adicionales: [],
    caracteristicas: [],
    especificaciones: [],
    destacado: false,
    disponibilidad: 'disponible',
    codigo: '',
    precio: null,
    orden: 0,
  };
}
