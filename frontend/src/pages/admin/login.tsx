import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout/Layout'

const AdminLogin: NextPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implement login logic here
    // If successful, redirect to admin dashboard
    router.push('/admin/dashboard')
  }

  return (
    <Layout>
      <Head>
        <title>Admin Login - Dental Supplies Store</title>
      </Head>

      <main>
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </main>
    </Layout>
  )
}

export default AdminLogin