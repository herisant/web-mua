import React from 'react';
import { Calendar, ArrowRight, ShieldCheck, HeartHandshake, Sparkles, Star } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';

interface HeroProps {
  onOpenBooking: () => void;
  onExplorePortfolio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExplorePortfolio }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#EBE3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Screen 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Subtle editorial kicker (no pill badge) */}
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#B88E53] mb-4">
              <span>AURA BRIDAL & BEAUTY ATELIER</span>
              <span aria-hidden="true" className="text-[#D8CEBE]">/</span>
              <span>JAKARTA & JABODETABEK</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1A1817] font-semibold leading-[1.12] tracking-tight text-balance mb-6">
              Rias Wajah Mewah & Abadi untuk Momen Teristimewa Anda
            </h1>

            {/* Lead Copy */}
            <p className="text-base sm:text-lg text-[#5C554B] leading-relaxed max-w-xl mb-8">
              Sentuhan tangan profesional dengan teknik <em>complexion</em> bernapas, tahan 18+ jam tanpa crack, dan menonjolkan kecantikan autentik Anda di hari pernikahan, wisuda, maupun momen berharga lainnya.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <button
                onClick={onOpenBooking}
                className="px-7 py-3.5 text-sm font-semibold tracking-wide uppercase text-white bg-[#1A1817] hover:bg-[#B88E53] rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 group whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Pesan Jadwal Sekarang</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExplorePortfolio}
                className="px-6 py-3.5 text-sm font-medium text-[#2E2A25] hover:text-[#1A1817] bg-[#F5EFEB] hover:bg-[#EAE2D8] border border-[#DDD3C3] rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Eksplorasi Portofolio</span>
              </button>
            </div>

            {/* Trust markers (unboxed inline typography) */}
            <div className="pt-6 border-t border-[#EAE2D8] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#70675B]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#B88E53]" />
                <span>100% Produk High-End Halal & Hypoallergenic</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#B88E53]" />
                <span>Home Service & Studio On-Location</span>
              </div>
            </div>

          </div>

          {/* Right Column: Large Visual Media Container */}
          <div className="lg:col-span-6 relative flex items-center">
            <div className="w-full relative aspect-[4/3] lg:aspect-auto lg:h-[560px] rounded-2xl overflow-hidden shadow-lg border border-[#E8DEC9] bg-[#F5EFEB]">
              <img
                src={HERO_IMAGE}
                alt="Pengantin AURA Artistry dengan riasan hijab modern elegan"
                className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle elegant corner label */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#1A1817]/75 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#E8D0AE] font-sans">Look Of The Season</p>
                  <p className="font-serif text-sm font-medium tracking-wide">Signature Royal Bride — Velvet Luminous</p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-white/70">Ketahanan Uji</p>
                  <p className="text-xs font-semibold text-emerald-400">18+ Jam Tanpa Retak</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Adjacency Proof Row: Full-width row below hero split */}
        <div className="mt-14 pt-10 border-t border-[#EBE3D5] grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <div className="font-serif text-3xl lg:text-4xl font-bold text-[#1A1817] tabular-nums mb-1">
              850+
            </div>
            <p className="text-xs text-[#70675B] font-medium uppercase tracking-wider">
              Pengantin Bahagia Dirias
            </p>
            <p className="text-xs text-[#9E9385] mt-0.5">Sejak 2018 di seluruh Jabodetabek</p>
          </div>

          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-3xl lg:text-4xl font-bold text-[#1A1817] tabular-nums">
                4.98
              </span>
              <span className="text-sm text-[#8A7F73]">/ 5.0</span>
            </div>
            <p className="text-xs text-[#70675B] font-medium uppercase tracking-wider">
              Kepuasan Klien Terverifikasi
            </p>
            <p className="text-xs text-[#9E9385] mt-0.5">Berdasarkan 520+ ulasan mandiri</p>
          </div>

          <div>
            <div className="font-serif text-3xl lg:text-4xl font-bold text-[#1A1817] tabular-nums mb-1">
              18 Jam
            </div>
            <p className="text-xs text-[#70675B] font-medium uppercase tracking-wider">
              Formula Tahan Air Mata & Keringat
            </p>
            <p className="text-xs text-[#9E9385] mt-0.5">Teknik setting anti-crack bergaransi</p>
          </div>

          <div>
            <div className="font-serif text-3xl lg:text-4xl font-bold text-[#1A1817] tabular-nums mb-1">
              100%
            </div>
            <p className="text-xs text-[#70675B] font-medium uppercase tracking-wider">
              Alat Steril & Produk Original
            </p>
            <p className="text-xs text-[#9E9385] mt-0.5">UV box sanitizer sebelum tiap klien</p>
          </div>
        </div>

      </div>
    </section>
  );
};
