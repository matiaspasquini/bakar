import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/logo.png";
import logoblanco from "../assets/BakarLogoBlanco.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobileSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  const navTextColor = isScrolled ? "text-black" : "text-black";
  const underlineClass =
    "relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-current after:w-0 hover:after:w-full after:transition-all after:duration-300 after:ease-in-out";

  const menuItems = {
      Mobiliario: [
      { label: "Cocinas", path: "/mobiliario/cocina" },
      { label: "Vestidores", path: "/mobiliario/vestidores" },
      { label: "Oficinas", path: "/mobiliario/oficinas" },
      { label: "Rack TV", path: "/mobiliario/racktv" },
      { label: "Otros", path: "/mobiliario/otros" },
    ],
    Revestimientos: [
      { label: "Kokkai", path: "/revestimientos/kokkai" },
      { label: "WUD", path: "/revestimientos/wud" },
      { label: "Bakar", path: "/revestimientos/bakar" },
    ],
    Puertas: [
      { label: "Interior", path: "/puertas/interior" },
      { label: "Exterior", path: "/puertas/exterior" },
    ],
    Decks: [
      { label: "Wud", path: "/decks/wud" },
      { label: "Bakar", path: "/decks/bakar" },
    ],
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
    mobileMenuOpen ? "bg-white" : isScrolled ? "bg-white/80 backdrop-blur" : "bg-white/100"
      }`}
    >
      <div className="flex items-center justify-between px-8 py-6">
        <Link to="/" className={`text-2xl font-light ${navTextColor}`}>
          <img src={logo} className="w-[150px]" alt="Bakar logo" />
        </Link>

        {/* Desktop nav */}
        <nav className={`hidden md:flex items-center gap-6 ${navTextColor}`}>
          <Link to="/" className={underlineClass}>Inicio</Link>

          {Object.keys(menuItems).map((menu) => (
            <div
              className="relative"
              key={menu}
              onMouseEnter={() => setOpen(menu)}
              onMouseLeave={() => setOpen(null)}
            >
            <Link
                to={`/${menu.toLowerCase()}`}
                onClick={() => setOpen(null)}
                className={`${underlineClass} capitalize`}
              >
                {menu}
            </Link>
              <AnimatePresence>
                {open === menu && (
                  <motion.ul
                    className="absolute top-8 left-0 bg-white shadow-md rounded px-4 py-2 space-y-2 text-black"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {menuItems[menu].map((item) => (
                      <li key={item.path}>
                        <Link to={item.path} onClick={() => setOpen(null)}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}

          <Link to="/escaleras" className={underlineClass}>Escaleras</Link>
          <Link to="/contacto" className={underlineClass}>Contacto</Link>
        </nav>

        {/* Botón hamburguesa mobile */}
        <button
          className={`md:hidden ${navTextColor}`}
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Menú lateral mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 w-64 h-full bg-white shadow-2xl z-[999] p-6"
          >
            <button
              className="mb-6"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            <nav className="flex flex-col gap-4 text-lg">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                Inicio
              </Link>

              {Object.keys(menuItems).map((section) => (
                <div key={section}>
                  <button
                    onClick={() => toggleMobileSubmenu(section)}
                    className="flex items-center justify-between w-full"
                  >
                    <span className="capitalize">{section}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        activeSubmenu === section ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeSubmenu === section && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-4 mt-2 flex flex-col gap-2 text-base text-gray-600"
                      >
                        {menuItems[section].map((item) => (
                          <li key={item.path}>
                            <Link
                              to={item.path}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <Link to="/escaleras" className={underlineClass}>Escaleras</Link>
              <Link to="/contacto" onClick={() => setMobileMenuOpen(false)}>Contacto</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
