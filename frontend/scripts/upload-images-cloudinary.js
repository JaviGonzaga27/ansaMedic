require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Script para subir todas las imágenes de productos a Cloudinary
 * Organiza las imágenes en carpetas por producto
 */

const IMAGES_DIR = path.join(__dirname, '../public/images/producto');
const OUTPUT_FILE = path.join(__dirname, 'cloudinary-urls.json');

async function uploadImageToCloudinary(imagePath, folder, publicId) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: `ansamedic/productos/${folder}`,
      public_id: publicId,
      resource_type: 'image',
      overwrite: false, // No sobrescribir si ya existe
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' }, // Limitar tamaño máximo
        { quality: 'auto' }, // Optimización automática
        { fetch_format: 'auto' }, // Formato automático (WebP cuando sea posible)
      ],
    });

    console.log(`✅ Subida exitosa: ${result.secure_url}`);
    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error(`❌ Error subiendo ${imagePath}:`, error.message);
    return {
      success: false,
      error: error.message,
      path: imagePath,
    };
  }
}

async function uploadAllImages() {
  console.log('🚀 Iniciando carga de imágenes a Cloudinary...\n');

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`❌ El directorio ${IMAGES_DIR} no existe`);
    process.exit(1);
  }

  // Leer todos los archivos en el directorio
  const files = fs.readdirSync(IMAGES_DIR);
  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log('⚠️  No se encontraron imágenes para subir');
    return;
  }

  console.log(`📁 Se encontraron ${imageFiles.length} imágenes\n`);

  const results = {
    uploaded: [],
    failed: [],
    timestamp: new Date().toISOString(),
  };

  // Subir imágenes una por una
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const filePath = path.join(IMAGES_DIR, file);
    const fileName = path.parse(file).name;

    console.log(`[${i + 1}/${imageFiles.length}] Subiendo: ${file}`);

    // Determinar la carpeta según el nombre del archivo
    // Por ejemplo: Product1.jpg -> producto-1
    const folder = fileName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const publicId = 'imagen-principal';

    const result = await uploadImageToCloudinary(filePath, folder, publicId);

    if (result.success) {
      results.uploaded.push({
        originalFile: file,
        folder: folder,
        ...result,
      });
    } else {
      results.failed.push(result);
    }

    // Pequeña pausa para evitar rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  // Guardar resultados en un archivo JSON
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));

  console.log('\n' + '='.repeat(50));
  console.log('📊 RESUMEN DE CARGA');
  console.log('='.repeat(50));
  console.log(`✅ Exitosas: ${results.uploaded.length}`);
  console.log(`❌ Fallidas: ${results.failed.length}`);
  console.log(`📄 Resultados guardados en: ${OUTPUT_FILE}`);
  console.log('='.repeat(50) + '\n');

  if (results.failed.length > 0) {
    console.log('⚠️  Archivos con errores:');
    results.failed.forEach((fail) => {
      console.log(`   - ${fail.path}: ${fail.error}`);
    });
  }
}

// Función para subir imágenes adicionales de un producto
async function uploadAdditionalImages(productFolder, imageFiles) {
  console.log(`\n📸 Subiendo imágenes adicionales para ${productFolder}...`);

  const results = [];
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const publicId = `adicional-${i + 1}`;

    console.log(`  [${i + 1}/${imageFiles.length}] ${file}`);

    const result = await uploadImageToCloudinary(
      file,
      productFolder,
      publicId
    );

    if (result.success) {
      results.push(result.url);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return results;
}

// Función para organizar imágenes por producto (si están en subcarpetas)
async function uploadOrganizedImages() {
  console.log('🚀 Iniciando carga organizada de imágenes...\n');

  const productFolders = fs
    .readdirSync(IMAGES_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  if (productFolders.length === 0) {
    console.log('ℹ️  No se encontraron subcarpetas. Usando modo simple...');
    return uploadAllImages();
  }

  const results = {
    products: [],
    failed: [],
    timestamp: new Date().toISOString(),
  };

  for (const folder of productFolders) {
    const folderPath = path.join(IMAGES_DIR, folder);
    const files = fs.readdirSync(folderPath);
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
    });

    if (imageFiles.length === 0) continue;

    console.log(`\n📁 Procesando: ${folder} (${imageFiles.length} imágenes)`);

    // La primera imagen es la principal
    const mainImagePath = path.join(folderPath, imageFiles[0]);
    const mainResult = await uploadImageToCloudinary(
      mainImagePath,
      folder,
      'imagen-principal'
    );

    const additionalUrls = [];
    if (imageFiles.length > 1) {
      for (let i = 1; i < imageFiles.length; i++) {
        const additionalPath = path.join(folderPath, imageFiles[i]);
        const additionalResult = await uploadImageToCloudinary(
          additionalPath,
          folder,
          `adicional-${i}`
        );
        if (additionalResult.success) {
          additionalUrls.push(additionalResult.url);
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    if (mainResult.success) {
      results.products.push({
        productFolder: folder,
        mainImage: mainResult.url,
        additionalImages: additionalUrls,
        totalImages: imageFiles.length,
      });
    } else {
      results.failed.push({
        folder,
        error: mainResult.error,
      });
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));

  console.log('\n' + '='.repeat(50));
  console.log('📊 RESUMEN DE CARGA ORGANIZADA');
  console.log('='.repeat(50));
  console.log(`✅ Productos procesados: ${results.products.length}`);
  console.log(`❌ Productos con errores: ${results.failed.length}`);
  console.log(`📄 Resultados guardados en: ${OUTPUT_FILE}`);
  console.log('='.repeat(50) + '\n');
}

// Ejecutar
const args = process.argv.slice(2);
const mode = args[0] || 'organized';

if (mode === 'simple') {
  uploadAllImages().catch(console.error);
} else {
  uploadOrganizedImages().catch(console.error);
}
