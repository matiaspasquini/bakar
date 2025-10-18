import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
  const [previous, setPrevious] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setPrevious(current);
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timeoutRef.current);
  }, [current, images.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Imagen anterior con fade-out */}
      {previous !== null && (
        <motion.img
          key={`prev-${previous}`}
          src={images[previous]}
          alt="previous"
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1 }}
          onAnimationComplete={() => setPrevious(null)} // limpia la anterior al terminar
        />
      )}

      {/* Imagen actual con fade-in */}
      <motion.img
        key={`curr-${current}`}
        src={images[current]}
        alt="hero"
        className="absolute w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Botones */}
      <button
        onClick={() => {
          setPrevious(current);
          setCurrent((current - 1 + images.length) % images.length);
        }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-3 py-2 z-10"
      >
        ‹
      </button>
      <button
        onClick={() => {
          setPrevious(current);
          setCurrent((current + 1) % images.length);
        }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-3 py-2 z-10"
      >
        ›
      </button>
    </div>
  );
}
