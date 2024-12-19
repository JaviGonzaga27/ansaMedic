// pages/admin/products.tsx

import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import ProductForm from '../../components/admin/ProductForm';
import { useProducts } from '../../hooks/useProducts';
import { CreateProductInput, UpdateProductInput } from '../../types/product';

const AdminProducts: NextPage = () => {
  const { products, loading, error, addProduct, updateProduct, removeProduct } = useProducts();

  const handleAddProduct = (productData: CreateProductInput | UpdateProductInput) => {
    addProduct(productData as CreateProductInput);
  };

  const handleUpdateProduct = (id: string, productData: CreateProductInput | UpdateProductInput) => {
    updateProduct(id, productData as UpdateProductInput);
  };

  return (
    <Layout>
      <Head>
        <title>Manage Products - Dental Supplies Store</title>
      </Head>

      <main>
        <h1>Manage Products</h1>
        <ProductForm onSubmit={handleAddProduct} />
        
        {loading && <p>Loading products...</p>}
        {error && <p>Error: {error}</p>}
        
        {products && products.map(product => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <button onClick={() => removeProduct(product.id)}>Delete</button>
            <ProductForm 
              product={product} 
              onSubmit={(updatedProduct) => handleUpdateProduct(product.id, updatedProduct)}
            />
          </div>
        ))}
      </main>
    </Layout>
  );
};

export default AdminProducts;