// Sistema de movimiento de Bakar: pocas curvas, siempre las mismas.
// La idea es la de un cajón bien hecho: arranca firme y frena suave.

export const EASE_OUT = [0.23, 1, 0.32, 1]; // entradas y respuestas de UI
export const EASE_IN_OUT = [0.77, 0, 0.175, 1]; // cosas que se mueven en pantalla
export const EASE_DRAWER = [0.32, 0.72, 0, 1]; // menú lateral

export const DUR = {
  rapido: 0.18, // hover, dropdown
  ui: 0.25, // popup, menú
  reveal: 0.9, // fotos y textos que entran con el scroll
};

// Para whileInView: que se dispare una sola vez y un poco antes de llegar
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" };

// Texto que sube y aparece
export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

// Contenedor que escalona a sus hijos
export const stagger = (cada = 0.06, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: cada, delayChildren: delay } },
});
