// components/PopupModal.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PopupModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const alreadyShown = localStorage.getItem("popupShown");
    if (!alreadyShown) {
      setIsVisible(true);
      localStorage.setItem("popupShown", "true");
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white max-w-lg w-full p-6 rounded-lg shadow-xl relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">¡Novedades!</h2>
            <p className="mb-4">Mirá un adelanto de nuestros últimos proyectos.</p>
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Novedades"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
