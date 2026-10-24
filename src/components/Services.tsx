import React, { useState } from 'react';
import { Check, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { SERVICE_PACKAGES } from '../data/mockData';

interface ServicesProps {
  onSelectPackage: (packageId: string) => void;
}

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const Services: React.FC<ServicesProps> = ({ onSelectPackage }) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'wedding' | 'graduation' | 'prewedding' | 'event'>('all');

  const filteredPackages = filterCategory === 'all'
    ? SERVICE_PACKAGES
    : SERVICE_PACKAGES.filter((p) => p.category === filterCategory);

  return (
    <section id="layanan" className="py-16 lg:py-24 border-b border-[#EBE3D5] bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs font-medium uppercase tracking-widest text-[#B88E53] mb-2">
            PILIHAN LAYANAN EKSKLUSIF
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1817] font-semibold tracking-tight text-balance mb-4">
            Paket Riasan Wajah & Penataan Rambut Terkurasi
          </h2>
          <p className="text-[#665E53] text-sm sm:text-base leading-relaxed">
            Transparan tanpa biaya tersembunyi. Setiap paket mencakup skin prep premium, bulu mata artisan, dan garansi ketahanan riasan sepanjang acara.
          </p>

          {/* Interactive filter segmented buttons (functional tabs) */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#EAE2D8] rounded-xl mt-6">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filterCategory === 'all'
                  ? 'bg-white text-[#1A1817] shadow-sm font-semibold'
                  : 'text-[#6B6153] hover:text-[#1A1817]'
              }`}
            >
              Semua Paket
            </button>
            <button
              onClick={() => setFilterCategory('wedding')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filterCategory === 'wedding'
                  ? 'bg-white text-[#1A1817] shadow-sm font-semibold'
                  : 'text-[#6B6153] hover:text-[#1A1817]'
              }`}
            >
              Pernikahan (Wedding)
            </button>
            <button
              onClick={() => setFilterCategory('graduation')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filterCategory === 'graduation'
                  ? 'bg-white text-[#1A1817] shadow-sm font-semibold'
                  : 'text-[#6B6153] hover:text-[#1A1817]'
              }`}
            >
              Wisuda / Graduation
            </button>
            <button
              onClick={() => setFilterCategory('prewedding')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filterCategory === 'prewedding'
                  ? 'bg-white text-[#1A1817] shadow-sm font-semibold'
                  : 'text-[#6B6153] hover:text-[#1A1817]'
              }`}
            >
              Prewedding & Lamaran
            </button>
            <button
              onClick={() => setFilterCategory('event')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                filterCategory === 'event'
                  ? 'bg-white text-[#1A1817] shadow-sm font-semibold'
                  : 'text-[#6B6153] hover:text-[#1A1817]'
              }`}
            >
              Party & Prom Glam
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl bg-white border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                pkg.popular
                  ? 'border-[#B88E53] shadow-md ring-1 ring-[#B88E53]/40'
                  : 'border-[#E6DECة border-[#E8DEC9] shadow-sm hover:shadow-md'
              }`}
            >
              {/* Image Preview on Card */}
              <div className="relative h-48 w-full overflow-hidden bg-[#F5EFEB]">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                
                {pkg.popular && (
                  <div className="absolute top-3 right-3 bg-[#B88E53] text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm">
                    Paling Diminati
                  </div>
                )}

                <div className="absolute bottom-3 left-3 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-white/90">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>
              </div>

              {/* Package Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1A1817] mb-1">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-[#6B6153] mb-4 leading-relaxed">
                    {pkg.subtitle}
                  </p>

                  {/* Price */}
                  <div className="pt-3 pb-4 mb-4 border-y border-[#F0E8DC]">
                    <span className="text-xs text-[#8A7F73] block mb-0.5">Biaya Investasi</span>
                    <div className="font-serif text-3xl font-bold text-[#1A1817] tabular-nums">
                      {formatRupiah(pkg.price)}
                    </div>
                    <span className="text-[11px] text-[#8C8377] block mt-0.5">
                      DP 30% untuk mengunci tanggal
                    </span>
                  </div>

                  {/* Inclusions Highlights */}
                  <div className="space-y-2.5 mb-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#4A453E]">
                      Fasilitas Sudah Termasuk:
                    </p>
                    {pkg.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#524B42]">
                        <Check className="w-4 h-4 text-[#B88E53] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Select Package CTA */}
                <button
                  onClick={() => onSelectPackage(pkg.id)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? 'bg-[#1A1817] hover:bg-[#B88E53] text-white shadow-sm'
                      : 'bg-[#F5EFEB] hover:bg-[#1A1817] text-[#2A2621] hover:text-white border border-[#DDD3C3]'
                  }`}
                >
                  <span>Pilih & Pesan Jadwal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Note on Custom / Outside Jabodetabek */}
        <div className="mt-12 text-center text-xs text-[#7A7063]">
          <span>Butuh paket khusus luar kota (destination wedding) atau kebutuhan rombongan keluarga besar?</span>{' '}
          <a
            href="https://wa.me/6281289001234?text=Halo%20AURA%20Artistry,%20saya%20ingin%20konsultasi%20paket%20khusus%20MUA"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#1A1817] underline hover:text-[#B88E53] ml-1"
          >
            Konsultasi Langsung via WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
