import React from "react";
import cocina from '../assets/cocina.jpg'


export default function CocinaHomeSection() {
  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-semibold mb-4">Vestidores</h2>
      <p className="text-gray-500 max-w-2xl mx-auto mb-2">
            Diseños de vanguardia e interiores completos para tener cada cosa en su lugar.
      </p>
      <p className="text-black font-medium underline mb-12 cursor-pointer hover:opacity-70 transition">
        + info
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2 sm:px-4">
        <img
          src={cocina}
          alt="Cocina 1"
          className="w-full h-auto object-cover"
        />
        <img
          src={cocina}
          alt="Cocina 2"
          className="w-full h-auto object-cover"
        />
        <img
          src={cocina}
          alt="Cocina 3"
          className="w-full h-auto object-cover"
        />
      </div>
            <h2 className="text-3xl pt-6 font-semibold mb-4"> Hacemos diseños de cocinas y vestidores a medida</h2>
    </section>
  );
}
