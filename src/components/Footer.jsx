import React from "react";
import { Phone, Instagram, FileText } from "lucide-react";

const redes = [
  { label: "WhatsApp", href: "https://wa.me/5493884723621", Icono: Phone },
  { label: "Instagram", href: "https://www.instagram.com/bakar.sas/", Icono: Instagram },
  { label: "Catálogo", href: "https://online.fliphtml5.com/wjsum/chln/", Icono: FileText },
];

export default function Footer() {
  return (
    <footer className="bg-[#eeeeee] py-10 px-6 text-center">
      <div className="flex justify-center gap-4 mb-4">
        {redes.map(({ label, href, Icono }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="presionable group">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm transition-[background-color,box-shadow,transform] duration-300 group-hover:bg-black group-hover:shadow-md group-hover:-translate-y-0.5">
              <Icono className="w-5 h-5 text-black transition-colors duration-300 group-hover:text-white" />
            </div>
          </a>
        ))}
      </div>

      <p className="text-sm text-gray-600">Bakar © {new Date().getFullYear()}</p>
    </footer>
  );
}
