import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import TechnicalService from '../components/home/TechnicalService';
import Testimonials from '../components/home/Testiomonials';
import CallToAction from '../components/home/CallToAction';
import EmprendeSection from '../components/home/EmprendeSection';
import { SEO_CONSTANTS } from '../utils/constants';

const Home = () => {

  return (
    <Layout>
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
        <FeaturedProducts/>
        <TechnicalService />
        <EmprendeSection />
        <Testimonials />
        <CallToAction />
      </main>
    </Layout>
  );
};

export default Home;