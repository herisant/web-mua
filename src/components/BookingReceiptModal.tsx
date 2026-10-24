import React from 'react';
import { X, CheckCircle2, MessageSquare, Printer, Calendar, Clock, MapPin, User, Sparkles, AlertCircle } from 'lucide-react';
import { BookingRecord } from '../types';
import { formatRupiah } from './Services';

interface BookingReceiptModalProps {
  booking: BookingRecord | null;
  onClose: () => void;
}

export const BookingReceiptModal: React.FC<BookingReceiptModalProps> = ({ booking, onClose }) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const getWhatsAppMessage = (): string => {
    const addOnsText = booking.selectedAddOns.length > 0
      ? booking.selectedAddOns.map((a) => `- ${a.name} (${formatRupiah(a.price)})`).join('%0A')
      : '- Tidak ada';

    const locationText = booking.serviceType === 'home_service'
      ? `Home Service / Venue: ${booking.locationAddress || 'Alamat menyusul'}`
      : 'Studio AURA Artistry Senopati, Jl. Suryo No. 42';

    return `Halo%20Admin%20AURA%20Artistry,%20saya%20telah%20melakukan%20reservasi%20online%20di%20website:%0A%0A*ID%20BOOKING:*%20${booking.id}%0A*Nama:*%20${encodeURIComponent(booking.clientName)}%0A*No%20WhatsApp:*%20${encodeURIComponent(booking.clientPhone)}%0A*Paket:*%20${encodeURIComponent(booking.packageName)}%0A*Tanggal%20Acara:*%20${booking.date}%0A*Waktu%20Makeup:*%20${encodeURIComponent(booking.timeSlotLabel)}%0A*Lokasi:*%20${encodeURIComponent(locationText)}%0A*Layanan%20Tambahan:*%0A${addOnsText}%0A*Tipe%20Kulit:*%20${encodeURIComponent(booking.skinType || 'Normal')}%0A*Total%20Biaya:*%20${encodeURIComponent(formatRupiah(booking.totalPrice))}%0A*Ketentuan%20DP%2030%25:*%20${encodeURIComponent(formatRupiah(booking.downPayment))}%0A%0AMohon%20konfirmasi%20rekening%20DP%20dan%20kunci%20jadwal%20saya.%20Terima%20kasih!`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-2xl overflow-hidden shadow-2xl border border-[#D5C7B4] flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#1A1817] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-serif text-lg font-semibold tracking-wide">
              Tiket Reservasi Jadwal AURA Artistry
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white rounded-lg transition-colors"
            aria-label="Tutup tiket"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Receipt Body */}
        <div id="booking-receipt-print" className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Status & ID Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E8DEC9]">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#8A7F73] font-medium block">
                Kode Referensi Reservasi
              </span>
              <span className="font-mono text-2xl font-bold text-[#1A1817] tracking-wider">
                {booking.id}
              </span>
            </div>
            <div className="sm:text-right">
              <span className="inline-block px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold rounded-md">
                Status: Menunggu Pembayaran DP
              </span>
              <span className="block text-[11px] text-[#8A7F73] mt-1">
                Dibuat pada {new Date(booking.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Core Booking Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DEC9] space-y-2">
              <div className="flex items-center gap-2 text-[#8A7F73]">
                <User className="w-4 h-4 text-[#B88E53]" />
                <span className="font-semibold uppercase tracking-wider text-[11px]">Data Klien</span>
              </div>
              <p className="text-sm font-semibold text-[#1A1817]">{booking.clientName}</p>
              <p className="text-[#5C554B]">WhatsApp: {booking.clientPhone}</p>
              {booking.clientInstagram && (
                <p className="text-[#5C554B]">Instagram: {booking.clientInstagram}</p>
              )}
              {booking.skinType && (
                <p className="text-[#5C554B]">Tipe Kulit: <span className="font-medium">{booking.skinType}</span></p>
              )}
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DEC9] space-y-2">
              <div className="flex items-center gap-2 text-[#8A7F73]">
                <Calendar className="w-4 h-4 text-[#B88E53]" />
                <span className="font-semibold uppercase tracking-wider text-[11px]">Waktu & Lokasi</span>
              </div>
              <p className="text-sm font-semibold text-[#1A1817]">
                {new Date(booking.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <p className="text-[#5C554B] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#B88E53]" />
                <span>{booking.timeSlotLabel}</span>
              </p>
              <p className="text-[#5C554B] flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B88E53] shrink-0 mt-0.5" />
                <span>
                  {booking.serviceType === 'home_service'
                    ? `Home Service: ${booking.locationAddress || 'Alamat menyusul'}`
                    : 'Studio AURA Artistry (Senopati, Jaksel)'}
                </span>
              </p>
            </div>
          </div>

          {/* Package & Cost Breakdown */}
          <div className="bg-white p-5 rounded-xl border border-[#E8DEC9] space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1817] border-b border-[#F0E8DC] pb-2">
              Rincian Biaya Layanan
            </h4>

            <div className="flex justify-between text-xs text-[#4A453E]">
              <span>{booking.packageName}</span>
              <span className="font-mono font-medium">{formatRupiah(booking.packagePrice)}</span>
            </div>

            {booking.selectedAddOns.map((addon) => (
              <div key={addon.id} className="flex justify-between text-xs text-[#6B6153]">
                <span>+ {addon.name}</span>
                <span className="font-mono">{formatRupiah(addon.price)}</span>
              </div>
            ))}

            <div className="pt-3 border-t border-[#F0E8DC] flex justify-between items-baseline">
              <span className="text-xs font-semibold text-[#1A1817]">Total Investasi</span>
              <span className="font-serif text-xl font-bold text-[#1A1817] tabular-nums">
                {formatRupiah(booking.totalPrice)}
              </span>
            </div>

            <div className="p-3 bg-[#FAF7F2] rounded-lg flex justify-between items-center text-xs">
              <span className="font-semibold text-[#B88E53]">Nominal DP 30% untuk Mengunci Tanggal:</span>
              <span className="font-mono font-bold text-sm text-[#1A1817]">
                {formatRupiah(booking.downPayment)}
              </span>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-[#6B5A3E] space-y-2">
            <div className="flex items-center gap-2 font-semibold text-[#1A1817]">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Instruksi Pembayaran Down Payment (DP):</span>
            </div>
            <p>
              Silakan transfer DP 30% ke rekening resmi studio berikut dalam kurun waktu <strong>1x24 jam</strong>:
            </p>
            <div className="bg-white p-3 rounded border border-amber-200 font-mono text-xs space-y-1 text-[#1A1817]">
              <div><strong>BCA:</strong> 5271-8899-21 a.n. SYAKIRA AURA (MUA STUDIO)</div>
              <div><strong>Mandiri:</strong> 157-00-998822-1 a.n. SYAKIRA AURA</div>
            </div>
            <p className="text-[11px] text-[#8C7A5A]">
              Setelah transfer, klik tombol di bawah untuk mengirimkan bukti transfer langsung ke WhatsApp Admin AURA Artistry agar slot jadwal Anda segera dikunci secara resmi.
            </p>
          </div>

        </div>

        {/* Action Buttons Footer */}
        <div className="p-4 sm:p-6 bg-[#FAF7F2] border-t border-[#E8DEC9] flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/6281289001234?text=${getWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wide flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Kirim Rincian ke WhatsApp MUA</span>
          </a>

          <button
            onClick={handlePrint}
            className="py-3 px-4 bg-white hover:bg-[#F5EFEB] text-[#1A1817] border border-[#DDD3C3] rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Bukti</span>
          </button>

          <button
            onClick={onClose}
            className="py-3 px-4 bg-transparent hover:bg-[#F0E8DC] text-[#4A453E] rounded-xl text-xs font-medium transition-colors"
          >
            Selesai
          </button>
        </div>

      </div>
    </div>
  );
};
