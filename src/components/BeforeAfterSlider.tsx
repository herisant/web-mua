import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';
import { TRADITIONAL_BRIDE_IMAGE, MODERN_GLAM_IMAGE } from '../data/mockData';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <section id="transformasi" className="py-16 lg:py-24 border-b border-[#EBE3D5] bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs font-medium uppercase tracking-widest text-[#B88E53] mb-2">
            SENTUHAN KEAHLIAN PROFESIONAL
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1817] font-semibold tracking-tight mb-4">
            Transformasi Nyata: Breathable & Skin-Like Finish
          </h2>
          <p className="text-[#665E53] text-sm sm:text-base leading-relaxed">
            Geser garis tengah untuk melihat transformasi riasan. Filosofi AURA Artistry bukan menutupi jati diri Anda seperti topeng, melainkan menyempurnakan keanggunan alami agar terpancar magis di kamera dan di mata orang tercinta.
          </p>
        </div>

        {/* Interactive Comparison Card */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-[380px] sm:h-[480px] lg:h-[540px] rounded-2xl overflow-hidden select-none cursor-ew-resize shadow-lg border border-[#E8DEC9] bg-[#EAE2D8]"
          >
            {/* "After" Image (Right / Base) */}
            <img
              src={TRADITIONAL_BRIDE_IMAGE}
              alt="Setelah riasan pengantin AURA Artistry"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 bg-[#1A1817]/80 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-lg border border-white/10 pointer-events-none">
              Sesudah (Royal Velvet Finish)
            </div>

            {/* "Before" Image (Left / Clipped) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={MODERN_GLAM_IMAGE}
                alt="Sebelum riasan / Skin prep natural"
                className="absolute inset-0 w-full h-full object-cover object-center max-w-none pointer-events-none"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#1A1817] text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-lg border border-black/10 pointer-events-none">
                Sebelum (Skin Prep Natural)
              </div>
            </div>

            {/* Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1A1817] text-white flex items-center justify-center shadow-lg border-2 border-white pointer-events-none">
                <MoveHorizontal className="w-5 h-5 text-[#E8D0AE]" />
              </div>
            </div>

          </div>

          {/* Guide hint below slider */}
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#8A7F73]">
            <Sparkles className="w-4 h-4 text-[#B88E53]" />
            <span>Klik dan geser pembatas untuk membandingkan tekstur kulit & detail riasan</span>
          </div>

        </div>

      </div>
    </section>
  );
};
