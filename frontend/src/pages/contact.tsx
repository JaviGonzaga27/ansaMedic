import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { CONTACT, WHATSAPP_URLS, LOCATIONS } from '@/utils/constants'

const Contact: NextPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Formulario enviado:', formData)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: Phone,
      title: 'Teléfono Principal',
      value: CONTACT.PHONE.MAIN,
      link: `tel:${CONTACT.PHONE.FORMATTED.replace(/[^0-9+]/g, '')}`,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Phone,
      title: 'WhatsApp Quito',
      value: CONTACT.WHATSAPP.QUITO,
      link: WHATSAPP_URLS.QUITO,
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Phone,
      title: 'WhatsApp Valle',
      value: CONTACT.WHATSAPP.VALLE,
      link: WHATSAPP_URLS.VALLE,
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Phone,
      title: 'Servicio Técnico',
      value: CONTACT.WHATSAPP.SERVICIO,
      link: WHATSAPP_URLS.SERVICIO,
      color: 'bg-amber-100 text-amber-600'
    },
    {
      icon: Mail,
      title: 'Email',
      value: CONTACT.EMAIL,
      link: `mailto:${CONTACT.EMAIL}`,
      color: 'bg-teal-100 text-teal-600'
    }
  ]

  const locations = [
    {
      name: LOCATIONS[0].name,
      address: LOCATIONS[0].address,
      phone: LOCATIONS[0].phone,
      whatsapp: LOCATIONS[0].whatsapp,
      mapUrl: LOCATIONS[0].embedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7986!2d-78.4978!3d-0.1807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTAnNTAuNSJTIDc4wrAyOSc1Mi4xIlc!5e0!3m2!1ses!2sec!4v1234567890',
      googleMapsLink: LOCATIONS[0].googleMapsUrl || '#'
    },
    {
      name: LOCATIONS[1].name,
      address: LOCATIONS[1].address,
      phone: LOCATIONS[1].phone,
      whatsapp: LOCATIONS[1].whatsapp,
      mapUrl: LOCATIONS[1].embedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7986!2d-78.4978!3d-0.1807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTAnNTAuNSJTIDc4wrAyOSc1Mi4xIlc!5e0!3m2!1ses!2sec!4v1234567890',
      googleMapsLink: LOCATIONS[1].googleMapsUrl || '#'
    }
  ]

  return (
    <Layout 
      title="Contáctanos - Sucursales en Quito"
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
          {/* Hero Section - Above the fold */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Left: Contact Info */}
            <div>
              <header className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Contáctanos
                </h1>
                <p className="text-xl text-gray-600">
                  Estamos aquí para ayudarte. Elige la forma que prefieras para comunicarte con nosotros.
                </p>
              </header>

              {/* Quick Contact Methods */}
              <div className="space-y-4 mb-8">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <a
                      key={index}
                      href={method.link}
                      target={method.link.startsWith('http') ? '_blank' : undefined}
                      rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
                    >
                      <div className={`w-14 h-14 ${method.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-500">{method.title}</p>
                        <p className="text-lg font-bold text-gray-900">{method.value}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  );
                })}
              </div>

              {/* Horarios */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Horario de Atención</h3>
                </div>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-semibold">Lunes - Viernes:</span>
                    <span>{CONTACT.HOURS.WEEKDAY.split(': ')[1]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Sábado:</span>
                    <span>{CONTACT.HOURS.SATURDAY.split(': ')[1]}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span className="font-semibold">Domingo:</span>
                    <span>Cerrado</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre completo <span className="text-red-500" aria-label="requerido">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500" aria-label="requerido">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="juan@ejemplo.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Mensaje <span className="text-red-500" aria-label="requerido">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  aria-label={isSubmitting ? 'Enviando mensaje' : 'Enviar mensaje'}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : 'Enviar Mensaje'}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg" role="alert">
                    <p className="text-green-800 font-semibold flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      ¡Mensaje enviado con éxito!
                    </p>
                    <p className="text-green-700 text-sm mt-1">Te contactaremos pronto.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg" role="alert">
                    <p className="text-red-800 font-semibold">Error al enviar el mensaje</p>
                    <p className="text-red-700 text-sm mt-1">Por favor, intenta de nuevo más tarde.</p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Locations Section - Below the fold */}
          <section className="mt-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Nuestras Sucursales</h2>
              <p className="text-lg text-gray-600">Visítanos en cualquiera de nuestras dos ubicaciones en Quito</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {locations.map((location, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-teal-600" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{location.name}</h3>
                        <p className="text-gray-600">{location.address}</p>
                      </div>
                    </div>
                    
                    <a
                      href={`tel:${location.phone.replace(/[^0-9+]/g, '')}`}
                      className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold mb-2 transition-colors"
                    >
                      <Phone className="w-5 h-5" aria-hidden="true" />
                      {location.phone}
                    </a>

                    <a
                      href={`https://wa.me/${location.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold mb-4 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" aria-hidden="true" />
                      WhatsApp: {location.whatsapp}
                    </a>

                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe 
                        src={location.mapUrl}
                        width="100%" 
                        height="100%" 
                        style={{border:0}} 
                        allowFullScreen
                        loading="lazy"
                        title={`Mapa de ${location.name}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16 bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Necesitas ayuda?</h2>
            <p className="text-xl mb-8 opacity-95">Nuestro equipo está listo para atenderte</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP_URLS.QUITO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-teal-700 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                Chatea con WhatsApp
              </a>
              <a
                href={`tel:${CONTACT.PHONE.FORMATTED.replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-800 text-white font-semibold rounded-lg hover:bg-teal-900 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
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