import React from "react";
import Form from '../components/Form'

export default function ContactoSection() {
  return (
    <section id="contacto" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Columna izquierda */}
        <div>
          <h2 className="text-3xl font-light mb-4">Contacto</h2>
          <div className="w-10 h-[2px] bg-black mb-6"></div>

          <h3 className="font-semibold mb-2">Fabrica</h3>
          <p className="text-gray-800 mb-2">
            Juan B. Justo 488 - Dr. Manuel Belgrano (4600)<br />
            San Salvador de Jujuy<br />
            +54 9 388 472-3621<br />
            cocinas@bakarsas.com
          </p>

          <h4 className="mt-6 font-medium mb-1">Horario</h4>
          <p className="text-gray-800">
            Lunes a viernes de 10 a 19 hs<br />
            Sábados de 10 a 14 hs
          </p>



        </div>

        {/* Columna derecha: Mapa */}
        <div className="w-full h-[400px]">
          <iframe
            title="Ubicación"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3639.5045869638825!2d-65.28931192377026!3d-24.189101384955833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941b0f586c078429%3A0xc7206b9bcddf02a1!2sJuan%20B.%20Justo%20488%2C%20Y4600%20San%20Salvador%20de%20Jujuy%2C%20Jujuy!5e0!3m2!1ses-419!2sar!4v1748623215119!5m2!1ses-419!2sar"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded shadow"
          ></iframe>
        </div>
      </div>
                {/* Formulario */}
        <div className="max-w-7xl mx-auto px-4">
          <Form />
        </div>

    </section>
  );
}
