import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
  const siteName = "Ansa Medic Dent"; // Reemplaza esto con el nombre real de tu sitio
  const siteDescription = "Descripción por defecto del sitio"; // Reemplaza esto con la descripción por defecto de tu sitio

  return (
    <>
      <Head>
        <title>{title ? `${title} | ${siteName}` : siteName}</title>
        <meta name="description" content={description || siteDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": siteName,
            "url": "https://www.dentalpro.com",
            "logo": "https://www.dentalpro.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-123-456-7890",
              "contactType": "customer service"
            }
          })}
        </script>
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;