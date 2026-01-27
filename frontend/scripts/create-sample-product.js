/**
 * Script para crear un producto de ejemplo
 * Sube imágenes a Cloudinary y crea el producto en Supabase
 */

require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configurar Supabase
// Nota: Para insertar datos, necesitamos usar la service key o autenticación
// Si tienes SUPABASE_SERVICE_ROLE_KEY, agrégala al .env.local
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey
);

async function uploadToCloudinary(imagePath, folder = 'productos') {
  try {
    console.log(`📤 Subiendo imagen: ${imagePath}`);
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: folder,
      resource_type: 'image',
      quality: 'auto',
      fetch_format: 'auto',
    });
    console.log(`✅ Imagen subida: ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`❌ Error subiendo ${imagePath}:`, error);
    throw error;
  }
}

async function createSampleProduct() {
  try {
    console.log('🚀 Iniciando creación de producto de ejemplo...\n');

    // Rutas de las imágenes
    const imagenPrincipal = path.join(__dirname, '../public/Prom1.png');
    const imagen1 = path.join(__dirname, '../public/images/producto/Product1.jpg');
    const imagen2 = path.join(__dirname, '../public/images/producto/Product2.jpg');

    // Subir imagen principal
    console.log('📸 Subiendo imagen principal...');
    const urlImagenPrincipal = await uploadToCloudinary(imagenPrincipal);

    // Subir imágenes adicionales
    console.log('\n📸 Subiendo imágenes adicionales...');
    const urlImagen1 = await uploadToCloudinary(imagen1);
    const urlImagen2 = await uploadToCloudinary(imagen2);

    // Preparar datos del producto
    const productoData = {
      categoria: 'Resinas Compuestas',
      nombre_producto: 'Resina Compuesta Brilliant EverGlow',
      descripcion: 'Composite híbrido submicrónico universal con pulido excepcional y brillo duradero. Consistencia suave para una manipulación ideal. Perfect para restauraciones anteriores y posteriores.',
      imagen_principal: urlImagenPrincipal,
      imagenes_adicionales: [urlImagen1, urlImagen2],
      caracteristicas: {
        tipo: 'Composite híbrido submicrónico universal',
        pulido: 'Excepcional y brillo duradero',
        consistencia: 'Suave para manipulación ideal',
        aplicaciones: ['Restauraciones anteriores', 'Restauraciones posteriores'],
      },
      especificaciones: {
        presentacion: 'Kit con 8 jeringas',
        composicion: 'Resina compuesta híbrida',
        fabricante: 'BRILLIANT',
        linea: 'EverGlow',
      },
      destacado: true,
    };

    // Insertar en Supabase
    console.log('\n💾 Insertando producto en Supabase...');
    const { data, error } = await supabase
      .from('productos')
      .insert([productoData])
      .select();

    if (error) {
      console.error('❌ Error al insertar producto:', error);
      throw error;
    }

    console.log('\n✅ ¡Producto creado exitosamente!');
    console.log('\n📦 Detalles del producto:');
    console.log(JSON.stringify(data[0], null, 2));

    console.log('\n🎉 ¡Proceso completado con éxito!');
    console.log(`\n🔗 Imagen principal: ${urlImagenPrincipal}`);
    console.log(`🔗 Imágenes adicionales:`);
    console.log(`   - ${urlImagen1}`);
    console.log(`   - ${urlImagen2}`);

  } catch (error) {
    console.error('\n❌ Error en el proceso:', error);
    process.exit(1);
  }
}

// Ejecutar
createSampleProduct();
