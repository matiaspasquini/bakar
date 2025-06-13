import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer"

//imagenes
import nosotros from "../assets/nosotros/nosotros.png";
import escalera from "../assets/nosotros/escalera.jpg";
import casadir from "../assets/nosotros/casadir.jpg";
import casacor from "../assets/nosotros/casacor.jpg";
import formobile from "../assets/nosotros/formobile.jpg";
import paraguay from "../assets/nosotros/paraguay.jpg";

// logos
import hiperplaca from "../assets/nosotros/hiperplaca.png";
import egger from "../assets/nosotros/egger.png";
import estilo from "../assets/nosotros/estilo.png";
import maderplak from "../assets/nosotros/maderplak.png";
import kilowat from "../assets/nosotros/kilowat.png";
import { div } from "framer-motion/client";

const logos = [hiperplaca, egger, estilo, maderplak, kilowat];

const eventos = [
  {
    year: "",
    title: "¿Quiénes somos?",
    text: `Diseñamos, fabricamos e instalamos puertas y muebles a medida con un equipo técnico de profesionales jóvenes y dinámicos, comprometidos con la calidad y la eficiencia. Nos anticipamos a los desafíos y respondemos con agilidad para asegurar un proceso fluido, siempre ofreciendo soluciones personalizadas que se ajustan a las necesidades de cada proyecto.`,
    image: nosotros,
    reverse: false,
  },
  {
    year: "2023",
    title: "Premio FADEA",
    text: `Premio FADEA otorgado por la revista Arq. Clarín como reconocimiento a la innovación en diseño y calidad de ejecución de nuestros proyectos de escaleras.`,
    image: escalera,
    reverse: true,
  },
  {
    year: "2023",
    title: "Casa DIR - Jujuy",
    text: `Participamos del evento de diseño, interiorismo y renovación Casa DIR en San Salvador de Jujuy, junto a Nube Arquitectura y Territorio Arquitectura.`,
    image: casadir,
    reverse: false,
  },
  {
    year: "2023",
    title: "Visita a Casacor - Brasil",
    text: `Una muestra internacional de arquitectura, diseño de interiores y paisajismo. Buscamos las últimas tendencias para ofrecer lo mejor a nuestros clientes.`,
    image: casacor,
    reverse: true,
  },
  {
    year: "2023",
    title: "Formóbile - São Paulo",
    text: `Asistimos a la Feria Internacional del Mueble y la Madera para mantenernos en la vanguardia de la industria y optimizar nuestros procesos productivos.`,
    image: formobile,
    reverse: false,
  },
  {
    year: "2024",
    title: "Expansión a Paraguay",
    text: `Desembarcamos en Asunción con nuestro primer proyecto internacional en el Edificio San Clemente, junto a Building Innovations.`,
    image: paraguay,
    reverse: true,
  },
];

export default function Nosotros() {
  return (
<section>
        <div className="pt-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto space-y-24">
        {eventos.map(({ year, title, text, image, reverse }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className={`space-y-4 ${reverse ? 'md:flex-row-reverse' : ''}`}>
              {year && (
                <h3 className="text-5xl font-extralight text-gray-300">
                  {year}
                </h3>
              )}
              <h2 className="text-2xl font-semibold text-black">{title}</h2>
              <p className="text-gray-700 leading-relaxed">{text}</p>
            </div>
            <img
              src={image}
              alt={title}
              className="w-full h-auto object-cover rounded shadow"
            />
          </motion.div>
        ))}
      </div>

      <div className="bg-gray-100 py-16 mb-2 px-4 text-center mt-24">
        <h2 className="text-xl md:text-2xl font-semibold uppercase text-gray-800 mb-6">
          Gracias por ser parte de nuestro crecimiento
        </h2>
        <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
          Cada proyecto es el resultado de la pasión, el compromiso y el
          trabajo en equipo. Queremos expresar nuestro más sincero
          agradecimiento a nuestros proveedores, quienes nos brindan
          materiales de calidad; a los estudios de arquitectura y diseño, que
          confían en nuestro trabajo para dar vida a sus ideas; y, por
          supuesto, a nuestros clientes, quienes nos eligen y nos permiten
          ser parte de sus espacios. Su confianza nos motiva a seguir creando
          con excelencia y dedicación. ¡Gracias por acompañarnos en este
          camino!
        </p>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-center">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Proveedor ${index + 1}`}
              className="mx-auto h-20 object-contain filter grayscale hover:filter-none transition"
            />
          ))}
        </div>
      </div>
    </div>
    <Footer/>
</section>
  );
}<Footer/>
