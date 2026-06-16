/**
 * Servicio de productos que combina datos de JSON local y Supabase
 */

import { createClient } from '@supabase/supabase-js';
import ProductsCategoriesData from '../../public/json/products/productsCategories.json';

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

/** Si el valor viene como texto JSON (string), lo parsea; si no, lo devuelve tal cual. */
function parseMaybeJson(val: any): any {
  if (val == null) return null;
  if (typeof val === 'string') {
    const t = val.trim();
    if (!t) return null;
    try { return JSON.parse(t); } catch { return t; }
  }
  return val;
}

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
  availability?: 'disponible' | 'agotado' | 'bajo_pedido';
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
  disponibilidad: string;
  orden: number;
  created_at: string;
  updated_at: string;
}

/**
 * Convierte un producto de Supabase al formato de la aplicación
 */
function mapSupabaseProduct(supabaseProduct: SupabaseProduct): Product {
  // Construir features desde las características (puede venir como texto JSON)
  const features: string[] = [];
  const carac = parseMaybeJson(supabaseProduct.caracteristicas);
  if (Array.isArray(carac)) {
    features.push(...carac.map(String));
  } else if (typeof carac === 'string') {
    if (carac.trim()) features.push(carac.trim());
  } else if (carac && typeof carac === 'object') {
    const lista = (carac as any).lista;
    if (Array.isArray(lista)) {
      features.push(...lista.map(String));
    } else {
      Object.values(carac).forEach((value) => {
        if (Array.isArray(value)) features.push(...value.map(String));
        else features.push(String(value));
      });
    }
  }

  // Construir especificaciones (puede venir como texto JSON)
  const specifications: { name: string; value: string }[] = [];
  const espec = parseMaybeJson(supabaseProduct.especificaciones);
  if (espec && typeof espec === 'object' && !Array.isArray(espec)) {
    Object.entries(espec).forEach(([name, value]) => {
      specifications.push({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value: Array.isArray(value) ? value.map(String).join(', ') : String(value),
      });
    });
  }

  return {
    id: supabaseProduct.id,
    imageUrl: supabaseProduct.imagen_principal,
    name: supabaseProduct.nombre_producto,
    description: supabaseProduct.descripcion,
    category: supabaseProduct.categoria,
    featured: supabaseProduct.destacado,
    availability: (supabaseProduct.disponibilidad as any) || 'disponible',
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
      .order('orden', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products from Supabase:', error);
      return [];
    }

    // Los productos AGOTADOS no se muestran en el sitio público.
    return (data || []).map(mapSupabaseProduct).filter((p) => p.availability !== 'agotado');
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
  // Solo productos reales de Supabase (se quitaron los de prueba del JSON).
  return await getProductsFromSupabase();
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
  const categoryMap = new Map<string, Category>();

  allProducts.forEach((product) => {
    if (!product.category) return;
    const categoryId = product.category.toLowerCase().replace(/\s+/g, '-');
    if (!categoryMap.has(categoryId)) {
      categoryMap.set(categoryId, { id: categoryId, name: product.category, products: [] });
    }
    categoryMap.get(categoryId)!.products.push(product);
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
