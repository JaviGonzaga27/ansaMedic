import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import ProductList from '../components/product/ProductList'
import { FaSearch, FaWhatsapp, FaTruck, FaCreditCard, FaMoneyBillWave, FaUniversity } from 'react-icons/fa'

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
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center tracking-tight">
              Proceso de Compra
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {/* Proceso de Compra - Izquierda */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
                <h2 className="text-xl font-bold text-gray-900 mb-5">Cómo Comprar</h2>
                <div className="space-y-4">
                  {/* Paso 1 */}
                  <div className="flex items-start gap-4 group">
                    <div className="relative flex-shrink-0">
                      <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-full shadow-md group-hover:scale-105 transition-transform duration-300">
                        <FaSearch className="text-xl" />
                      </div>
                      <span className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 bg-teal-700 text-white rounded-full font-bold text-xs shadow-sm">
                        1
                      </span>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-base font-bold text-gray-900 mb-1">Selecciona tu insumo</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">Explora nuestro catálogo</p>
                    </div>
                  </div>
                  
                  {/* Paso 2 */}
                  <div className="flex items-start gap-4 group">
                    <div className="relative flex-shrink-0">
                      <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full shadow-md group-hover:scale-105 transition-transform duration-300">
                        <FaWhatsapp className="text-xl" />
                      </div>
                      <span className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 bg-green-700 text-white rounded-full font-bold text-xs shadow-sm">
                        2
                      </span>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-base font-bold text-gray-900 mb-1">Verifica por WhatsApp</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">Confirma precio y disponibilidad</p>
                    </div>
                  </div>
                  
                  {/* Paso 3 */}
                  <div className="flex items-start gap-4 group">
                    <div className="relative flex-shrink-0">
                      <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-full shadow-md group-hover:scale-105 transition-transform duration-300">
                        <FaTruck className="text-xl" />
                      </div>
                      <span className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 bg-teal-700 text-white rounded-full font-bold text-xs shadow-sm">
                        3
                      </span>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-base font-bold text-gray-900 mb-1">Recibe o retira</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">Envío a domicilio o retiro en tienda</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Métodos de Pago - Derecha */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
                <h2 className="text-xl font-bold text-gray-900 mb-5">Métodos de Pago</h2>
                <div className="space-y-4">
                  {/* Tarjetas de Crédito */}
                  <div className="flex items-start gap-4 group">
                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <FaCreditCard className="text-xl" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-base font-bold text-gray-900 mb-1">Tarjetas de Crédito</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">Todas las tarjetas aceptadas</p>
                    </div>
                  </div>
                  
                  {/* Efectivo */}
                  <div className="flex items-start gap-4 group">
                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <FaMoneyBillWave className="text-xl" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-base font-bold text-gray-900 mb-1">Efectivo</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">Pago en tienda física</p>
                    </div>
                  </div>
                  
                  {/* Transferencia */}
                  <div className="flex items-start gap-4 group">
                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <FaUniversity className="text-xl" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-base font-bold text-gray-900 mb-1">Transferencia Bancaria</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">Directo a nuestra cuenta</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          <ProductList />      
        </div>
      </div>
    </Layout>
  )
}

export default Products