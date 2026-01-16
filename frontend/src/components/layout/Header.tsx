import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsappNavbar from './WhatsappNavbar';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/about', label: 'Acerca de' },
  { href: '/products', label: 'Productos' },
  { href: '/service_technical', label: 'Servicio Técnico' },
  { href: '/contact', label: 'Contactanos' },
];

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  isMobile?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, isActive, onClick, isMobile }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`relative ${isMobile ? 'py-2' : ''}`}
  >
    <Link
      href={href}
      className={`text-sm sm:text-base font-semibold transition-all duration-300 ease-in-out
        ${isActive
          ? 'text-teal-600 border-b-2 border-teal-600'
          : 'text-gray-700 hover:text-teal-600 focus:text-teal-600'
        } 
        ${isMobile ? 'block px-4 py-3' : 'px-3 py-2'}
        focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-md`}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  </motion.div>
);

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Close mobile menu on route change
  useEffect(() => {
    const handleRouteChange = () => setIsMenuOpen(false);
    router.events?.on('routeChangeStart', handleRouteChange);
    return () => router.events?.off('routeChangeStart', handleRouteChange);
  }, [router]);

  // Prevent body scroll when mobile menu is open
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

  // Handle escape key to close mobile menu
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
    <motion.header
      className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 transition-all duration-300 ${isScrolled ? 'shadow-xl py-2' : 'shadow-md py-4'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-lg"
            aria-label="Ir a la página de inicio"
          >
            <Image
              src="/logo.png"
              alt="Ansa Medic Dent Logo"
              width={isScrolled ? 70 : 100}
              height={isScrolled ? 70 : 100}
              className="transition-all duration-300"
              sizes="(max-width: 640px) 50px, 60px"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
              priority
            />
          </Link>

          <nav
            className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2"
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

          <div className="flex items-center space-x-4">
            <WhatsappNavbar />
            <motion.button
              className="md:hidden text-teal-600 p-2 rounded-full hover:bg-teal-50 active:bg-teal-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
              style={{ top: isScrolled ? '80px' : '96px' }}
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Menu */}
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-white shadow-2xl overflow-hidden"
              role="navigation"
              aria-label="Navegación móvil"
            >
              <nav className="flex flex-col py-4">
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
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;