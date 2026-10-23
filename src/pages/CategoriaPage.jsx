import React from "react";
import { Link, useParams } from "react-router-dom";
import { buscarCategoria } from "../data/catalogo";
import Encabezado from "../components/Encabezado";
import Galeria from "../components/Galeria";
import Foto from "../components/Foto";
import NotFound from "./NotFound";

export default function CategoriaPage() {
  const { categoria: slug } = useParams();
  const categoria = buscarCategoria(slug);
  if (!categoria) return <NotFound />;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <Encabezado titulo={categoria.nombre} bajada={categoria.bajada} />

      {/* Escaleras no tiene subcategorías: va directo a la galería */}
      {categoria.fotos ? (
        <Galeria fotos={categoria.fotos} nombre={categoria.nombre} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
          {categoria.subcategorias.map((sub, index) => (
            <Link key={sub.slug} to={`/${categoria.slug}/${sub.slug}`} className="group presionable block">
              <Foto
                src={sub.fotos[0].src}
                alt={sub.nombre}
                className="h-[300px] md:h-[440px]"
                // En desktop, la segunda columna entra un poquito después
                delay={(index % 2) * 0.12}
                eager={index < 2}
                hoverZoom
              />
              <div className="mt-4 flex items-baseline justify-between">
                <h2 className="text-xl font-semibold">{sub.nombre}</h2>
                <span className="text-sm inline-flex items-center gap-1">
                  <span className="link-linea">Ver proyectos</span>
                  <span className="flecha" aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
