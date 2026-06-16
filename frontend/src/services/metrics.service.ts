/**
 * Métricas del catálogo: registra eventos (vistas, consultas WhatsApp,
 * cotizaciones) y los agrega para el panel de administración.
 */

import { createClient } from '../lib/supabase/client';

// Cliente del navegador (mantiene la sesión para RLS). Sin tipado estricto:
// la tabla `eventos` y el RPC no están en el tipo Database.
const supabase: any = createClient();

export type EventoTipo = 'vista' | 'whatsapp' | 'cotizacion';

/** Registra un evento. Fire-and-forget: nunca rompe la UI si falla. */
export async function trackEvent(
  tipo: EventoTipo,
  productoId?: string,
  productoNombre?: string
): Promise<void> {
  try {
    await supabase.from('eventos').insert({
      tipo,
      producto_id: productoId ?? null,
      producto_nombre: productoNombre ?? null,
    } as never);
  } catch {
    /* sin conexión / tabla no creada: se ignora silenciosamente */
  }
}

export interface TopItem {
  producto_id: string;
  producto_nombre: string | null;
  total: number;
}

export interface MetricsData {
  vistas: number;
  whatsapp: number;
  cotizaciones: number;
  topVistas: TopItem[];
  topWhatsapp: TopItem[];
}

async function countOf(tipo: EventoTipo, sinceIso: string): Promise<number> {
  const { count, error } = await supabase
    .from('eventos')
    .select('id', { count: 'exact', head: true })
    .eq('tipo', tipo)
    .gte('created_at', sinceIso);
  if (error) throw new Error(error.message);
  return count ?? 0;
}

async function topOf(tipo: EventoTipo, dias: number): Promise<TopItem[]> {
  const { data, error } = await supabase.rpc('metricas_top', {
    p_tipo: tipo,
    p_dias: dias,
    p_limit: 10,
  });
  if (error) throw new Error(error.message);
  return (data as any[] | null)?.map((d) => ({
    producto_id: d.producto_id,
    producto_nombre: d.producto_nombre,
    total: Number(d.total),
  })) ?? [];
}

/** Obtiene todas las métricas para una ventana de días. */
export async function getMetrics(dias = 30): Promise<MetricsData> {
  const sinceIso = new Date(Date.now() - dias * 86400000).toISOString();
  const [vistas, whatsapp, cotizaciones, topVistas, topWhatsapp] = await Promise.all([
    countOf('vista', sinceIso),
    countOf('whatsapp', sinceIso),
    countOf('cotizacion', sinceIso),
    topOf('vista', dias),
    topOf('whatsapp', dias),
  ]);
  return { vistas, whatsapp, cotizaciones, topVistas, topWhatsapp };
}
