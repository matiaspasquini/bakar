import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EASE_OUT, fadeUp, stagger, VIEWPORT } from "../lib/motion";
import HeroSlider from "../components/HeroSlider";
import SeccionHome from "../components/SeccionHome";
import PopupModal from "../components/PopupModal";

import cocina from "../assets/cocinahome.webp";
import cocina1 from "../assets/cocinahome1.webp";
import cocina2 from "../assets/cocinahome2.webp";
import vestidor from "../assets/mobiliario/vestidores/vestidor.webp";
import vestidor1 from "../assets/mobiliario/vestidores/vestidor1.webp";

// Datos que ya cuenta la página Nosotros
const hitos = [
  { dato: "Fabricación propia", detalle: "Diseño, taller e instalación" },
  { dato: "Premio FADEA 2023", detalle: "Por nuestras escaleras" },
  { dato: "Jujuy · Asunción", detalle: "Primer proyecto internacional en 2024" },
];

const label = "text-[11px] uppercase tracking-[0.3em] text-gray-400";

export default function HomePage() {
  return (
    <>
      <PopupModal />
      <HeroSlider />

      {/* Manifiesto */}
      <section className="px-5 md:px-12 pt-24 md:pt-40 pb-8 max-w-[1500px] mx-auto">
        <motion.div
          className="grid md:grid-cols-12 gap-8"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p variants={fadeUp} className={`${label} md:col-span-3 pt-3`}>
            Carpintería a medida — Jujuy
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="md:col-span-9 text-3xl md:text-5xl lg:text-6xl font-light tracking-[-0.03em] leading-[1.1]"
          >
            Diseñamos, fabricamos e instalamos muebles y puertas a medida,{" "}
            <span className="text-gray-400">con un equipo técnico comprometido con la calidad en cada detalle.</span>
          </motion.h2>
        </motion.div>

        <motion.dl
          className="grid sm:grid-cols-3 mt-20 md:mt-28 border-t border-gray-200"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {hitos.map(({ dato, detalle }, i) => (
            <motion.div
              key={dato}
              variants={fadeUp}
              className={`pt-6 pb-2 sm:pr-8 ${i > 0 ? "sm:pl-8 sm:border-l border-gray-200" : ""}`}
            >
              <dt className="text-xl md:text-2xl font-light tracking-tight">{dato}</dt>
              <dd className="text-sm text-gray-500 mt-1">{detalle}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </section>

      <SeccionHome
        indice="01"
        titulo="Cocinas"
        texto="Nuestros amoblamientos combinan el uso de nobles materiales y un estricto control de calidad, con la funcionalidad y estética que nos caracteriza como marca."
        link="/mobiliario/cocina"
        linkTexto="Ver cocinas"
        fotos={[cocina1, cocina2, cocina]}
        nota="Cada cocina se diseña para el espacio y la forma de vivir de quien la usa."
      />
      <SeccionHome
        indice="02"
        titulo="Vestidores"
        texto="Diseños de vanguardia e interiores completos para tener cada cosa en su lugar."
        link="/mobiliario/vestidores"
        linkTexto="Ver vestidores"
        fotos={[vestidor1, vestidor]}
        invertido
      />

      {/* Cierre */}
      <section className="bg-[#111] text-white">
        <motion.div
          className="px-5 md:px-12 py-24 md:py-36 max-w-[1500px] mx-auto grid md:grid-cols-12 gap-10 items-end"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <div className="md:col-span-8">
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-6">
              Tu proyecto
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.04em] leading-[1]"
                variants={{ hidden: { y: "100%" }, show: { y: 0, transition: { duration: 1, ease: EASE_OUT } } }}
              >
                Hacemos diseños de cocinas y vestidores a medida.
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
    </>
  );
}
