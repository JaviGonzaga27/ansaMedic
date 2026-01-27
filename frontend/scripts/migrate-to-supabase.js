require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

/**
 * Script para migrar productos desde JSON a Supabase
 * Utiliza las URLs de Cloudinary generadas por el script anterior
 */

// Crear cliente de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const PRODUCTS_JSON = path.join(
  __dirname,
  '../public/json/products/products.json'
);
const CATEGORIES_JSON = path.join(
  __dirname,
  '../public/json/products/productsCategories.json'
);
const CLOUDINARY_URLS = path.join(__dirname, 'cloudinary-urls.json');

// Mapeo de IDs de productos a URLs de Cloudinary
const imageMapping = {
  '1': {
    main: 'https://res.cloudinary.com/tu-cloud/image/upload/v1/ansamedic/productos/product1/imagen-principal.jpg',
    additional: [],
  },
  // Se llenará automáticamente desde cloudinary-urls.json
};

async function loadCloudinaryUrls() {
  if (!fs.existsSync(CLOUDINARY_URLS)) {
    console.warn(
      '⚠️  Archivo cloudinary-urls.json no encontrado. Usando URLs de ejemplo.'
    );
    return imageMapping;
  }

  try {
    const data = JSON.parse(fs.readFileSync(CLOUDINARY_URLS, 'utf8'));

    // Si el archivo tiene formato "organized"
    if (data.products) {
      data.products.forEach((product, index) => {
        const productId = (index + 1).toString();
        imageMapping[productId] = {
          main: product.mainImage,
          additional: product.additionalImages || [],
        };
      });
    }
    // Si tiene formato "simple"
    else if (data.uploaded) {
      data.uploaded.forEach((item, index) => {
        const productId = (index + 1).toString();
        imageMapping[productId] = {
          main: item.url,
          additional: [],
        };
      });
    }

    console.log(`✅ Cargadas ${Object.keys(imageMapping).length} URLs de Cloudinary\n`);
    return imageMapping;
  } catch (error) {
    console.error('❌ Error cargando cloudinary-urls.json:', error.message);
    return imageMapping;
  }
}

function extractCategory(product) {
  const name = product.name.toLowerCase();

  if (name.includes('cepillo')) return 'Cepillos';
  if (name.includes('ortodoncia')) return 'Ortodoncia';
  if (name.includes('irrigador')) return 'Higiene';
  if (name.includes('pasta') || name.includes('blanquea')) return 'Blanqueamiento';
  if (name.includes('hilo')) return 'Higiene';
  if (name.includes('enjuague')) return 'Higiene';

  return 'General';
}

function generateCharacteristics(product) {
  // Generar características basadas en el tipo de producto
  const category = extractCategory(product);

  const baseCharacteristics = {
    garantia: '12 meses',
    origen: 'Importado',
    certificacion: 'FDA Aprobado',
  };

  switch (category) {
    case 'Cepillos':
      return {
        ...baseCharacteristics,
        tipo_cerda: 'Suave',
        bateria: 'Recargable',
        modos: 5,
      };
    case 'Ortodoncia':
      return {
        ...baseCharacteristics,
        material: 'Termoplástico médico',
        transparencia: 'Alta',
      };
    case 'Higiene':
      return {
        ...baseCharacteristics,
        capacidad: '650ml',
        presion_agua: 'Ajustable',
      };
    case 'Blanqueamiento':
      return {
        ...baseCharacteristics,
        concentracion: '10% peróxido',
        aplicaciones: 14,
      };
    default:
      return baseCharacteristics;
  }
}

function generateSpecifications(product) {
  const category = extractCategory(product);

  const baseSpecs = {
    peso: '150g',
    dimensiones: '20cm x 5cm x 5cm',
    contenido_paquete: ['Producto principal', 'Manual de usuario', 'Garantía'],
  };

  switch (category) {
    case 'Cepillos':
      return {
        ...baseSpecs,
        voltaje: '110-220V',
        tiempo_carga: '4 horas',
        duracion_bateria: '30 días',
      };
    case 'Ortodoncia':
      return {
        ...baseSpecs,
        numero_alineadores: 20,
        duracion_tratamiento: '6-12 meses',
      };
    default:
      return baseSpecs;
  }
}

async function migrateProducts() {
  console.log('🚀 Iniciando migración de productos a Supabase...\n');

  // Cargar URLs de Cloudinary
  await loadCloudinaryUrls();

  // Leer productos del JSON
  if (!fs.existsSync(PRODUCTS_JSON)) {
    console.error(`❌ Archivo ${PRODUCTS_JSON} no encontrado`);
    process.exit(1);
  }

  const productsData = JSON.parse(fs.readFileSync(PRODUCTS_JSON, 'utf8'));
  const products = productsData.products || [];

  console.log(`📦 Se encontraron ${products.length} productos para migrar\n`);

  const results = {
    inserted: [],
    failed: [],
    total: products.length,
  };

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`[${i + 1}/${products.length}] Migrando: ${product.name}`);

    // Obtener URLs de Cloudinary o usar la URL del JSON como fallback
    const imageUrls = imageMapping[product.id] || {
      main: product.imageUrl,
      additional: [],
    };

    const productData = {
      categoria: extractCategory(product),
      nombre_producto: product.name,
      descripcion: product.description,
      imagen_principal: imageUrls.main,
      imagenes_adicionales: imageUrls.additional,
      caracteristicas: generateCharacteristics(product),
      especificaciones: generateSpecifications(product),
      destacado: product.featured || false,
    };

    try {
      const { data, error } = await supabase
        .from('productos')
        .insert(productData)
        .select()
        .single();

      if (error) throw error;

      console.log(`  ✅ Insertado con ID: ${data.id}`);
      results.inserted.push({
        originalId: product.id,
        newId: data.id,
        name: product.name,
      });
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}`);
      results.failed.push({
        product: product.name,
        error: error.message,
      });
    }

    // Pequeña pausa
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  // Guardar resultados
  const outputFile = path.join(__dirname, 'migration-results.json');
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));

  console.log('\n' + '='.repeat(50));
  console.log('📊 RESUMEN DE MIGRACIÓN');
  console.log('='.repeat(50));
  console.log(`✅ Productos insertados: ${results.inserted.length}`);
  console.log(`❌ Productos con errores: ${results.failed.length}`);
  console.log(`📄 Resultados guardados en: ${outputFile}`);
  console.log('='.repeat(50) + '\n');

  if (results.failed.length > 0) {
    console.log('⚠️  Productos con errores:');
    results.failed.forEach((fail) => {
      console.log(`   - ${fail.product}: ${fail.error}`);
    });
  }

  console.log('\n✨ Migración completada!');
}

// Función para verificar la conexión con Supabase
async function testConnection() {
  console.log('🔍 Verificando conexión con Supabase...');

  try {
    const { data, error } = await supabase.from('productos').select('count');

    if (error) throw error;

    console.log('✅ Conexión exitosa con Supabase\n');
    return true;
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.error(
      '\nAsegúrate de que:\n' +
        '1. Las variables de entorno estén configuradas correctamente\n' +
        '2. La tabla "productos" exista en Supabase\n' +
        '3. Las políticas RLS permitan las operaciones necesarias\n'
    );
    return false;
  }
}

// Ejecutar migración
async function run() {
  const connected = await testConnection();
  if (!connected) {
    process.exit(1);
  }

  await migrateProducts();
}

run().catch(console.error);
