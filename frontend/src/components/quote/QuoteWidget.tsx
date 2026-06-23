import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileInvoice, FaWhatsapp, FaTimes, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { MapPin, ChevronRight } from 'lucide-react';
import { useQuote } from '../../context/QuoteContext';
import { trackEvent, trackThen } from '../../services/metrics.service';
import { CONTACT } from '@/utils/constants';

const QuoteWidget: React.FC = () => {
  const { items, count, totalUnits, remove, clear, increment, decrement, setQuantity } = useQuote();
  const [open, setOpen] = useState(false);
  const [chooseLocation, setChooseLocation] = useState(false);

  if (count === 0) return null;

  const buildMessage = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const lineas = items
      .map(
        (it, i) =>
          `${i + 1}. ${it.name} — Cantidad: ${it.quantity}\n${origin}/products/${it.id}`
      )
      .join('\n\n');
    return `Hola, quisiera cotizar los siguientes productos:\n\n${lineas}\n\nTotal de artículos: ${totalUnits}`;
  };

  const enviar = async (location: 'quito' | 'valle') => {
    const phone = (
      location === 'quito' ? CONTACT.WHATSAPP.QUITO : CONTACT.WHATSAPP.VALLE
    ).replace(/[^0-9]/g, '');
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(buildMessage())}`;
    // Registrar (esperando un poco) antes de salir a WhatsApp, para no perder el evento.
    await trackThen(Promise.all(items.map((it) => trackEvent('cotizacion', it.id, it.name, location))));
    window.location.href = url;
    setChooseLocation(false);
    setOpen(false);
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[90] bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all w-16 h-16 flex items-center justify-center"
        aria-label={`Abrir cotización (${count} productos)`}
      >
        <FaFileInvoice className="text-2xl" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[22px] h-[22px] flex items-center justify-center px-1 border-2 border-white">
          {count}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[95]"
              onClick={() => {
                setOpen(false);
                setChooseLocation(false);
              }}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[100] flex flex-col"
              role="dialog"
              aria-label="Lista de cotización"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-teal-600 text-white">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <FaFileInvoice /> Mi cotización ({count})
                </h2>
                <button
                  onClick={() => {
                    setOpen(false);
                    setChooseLocation(false);
                  }}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                  aria-label="Cerrar"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* Lista */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {items.map((it) => (
                  <div
                    key={it.id}
                    className="flex items-center gap-3 bg-gray-50 rounded-xl p-2.5 border border-gray-100"
                  >
                    <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-white border border-gray-100">
                      <Image
                        src={it.imageUrl}
                        alt={it.name}
                        fill
                        sizes="56px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">
                        {it.name}
                      </p>
                      {/* Stepper de cantidad */}
                      <div className="inline-flex items-center rounded-lg border border-gray-200 bg-white overflow-hidden">
                        <button
                          onClick={() => decrement(it.id)}
                          disabled={it.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-teal-50 hover:text-teal-700 disabled:opacity-40 disabled:hover:bg-white transition-colors"
                          aria-label={`Disminuir cantidad de ${it.name}`}
                        >
                          <FaMinus className="text-[10px]" />
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={it.quantity}
                          onChange={(e) => setQuantity(it.id, Number(e.target.value))}
                          className="w-12 h-8 text-center text-sm font-semibold text-gray-900 border-x border-gray-200 focus:outline-none focus:bg-teal-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          aria-label={`Cantidad de ${it.name}`}
                        />
                        <button
                          onClick={() => increment(it.id)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                          aria-label={`Aumentar cantidad de ${it.name}`}
                        >
                          <FaPlus className="text-[10px]" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => remove(it.id)}
                      className="text-red-500 hover:text-white hover:bg-red-600 border border-red-200 rounded-lg p-2 transition-colors flex-shrink-0 self-start"
                      aria-label={`Quitar ${it.name}`}
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-4 space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{count} {count === 1 ? 'producto' : 'productos'}</span>
                  <span className="font-semibold text-gray-900">
                    {totalUnits} {totalUnits === 1 ? 'artículo' : 'artículos'} en total
                  </span>
                </div>
                {chooseLocation ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 text-center mb-1">
                      ¿A qué sucursal envías tu cotización?
                    </p>
                    <button
                      onClick={() => enviar('quito')}
                      className="w-full flex items-center justify-between bg-white border-2 border-teal-200 hover:border-teal-500 hover:bg-teal-50 rounded-xl px-4 py-3 transition-all"
                    >
                      <span className="flex items-center gap-2 font-semibold text-gray-800">
                        <MapPin className="w-4 h-4 text-teal-600" /> Quito (Carcelén)
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      onClick={() => enviar('valle')}
                      className="w-full flex items-center justify-between bg-white border-2 border-teal-200 hover:border-teal-500 hover:bg-teal-50 rounded-xl px-4 py-3 transition-all"
                    >
                      <span className="flex items-center gap-2 font-semibold text-gray-800">
                        <MapPin className="w-4 h-4 text-teal-600" /> Valle (Plaza París)
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      onClick={() => setChooseLocation(false)}
                      className="w-full text-sm text-gray-500 hover:text-gray-700 py-1"
                    >
                      Volver
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setChooseLocation(true)}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <FaWhatsapp className="text-xl" /> Enviar cotización por WhatsApp
                    </button>
                    <button
                      onClick={clear}
                      className="w-full text-sm text-gray-500 hover:text-red-600 py-1 transition-colors"
                    >
                      Vaciar lista
                    </button>
                  </>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuoteWidget;
