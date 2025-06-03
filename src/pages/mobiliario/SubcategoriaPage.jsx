// src/pages/mobiliario/SubcategoriaPage.jsx
import React from "react";

import Footer from '../../components/Footer'
import cocina from '../../assets/mobiliario/cocina/cocina.jpg'
import cocina1 from '../../assets/mobiliario/cocina/cocina1.jpg'
import cocina2 from '../../assets/mobiliario/cocina/cocina2.jpg'
import cocina3 from '../../assets/mobiliario/cocina/cocina3.jpg'
import cocina4 from '../../assets/mobiliario/cocina/cocina4.jpg'
import cocina5 from '../../assets/mobiliario/cocina/cocina5.jpg'

import vestidor from '../../assets/mobiliario/vestidores/vestidor.jpg'
import vestidor1 from '../../assets/mobiliario/vestidores/vestidor1.jpg'

import rack from '../../assets/mobiliario/rack/rack.jpg'
import rack1 from '../../assets/mobiliario/rack/rack1.jpg'
import rack3 from '../../assets/mobiliario/rack/rack3.jpg'

import otro from '../../assets/mobiliario/otros/otro.jpg'
import otro1 from '../../assets/mobiliario/otros/otro1.jpg'
import otro2 from '../../assets/mobiliario/otros/otro2.jpg'

import oficinas from '../../assets/mobiliario/oficinas/oficinas.jpg'
import oficinas1 from '../../assets/mobiliario/oficinas/oficinas1.jpg'
import oficinas2 from '../../assets/mobiliario/oficinas/oficinas2.jpg'
import oficinas3 from '../../assets/mobiliario/oficinas/oficinas3.jpg'
import oficinas4 from '../../assets/mobiliario/oficinas/oficinas4.jpg'



import { useParams } from "react-router-dom";
import { div } from "framer-motion/client";

const imagenesPorSubcategoria = {
  cocina: [
     cocina,
     cocina1,
     cocina2,
     cocina3,
     cocina4,
     cocina5,
    // Agregá más imágenes según sea necesario
  ],
  vestidores: [
    vestidor,
    vestidor1,
    
    // Agregá más imágenes según sea necesario
  ],

    racktv: [
    rack,
    rack1,
    rack3
    
    // Agregá más imágenes según sea necesario
  ],

      otros: [
    otro,
    otro1,
    otro2
    
    // Agregá más imágenes según sea necesario
  ],

    oficinas: [
     oficinas,
     oficinas1,
     oficinas2,
     oficinas3,
     oficinas4,

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
