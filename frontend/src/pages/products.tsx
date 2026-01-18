import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import ProductList from '../components/product/ProductList'

const Products: NextPage = () => {
  return (
    <Layout 
      title="Productos Odontológicos - Catálogo Completo"
      description="Catálogo completo de insumos odontológicos, equipos dentales, instrumental, materiales y consumibles. Productos de calidad garantizada para profesionales."
      keywords="catálogo productos dentales, insumos odontológicos precios, equipos dentales Ecuador, instrumental odontológico catálogo, materiales dentales venta"
      canonical="/products"
    >
      <Head>
        <title>Catálogo de Productos - Ansa Medic Dent</title>
        <meta name="description" content="Explora nuestro amplio catálogo de insumos odontológicos y médicos de alta calidad. Encuentra productos de las mejores marcas para tu práctica dental." />
        <meta name="keywords" content="insumos dentales, productos odontológicos, equipamiento dental, material dental Ecuador" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
        {/* Breadcrumbs */}
        <nav className="container mx-auto px-4 py-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-teal-600 transition-colors">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li aria-current="page" className="text-gray-900 font-semibold">Productos</li>
          </ol>
        </nav>

        <div className="container mx-auto px-4 pb-8">
          <header className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Catálogo de Productos
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Descubre nuestra amplia selección de insumos odontológicos y médicos de las mejores marcas internacionales
            </p>
          </header>
          
          <ProductList />      
        </div>
      </div>
    </Layout>
  )
}

export default Products