# Integración de Productos: JSON + Supabase

## 📝 Resumen

La aplicación ahora consume productos de **dos fuentes**:
1. **Archivos JSON locales** (existentes)
2. **Base de datos Supabase** (nueva integración)

Los productos de ambas fuentes se combinan automáticamente y se muestran juntos en la interfaz.

## 🏗️ Arquitectura

### Servicio de Productos (`src/services/products.service.ts`)

Este servicio centraliza toda la lógica de obtención de productos:

- **`getAllProducts()`**: Obtiene todos los productos (JSON + Supabase)
- **`getAllCategories()`**: Obtiene todas las categorías únicas
- **`getProductsByCategory(categoryId)`**: Filtra productos por categoría
- **`getProductById(productId)`**: Obtiene un producto específico
- **`getFeaturedProducts(limit?)`**: Obtiene solo productos destacados

### Componentes Actualizados

1. **`ProductList.tsx`**
   - Ahora carga productos de forma asíncrona
   - Muestra un indicador de carga mientras obtiene los datos
   - Combina productos de JSON y Supabase

2. **`FeaturedProducts.tsx`**
   - Usa `getFeaturedProducts()` para obtener productos destacados
   - Incluye productos de Supabase marcados como `destacado: true`

## 🔄 Flujo de Datos

```
┌─────────────────┐     ┌──────────────────┐
│  JSON Local     │────▶│                  │
│  (productos)    │     │  products.       │
└─────────────────┘     │  service.ts      │
                        │                  │
┌─────────────────┐     │  - getAllProducts│
│  Supabase DB    │────▶│  - getCategories │
│  (productos)    │     │  - getFeatured   │
└─────────────────┘     └─────────┬────────┘
                                  │
                                  ▼
                        ┌──────────────────┐
                        │  Componentes UI  │
                        │  - ProductList   │
                        │  - Featured      │
                        └──────────────────┘
```

## 📦 Estructura de Datos

### Producto de JSON
```json
{
  "id": "prod-123",
  "name": "Producto X",
  "imageUrl": "/images/producto.jpg",
  "description": "Descripción",
  "featured": true,
  "source": "json"
}
```

### Producto de Supabase
```typescript
{
  id: "uuid-123",
  categoria: "Resinas Compuestas",
  nombre_producto: "Brilliant EverGlow",
  descripcion: "Composite híbrido...",
  imagen_principal: "https://cloudinary.com/...",
  imagenes_adicionales: ["url1", "url2"],
  caracteristicas: { ... },
  especificaciones: { ... },
  destacado: true,
  source: "supabase"
}
```

Ambos se mapean a una interfaz común `Product` para unificar el formato.

## 🚀 Migración Futura

Cuando tengas todos los productos en Supabase:

1. **Opción 1: Comentar JSON**
   ```typescript
   // En products.service.ts
   async function getAllProducts() {
     const supabaseProducts = await getProductsFromSupabase();
     // const jsonProducts = getProductsFromJSON(); // Comentar
     return supabaseProducts; // Solo Supabase
   }
   ```

2. **Opción 2: Variable de entorno**
   ```typescript
   // .env.local
   NEXT_PUBLIC_USE_SUPABASE_ONLY=true
   
   // products.service.ts
   if (process.env.NEXT_PUBLIC_USE_SUPABASE_ONLY === 'true') {
     return await getProductsFromSupabase();
   }
   ```

## ✅ Ventajas del Sistema Actual

- **Transición gradual**: Puedes migrar productos poco a poco
- **Flexibilidad**: Mantiene ambos sistemas funcionando
- **Sin interrupciones**: Los productos JSON siguen funcionando
- **Fácil reversión**: Si hay problemas, los datos JSON están disponibles

## 🔧 Próximos Pasos

1. ✅ Subir más productos a Supabase con el script
2. ✅ Verificar que los productos se muestran correctamente
3. ⏳ Migrar todos los productos del JSON a Supabase
4. ⏳ Desactivar el JSON una vez completada la migración
5. ⏳ Implementar panel de administración para gestionar productos

## 📝 Notas Importantes

- Los productos de Supabase aparecen **primero** en el listado
- El campo `source` identifica el origen de cada producto
- Las categorías se unifican automáticamente
- Los productos destacados de ambas fuentes se combinan
