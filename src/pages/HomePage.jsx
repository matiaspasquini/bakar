import React from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import HeroSlider from "../components/HeroSlider";
import SeccionHome from "../components/SeccionHome";
import PopupModal from "../components/PopupModal";
import CierreCTA from "../components/CierreCTA";

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

export default function HomePage() {
  return (
    <>
      <PopupModal />
      <HeroSlider />

      {/* Manifiesto */}
      <section className="contenedor pt-24 md:pt-40 pb-8">
        <motion.div
          className="grid md:grid-cols-12 gap-8"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.p variants={fadeUp} className="rotulo md:col-span-3 pt-3">
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

      <CierreCTA titulo="Hacemos diseños de cocinas y vestidores a medida." />
    </>
  );
}
