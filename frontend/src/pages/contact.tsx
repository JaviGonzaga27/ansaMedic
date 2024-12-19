import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout/Layout'
import { useState } from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'

const Contact: NextPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario al correo
    console.log('Formulario enviado:', formData)
    // Resetear el formulario después de enviar
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <Layout>
      <Head>
        <title>Contacto - DentalPro Supplies</title>
        <meta name="description" content="Contáctanos para obtener más información sobre nuestros productos y servicios dentales" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#0f7d80] mb-8 text-center">Contáctanos</h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div>
            <h2 className="text-2xl font-semibold text-[#0f7d80] mb-6">Nuestras Sucursales</h2>

            {/* Sucursal 1 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#0f7d80] mb-2">Sucursal Principal</h3>
              <div className="flex items-start mb-2">
                <MapPin className="mr-2 text-[#888786]" />
                <p className="text-[#888786]">Av. Dental 123, Ciudad Dental, CD 12345</p>
              </div>
              <div className="flex items-center mb-2">
                <Phone className="mr-2 text-[#888786]" />
                <p className="text-[#888786]">(123) 456-7890</p>
              </div>
              <div className="aspect-w-16 aspect-h-9 mt-4">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.74844797932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1630619998219!5m2!1sen!2sus"
                  width="100%" 
                  height="250" 
                  style={{border:0}} 
                  allowFullScreen={true} 
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Sucursal 2 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#0f7d80] mb-2">Sucursal Sur</h3>
              <div className="flex items-start mb-2">
                <MapPin className="mr-2 text-[#888786]" />
                <p className="text-[#888786]">Calle Molar 456, Villa Dental, VD 67890</p>
              </div>
              <div className="flex items-center mb-2">
                <Phone className="mr-2 text-[#888786]" />
                <p className="text-[#888786]">(987) 654-3210</p>
              </div>
              <div className="aspect-w-16 aspect-h-9 mt-4">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.74844797932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1630619998219!5m2!1sen!2sus"
                  width="100%" 
                  height="250" 
                  style={{border:0}} 
                  allowFullScreen={true} 
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Teléfonos celulares */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#0f7d80] mb-2">Teléfonos Celulares</h3>
              <div className="flex items-center mb-2">
                <Phone className="mr-2 text-[#888786]" />
                <p className="text-[#888786]">Ventas: (555) 123-4567</p>
              </div>
              <div className="flex items-center mb-2">
                <Phone className="mr-2 text-[#888786]" />
                <p className="text-[#888786]">Soporte Técnico: (555) 987-6543</p>
              </div>
              <div className="flex items-center mb-2">
                <Phone className="mr-2 text-[#888786]" />
                <p className="text-[#888786]">Atención al Cliente: (555) 246-8135</p>
              </div>
            </div>

            {/* Email */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#0f7d80] mb-2">Correo Electrónico</h3>
              <div className="flex items-center">
                <Mail className="mr-2 text-[#888786]" />
                <p className="text-[#888786]">info@dentalprosupplies.com</p>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div>
            <h2 className="text-2xl font-semibold text-[#0f7d80] mb-6">Envíanos un Mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-[#888786] mb-2">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-[#888786] rounded focus:outline-none focus:ring-2 focus:ring-[#0f7d80]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[#888786] mb-2">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-[#888786] rounded focus:outline-none focus:ring-2 focus:ring-[#0f7d80]"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-[#888786] mb-2">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full p-2 border border-[#888786] rounded focus:outline-none focus:ring-2 focus:ring-[#0f7d80]"
                ></textarea>
              </div>
              <button type="submit" className="bg-[#0f7d80] text-white font-bold py-2 px-4 rounded hover:bg-[#0a5c5e] transition duration-300">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Contact