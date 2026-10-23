import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { catalogo, buscarCategoria } from "../data/catalogo";
import Encabezado from "../components/Encabezado";
import Galeria from "../components/Galeria";
import Foto from "../components/Foto";
import CierreCTA from "../components/CierreCTA";
import NotFound from "./NotFound";
import { fadeUp, VIEWPORT } from "../lib/motion";

// Índice escalonado: las tarjetas alternan ancho y la columna derecha baja,
// como una doble página de revista. Si hay una sola, va a todo el ancho.
const posiciones = [
  { tarjeta: "md:col-span-7", foto: "aspect-[4/3]" },
  { tarjeta: "md:col-span-4 md:col-start-9 md:mt-48", foto: "aspect-[4/3] md:aspect-[3/4]" },
];

export default function CategoriaPage() {
  const { categoria: slug } = useParams();
  const categoria = buscarCategoria(slug);
  if (!categoria) return <NotFound />;

  const numero = String(catalogo.indexOf(categoria) + 1).padStart(2, "0");
  const subs = categoria.subcategorias || [];
  const unica = subs.length === 1;

  return (
    <>
      <section className="contenedor pb-24 md:pb-36">
        <Encabezado rotulo={`${numero} — Catálogo`} titulo={categoria.nombre} bajada={categoria.bajada} />

        {/* Escaleras no tiene subcategorías: va directo a la galería */}
        {categoria.fotos ? (
          <Galeria fotos={categoria.fotos} nombre={categoria.nombre} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-16 md:gap-y-12">
            {subs.map((sub, index) => {
              const pos = unica ? { tarjeta: "md:col-span-12", foto: "aspect-[4/3] md:aspect-[16/9]" } : posiciones[index % 2];
              return (
                <Link
                  key={sub.slug}
                  to={`/${categoria.slug}/${sub.slug}`}
                  className={`group block ${pos.tarjeta}`}
                >
                  <Foto
                    src={sub.fotos[0].src}
                    alt={sub.nombre}
                    className={pos.foto}
                    delay={(index % 2) * 0.12}
                    eager={index < 2}
                    hoverZoom
                  />
                  <motion.div
                    className="mt-5 flex items-end justify-between gap-6 border-b border-gray-200 pb-4"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT}
                  >
                    <div>
                      <p className="rotulo mb-2 tabular-nums">
                        {String(index + 1).padStart(2, "0")} / {String(subs.length).padStart(2, "0")}
                      </p>
                      <h2 className="text-3xl md:text-4xl font-light tracking-[-0.03em]">{sub.nombre}</h2>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] inline-flex items-center gap-2 pb-1 shrink-0">
                      <span className="link-linea">Ver proyectos</span>
                      <span className="flecha" aria-hidden>→</span>
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <CierreCTA />
    </>
  );
}
