// src/pages/mobiliario/SubcategoriaPage.jsx
import React from "react";

import Footer from '../../components/Footer'
import kokai from '../../assets/revestimientos/kokkai/Kokkai1.jpg'
import kokai2 from '../../assets/revestimientos/kokkai/Kokkai2.jpg'
import kokai3 from '../../assets/revestimientos/kokkai/Kokkai3.jpg'
import kokai4 from '../../assets/revestimientos/kokkai/Kokkai4.jpg'
import kokai5 from '../../assets/revestimientos/kokkai/Kokkai5.jpg'

import wud from '../../assets/revestimientos/wud/wud.jpg'
import wud2 from '../../assets/revestimientos/wud/wud2.jpg'
import wud3 from '../../assets/revestimientos/wud/wud3.jpg'

import { useParams } from "react-router-dom";
import { div } from "framer-motion/client";

const imagenesPorSubcategoria = {
  kokkai: [
     kokai,
     kokai2,
     kokai3,
     kokai4,
     kokai5,
    // Agregá más imágenes según sea necesario
  ],
  wud: [
    wud,
    wud2,
    wud3
    // Agregá más imágenes según sea necesario
  ],

    bakar: [
    wud,
    wud2,
    wud3
    // Agregá más imágenes según sea necesario
  ],
  // Añadí otras subcategorías según corresponda
};

export default function SubcategoriaPage() {
  const { subcategoria } = useParams();
  const imagenes = imagenesPorSubcategoria[subcategoria] || [];

  return (
<>
<div className="flex flex-col gap-12 pt-20 pb-10 items-center">
  {imagenes.map((src, index) => (
    <img
      key={index}
      src={src}
      alt={`${subcategoria} ${index + 1}`}
      className="w-full max-w-7xl shadow-lg p-2 object-cover"
    />
  ))}

</div>
<Footer />
</>
  );
}