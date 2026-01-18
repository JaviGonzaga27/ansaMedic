import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
  description,
  keywords,
  ogImage,
  canonical
}) => {
  const siteName = "Ansa Medic Dent";
  const siteUrl = "https://www.ansamedicdent.com";
  const defaultDescription = "Distribuidor líder de insumos odontológicos y médicos con servicio técnico especializado en Ecuador. Atención personalizada en Quito.";
  const defaultKeywords = "insumos odontológicos, equipos dentales, servicio técnico dental, instrumental odontológico, Ecuador, Quito";
  const defaultOgImage = `${siteUrl}/og-image.jpg`;

  const pageTitle = title ? `${title} | ${siteName}` : siteName;
  const pageDescription = description || defaultDescription;
  const pageKeywords = keywords || defaultKeywords;
  const pageOgImage = ogImage || defaultOgImage;
  const pageUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <>
      <Head>
        {/* Essential Meta Tags */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        
        {/* SEO Primary Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="author" content={siteName} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={pageUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageOgImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="es_EC" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageOgImage} />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="EC-P" />
        <meta name="geo.placename" content="Quito" />
        <meta name="geo.position" content="-0.1807;-78.4978" />
        <meta name="ICBM" content="-0.1807, -78.4978" />
        
        {/* Theme & Accessibility */}
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#0f7d80" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={siteName} />
        
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": siteName,
              "description": pageDescription,
              "url": siteUrl,
              "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/logo.png`,
                "width": 250,
                "height": 100
              },
              "image": pageOgImage,
              "telephone": ["+593-2-286-7212", "+593-97-938-0563"],
              "email": "ansamedicdent@gmail.com",
              "address": [
                {
                  "@type": "PostalAddress",
                  "streetAddress": "Av. República Dominicana y Bartolomé Hernández",
                  "addressLocality": "Quito",
                  "addressRegion": "Pichincha",
                  "addressCountry": "EC",
                  "name": "Sucursal Carcelén"
                },
                {
                  "@type": "PostalAddress",
                  "streetAddress": "Centro Comercial Plaza París, El Triángulo",
                  "addressLocality": "Quito",
                  "addressRegion": "Pichincha",
                  "addressCountry": "EC",
                  "name": "Sucursal Valle"
                }
              ],
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-0.1807",
                "longitude": "-78.4978"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "09:00",
                  "closes": "14:00"
                }
              ],
              "sameAs": [
                "https://www.facebook.com/ansamedicdent",
                "https://www.instagram.com/ansamedicdent"
              ],
              "priceRange": "$$",
              "currenciesAccepted": "USD",
              "paymentAccepted": "Cash, Credit Card, Transfer"
            })
          }}
        />
        
        {/* Structured Data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": `${siteUrl}/#business`,
              "name": siteName,
              "image": pageOgImage,
              "telephone": "+593-2-286-7212",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. República Dominicana y Bartolomé Hernández",
                "addressLocality": "Quito",
                "addressRegion": "Pichincha",
                "postalCode": "170102",
                "addressCountry": "EC"
              }
            })
          }}
        />
      </Head>
      
      {/* Skip Navigation Link - ISO 29138 */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-6 focus:py-3 focus:bg-teal-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all font-semibold"
        tabIndex={0}
      >
        Saltar al contenido principal
      </a>
      
      <div className="flex flex-col min-h-screen bg-white" lang="es">
        <Header />
        <main 
          id="main-content" 
          className="flex-grow pt-32 md:pt-36" 
          role="main"
          tabIndex={-1}
        >
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;