import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight, UserCheck, Search, Filter, Download } from 'lucide-react';
import { BookingRecord } from '../types';
import { TIME_SLOTS } from '../data/mockData';
import { formatRupiah } from './Services';

interface StudioScheduleProps {
  bookings: BookingRecord[];
  onOpenBookingForDate: (date: string, slotId?: string) => void;
  onUpdateBookingStatus: (id: string, newStatus: BookingRecord['status']) => void;
  isAdminViewOpen: boolean;
  onCloseAdminView: () => void;
}

export const StudioSchedule: React.FC<StudioScheduleProps> = ({
  bookings,
  onOpenBookingForDate,
  onUpdateBookingStatus,
  isAdminViewOpen,
  onCloseAdminView,
}) => {
  // Calendar month state
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2026, 10, 1)); // November 2026
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>('2026-11-14');
  const [adminFilterStatus, setAdminFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Month navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const monthName = currentMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  // Generate calendar days
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];
  // Empty slots for previous month
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null);
  }
  // Days of current month
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarDays.push({ day: d, dateStr });
  }

  // Bookings for selected date
  const bookingsForSelectedDate = bookings.filter(
    (b) => b.date === selectedCalendarDate && b.status !== 'dibatalkan'
  );

  // Admin filtered list
  const filteredAdminBookings = bookings.filter((b) => {
    const matchesStatus = adminFilterStatus === 'all' || b.status === adminFilterStatus;
    const matchesSearch =
      b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.locationAddress && b.locationAddress.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const exportCSV = () => {
    const headers = ['ID Booking', 'Nama Klien', 'Telepon', 'Paket', 'Tanggal', 'Sesi', 'Total', 'DP', 'Status', 'Alamat'];
    const rows = bookings.map((b) => [
      b.id,
      `"${b.clientName}"`,
      b.clientPhone,
      `"${b.packageName}"`,
      b.date,
      `"${b.timeSlotLabel}"`,
      b.totalPrice,
      b.downPayment,
      b.status,
      `"${b.locationAddress || ''}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `jadwal_aura_artistry_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="jadwal" className="py-16 lg:py-24 border-b border-[#EBE3D5] bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs font-medium uppercase tracking-widest text-[#B88E53] mb-2">
            KALENDER & KETERSEDIAAN WAKTU
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1817] font-semibold tracking-tight mb-4">
            Cek Ketersediaan Jadwal Rias Secara Transparan
          </h2>
          <p className="text-[#665E53] text-sm sm:text-base leading-relaxed">
            Pilih tanggal rencana acara pernikahan, wisuda, atau sesi foto Anda di bawah ini untuk melihat ketersediaan slot waktu riasan secara real-time.
          </p>
        </div>

        {/* Calendar & Slot Inspector Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Calendar Picker (Left) */}
          <div className="lg:col-span-7 bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8DEC9] shadow-sm">
            {/* Month Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8DEC9]">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1A1817] capitalize">
                {monthName}
              </h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={prevMonth}
                  className="p-2 hover:bg-[#EAE2D8] rounded-lg transition-colors text-[#5C554B]"
                  aria-label="Bulan sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-[#EAE2D8] rounded-lg transition-colors text-[#5C554B]"
                  aria-label="Bulan berikutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#8A7F73] mb-2">
              <span>Min</span>
              <span>Sen</span>
              <span>Sel</span>
              <span>Rab</span>
              <span>Kam</span>
              <span>Jum</span>
              <span>Sab</span>
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1.5">
              {calendarDays.map((item, index) => {
                if (!item) {
                  return <div key={`empty-${index}`} className="h-11 sm:h-12" />;
                }

                const bookedCount = bookings.filter(
                  (b) => b.date === item.dateStr && b.status !== 'dibatalkan'
                ).length;
                const isSelected = selectedCalendarDate === item.dateStr;
                const isFullyBooked = bookedCount >= 4;

                return (
                  <button
                    key={item.dateStr}
                    onClick={() => setSelectedCalendarDate(item.dateStr)}
                    className={`h-11 sm:h-12 rounded-xl text-xs font-medium transition-all relative flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-[#1A1817] text-white shadow-sm ring-2 ring-[#B88E53]'
                        : isFullyBooked
                        ? 'bg-rose-50/70 text-rose-800 border border-rose-200/60'
                        : bookedCount > 0
                        ? 'bg-amber-50/70 text-amber-900 border border-amber-200/60 hover:bg-white'
                        : 'bg-white hover:bg-[#F2ECE3] text-[#2E2A25] border border-[#ECE4D8]'
                    }`}
                  >
                    <span>{item.day}</span>
                    {bookedCount > 0 && (
                      <span className={`text-[9px] font-sans ${isSelected ? 'text-[#E8D0AE]' : 'text-[#8A7F73]'}`}>
                        {bookedCount} slot
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-[#E8DEC9] flex flex-wrap items-center justify-between gap-3 text-xs text-[#7A7063]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white border border-[#DDD3C3]" />
                <span>Slot Kosong</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Sebagian Terisi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>Hari Penuh</span>
              </div>
            </div>

          </div>

          {/* Slot Inspector for Selected Date (Right) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#E8DEC9] shadow-sm flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#B88E53] font-semibold mb-1">
                Ketersediaan Tanggal Terpilih
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1817] mb-4">
                {new Date(selectedCalendarDate).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </h3>

              {/* Slots List */}
              <div className="space-y-3 mb-6">
                {TIME_SLOTS.map((slot) => {
                  const existingBooking = bookingsForSelectedDate.find(
                    (b) => b.timeSlotId === slot.id
                  );
                  const isBooked = !!existingBooking;

                  return (
                    <div
                      key={slot.id}
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                        isBooked
                          ? 'bg-gray-50 border-gray-200 text-gray-500'
                          : 'bg-[#FAF7F2] border-[#E8DEC9] text-[#1A1817] hover:border-[#B88E53]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <Clock className={`w-3.5 h-3.5 ${isBooked ? 'text-gray-400' : 'text-[#B88E53]'}`} />
                          <span className="font-mono text-xs font-bold">
                            {slot.timeRange}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-[#4A453E] mt-0.5">
                          {slot.label}
                        </p>
                      </div>

                      <div>
                        {isBooked ? (
                          <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-md">
                            Sudah Terisi
                          </span>
                        ) : (
                          <button
                            onClick={() => onOpenBookingForDate(selectedCalendarDate, slot.id)}
                            className="text-xs font-semibold uppercase tracking-wider text-white bg-[#1A1817] hover:bg-[#B88E53] px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                          >
                            Pesan Slot
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E8DEC9] text-xs text-[#70675B]">
              <span className="font-semibold text-[#1A1817] block mb-0.5">Ingin Konsultasi Tanggal Khusus?</span>
              Jika tanggal yang Anda butuhkan bertanda penuh, tim AURA Artistry memiliki tim rekanan MUA senior yang dapat didelegasikan dengan standar kualitas riasan serupa.
            </div>

          </div>

        </div>

      </div>

      {/* Admin Studio Management Modal / View */}
      {isAdminViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl bg-[#FDFBF7] rounded-2xl overflow-hidden shadow-2xl border border-[#D5C7B4] flex flex-col max-h-[92vh]">
            
            {/* Admin Header */}
            <div className="px-6 py-4 bg-[#1A1817] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#B88E53]" />
                <div>
                  <h3 className="font-serif text-lg font-semibold tracking-wide">
                    Studio MUA Dashboard & Manajemen Jadwal Klien
                  </h3>
                  <p className="text-xs text-white/60">
                    Total {bookings.length} Reservasi Terdata di Sistem
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportCSV}
                  className="px-3 py-1.5 text-xs font-medium text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Ekspor CSV</span>
                </button>
                <button
                  onClick={onCloseAdminView}
                  className="p-1.5 text-white/70 hover:text-white rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 bg-[#FAF7F2] border-b border-[#E8DEC9] flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-[#8A7F73] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama, ID, atau lokasi..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#DDD3C3] rounded-xl text-xs text-[#1A1817] outline-none"
                />
              </div>

              {/* Status Segmented Buttons */}
              <div className="flex items-center gap-1 self-start sm:self-auto overflow-x-auto w-full sm:w-auto">
                <button
                  onClick={() => setAdminFilterStatus('all')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    adminFilterStatus === 'all'
                      ? 'bg-[#1A1817] text-white'
                      : 'text-[#6B6153] hover:text-[#1A1817] bg-white border border-[#DDD3C3]'
                  }`}
                >
                  Semua ({bookings.length})
                </button>
                <button
                  onClick={() => setAdminFilterStatus('menunggu_dp')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    adminFilterStatus === 'menunggu_dp'
                      ? 'bg-amber-800 text-white'
                      : 'text-[#6B6153] hover:text-[#1A1817] bg-white border border-[#DDD3C3]'
                  }`}
                >
                  Menunggu DP ({bookings.filter((b) => b.status === 'menunggu_dp').length})
                </button>
                <button
                  onClick={() => setAdminFilterStatus('terkonfirmasi')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    adminFilterStatus === 'terkonfirmasi'
                      ? 'bg-emerald-800 text-white'
                      : 'text-[#6B6153] hover:text-[#1A1817] bg-white border border-[#DDD3C3]'
                  }`}
                >
                  Terkonfirmasi ({bookings.filter((b) => b.status === 'terkonfirmasi').length})
                </button>
                <button
                  onClick={() => setAdminFilterStatus('selesai')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    adminFilterStatus === 'selesai'
                      ? 'bg-blue-800 text-white'
                      : 'text-[#6B6153] hover:text-[#1A1817] bg-white border border-[#DDD3C3]'
                  }`}
                >
                  Selesai ({bookings.filter((b) => b.status === 'selesai').length})
                </button>
              </div>
            </div>

            {/* Bookings Table / List */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              {filteredAdminBookings.length === 0 ? (
                <div className="text-center py-12 text-[#8A7F73] text-sm">
                  Tidak ada data reservasi yang cocok dengan filter.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAdminBookings.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white p-5 rounded-xl border border-[#E8DEC9] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[#B88E53]">
                            {b.id}
                          </span>
                          <span className="text-sm font-bold text-[#1A1817]">
                            {b.clientName}
                          </span>
                          <span className="text-xs text-[#8A7F73]">
                            · {b.clientPhone}
                          </span>
                        </div>

                        <div className="text-xs text-[#524B42]">
                          <strong>{b.packageName}</strong> · {b.timeSlotLabel}
                        </div>

                        <div className="text-xs text-[#70675B]">
                          📅 {new Date(b.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · 📍 {b.locationAddress || 'Studio'}
                        </div>

                        {b.notes && (
                          <div className="text-[11px] text-[#8C8377] bg-[#FAF7F2] p-2 rounded border border-[#F0E8DC]">
                            Catatan: {b.notes}
                          </div>
                        )}
                      </div>

                      {/* Financial & Status Controls */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t lg:border-t-0 pt-3 lg:pt-0">
                        <div className="text-right">
                          <span className="text-xs text-[#8A7F73] block">Total Biaya</span>
                          <span className="font-serif text-lg font-bold text-[#1A1817] tabular-nums">
                            {formatRupiah(b.totalPrice)}
                          </span>
                          <span className="text-[11px] text-[#B88E53] block">
                            DP: {formatRupiah(b.downPayment)}
                          </span>
                        </div>

                        {/* Status Change Selector */}
                        <div className="flex items-center gap-2">
                          <select
                            value={b.status}
                            onChange={(e) => onUpdateBookingStatus(b.id, e.target.value as BookingRecord['status'])}
                            className={`p-2 rounded-lg text-xs font-semibold outline-none border ${
                              b.status === 'terkonfirmasi'
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                : b.status === 'menunggu_dp'
                                ? 'bg-amber-50 border-amber-300 text-amber-800'
                                : b.status === 'selesai'
                                ? 'bg-blue-50 border-blue-300 text-blue-800'
                                : 'bg-rose-50 border-rose-300 text-rose-800'
                            }`}
                          >
                            <option value="menunggu_dp">Menunggu DP</option>
                            <option value="terkonfirmasi">Terkonfirmasi (DP Masuk)</option>
                            <option value="selesai">Selesai Acara</option>
                            <option value="dibatalkan">Dibatalkan</option>
                          </select>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#FAF7F2] border-t border-[#E8DEC9] flex justify-end">
              <button
                onClick={onCloseAdminView}
                className="py-2 px-5 bg-[#1A1817] hover:bg-[#B88E53] text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Tutup Dashboard
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
