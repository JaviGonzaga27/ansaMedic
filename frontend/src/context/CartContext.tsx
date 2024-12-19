import React, { createContext, useContext, useState } from 'react';

interface CartContextType {
  cartCount: number;
  addToCart: () => void;
  removeFromCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => setCartCount(prev => prev + 1);
  const removeFromCart = () => setCartCount(prev => Math.max(0, prev - 1));

  return (
    <CartContext.Provider value={{ cartCount, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};