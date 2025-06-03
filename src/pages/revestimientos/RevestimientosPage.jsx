import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

// Imágenes de cada subcategoría
import reveskokkai from "../../assets/revestimientos/kokkai/Kokkai1.jpg";
import reveswud from "../../assets/revestimientos/wud/wud.jpg";
import revesbakar from "../../assets/revestimientos/wud/wud.jpg";



const categorias = [
  { nombre: "WUD", ruta: "/revestimientos/wud", img: reveswud },
  { nombre: "Bakar", ruta: "/revestimientos/bakar", img: revesbakar },
  { nombre: "Kokai", ruta: "/revestimientos/kokkai", img: reveskokkai },


];

export default function RevestimientoPage() {
  return (
    <>
      <section className="pt-24 px-4 pb-10 max-w-7xl mx-auto">


        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {categorias.map((cat, index) => (
            <Link
              to={cat.ruta}
              key={index}
              className="group transform transition-transform hover:scale-[1.01]"
            >
              <img
                src={cat.img}
                alt={cat.nombre}
                className="w-full h-[400px] object-cover shadow"
              />
              <div className="mt-4 text-left">
                <h3 className="text-xl font-semibold">{cat.nombre}</h3>
                <p className="text-sm relative w-fit after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-black group-hover:after:w-full after:transition-all after:duration-300">
                  Mobiliario
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}