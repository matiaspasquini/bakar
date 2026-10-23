import React from "react";
import { motion } from "framer-motion";
import { EASE_IN_OUT, VIEWPORT } from "../lib/motion";

// Línea de cota como en un plano de taller: |—— texto ——|
// Es el único guiño "a medida" del sitio; va fina y en gris.
export default function Cota({ children, className = "" }) {
  return (
    <motion.div
      className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-gray-400 ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <span className="w-px h-2.5 bg-gray-300" />
      <motion.span
        className="flex-1 h-px bg-gray-300 origin-left"
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease: EASE_IN_OUT } } }}
      />
      {children && <span className="shrink-0">{children}</span>}
      <motion.span
        className="flex-1 h-px bg-gray-300 origin-right"
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease: EASE_IN_OUT } } }}
      />
      <span className="w-px h-2.5 bg-gray-300" />
    </motion.div>
  );
}
