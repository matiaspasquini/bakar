import React from "react";
import Foto from "./Foto";

export default function Galeria({ fotos, nombre }) {
  return (
    <div className="flex flex-col gap-6 md:gap-10">
      {fotos.map(({ src, ancho, alto }, index) => (
        <Foto
          key={src}
          src={src}
          alt={`${nombre} — foto ${index + 1}`}
          eager={index === 0}
          style={{ aspectRatio: `${ancho} / ${alto}` }}
        />
      ))}
    </div>
  );
}
