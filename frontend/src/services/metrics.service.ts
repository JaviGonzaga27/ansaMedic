/**
 * Métricas del catálogo: registra eventos (vistas, consultas WhatsApp,
 * cotizaciones) y los agrega para el panel de administración.
 */

import { createClient } from '../lib/supabase/client';

// Cliente sin tipado estricto (la tabla `eventos` y el RPC no están en Database).
const supabase: any = createClient();

export type EventoTipo = 'vista' | 'whatsapp' | 'cotizacion';
export type Sucursal = 'quito' | 'valle';

/** Registra un evento. Devuelve una promesa para poder esperarlo antes de salir a WhatsApp. */
export async function trackEvent(
  tipo: EventoTipo,
  productoId?: string,
  productoNombre?: string,
  sucursal?: Sucursal
): Promise<void> {
  try {
    await supabase.from('eventos').insert({
      tipo,
      producto_id: productoId ?? null,
      producto_nombre: productoNombre ?? null,
      sucursal: sucursal ?? null,
    });
  } catch {
    /* sin conexión / tabla no creada: se ignora */
  }
}

/** Espera el registro pero sin colgar la apertura de WhatsApp (máx ~1.2s). */
export function trackThen(promise: Promise<any>): Promise<any> {
  return Promise.race([promise, new Promise((r) => setTimeout(r, 1200))]);
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
  topCotizados: TopItem[];
  sucursal: {
    whatsapp: { quito: number; valle: number };
    cotizacion: { quito: number; valle: number };
  };
  prev: { vistas: number; whatsapp: number; cotizaciones: number };
}

async function countOf(
  tipo: EventoTipo,
  sinceIso: string,
  sucursal?: Sucursal,
  untilIso?: string
): Promise<number> {
  let q = supabase
    .from('eventos')
    .select('id', { count: 'exact', head: true })
    .eq('tipo', tipo)
    .gte('created_at', sinceIso);
  if (untilIso) q = q.lt('created_at', untilIso);
  if (sucursal) q = q.eq('sucursal', sucursal);
  const { count, error } = await q;
  if (error) throw new Error(error.message);
  return count ?? 0;
}

async function topOf(tipo: EventoTipo, dias: number): Promise<TopItem[]> {
  const { data, error } = await supabase.rpc('metricas_top', { p_tipo: tipo, p_dias: dias, p_limit: 10 });
  if (error) throw new Error(error.message);
  return (data as any[] | null)?.map((d) => ({
    producto_id: d.producto_id,
    producto_nombre: d.producto_nombre,
    total: Number(d.total),
  })) ?? [];
}

export async function getMetrics(dias = 30): Promise<MetricsData> {
  const since = new Date(Date.now() - dias * 86400000).toISOString();
  const prevSince = new Date(Date.now() - 2 * dias * 86400000).toISOString();
  const [
    vistas, whatsapp, cotizaciones,
    topVistas, topWhatsapp, topCotizados,
    waQ, waV, cotQ, cotV,
  ] = await Promise.all([
    countOf('vista', since),
    countOf('whatsapp', since),
    countOf('cotizacion', since),
    topOf('vista', dias),
    topOf('whatsapp', dias),
    topOf('cotizacion', dias),
    countOf('whatsapp', since, 'quito'),
    countOf('whatsapp', since, 'valle'),
    countOf('cotizacion', since, 'quito'),
    countOf('cotizacion', since, 'valle'),
  ]);
  const [pVistas, pWhatsapp, pCot] = await Promise.all([
    countOf('vista', prevSince, undefined, since),
    countOf('whatsapp', prevSince, undefined, since),
    countOf('cotizacion', prevSince, undefined, since),
  ]);
  return {
    vistas, whatsapp, cotizaciones,
    topVistas, topWhatsapp, topCotizados,
    sucursal: {
      whatsapp: { quito: waQ, valle: waV },
      cotizacion: { quito: cotQ, valle: cotV },
    },
    prev: { vistas: pVistas, whatsapp: pWhatsapp, cotizaciones: pCot },
  };
}
