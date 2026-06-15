import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import {
  Award, Target, Eye, Shield, Users, Wrench, MapPin, Truck, ArrowRight,
} from 'lucide-react'

const About: NextPage = () => {
  const hechos = [
    { icon: Award, title: '+10 años', sub: 'de experiencia' },
    { icon: MapPin, title: '2 sucursales', sub: 'Carcelén y Valle' },
    { icon: Truck, title: 'Envío', sub: 'a todo el Ecuador' },
    { icon: Wrench, title: 'Servicio técnico', sub: 'propio y especializado' },
  ]

  const values = [
    {
      icon: Shield,
      title: 'Multimarca con respaldo',
      description: 'Trabajamos con marcas reconocidas y productos con respaldo sanitario.',
    },
    {
      icon: Users,
      title: 'Asesoría personalizada',
      description: 'Te ayudamos a elegir los insumos correctos para cada tratamiento.',
    },
    {
      icon: Award,
      title: '+10 años de experiencia',
      description: 'Más de una década atendiendo a profesionales de la salud dental.',
    },
    {
      icon: Wrench,
      title: 'Servicio técnico propio',
      description: 'Mantenimiento y reparación de tus equipos con técnicos especializados.',
    },
  ]

  return (
    <Layout
      title="Sobre Nosotros"
      description="Conoce Ansa Medic Dent: tienda multimarca de insumos odontológicos y médicos en Quito, con más de 10 años de experiencia, 2 sucursales y servicio técnico propio."
      keywords="sobre Ansa Medic Dent, empresa odontológica Quito, distribuidor insumos dentales Ecuador, servicio técnico dental"
      canonical="/about"
    >
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-teal-50">
        {/* Breadcrumb */}
        <nav className="container mx-auto px-4 py-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-teal-600 transition-colors">Inicio</Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li aria-current="page" className="text-gray-900 font-semibold">Sobre Nosotros</li>
          </ol>
        </nav>

        <main className="container mx-auto px-4 pb-16">
          {/* Encabezado */}
          <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-5 shadow-soft">
              <Award className="w-4 h-4" /> Quiénes somos
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Tu aliado dental en Quito
            </h1>
            <p className="text-lg text-gray-600">
              Tienda multimarca de insumos odontológicos y médicos, con asesoría
              cercana y servicio técnico especializado.
            </p>
          </header>

          {/* Franja de datos reales */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16" aria-label="Datos de la empresa">
            {hechos.map((h, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-soft border border-cream-200 p-5 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center mb-3">
                  <h.icon className="w-6 h-6 text-teal-600" aria-hidden="true" />
                </div>
                <div className="text-lg md:text-xl font-bold text-gray-900">{h.title}</div>
                <div className="text-xs md:text-sm text-gray-500">{h.sub}</div>
              </div>
            ))}
          </section>

          {/* Historia */}
          <section className="mb-16" aria-labelledby="historia-heading">
            <div className="bg-white rounded-5xl shadow-warm border border-cream-200 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 relative h-64 md:h-auto min-h-[300px]">
                  <Image
                    src="/images/servicio_tecnico/servicio_tecnico_1.jpeg"
                    alt="Equipo de Ansa Medic Dent"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="md:w-1/2 p-8 md:p-12">
                  <h2 id="historia-heading" className="text-2xl md:text-3xl font-bold text-teal-700 mb-6">Nuestra historia</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>Somos una tienda multimarca de insumos odontológicos y médicos dedicada a acompañar a los profesionales de la salud con productos de calidad y atención cercana.</p>
                    <p>Te damos la mejor asesoría al momento de adquirir tus insumos, respaldados por nuestra experiencia y conocimiento del sector.</p>
                    <p>Contamos con los productos y equipos de uso médico dental que necesitas, y un servicio técnico propio para mantenerlos siempre operativos.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Misión y Visión */}
          <section className="mb-16" aria-labelledby="mv-heading">
            <h2 id="mv-heading" className="sr-only">Misión y visión</h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <article className="bg-gradient-to-br from-teal-700 to-teal-600 rounded-5xl shadow-warm p-8 md:p-10 text-white">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                    <Target className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold">Misión</h3>
                </div>
                <p className="text-lg leading-relaxed text-white/95">
                  Proveer insumos médicos y dentales de calidad, con asesoría y
                  servicio técnico que ayuden a los profesionales de la salud a
                  brindar la mejor atención a sus pacientes.
                </p>
              </article>

              <article className="bg-white rounded-5xl shadow-warm p-8 md:p-10 border border-cream-200">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mr-4">
                    <Eye className="w-7 h-7 text-teal-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Visión</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Ser un referente confiable en la distribución de insumos
                  odontológicos y médicos en Quito y el Ecuador, reconocidos por
                  nuestra calidad, cercanía y compromiso con cada cliente.
                </p>
              </article>
            </div>
          </section>

          {/* Valores */}
          <section className="mb-16" aria-labelledby="valores-heading">
            <div className="text-center mb-10">
              <h2 id="valores-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Por qué elegirnos</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Lo que nos diferencia al atenderte</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <article key={index} className="bg-white rounded-3xl shadow-soft hover:shadow-warm border border-cream-200 p-6 transition-shadow duration-300">
                    <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-teal-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </article>
                )
              })}
            </div>
          </section>

          {/* Servicio técnico */}
          <section className="mb-16 bg-white rounded-5xl shadow-warm border border-cream-200 overflow-hidden" aria-labelledby="servicio-heading">
            <div className="flex flex-col md:flex-row-reverse">
              <div className="md:w-1/2 relative h-64 md:h-auto min-h-[300px]">
                <Image
                  src="/images/servicio_tecnico/servicio_tecnico_2.jpeg"
                  alt="Servicio técnico especializado"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 id="servicio-heading" className="text-2xl md:text-3xl font-bold text-teal-700 mb-6">Servicio técnico especializado</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed mb-6">
                  <p>Sabemos que un equipo detenido cuesta tiempo y dinero. Por eso ofrecemos un servicio técnico cercano y especializado para tus equipos dentales.</p>
                  <ul className="space-y-2">
                    {['Mantenimiento preventivo programado','Reparación de autoclaves, compresores y piezas de mano','Calibración e instalación de unidades dentales','Repuestos de buena calidad'].map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <Wrench className="w-4 h-4 text-teal-600 mt-1 flex-shrink-0" aria-hidden="true" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/service_technical" className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition-colors">
                  Conocer el servicio técnico
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-teal-700 to-teal-600 rounded-5xl shadow-warm-lg p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">¿Conversamos?</h2>
            <p className="text-lg mb-8 text-white/95 max-w-2xl mx-auto">
              Cuéntanos qué necesitas para tu consultorio y te asesoramos sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/products" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-teal-700 font-bold rounded-full hover:bg-teal-50 transition-all duration-300 shadow-warm">
                Ver catálogo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-bold rounded-full border-2 border-white/70 hover:border-white transition-all duration-300">
                Contáctanos
              </Link>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  )
}

export default About
