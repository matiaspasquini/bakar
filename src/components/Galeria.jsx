import React from "react";
import Foto from "./Foto";

// Galería editorial: un ritmo de tres tiempos que se repite.
//   1) foto a todo el ancho
//   2) foto grande a la izquierda
//   3) foto chica a la derecha, apoyada abajo
// Cada foto respeta sus proporciones (no se recorta) y lleva su número.
// Una foto vertical en el lugar "a todo el ancho" quedaría enorme: va centrada y más angosta.
const ritmo = [
  "md:col-span-12",
  "md:col-span-7",
  "md:col-span-4 md:col-start-9 md:self-end",
];

export default function Galeria({ fotos, nombre }) {
  const total = String(fotos.length).padStart(2, "0");

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12 md:gap-y-24">
      {fotos.map(({ src, ancho, alto }, index) => (
        <figure
          key={src}
          className={
            index % ritmo.length === 0 && alto > ancho ? "md:col-span-6 md:col-start-4" : ritmo[index % ritmo.length]
          }
        >
          <Foto
            src={src}
            alt={`${nombre} — foto ${index + 1}`}
            eager={index === 0}
            style={{ aspectRatio: `${ancho} / ${alto}` }}
          />
          <figcaption className="rotulo mt-3 tabular-nums">
            {String(index + 1).padStart(2, "0")} / {total}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
