import React from "react";
import { motion } from "framer-motion";
import Foto from "../components/Foto";
import { EASE_OUT, fadeUp, stagger, VIEWPORT } from "../lib/motion";

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
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-24 md:space-y-36">
        {eventos.map(({ year, title, text, image, reverse }, index) => (
          <article key={title} className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              className={`space-y-4 ${reverse ? "md:order-last" : ""}`}
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              {year && (
                <div className="overflow-hidden">
                  <motion.p
                    className="text-6xl md:text-7xl font-extralight text-gray-300 tracking-tight"
                    variants={{ hidden: { y: "100%" }, show: { y: 0, transition: { duration: 0.9, ease: EASE_OUT } } }}
                  >
                    {year}
                  </motion.p>
                </div>
              )}
              {index === 0 ? (
                <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</motion.h1>
              ) : (
                <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</motion.h2>
              )}
              <motion.p variants={fadeUp} className="text-gray-700 leading-relaxed">{text}</motion.p>
            </motion.div>
            <Foto src={image} alt={title} eager={index === 0} className="rounded-sm" />
          </article>
        ))}
      </div>

      <div className="bg-gray-100 py-20 text-center mt-28 -mb-20 overflow-hidden">
        <motion.div
          className="px-4"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.h2 variants={fadeUp} className="text-xl md:text-2xl font-semibold uppercase tracking-wide text-gray-800 mb-6">
            Gracias por ser parte de nuestro crecimiento
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
            Cada proyecto es el resultado de la pasión, el compromiso y el
            trabajo en equipo. Queremos expresar nuestro más sincero
            agradecimiento a nuestros proveedores, quienes nos brindan
            materiales de calidad; a los estudios de arquitectura y diseño, que
            confían en nuestro trabajo para dar vida a sus ideas; y, por
            supuesto, a nuestros clientes, quienes nos eligen y nos permiten
            ser parte de sus espacios. Su confianza nos motiva a seguir creando
            con excelencia y dedicación. ¡Gracias por acompañarnos en este
            camino!
          </motion.p>
        </motion.div>

        {/* Cinta continua de proveedores (la lista va duplicada para que el loop no tenga corte) */}
        <div
          className="mt-14 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
          aria-label="Proveedores"
        >
          <div className="cinta flex w-max">
            {[...logos, ...logos, ...logos, ...logos].map(({ src, nombre }, i) => (
              <img
                key={i}
                src={src}
                alt={i < logos.length ? nombre : ""}
                aria-hidden={i >= logos.length}
                className="h-20 w-40 mx-6 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
