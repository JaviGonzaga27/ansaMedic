import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductsCategoriesData from '../../../public/json/products/productsCategories.json';

// Interfaces actualizadas
interface Product {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  details?: {
    images: string[];
    features: string[];
    specifications: { name: string; value: string }[];
  }[];
}

interface Category {
  id: string;
  name: string;
  products: Product[];
}



// Funciones de utilidad actualizadas
function getAllCategories(): Category[] {
  return ProductsCategoriesData.categories;
}

function getProductsByCategory(categoryId: string): Product[] | undefined {
  const category = ProductsCategoriesData.categories.find(category => category.id === categoryId);
  return category?.products;
}

function getAllProducts(): Product[] {
  return ProductsCategoriesData.categories.flatMap(category => category.products);
}

function getProductById(productId: string): Product | undefined {
  return getAllProducts().find(product => product.id === productId);
}

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const productPerPage = 6;

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(getAllProducts());
    } else {
      const categoryProducts = getProductsByCategory(selectedCategory);
      setFilteredProducts(categoryProducts || []);
    }
    setCurrentPage(1);
  }, [selectedCategory]);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  }

  return (
    <div className="container mx-auto px-10">
      <div className="flex flex-col md:flex-row">
        {/* Filtro de categorías (lado izquierdo) */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-6">
          <h2 className="text-lg font-semibold mb-4 text-teal-700">Categorías</h2>
          <div className="space-y-2">
            <div 
              className={`text-sm cursor-pointer p-2 rounded transition-colors duration-200 ${
                selectedCategory === 'all' 
                  ? 'text-teal-700 font-medium' 
                  : 'text-gray-700 hover:text-teal-700'
              }`}
              onClick={() => handleCategoryChange('all')}
            >
              Todas las categorías
            </div>
            {getAllCategories().map(category => (
              <div 
                key={category.id} 
                className={`text-sm cursor-pointer p-2 rounded transition-colors duration-200 ${
                  selectedCategory === category.id 
                    ? 'text-teal-700 font-medium' 
                    : 'text-gray-700 hover:text-teal-700'
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>

        {/* Lista de productos y paginación (lado derecho) */}
        <div className="w-full md:w-3/4">
          {/* Lista de productos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
          
          {/* Controles de paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 pb-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${
                  currentPage === 1 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                Anterior
              </button>
              
              {/* Números de página */}
              <div className="flex space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 rounded ${
                      currentPage === index + 1
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${
                  currentPage === totalPages 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}