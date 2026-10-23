// Catálogo de productos: una sola fuente para el menú, las páginas de categoría
// y las galerías. Para sumar fotos alcanza con agregar .webp a la carpeta
// correspondiente en src/assets (se ordenan por nombre de archivo).
// medidas.json guarda ancho y alto de cada foto para reservar su lugar antes
// de que cargue; si una foto nueva no está ahí, se usa 3:2.

import medidas from "./medidas.json";

const fotos = (glob) =>
  Object.keys(glob)
    .sort()
    .map((ruta) => {
      const [ancho, alto] = medidas[ruta.replace("../assets/", "")] || [3, 2];
      return { src: glob[ruta], ancho, alto };
    });

export const catalogo = [
  {
    slug: "mobiliario",
    nombre: "Mobiliario",
    bajada: "Cocinas, vestidores, oficinas y equipamiento a medida.",
    subcategorias: [
      {
        slug: "cocina",
        nombre: "Cocinas",
        fotos: fotos(import.meta.glob("../assets/mobiliario/cocina/*.webp", { eager: true, import: "default" })),
      },
      {
        slug: "vestidores",
        nombre: "Vestidores",
        fotos: fotos(import.meta.glob("../assets/mobiliario/vestidores/*.webp", { eager: true, import: "default" })),
      },
      {
        slug: "oficinas",
        nombre: "Oficinas",
        fotos: fotos(import.meta.glob("../assets/mobiliario/oficinas/*.webp", { eager: true, import: "default" })),
      },
      {
        slug: "racktv",
        nombre: "Rack TV",
        fotos: fotos(import.meta.glob("../assets/mobiliario/rack/*.webp", { eager: true, import: "default" })),
      },
      {
        slug: "otros",
        nombre: "Otros",
        fotos: fotos(import.meta.glob("../assets/mobiliario/otros/*.webp", { eager: true, import: "default" })),
      },
    ],
  },
  {
    slug: "revestimientos",
    nombre: "Revestimientos",
    bajada: "Paneles y revestimientos de madera para interiores.",
    subcategorias: [
      {
        slug: "kokkai",
        nombre: "Kokkai",
        fotos: fotos(import.meta.glob("../assets/revestimientos/kokkai/*.webp", { eager: true, import: "default" })),
      },
      {
        slug: "wud",
        nombre: "WUD",
        fotos: fotos(import.meta.glob("../assets/revestimientos/wud/*.webp", { eager: true, import: "default" })),
      },
    ],
  },
  {
    slug: "puertas",
    nombre: "Puertas",
    bajada: "Puertas de interior y exterior fabricadas a medida.",
    subcategorias: [
      {
        slug: "exterior",
        nombre: "Exterior",
        fotos: fotos(import.meta.glob("../assets/puertas/exterior/*.webp", { eager: true, import: "default" })),
        ficha: {
          descripcion: "Puerta maciza doble hoja con bastidor y molduras aplicadas.",
          apertura: "Practicable: hoja pasiva con pasador y hoja activa con cerradura y manija doble balancín.",
          espesor: "60 mm",
          terminacion: "Laqueado tono nogal terracota",
          material: "Cedro",
        },
      },
      {
        slug: "interior",
        nombre: "Interior",
        fotos: fotos(import.meta.glob("../assets/puertas/interior/*.webp", { eager: true, import: "default" })),
        ficha: {
          descripcion: "Puerta de interior simple hoja para ambientes internos.",
          apertura: "Abatible estándar con picaporte magnético.",
          espesor: "40 mm",
          terminacion: "Laqueado blanco satinado",
          material: "MDF enchapado",
        },
      },
    ],
  },
  {
    slug: "decks",
    nombre: "Decks",
    bajada: "Decks de madera para exteriores.",
    subcategorias: [
      {
        slug: "wud",
        nombre: "WUD",
        fotos: fotos(import.meta.glob("../assets/decks/wud/*.webp", { eager: true, import: "default" })),
      },
    ],
  },
  {
    slug: "escaleras",
    nombre: "Escaleras",
    bajada: "Escaleras de diseño, reconocidas con el Premio FADEA 2023.",
    fotos: fotos(import.meta.glob("../assets/escaleras/*.webp", { eager: true, import: "default" })),
  },
];

export const buscarCategoria = (slug) => catalogo.find((c) => c.slug === slug);
