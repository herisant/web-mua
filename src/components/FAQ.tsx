import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/mockData';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-24 border-b border-[#EBE3D5] bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="text-xs font-medium uppercase tracking-widest text-[#B88E53] mb-2">
            PANDUAN & PERTANYAAN UMUM
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1817] font-semibold tracking-tight mb-4">
            Hal yang Sering Ditanyakan (FAQ)
          </h2>
          <p className="text-[#665E53] text-sm sm:text-base leading-relaxed">
            Semua hal yang perlu Anda ketahui mengenai persiapan rias, sistem booking, trial, dan kebijakan layanan kami.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-[#E8DEC9] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF7F2] transition-colors"
                >
                  <span className="text-sm font-semibold text-[#1A1817]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8A7F73] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#B88E53]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#5C554B] leading-relaxed border-t border-[#F0E8DC] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
