import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.webp";
import { catalogo } from "../data/catalogo";
import { fadeUp, stagger, VIEWPORT } from "../lib/motion";
import { irArribaSuave } from "../lib/scroll";

const contacto = [
  { label: "+54 9 388 472-3621", href: "tel:+5493884723621" },
  { label: "cocinas@bakarsas.com", href: "mailto:cocinas@bakarsas.com" },
];

const redes = [
  { label: "WhatsApp", href: "https://wa.me/5493884723621" },
  { label: "Instagram", href: "https://www.instagram.com/bakar.sas/" },
  { label: "Catálogo PDF", href: "https://online.fliphtml5.com/wjsum/chln/" },
];

const linkClass = "link-linea text-white/80 hover:text-white transition-colors";

function Columna({ titulo, children }) {
  return (
    <motion.div variants={fadeUp}>
      <h2 className="rotulo text-white/40 mb-5">{titulo}</h2>
      <ul className="space-y-2.5 text-[15px]">{children}</ul>
    </motion.div>
  );
}

// Continúa la banda oscura del cierre: misma tinta, filetes finos y el
// contenido ordenado en columnas como el pie de una revista.
export default function Footer() {
  return (
    <footer className="bg-[#111] text-white">
      <div className="contenedor">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-12 border-t border-white/10 py-16 md:py-24"
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.div variants={fadeUp} className="col-span-2 md:col-span-4">
            <Link to="/" aria-label="Bakar — inicio" className="inline-block presionable">
              <img src={logo} alt="Bakar" className="w-[140px] invert" />
            </Link>
            <p className="text-white/50 leading-relaxed mt-6 max-w-xs">
              Diseñamos, fabricamos e instalamos muebles y puertas a medida.
            </p>
          </motion.div>

          <div className="col-span-1 md:col-span-2 md:col-start-6">
            <Columna titulo="Catálogo">
              {catalogo.map((c) => (
                <li key={c.slug}>
                  <Link to={`/${c.slug}`} className={linkClass}>{c.nombre}</Link>
                </li>
              ))}
            </Columna>
          </div>

          <div className="col-span-1 md:col-span-2">
            <Columna titulo="Bakar">
              <li><Link to="/nosotros" className={linkClass}>Nosotros</Link></li>
              <li><Link to="/contacto" className={linkClass}>Contacto</Link></li>
              {redes.map((r) => (
                <li key={r.label}>
                  <a href={r.href} target="_blank" rel="noreferrer" className={linkClass}>{r.label}</a>
                </li>
              ))}
            </Columna>
          </div>

          <div className="col-span-2 md:col-span-3">
            <Columna titulo="Fábrica">
              <li className="text-white/80 leading-relaxed">
                Juan B. Justo 488 — Dr. Manuel Belgrano
                <br />
                San Salvador de Jujuy (4600)
              </li>
              <li className="text-white/50 leading-relaxed pt-2">
                Lun a vie 10 a 19 hs · Sáb 10 a 14 hs
              </li>
              {contacto.map((c) => (
                <li key={c.href}>
                  <a href={c.href} className={linkClass}>{c.label}</a>
                </li>
              ))}
            </Columna>
          </div>
        </motion.div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 py-8 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Bakar SAS · Jujuy, Argentina</p>
          <button
            onClick={irArribaSuave}
            className="group self-start sm:self-auto inline-flex items-center gap-2 uppercase tracking-[0.2em] hover:text-white transition-colors"
          >
            Volver arriba
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1" aria-hidden>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
