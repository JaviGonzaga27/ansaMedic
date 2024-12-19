import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout/Layout'
import Cart from '../components/cart/Cart'
import { useCart } from '../hooks/useCart'

const CartPage: NextPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart()

  return (
    <Layout>
      <Head>
        <title>Shopping Cart - Dental Supplies Store</title>
        <meta name="description" content="View your shopping cart" />
      </Head>

      <main>
        <h1>Your Shopping Cart</h1>
        <Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
      </main>
    </Layout>
  )
}

export default CartPage