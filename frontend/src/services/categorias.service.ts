/**
 * Servicio de administración de categorías (CRUD contra Supabase).
 * La tabla `categorias` es la fuente de verdad para el selector del
 * formulario de productos y para la gestión desde el panel admin.
 */

import { createClient } from '../lib/supabase/client';

const supabase = createClient();

export interface Categoria {
  id: string;
  nombre: string;
  created_at?: string;
}

/** Lista todas las categorías ordenadas alfabéticamente. */
export async function listCategorias(): Promise<Categoria[]> {
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .order('nombre', { ascending: true });

  if (error) throw new Error(error.message);
  return (data || []) as Categoria[];
}

/** Crea una categoría nueva. Lanza error si ya existe (nombre único). */
export async function createCategoria(nombre: string): Promise<Categoria> {
  const limpio = nombre.trim();
  if (!limpio) throw new Error('El nombre de la categoría no puede estar vacío.');

  const { data, error } = await supabase
    .from('categorias')
    .insert({ nombre: limpio } as never)
    .select()
    .single();

  if (error) {
    if (/duplicate key|unique/i.test(error.message)) {
      throw new Error('Esa categoría ya existe.');
    }
    throw new Error(error.message);
  }
  return data as Categoria;
}

/** Cuenta cuántos productos usan una categoría (por nombre). */
export async function countProductsInCategoria(nombre: string): Promise<number> {
  const { count, error } = await supabase
    .from('productos')
    .select('id', { count: 'exact', head: true })
    .eq('categoria', nombre);

  if (error) throw new Error(error.message);
  return count ?? 0;
}

/**
 * Elimina una categoría. Bloquea el borrado si todavía tiene productos
 * asociados, para no dejar productos huérfanos.
 */
export async function deleteCategoria(cat: Categoria): Promise<void> {
  const enUso = await countProductsInCategoria(cat.nombre);
  if (enUso > 0) {
    throw new Error(
      `No se puede eliminar: hay ${enUso} producto(s) en "${cat.nombre}". Reasígnalos primero.`
    );
  }

  const { error } = await supabase.from('categorias').delete().eq('id', cat.id);
  if (error) throw new Error(error.message);
}
