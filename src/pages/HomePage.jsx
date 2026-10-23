import React from "react";
import { motion } from "framer-motion";
import { fadeUp, VIEWPORT } from "../lib/motion";
import HeroSlider from "../components/HeroSlider";
import SeccionHome from "../components/SeccionHome";
import PopupModal from "../components/PopupModal";

import cocina from "../assets/cocinahome.webp";
import cocina1 from "../assets/cocinahome1.webp";
import cocina2 from "../assets/cocinahome2.webp";
import vestidor from "../assets/mobiliario/vestidores/vestidor.webp";
import vestidor1 from "../assets/mobiliario/vestidores/vestidor1.webp";

export default function HomePage() {
  return (
    <>
      <PopupModal />
      <HeroSlider />
      <SeccionHome
        titulo="Cocinas"
        texto="Nuestros amoblamientos combinan el uso de nobles materiales y un estricto control de calidad, con la funcionalidad y estética que nos caracteriza como marca."
        link="/mobiliario/cocina"
        fotos={[cocina, cocina1, cocina2]}
      />
      <SeccionHome
        titulo="Vestidores"
        texto="Diseños de vanguardia e interiores completos para tener cada cosa en su lugar."
        link="/mobiliario/vestidores"
        fotos={[vestidor, vestidor1]}
      />
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="text-xl sm:text-3xl font-semibold tracking-tight text-center px-4 pb-24"
      >
        Hacemos diseños de cocinas y vestidores a medida
      </motion.p>
    </>
  );
}
