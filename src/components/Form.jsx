import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const mensaje = formData.get("mensaje");

    if (mensaje.length < 20) {
      alert("El mensaje debe tener al menos 20 caracteres.");
      return;
    }

    emailjs
      .sendForm(
        "service_7t84cai",   // tu service ID
        "template_k4yo0xh",  // tu template ID
        form.current,
        "4Y3E9eI5lkez2ESeM"  // tu public key
      )
      .then(
        (result) => {
          setSent(true);
          setShowToast(true);
          form.current.reset();
          setTimeout(() => setShowToast(false), 4000);
        },
        (error) => {
          alert("Hubo un error. Intentalo nuevamente.");
          console.log(error.text);
        }
      );
  };

  return (
    <div className="relative">
      <form ref={form} onSubmit={sendEmail} className="mt-8 space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Motivo de contacto
        </label>
        <select name="motivo" className="w-full border border-gray-300 p-3 rounded" required>
          <option value="Cotización">Cotización</option>
          <option value="Materiales">Materiales</option>
          <option value="Planos">Planos</option>
          <option value="Otro">Otro</option>
        </select>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          className="w-full border border-gray-300 p-3 rounded"
          minLength={2}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-3 rounded"
          required
        />
        <textarea
          name="mensaje"
          placeholder="Mensaje"
          rows="4"
          className="w-full border border-gray-300 p-3 rounded"
          minLength={30}
          required
        />
        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
        >
          Enviar
        </button>
      </form>

<AnimatePresence>
  {showToast && (
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 30 }}
  className="fixed top-6 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md z-50"
>
  ¡Mensaje enviado exitosamente! Estaremos comunicándonos contigo a la brevedad.
</motion.div>
  )}
</AnimatePresence>
    </div>
  );
}
