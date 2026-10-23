import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT } from "../lib/motion";

const REEL = "https://www.instagram.com/reel/CwlRBuTLSBq/";
const CLAVE = "popupLastShown";
const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // una vez por día

const leer = () => {
  try {
    return localStorage.getItem(CLAVE);
  } catch {
    return null;
  }
};
const guardar = () => {
  try {
    localStorage.setItem(CLAVE, Date.now().toString());
  } catch {
    /* modo privado: no pasa nada */
  }
};

const PopupModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const lastShown = leer();
    if (!lastShown || Date.now() - parseInt(lastShown, 10) > EXPIRATION_TIME) {
      // Esperar un poco para no tapar la home apenas carga
      const t = setTimeout(() => {
        setIsVisible(true);
        guardar();
      }, 2500);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const onKey = (e) => e.key === "Escape" && setIsVisible(false);
    window.addEventListener("keydown", onKey);

    // El blockquote ya trae un link al reel: si el embed de Instagram no carga, no queda vacío
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else if (!document.getElementById("instagram-embed")) {
      const script = document.createElement("script");
      script.id = "instagram-embed";
      script.async = true;
      script.src = "https://www.instagram.com/embed.js";
      document.body.appendChild(script);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [isVisible]);

  const handleClose = () => setIsVisible(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center px-2"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-titulo"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto relative"
          >
            <button
              onClick={handleClose}
              aria-label="Cerrar"
              className="presionable absolute top-2 right-3 text-gray-500 hover:text-black transition-colors text-2xl leading-none"
            >
              ×
            </button>
            <h2 id="popup-titulo" className="text-xl font-semibold mb-4">Novedades</h2>

            <div>
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={REEL}
                data-instgrm-version="14"
                style={{ margin: 0, width: "100%", minWidth: 0 }}
              >
                <a href={REEL} target="_blank" rel="noreferrer" className="underline">
                  Ver el último proyecto en Instagram
                </a>
              </blockquote>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupModal;
