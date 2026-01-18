/**
 * Script para importar productos masivamente a Supabase
 * 
 * Uso:
 * 1. Instalar dependencias: npm install csv-parser
 * 2. Configurar SUPABASE_URL y SUPABASE_KEY en .env.local
 * 3. Ejecutar: node scripts/importar-productos.js ruta/al/archivo.csv
 */

const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// Configuración de Supabase (cuando esté listo)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'TU_URL_AQUI';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'TU_KEY_AQUI';

async function importarProductos(archivoCSV) {
  const productos = [];
  
  console.log('📖 Leyendo archivo CSV...');
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(archivoCSV)
      .pipe(csv())
      .on('data', (row) => {
        // Transformar cada fila del CSV
        const producto = {
          id: row.id,
          nombre: row.nombre,
          descripcion: row.descripcion,
          precio: parseFloat(row.precio),
          stock: parseInt(row.stock),
          categoria: row.categoria,
          marca: row.marca || null,
          sku: row.sku || null,
          image_url: row.imageUrl,
          tags: row.tags ? row.tags.split(',').map(t => t.trim()) : [],
          destacado: row.destacado === 'true',
          activo: row.activo === 'true'
        };
        
        productos.push(producto);
      })
      .on('end', async () => {
        console.log(`✅ ${productos.length} productos leídos del CSV`);
        
        try {
          // Cuando Supabase esté configurado, descomentar:
          /*
          const { createClient } = require('@supabase/supabase-js');
          const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
          
          console.log('📤 Insertando productos en Supabase...');
          
          // Insertar en lotes de 100
          const BATCH_SIZE = 100;
          for (let i = 0; i < productos.length; i += BATCH_SIZE) {
            const batch = productos.slice(i, i + BATCH_SIZE);
            const { data, error } = await supabase
              .from('productos')
              .insert(batch);
            
            if (error) {
              console.error(`❌ Error en lote ${i / BATCH_SIZE + 1}:`, error);
            } else {
              console.log(`✅ Lote ${i / BATCH_SIZE + 1} insertado (${batch.length} productos)`);
            }
          }
          */
          
          // Por ahora, solo mostrar los datos
          console.log('\n📦 Vista previa de productos:');
          console.log(JSON.stringify(productos.slice(0, 3), null, 2));
          console.log(`\n... y ${productos.length - 3} más`);
          
          resolve(productos);
        } catch (error) {
          console.error('❌ Error al importar:', error);
          reject(error);
        }
      })
      .on('error', reject);
  });
}

// Ejecutar
const archivoCSV = process.argv[2] || path.join(__dirname, '../public/templates/productos_template.csv');

if (!fs.existsSync(archivoCSV)) {
  console.error('❌ Archivo no encontrado:', archivoCSV);
  console.log('Uso: node scripts/importar-productos.js ruta/al/archivo.csv');
  process.exit(1);
}

importarProductos(archivoCSV)
  .then(() => console.log('\n🎉 Importación completada'))
  .catch((error) => console.error('\n❌ Error:', error));
