import React from "react";
import { Link } from "react-router-dom";

export default function SeccionHome({ titulo, texto, link, fotos }) {
  const columnas = fotos.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <section className="py-16 md:py-20 text-center">
      <h2 className="text-3xl font-semibold mb-4">{titulo}</h2>
      <p className="text-gray-500 max-w-2xl mx-auto mb-3 px-4">{texto}</p>
      <Link
        to={link}
        className="inline-block text-black font-medium underline underline-offset-4 mb-10 md:mb-12 hover:opacity-70 transition"
      >
        + info
      </Link>

      <div className={`grid grid-cols-1 ${columnas} gap-4 px-2 sm:px-4`}>
        {fotos.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`${titulo} — foto ${index + 1}`}
            loading="lazy"
            decoding="async"
            className="w-full aspect-[3/2] object-cover bg-gray-100"
          />
        ))}
      </div>
    </section>
  );
}
