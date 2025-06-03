import React from "react";
import Footer from "../../components/Footer";

import escalera from "../../assets/escaleras/escalera.jpg";
import escalera1 from "../../assets/escaleras/escalera1.jpg";
import escalera2 from "../../assets/escaleras/escalera2.jpg";

export default function EscalerasPage() {
  const imagenes = [escalera, escalera1, escalera2]; // No usás useParams

  return (
    <>
      <div className="flex flex-col gap-12 pt-20 pb-10 items-center px-4">
        {imagenes.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Escalera ${index + 1}`}
            className="w-full max-w-7xl shadow-lg p-2 object-cover"
          />
        ))}
      </div>
      <Footer />
    </>
  );
}
