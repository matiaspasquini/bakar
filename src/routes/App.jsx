import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/HomePage";
import Contacto from "../pages/Contacto";
import Nosotros from "../pages/Nosotros"


// Mobiliario
import MobiliarioPage from "../pages/mobiliario/MobiliarioPage";
import MobiliarioSub from "../pages/mobiliario/SubcategoriaPage";

// Revestimientos
import RevestimientosPage from "../pages/revestimientos/RevestimientosPage";
import RevestimientosSub from "../pages/revestimientos/SubcategoriaPage";

// Puertas
import PuertasPage from "../pages/puertas/PuertasPage";
import PuertasSub from "../pages/puertas/SubcategoriaPage";

// Decks
import DecksPage from "../pages/decks/DecksPage";
import DecksSub from "../pages/decks/SubcategoriaPage";

// Escaleras
import EscalerasPage from "../pages/escaleras/EscalerasPage";



export default function App() {
  return (
   <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/nosotros" element={<Nosotros />} />

        {/* Mobiliario */}
        <Route path="/mobiliario" element={<MobiliarioPage />} />
        <Route path="/mobiliario/:subcategoria" element={<MobiliarioSub />} />

        {/* Revestimientos */}
        <Route path="/revestimientos" element={<RevestimientosPage />} />
        <Route path="/revestimientos/:subcategoria" element={<RevestimientosSub />} />

        {/* Puertas */}
        <Route path="/puertas" element={<PuertasPage />} />
        <Route path="/puertas/:subcategoria" element={<PuertasSub />} />

        {/* Decks */}
        <Route path="/decks" element={<DecksPage />} />
        <Route path="/decks/:subcategoria" element={<DecksSub />} />

        {/* Escaleras */}
        <Route path="/escaleras" element={<EscalerasPage />} />

      </Routes>
    </>
  );
}