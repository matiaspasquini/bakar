import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/HomePage";
import Contacto from "../pages/Contacto";
import Nosotros from "../pages/Nosotros";
import CategoriaPage from "../pages/CategoriaPage";
import SubcategoriaPage from "../pages/SubcategoriaPage";

export default function App() {
  const { pathname } = useLocation();
  const esHome = pathname === "/";

  // Al cambiar de página, arrancar desde arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />

      {/* La home arranca con el hero a pantalla completa; el resto deja lugar al navbar */}
      <main className={esHome ? "" : "pt-32 pb-20"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/:categoria" element={<CategoriaPage />} />
          <Route path="/:categoria/:subcategoria" element={<SubcategoriaPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
