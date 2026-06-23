import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { useRouter } from 'next/router';
import ProductCard from './ProductCard';
import {
  getCatalogData,
  Product,
  Category
} from '../../services/products.service';

interface ProductListProps {
  /** Datos pre-generados en getStaticProps (ISR). Si vienen, no se consulta en el cliente. */
  initialProducts?: Product[];
  initialCategories?: Category[];
}

function ProductList({ initialProducts, initialCategories }: ProductListProps = {}) {
  const hasInitial = !!initialProducts && initialProducts.length > 0;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCategories, setShowCategories] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>(initialProducts ?? []);
  const [categories, setCategories] = useState<Category[]>(initialCategories ?? []);
  const [loading, setLoading] = useState(!hasInitial);
  const [sortBy, setSortBy] = useState<'recomendado' | 'az' | 'za'>('recomendado');
  const router = useRouter();

  const productPerPage = 12;

  // Solo consulta en el cliente si la página NO trajo datos pre-generados.
  useEffect(() => {
    if (hasInitial) return;
    let active = true;
    async function loadData() {
      setLoading(true);
      try {
        const { products: allProducts, categories: allCategories } =
          await getCatalogData();
        if (!active) return;
        setProducts(allProducts);
        setCategories(allCategories);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadData();
    return () => {
      active = false;
    };
  }, [hasInitial]);

  // Pre-selecciona categoría desde la URL (?cat=) al llegar desde la home.
  useEffect(() => {
    if (!router.isReady) return;
    const cat = router.query.cat;
    const catId = Array.isArray(cat) ? cat[0] : cat;
    if (!catId || categories.length === 0) return;
    const exists = categories.some((c) => c.id === catId);
    if (!exists) return;
    setSelectedCategory(catId);
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [router.isReady, router.query.cat, categories]);

  const filteredProducts = useMemo(() => {
    let productsToFilter = selectedCategory === 'all' 
      ? products 
      : categories.find(cat => cat.id === selectedCategory)?.products || [];
    
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      productsToFilter = productsToFilter.filter(product => 
        product.name.toLowerCase().includes(search) || 
        product.description.toLowerCase().includes(search)
      );
    }
    
    return productsToFilter;
  }, [selectedCategory, searchTerm, products, categories]);

  const sortedProducts = useMemo(() => {
    if (sortBy === 'recomendado') return filteredProducts;
    const arr = [...filteredProducts];
    arr.sort((a, b) =>
      sortBy === 'az' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    return arr;
  }, [filteredProducts, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, sortBy]);

  const paginatedData = useMemo(() => {
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(sortedProducts.length / productPerPage);

    return { currentProducts, totalPages };
  }, [sortedProducts, currentPage, productPerPage]);

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  return (
    <div className="w-full scroll-mt-32" id="catalogo">
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando productos...</p>
          </div>
        </div>
      ) : (
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Sidebar de categorías y búsqueda (lado izquierdo) */}
        <aside 
          className="w-full lg:w-64 xl:w-72 flex-shrink-0" 
          aria-label="Filtros"
          role="complementary"
        >
          <div className="bg-white rounded-3xl shadow-soft border border-cream-200 overflow-hidden lg:sticky lg:top-40">
            {/* Barra de búsqueda */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Header mobile con toggle */}
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="w-full flex items-center justify-between p-4 lg:hidden bg-teal-600 text-white font-semibold"
              aria-expanded={showCategories}
            >
              <span>Filtrar por Categoría</span>
              <svg className={`w-5 h-5 transition-transform ${showCategories ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Categorías header desktop */}
            <div className="hidden lg:block p-4 pb-3">
              <h2 className="text-lg font-bold text-teal-700" id="category-filter-heading">
                Categorías
              </h2>
            </div>

            {/* Lista de categorías */}
            <nav 
              className={`${
                showCategories ? 'block' : 'hidden'
              } lg:block p-4 lg:px-4 lg:pb-6`}
              aria-labelledby="category-filter-heading"
            >
              <ul className="space-y-1.5" role="list">
                <li>
                  <button
                    className={`w-full text-left text-sm px-4 py-2.5 rounded-lg transition-all duration-200 ${
                      selectedCategory === 'all' 
                        ? 'bg-teal-600 text-white font-semibold shadow-sm' 
                        : 'text-gray-700 hover:bg-teal-50 hover:text-teal-700'
                    } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    onClick={() => {
                      handleCategoryChange('all');
                      setShowCategories(false);
                    }}
                    aria-pressed={selectedCategory === 'all'}
                  >
                    Todas las categorías
                  </button>
                </li>
                {categories.map(category => (
                  <li key={category.id}>
                    <button
                      className={`w-full text-left text-sm px-4 py-2.5 rounded-lg transition-all duration-200 ${
                        selectedCategory === category.id 
                          ? 'bg-teal-600 text-white font-semibold shadow-sm' 
                          : 'text-gray-700 hover:bg-teal-50 hover:text-teal-700'
                      } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                      onClick={() => {
                        handleCategoryChange(category.id);
                        setShowCategories(false);
                      }}
                      aria-pressed={selectedCategory === category.id}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Lista de productos y paginación (lado derecho) */}
        <section 
          className="flex-1 min-w-0"
          aria-label="Lista de productos"
          role="region"
        >

      {/* Barra de herramientas del catálogo */}
      <div className="mb-4 md:mb-6 bg-white rounded-2xl shadow-soft border border-cream-200 p-3 md:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm md:text-base text-gray-700" aria-live="polite" aria-atomic="true">
          Mostrando <span className="font-bold text-teal-600">{paginatedData.currentProducts.length}</span> de{' '}
          <span className="font-bold text-teal-600">{filteredProducts.length}</span> productos
        </p>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label htmlFor="sort" className="text-sm text-gray-500">Ordenar:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'recomendado' | 'az' | 'za')}
            className="text-sm bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="recomendado">Recomendado</option>
            <option value="az">Nombre (A-Z)</option>
            <option value="za">Nombre (Z-A)</option>
          </select>
        </div>
      </div>
      
      {/* Lista de productos */}
      {paginatedData.currentProducts.length === 0 ? (
        <div className="text-center py-12 md:py-16 bg-white rounded-3xl shadow-soft border border-cream-200" role="status">
          <svg className="mx-auto h-12 w-12 md:h-16 md:w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
          <p className="text-gray-600">Intenta seleccionar otra categoría</p>
        </div>
      ) : (
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8"
          role="list"
        >
          {paginatedData.currentProducts.map(product => (
            <div key={product.id} role="listitem">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
      
      {/* Controles de paginación */}
      {paginatedData.totalPages > 1 && (
        <nav 
          className="flex flex-wrap justify-center items-center gap-2 pb-8" 
          aria-label="Paginación"
          role="navigation"
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Página anterior"
            className={`px-4 md:px-5 py-2 md:py-2.5 text-sm md:text-base rounded-lg font-medium transition-all duration-200 ${
              currentPage === 1 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-teal-600 text-white hover:bg-teal-700 shadow-md'
            }`}
          >
            Anterior
          </button>
          
          {/* Números de página */}
          <div className="flex gap-1.5 md:gap-2" role="list">
            {[...Array(paginatedData.totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  aria-label={`Página ${pageNumber}`}
                  aria-current={currentPage === pageNumber ? 'page' : undefined}
                  className={`w-10 h-10 md:min-w-[44px] md:min-h-[44px] flex items-center justify-center rounded-lg font-medium text-sm md:text-base transition-all duration-200 ${
                    currentPage === pageNumber
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === paginatedData.totalPages}
            aria-label="Página siguiente"
            className={`px-4 md:px-5 py-2 md:py-2.5 text-sm md:text-base rounded-lg font-medium transition-all duration-200 ${
              currentPage === paginatedData.totalPages 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-teal-600 text-white hover:bg-teal-700 shadow-md'
            }`}
          >
            Siguiente
          </button>
        </nav>
      )}
        </section>
      </div>
      )}
    </div>
  );
}

const MemoizedProductList = memo(ProductList);
MemoizedProductList.displayName = 'ProductList';
export default MemoizedProductList;
