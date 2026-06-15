/**
 * Servicio de administración de productos (CRUD contra Supabase).
 * Usa el cliente del navegador con la sesión autenticada, de modo que
 * las políticas RLS (rol `authenticated`) permitan insertar/editar/eliminar.
 */

import { createClient } from '../lib/supabase/client';

const supabase = createClient();

export interface AdminProduct {
  id: string;
  categoria: string;
  nombre_producto: string;
  descripcion: string;
  imagen_principal: string;
  imagenes_adicionales: string[];
  // Lista de características (se guarda como { lista: [...] } en JSONB)
  caracteristicas: string[];
  // Especificaciones técnicas como pares nombre/valor
  especificaciones: { name: string; value: string }[];
  destacado: boolean;
  created_at?: string;
  updated_at?: string;
}

/** Datos del formulario (sin campos autogenerados) */
export type ProductInput = Omit<AdminProduct, 'id' | 'created_at' | 'updated_at'>;

// ---- Mapeos entre la fila de Supabase y el modelo del admin ----

/** Si el valor viene como texto JSON (string), lo parsea; si no, lo devuelve tal cual. */
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
  // caracteristicas puede venir como string JSON, { lista: [...] } u objeto suelto
  let caracteristicas: string[] = [];
  const c = parseMaybeJson(row.caracteristicas);
  if (Array.isArray(c)) {
    caracteristicas = c.map(String);
  } else if (typeof c === 'string') {
    if (c.trim()) caracteristicas = [c.trim()];
  } else if (c && typeof c === 'object') {
    if (Array.isArray(c.lista)) {
      caracteristicas = c.lista.map(String);
    } else {
      caracteristicas = Object.values(c).flatMap((v) =>
        Array.isArray(v) ? v.map(String) : [String(v)]
      );
    }
  }

  let especificaciones: { name: string; value: string }[] = [];
  const e = parseMaybeJson(row.especificaciones);
  if (e && typeof e === 'object' && !Array.isArray(e)) {
    especificaciones = Object.entries(e).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: valStr(value),
    }));
  }

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
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function productToRow(input: ProductInput) {
  const especificacionesObj: Record<string, string> = {};
  input.especificaciones
    .filter((s) => s.name.trim())
    .forEach((s) => {
      especificacionesObj[s.name.trim()] = s.value;
    });

  return {
    categoria: input.categoria.trim(),
    nombre_producto: input.nombre_producto.trim(),
    descripcion: input.descripcion.trim(),
    imagen_principal: input.imagen_principal.trim(),
    imagenes_adicionales: input.imagenes_adicionales.filter(Boolean),
    caracteristicas: { lista: input.caracteristicas.filter((f) => f.trim()) },
    especificaciones: especificacionesObj,
    destacado: input.destacado,
  };
}

// ---- Operaciones CRUD ----

export async function listProducts(): Promise<AdminProduct[]> {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
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

export async function updateProduct(
  id: string,
  input: ProductInput
): Promise<AdminProduct> {
  const { data, error } = await supabase
    .from('productos')
    .update(productToRow(input) as never)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return rowToProduct(data);
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from('productos').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

/** Lista de categorías existentes (para el datalist del formulario) */
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
  };
}
