# Ansa Medic Dent - Frontend

Un sitio web moderno y optimizado para Ansa Medic Dent, especializado en insumos odontológicos y servicio técnico dental.

## Características principales

- ⚡ **Next.js 14** con TypeScript para máxima performance
- 🎨 **Tailwind CSS** para diseño responsive y moderno
- 🚀 **Framer Motion** para animaciones fluidas
- 📱 **Diseño responsive** optimizado para todos los dispositivos
- 🔍 **SEO optimizado** con meta tags dinámicos
- 🎯 **Componentes optimizados** con React.memo y lazy loading

## Optimizaciones aplicadas

### Performance
- **React.memo** en componentes clave para evitar re-renders innecesarios
- **useMemo** y **useCallback** para memoización de cálculos pesados
- **Dynamic imports** para carga diferida de componentes (Testimonials)
- **Next/Image** moderno con `fill` y `sizes` optimizados
- **Lazy loading** de imágenes para mejor Core Web Vitals

### Estructura de componentes
- **Componentes reutilizables** en `/common` (Button, Modal)
- **TypeScript interfaces** bien definidas para type safety
- **Separación de responsabilidades** entre UI y lógica de negocio
- **AuthContext** preparado para futuras funcionalidades de autenticación

### UX/UI
- **Loading states** en componentes dinámicos
- **Animaciones performantes** con Framer Motion
- **Accesibilidad** mejorada con aria-labels y keyboard navigation
- **WhatsApp integration** con detección de dispositivo móvil

## Tecnologías utilizadas

- [Next.js](https://nextjs.org) - React Framework
- [TypeScript](https://typescriptlang.org) - Type Safety
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Framer Motion](https://framer.com/motion) - Animations
- [React Icons](https://react-icons.github.io/react-icons/) - Icon Library
- [Lucide React](https://lucide.dev) - Modern Icons

## Instalación y desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Ejecutar en producción
npm start

# Linting
npm run lint
```

## Estructura del proyecto

```
src/
├── components/
│   ├── common/          # Componentes reutilizables
│   ├── home/            # Componentes de la página principal
│   ├── layout/          # Layout y navegación
│   ├── product/         # Componentes de productos
│   └── admin/           # Panel de administración
├── context/             # React Contexts
├── pages/              # Páginas de Next.js
├── services/           # Servicios y APIs
├── styles/             # Estilos globales
└── utils/              # Utilidades y constantes
```

## Características de optimización implementadas

✅ **Corregido error de naming**: `Testiomonials.tsx` → `Testimonials.tsx`  
✅ **Optimizado Next/Image**: Uso de API moderna con `fill` y `sizes`  
✅ **Memoización inteligente**: React.memo en componentes pesados  
✅ **Carga diferida**: Dynamic import para Testimonials  
✅ **AuthContext funcional**: Preparado para autenticación  
✅ **Componentes comunes**: Button y Modal reutilizables  
✅ **TypeScript strict**: Interfaces bien definidas  

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
