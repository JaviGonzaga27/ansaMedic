import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaTooth, FaSyringe, FaShieldVirus, FaTeethOpen, FaPumpMedical,
  FaHandSparkles, FaXRay, FaProcedures, FaMortarPestle, FaTools,
  FaNotesMedical, FaBoxOpen, FaArrowRight,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';

export interface HomeCategory {
  id: string;
  name: string;
  count: number;
}

interface CategoryGridProps {
  categories: HomeCategory[];
}

/** Asigna un icono coherente con el nombre de la categoría (resistente a cualquier catálogo). */
function iconFor(name: string): IconType {
  const n = name.toLowerCase();
  const map: { keys: string[]; icon: IconType }[] = [
    { keys: ['biosegur', 'guante', 'mascar', 'desinfec', 'esteril', 'barrera'], icon: FaShieldVirus },
    { keys: ['aguja', 'jeringa', 'anest', 'inyec'], icon: FaSyringe },
    { keys: ['endodon', 'lima', 'conducto'], icon: FaPumpMedical },
    { keys: ['ortodon', 'bracket', 'alambr', 'arco'], icon: FaTeethOpen },
    { keys: ['radio', 'rayos', 'rx', 'imagen'], icon: FaXRay },
    { keys: ['cirug', 'quirur', 'sutura', 'bisturi'], icon: FaProcedures },
    { keys: ['restaur', 'resina', 'cemento', 'composit', 'material', 'acrilic'], icon: FaMortarPestle },
    { keys: ['equipo', 'unidad', 'compresor', 'autoclave', 'lampara', 'pieza de mano', 'motor'], icon: FaTools },
    { keys: ['instrument', 'fresa', 'forceps', 'espejo', 'explorador'], icon: FaNotesMedical },
    { keys: ['profilax', 'limpieza', 'higien', 'cepill', 'pulido'], icon: FaHandSparkles },
    { keys: ['consumi', 'descart', 'algodon', 'gasa', 'rollo'], icon: FaBoxOpen },
    { keys: ['dental', 'odonto', 'diente'], icon: FaTooth },
  ];
  for (const m of map) if (m.keys.some((k) => n.includes(k))) return m.icon;
  return FaTooth;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="bg-white py-14 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-9 md:mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <FaBoxOpen className="text-teal-600" /> Explora por línea
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Encuentra lo que tu consultorio necesita
            </h2>
            <p className="text-gray-600 mt-3 text-base md:text-lg leading-relaxed">
              Navega nuestro catálogo organizado por categorías y consulta precio
              y disponibilidad por WhatsApp en segundos.
            </p>
          </div>
          <Link
            href="/products"
            className="hidden md:inline-flex items-center gap-2 text-teal-700 font-semibold hover:text-teal-800 whitespace-nowrap group"
          >
            Ver todo el catálogo
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((cat, i) => {
            const Icon = iconFor(cat.name);
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
              >
                <Link
                  href={`/products?cat=${cat.id}`}
                  className="group relative flex flex-col h-full bg-cream-50 hover:bg-white border border-cream-200 hover:border-teal-300 rounded-3xl p-5 transition-all duration-300 hover:shadow-warm hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <Icon className="text-xl" />
                  </div>
                  <h3 className="font-bold text-gray-900 leading-snug mb-1 group-hover:text-teal-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-auto">
                    {cat.count} {cat.count === 1 ? 'producto' : 'productos'}
                  </p>
                  <FaArrowRight className="absolute top-5 right-5 text-cream-300 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <Link
          href="/products"
          className="md:hidden mt-6 inline-flex items-center gap-2 text-teal-700 font-semibold"
        >
          Ver todo el catálogo
          <FaArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default CategoryGrid;
