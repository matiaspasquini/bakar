import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Foto from "./Foto";
import Cota from "./Cota";
import { EASE_OUT, fadeUp, stagger, VIEWPORT } from "../lib/motion";
import useMediaQuery from "../hook/useMediaQuery";

// Sección editorial de la home: número de índice, título grande, texto en una
// columna angosta y las fotos en una grilla asimétrica (una protagonista y las
// demás más chicas, desfasadas). "invertido" espeja la composición.
export default function SeccionHome({ indice, titulo, texto, link, linkTexto, fotos, nota, invertido = false }) {
  const [principal, secundaria, tercera] = fotos;
  const ref = useRef(null);
  const reducir = useReducedMotion();
  const esDesktop = useMediaQuery("(min-width: 768px)");

  // La foto chica se desplaza un poco más lento que el resto: da profundidad
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yChica = useTransform(scrollYProgress, [0, 1], reducir || !esDesktop ? [0, 0] : [60, -60]);

  return (
    <section ref={ref} className="px-5 md:px-12 py-20 md:py-36 max-w-[1500px] mx-auto">
      {/* Encabezado */}
      <motion.div
        className={`grid md:grid-cols-12 gap-6 md:gap-8 items-end mb-12 md:mb-20 ${invertido ? "md:text-right" : ""}`}
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        <div className={`md:col-span-7 ${invertido ? "md:order-last md:col-start-6" : ""}`}>
          <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.3em] text-gray-400 mb-5">
            {indice} — Mobiliario a medida
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              className="text-6xl md:text-8xl lg:text-9xl font-light tracking-[-0.04em] leading-[0.9]"
              variants={{ hidden: { y: "100%" }, show: { y: 0, transition: { duration: 1, ease: EASE_OUT } } }}
            >
              {titulo}
            </motion.h2>
          </div>
        </div>
        <motion.div
          variants={fadeUp}
          className={`md:col-span-4 ${invertido ? "md:col-start-1 md:text-left" : "md:col-start-9"}`}
        >
          <p className="text-gray-600 leading-relaxed mb-6">{texto}</p>
          <Link to={link} className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em]">
            <span className="link-linea">{linkTexto}</span>
            <span className="flecha" aria-hidden>→</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Fotos */}
      <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-8">
        <Link
          to={link}
          aria-label={`Ver ${titulo.toLowerCase()}`}
          className={`group col-span-2 md:col-span-8 ${invertido ? "md:col-start-5 md:row-start-1" : ""}`}
        >
          <Foto src={principal} alt={`${titulo} — proyecto destacado`} className="aspect-[4/3] md:aspect-[3/2]" hoverZoom />
        </Link>

        {secundaria && (
          <motion.div
            style={{ y: yChica }}
            className={`${tercera ? "col-span-1" : "col-span-2"} md:col-span-3 md:self-end ${
              invertido ? "md:col-start-1 md:row-start-1" : "md:col-start-10"
            }`}
          >
            <Link to={link} tabIndex={-1} aria-hidden className="group block">
              <Foto src={secundaria} alt="" className={`${tercera ? "aspect-[3/4]" : "aspect-[4/3]"} md:aspect-[3/4]`} delay={0.15} hoverZoom />
            </Link>
          </motion.div>
        )}

        {tercera && (
          <>
            <Link
              to={link}
              tabIndex={-1}
              aria-hidden
              className="group col-span-1 md:col-span-5 md:col-start-2 md:mt-8"
            >
              <Foto src={tercera} alt="" className="aspect-[3/4] md:aspect-[4/3]" delay={0.1} hoverZoom />
            </Link>
            {nota && (
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
                className="hidden md:block md:col-span-4 md:col-start-8 self-center text-2xl lg:text-3xl font-light leading-snug tracking-tight text-gray-800"
              >
                {nota}
              </motion.p>
            )}
          </>
        )}
      </div>

      <Cota className="mt-16 md:mt-24">{`${indice} / 02`}</Cota>
    </section>
  );
}
