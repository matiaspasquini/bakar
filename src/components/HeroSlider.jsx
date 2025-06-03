import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useMediaQuery from "../hook/useMediaQuery";

// Imágenes para desktop
import cocina from "../assets/cocina.jpg";
import cabildo from "../assets/cabildo.jpg";
import escritorio from "../assets/escritorio.jpg";

// Imágenes para mobile
import cocinaMobile from "../assets/mobiliario/cocina/cocina2.jpg";
import cabildoMobile from "../assets/mobiliario/oficinas/oficinas1.jpg";
import escritorioMobile from "../assets/mobiliario/cocina/cocina.jpg";

export default function HeroSlider() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const images = isMobile
    ? [cabildoMobile, escritorioMobile, cocinaMobile]
    : [cabildo, escritorio, cocina];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[current]}
          src={images[current]}
          alt="hero"
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      <button
        onClick={() => setCurrent((current - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-3 py-2"
      >
        ‹
      </button>
      <button
        onClick={() => setCurrent((current + 1) % images.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-3 py-2"
      >
        ›
      </button>
    </div>
  );
}
