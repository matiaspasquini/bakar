import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-24 text-center">
      <p className="text-6xl font-extralight text-gray-300">404</p>
      <h1 className="text-2xl font-light mt-4">No encontramos esta página</h1>
      <Link to="/" className="inline-block mt-8 link-linea activo">
        Volver al inicio
      </Link>
    </section>
  );
}
