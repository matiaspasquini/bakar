import React from "react";
import HeroSlider from "../components/HeroSlider";
import Cocina from '../components/Cocina'
import Vestidores from '../components/Vestidores'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div>
      <HeroSlider />
      <Cocina />
      <Vestidores />
      <Footer />

    </div>
  );
}