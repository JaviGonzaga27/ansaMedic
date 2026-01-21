import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Menu, X, Phone, Mail, ChevronDown, MapPin, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsappNavbar from './WhatsappNavbar';
import { CONTACT, WHATSAPP_URLS } from '@/utils/constants';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/about', label: 'Nosotros' },
  { href: '/products', label: 'Productos' },
  { href: '/service_technical', label: 'Servicio Técnico' },
  { href: '/contact', label: 'Contacto' },
];

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  isMobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, isActive, onClick, isMobile }) => {
  return (
    <div className={`relative ${isMobile ? 'py-0.5' : ''}`}>
      <Link
        href={href}
        className={`font-semibold transition-all duration-200 ease-out
          ${isActive
            ? 'text-teal-600 bg-teal-50'
            : 'text-gray-800 hover:text-teal-600 hover:bg-teal-50 focus:text-teal-600'
          } 
          ${isMobile ? 'block px-6 py-3.5 text-base' : 'px-3 py-2 relative group text-sm lg:text-base'}
          focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1 rounded-md`}
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
      >
        {label}
        {!isMobile && (
          <span 
            className={`absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 transform origin-left transition-transform duration-200 ${
              isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            }`}
            aria-hidden="true"
          />
        )}
      </Link>
    </div>
  );
};

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showContactDropdown, setShowContactDropdown] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 20);
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = () => setIsMenuOpen(false);
    router.events?.on('routeChangeStart', handleRouteChange);
    return () => router.events?.off('routeChangeStart', handleRouteChange);
  }, [router]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-white/98 backdrop-blur-md z-50 transition-all duration-300 shadow-md`}
      role="banner"
    >
      {/* Top Bar - Contact Info */}
      <div className="bg-teal-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-xs md:text-sm">
            {/* Desktop Contact Info */}
            <div className="hidden lg:flex items-center gap-4">
              <a 
                href={`tel:${CONTACT.PHONE.QUITO.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-1.5 text-white hover:text-teal-100 transition-colors"
                aria-label="Teléfono Quito"
              >
                <MapPin className="w-3 h-3" />
                <span className="font-medium">Quito: {CONTACT.PHONE.QUITO}</span>
              </a>
              <span className="text-white/40">|</span>
              <a 
                href={`tel:${CONTACT.PHONE.VALLE.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-1.5 text-white hover:text-teal-100 transition-colors"
                aria-label="Teléfono Valle"
              >
                <MapPin className="w-3 h-3" />
                <span className="font-medium">Valle: {CONTACT.PHONE.VALLE}</span>
              </a>
              <span className="text-white/40">|</span>
              <a 
                href={`mailto:${CONTACT.EMAIL.MAIN}`}
                className="flex items-center gap-1.5 text-white hover:text-teal-100 transition-colors"
                aria-label="Enviar email"
              >
                <Mail className="w-3 h-3" />
                <span className="font-medium">{CONTACT.EMAIL.MAIN}</span>
              </a>
            </div>

            {/* Mobile Contact Dropdown */}
            <div className="lg:hidden relative flex-1">
              <button
                onClick={() => setShowContactDropdown(!showContactDropdown)}
                className="flex items-center gap-2 text-white hover:text-teal-100 transition-colors w-full"
                aria-label="Mostrar contactos"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">Contactos</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showContactDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showContactDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl overflow-hidden z-50"
                  >
                    <div className="py-2">
                      <a 
                        href={`tel:${CONTACT.PHONE.QUITO.replace(/[^0-9+]/g, '')}`}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-teal-50 transition-colors"
                      >
                        <Phone className="w-4 h-4 text-teal-600" />
                        <div>
                          <div className="text-xs text-gray-500">Quito</div>
                          <div className="font-semibold text-sm">{CONTACT.PHONE.QUITO}</div>
                        </div>
                      </a>
                      <a 
                        href={`tel:${CONTACT.PHONE.VALLE.replace(/[^0-9+]/g, '')}`}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-teal-50 transition-colors"
                      >
                        <Phone className="w-4 h-4 text-teal-600" />
                        <div>
                          <div className="text-xs text-gray-500">Valle</div>
                          <div className="font-semibold text-sm">{CONTACT.PHONE.VALLE}</div>
                        </div>
                      </a>
                      <a 
                        href={WHATSAPP_URLS.QUITO}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-teal-50 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 text-green-600" />
                        <div>
                          <div className="text-xs text-gray-500">WhatsApp Quito</div>
                          <div className="font-semibold text-sm">{CONTACT.WHATSAPP.QUITO}</div>
                        </div>
                      </a>
                      <a 
                        href={WHATSAPP_URLS.VALLE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-teal-50 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 text-green-600" />
                        <div>
                          <div className="text-xs text-gray-500">WhatsApp Valle</div>
                          <div className="font-semibold text-sm">{CONTACT.WHATSAPP.VALLE}</div>
                        </div>
                      </a>
                      <a 
                        href={`mailto:${CONTACT.EMAIL.QUITO}`}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-teal-50 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-teal-600" />
                        <div>
                          <div className="text-xs text-gray-500">Email Quito</div>
                          <div className="font-semibold text-xs">{CONTACT.EMAIL.QUITO}</div>
                        </div>
                      </a>
                      <a 
                        href={`mailto:${CONTACT.EMAIL.VALLE}`}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-teal-50 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-teal-600" />
                        <div>
                          <div className="text-xs text-gray-500">Email Valle</div>
                          <div className="font-semibold text-xs">{CONTACT.EMAIL.VALLE}</div>
                        </div>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              <div className="text-sm font-medium hidden xl:block">
                {CONTACT.HOURS.WEEKDAY} | {CONTACT.HOURS.SATURDAY}
              </div>
              <WhatsappNavbar />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-8">
          <Link
            href="/"
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-lg transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
            aria-label="Ir a la página de inicio de Ansa Medic Dent"
          >
            <Image
              src="/logo.png"
              alt="Ansa Medic Dent - Insumos Odontológicos"
              width={110}
              height={110}
              className="transition-all duration-300 w-auto h-auto"
              sizes="110px"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
              priority
            />
          </Link>

          <nav
            className="hidden lg:flex lg:items-center lg:space-x-2 xl:space-x-3 ml-auto"
            aria-label="Navegación principal"
          >
            {navLinks.map(({ href, label }) => (
              <NavLink
                key={href}
                href={href}
                label={label}
                isActive={router.pathname === href}
              />
            ))}
          </nav>

          <div className="flex items-center">
            <button
              className="lg:hidden text-teal-600 p-2 rounded-lg hover:bg-teal-50 active:bg-teal-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-40"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Menu */}
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl lg:hidden z-50 flex flex-col"
              style={{ backgroundColor: '#ffffff' }}
              role="navigation"
              aria-label="Navegación móvil"
            >
              {/* Mobile Menu Header with Close Button */}
              <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
                <h2 className="text-base font-bold text-teal-600">Menú</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
                  aria-label="Cerrar menú"
                >
                  <X size={22} className="text-gray-700" aria-hidden="true" />
                </button>
              </div>

              <nav className="flex flex-col flex-1 justify-center py-4 bg-white">
                {navLinks.map(({ href, label }) => (
                  <NavLink
                    key={href}
                    href={href}
                    label={label}
                    isActive={router.pathname === href}
                    onClick={() => setIsMenuOpen(false)}
                    isMobile={true}
                  />
                ))}
                
                {/* Mobile Contact Info */}
                <div className="mt-4 pt-4 px-6 border-t border-gray-200 bg-white">
                  <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
                    Contáctanos
                  </h3>
                  
                  {/* Quito */}
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-teal-700 mb-1.5">Quito</p>
                    <a 
                      href={`tel:${CONTACT.PHONE.QUITO.replace(/[^0-9+]/g, '')}`}
                      className="flex items-center gap-2 py-1.5 text-gray-800 hover:text-teal-600 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                      <span className="text-sm">{CONTACT.PHONE.QUITO}</span>
                    </a>
                    <a 
                      href={WHATSAPP_URLS.QUITO}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 py-1.5 text-gray-800 hover:text-green-600 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span className="text-sm">WhatsApp</span>
                    </a>
                    <a 
                      href={`mailto:${CONTACT.EMAIL.QUITO}`}
                      className="flex items-center gap-2 py-1.5 text-gray-800 hover:text-teal-600 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                      <span className="text-sm">Email</span>
                    </a>
                  </div>

                  {/* Valle */}
                  <div>
                    <p className="text-xs font-semibold text-teal-700 mb-1.5">Valle</p>
                    <a 
                      href={`tel:${CONTACT.PHONE.VALLE.replace(/[^0-9+]/g, '')}`}
                      className="flex items-center gap-2 py-1.5 text-gray-800 hover:text-teal-600 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                      <span className="text-sm">{CONTACT.PHONE.VALLE}</span>
                    </a>
                    <a 
                      href={WHATSAPP_URLS.VALLE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 py-1.5 text-gray-800 hover:text-green-600 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span className="text-sm">WhatsApp</span>
                    </a>
                    <a 
                      href={`mailto:${CONTACT.EMAIL.VALLE}`}
                      className="flex items-center gap-2 py-1.5 text-gray-800 hover:text-teal-600 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                      <span className="text-sm">Email</span>
                    </a>
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
