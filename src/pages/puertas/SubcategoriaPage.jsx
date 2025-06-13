import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";

// iconos
import apertura from "../../assets/puertas/apertura.png";
import espesor from "../../assets/puertas/espesor.png";
import laqueado from "../../assets/puertas/laqueado.png";
import madera from "../../assets/puertas/madera.png";


// Imágenes
import exterior from "../../assets/puertas/exterior/exterior.jpg";
import exterior1 from "../../assets/puertas/exterior/exterior1.jpg";
import exterior2 from "../../assets/puertas/exterior/exterior2.jpg";

import interior from "../../assets/puertas/interior/interior.jpg";
import interior1 from "../../assets/puertas/interior/interior1.jpg";
import interior2 from "../../assets/puertas/interior/interior2.jpg";

// Base de imágenes por subcategoría
const imagenesPorSubcategoria = {
  exterior: [exterior, exterior1, exterior2],
  interior: [interior, interior1, interior2],
};

// Descripciones por subcategoría
const descripcionesPorSubcategoria = {
  exterior: {
    descripcion: "Puerta maciza doble hoja con bastidor y molduras aplicadas.",
    apertura: "Practicable: hoja pasiva con pasador y hoja activa con cerradura y manija doble balancín.",
    espesor: "60 mm",
    terminacion: "Laqueado tono nogal terracota",
    material: "Cedro",
  },
  interior: {
    descripcion: "Puerta de interior simple hoja para ambientes internos.",
    apertura: "Abatible estándar con picaporte magnético.",
    espesor: "40 mm",
    terminacion: "Laqueado blanco satinado",
    material: "MDF enchapado",
  },
};

export default function SubcategoriaPage() {
  const { subcategoria } = useParams();
  const imagenes = imagenesPorSubcategoria[subcategoria] || [];
  const detalles = descripcionesPorSubcategoria[subcategoria];

  return (
    <>
      <div className="flex flex-col gap-12 pt-20 pb-10 items-center px-4">
        {imagenes.map((src, index) => (
          <div key={index} className="max-w-7xl w-full">
<img
  src={src}
  alt={`${subcategoria} ${index + 1}`}
  className="w-full max-w-7xl shadow-lg p-2 object-cover"
/>

            {/* Descripción técnica debajo de la imagen */}
            <div className="mt-6 space-y-3 text-gray-700 text-sm">
              <p className="font-medium">{detalles.descripcion}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">

<div className="flex items-center gap-2">
  <img src={apertura} alt="Apertura" className="w-14 h-14 mt-1" />
  <p>
    <strong>Apertura:</strong> <br /> {detalles.apertura}
  </p>
</div>

<div className="flex items-center gap-2">
  <img src={espesor} alt="Apertura" className="w-14 h-14 mt-1" />
  <p>
    <strong>Espesor:</strong> <br /> {detalles.espesor}
  </p>
</div>

<div className="flex items-center gap-2">
  <img src={laqueado} alt="Apertura" className="w-14 h-14 mt-1" />
  <p>
    <strong>Laqueado:</strong> <br /> {detalles.terminacion}
  </p>
</div>

<div className="flex items-center gap-2">
  <img src={madera} alt="Apertura" className="w-14 h-14 mt-1" />
  <p>
    <strong>Madera:</strong> <br /> {detalles.material}
  </p>
</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}
