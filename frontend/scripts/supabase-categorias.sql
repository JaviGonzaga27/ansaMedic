-- ============================================================================
-- TABLA DE CATEGORÍAS (fuente de verdad para el panel admin)
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.categorias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;

-- Lectura pública (catálogo y admin)
DROP POLICY IF EXISTS "Lectura pública de categorias" ON public.categorias;
CREATE POLICY "Lectura pública de categorias"
  ON public.categorias FOR SELECT USING (true);

-- Escritura solo autenticados (admin)
DROP POLICY IF EXISTS "Insertar categorias autenticados" ON public.categorias;
CREATE POLICY "Insertar categorias autenticados"
  ON public.categorias FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Actualizar categorias autenticados" ON public.categorias;
CREATE POLICY "Actualizar categorias autenticados"
  ON public.categorias FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Eliminar categorias autenticados" ON public.categorias;
CREATE POLICY "Eliminar categorias autenticados"
  ON public.categorias FOR DELETE TO authenticated USING (true);

-- Sembrar la tabla con las categorías ya usadas por los productos existentes
INSERT INTO public.categorias (nombre)
SELECT DISTINCT categoria
FROM public.productos
WHERE categoria IS NOT NULL AND TRIM(categoria) <> ''
ON CONFLICT (nombre) DO NOTHING;

-- Verificar:
-- SELECT * FROM public.categorias ORDER BY nombre;
