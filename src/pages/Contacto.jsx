import React from "react";
import Encabezado from "../components/Encabezado";
import Form from "../components/Form";

const MAPA =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.5045869638825!2d-65.28931192377026!3d-24.189101384955833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941b0f586c078429%3A0xc7206b9bcddf02a1!2sJuan%20B.%20Justo%20488%2C%20Y4600%20San%20Salvador%20de%20Jujuy%2C%20Jujuy!5e0!3m2!1ses-419!2sar!4v1748623215119!5m2!1ses-419!2sar";

export default function Contacto() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <Encabezado titulo="Contacto" />

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div>
            <h2 className="font-semibold mb-2">Fábrica</h2>
            <address className="not-italic text-gray-800 leading-relaxed">
              Juan B. Justo 488 - Dr. Manuel Belgrano (4600)<br />
              San Salvador de Jujuy<br />
              <a href="tel:+5493884723621" className="hover:underline">+54 9 388 472-3621</a><br />
              <a href="mailto:cocinas@bakarsas.com" className="hover:underline">cocinas@bakarsas.com</a>
            </address>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Horario</h2>
            <p className="text-gray-800 leading-relaxed">
              Lunes a viernes de 10 a 19 hs<br />
              Sábados de 10 a 14 hs
            </p>
          </div>

          <Form />
        </div>

        <div className="w-full h-[400px] md:h-[560px] md:sticky md:top-28">
          <iframe
            title="Ubicación de la fábrica de Bakar"
            src={MAPA}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded shadow"
          />
        </div>
      </div>
    </section>
  );
}
