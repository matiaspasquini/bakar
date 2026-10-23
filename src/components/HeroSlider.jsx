import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useMediaQuery from "../hook/useMediaQuery";
import { EASE_OUT } from "../lib/motion";

// Imágenes para desktop
import cocina from "../assets/cocina.webp";
import cabildo from "../assets/cabildo.webp";
import escritorio from "../assets/escritorio.webp";

// Imágenes para mobile
import cocinaMobile from "../assets/mobiliario/cocina/cocina2.webp";
import cabildoMobile from "../assets/mobiliario/oficinas/oficinas1.webp";
import escritorioMobile from "../assets/mobiliario/cocina/cocina.webp";

const INTERVALO = 6000; // ms que se queda cada foto

export default function HeroSlider() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const reducir = useReducedMotion();
  const images = isMobile
    ? [cabildoMobile, escritorioMobile, cocinaMobile]
    : [cabildo, escritorio, cocina];

  const [current, setCurrent] = useState(0);
  const [pausado, setPausado] = useState(false);
  const ir = (paso) => setCurrent((c) => (c + paso + images.length) % images.length);

  // Se reinicia en cada cambio, así un click manual no se pisa con el automático.
  // Con la pestaña oculta no avanza.
  useEffect(() => {
    if (pausado) return;
    const id = setTimeout(() => ir(1), INTERVALO);
    return () => clearTimeout(id);
  }, [current, images.length, pausado]);

  useEffect(() => {
    const onVis = () => setPausado(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Al scrollear, la foto se queda un poco atrás y se oscurece: el contenido "pasa por encima"
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reducir ? "0%" : "25%"]);
  const velo = useTransform(scrollYProgress, [0, 1], [0, 0.35]);

  return (
    <motion.section
      ref={ref}
      className="relative w-full h-[100svh] overflow-hidden bg-[#ece9e4] touch-pan-y"
      aria-label="Proyectos destacados"
      // Swipe en el celular
      onPanEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 50 || Math.abs(info.velocity.x) > 400) ir(info.offset.x < 0 ? 1 : -1);
      }}
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={images[current]}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            {/* Zoom lento mientras la foto está en pantalla (Ken Burns) */}
            <motion.img
              src={images[current]}
              alt=""
              fetchpriority={current === 0 ? "high" : undefined}
              draggable={false}
              className="w-full h-full object-cover select-none"
              initial={reducir ? false : { scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: (INTERVALO + 1200) / 1000, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: velo }} />
      {/* Degradado suave abajo para que el indicador se lea sobre cualquier foto */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/15 to-transparent pointer-events-none" />

      <motion.button
        onClick={() => ir(-1)}
        aria-label="Foto anterior"
        className="presionable absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-white/50 text-white backdrop-blur-sm bg-black/10 hover:bg-white hover:text-black transition-[transform,background-color,color] duration-300 hidden sm:flex items-center justify-center"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.6 }}
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>
      <motion.button
        onClick={() => ir(1)}
        aria-label="Foto siguiente"
        className="presionable absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-white/50 text-white backdrop-blur-sm bg-black/10 hover:bg-white hover:text-black transition-[transform,background-color,color] duration-300 hidden sm:flex items-center justify-center"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.6 }}
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>

      {/* Leyenda editorial abajo a la izquierda */}
      <motion.div
        className="absolute left-5 md:left-12 bottom-8 md:bottom-12 z-10 text-white max-w-xl pointer-events-none"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE_OUT, delay: 0.4 }}
      >
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/70 mb-3">Bakar — Jujuy</p>
        <h1 className="text-4xl md:text-6xl font-light tracking-[-0.03em] leading-[1]">
          Carpintería
          <br />a medida
        </h1>
      </motion.div>

      {/* Contador + indicador tipo "historias": cada barra se llena mientras dura su foto */}
      <div className="absolute right-5 md:right-12 bottom-8 md:bottom-12 flex items-center gap-4 z-10 text-white">
        <span className="text-[11px] tracking-[0.25em] tabular-nums">
          {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setCurrent(i)}
            aria-label={`Ir a la foto ${i + 1}`}
            aria-current={i === current}
            className="py-3"
          >
            <span className="block h-[2px] w-6 md:w-10 bg-white/35 overflow-hidden">
              <span
                key={i === current ? `${current}-${pausado}` : "x"}
                className="block h-full bg-white origin-left"
                style={{
                  transform: i < current ? "scaleX(1)" : "scaleX(0)",
                  animation:
                    i === current && !pausado ? `llenar ${INTERVALO}ms linear forwards` : undefined,
                }}
              />
            </span>
          </button>
        ))}
        </div>
      </div>
    </motion.section>
  );
}
