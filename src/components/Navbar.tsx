import React, { useState } from 'react';
import { Calendar, Menu, X, Sparkles, UserCheck } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (packageId?: string) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#EBE3D5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <a href="#" className="flex items-center gap-2 group whitespace-nowrap shrink-0">
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-[#1A1817] group-hover:text-[#B88E53] transition-colors">
              AURA ARTISTRY
            </span>
            <span className="text-xs text-[#8A7F73] font-sans tracking-widest uppercase hidden sm:inline-block border-l border-[#DCD3C4] pl-3 ml-1">
              Makeup Studio
            </span>
          </a>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4A453E]">
            <a href="#layanan" className="hover:text-[#1A1817] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0">
              Layanan & Paket
            </a>
            <a href="#portofolio" className="hover:text-[#1A1817] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0">
              Portofolio
            </a>
            <a href="#transformasi" className="hover:text-[#1A1817] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0">
              Transformasi
            </a>
            <a href="#jadwal" className="hover:text-[#1A1817] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0">
              Cek Kalender
            </a>
            <a href="#ulasan" className="hover:text-[#1A1817] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0">
              Ulasan Pengantin
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAdmin}
              className="px-3 py-2 text-xs font-medium text-[#6B6256] hover:text-[#1A1817] border border-[#DDD3C3] rounded-lg hover:bg-[#F5EFEB] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
              title="Akses jadwal internal studio MUA"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Studio MUA</span>
            </button>
            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-white bg-[#1A1817] hover:bg-[#B88E53] rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Pesan Jadwal</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-2 text-xs font-semibold text-white bg-[#1A1817] rounded-md"
            >
              Pesan
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#4A453E] hover:text-[#1A1817] rounded-md"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EBE3D5] bg-[#FDFBF7] px-4 pt-3 pb-6 space-y-3">
          <a
            href="#layanan"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#4A453E] hover:text-[#1A1817]"
          >
            Layanan & Paket
          </a>
          <a
            href="#portofolio"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#4A453E] hover:text-[#1A1817]"
          >
            Portofolio
          </a>
          <a
            href="#transformasi"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#4A453E] hover:text-[#1A1817]"
          >
            Transformasi
          </a>
          <a
            href="#jadwal"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#4A453E] hover:text-[#1A1817]"
          >
            Cek Kalender Jadwal
          </a>
          <a
            href="#ulasan"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#4A453E] hover:text-[#1A1817]"
          >
            Ulasan Pengantin
          </a>
          <div className="pt-2 border-t border-[#EBE3D5] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 text-xs font-medium text-[#5A5247] border border-[#D5C9B7] rounded-lg text-center"
            >
              Akses Studio MUA (Admin)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-xs font-semibold uppercase text-white bg-[#1A1817] rounded-lg text-center"
            >
              Pesan Jadwal Sekarang
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
