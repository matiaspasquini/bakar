import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useMediaQuery from "../hook/useMediaQuery";

// Imágenes para desktop
import cocina from "../assets/cocina.webp";
import cabildo from "../assets/cabildo.webp";
import escritorio from "../assets/escritorio.webp";

// Imágenes para mobile
import cocinaMobile from "../assets/mobiliario/cocina/cocina2.webp";
import cabildoMobile from "../assets/mobiliario/oficinas/oficinas1.webp";
import escritorioMobile from "../assets/mobiliario/cocina/cocina.webp";

const INTERVALO = 5000;

export default function HeroSlider() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const images = isMobile
    ? [cabildoMobile, escritorioMobile, cocinaMobile]
    : [cabildo, escritorio, cocina];

  const [current, setCurrent] = useState(0);
  const ir = (paso) => setCurrent((c) => (c + paso + images.length) % images.length);

  // Se reinicia en cada cambio, así un click manual no se pisa con el automático
  useEffect(() => {
    const id = setTimeout(() => ir(1), INTERVALO);
    return () => clearTimeout(id);
  }, [current, images.length]);

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-gray-200" aria-label="Proyectos destacados">
      <AnimatePresence initial={false}>
        <motion.img
          key={images[current]}
          src={images[current]}
          alt=""
          fetchpriority={current === 0 ? "high" : undefined}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      <button
        onClick={() => ir(-1)}
        aria-label="Foto anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 z-10 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => ir(1)}
        aria-label="Foto siguiente"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 z-10 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setCurrent(i)}
            aria-label={`Ir a la foto ${i + 1}`}
            className={`h-[3px] w-8 transition-colors ${i === current ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
}
