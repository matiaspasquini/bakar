import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/HomePage";
import Contacto from "../pages/Contacto";
import Nosotros from "../pages/Nosotros";
import CategoriaPage from "../pages/CategoriaPage";
import SubcategoriaPage from "../pages/SubcategoriaPage";
import { iniciarScroll, irArriba } from "../lib/scroll";
import { EASE_OUT } from "../lib/motion";

export default function App() {
  const location = useLocation();
  const esHome = location.pathname === "/";

  useEffect(() => iniciarScroll(), []);

  return (
    // reducedMotion="user": si el sistema pide menos movimiento, framer quita los desplazamientos
    <MotionConfig reducedMotion="user">
      <Navbar />

      {/* Cambio de página: la anterior se va rápido, la nueva entra con calma.
          El salto arriba ocurre en el medio, cuando no se ve nada. */}
      <AnimatePresence mode="wait" onExitComplete={irArriba}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } }}
          exit={{ opacity: 0, transition: { duration: 0.18, ease: "easeOut" } }}
        >
          {/* La home arranca con el hero a pantalla completa; el resto deja lugar al navbar */}
          <main className={esHome ? "" : "pt-32"}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/:categoria" element={<CategoriaPage />} />
              <Route path="/:categoria/:subcategoria" element={<SubcategoriaPage />} />
            </Routes>
          </main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
