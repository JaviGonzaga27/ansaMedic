import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { MapPin, Phone, Mail, MessageCircle, Wrench } from 'lucide-react'
import { CONTACT, WHATSAPP_URLS, LOCATIONS } from '@/utils/constants'

const Contact: NextPage = () => {

  const sucursales = [
    {
      nombre: 'Quito',
      subtitulo: 'Carcelén',
      ciudad: 'Quito',
      direccion: LOCATIONS[0].address,
      telefono: CONTACT.PHONE.QUITO,
      telefonoFormateado: CONTACT.PHONE.QUITO.replace(/[^0-9+]/g, ''),
      whatsapp: CONTACT.WHATSAPP.QUITO,
      whatsappUrl: WHATSAPP_URLS.QUITO,
      email: CONTACT.EMAIL.QUITO,
      servicioTecnico: CONTACT.WHATSAPP.SERVICIO,
      servicioTecnicoUrl: WHATSAPP_URLS.SERVICIO,
      mapUrl: LOCATIONS[0].embedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7986!2d-78.4978!3d-0.1807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTAnNTAuNSJTIDc4wrAyOSc1Mi4xIlc!5e0!3m2!1ses!2sec!4v1234567890',
      googleMapsLink: LOCATIONS[0].googleMapsUrl || '#'
    },
    {
      nombre: 'Valle',
      subtitulo: 'San Rafael',
      ciudad: 'Valle',
      direccion: LOCATIONS[1].address,
      telefono: CONTACT.PHONE.VALLE,
      telefonoFormateado: CONTACT.PHONE.VALLE.replace(/[^0-9+]/g, ''),
      whatsapp: CONTACT.WHATSAPP.VALLE,
      whatsappUrl: WHATSAPP_URLS.VALLE,
      email: CONTACT.EMAIL.VALLE,
      servicioTecnico: CONTACT.WHATSAPP.SERVICIO,
      servicioTecnicoUrl: WHATSAPP_URLS.SERVICIO,
      mapUrl: LOCATIONS[1].embedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7986!2d-78.4978!3d-0.1807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTAnNTAuNSJTIDc4wrAyOSc1Mi4xIlc!5e0!3m2!1ses!2sec!4v1234567890',
      googleMapsLink: LOCATIONS[1].googleMapsUrl || '#'
    }
  ]

  return (
    <Layout 
      title="Contáctanos - Sucursales en Quito y Valle de los Chillos"
      description="Contacta con Ansa Medic Dent. Dos sucursales en Quito (Carcelén y Valle). Atención personalizada, asesoría profesional. Tel: (02) 286-7212"
      keywords="contacto Ansa Medic Dent, sucursales insumos dentales Quito, teléfono dental Ecuador, dirección consultorio dental Quito, WhatsApp dental"
      canonical="/contact"
    >
      <Head>
        <title>Contáctanos - Ansa Medic Dent</title>
        <meta name="description" content="Ponte en contacto con Ansa Medic Dent. Dos sucursales en Quito, atención personalizada y asesoría profesional en insumos odontológicos" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
        {/* Breadcrumbs */}
        <nav className="container mx-auto px-4 py-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-teal-600 transition-colors">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li aria-current="page" className="text-gray-900 font-semibold">Contacto</li>
          </ol>
        </nav>

        <main className="container mx-auto px-4 pb-12">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <header className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Nuestras Sucursales
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Dos ubicaciones estratégicas para servirte mejor
              </p>
            </header>
          </div>

          {/* Sucursales Cards */}
          <div className="grid lg:grid-cols-2 gap-6 mb-12 max-w-7xl mx-auto">
            {sucursales.map((sucursal, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                {/* Header de la sucursal */}
                <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Sucursal {sucursal.nombre}</h2>
                        <p className="text-sm text-white/90">{sucursal.subtitulo}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm mt-2 ml-13">{sucursal.direccion}</p>
                </div>

                {/* Contenido de la sucursal */}
                <div className="p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {/* Teléfono de Oficina */}
                    <a
                      href={`tel:${sucursal.telefonoFormateado}`}
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold text-gray-500 uppercase">Oficina</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{sucursal.telefono}</p>
                      </div>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={sucursal.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold text-gray-500 uppercase">WhatsApp</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{sucursal.whatsapp}</p>
                      </div>
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {/* Email */}
                    <a
                      href={`mailto:${sucursal.email}`}
                      className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold text-gray-500 uppercase">Email</p>
                        <p className="text-xs font-bold text-gray-900 truncate">{sucursal.email}</p>
                      </div>
                    </a>

                    {/* Servicio Técnico */}
                    <a
                      href={sucursal.servicioTecnicoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <Wrench className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold text-gray-500 uppercase">Servicio</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{sucursal.servicioTecnico}</p>
                      </div>
                    </a>
                  </div>

                  {/* Mapa */}
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Ubicación
                    </p>
                    <div className="aspect-video rounded-lg overflow-hidden shadow-sm border border-gray-200">
                      <iframe 
                        src={sucursal.mapUrl}
                        width="100%" 
                        height="100%" 
                        style={{border:0}} 
                        allowFullScreen
                        loading="lazy"
                        title={`Mapa de ${sucursal.nombre}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <section className="mt-12 bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-6 md:p-8 text-center text-white shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">¿Necesitas ayuda?</h2>
            <p className="text-base md:text-lg mb-6 opacity-95">Nuestro equipo está listo para atenderte</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={WHATSAPP_URLS.QUITO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-teal-700 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                Chatea con WhatsApp
              </a>
              <a
                href={`tel:${CONTACT.PHONE.QUITO.replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-800 text-white font-semibold rounded-lg hover:bg-teal-900 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                Llámanos Ahora
              </a>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  )
}

export default Contact
