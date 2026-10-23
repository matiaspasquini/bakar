import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Foto from "./Foto";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";

export default function SeccionHome({ titulo, texto, link, fotos }) {
  const columnas = fotos.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <section className="py-16 md:py-24 text-center">
      <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={VIEWPORT}>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          {titulo}
        </motion.h2>
        <motion.p variants={fadeUp} className="text-gray-500 max-w-2xl mx-auto mb-3 px-4">
          {texto}
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link to={link} className="group inline-flex items-center gap-1 font-medium mb-10 md:mb-14">
            <span className="link-linea activo">+ info</span>
            <span className="flecha" aria-hidden>→</span>
          </Link>
        </motion.div>
      </motion.div>

      <div className={`grid grid-cols-1 ${columnas} gap-4 px-2 sm:px-4`}>
        {fotos.map((src, index) => (
          <Link key={src} to={link} className="group block" tabIndex={-1} aria-hidden>
            <Foto
              src={src}
              alt=""
              className="aspect-[3/2]"
              delay={index * 0.12}
              hoverZoom
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
