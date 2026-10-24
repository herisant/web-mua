import React from 'react';
import { Calendar, Instagram, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#1A1817] text-[#D8CEBE] pt-16 pb-12 border-t border-[#2A2623]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#2D2825]">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <span className="font-serif text-2xl font-bold tracking-wider text-white block">
              AURA ARTISTRY
            </span>
            <p className="text-xs text-[#A89E90] leading-relaxed">
              Atelier rias pengantin & beauty studio profesional di Jakarta Selatan. Mengusung filosofi complexion breathable, awet tanpa crack, dan menonjolkan kecantikan autentik setiap wanita.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2A2623] hover:bg-[#B88E53] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram AURA Artistry"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/6281289001234"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2A2623] hover:bg-emerald-700 text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp AURA Artistry"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Studio Address */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Studio & Lokasi
            </h4>
            <div className="text-xs text-[#A89E90] space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B88E53] shrink-0 mt-0.5" />
                <span>Jl. Suryo No. 42, Senopati, Kebayoran Baru, Jakarta Selatan 12180</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B88E53] shrink-0" />
                <span>Buka Setiap Hari: 06:00 – 19:00 WIB (Sesuai Reservasi)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Layanan Utama
            </h4>
            <ul className="text-xs text-[#A89E90] space-y-2">
              <li>
                <a href="#layanan" className="hover:text-white transition-colors">Rias Pengantin Akad & Resepsi</a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-white transition-colors">Makeup Wisuda & Graduation</a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-white transition-colors">Prewedding & Lamaran / Sangjit</a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-white transition-colors">Party & Photoshoot Red Carpet</a>
              </li>
              <li>
                <a href="#jadwal" className="hover:text-white transition-colors">Cek Ketersediaan Slot Jadwal</a>
              </li>
            </ul>
          </div>

          {/* Booking CTA Callout */}
          <div className="space-y-3 bg-[#24201D] p-5 rounded-xl border border-[#36302B]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Kunci Tanggal Hari Bahagia Anda
            </h4>
            <p className="text-xs text-[#A89E90] leading-relaxed">
              Slot akhir pekan dan musim pernikahan cepat terisi. Reservasi jadwal Anda secara instan hari ini.
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full py-2.5 px-4 bg-[#B88E53] hover:bg-[#A37B43] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reservasi Jadwal</span>
            </button>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7063]">
          <p>© {new Date().getFullYear()} AURA Artistry Makeup Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#layanan" className="hover:text-white transition-colors">Paket & Harga</a>
            <span aria-hidden="true">·</span>
            <a href="#portofolio" className="hover:text-white transition-colors">Galeri Look</a>
            <span aria-hidden="true">·</span>
            <a href="#jadwal" className="hover:text-white transition-colors">Kalender Slot</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
