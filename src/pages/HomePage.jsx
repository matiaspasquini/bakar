import React from "react";
import HeroSlider from "../components/HeroSlider";
import Cocina from '../components/Cocina'
import Vestidores from '../components/Vestidores'
import Footer from '../components/Footer'
import PopupModal from "../components/PopupModal";

export default function HomePage() {
  return (
    <div>
      <PopupModal />
      <HeroSlider />
      <Cocina />
      <Vestidores />
      <Footer />

    </div>
  );
}