import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import TechnicalService from '../components/home/TechnicalService';
import CallToAction from '../components/home/CallToAction';
import ValueProps from '../components/home/ValueProps';
import { SEO_CONSTANTS } from '../utils/constants';
import type { GetStaticProps } from 'next';
import { getFeaturedProducts, Product } from '../services/products.service';

const Testimonials = dynamic(() => import('../components/home/Testimonials'), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-cream-100 to-teal-50"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600"></div></div>
});

interface HomeProps {
  featured: Product[];
}

const Home = ({ featured }: HomeProps) => {

  return (
    <Layout
      title="Inicio - Insumos Odontológicos y Médicos"
      description="Ansa Medic Dent - Distribuidor líder de insumos odontológicos, equipos dentales y servicio técnico especializado en Quito, Ecuador. Calidad garantizada."
      keywords="insumos odontológicos Ecuador, equipos dentales Quito, instrumental odontológico, servicio técnico dental, materiales dentales, consultorio odontológico"
      canonical="/"
    >
      <Head>
        <title>{SEO_CONSTANTS.HOME_TITLE}</title>
        <meta name="description" content={SEO_CONSTANTS.HOME_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="keywords" content={SEO_CONSTANTS.HOME_KEYWORDS} />
        <meta property="og:title" content={SEO_CONSTANTS.HOME_OG_TITLE} />
        <meta property="og:description" content={SEO_CONSTANTS.HOME_OG_DESCRIPTION} />
        <meta property="og:image" content={SEO_CONSTANTS.HOME_OG_IMAGE} />
        <meta property="og:url" content={SEO_CONSTANTS.HOME_OG_URL} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="overflow-x-hidden">
        <HeroSection />
        <FeaturedProducts initialProducts={featured} />
        <ValueProps />
        <TechnicalService />
        <CallToAction />
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const featured = await getFeaturedProducts();
  return {
    props: { featured },
    revalidate: 60,
  };
};

export default Home;