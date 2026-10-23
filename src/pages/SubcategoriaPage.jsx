import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { buscarCategoria } from "../data/catalogo";
import Encabezado from "../components/Encabezado";
import Galeria from "../components/Galeria";
import CierreCTA from "../components/CierreCTA";
import NotFound from "./NotFound";
import { EASE_OUT, fadeUp, stagger, VIEWPORT } from "../lib/motion";

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
  const subs = categoria?.subcategorias || [];
  const index = subs.findIndex((s) => s.slug === slugSub);
  const sub = subs[index];
  if (!sub) return <NotFound />;

  // La siguiente de la misma categoría (vuelve a la primera al final)
  const siguiente = subs.length > 1 ? subs[(index + 1) % subs.length] : null;
  const numero = `${String(index + 1).padStart(2, "0")} / ${String(subs.length).padStart(2, "0")}`;

  return (
    <>
      <section className="contenedor pb-24 md:pb-36">
        <Encabezado
          migas={[{ label: categoria.nombre, to: `/${categoria.slug}` }]}
          rotulo={numero}
          titulo={sub.nombre}
          bajada={sub.ficha?.descripcion}
        />

        {/* Ficha técnica como tabla de especificaciones, con filetes finos */}
        {sub.ficha && (
          <motion.dl
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-gray-200 mb-16 md:mb-24"
            variants={stagger(0.07, 0.35)}
            initial="hidden"
            animate="show"
          >
            {camposFicha.map(({ clave, label, icono }, i) => (
              <motion.div
                key={clave}
                variants={fadeUp}
                className={`py-6 lg:pr-6 border-b border-gray-200 lg:border-b-0 ${i > 0 ? "lg:pl-6 lg:border-l" : ""}`}
              >
                <dt className="rotulo flex items-center gap-3 mb-3">
                  <img src={icono} alt="" className="w-7 h-7 opacity-70" />
                  {label}
                </dt>
                <dd className="text-lg font-light leading-snug">{sub.ficha[clave]}</dd>
              </motion.div>
            ))}
          </motion.dl>
        )}

        <Galeria fotos={sub.fotos} nombre={sub.nombre} />

        {/* Siguiente proyecto, en grande */}
        {siguiente && (
          <Link to={`/${categoria.slug}/${siguiente.slug}`} className="group block mt-24 md:mt-40 border-t border-gray-200 pt-8">
            <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={VIEWPORT}>
              <motion.p variants={fadeUp} className="rotulo mb-4">Siguiente — {categoria.nombre}</motion.p>
              <div className="overflow-hidden">
                <motion.p
                  className="flex items-center justify-between text-5xl md:text-8xl font-light tracking-[-0.04em]"
                  variants={{ hidden: { y: "100%" }, show: { y: 0, transition: { duration: 1, ease: EASE_OUT } } }}
                >
                  <span className="link-linea">{siguiente.nombre}</span>
                  <span className="flecha text-4xl md:text-7xl" aria-hidden>→</span>
                </motion.p>
              </div>
            </motion.div>
          </Link>
        )}
      </section>

      <CierreCTA />
    </>
  );
}
