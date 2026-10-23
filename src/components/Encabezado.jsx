import React from "react";
import { Link } from "react-router-dom";

// Título de página con migas: [{ label, to }] y el título actual.
export default function Encabezado({ migas = [], titulo, bajada }) {
  return (
    <header className="mb-10 md:mb-14">
      {migas.length > 0 && (
        <nav aria-label="Ubicación" className="text-sm text-gray-500 mb-3">
          {migas.map((m) => (
            <span key={m.to}>
              <Link to={m.to} className="hover:text-black transition-colors">
                {m.label}
              </Link>
              <span className="mx-2">/</span>
            </span>
          ))}
          <span className="text-black">{titulo}</span>
        </nav>
      )}
      <h1 className="text-3xl md:text-4xl font-light">{titulo}</h1>
      <div className="w-10 h-[2px] bg-black mt-4" />
      {bajada && <p className="text-gray-500 mt-4 max-w-2xl">{bajada}</p>}
    </header>
  );
}
