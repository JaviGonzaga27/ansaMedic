// utils/constants.ts

// Información de Contacto
export const CONTACT = {
  PHONE: {
    MAIN: process.env.NEXT_PUBLIC_PHONE_MAIN || '(02) 286-7212',
    FORMATTED: process.env.NEXT_PUBLIC_PHONE_FORMATTED || '+593-2-286-7212',
  },
  WHATSAPP: {
    QUITO: process.env.NEXT_PUBLIC_WHATSAPP_QUITO || '+593979380563',
    VALLE: process.env.NEXT_PUBLIC_WHATSAPP_VALLE || '+593992339152',
    SERVICIO: process.env.NEXT_PUBLIC_WHATSAPP_SERVICIO || '+593984603365',
  },
  EMAIL: process.env.NEXT_PUBLIC_EMAIL || 'ansamedicdent@gmail.com',
  HOURS: {
    WEEKDAY: process.env.NEXT_PUBLIC_HOURS_WEEKDAY || 'Lun - Vie: 8:00 AM - 6:00 PM',
    SATURDAY: process.env.NEXT_PUBLIC_HOURS_SATURDAY || 'Sáb: 9:00 AM - 2:00 PM',
  }
};

// URLs de WhatsApp
export const WHATSAPP_URLS = {
  QUITO: `https://wa.me/${CONTACT.WHATSAPP.QUITO.replace(/[^0-9]/g, '')}`,
  VALLE: `https://wa.me/${CONTACT.WHATSAPP.VALLE.replace(/[^0-9]/g, '')}`,
  SERVICIO: `https://wa.me/${CONTACT.WHATSAPP.SERVICIO.replace(/[^0-9]/g, '')}`,
};

export const SEO_CONSTANTS = {
  SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'Ansa Medic-Dent',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ansamedicdent.com',
  HOME_TITLE: "Ansa Medic-Dent - Insumos Odontológicos de Calidad",
  HOME_DESCRIPTION: "Ansa Medic-Dent: Tu distribuidor de confianza para insumos odontológicos de calidad y servicio técnico especializado. Innovación y excelencia para tu práctica dental.",
  HOME_KEYWORDS: "insumos dentales, equipos odontológicos, servicio técnico dental, suministros odontológicos",
  HOME_OG_TITLE: "Ansa Medic-Dent - Insumos Odontológicos de Calidad",
  HOME_OG_DESCRIPTION: "Descubre nuestra amplia gama de insumos y equipos dentales de alta calidad. Servicio técnico especializado y soporte continuo para tu práctica odontológica.",
  HOME_OG_IMAGE: "https://placehold.co/1200x630/0d9488/ffffff?text=Ansa+Medic-Dent",
};

export const CAROUSEL_IMAGES = [
  'https://placehold.co/1920x800/0d9488/ffffff?text=Insumos+Odontol%C3%B3gicos',
  'https://placehold.co/1920x800/14b8a6/ffffff?text=Equipamiento+Dental',
  'https://placehold.co/1920x800/0d9488/ffffff?text=Servicio+T%C3%A9cnico',
  'https://placehold.co/1920x800/14b8a6/ffffff?text=Promoci%C3%B3n+Especial'
];

export const CAROUSEL_INTERVAL = 5000; // 5 seconds

export const FEATURED_PRODUCTS = [
  { name: 'Guantes de Nitrilo', image: 'https://placehold.co/400x400/0d9488/ffffff?text=Guantes+de+Nitrilo', slug: 'guantes-de-nitrilo' },
  { name: 'Resina Compuesta', image: 'https://placehold.co/400x400/0d9488/ffffff?text=Resina+Compuesta', slug: 'resina-compuesta' },
  { name: 'Instrumental Quirúrgico', image: 'https://placehold.co/400x400/0d9488/ffffff?text=Instrumental', slug: 'instrumental-quirurgico' }
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
    text: "Ansa Medic-Dent ha revolucionado mi práctica. Sus productos son de primera calidad y su servicio técnico es inigualable.",
    author: "Dra. María Rodríguez"
  },
  {
    text: "Los equipos que he adquirido son excelentes. Me mantienen actualizado sin salir de mi consultorio.",
    author: "Dr. Carlos Mendoza"
  }
];

// Ubicaciones
export const LOCATIONS = [
  {
    name: 'Sucursal Carcelén',
    address: 'Av. Diego Vásquez de Cepeda Oe1-100 y Edmundo Carvajal',
    phone: CONTACT.PHONE.MAIN,
    whatsapp: CONTACT.WHATSAPP.QUITO,
    googleMapsUrl: 'https://www.google.com/maps/place/AnsaMedic-Dent/@-0.0902669,-78.4706700,20z',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.4533422136245!2d-78.4706700008026!3d-0.09026699999998146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d58f9e6e8dd78d%3A0x7b456a2472688637!2sAnsaMedic-Dent!5e0!3m2!1ses!2sec!4v1768761447390!5m2!1ses!2sec',
  },
  {
    name: 'Sucursal Valle',
    address: 'Valle de los Chillos',
    phone: CONTACT.PHONE.MAIN,
    whatsapp: CONTACT.WHATSAPP.VALLE,
    googleMapsUrl: 'https://www.google.com/maps/place/Ansa+Medic-Dent+Valle/@-0.3001136,-78.4598171,20z',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.4408968592319!2d-78.45981710080261!3d-0.30011369999999327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d5bde0d3c7cced%3A0x83fb4bb6d17fe8c1!2sAnsa%20Medic-Dent%20Valle!5e0!3m2!1ses!2sec!4v1768761519132!5m2!1ses!2sec',
  }
];