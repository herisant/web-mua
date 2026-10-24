import React, { useState, useEffect } from 'react';
import { Eye, X, MapPin, Calendar, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/mockData';
import { PortfolioItem } from '../types';

interface PortfolioGridProps {
  onSelectLookForBooking: (lookTitle: string) => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ onSelectLookForBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('semua');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = activeCategory === 'semua'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="portofolio" className="py-16 lg:py-24 border-b border-[#EBE3D5] bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-medium uppercase tracking-widest text-[#B88E53] mb-2">
              GALERI & KARYA TERBARU
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1817] font-semibold tracking-tight">
              Portofolio Riasan Eksklusif
            </h2>
            <p className="text-[#665E53] text-sm mt-2 max-w-xl">
              Setiap goresan dirancang khusus menyesuaikan bentuk wajah, warna kulit, karakter pribadi, dan busana hari istimewa Anda.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F3ECE2] rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveCategory('semua')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeCategory === 'semua'
                  ? 'bg-white text-[#1A1817] shadow-sm font-semibold'
                  : 'text-[#6B6153] hover:text-[#1A1817]'
              }`}
            >
              Semua Karya
            </button>
            <button
              onClick={() => setActiveCategory('traditional')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeCategory === 'traditional'
                  ? 'bg-white text-[#1A1817] shadow-sm font-semibold'
                  : 'text-[#6B6153] hover:text-[#1A1817]'
              }`}
            >
              Traditional Bridal
            </button>
            <button
              onClick={() => setActiveCategory('modern')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeCategory === 'modern'
                  ? 'bg-white text-[#1A1817] shadow-sm font-semibold'
                  : 'text-[#6B6153] hover:text-[#1A1817]'
              }`}
            >
              Modern Bride
            </button>
            <button
              onClick={() => setActiveCategory('wisuda')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeCategory === 'wisuda'
                  ? 'bg-white text-[#1A1817] shadow-sm font-semibold'
                  : 'text-[#6B6153] hover:text-[#1A1817]'
              }`}
            >
              Wisuda & Graduation
            </button>
          </div>
        </div>

        {/* Portfolio Masonry / Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`group relative rounded-2xl overflow-hidden border border-[#E8DEC9] bg-[#FAF7F2] cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 ${
                index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Image Container */}
              <div className={`relative w-full overflow-hidden ${index === 0 ? 'h-80 sm:h-96' : 'h-80'}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Contrast scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Hover overlay hint */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </div>

                {/* Bottom text overlay */}
                <div className="absolute bottom-0 inset-x-0 p-6 text-white flex flex-col justify-end">
                  {/* Unboxed metadata with subtle separator */}
                  <div className="flex items-center gap-2 text-xs text-[#E8D0AE] mb-1.5 font-medium tracking-wide">
                    <span>{item.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.complexionFinish}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-white/80">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#E8D0AE]" />
                      <span>{item.location}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.date}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#FDFBF7] rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-[#D5C7B4]">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
              aria-label="Tutup jendela rincian look"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Media Display */}
            <div className="lg:w-1/2 relative bg-black/90 min-h-[300px] lg:min-h-full flex items-center justify-center">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full max-h-[75vh] object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right: Detailed Breakdown */}
            <div className="lg:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[60vh] lg:max-h-[85vh] flex flex-col justify-between">
              <div>
                {/* Category & Status */}
                <div className="flex items-center gap-2 text-xs text-[#B88E53] font-medium uppercase tracking-wider mb-2">
                  <span>{selectedItem.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedItem.complexionFinish}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1817] mb-3">
                  {selectedItem.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5C554B] leading-relaxed mb-6">
                  {selectedItem.description}
                </p>

                {/* Cosmetic Formula Breakdown */}
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DEC9] mb-6 space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1817] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#B88E53]" />
                    <span>Rincian Teknik & Produk:</span>
                  </h4>
                  
                  <div className="text-xs space-y-1.5 text-[#544D44]">
                    <div>
                      <strong className="text-[#1A1817]">Complexion:</strong> {selectedItem.makeupDetails.complexion}
                    </div>
                    <div>
                      <strong className="text-[#1A1817]">Mata & Alis:</strong> {selectedItem.makeupDetails.eyes}
                    </div>
                    <div>
                      <strong className="text-[#1A1817]">Bibir:</strong> {selectedItem.makeupDetails.lips}
                    </div>
                    <div>
                      <strong className="text-[#1A1817]">Hair/Hijab Styling:</strong> {selectedItem.makeupDetails.hairStyling}
                    </div>
                  </div>
                </div>

                {/* Client Testimonial Quote if available */}
                {selectedItem.testimonialQuote && (
                  <blockquote className="italic text-xs text-[#70675B] bg-[#F5EFEB] p-3.5 rounded-lg border-l-2 border-[#B88E53] mb-6">
                    {selectedItem.testimonialQuote}
                    <span className="block not-italic font-medium text-[11px] text-[#1A1817] mt-1.5">
                      — {selectedItem.client} ({selectedItem.location})
                    </span>
                  </blockquote>
                )}
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-[#EAE2D8] flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    const title = selectedItem.title;
                    setSelectedItem(null);
                    onSelectLookForBooking(title);
                  }}
                  className="flex-1 py-3 px-4 bg-[#1A1817] hover:bg-[#B88E53] text-white text-xs font-semibold uppercase tracking-wide rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <span>Pesan Riasan Konsep Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="py-3 px-4 bg-transparent border border-[#DDD3C3] text-xs font-medium text-[#4A453E] hover:bg-[#F5EFEB] rounded-xl transition-colors"
                >
                  Tutup
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
