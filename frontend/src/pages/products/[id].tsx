import React, { useState } from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FaWhatsapp, FaCheckCircle, FaArrowLeft, FaPlus, FaCheck } from 'react-icons/fa';
import Layout from '../../components/layout/Layout';
import ProductGallery from '../../components/product/ProductGallery';
import ProductCard from '../../components/product/ProductCard';
import LocationSelector from '../../components/common/LocationSelector';
import { useQuote } from '../../context/QuoteContext';
import {
  getAllProducts,
  getProductById,
  Product,
} from '../../services/products.service';

const SITE_URL = 'https://www.ansamedicdent.com';

interface ProductPageProps {
  product: Product;
  related: Product[];
}

const ProductPage: NextPage<ProductPageProps> = ({ product, related }) => {
  const [waOpen, setWaOpen] = useState(false);
  const { has, toggle } = useQuote();
  const inQuote = has(product.id);

  const detalle = product.details?.[0];
  const imagenes = [product.imageUrl, ...(detalle?.images || [])];
  const features = detalle?.features || [];
  const specs = detalle?.specifications || [];

  const canonical = `/products/${product.id}`;
  const ogImage = product.imageUrl?.startsWith('http')
    ? product.imageUrl
    : `${SITE_URL}${product.imageUrl}`;

  // Structured data Product (schema.org)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: imagenes.filter(Boolean),
    category: product.category,
    brand: { '@type': 'Brand', name: 'Ansa Medic Dent' },
    sku: product.id,
    url: `${SITE_URL}${canonical}`,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      seller: { '@type': 'Organization', name: 'Ansa Medic Dent' },
      url: `${SITE_URL}${canonical}`,
    },
  };

  return (
    <Layout
      title={product.name}
      description={product.description}
      ogImage={ogImage}
      canonical={canonical}
      keywords={`${product.name}, ${product.category || ''}, insumos odontológicos, Ecuador`}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-teal-50">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-1.5 text-gray-600">
              <li>
                <Link href="/" className="hover:text-teal-600 transition-colors">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-400">/</li>
              <li>
                <Link href="/products" className="hover:text-teal-600 transition-colors">
                  Productos
                </Link>
              </li>
              {product.category && (
                <>
                  <li aria-hidden="true" className="text-gray-400">/</li>
                  <li className="text-gray-500">{product.category}</li>
                </>
              )}
              <li aria-hidden="true" className="text-gray-400">/</li>
              <li aria-current="page" className="text-gray-900 font-semibold truncate max-w-[200px]">
                {product.name}
              </li>
            </ol>
          </nav>

          {/* Detalle */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-5xl shadow-warm border border-cream-200 p-5 sm:p-8">
            {/* Galería */}
            <ProductGallery images={imagenes} alt={product.name} />

            {/* Información */}
            <div className="flex flex-col">
              {product.category && (
                <span className="inline-block w-fit text-xs font-semibold text-teal-700 bg-teal-100 px-3.5 py-1.5 rounded-full mb-3">
                  {product.category}
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

              {/* Características */}
              {features.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
                    Características
                  </h2>
                  <ul className="space-y-2">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <FaCheckCircle className="text-teal-500 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA WhatsApp */}
              <div className="mt-auto pt-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setWaOpen(true)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                  >
                    <FaWhatsapp className="text-2xl" />
                    Consultar por WhatsApp
                  </button>
                  <button
                    onClick={() =>
                      toggle({ id: product.id, name: product.name, imageUrl: product.imageUrl })
                    }
                    className={`flex-1 sm:flex-none font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border-2 ${
                      inQuote
                        ? 'bg-teal-600 text-white border-teal-600'
                        : 'bg-white text-teal-700 border-teal-300 hover:border-teal-500 hover:bg-teal-50'
                    }`}
                  >
                    {inQuote ? <FaCheck /> : <FaPlus />}
                    {inQuote ? 'En tu cotización' : 'Agregar a cotización'}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Te confirmamos precio y disponibilidad al instante.
                </p>
              </div>
            </div>
          </div>

          {/* Especificaciones */}
          {specs.length > 0 && (
            <div className="mt-6 bg-white rounded-5xl shadow-warm border border-cream-200 p-5 sm:p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Especificaciones técnicas
              </h2>
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {specs.map((s, i) => (
                  <div
                    key={i}
                    className="flex justify-between gap-4 py-2 border-b border-gray-100"
                  >
                    <dt className="text-sm text-gray-500">{s.name}</dt>
                    <dd className="text-sm font-medium text-gray-900 text-right">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Relacionados */}
          {related.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Productos relacionados
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

          {/* Volver */}
          <div className="mt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold"
            >
              <FaArrowLeft /> Volver al catálogo
            </Link>
          </div>
        </div>
      </div>

      <LocationSelector
        isOpen={waOpen}
        onClose={() => setWaOpen(false)}
        productName={product.name}
        productId={product.id}
      />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getAllProducts();
  return {
    paths: products.map((p) => ({ params: { id: String(p.id) } })),
    fallback: 'blocking', // productos nuevos se generan al primer acceso (ISR)
  };
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({ params }) => {
  const id = String(params?.id);
  const product = await getProductById(id);

  if (!product) {
    return { notFound: true, revalidate: 60 };
  }

  // Relacionados: misma categoría, excluyendo el actual (máx. 4)
  const all = await getAllProducts();
  const related = all
    .filter((p) => p.id !== product.id && p.category && p.category === product.category)
    .slice(0, 4);

  return {
    props: { product, related },
    revalidate: 60, // ISR: re-genera la página cada 60s si hay cambios
  };
};

export default ProductPage;
