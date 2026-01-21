import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { CONTACT, WHATSAPP_URLS, LOCATIONS } from '@/utils/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/about', label: 'Nosotros' },
    { href: '/products', label: 'Productos' },
    { href: '/service_technical', label: 'Servicio Técnico' },
    { href: '/contact', label: 'Contacto' }
  ];

  const productCategories = [
    { href: '/products?category=instrumental', label: 'Instrumental' },
    { href: '/products?category=equipos', label: 'Equipos' },
    { href: '/products?category=materiales', label: 'Materiales' },
    { href: '/products?category=consumibles', label: 'Consumibles' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 text-white" role="contentinfo">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-teal-400">Ansa Medic Dent</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Distribuidor líder de insumos odontológicos y médicos con más de 10 años de experiencia. 
              Calidad garantizada y servicio técnico especializado.
            </p>
            <div className="flex space-x-3 pt-2">
              <a 
                href="https://www.facebook.com/ansamedicdent" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 hover:bg-teal-600 rounded-lg flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-110"
                aria-label="Síguenos en Facebook"
              >
                <Facebook size={20} aria-hidden="true" />
              </a>
              <a 
                href="https://www.instagram.com/ansamedicdent" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 hover:bg-teal-600 rounded-lg flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-110"
                aria-label="Síguenos en Instagram"
              >
                <Instagram size={20} aria-hidden="true" />
              </a>
              <a 
                href="https://twitter.com/ansamedicdent" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 hover:bg-teal-600 rounded-lg flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-110"
                aria-label="Síguenos en Twitter"
              >
                <Twitter size={20} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-teal-400">Enlaces Rápidos</h3>
            <ul className="space-y-2.5" role="list">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link 
                    href={href} 
                    className="text-sm text-gray-300 hover:text-teal-400 transition-colors duration-200 inline-flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-1"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h4 className="text-sm font-semibold mt-6 mb-3 text-gray-400">Categorías</h4>
            <ul className="space-y-2" role="list">
              {productCategories.map(({ href, label }) => (
                <li key={href}>
                  <Link 
                    href={href} 
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded px-1"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-teal-400">Contáctanos</h3>
            <ul className="space-y-3" role="list">
              <li>
                <a 
                  href={`mailto:${CONTACT.EMAIL.MAIN}`}
                  className="flex items-start gap-3 text-sm text-gray-300 hover:text-teal-400 transition-colors group focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded p-1"
                >
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <span>{CONTACT.EMAIL.MAIN}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${CONTACT.PHONE.FORMATTED}`}
                  className="flex items-start gap-3 text-sm text-gray-300 hover:text-teal-400 transition-colors group focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded p-1"
                >
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <span>{CONTACT.PHONE.MAIN}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${CONTACT.WHATSAPP.QUITO}`}
                  className="flex items-start gap-3 text-sm text-gray-300 hover:text-teal-400 transition-colors group focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded p-1"
                >
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <span>{CONTACT.WHATSAPP.QUITO}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300 pt-2">
                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0 text-teal-400" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Horario de Atención</p>
                  <p className="text-xs text-gray-400 mt-1">{CONTACT.HOURS.WEEKDAY}</p>
                  <p className="text-xs text-gray-400">{CONTACT.HOURS.SATURDAY}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-teal-400">Ubicaciones</h3>
            <ul className="space-y-4" role="list">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-teal-400" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-white">Quito - Carcelén</p>
                  <p className="text-xs leading-relaxed mt-1">
                    Av. República Dominicana y Bartolomé Hernández
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-teal-400" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-white">Valle - Plaza París</p>
                  <p className="text-xs leading-relaxed mt-1">
                    Centro Comercial Plaza París, El Triángulo
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p className="text-center md:text-left">
              &copy; {currentYear} Ansa Medic Dent. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link 
                href="/privacidad" 
                className="hover:text-teal-400 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 rounded px-2 py-1"
              >
                Política de Privacidad
              </Link>
              <Link 
                href="/terminos" 
                className="hover:text-teal-400 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 rounded px-2 py-1"
              >
                Términos de Servicio
              </Link>
              <Link 
                href="/sitemap.xml" 
                className="hover:text-teal-400 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 rounded px-2 py-1"
              >
                Mapa del Sitio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
