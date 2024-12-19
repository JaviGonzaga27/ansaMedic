// utils/constants.ts

export const SEO_CONSTANTS = {
    HOME_TITLE: "Ansa Medic Dent - Insumos Odontológicos de Calidad",
    HOME_DESCRIPTION: "Ansa Medic Dent: Tu distribuidor de confianza para insumos odontológicos de calidad y servicio técnico especializado. Innovación y excelencia para tu práctica dental.",
    HOME_KEYWORDS: "insumos dentales, equipos odontológicos, servicio técnico dental, suministros odontológicos",
    HOME_OG_TITLE: "DentalPro Supplies - Insumos Odontológicos de Calidad",
    HOME_OG_DESCRIPTION: "Descubre nuestra amplia gama de insumos y equipos dentales de alta calidad. Servicio técnico especializado y soporte continuo para tu práctica odontológica.",
    HOME_OG_IMAGE: "/og-image.jpg",
    HOME_OG_URL: "https://www.dentalprosupplies.com",
  };
  
  export const CAROUSEL_IMAGES = [
    '/images1.jpg',
    '/images2.jpg',
    '/images3.jpg'
  ];
  
  export const CAROUSEL_INTERVAL = 5000; // 5 seconds
  
  export const WHATSAPP_NUMBER = "TUNUMERODEWHATSAPP";
  
  export const FEATURED_PRODUCTS = [
    { name: 'Guantes de Nitrilo', image: '/images/producto/Product1.jpg', slug: 'guantes-de-nitrilo' },
    { name: 'Resina Compuesta', image: '/images/producto/Product2.jpg', slug: 'resina-compuesta' },
    { name: 'Instrumental Quirúrgico', image: '/images/producto/Product3.jpeg', slug: 'instrumental-quirurgico' }
  ];
  
  export const COLORS = {
    primary: 'teal-600',
    secondary: 'teal-700',
    background: 'gray-100',
    text: 'gray-600',
    white: 'white'
  };
  
  export const BUTTON_STYLES = {
    primary: `bg-${COLORS.primary} hover:bg-${COLORS.secondary} text-${COLORS.white} font-bold py-3 px-8 rounded-full transition duration-300`,
    secondary: `bg-${COLORS.white} text-${COLORS.primary} hover:bg-${COLORS.background} font-bold py-3 px-8 rounded-full transition duration-300`
  };
  
  export const TESTIMONIALS = [
    {
      text: "DentalPro ha revolucionado mi práctica. Sus productos son de primera calidad y su servicio técnico es inigualable.",
      author: "Dra. María Rodríguez"
    },
    {
      text: "Los webinars de educación continua son excelentes. Me mantienen actualizado sin salir de mi consultorio.",
      author: "Dr. Carlos Mendoza"
    }
  ];