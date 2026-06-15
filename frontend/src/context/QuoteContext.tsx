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
}

interface QuoteContextType {
  items: QuoteItem[];
  count: number;
  has: (id: string) => boolean;
  add: (item: QuoteItem) => void;
  remove: (id: string) => void;
  toggle: (item: QuoteItem) => void;
  clear: () => void;
}

const STORAGE_KEY = 'ansamedic_cotizacion';
const QuoteContext = createContext<QuoteContextType | null>(null);

export const useQuote = () => {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote debe usarse dentro de un QuoteProvider');
  return ctx;
};

export const QuoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Cargar desde localStorage al montar (solo cliente)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
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

  const add = useCallback((item: QuoteItem) => {
    setItems((prev) => (prev.some((i) => i.id === item.id) ? prev : [...prev, item]));
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const toggle = useCallback((item: QuoteItem) => {
    setItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const has = useCallback((id: string) => items.some((i) => i.id === id), [items]);

  return (
    <QuoteContext.Provider
      value={{ items, count: items.length, has, add, remove, toggle, clear }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export default QuoteContext;
