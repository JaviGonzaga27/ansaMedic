import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import Image from 'next/image'
import { Wrench, Clock, Shield, GraduationCap, Phone, Mail, CheckCircle, Armchair } from 'lucide-react'
import { CONTACT, WHATSAPP_URLS } from '@/utils/constants'
import { useState, useEffect } from 'react'

const ServiceTechnical: NextPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const serviceImages = [
    'https://res.cloudinary.com/ddmiaf0q3/image/upload/v1769632864/ansamedic/servicio_tecnico/servicio_tecnico_1.jpg',
    'https://res.cloudinary.com/ddmiaf0q3/image/upload/v1769632865/ansamedic/servicio_tecnico/servicio_tecnico_2.jpg',
    'https://res.cloudinary.com/ddmiaf0q3/image/upload/v1769632865/ansamedic/servicio_tecnico/servicio_tecnico_3.jpg',
    'https://res.cloudinary.com/ddmiaf0q3/image/upload/v1769632866/ansamedic/servicio_tecnico/servicio_tecnico_4.jpg',
  ];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % serviceImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [serviceImages.length]);

  const services = [
    {
      icon: Wrench,
      title: 'Mantenimiento Preventivo y Correctivo',
      description: 'Inspecciones regulares, limpieza profunda y reparaciones para mantener tus equipos en óptimas condiciones'
    },
    {
      icon: Clock,
      title: 'Instalación de Unidad Dental',
      description: 'Instalación profesional y configuración completa de unidades dentales'
    },
    {
      icon: Shield,
      title: 'Reparación y Mantenimiento de Autoclave',
      description: 'Servicio especializado para autoclaves, garantizando su correcto funcionamiento y esterilización'
    },
    {
      icon: GraduationCap,
      title: 'Reparación de Compresor',
      description: 'Mantenimiento y reparación de compresores dentales para un flujo de aire óptimo'
    },
    {
      icon: Armchair,
      title: 'Renovación de Tapizado',
      description: 'Renovación profesional del tapizado de sillones dentales para una apariencia impecable'
    }
  ]

  const benefits = [
    'Reparación y mantenimiento de Scaler',
    'Reparación y mantenimiento de piezas de mano',
    'Técnicos certificados y especializados',
    'Repuestos de buena calidad',
    'Seguimiento post-servicio',
    'Trabajo profesional garantizado'
  ]

  return (
    <Layout 
      title="Servicio Técnico Odontológico Especializado"
      description="Servicio técnico especializado para equipos odontológicos en Quito. Mantenimiento preventivo, reparación, calibración y atención personalizada garantizada."
      keywords="servicio técnico dental Ecuador, mantenimiento equipos odontológicos, reparación equipos dentales Quito, técnico equipos odontológicos, calibración equipos dentales"
      canonical="/service_technical"
    >
      <Head>
        <title>Servicio Técnico - Ansa Medic Dent</title>
        <meta name="description" content="Mantenimiento preventivo y correctivo, instalación de unidades dentales, reparación de autoclave, compresor, scaler y piezas de mano. Servicio técnico especializado" />
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
            <li aria-current="page" className="text-gray-900 font-semibold">Servicio Técnico</li>
          </ol>
        </nav>

        <main className="container mx-auto px-4 py-12">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Servicio Técnico
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mantén tu consultorio funcionando sin interrupciones con nuestro servicio técnico profesional y confiable
            </p>
          </header>
          {/* Servicios */}
          <section className="mb-20" aria-labelledby="servicios-heading">
            <div className="text-center mb-12">
              <h2 id="servicios-heading" className="text-3xl font-bold text-gray-900 mb-4">
                Nuestros Servicios
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Soluciones integrales para el mantenimiento y reparación de tu equipamiento dental
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article 
                    key={index}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                  >
                    <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-teal-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Mantenimiento Preventivo */}
          <section className="mb-20" aria-labelledby="preventivo-heading">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 relative h-96 md:h-auto md:min-h-[500px] bg-gray-100">
                  <Image 
                    src={serviceImages[currentImageIndex]} 
                    alt={`Servicio técnico dental ${currentImageIndex + 1}`} 
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  {/* Carousel Controls */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {serviceImages.map((_, index) => (
                      <button
                        key={index}
                        style={{
                          width: index === currentImageIndex ? '10px' : '8px',
                          height: index === currentImageIndex ? '10px' : '8px',
                          minWidth: index === currentImageIndex ? '10px' : '8px',
                          minHeight: index === currentImageIndex ? '10px' : '8px',
                        }}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`rounded-full transition-all duration-300 flex-shrink-0 ${
                          index === currentImageIndex 
                            ? 'bg-teal-500' 
                            : 'bg-white/80 hover:bg-white'
                        }`}
                        aria-label={`Ver imagen ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="md:w-1/2 p-8 md:p-12">
                  <h2 id="preventivo-heading" className="text-3xl font-bold text-teal-700 mb-6">
                    Nuestros Servicios Especializados
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Ofrecemos un servicio técnico integral diseñado para extender la vida útil 
                      de tus equipos dentales, minimizando el riesgo de fallas y reduciendo los costos de reparación.
                    </p>
                    <p>
                      Con inspecciones regulares, limpieza profunda y ajustes precisos, nuestro equipo de técnicos 
                      certificados mantendrá tu práctica en óptimas condiciones, garantizando un rendimiento 
                      confiable y seguro.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Beneficios */}
          <section className="mb-20 bg-white rounded-2xl shadow-xl p-8 md:p-12" aria-labelledby="beneficios-heading">
            <div className="text-center mb-10">
              <h2 id="beneficios-heading" className="text-3xl font-bold text-gray-900 mb-4">
                Beneficios de Nuestro Servicio
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Confía en nuestra experiencia para mantener tu consultorio operativo
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg hover:bg-teal-50 transition-colors"
                >
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Contacto */}
          <section className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  ¿Necesitas Servicio Técnico?
                </h2>
                <p className="text-xl text-white/95">
                  Contáctanos para programar una cita o solicitar asistencia técnica inmediata
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <a 
                  href={`tel:${CONTACT.PHONE.FORMATTED}`}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-colors group"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-semibold">Llámanos</p>
                    <p className="text-white text-lg font-bold">{CONTACT.PHONE.MAIN}</p>
                  </div>
                </a>
                <a 
                  href={`mailto:${CONTACT.EMAIL.MAIN}`}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-colors group"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-semibold">Escríbenos</p>
                    <p className="text-white text-lg font-bold">{CONTACT.EMAIL.MAIN}</p>
                  </div>
                </a>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={WHATSAPP_URLS.SERVICIO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-500"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp Servicio Técnico
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  )
}

export default ServiceTechnical
