import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EASE_OUT, fadeUp, stagger, VIEWPORT } from "../lib/motion";

// Banda oscura de cierre con llamado a cotizar.
export default function CierreCTA({ titulo = "Diseñamos y fabricamos tu proyecto a medida." }) {
  return (
    <section className="bg-[#111] text-white">
      <motion.div
        className="contenedor py-24 md:py-36 grid md:grid-cols-12 gap-10 items-end"
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        <div className="md:col-span-8">
          <motion.p variants={fadeUp} className="rotulo text-white/40 mb-6">
            Tu proyecto
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.04em] leading-[1]"
              variants={{ hidden: { y: "100%" }, show: { y: 0, transition: { duration: 1, ease: EASE_OUT } } }}
            >
              {titulo}
            </motion.h2>
          </div>
        </div>
        <motion.div variants={fadeUp} className="md:col-span-4 md:justify-self-end flex flex-col gap-4">
          <Link
            to="/contacto"
            className="presionable group inline-flex items-center justify-between gap-6 bg-white text-black px-7 py-4 text-sm uppercase tracking-[0.2em] hover:bg-gray-200 transition-[transform,background-color] duration-300"
          >
            Pedí tu cotización
            <span className="flecha" aria-hidden>→</span>
          </Link>
          <a
            href="https://wa.me/5493884723621"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center justify-between gap-6 border border-white/25 px-7 py-4 text-sm uppercase tracking-[0.2em] hover:border-white transition-colors duration-300"
          >
            Escribinos por WhatsApp
            <span className="flecha" aria-hidden>→</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
