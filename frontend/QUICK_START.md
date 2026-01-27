# Guía Rápida de Migración

## 📋 Checklist de Migración

### Paso 1: Instalar Dependencias
```powershell
npm install next-cloudinary cloudinary dotenv @supabase/ssr
```

### Paso 2: Configurar Variables de Entorno
1. Copia `.env.local.example` a `.env.local`
2. Completa con tus credenciales:
   - Cloudinary: https://cloudinary.com/console
   - Supabase: https://supabase.com/dashboard

### Paso 3: Configurar Supabase
1. Ve a tu proyecto en Supabase
2. Abre SQL Editor
3. Ejecuta el contenido de `scripts/supabase-setup.sql`

### Paso 4: Subir Imágenes a Cloudinary
```powershell
# Si tus imágenes están en carpetas organizadas
node scripts/upload-images-cloudinary.js organized

# Si están todas en un directorio
node scripts/upload-images-cloudinary.js simple
```

### Paso 5: Migrar Datos a Supabase
```powershell
node scripts/migrate-to-supabase.js
```

### Paso 6: Verificar
1. Revisa `scripts/cloudinary-urls.json`
2. Revisa `scripts/migration-results.json`
3. Ve a Supabase Table Editor para ver los productos

---

## 🎯 Comandos Útiles

### Verificar configuración
```powershell
# Ver variables de entorno
Get-Content .env.local

# Verificar que Node puede leer las variables
node -e "require('dotenv').config({path:'.env.local'}); console.log(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)"
```

### Testing
```powershell
# Probar conexión con Supabase
node -e "const {createClient} = require('@supabase/supabase-js'); const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY); s.from('productos').select('count').then(r => console.log(r))"
```

### Desarrollo
```powershell
# Iniciar servidor de desarrollo
npm run dev

# Ver la página de ejemplo
# http://localhost:3000/productos (después de crear la ruta)
```

---

## 📁 Estructura de Carpetas de Imágenes

### Opción A: Organizado (Recomendado)
```
public/images/producto/
├── producto-1/
│   ├── principal.jpg          # Se sube como "imagen-principal"
│   ├── adicional-1.jpg         # Se sube como "adicional-1"
│   └── adicional-2.jpg         # Se sube como "adicional-2"
├── producto-2/
│   └── principal.jpg
└── ...
```

### Opción B: Simple
```
public/images/producto/
├── Product1.jpg
├── Product2.jpg
└── Product3.jpeg
```

---

## 🔍 Verificación de la Migración

### 1. Cloudinary
- Ve a: https://console.cloudinary.com/console/media_library
- Busca la carpeta: `ansamedic/productos/`
- Verifica que todas las imágenes estén subidas

### 2. Supabase
- Ve a: tu-proyecto.supabase.co
- Table Editor → productos
- Verifica que todos los registros estén insertados
- Revisa que las URLs de imagen_principal funcionen

### 3. Aplicación
```powershell
npm run dev
```
- Crea una página de prueba o usa los ejemplos en `src/components/examples/`

---

## 🐛 Solución de Problemas Comunes

### Error: "Cannot find module 'dotenv'"
```powershell
npm install dotenv
```

### Error: "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is undefined"
```powershell
# Asegúrate de que .env.local existe
Test-Path .env.local

# Verifica el contenido
Get-Content .env.local

# Reinicia el terminal después de crear .env.local
```

### Error: "relation 'productos' does not exist"
- Ve a Supabase SQL Editor
- Ejecuta `scripts/supabase-setup.sql`
- Verifica en Table Editor que la tabla existe

### Imágenes no se suben
```powershell
# Verifica que el directorio existe
Test-Path public/images/producto

# Lista los archivos
Get-ChildItem public/images/producto

# Verifica permisos de lectura
Get-Acl public/images/producto
```

### Error de autenticación en Supabase
- Verifica que las políticas RLS estén configuradas
- Para testing, temporalmente puedes deshabilitar RLS (NO en producción)

---

## 📊 Archivos Generados Durante la Migración

| Archivo | Descripción | ¿Versionar? |
|---------|-------------|-------------|
| `scripts/cloudinary-urls.json` | URLs de Cloudinary generadas | No (agregado a .gitignore) |
| `scripts/migration-results.json` | Resultados de la migración a Supabase | No (agregado a .gitignore) |
| `.env.local` | Variables de entorno | **NUNCA** |

---

## 🚀 Después de la Migración

### 1. Actualiza tus componentes
- Reemplaza `products.json` por consultas a Supabase
- Usa `CldImage` en lugar de `<img>` para imágenes
- Ver ejemplos en `src/components/examples/`

### 2. Optimiza para producción
```typescript
// next.config.mjs
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
};
```

### 3. Elimina archivos antiguos (opcional)
```powershell
# Backup primero!
# Copia products.json a un lugar seguro
# Luego puedes eliminar:
# - public/json/products/products.json
# - public/images/producto/* (después de verificar que Cloudinary tiene todo)
```

---

## 📞 Recursos

- **Cloudinary Docs**: https://cloudinary.com/documentation
- **Supabase Docs**: https://supabase.com/docs
- **Next Cloudinary**: https://next-cloudinary.dev
- **Plan Completo**: Ver `MIGRATION_PLAN.md`

---

## ✅ Checklist Final

- [ ] Dependencias instaladas
- [ ] `.env.local` configurado
- [ ] Tabla en Supabase creada
- [ ] Imágenes subidas a Cloudinary
- [ ] Productos migrados a Supabase
- [ ] Verificación en Dashboard de Cloudinary
- [ ] Verificación en Table Editor de Supabase
- [ ] Componentes actualizados
- [ ] Pruebas locales exitosas
- [ ] Listo para producción 🎉
