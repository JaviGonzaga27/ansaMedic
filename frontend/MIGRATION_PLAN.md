# Plan de Migración: Cloudinary + Supabase

## 📋 Resumen

Este documento describe el proceso completo para migrar tu catálogo de productos desde archivos JSON locales a una solución moderna con:
- **Cloudinary**: Para almacenar y optimizar imágenes
- **Supabase**: Para almacenar datos de productos en una base de datos PostgreSQL

---

## 🎯 Estructura de la Base de Datos

La tabla `productos` en Supabase tendrá las siguientes columnas:

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | UUID | ID único generado automáticamente |
| `categoria` | TEXT | Categoría del producto |
| `nombre_producto` | TEXT | Nombre del producto |
| `descripcion` | TEXT | Descripción detallada |
| `imagen_principal` | TEXT | URL de Cloudinary de la imagen principal |
| `imagenes_adicionales` | TEXT[] | Array de URLs de imágenes adicionales |
| `caracteristicas` | JSONB | Características en formato JSON |
| `especificaciones` | JSONB | Especificaciones técnicas en JSON |
| `destacado` | BOOLEAN | Si el producto está destacado |
| `created_at` | TIMESTAMPTZ | Fecha de creación |
| `updated_at` | TIMESTAMPTZ | Fecha de última actualización |

---

## 🚀 Proceso de Migración Paso a Paso

### **Paso 1: Instalar Dependencias**

```powershell
# Instalar todas las dependencias necesarias
npm install next-cloudinary cloudinary dotenv @supabase/ssr
```

### **Paso 2: Configurar Variables de Entorno**

1. Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="tu-cloud-name"
NEXT_PUBLIC_CLOUDINARY_API_KEY="tu-api-key"
CLOUDINARY_API_SECRET="tu-api-secret"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://tu-proyecto.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="tu-anon-key"
```

2. **Obtener credenciales de Cloudinary:**
   - Ve a [cloudinary.com](https://cloudinary.com) y crea una cuenta
   - En el Dashboard, encontrarás tu `Cloud Name`, `API Key` y `API Secret`

3. **Obtener credenciales de Supabase:**
   - Ve a tu proyecto en [supabase.com](https://supabase.com)
   - En Settings → API encontrarás:
     - **Project URL**: Cópiala a `NEXT_PUBLIC_SUPABASE_URL`
     - **Anon/Public Key**: Cópiala a `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### **Paso 3: Crear la Tabla en Supabase**

1. Ve a tu proyecto de Supabase
2. Abre el **SQL Editor**
3. Ejecuta el contenido del archivo `scripts/supabase-setup.sql`:

```sql
-- Esto creará:
-- ✅ La tabla productos con todas las columnas
-- ✅ Políticas RLS para seguridad
-- ✅ Índices para optimizar búsquedas
-- ✅ Trigger para actualizar updated_at automáticamente
```

### **Paso 4: Organizar Imágenes**

Tienes dos opciones para organizar tus imágenes:

#### **Opción A: Imágenes en carpetas por producto** (Recomendado)

```
public/images/producto/
  ├── producto-1/
  │   ├── principal.jpg
  │   ├── adicional-1.jpg
  │   └── adicional-2.jpg
  ├── producto-2/
  │   ├── principal.jpg
  │   └── adicional-1.jpg
  └── ...
```

#### **Opción B: Todas las imágenes en un solo directorio**

```
public/images/producto/
  ├── Product1.jpg
  ├── Product2.jpg
  ├── Product3.jpeg
  └── ...
```

### **Paso 5: Subir Imágenes a Cloudinary**

Ejecuta el script de migración de imágenes:

```powershell
# Si tus imágenes están organizadas en carpetas
node scripts/upload-images-cloudinary.js organized

# Si todas están en un directorio
node scripts/upload-images-cloudinary.js simple
```

**Lo que hace este script:**
- ✅ Lee todas las imágenes de `public/images/producto/`
- ✅ Las sube a Cloudinary con optimización automática
- ✅ Genera URLs optimizadas
- ✅ Guarda los resultados en `scripts/cloudinary-urls.json`
- ✅ Muestra progreso en tiempo real

**Características de las imágenes subidas:**
- Tamaño máximo limitado a 1200x1200px
- Optimización automática de calidad
- Formato automático (WebP cuando sea compatible)
- Organizadas en carpetas: `ansamedic/productos/producto-x/`

### **Paso 6: Migrar Datos a Supabase**

Una vez que las imágenes estén en Cloudinary, ejecuta:

```powershell
node scripts/migrate-to-supabase.js
```

**Lo que hace este script:**
- ✅ Lee los productos desde `public/json/products/products.json`
- ✅ Lee las URLs de Cloudinary desde `cloudinary-urls.json`
- ✅ Genera automáticamente categorías basadas en el nombre
- ✅ Crea características y especificaciones apropiadas para cada tipo
- ✅ Inserta todos los productos en Supabase
- ✅ Guarda un reporte en `scripts/migration-results.json`

### **Paso 7: Verificar la Migración**

1. Ve a tu proyecto en Supabase
2. Abre el **Table Editor**
3. Selecciona la tabla `productos`
4. Verifica que todos los productos se hayan insertado correctamente

---

## 📁 Archivos Creados

