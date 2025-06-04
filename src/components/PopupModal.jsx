
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PopupModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutos en milisegundos

  useEffect(() => {
    const lastShown = localStorage.getItem("popupLastShown");

    if (!lastShown || Date.now() - parseInt(lastShown, 10) > EXPIRATION_TIME) {
      setIsVisible(true);
      localStorage.setItem("popupLastShown", Date.now().toString());
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("popupLastShown", Date.now().toString());
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative"
          >
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">Novedades</h2>
            <p className="mb-4">Conocé nuestro nuevo showroom en Jujuy.</p>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Video"
                className="w-full h-64 rounded"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupModal;
