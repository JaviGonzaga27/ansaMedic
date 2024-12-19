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
      className={`text-sm sm:text-base font-semibold transition duration-300 ${
        isActive
          ? 'text-[#0f7d80] border-b-2 border-[#0f7d80]'
          : 'text-gray-600 hover:text-[#0f7d80]'
      } ${isMobile ? 'block px-4 py-2' : 'px-2 py-1'}`}
      onClick={onClick}
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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-md py-2' : 'py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Ansa Medic Dent Logo" 
              width={isScrolled ? 70 : 100} 
              height={isScrolled ? 70 : 100} 
              className="transition-all duration-300"
              sizes="(max-width: 640px) 50px, 60px"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
            />
          </Link>

          <nav className="hidden md:flex md:items-center md:space-x-1 lg:space-x-2">
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
              className="md:hidden text-[#0f7d80] p-2 rounded-full hover:bg-gray-100 transition duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col py-2">
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
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;