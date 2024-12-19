// components/cart/Cart.tsx
import React from 'react';
import { CartItem } from '../../types/cart';

interface CartProps {
  cart: CartItem[];
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart, updateQuantity }) => {
  return (
    <div>
      {cart.map(item => (
        <div key={item.product.id}>
          <h3>{item.product.name}</h3>
          <p>Price: ${item.product.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
          <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;