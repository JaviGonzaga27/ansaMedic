-- ============================================================================
-- MÉTRICAS: tabla de eventos del catálogo
-- Ejecutar en: Supabase → SQL Editor → New query → Run
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.eventos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo TEXT NOT NULL,              -- 'vista' | 'whatsapp' | 'cotizacion'
  producto_id TEXT,
  producto_nombre TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_eventos_tipo_fecha ON public.eventos(tipo, created_at);
CREATE INDEX IF NOT EXISTS idx_eventos_producto ON public.eventos(producto_id);

ALTER TABLE public.eventos ENABLE ROW LEVEL SECURITY;

-- Registrar eventos: cualquiera (el sitio público los registra de forma anónima)
DROP POLICY IF EXISTS "Registrar eventos" ON public.eventos;
CREATE POLICY "Registrar eventos"
  ON public.eventos FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Leer eventos: solo usuarios autenticados (administrador)
DROP POLICY IF EXISTS "Leer eventos" ON public.eventos;
CREATE POLICY "Leer eventos"
  ON public.eventos FOR SELECT TO authenticated USING (true);

-- Top de productos por tipo de evento, en una ventana de días
CREATE OR REPLACE FUNCTION public.metricas_top(p_tipo TEXT, p_dias INT, p_limit INT)
RETURNS TABLE (producto_id TEXT, producto_nombre TEXT, total BIGINT)
LANGUAGE sql STABLE AS $$
  SELECT producto_id,
         MAX(producto_nombre) AS producto_nombre,
         COUNT(*)::BIGINT AS total
  FROM public.eventos
  WHERE tipo = p_tipo
    AND producto_id IS NOT NULL
    AND created_at >= NOW() - (p_dias || ' days')::INTERVAL
  GROUP BY producto_id
  ORDER BY total DESC
  LIMIT p_limit;
$$;
