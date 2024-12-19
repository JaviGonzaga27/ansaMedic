import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <h2 className="text-3xl font-semibold mb-12 text-center text-teal-600">Lo que dicen nuestros clientes</h2>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">"DentalPro ha revolucionado mi práctica. Sus productos son de primera calidad y su servicio técnico es inigualable."</p>
            <p className="font-semibold text-teal-600">Dra. María Rodríguez</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">"Los webinars de educación continua son excelentes. Me mantienen actualizado sin salir de mi consultorio."</p>
            <p className="font-semibold text-teal-600">Dr. Carlos Mendoza</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;