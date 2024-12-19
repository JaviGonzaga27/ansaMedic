import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout/Layout'

const AdminDashboard: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Admin Dashboard - Dental Supplies Store</title>
      </Head>

      <main>
        <h1>Admin Dashboard</h1>
        <nav>
          <ul>
            <li><a href="/admin/products">Manage Products</a></li>
            <li><a href="/admin/orders">View Orders</a></li>
          </ul>
        </nav>
      </main>
    </Layout>
  )
}

export default AdminDashboard