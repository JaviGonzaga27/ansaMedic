/**
 * Servicio de productos que combina datos de JSON local y Supabase
 */

import { createClient } from '@supabase/supabase-js';
import ProductsCategoriesData from '../../public/json/products/productsCategories.json';

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Interfaces
export interface Product {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  category?: string;
  featured?: boolean;
  details?: {
    images: string[];
    features: string[];
    specifications: { name: string; value: string }[];
  }[];
  source?: 'json' | 'supabase'; // Para identificar origen
}

export interface Category {
  id: string;
  name: string;
  products: Product[];
}

// Producto de Supabase
interface SupabaseProduct {
  id: string;
  categoria: string;
  nombre_producto: string;
  descripcion: string;
  imagen_principal: string;
  imagenes_adicionales: string[];
  caracteristicas: any;
  especificaciones: any;
  destacado: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Convierte un producto de Supabase al formato de la aplicación
 */
function mapSupabaseProduct(supabaseProduct: SupabaseProduct): Product {
  // Construir features desde las características
  const features: string[] = [];
  if (supabaseProduct.caracteristicas) {
    Object.entries(supabaseProduct.caracteristicas).forEach(([key, value]) => {
      if (typeof value === 'string') {
        features.push(value);
      } else if (Array.isArray(value)) {
        features.push(...value);
      } else if (typeof value === 'object') {
        features.push(`${key}: ${JSON.stringify(value)}`);
      }
    });
  }

  // Construir especificaciones
  const specifications: { name: string; value: string }[] = [];
  if (supabaseProduct.especificaciones) {
    Object.entries(supabaseProduct.especificaciones).forEach(([name, value]) => {
      specifications.push({ name, value: String(value) });
    });
  }

  return {
    id: supabaseProduct.id,
    imageUrl: supabaseProduct.imagen_principal,
    name: supabaseProduct.nombre_producto,
    description: supabaseProduct.descripcion,
    category: supabaseProduct.categoria,
    featured: supabaseProduct.destacado,
    details: [
      {
        images: [supabaseProduct.imagen_principal, ...supabaseProduct.imagenes_adicionales],
        features,
        specifications,
      },
    ],
    source: 'supabase',
  };
}

/**
 * Obtiene productos de Supabase
 */
async function getProductsFromSupabase(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products from Supabase:', error);
      return [];
    }

    return (data || []).map(mapSupabaseProduct);
  } catch (error) {
    console.error('Error in getProductsFromSupabase:', error);
    return [];
  }
}

/**
 * Obtiene productos del JSON local
 */
function getProductsFromJSON(): Product[] {
  const products = ProductsCategoriesData.categories.flatMap(category => 
    category.products.map(product => ({
      ...product,
      category: category.name,
      source: 'json' as const,
    }))
  );
  return products;
}

/**
 * Obtiene todos los productos (JSON + Supabase)
 * Para usar solo Supabase, descomenta la línea y comenta el resto
 */
export async function getAllProducts(): Promise<Product[]> {
  // 🔥 SOLO SUPABASE: Descomenta esta línea cuando migres todo
  // return await getProductsFromSupabase();

  // 📦 JSON + SUPABASE: Sistema actual (comentar cuando migres)
  const [supabaseProducts, jsonProducts] = await Promise.all([
    getProductsFromSupabase(),
    Promise.resolve(getProductsFromJSON()),
  ]);

  // Combinar productos, Supabase primero para que aparezcan al inicio
  return [...supabaseProducts, ...jsonProducts];
}

/**
 * Obtiene productos y categorías en una sola pasada.
 * Evita el doble fetch a Supabase: getAllProducts() consulta una vez y
 * getAllCategories() reutiliza ese mismo resultado.
 */
export async function getCatalogData(): Promise<{
  products: Product[];
  categories: Category[];
}> {
  const products = await getAllProducts();
  const categories = await getAllCategories(products);
  return { products, categories };
}

/**
 * Obtiene todas las categorías únicas.
 * @param preloaded - productos ya cargados, para no volver a consultar Supabase.
 */
export async function getAllCategories(preloaded?: Product[]): Promise<Category[]> {
  const allProducts = preloaded ?? (await getAllProducts());

  // Crear un mapa de categorías
  const categoryMap = new Map<string, Category>();
  
  // 📦 JSON + SUPABASE: Agregar categorías del JSON (comentar cuando migres)
  const jsonCategories = ProductsCategoriesData.categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    products: [] as Product[],
  }));
  jsonCategories.forEach(cat => {
    categoryMap.set(cat.id, cat);
  });

  // Agregar categorías de Supabase si no existen
  allProducts.forEach(product => {
    if (product.category) {
      const categoryId = product.source === 'supabase' 
        ? product.category.toLowerCase().replace(/\s+/g, '-')
        : product.category; // Para productos JSON mantener el ID original
      
      if (!categoryMap.has(categoryId) && product.source === 'supabase') {
        categoryMap.set(categoryId, {
          id: categoryId,
          name: product.category,
          products: [],
        });
      }
    }
  });

  // Asignar productos a sus categorías
  allProducts.forEach(product => {
    if (product.source === 'json') {
      // Buscar la categoría original del JSON
      const jsonCategory = ProductsCategoriesData.categories.find(cat =>
        cat.products.some(p => p.id === product.id)
      );
      if (jsonCategory) {
        const category = categoryMap.get(jsonCategory.id);
        if (category) {
          category.products.push(product);
        }
      }
    } else if (product.category) {
      // Producto de Supabase
      const categoryId = product.category.toLowerCase().replace(/\s+/g, '-');
      const category = categoryMap.get(categoryId);
      if (category) {
        category.products.push(product);
      }
    }
  });

  return Array.from(categoryMap.values());
}

/**
 * Obtiene productos por categoría
 */
export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const categories = await getAllCategories();
  const category = categories.find(cat => cat.id === categoryId);
  return category?.products || [];
}

/**
 * Obtiene un producto por ID
 */
export async function getProductById(productId: string): Promise<Product | undefined> {
  const allProducts = await getAllProducts();
  return allProducts.find(product => product.id === productId);
}

/**
 * Obtiene productos destacados
 */
export async function getFeaturedProducts(limit?: number): Promise<Product[]> {
  const allProducts = await getAllProducts();
  const featured = allProducts.filter(product => product.featured);

  if (limit) {
    return featured.slice(0, limit);
  }

  return featured;
}
