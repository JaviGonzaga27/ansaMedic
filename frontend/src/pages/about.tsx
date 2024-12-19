import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout/Layout'

const About: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Acerca de Ansa Medic Dent - Tu Socio en Odontología</title>
        <meta name="description" content="Descubre la historia, misión y visión de Ansa Medic Dent, tu proveedor confiable de insumos odontológicos y servicio técnico especializado" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#0f7d80] mb-8 text-center">Acerca de Ansa Medic-Dent</h1>

        {/* Historia */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#0f7d80] mb-4">Nuestra Historia</h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <Image src="/images/dental-history.jpg" alt="Historia de DentalPro" width={500} height={300} className="rounded-lg shadow-lg" />
            </div>
            <div className="md:w-1/2">
              <p className="text-[#888786] mb-4">Fundada en 1995, DentalPro Supplies nació con la visión de revolucionar la industria de suministros dentales. Desde nuestros humildes inicios como una pequeña tienda local, hemos crecido hasta convertirnos en un líder nacional en la distribución de insumos odontológicos de alta calidad.</p>
              <p className="text-[#888786]">Somos una tienda multimarca de insumos odontológicos y médicos para los profesionales de la salud.
                Podemos brindarte la mejor asesoría al momento de adquirir tus insumos para tus tratamientos.
                Contamos con todos los productos y equipos de uso médico dental para nuestros clientes.
                Comprometidos siempre en brindar un servicio de excelente calidad.
              </p>
            </div>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="mb-16 bg-[#f4f4f4] p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-semibold text-[#0f7d80] mb-4">Nuestra Misión</h2>
              <p className="text-[#888786]">Proveer insumos médicos y dentales de alta calidad que contribuyan a la salud  y bienestar de nuestros clientes. Nos comprometemos a ofrecer productos innovadores y un servicio excepcional, ayudando a profesionales de la salud a brindar la mejor atención a sus pacientes.</p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-[#0f7d80] mb-4">Nuestra Visión</h2>
              <p className="text-[#888786]">Ser la empresa líder en la distribución de insumos médicos y dentales en nuestra región, reconocida por nuestra calidad, innovación y compromiso con la satisfacción del cliente. Aspiramos a ser un aliado estratégico para los profesionales de la salud, facilitando el acceso a productos de última generación que mejoren la atención sanitaria.</p>
            </div>
          </div>
        </section>

        {/* Servicio Técnico */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#0f7d80] mb-4">Servicio Técnico Especializado</h2>
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pl-8">
              <Image src="/images/technical-service.jpg" alt="Servicio Técnico DentalPro" width={500} height={300} className="rounded-lg shadow-lg" />
            </div>
            <div className="md:w-1/2">
              <p className="text-[#888786] mb-4">En Ansa Medic-Dent, entendemos que el tiempo de inactividad de su equipo puede ser costoso. Por eso, ofrecemos un servicio técnico rápido, eficiente y altamente especializado.</p>
              <ul className="list-disc list-inside text-[#888786] mb-4">
                <li>Mantenimiento preventivo programado</li>
                <li>Reparaciones de emergencia</li>
                <li>Calibración y actualizaciones de Equipos Odontoloógicos</li>
                <li>Capacitación en el uso y cuidado del equipo</li>
              </ul>
              <p className="text-[#888786]">Nuestro servicio técnico está disponible para asegurar que su práctica dental funcione sin problemas, permitiéndole concentrarse en lo que más importa: el cuidado de sus pacientes.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-[#0f7d80] text-white p-8 rounded-lg text-center">
          <h2 className="text-3xl font-semibold mb-4">Únete a la Familia Ansa Medic-Dent</h2>
          <p className="mb-6">Descubre cómo podemos ayudarte a llevar tu práctica dental al siguiente nivel.</p>
          <button className="bg-white text-[#0f7d80] font-bold py-2 px-6 rounded-full hover:bg-[#888786] hover:text-white transition duration-300">
            Contáctanos Hoy
          </button>
        </section>
      </main>
    </Layout>
  )
}

export default About