```
frontend/
├── .env.local.example          # Plantilla de variables de entorno
├── .env.local                  # Variables de entorno (crear manualmente)
├── src/
│   └── lib/
│       └── supabase/
│           ├── client.ts       # Cliente de Supabase para componentes
│           └── server.ts       # Cliente de Supabase para server components
└── scripts/
    ├── supabase-setup.sql              # Script SQL para crear tabla
    ├── upload-images-cloudinary.js     # Script para subir imágenes
    ├── migrate-to-supabase.js          # Script para migrar datos
    ├── cloudinary-urls.json            # URLs generadas (auto-creado)
    └── migration-results.json          # Resultados de migración (auto-creado)
```

---

## 🔧 Uso en tu Aplicación Next.js

### **1. Consultar Productos desde Supabase**

#### Server Component:

```typescript
import { createClient } from '@/lib/supabase/server';

export default async function ProductsPage() {
  const supabase = await createClient();
  
  const { data: productos, error } = await supabase
    .from('productos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error:', error);
    return <div>Error cargando productos</div>;
  }

  return (
    <div>
      {productos?.map((producto) => (
        <div key={producto.id}>
          <img src={producto.imagen_principal} alt={producto.nombre_producto} />
          <h2>{producto.nombre_producto}</h2>
          <p>{producto.descripcion}</p>
        </div>
      ))}
    </div>
  );
}
```

#### Client Component:

```typescript
'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export default function ProductsList() {
  const [productos, setProductos] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProductos() {
      const { data } = await supabase
        .from('productos')
        .select('*')
        .eq('destacado', true);
      
      setProductos(data || []);
    }
    
    fetchProductos();
  }, []);

  return (
    <div>
      {productos.map((producto) => (
        <div key={producto.id}>{producto.nombre_producto}</div>
      ))}
    </div>
  );
}
```

### **2. Usar Imágenes con Next Cloudinary**

```typescript
import { CldImage } from 'next-cloudinary';

export default function ProductCard({ producto }) {
  return (
    <div>
      {/* Imagen optimizada automáticamente */}
      <CldImage
        src={producto.imagen_principal}
        width={400}
        height={400}
        alt={producto.nombre_producto}
        crop="fill"
        gravity="auto"
      />
      
      {/* Galería de imágenes adicionales */}
      {producto.imagenes_adicionales?.map((url, index) => (
        <CldImage
          key={index}
          src={url}
          width={200}
          height={200}
          alt={`${producto.nombre_producto} - ${index + 1}`}
        />
      ))}
    </div>
  );
}
```

### **3. Filtrar por Categoría**

```typescript
const { data: productosCepillos } = await supabase
  .from('productos')
  .select('*')
  .eq('categoria', 'Cepillos');
```

### **4. Buscar Productos**

```typescript
const { data: resultados } = await supabase
  .from('productos')
  .select('*')
  .textSearch('nombre_producto', 'cepillo dental');
```

---

## 🎨 Ventajas de esta Solución

### **Cloudinary:**
- ✅ Optimización automática de imágenes
- ✅ Formato WebP automático
- ✅ Responsive images
- ✅ CDN global
- ✅ Transformaciones on-the-fly
- ✅ Lazy loading integrado

### **Supabase:**
- ✅ Base de datos PostgreSQL completa
- ✅ API REST automática
- ✅ Real-time subscriptions
- ✅ Row Level Security (RLS)
- ✅ Backup automático
- ✅ Fácil de escalar

---

## 🔒 Seguridad

Las políticas RLS están configuradas para:
- ✅ **Lectura pública**: Cualquiera puede ver productos
- ✅ **Escritura autenticada**: Solo usuarios autenticados pueden modificar

Para permitir inserciones públicas (no recomendado en producción), modifica las políticas en Supabase.

---

## 🐛 Solución de Problemas

### **Error: "Invalid API Key"**
- Verifica que las variables de entorno estén correctamente configuradas
- Asegúrate de que `.env.local` esté en la raíz del proyecto
- Reinicia el servidor de desarrollo

### **Error: "relation 'productos' does not exist"**
- Ejecuta el script SQL en Supabase
- Verifica que la tabla se creó correctamente

### **Imágenes no se suben a Cloudinary**
- Verifica las credenciales de Cloudinary
- Asegúrate de que las imágenes existan en la ruta especificada
- Revisa los permisos de lectura de archivos

### **Error de conexión con Supabase**
- Verifica la URL y la API Key
- Asegúrate de que el proyecto esté activo
- Revisa las políticas RLS

---

## 📞 Siguientes Pasos

1. ✅ Completar la configuración de variables de entorno
2. ✅ Ejecutar el script de migración de imágenes
3. ✅ Ejecutar el script de migración de datos
4. ✅ Actualizar componentes para usar Supabase
5. ✅ Probar la aplicación localmente
6. ✅ Desplegar a producción

---

## 💡 Tips Adicionales

- **Backup**: Antes de la migración, haz backup de tus datos JSON
- **Testing**: Prueba primero con un subconjunto de productos
- **Monitoreo**: Usa el Dashboard de Cloudinary para ver uso de ancho de banda
- **Performance**: Configura caché apropiado en Next.js
- **SEO**: Las URLs de Cloudinary son SEO-friendly

---

¿Necesitas ayuda? Revisa los logs de los scripts para más detalles sobre errores específicos.
