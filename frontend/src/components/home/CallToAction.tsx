import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const CallToAction = () => {
  return (
    <section className="bg-teal-600 py-20 px-4">
      <div className="max-w-3xl mx-auto text-center text-white">
        <h2 className="text-3xl font-semibold mb-6">¿Listo para elevar tu práctica dental?</h2>
        <p className="text-xl mb-8">Descubre cómo nuestros productos, servicio técnico y programas educativos pueden transformar tu consultorio.</p>
        <button className="bg-white text-teal-600 hover:bg-teal-100 font-bold py-3 px-8 rounded-full transition duration-300 flex items-center justify-center mx-auto">
          Contáctanos Hoy
          <FaArrowRight className="ml-2" />
        </button>
      </div>
    </section>
  );
};

export default CallToAction;