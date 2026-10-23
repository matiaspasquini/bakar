import React from "react";
import { motion } from "framer-motion";

//imagenes
import nosotros from "../assets/nosotros/nosotros.webp";
import escalera from "../assets/nosotros/escalera.webp";
import casadir from "../assets/nosotros/casadir.webp";
import casacor from "../assets/nosotros/casacor.webp";
import formobile from "../assets/nosotros/formobile.webp";
import paraguay from "../assets/nosotros/paraguay.webp";

// logos
import hiperplaca from "../assets/nosotros/hiperplaca.webp";
import egger from "../assets/nosotros/egger.webp";
import estilo from "../assets/nosotros/estilo.webp";
import maderplak from "../assets/nosotros/maderplak.webp";
import kilowat from "../assets/nosotros/kilowat.webp";

const logos = [
  { src: hiperplaca, nombre: "Hiperplaca" },
  { src: egger, nombre: "Egger" },
  { src: estilo, nombre: "Estilo" },
  { src: maderplak, nombre: "Maderplak" },
  { src: kilowat, nombre: "Kilowat" },
];

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
    <>
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-20 md:space-y-28">
        {eventos.map(({ year, title, text, image, reverse }, index) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            <div className={`space-y-4 ${reverse ? "md:order-last" : ""}`}>
              {year && (
                <p className="text-5xl font-extralight text-gray-300">{year}</p>
              )}
              {index === 0 ? (
                <h1 className="text-3xl font-semibold text-black">{title}</h1>
              ) : (
                <h2 className="text-2xl font-semibold text-black">{title}</h2>
              )}
              <p className="text-gray-700 leading-relaxed">{text}</p>
            </div>
            <img
              src={image}
              alt={title}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-auto object-cover rounded shadow bg-gray-100"
            />
          </motion.article>
        ))}
      </div>

      <div className="bg-gray-100 py-16 px-4 text-center mt-24 -mb-20">
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

        <div className="max-w-5xl mx-auto mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
          {logos.map(({ src, nombre }) => (
            <img
              key={nombre}
              src={src}
              alt={nombre}
              loading="lazy"
              className="mx-auto h-20 object-contain grayscale hover:grayscale-0 transition"
            />
          ))}
        </div>
      </div>
    </>
  );
}
