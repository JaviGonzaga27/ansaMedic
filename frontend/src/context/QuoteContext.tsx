import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

export interface QuoteItem {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
}

/** Lo que pasan los botones "Agregar" (sin cantidad; se asume 1). */
export type QuoteItemInput = Omit<QuoteItem, 'quantity'>;

const MAX_QTY = 999;

interface QuoteContextType {
  items: QuoteItem[];
  /** Número de productos distintos en la lista. */
  count: number;
  /** Suma de todas las cantidades. */
  totalUnits: number;
  has: (id: string) => boolean;
  add: (item: QuoteItemInput) => void;
  remove: (id: string) => void;
  toggle: (item: QuoteItemInput) => void;
  setQuantity: (id: string, qty: number) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
}

const STORAGE_KEY = 'ansamedic_cotizacion';
const QuoteContext = createContext<QuoteContextType | null>(null);

export const useQuote = () => {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote debe usarse dentro de un QuoteProvider');
  return ctx;
};

const clampQty = (n: number) => Math.max(1, Math.min(MAX_QTY, Math.floor(n) || 1));

export const QuoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Cargar desde localStorage al montar (solo cliente).
  // Migra items antiguos que no tenían cantidad → quantity: 1.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(
            parsed
              .filter((i) => i && i.id)
              .map((i) => ({
                id: String(i.id),
                name: String(i.name ?? ''),
                imageUrl: String(i.imageUrl ?? ''),
                quantity: clampQty(Number(i.quantity) || 1),
              }))
          );
        }
      }
    } catch {
      /* ignorar storage corrupto */
    }
    setLoaded(true);
  }, []);

  // Persistir cambios
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* almacenamiento lleno o no disponible */
    }
  }, [items, loaded]);

  const add = useCallback((item: QuoteItemInput) => {
    setItems((prev) =>
      prev.some((i) => i.id === item.id) ? prev : [...prev, { ...item, quantity: 1 }]
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const toggle = useCallback((item: QuoteItemInput) => {
    setItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, { ...item, quantity: 1 }]
    );
  }, []);

  const setQuantity = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: clampQty(qty) } : i))
    );
  }, []);

  const increment = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: clampQty(i.quantity + 1) } : i))
    );
  }, []);

  const decrement = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: clampQty(i.quantity - 1) } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const has = useCallback((id: string) => items.some((i) => i.id === id), [items]);

  const totalUnits = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <QuoteContext.Provider
      value={{
        items,
        count: items.length,
        totalUnits,
        has,
        add,
        remove,
        toggle,
        setQuantity,
        increment,
        decrement,
        clear,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export default QuoteContext;
