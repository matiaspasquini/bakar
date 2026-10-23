import React from "react";

export default function Galeria({ fotos, nombre }) {
  return (
    <div className="flex flex-col gap-6 md:gap-10">
      {fotos.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`${nombre} — foto ${index + 1}`}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className="w-full h-auto bg-gray-100"
        />
      ))}
    </div>
  );
}
