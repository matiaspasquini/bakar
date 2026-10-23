import React from "react";
import { motion } from "framer-motion";
import Foto from "../components/Foto";
import Encabezado from "../components/Encabezado";
import CierreCTA from "../components/CierreCTA";
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
  const [intro, ...hitos] = eventos;

  return (
    <>
      <section className="contenedor pb-24 md:pb-36">
        <Encabezado rotulo="Bakar — Jujuy" titulo="Nosotros" />

        {/* Quiénes somos: foto grande y el texto como manifiesto */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <Foto src={intro.image} alt="El equipo de Bakar" eager className="md:col-span-7 aspect-[4/3]" />
          <motion.div
            className="md:col-span-5"
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.h2 variants={fadeUp} className="rotulo mb-5">{intro.title}</motion.h2>
            <motion.p variants={fadeUp} className="text-2xl md:text-3xl font-light leading-snug tracking-tight">
              {intro.text}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Recorrido: el año queda fijo a la izquierda mientras pasan los hitos */}
      <section className="contenedor pb-24 md:pb-40">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="rotulo border-t border-gray-200 pt-6 mb-16 md:mb-24"
        >
          Recorrido
        </motion.p>

        <div className="space-y-24 md:space-y-40">
          {hitos.map(({ year, title, text, image }, index) => (
            <article key={title} className="grid md:grid-cols-12 gap-6 md:gap-8">
              <div className="md:col-span-3">
                <div className="md:sticky md:top-32 overflow-hidden">
                  <motion.p
                    className="text-7xl md:text-8xl font-extralight tracking-[-0.05em] text-gray-300 tabular-nums"
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 1, ease: EASE_OUT }}
                  >
                    {/* El año se muestra solo cuando cambia */}
                    {index > 0 && hitos[index - 1].year === year ? "" : year}
                  </motion.p>
                </div>
              </div>

              <div className={`md:col-span-9 grid md:grid-cols-9 gap-6 md:gap-8 items-end`}>
                <Foto
                  src={image}
                  alt={title}
                  className={`aspect-[4/3] ${index % 2 ? "md:col-span-5 md:col-start-5 md:order-last" : "md:col-span-6"}`}
                />
                <motion.div
                  className={index % 2 ? "md:col-span-4 md:col-start-1 md:row-start-1" : "md:col-span-3"}
                  variants={stagger(0.08)}
                  initial="hidden"
                  whileInView="show"
                  viewport={VIEWPORT}
                >
                  <motion.p variants={fadeUp} className="rotulo mb-3 tabular-nums">
                    {String(index + 1).padStart(2, "0")} / {String(hitos.length).padStart(2, "0")}
                  </motion.p>
                  <motion.h3 variants={fadeUp} className="text-2xl md:text-3xl font-light tracking-[-0.02em] mb-4">
                    {title}
                  </motion.h3>
                  <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed">{text}</motion.p>
                </motion.div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Agradecimiento + proveedores */}
      <section className="bg-[#f4f3f1] py-24 md:py-36 overflow-hidden">
        <motion.div
          className="contenedor grid md:grid-cols-12 gap-8"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <motion.h2 variants={fadeUp} className="rotulo md:col-span-3 pt-2">
            Gracias por ser parte de nuestro crecimiento
          </motion.h2>
          <motion.p variants={fadeUp} className="md:col-span-8 md:col-start-5 text-xl md:text-2xl font-light leading-relaxed text-gray-800">
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
          className="mt-20 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
          aria-label="Proveedores"
        >
          <div className="cinta flex w-max">
            {[...logos, ...logos, ...logos, ...logos].map(({ src, nombre }, i) => (
              <img
                key={i}
                src={src}
                alt={i < logos.length ? nombre : ""}
                aria-hidden={i >= logos.length}
                className="h-20 w-40 mx-8 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      <CierreCTA />
    </>
  );
}
