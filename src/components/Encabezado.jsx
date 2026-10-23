import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EASE_OUT, fadeUp, stagger } from "../lib/motion";

// Encabezado editorial de página: migas [{ label, to }], rótulo chico,
// título grande y la bajada en una columna angosta a la derecha.
export default function Encabezado({ migas = [], rotulo, titulo, bajada }) {
  return (
    <motion.header
      className="grid md:grid-cols-12 gap-6 md:gap-8 items-end mb-14 md:mb-24"
      variants={stagger(0.08, 0.1)}
      initial="hidden"
      animate="show"
    >
      <div className="md:col-span-8">
        {(migas.length > 0 || rotulo) && (
          <motion.nav variants={fadeUp} aria-label="Ubicación" className="rotulo mb-5">
            {migas.map((m) => (
              <span key={m.to}>
                <Link to={m.to} className="link-linea hover:text-black transition-colors">
                  {m.label}
                </Link>
                <span className="mx-3">—</span>
              </span>
            ))}
            {rotulo}
          </motion.nav>
        )}

        {/* El título sube desde atrás de una máscara */}
        <div className="overflow-hidden pb-2">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-[-0.04em] leading-[0.95]"
            variants={{ hidden: { y: "105%" }, show: { y: 0, transition: { duration: 1, ease: EASE_OUT } } }}
          >
            {titulo}
          </motion.h1>
        </div>
      </div>

      {bajada && (
        <motion.p variants={fadeUp} className="md:col-span-4 md:col-start-9 text-gray-600 leading-relaxed">
          {bajada}
        </motion.p>
      )}
    </motion.header>
  );
}
