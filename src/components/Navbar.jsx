import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/logo.webp";
import { catalogo } from "../data/catalogo";
import { EASE_OUT, EASE_DRAWER } from "../lib/motion";
import { frenarScroll, soltarScroll } from "../lib/scroll";

const linksSimples = [
  { label: "Nosotros", to: "/nosotros" },
  { label: "Contacto", to: "/contacto" },
];

// Ítems del menú mobile: entran escalonados desde la izquierda
const itemMobile = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [oculto, setOculto] = useState(false);
  const [open, setOpen] = useState(null);
  const [vista, setVista] = useState(null); // subcategoría bajo el mouse en el panel
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const { pathname } = useLocation();
  const esHome = pathname === "/";

  // Se esconde al bajar y vuelve apenas subís un poco
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const anterior = scrollY.getPrevious() ?? 0;
    setIsScrolled(y > 10);
    if (y < 120) setOculto(false);
    else if (y > anterior + 4) setOculto(true);
    else if (y < anterior - 4) setOculto(false);
  });

  // Cerrar menús al navegar
  useEffect(() => {
    setOpen(null);
    setMobileMenuOpen(false);
    setOculto(false);
  }, [pathname]);

  // Frenar el scroll de fondo y cerrar con Escape mientras el menú mobile está abierto
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMobileMenuOpen(false);
    document.body.style.overflow = "hidden";
    frenarScroll();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      soltarScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

  // Sobre el hero de la home la barra es transparente, con logo y textos en blanco
  const sobreHero = esHome && !isScrolled && !mobileMenuOpen && !open;
  const abierta = catalogo.find((c) => c.slug === open);
  const abrir = (cat) => {
    setOpen(cat.subcategorias ? cat.slug : null);
    setVista(cat.subcategorias ? cat.subcategorias[0].slug : null);
  };
  const navLinkClass = ({ isActive }) => `link-linea ${isActive ? "activo" : ""}`;

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-[background-color,box-shadow,color] duration-500 ${
        sobreHero ? "bg-transparent text-white" : open ? "bg-white text-black" : "bg-white/90 backdrop-blur-md text-black"
      } ${isScrolled && !sobreHero ? "shadow-[0_1px_0_rgba(0,0,0,0.06)]" : ""}`}
      onMouseLeave={() => setOpen(null)}
      animate={{ y: oculto && !mobileMenuOpen && !open ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
    >
      {/* Degradado para que el blanco se lea sobre fotos claras */}
      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-b from-black/35 to-transparent pointer-events-none transition-opacity duration-500 ${
          sobreHero ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className={`flex items-center justify-between px-6 md:px-8 transition-[padding] duration-500 ${isScrolled ? "py-4" : "py-6"}`}>
        <Link to="/" aria-label="Bakar — inicio" className="presionable">
          <img
            src={logo}
            className={`w-[130px] md:w-[150px] transition-[filter] duration-500 ${sobreHero ? "invert" : ""}`}
            alt="Bakar"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" end className={navLinkClass} onMouseEnter={() => setOpen(null)}>Inicio</NavLink>

          {catalogo.map((cat) => (
            <NavLink
              key={cat.slug}
              to={`/${cat.slug}`}
              className={({ isActive }) => `link-linea ${isActive || open === cat.slug ? "activo" : ""}`}
              onMouseEnter={() => abrir(cat)}
              onFocus={() => abrir(cat)}
              aria-expanded={cat.subcategorias ? open === cat.slug : undefined}
            >
              {cat.nombre}
            </NavLink>
          ))}

          {linksSimples.map((l) => (
            <NavLink key={l.to} to={l.to} className={navLinkClass} onMouseEnter={() => setOpen(null)}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Botón hamburguesa mobile */}
        <button
          className="md:hidden p-1 -mr-1 presionable"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Abrir menú"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Panel de catálogo (desktop): baja como una persiana debajo de la barra.
          A la izquierda la categoría, al medio las subcategorías en grande y a la
          derecha una foto que cambia según dónde está el mouse. */}
      <AnimatePresence>
        {abierta && (
          <motion.div
            key="panel"
            className="hidden md:block absolute top-full left-0 w-full bg-white text-black border-t border-gray-100 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)", transition: { duration: 0.5, ease: EASE_OUT } }}
            exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.25, ease: EASE_OUT } }}
          >
            <div className="contenedor grid grid-cols-12 gap-8 py-12">
              <motion.div
                key={`info-${abierta.slug}`}
                className="col-span-3 flex flex-col justify-between"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT, delay: 0.1 } }}
              >
                <div>
                  <p className="rotulo mb-4">
                    {String(catalogo.indexOf(abierta) + 1).padStart(2, "0")} — Catálogo
                  </p>
                  <p className="text-gray-500 leading-relaxed max-w-[16rem]">{abierta.bajada}</p>
                </div>
                <Link to={`/${abierta.slug}`} className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] mt-8">
                  <span className="link-linea">Ver todo {abierta.nombre.toLowerCase()}</span>
                  <span className="flecha" aria-hidden>→</span>
                </Link>
              </motion.div>

              <motion.ul
                key={`lista-${abierta.slug}`}
                className="col-span-5 col-start-5"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } } }}
              >
                {abierta.subcategorias.map((sub, i) => (
                  <motion.li
                    key={sub.slug}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
                    }}
                  >
                    <Link
                      to={`/${abierta.slug}/${sub.slug}`}
                      onMouseEnter={() => setVista(sub.slug)}
                      onFocus={() => setVista(sub.slug)}
                      className={`group flex items-baseline gap-5 py-2 border-b border-gray-100 transition-colors duration-300 ${
                        vista === sub.slug ? "text-black" : "text-gray-300"
                      }`}
                    >
                      <span className="rotulo w-6 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-3xl lg:text-4xl font-light tracking-[-0.03em] flex-1">{sub.nombre}</span>
                      <span
                        className={`flecha text-xl transition-opacity duration-300 ${vista === sub.slug ? "opacity-100" : "opacity-0"}`}
                        aria-hidden
                      >
                        →
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="col-span-3 col-start-10 relative aspect-[4/5] overflow-hidden bg-[#ece9e4]">
                <AnimatePresence initial={false}>
                  {abierta.subcategorias
                    .filter((s) => s.slug === vista)
                    .map((s) => (
                      <motion.img
                        key={s.fotos[0].src}
                        src={s.fotos[0].src}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.06 }}
                        animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_OUT } }}
                        exit={{ opacity: 0, transition: { duration: 0.3 } }}
                      />
                    ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Velo sobre la página mientras el panel está abierto */}
      <AnimatePresence>
        {abierta && (
          <motion.div
            className="hidden md:block absolute inset-x-0 top-full h-screen bg-black/25 -z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Menú lateral mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 h-[100dvh] bg-black/40 backdrop-blur-[2px] z-[998] md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0, transition: { duration: 0.5, ease: EASE_DRAWER } }}
              exit={{ x: "-100%", transition: { duration: 0.25, ease: EASE_OUT } }}
              // Arrastrar hacia la izquierda también lo cierra
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0.6, right: 0.05 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80 || info.velocity.x < -400) setMobileMenuOpen(false);
              }}
              className="fixed top-0 left-0 w-72 max-w-[85vw] h-[100dvh] overflow-y-auto bg-white text-black shadow-2xl z-[999] p-6 md:hidden"
            >
              <button className="mb-8 p-1 -ml-1 presionable" onClick={() => setMobileMenuOpen(false)} aria-label="Cerrar menú">
                <X className="w-6 h-6" />
              </button>

              <motion.nav
                className="flex flex-col gap-5 text-xl"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: 0.12 } } }}
              >
                <motion.div variants={itemMobile}><Link to="/">Inicio</Link></motion.div>

                {catalogo.map((cat) =>
                  cat.subcategorias ? (
                    <motion.div key={cat.slug} variants={itemMobile}>
                      <button
                        onClick={() => setActiveSubmenu(activeSubmenu === cat.slug ? null : cat.slug)}
                        className="flex items-center justify-between w-full"
                        aria-expanded={activeSubmenu === cat.slug}
                      >
                        <span>{cat.nombre}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${activeSubmenu === cat.slug ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {activeSubmenu === cat.slug && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1, transition: { duration: 0.3, ease: EASE_OUT } }}
                            exit={{ height: 0, opacity: 0, transition: { duration: 0.2, ease: EASE_OUT } }}
                            className="pl-4 overflow-hidden flex flex-col text-base text-gray-600"
                          >
                            <li className="pt-3">
                              <Link to={`/${cat.slug}`}>Ver todo</Link>
                            </li>
                            {cat.subcategorias.map((sub) => (
                              <li key={sub.slug} className="pt-2">
                                <Link to={`/${cat.slug}/${sub.slug}`}>{sub.nombre}</Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.div key={cat.slug} variants={itemMobile}>
                      <Link to={`/${cat.slug}`}>{cat.nombre}</Link>
                    </motion.div>
                  )
                )}

                {linksSimples.map((l) => (
                  <motion.div key={l.to} variants={itemMobile}>
                    <Link to={l.to}>{l.label}</Link>
                  </motion.div>
                ))}
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
