import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layout/Layout'
import Image from 'next/image'

const ServiceTechnical: NextPage = () => {
    return (
        <Layout>
        <Head>
            <title>Servicio Técnico - DentalPro Supplies</title>
            <meta name="description" content="Mantenimiento, reparación y calibración de equipos dentales. Tu práctica en buenas manos con nuestro servicio técnico especializado" />
        </Head>
    
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-[#0f7d80] mb-8 text-center">Servicio Técnico Especializado</h1>
            
            {/* Mantenimiento Preventivo */}
            <section className="mb-16">
            <h2 className="text-3xl font-semibold text-[#0f7d80] mb-4">Mantenimiento Preventivo</h2>
            <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <Image src="/images/preventive-maintenance.jpg" alt="Mantenimiento Preventivo DentalPro" width={500} height={300} className="rounded-lg shadow-lg" />
                </div>
                <div className="md:w-1/2">
                <p className="text-[#888786] mb-4">Nuestro programa de mantenimiento preventivo está diseñado para extender la vida útil de tus equipos dentales, minimizando el riesgo de fallas y reduciendo los costos de reparación.</p>
                <p className="text-[#888786]">Con inspecciones regulares, limpieza profunda y ajustes precisos, nuestro equipo de técnicos certificados mantendrá tu práctica en óptimas condiciones, garantizando un rendimiento confiable y seguro.</p>
                </div>
            </div>
            </section>
    
            {/* Reparaciones y Actualizaciones */}
            <section className="mb-16 bg-[#f4f4f4] p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                <h2 className="text-3xl font-semibold text-[#0f7d80] mb-4">Reparaciones y Actualizaciones</h2>
                <p className="text-[#888786]">Nuestro equipo de técnicos altamente capacitados está listo para abordar cualquier problema que pueda surgir con tu equipo dental, desde reparaciones de emergencia hasta actualizaciones de software y calibración precisa.</p>
                </div>
                <div>
                <h2 className="text-3xl font-semibold text-[#0f7d80] mb-4">Servicio de Emergencia</h2>
                <p className="text-[#888786]">Entendemos que el tiempo de inactividad de tu equipo puede afectar tu práctica y tus pacientes. Por eso, ofrecemos un servicio de reparación de emergencia rápido y eficiente para minimizar interrupciones y mantener tu consultorio en funcionamiento.</p>
                </div>
            </div>
            </section>
    
            {/* Capacitación y Soporte */}
            <section className="mb-16">
            <h2 className="text-3xl font-semibold text-[#0f7d80] mb-4">Capacitación y Soporte</h2>
            <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pl-8">
                <Image src="/images/technical-support.jpg" alt="Soporte Técnico DentalPro" width={500} height={300} className="rounded-lg shadow-lg" />
                </div>
                <div className="md:w-1/2">
                <p className="text-[#888786] mb-4">Nuestro compromiso va más allá de la reparación de equipos. Ofrecemos capacitación detallada en el uso y mantenimiento de tus dispositivos, para que puedas aprovechar al máximo su potencial y garantizar su durabilidad a largo plazo.</p>
                <p className="text-[#888786]">Además, nuestro equipo de soporte técnico está disponible para responder a tus preguntas, resolver problemas y brindarte la asistencia que necesitas en cualquier momento.</p>
                </div>
            </div>
            </section>
    
            {/* Solicitar Servicio */}
            <section className="text-center">
            <h2 className="text-3xl font-semibold text-[#0f7d80] mb-4">¿Necesitas Servicio Técnico?</h2>
            <p className="text-[#888786] mb-8">Contáctanos para programar una cita o solicitar asistencia técnica. Nuestro equipo estará encantado de ayudarte a mantener tu práctica en óptimas condiciones.</p>
            <button className="bg-[#0f7d80] hover:bg-[#0a5c5e] text-white font-bold py-3 px-8 rounded-full transition duration-300">
                Solicitar Servicio Técnico
            </button>
            </section>
        </main>
        </Layout>
    )
}

export default ServiceTechnical