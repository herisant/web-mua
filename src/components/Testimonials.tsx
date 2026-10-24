import React from 'react';
import { Star, MapPin, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const Testimonials: React.FC = () => {
  return (
    <section id="ulasan" className="py-16 lg:py-24 border-b border-[#EBE3D5] bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-medium uppercase tracking-widest text-[#B88E53] mb-2">
            PENGALAMAN & KEPUASAN KLIEN
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1817] font-semibold tracking-tight mb-4">
            Cerita Bahagia dari Para Pengantin & Klien Kami
          </h2>
          <p className="text-[#665E53] text-sm sm:text-base leading-relaxed">
            Kepercayaan Anda adalah amanah terindah bagi kami. Simak bagaimana sentuhan riasan AURA Artistry menyempurnakan hari istimewa mereka.
          </p>
        </div>

        {/* 3-in-a-Row Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-7 rounded-2xl border border-[#E8DEC9] shadow-sm flex flex-col justify-between relative"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-[#B88E53] mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Content */}
                <p className="text-sm text-[#474138] leading-relaxed mb-6 italic">
                  “{t.content}”
                </p>
              </div>

              {/* Client Info */}
              <div className="pt-4 border-t border-[#F0E8DC] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1A1817] text-[#E8D0AE] font-serif font-bold text-sm flex items-center justify-center shrink-0">
                  {t.avatarText}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1A1817]">
                    {t.clientName}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#8A7F73] mt-0.5">
                    <span>{t.event}</span>
                    <span aria-hidden="true">·</span>
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Studio Consultation Notice */}
        <div className="mt-12 text-center text-xs text-[#7A7063]">
          Terverifikasi lebih dari 520+ ulasan pengantin di Bridestory & Google Reviews dengan rating rata-rata 4.98 bintang.
        </div>

      </div>
    </section>
  );
};
