import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { motion, AnimatePresence } from "framer-motion";

const MIN_MENSAJE = 20;

const inputClass =
  "w-full border border-gray-300 p-3 rounded bg-white hover:border-gray-400 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/5 transition-[border-color,box-shadow] duration-200";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";

export default function ContactForm() {
  const form = useRef();
  // "idle" | "enviando" | "ok" | "error"
  const [estado, setEstado] = useState("idle");

  const sendEmail = (e) => {
    e.preventDefault();
    setEstado("enviando");

    emailjs
      .sendForm(
        "service_7t84cai", // service ID
        "template_k4yo0xh", // template ID
        form.current,
        "4Y3E9eI5lkez2ESeM" // public key
      )
      .then(
        () => {
          setEstado("ok");
          form.current.reset();
          setTimeout(() => setEstado("idle"), 5000);
        },
        (error) => {
          setEstado("error");
          console.error(error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-4">
      <h2 className="font-semibold">Escribinos</h2>

      <div>
        <label htmlFor="motivo" className={labelClass}>Motivo de contacto</label>
        <select id="motivo" name="motivo" className={inputClass} required>
          <option value="Cotización">Cotización</option>
          <option value="Materiales">Materiales</option>
          <option value="Planos">Planos</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div>
        <label htmlFor="nombre" className={labelClass}>Nombre</label>
        <input id="nombre" type="text" name="nombre" autoComplete="name" className={inputClass} minLength={2} required />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email</label>
        <input id="email" type="email" name="email" autoComplete="email" className={inputClass} required />
      </div>

      <div>
        <label htmlFor="mensaje" className={labelClass}>Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          className={inputClass}
          minLength={MIN_MENSAJE}
          placeholder={`Contanos tu proyecto (mínimo ${MIN_MENSAJE} caracteres)`}
          required
        />
      </div>

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="presionable group inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-[transform,background-color] duration-200 disabled:opacity-60"
      >
        {estado === "enviando" ? "Enviando…" : "Enviar"}
        {estado !== "enviando" && <span className="flecha" aria-hidden>→</span>}
      </button>

      <AnimatePresence>
        {(estado === "ok" || estado === "error") && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            className={`p-4 rounded text-sm ${estado === "ok" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
          >
            {estado === "ok"
              ? "¡Mensaje enviado! Nos vamos a comunicar con vos a la brevedad."
              : "No pudimos enviar el mensaje. Probá de nuevo o escribinos por WhatsApp."}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
