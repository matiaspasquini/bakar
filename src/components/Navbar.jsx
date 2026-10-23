import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/logo.webp";
import { catalogo } from "../data/catalogo";
import { EASE_OUT, EASE_DRAWER, DUR } from "../lib/motion";
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
  const sobreHero = esHome && !isScrolled && !mobileMenuOpen;
  const navLinkClass = ({ isActive }) => `link-linea ${isActive ? "activo" : ""}`;

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-[background-color,box-shadow,color] duration-500 ${
        sobreHero ? "bg-transparent text-white" : "bg-white/90 backdrop-blur-md text-black"
      } ${isScrolled && !sobreHero ? "shadow-[0_1px_0_rgba(0,0,0,0.06)]" : ""}`}
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
          <NavLink to="/" end className={navLinkClass}>Inicio</NavLink>

          {catalogo.map((cat) => (
            <div
              className="relative"
              key={cat.slug}
              onMouseEnter={() => cat.subcategorias && setOpen(cat.slug)}
              onMouseLeave={() => setOpen(null)}
            >
              <NavLink to={`/${cat.slug}`} className={navLinkClass}>
                {cat.nombre}
              </NavLink>
              <AnimatePresence>
                {open === cat.slug && (
                  // pt-3 deja un "puente" para que el mouse no pierda el hover al bajar al menú.
                  // Crece desde la esquina del link que lo abrió.
                  <motion.div
                    className="absolute top-full -left-4 pt-3 origin-top-left"
                    initial={{ opacity: 0, scale: 0.96, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: DUR.rapido, ease: EASE_OUT } }}
                    exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.12 } }}
                  >
                    <ul className="bg-white text-black shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)] rounded-md py-2 min-w-[180px]">
                      {cat.subcategorias.map((sub) => (
                        <li key={sub.slug}>
                          <Link
                            to={`/${cat.slug}/${sub.slug}`}
                            className="group flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition-colors whitespace-nowrap"
                          >
                            {sub.nombre}
                            <span className="flecha opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" aria-hidden>
                              →
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {linksSimples.map((l) => (
            <NavLink key={l.to} to={l.to} className={navLinkClass}>{l.label}</NavLink>
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
