import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { Award, Target, Eye, Shield, Users, Heart } from 'lucide-react'

const About: NextPage = () => {
  const values = [
    {
      icon: Shield,
      title: 'Calidad Garantizada',
      description: 'Productos de las mejores marcas internacionales con certificaciones sanitarias'
    },
    {
      icon: Users,
      title: 'Servicio Personalizado',
      description: 'Atención especializada y asesoría profesional para cada cliente'
    },
    {
      icon: Award,
      title: 'Experiencia Comprobada',
      description: 'Años de experiencia sirviendo a profesionales de la salud dental'
    },
    {
      icon: Heart,
      title: 'Compromiso Social',
      description: 'Contribuyendo a mejorar la salud dental en nuestra comunidad'
    }
  ]

  return (
    <Layout 
      title="Acerca de Nosotros - Nuestra Historia y Valores"
      description="Conoce Ansa Medic Dent, distribuidor líder con más de 10 años de experiencia en insumos odontológicos y médicos en Ecuador. Misión, visión y valores."
      keywords="sobre Ansa Medic Dent, empresa odontológica Ecuador, historia empresa dental, distribuidor insumos médicos Quito, valores empresa dental"
      canonical="/about"
    >
      <Head>
        <title>Acerca de Nosotros - Ansa Medic Dent</title>
        <meta name="description" content="Conoce la historia, misión y valores de Ansa Medic Dent, tu aliado confiable en insumos odontológicos y servicio técnico especializado en Ecuador" />
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
            <li aria-current="page" className="text-gray-900 font-semibold">Acerca de Nosotros</li>
          </ol>
        </nav>

        <main className="container mx-auto px-4 py-12">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Acerca de Ansa Medic-Dent
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tu aliado confiable en insumos odontológicos y servicio técnico especializado en Ecuador
            </p>
          </header>

          {/* Historia */}
          <section className="mb-20" aria-labelledby="historia-heading">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 relative h-64 md:h-auto min-h-[300px]">
                  <Image 
                    src="https://placehold.co/800x600/0d9488/ffffff?text=Nuestra+Historia" 
                    alt="Equipo profesional de Ansa Medic Dent" 
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="md:w-1/2 p-8 md:p-12">
                  <h2 id="historia-heading" className="text-3xl font-bold text-teal-700 mb-6">
                    Nuestra Historia
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Somos una tienda multimarca de insumos odontológicos y médicos dedicada a servir 
                      a los profesionales de la salud con excelencia y compromiso.
                    </p>
                    <p>
                      Podemos brindarte la mejor asesoría al momento de adquirir tus insumos para tus 
                      tratamientos, respaldados por nuestra amplia experiencia y conocimiento del sector.
                    </p>
                    <p>
                      Contamos con todos los productos y equipos de uso médico dental que nuestros clientes 
                      necesitan, siempre comprometidos en brindar un servicio de excelente calidad.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Misión y Visión */}
          <section className="mb-20" aria-labelledby="mision-vision-heading">
            <h2 id="mision-vision-heading" className="sr-only">Misión y Visión</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <article className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl shadow-xl p-8 md:p-10 text-white">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <Target className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold">Nuestra Misión</h3>
                </div>
                <p className="text-lg leading-relaxed text-white/95">
                  Proveer insumos médicos y dentales de alta calidad que contribuyan a la salud y bienestar 
                  de nuestros clientes. Nos comprometemos a ofrecer productos innovadores y un servicio 
                  excepcional, ayudando a profesionales de la salud a brindar la mejor atención a sus pacientes.
                </p>
              </article>
              
              <article className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border-2 border-teal-100">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mr-4">
                    <Eye className="w-8 h-8 text-teal-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Nuestra Visión</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Ser la empresa líder en la distribución de insumos médicos y dentales en Ecuador, 
                  reconocida por nuestra calidad, innovación y compromiso con la satisfacción del cliente. 
                  Aspiramos a ser un aliado estratégico para los profesionales de la salud.
                </p>
              </article>
            </div>
          </section>

          {/* Valores */}
          <section className="mb-20" aria-labelledby="valores-heading">
            <div className="text-center mb-12">
              <h2 id="valores-heading" className="text-3xl font-bold text-gray-900 mb-4">
                Nuestros Valores
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Los principios que guían cada una de nuestras acciones
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <article 
                    key={index}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                  >
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-teal-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Servicio Técnico */}
          <section className="mb-20 bg-white rounded-2xl shadow-xl overflow-hidden" aria-labelledby="servicio-heading">
            <div className="flex flex-col md:flex-row-reverse">
              <div className="md:w-1/2 relative h-64 md:h-auto min-h-[300px]">
                <Image 
                  src="https://placehold.co/600x400/0d9488/ffffff?text=Servicio+T%C3%A9cnico" 
                  alt="Servicio técnico especializado" 
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 id="servicio-heading" className="text-3xl font-bold text-teal-700 mb-6">
                  Servicio Técnico Especializado
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed mb-6">
                  <p>
                    En Ansa Medic-Dent, entendemos que el tiempo de inactividad de tu equipo puede ser costoso. 
                    Por eso, ofrecemos un servicio técnico rápido, eficiente y altamente especializado.
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4" role="list">
                    <li>Mantenimiento preventivo programado</li>
                    <li>Reparaciones de emergencia</li>
                    <li>Calibración y actualizaciones de equipos odontológicos</li>
                    <li>Capacitación en el uso y cuidado del equipo</li>
                  </ul>
                </div>
                <Link href="/service_technical" className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                  Conocer más sobre nuestro servicio
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Únete a la Familia Ansa Medic-Dent
            </h2>
            <p className="text-xl mb-8 text-white/95 max-w-2xl mx-auto">
              Descubre cómo podemos ayudarte a llevar tu práctica dental al siguiente nivel.
            </p>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white text-teal-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-600">
              Contáctanos Hoy
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </section>
        </main>
      </div>
    </Layout>
  )
}

export default About