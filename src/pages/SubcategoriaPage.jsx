import React from "react";
import { useParams } from "react-router-dom";
import { buscarCategoria } from "../data/catalogo";
import Encabezado from "../components/Encabezado";
import Galeria from "../components/Galeria";
import NotFound from "./NotFound";

import apertura from "../assets/puertas/apertura.webp";
import espesor from "../assets/puertas/espesor.webp";
import laqueado from "../assets/puertas/laqueado.webp";
import madera from "../assets/puertas/madera.webp";

const camposFicha = [
  { clave: "apertura", label: "Apertura", icono: apertura },
  { clave: "espesor", label: "Espesor", icono: espesor },
  { clave: "terminacion", label: "Terminación", icono: laqueado },
  { clave: "material", label: "Madera", icono: madera },
];

export default function SubcategoriaPage() {
  const { categoria: slugCategoria, subcategoria: slugSub } = useParams();
  const categoria = buscarCategoria(slugCategoria);
  const sub = categoria?.subcategorias?.find((s) => s.slug === slugSub);
  if (!sub) return <NotFound />;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <Encabezado
        migas={[{ label: categoria.nombre, to: `/${categoria.slug}` }]}
        titulo={sub.nombre}
        bajada={sub.ficha?.descripcion}
      />

      {sub.ficha && (
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-sm text-gray-700">
          {camposFicha.map(({ clave, label, icono }) => (
            <div key={clave} className="flex items-start gap-3">
              <img src={icono} alt="" className="w-12 h-12 shrink-0" />
              <div>
                <dt className="font-semibold text-black">{label}</dt>
                <dd>{sub.ficha[clave]}</dd>
              </div>
            </div>
          ))}
        </dl>
      )}

      <Galeria fotos={sub.fotos} nombre={sub.nombre} />
    </section>
  );
}
