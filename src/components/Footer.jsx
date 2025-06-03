import React from "react";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#eeeeee] py-10 px-6 text-center">
      <div className="flex justify-center gap-4 mb-4">
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:scale-105 transition">
            <Facebook className="w-5 h-5 text-black" />
          </div>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:scale-105 transition">
            <Instagram className="w-5 h-5 text-black" />
          </div>
        </a>
      </div>

      <p className="text-sm text-gray-600">Bakar © Copyright 2025</p>
      <p className="text-sm text-gray-500 mt-1">By Randev</p>
    </footer>
  );
}
