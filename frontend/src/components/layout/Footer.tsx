import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#0f7d80] to-[#0a5c5e] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Ansa Medic-Dent</h3>
            <p className="text-sm text-gray-300 mb-4">
              Insumos odontológicos y médicos de calidad para profesionales de la salud.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition duration-300" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition duration-300" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition duration-300" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/about', label: 'Acerca de' },
                { href: '/products', label: 'Productos' },
                { href: '/service_technical', label: 'Servicio Técnico' },
                { href: '/contact', label: 'Contacto' }
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-gray-300 hover:text-white transition duration-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contáctanos</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:ansamedicdent@gmail.com" className="text-gray-300 hover:text-white transition duration-300">ansamedicdent@gmail.com</a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a href="tel:+59322867212" className="text-gray-300 hover:text-white transition duration-300">(02) 286-7212</a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a href="tel:+593979380563" className="text-gray-300 hover:text-white transition duration-300">(+593) 97 938 0563</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Ubicaciones</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1" />
                <p className="text-gray-300">Quito: Av. Republica Dominicana y Bartolomé Hernadez, Carcelén</p>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1" />
                <p className="text-gray-300">Valle: Centro Comercial Plaza Paris, El Triangulo.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
            <p>&copy; {currentYear} Ansa Medic-Dent. Todos los derechos reservados.</p>
            <div className="mt-4 md:mt-0">
              <Link href="/privacidad" className="hover:text-white transition duration-300 mr-4">Política de Privacidad</Link>
              <Link href="/terminos" className="hover:text-white transition duration-300">Términos de Servicio</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;