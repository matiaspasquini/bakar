import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/logo.webp";
import { catalogo } from "../data/catalogo";

const underlineClass =
  "relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:bg-current after:w-0 hover:after:w-full after:transition-all after:duration-300 after:ease-in-out";
const activoClass = "after:w-full";

const linksSimples = [
  { label: "Nosotros", to: "/nosotros" },
  { label: "Contacto", to: "/contacto" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menús al navegar
  useEffect(() => {
    setOpen(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Bloquear el scroll de fondo y cerrar con Escape mientras el menú mobile está abierto
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMobileMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

  const navLinkClass = ({ isActive }) => `${underlineClass} ${isActive ? activoClass : ""}`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur shadow-sm" : "bg-white"
      }`}
    >
      <div className={`flex items-center justify-between px-6 md:px-8 transition-all duration-300 ${isScrolled ? "py-4" : "py-6"}`}>
        <Link to="/" aria-label="Bakar — inicio">
          <img src={logo} className="w-[130px] md:w-[150px]" alt="Bakar" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-black">
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
                  // pt-3 deja un "puente" para que el mouse no pierda el hover al bajar al menú
                  <motion.div
                    className="absolute top-full left-0 pt-3"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                  >
                    <ul className="bg-white shadow-md rounded py-2 min-w-[160px]">
                      {cat.subcategorias.map((sub) => (
                        <li key={sub.slug}>
                          <Link
                            to={`/${cat.slug}/${sub.slug}`}
                            className="block px-4 py-1.5 hover:bg-gray-100 transition-colors whitespace-nowrap"
                          >
                            {sub.nombre}
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
          className="md:hidden p-1 -mr-1"
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
              className="fixed inset-0 bg-black/40 z-[998] md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 w-72 max-w-[85vw] h-full overflow-y-auto bg-white shadow-2xl z-[999] p-6 md:hidden"
            >
              <button className="mb-6 p-1 -ml-1" onClick={() => setMobileMenuOpen(false)} aria-label="Cerrar menú">
                <X className="w-6 h-6" />
              </button>

              <nav className="flex flex-col gap-4 text-lg">
                <Link to="/">Inicio</Link>

                {catalogo.map((cat) =>
                  cat.subcategorias ? (
                    <div key={cat.slug}>
                      <button
                        onClick={() => setActiveSubmenu(activeSubmenu === cat.slug ? null : cat.slug)}
                        className="flex items-center justify-between w-full"
                        aria-expanded={activeSubmenu === cat.slug}
                      >
                        <span>{cat.nombre}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${activeSubmenu === cat.slug ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {activeSubmenu === cat.slug && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
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
                    </div>
                  ) : (
                    <Link key={cat.slug} to={`/${cat.slug}`}>{cat.nombre}</Link>
                  )
                )}

                {linksSimples.map((l) => (
                  <Link key={l.to} to={l.to}>{l.label}</Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
