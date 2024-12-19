import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout/Layout'
import ProductList from '../components/product/ProductList'


const Products: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Products - Dental Supplies Store</title>
        <meta name="description" content="Browse our dental supplies" />
      </Head>

      <main>
        <ProductList />      
      </main>
    </Layout>
  )
}

export default Products