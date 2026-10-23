import Lenis from "lenis";

// Scroll suave con inercia (solo con mouse/trackpad: en touch queda el nativo).
// Una sola instancia para todo el sitio.
let lenis = null;

export function iniciarScroll() {
  if (lenis || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4) });
  let raf;
  const loop = (time) => {
    lenis.raf(time);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => {
    cancelAnimationFrame(raf);
    lenis.destroy();
    lenis = null;
  };
}

export const irArriba = () => (lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0));
export const frenarScroll = () => lenis?.stop();
export const soltarScroll = () => lenis?.start();
