import React from "react";
import { Phone, Instagram, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#eeeeee] py-10 px-6 text-center">
      <div className="flex justify-center gap-4 mb-4">
        <a href="https://api.whatsapp.com/send/?phone=5493884723621&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:scale-105 transition">
            <Phone className="w-5 h-5 text-black" />
          </div>
        </a>
        <a href="https://www.instagram.com/bakar.sas?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:scale-105 transition">
            <Instagram className="w-5 h-5 text-black" />
          </div>
        </a>
        <a href="https://online.fliphtml5.com/wjsum/chln/?fbclid=PAZXh0bgNhZW0CMTEAAafC_VeiOcs5T7BG_7BJu5qFsf5D_V7NzPBOeWmbbUkiBFew_nUpqD9nlhRoHw_aem_nw2QlOh6jDiF_dea4NcMQw#p=1" target="_blank" rel="noreferrer">
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:scale-105 transition">
            <FileText className="w-5 h-5 text-black" />
            </div>
        </a>
      </div>

      <p className="text-sm text-gray-600">Bakar © Copyright 2025</p>
      <p className="text-sm text-gray-500 mt-1">By Randev</p>
    </footer>
  );
}
