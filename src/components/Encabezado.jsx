import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EASE_OUT, fadeUp, stagger } from "../lib/motion";

// Título de página con migas: [{ label, to }] y el título actual.
export default function Encabezado({ migas = [], titulo, bajada }) {
  return (
    <motion.header className="mb-10 md:mb-14" variants={stagger(0.08, 0.1)} initial="hidden" animate="show">
      {migas.length > 0 && (
        <motion.nav variants={fadeUp} aria-label="Ubicación" className="text-sm text-gray-500 mb-3">
          {migas.map((m) => (
            <span key={m.to}>
              <Link to={m.to} className="link-linea hover:text-black transition-colors">
                {m.label}
              </Link>
              <span className="mx-2">/</span>
            </span>
          ))}
          <span className="text-black">{titulo}</span>
        </motion.nav>
      )}

      {/* El título sube desde atrás de una máscara */}
      <div className="overflow-hidden pb-1">
        <motion.h1
          className="text-3xl md:text-5xl font-light tracking-tight"
          variants={{
            hidden: { y: "105%" },
            show: { y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
          }}
        >
          {titulo}
        </motion.h1>
      </div>

      {/* La línea se dibuja */}
      <motion.div
        className="w-10 h-[2px] bg-black mt-4 origin-left"
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { duration: 0.6, ease: EASE_OUT } },
        }}
      />

      {bajada && (
        <motion.p variants={fadeUp} className="text-gray-500 mt-4 max-w-2xl">
          {bajada}
        </motion.p>
      )}
    </motion.header>
  );
}
