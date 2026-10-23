import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT, EASE_IN_OUT, DUR, VIEWPORT } from "../lib/motion";

// Foto que se "abre" de abajo hacia arriba al entrar en pantalla,
// con un leve zoom que se asienta. Hasta que carga, se ve un fondo neutro
// y la imagen aparece con un fundido (nada de saltos de gris a foto).
export default function Foto({ src, alt, className = "", imgClassName = "", style, delay = 0, eager = false, hoverZoom = false }) {
  const [cargada, setCargada] = useState(false);
  const reducir = useReducedMotion();

  return (
    <motion.div
      className={`relative overflow-hidden bg-[#ece9e4] ${className}`}
      style={style}
      initial={reducir ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
      whileInView={reducir ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
      viewport={VIEWPORT}
      transition={{ duration: DUR.reveal, ease: EASE_IN_OUT, delay }}
    >
      {/* El zoom de hover va en un envoltorio aparte para no pisar el de entrada */}
      <div className={`w-full h-full ${hoverZoom ? "zoom-hover" : ""}`}>
        <motion.img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setCargada(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${cargada ? "opacity-100" : "opacity-0"} ${imgClassName}`}
          initial={reducir ? false : { scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1.4, ease: EASE_OUT, delay }}
        />
      </div>
    </motion.div>
  );
}
