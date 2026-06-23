-- ============================================================================
-- Añade la sucursal a los eventos de métricas (Quito / Valle)
-- Ejecutar en: Supabase → SQL Editor → New query → Run
-- (Requiere haber corrido antes scripts/supabase-metricas.sql)
-- ============================================================================

ALTER TABLE public.eventos
  ADD COLUMN IF NOT EXISTS sucursal TEXT;

CREATE INDEX IF NOT EXISTS idx_eventos_sucursal ON public.eventos(tipo, sucursal, created_at);
