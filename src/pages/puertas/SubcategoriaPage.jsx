// src/pages/mobiliario/SubcategoriaPage.jsx
import React from "react";

import Footer from '../../components/Footer'

import exterior from '../../assets/puertas/exterior/exterior.jpg'
import exterior1 from '../../assets/puertas/exterior/exterior1.jpg'
import exterior2 from '../../assets/puertas/exterior/exterior2.jpg'

import interior from '../../assets/puertas/interior/interior.jpg'
import interior1 from '../../assets/puertas/interior/interior1.jpg'
import interior2 from '../../assets/puertas/interior/interior2.jpg'





import { useParams } from "react-router-dom";
import { div } from "framer-motion/client";

const imagenesPorSubcategoria = {
  exterior: [
     exterior,
     exterior1,
     exterior2,

    // Agregá más imágenes según sea necesario
  ],
  interior: [
    interior,
    interior1,
    interior2,
    
    // Agregá más imágenes según sea necesario
  ],


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
