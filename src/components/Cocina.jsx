import React from "react";
import cocina from '../assets/cocinahome.jpg'
import cocina1 from '../assets/cocinahome1.jpg'
import cocina2 from '../assets/cocinahome2.jpg'


export default function CocinaHomeSection() {
  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-semibold mb-4">Cocinas</h2>
      <p className="text-gray-500 max-w-2xl mx-auto mb-2">
        Nuestros amoblamientos combinan el uso de nobles materiales y un estricto control de calidad,<br />
        con la funcionalidad y estética que nos caracteriza como marca.
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
          src={cocina1}
          alt="Cocina 2"
          className="w-full h-auto object-cover"
        />
        <img
          src={cocina2}
          alt="Cocina 3"
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
}

