-- ============================================================================
-- Campos adicionales para productos: disponibilidad, código, precio y orden
-- Ejecutar en: Supabase → SQL Editor → New query → Run
-- ============================================================================

ALTER TABLE public.productos
  ADD COLUMN IF NOT EXISTS disponibilidad TEXT DEFAULT 'disponible',
  ADD COLUMN IF NOT EXISTS codigo TEXT,
  ADD COLUMN IF NOT EXISTS precio NUMERIC,
  ADD COLUMN IF NOT EXISTS orden INTEGER DEFAULT 0;

-- Índice para ordenar el catálogo
CREATE INDEX IF NOT EXISTS idx_productos_orden ON public.productos(orden);
