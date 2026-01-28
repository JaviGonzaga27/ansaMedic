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

const IMAGES_DIR = path.join(__dirname, '../public/images/servicio_tecnico');

async function uploadImage(imagePath, publicId) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'ansamedic/servicio_tecnico',
      public_id: publicId,
      resource_type: 'image',
      overwrite: true,
      transformation: [
        { width: 1200, height: 800, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' },
      ],
    });

    console.log(`✅ Subida exitosa: ${publicId}`);
    console.log(`   URL: ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`❌ Error subiendo ${publicId}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Subiendo imágenes de servicio técnico a Cloudinary...\n');

  const images = [
    { file: 'servicio_tecnico_1.jpeg', id: 'servicio_tecnico_1' },
    { file: 'servicio_tecnico_2.jpeg', id: 'servicio_tecnico_2' },
    { file: 'servicio_tecnico_3.jpeg', id: 'servicio_tecnico_3' },
    { file: 'servicio_tecnico_4.jpeg', id: 'servicio_tecnico_4' },
  ];

  const urls = {};

  for (const img of images) {
    const imagePath = path.join(IMAGES_DIR, img.file);
    if (fs.existsSync(imagePath)) {
      const url = await uploadImage(imagePath, img.id);
      if (url) {
        urls[img.id] = url;
      }
    } else {
      console.log(`⚠️  Archivo no encontrado: ${img.file}`);
    }
  }

  console.log('\n📋 URLs generadas:');
  console.log(JSON.stringify(urls, null, 2));
  
  // Guardar URLs en archivo
  const outputPath = path.join(__dirname, 'servicio-tecnico-urls.json');
  fs.writeFileSync(outputPath, JSON.stringify(urls, null, 2));
  console.log(`\n💾 URLs guardadas en: ${outputPath}`);
}

main();
