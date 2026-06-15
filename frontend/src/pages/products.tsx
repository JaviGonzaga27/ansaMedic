import type { NextPage, GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import ProductList from '../components/product/ProductList'
import { getCatalogData, Product, Category } from '../services/products.service'
import {
  FaSearch, FaWhatsapp, FaTruck, FaCreditCard, FaMoneyBillWave,
  FaUniversity, FaBoxOpen,
} from 'react-icons/fa'

interface ProductsProps {
  initialProducts: Product[]
  initialCategories: Category[]
}

const chips = [
  { icon: FaTruck, text: 'Envío a todo el Ecuador' },
  { icon: FaWhatsapp, text: 'Asesoría por WhatsApp' },
  { icon: FaCreditCard, text: 'Tarjeta, efectivo o transferencia' },
]

const pasos = [
  { icon: FaSearch, title: 'Explora el catálogo', text: 'Busca y filtra por categoría.' },
  { icon: FaWhatsapp, title: 'Consulta por WhatsApp', text: 'Confirma precio y disponibilidad.' },
  { icon: FaTruck, title: 'Recibe o retira', text: 'Envío a domicilio o retiro en tienda.' },
]

const Products: NextPage<ProductsProps> = ({ initialProducts, initialCategories }) => {
  return (
    <Layout
      title="Catálogo de productos"
      description="Catálogo de insumos odontológicos, equipos dentales, instrumental y consumibles. Consulta precio y disponibilidad por WhatsApp."
      keywords="catálogo productos dentales, insumos odontológicos, equipos dentales Ecuador, instrumental odontológico, material dental"
      canonical="/products"
    >
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-teal-50">
        {/* Breadcrumb */}
        <nav className="container mx-auto px-4 py-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-gray-600 hover:text-teal-600 transition-colors">Inicio</Link></li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li aria-current="page" className="text-gray-900 font-semibold">Catálogo</li>
          </ol>
        </nav>

        <div className="container mx-auto px-4 pb-12">
          {/* Cabecera del catálogo */}
          <header className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
            <span className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4 shadow-soft">
              <FaBoxOpen /> Catálogo digital
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
              Catálogo de productos
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Insumos, equipos e instrumental odontológico. Consulta precio y
              disponibilidad por WhatsApp.
            </p>

            {/* Chips informativos */}
            <div className="flex flex-wrap justify-center gap-2.5 mt-5">
              {chips.map((c, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 bg-white/80 border border-cream-200 text-gray-700 text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full shadow-soft"
                >
                  <c.icon className="text-teal-600" />
                  {c.text}
                </span>
              ))}
            </div>
          </header>

          {/* Catálogo (productos al frente) */}
          <ProductList initialProducts={initialProducts} initialCategories={initialCategories} />

          {/* Cómo comprar + pagos (compacto, debajo del catálogo) */}
          <section className="mt-14 bg-white rounded-5xl shadow-soft border border-cream-200 p-6 md:p-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">¿Cómo comprar?</h2>
              <p className="text-sm text-gray-500 mt-1">Tres pasos simples</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
              {pasos.map((p, i) => (
                <div key={i} className="flex sm:flex-col items-center sm:text-center gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
                      <p.icon className="text-lg" />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-teal-600 text-white rounded-full text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{p.title}</h3>
                    <p className="text-xs text-gray-500">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-cream-200 pt-5 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
              <span className="font-semibold text-gray-700">Formas de pago:</span>
              <span className="inline-flex items-center gap-1.5"><FaCreditCard className="text-teal-600" /> Tarjetas</span>
              <span className="inline-flex items-center gap-1.5"><FaMoneyBillWave className="text-teal-600" /> Efectivo</span>
              <span className="inline-flex items-center gap-1.5"><FaUniversity className="text-teal-600" /> Transferencia</span>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<ProductsProps> = async () => {
  const { products, categories } = await getCatalogData()
  return {
    props: { initialProducts: products, initialCategories: categories },
    revalidate: 60,
  }
}

export default Products
