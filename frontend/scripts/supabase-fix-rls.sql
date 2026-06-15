-- ============================================================================
-- CORRECCIÓN DE POLÍTICAS RLS para la tabla productos
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================================

-- Asegurar que RLS está habilitado
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;

-- 1) LECTURA: permitir a TODOS (público anónimo Y usuarios autenticados).
--    El problema anterior era que la lectura solo aplicaba al rol `anon`,
--    por eso el panel admin (autenticado) no veía los productos.
DROP POLICY IF EXISTS "Los productos son visibles públicamente" ON public.productos;
DROP POLICY IF EXISTS "Lectura pública de productos" ON public.productos;
CREATE POLICY "Lectura pública de productos"
  ON public.productos
  FOR SELECT
  USING (true);

-- 2) INSERTAR: solo usuarios autenticados (admin).
DROP POLICY IF EXISTS "Usuarios autenticados pueden insertar productos" ON public.productos;
CREATE POLICY "Usuarios autenticados pueden insertar productos"
  ON public.productos
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 3) ACTUALIZAR: solo usuarios autenticados.
DROP POLICY IF EXISTS "Usuarios autenticados pueden actualizar productos" ON public.productos;
CREATE POLICY "Usuarios autenticados pueden actualizar productos"
  ON public.productos
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 4) ELIMINAR: solo usuarios autenticados.
DROP POLICY IF EXISTS "Usuarios autenticados pueden eliminar productos" ON public.productos;
CREATE POLICY "Usuarios autenticados pueden eliminar productos"
  ON public.productos
  FOR DELETE
  TO authenticated
  USING (true);

-- Verificar las políticas resultantes:
-- SELECT policyname, cmd, roles FROM pg_policies WHERE tablename = 'productos';
