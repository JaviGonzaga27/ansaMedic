-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS public.productos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  categoria TEXT NOT NULL,
  nombre_producto TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  imagen_principal TEXT NOT NULL,
  imagenes_adicionales TEXT[] DEFAULT '{}',
  caracteristicas JSONB DEFAULT '{}',
  especificaciones JSONB DEFAULT '{}',
  destacado BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública de productos
CREATE POLICY "Los productos son visibles públicamente"
ON public.productos
FOR SELECT
TO anon
USING (true);

-- Política para permitir operaciones autenticadas (para administración)
CREATE POLICY "Usuarios autenticados pueden insertar productos"
ON public.productos
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Usuarios autenticados pueden actualizar productos"
ON public.productos
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Usuarios autenticados pueden eliminar productos"
ON public.productos
FOR DELETE
TO authenticated
USING (true);

-- Crear índice para búsquedas por categoría
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON public.productos(categoria);

-- Crear índice para productos destacados
CREATE INDEX IF NOT EXISTS idx_productos_destacado ON public.productos(destacado) WHERE destacado = true;

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.productos
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Comentarios para documentación
COMMENT ON TABLE public.productos IS 'Tabla principal de productos del catálogo';
COMMENT ON COLUMN public.productos.categoria IS 'Categoría del producto (ej: Cepillos, Ortodoncia, etc.)';
COMMENT ON COLUMN public.productos.nombre_producto IS 'Nombre completo del producto';
COMMENT ON COLUMN public.productos.descripcion IS 'Descripción detallada del producto';
COMMENT ON COLUMN public.productos.imagen_principal IS 'URL de la imagen principal en Cloudinary';
COMMENT ON COLUMN public.productos.imagenes_adicionales IS 'Array de URLs de imágenes adicionales en Cloudinary';
COMMENT ON COLUMN public.productos.caracteristicas IS 'Características del producto en formato JSON';
COMMENT ON COLUMN public.productos.especificaciones IS 'Especificaciones técnicas en formato JSON';
COMMENT ON COLUMN public.productos.destacado IS 'Indica si el producto está destacado en la página principal';
