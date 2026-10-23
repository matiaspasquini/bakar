import React from "react";
import { Link, useParams } from "react-router-dom";
import { buscarCategoria } from "../data/catalogo";
import Encabezado from "../components/Encabezado";
import Galeria from "../components/Galeria";
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {categoria.subcategorias.map((sub) => (
            <Link key={sub.slug} to={`/${categoria.slug}/${sub.slug}`} className="group">
              <div className="overflow-hidden bg-gray-100">
                <img
                  src={sub.fotos[0]}
                  alt={sub.nombre}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <h2 className="text-xl font-semibold">{sub.nombre}</h2>
                <span className="text-sm relative after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-black group-hover:after:w-full after:transition-all after:duration-300">
                  Ver proyectos
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
