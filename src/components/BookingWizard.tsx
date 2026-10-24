import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, MapPin, User, Check, ArrowRight, ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
import { SERVICE_PACKAGES, SERVICE_ADD_ONS, TIME_SLOTS } from '../data/mockData';
import { ServicePackage, ServiceAddOn, TimeSlotOption, BookingRecord } from '../types';
import { formatRupiah } from './Services';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedPackageId?: string;
  preselectedLookTitle?: string;
  existingBookings: BookingRecord[];
  onBookingSubmitted: (booking: BookingRecord) => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  isOpen,
  onClose,
  preselectedPackageId,
  preselectedLookTitle,
  existingBookings,
  onBookingSubmitted,
}) => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    preselectedPackageId || SERVICE_PACKAGES[0].id
  );
  const [selectedAddOns, setSelectedAddOns] = useState<ServiceAddOn[]>([]);
  
  // Date selection (default to a weekend 2 weeks ahead)
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<string>(TIME_SLOTS[0].id);
  const [serviceType, setServiceType] = useState<'home_service' | 'studio'>('home_service');
  const [locationAddress, setLocationAddress] = useState<string>('');
  const [locationArea, setLocationArea] = useState<string>('Jakarta Selatan');
  
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientInstagram, setClientInstagram] = useState<string>('');
  const [skinType, setSkinType] = useState<string>('Normal');
  const [notes, setNotes] = useState<string>(
    preselectedLookTitle ? `Referensi look yang diminati: ${preselectedLookTitle}` : ''
  );
  const [formError, setFormError] = useState<string>('');

  // Update preselectedPackage when prop changes
  useEffect(() => {
    if (preselectedPackageId) {
      setSelectedPackageId(preselectedPackageId);
    }
  }, [preselectedPackageId]);

  useEffect(() => {
    if (preselectedLookTitle) {
      setNotes((prev) => prev ? `${prev}\nReferensi: ${preselectedLookTitle}` : `Referensi: ${preselectedLookTitle}`);
    }
  }, [preselectedLookTitle]);

  if (!isOpen) return null;

  const currentPackage = SERVICE_PACKAGES.find((p) => p.id === selectedPackageId) || SERVICE_PACKAGES[0];
  const currentTimeSlot = TIME_SLOTS.find((s) => s.id === selectedTimeSlotId) || TIME_SLOTS[0];

  // Check booked slots on selected date
  const bookedSlotsOnDate = existingBookings
    .filter((b) => b.date === selectedDate && b.status !== 'dibatalkan')
    .map((b) => b.timeSlotId);

  // Calculate pricing
  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = currentPackage.price + addOnsTotal;
  const downPayment = Math.round(totalPrice * 0.3);

  const toggleAddOn = (addon: ServiceAddOn) => {
    if (selectedAddOns.some((a) => a.id === addon.id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const handleNextStep = () => {
    setFormError('');
    if (step === 2) {
      if (!selectedDate) {
        setFormError('Silakan pilih tanggal acara Anda.');
        return;
      }
      if (bookedSlotsOnDate.includes(selectedTimeSlotId)) {
        setFormError('Slot waktu ini sudah terisi. Silakan pilih slot waktu lain atau tanggal berbeda.');
        return;
      }
    }

    if (step === 3) {
      if (serviceType === 'home_service' && !locationAddress.trim()) {
        setFormError('Mohon isi alamat atau nama gedung / hotel pengerjaan riasan.');
        return;
      }
    }

    if (step === 4) {
      if (!clientName.trim()) {
        setFormError('Mohon masukkan nama lengkap Anda.');
        return;
      }
      if (!clientPhone.trim() || clientPhone.length < 9) {
        setFormError('Mohon masukkan nomor WhatsApp aktif yang valid.');
        return;
      }
    }

    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleSubmitBooking = () => {
    const randomId = `AUR-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullAddress = serviceType === 'home_service'
      ? `${locationAddress} (${locationArea})`
      : 'Studio AURA Artistry Senopati, Jl. Suryo No. 42, Jakarta Selatan';

    const newBooking: BookingRecord = {
      id: randomId,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim() || undefined,
      clientInstagram: clientInstagram.trim() || undefined,
      packageId: currentPackage.id,
      packageName: currentPackage.title,
      packagePrice: currentPackage.price,
      date: selectedDate,
      timeSlotId: currentTimeSlot.id,
      timeSlotLabel: `${currentTimeSlot.timeRange} (${currentTimeSlot.label})`,
      serviceType,
      locationAddress: fullAddress,
      skinType,
      notes: notes.trim() || undefined,
      selectedAddOns,
      totalPrice,
      downPayment,
      status: 'menunggu_dp',
      createdAt: new Date().toISOString(),
    };

    onBookingSubmitted(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FDFBF7] rounded-2xl overflow-hidden shadow-2xl border border-[#D5C7B4] flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#1A1817] text-white flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#E8D0AE] font-sans">
              Langkah {step} dari 5
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-semibold tracking-wide">
              {step === 1 && 'Pilih Paket & Tambahan Layanan'}
              {step === 2 && 'Pilih Tanggal & Slot Waktu'}
              {step === 3 && 'Tentukan Lokasi Riasan'}
              {step === 4 && 'Data Klien & Konsultasi Kulit'}
              {step === 5 && 'Konfirmasi & Rincian Reservasi'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white rounded-lg transition-colors"
            aria-label="Tutup form booking"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Line */}
        <div className="w-full bg-[#EAE2D8] h-1">
          <div
            className="bg-[#B88E53] h-1 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Body Content by Step */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg">
              {formError}
            </div>
          )}

          {/* STEP 1: Select Package & Add-ons */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1817] mb-3">
                  Pilih Paket Riasan Utama:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICE_PACKAGES.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#B88E53] bg-white ring-2 ring-[#B88E53]/30 shadow-sm'
                            : 'border-[#E0D7C6] bg-[#FAF7F2] hover:bg-white'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <h4 className="font-serif text-base font-bold text-[#1A1817]">
                              {pkg.title}
                            </h4>
                            {isSelected && (
                              <Check className="w-4 h-4 text-[#B88E53] shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-[#6B6153] line-clamp-2 mb-3">
                            {pkg.subtitle}
                          </p>
                        </div>
                        <div className="flex justify-between items-baseline pt-2 border-t border-[#F0E8DC]">
                          <span className="text-[11px] text-[#8C8377]">{pkg.duration}</span>
                          <span className="font-serif text-sm font-bold text-[#1A1817] tabular-nums">
                            {formatRupiah(pkg.price)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add-ons Checklist */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1817] mb-3">
                  Layanan Tambahan (Opsional):
                </label>
                <div className="space-y-2.5">
                  {SERVICE_ADD_ONS.map((addon) => {
                    const isChecked = selectedAddOns.some((a) => a.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                          isChecked
                            ? 'border-[#B88E53] bg-white ring-1 ring-[#B88E53]'
                            : 'border-[#E2D8C7] bg-[#FAF7F2] hover:bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}} // handled by parent div
                            className="mt-0.5 rounded border-gray-300 text-[#B88E53] focus:ring-[#B88E53]"
                          />
                          <div>
                            <p className="text-xs font-semibold text-[#1A1817]">{addon.name}</p>
                            <p className="text-[11px] text-[#70675B]">{addon.description}</p>
                          </div>
                        </div>
                        <div className="font-mono text-xs font-medium text-[#1A1817] whitespace-nowrap">
                          + {formatRupiah(addon.price)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: Date & Time Slot */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1817] mb-2">
                  Tentukan Tanggal Acara:
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full sm:w-72 p-3 bg-white border border-[#DDD3C3] rounded-xl text-sm font-medium text-[#1A1817] focus:ring-2 focus:ring-[#B88E53] focus:border-transparent outline-none"
                  />
                  <span className="text-xs text-[#8A7F73]">
                    {selectedDate && new Date(selectedDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1817] mb-3">
                  Pilih Sesi & Slot Waktu Rias:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TIME_SLOTS.map((slot) => {
                    const isBooked = bookedSlotsOnDate.includes(slot.id);
                    const isSelected = selectedTimeSlotId === slot.id;

                    return (
                      <div
                        key={slot.id}
                        onClick={() => {
                          if (!isBooked) setSelectedTimeSlotId(slot.id);
                        }}
                        className={`p-4 rounded-xl border transition-all ${
                          isBooked
                            ? 'opacity-50 bg-gray-100 border-gray-200 cursor-not-allowed'
                            : isSelected
                            ? 'border-[#B88E53] bg-white ring-2 ring-[#B88E53]/30 cursor-pointer shadow-sm'
                            : 'border-[#E0D7C6] bg-[#FAF7F2] hover:bg-white cursor-pointer'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <span className="font-mono text-xs font-bold text-[#1A1817]">
                            {slot.timeRange}
                          </span>
                          {isBooked ? (
                            <span className="text-[10px] uppercase font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                              Sudah Penuh
                            </span>
                          ) : isSelected ? (
                            <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                              Terpilih
                            </span>
                          ) : (
                            <span className="text-[10px] text-emerald-700 font-medium">
                              Tersedia
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-[#3D372F]">{slot.label}</p>
                        <p className="text-[11px] text-[#786F62] mt-1">{slot.recommendedFor}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DEC9] text-xs text-[#70675B] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B88E53] shrink-0" />
                <span>
                  Waktu pengerjaan disarankan dimulai minimal <strong>3-4 jam sebelum</strong> sesi foto atau prosesi acara berlangsung.
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: Location */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1817] mb-3">
                  Tipe Lokasi Layanan:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setServiceType('home_service')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      serviceType === 'home_service'
                        ? 'border-[#B88E53] bg-white ring-2 ring-[#B88E53]/30 shadow-sm'
                        : 'border-[#E0D7C6] bg-[#FAF7F2] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-[#B88E53]" />
                      <span className="text-sm font-bold text-[#1A1817]">
                        Home Service / Hotel / Venue
                      </span>
                    </div>
                    <p className="text-xs text-[#6B6153]">
                      Tim MUA AURA Artistry datang langsung ke lokasi rumah, hotel persiapan, atau gedung pernikahan Anda.
                    </p>
                  </div>

                  <div
                    onClick={() => setServiceType('studio')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      serviceType === 'studio'
                        ? 'border-[#B88E53] bg-white ring-2 ring-[#B88E53]/30 shadow-sm'
                        : 'border-[#E0D7C6] bg-[#FAF7F2] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-[#B88E53]" />
                      <span className="text-sm font-bold text-[#1A1817]">
                        Studio AURA Artistry
                      </span>
                    </div>
                    <p className="text-xs text-[#6B6153]">
                      Riasan dilakukan di studio privat kami di Jl. Suryo No. 42, Senopati, Kebayoran Baru, Jakarta Selatan.
                    </p>
                  </div>
                </div>
              </div>

              {serviceType === 'home_service' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#4A453E] mb-1">
                      Wilayah / Kota Acara:
                    </label>
                    <select
                      value={locationArea}
                      onChange={(e) => setLocationArea(e.target.value)}
                      className="w-full p-3 bg-white border border-[#DDD3C3] rounded-xl text-sm text-[#1A1817] focus:ring-2 focus:ring-[#B88E53] outline-none"
                    >
                      <option value="Jakarta Selatan">Jakarta Selatan</option>
                      <option value="Jakarta Pusat">Jakarta Pusat</option>
                      <option value="Jakarta Barat">Jakarta Barat</option>
                      <option value="Jakarta Timur">Jakarta Timur</option>
                      <option value="Jakarta Utara">Jakarta Utara</option>
                      <option value="Tangerang / BSD / Karawaci">Tangerang / BSD / Karawaci</option>
                      <option value="Depok">Depok</option>
                      <option value="Bekasi">Bekasi</option>
                      <option value="Bogor">Bogor</option>
                      <option value="Luar Kota (Custom)">Luar Jabodetabek (Custom)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#4A453E] mb-1">
                      Nama Tempat & Alamat Lengkap:
                    </label>
                    <textarea
                      rows={3}
                      value={locationAddress}
                      onChange={(e) => setLocationAddress(e.target.value)}
                      placeholder="Contoh: Hotel Mulia Senayan (Kamar Suite 1402) atau Jl. Gandaria 1 No. 12"
                      className="w-full p-3 bg-white border border-[#DDD3C3] rounded-xl text-sm text-[#1A1817] focus:ring-2 focus:ring-[#B88E53] outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-white rounded-xl border border-[#E8DEC9] text-xs text-[#524B42] space-y-1">
                  <p className="font-semibold text-[#1A1817]">Alamat Studio Kami:</p>
                  <p>Jl. Suryo No. 42, Senopati, Kebayoran Baru, Jakarta Selatan 12180</p>
                  <p className="text-[#8A7F73]">Fasilitas: Ruang rias VIP ber-AC, ring light profesional, vanity mirror, private coffee & refreshment corner.</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Client Info & Skin Profile */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#4A453E] mb-1">
                    Nama Lengkap Klien / Pengantin *
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Contoh: Amanda Larasati"
                    className="w-full p-3 bg-white border border-[#DDD3C3] rounded-xl text-sm text-[#1A1817] focus:ring-2 focus:ring-[#B88E53] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A453E] mb-1">
                    Nomor WhatsApp Aktif *
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full p-3 bg-white border border-[#DDD3C3] rounded-xl text-sm text-[#1A1817] focus:ring-2 focus:ring-[#B88E53] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#4A453E] mb-1">
                    Akun Instagram (Opsional)
                  </label>
                  <input
                    type="text"
                    value={clientInstagram}
                    onChange={(e) => setClientInstagram(e.target.value)}
                    placeholder="@username_anda"
                    className="w-full p-3 bg-white border border-[#DDD3C3] rounded-xl text-sm text-[#1A1817] focus:ring-2 focus:ring-[#B88E53] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A453E] mb-1">
                    Profil / Tipe Kulit Wajah
                  </label>
                  <select
                    value={skinType}
                    onChange={(e) => setSkinType(e.target.value)}
                    className="w-full p-3 bg-white border border-[#DDD3C3] rounded-xl text-sm text-[#1A1817] focus:ring-2 focus:ring-[#B88E53] outline-none"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Kombinasi / T-Zone Berminyak">Kombinasi / T-Zone Berminyak</option>
                    <option value="Sangat Berminyak (Oily)">Sangat Berminyak (Oily)</option>
                    <option value="Kering & Dehidrasi">Kering & Dehidrasi</option>
                    <option value="Sensitif / Rentan Jerawat (Acne Prone)">Sensitif / Rentan Jerawat (Acne Prone)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A453E] mb-1">
                  Catatan Khusus / Preferensi Riasan & Busana
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Misal: Warna kebaya hijau emerald, ingin riasan mata soft brown, ada alergi produk tertentu..."
                  className="w-full p-3 bg-white border border-[#DDD3C3] rounded-xl text-sm text-[#1A1817] focus:ring-2 focus:ring-[#B88E53] outline-none"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-[#8A7F73]">
                <ShieldCheck className="w-4 h-4 text-[#B88E53]" />
                <span>Data pribadi Anda aman dan hanya digunakan untuk keperluan koordinasi jadwal MUA.</span>
              </div>
            </div>
          )}

          {/* STEP 5: Summary & Confirm */}
          {step === 5 && (
            <div className="space-y-5">
              <div className="bg-white p-5 rounded-xl border border-[#E8DEC9] space-y-4">
                <div className="border-b border-[#F0E8DC] pb-3 flex justify-between items-start">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#B88E53] font-semibold block">
                      Paket Terpilih
                    </span>
                    <h4 className="font-serif text-xl font-bold text-[#1A1817]">
                      {currentPackage.title}
                    </h4>
                  </div>
                  <span className="font-serif text-lg font-bold text-[#1A1817] tabular-nums">
                    {formatRupiah(currentPackage.price)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#524B42]">
                  <div>
                    <span className="text-[#8A7F73] block">Nama Pemesan:</span>
                    <strong className="text-[#1A1817]">{clientName}</strong> ({clientPhone})
                  </div>
                  <div>
                    <span className="text-[#8A7F73] block">Tanggal Acara:</span>
                    <strong className="text-[#1A1817]">
                      {new Date(selectedDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#8A7F73] block">Sesi / Jam Rias:</span>
                    <strong className="text-[#1A1817]">{currentTimeSlot.timeRange}</strong> ({currentTimeSlot.label})
                  </div>
                  <div>
                    <span className="text-[#8A7F73] block">Lokasi:</span>
                    <strong className="text-[#1A1817]">
                      {serviceType === 'home_service' ? `${locationAddress} (${locationArea})` : 'Studio AURA Senopati'}
                    </strong>
                  </div>
                </div>

                {selectedAddOns.length > 0 && (
                  <div className="pt-3 border-t border-[#F0E8DC]">
                    <span className="text-[11px] uppercase tracking-wider text-[#8A7F73] font-semibold block mb-1.5">
                      Tambahan Layanan:
                    </span>
                    {selectedAddOns.map((addon) => (
                      <div key={addon.id} className="flex justify-between text-xs text-[#6B6153]">
                        <span>+ {addon.name}</span>
                        <span className="font-mono">{formatRupiah(addon.price)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-3 border-t border-[#F0E8DC] flex justify-between items-baseline">
                  <span className="text-sm font-bold text-[#1A1817]">Total Investasi</span>
                  <span className="font-serif text-2xl font-bold text-[#1A1817] tabular-nums">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-lg flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#B88E53]">Kebutuhan DP 30% untuk Lock Jadwal:</span>
                  <span className="font-mono font-bold text-base text-[#1A1817]">
                    {formatRupiah(downPayment)}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#7A7063] leading-relaxed">
                Setelah mengklik tombol konfirmasi di bawah, rincian booking Anda akan diterbitkan. Anda dapat langsung mengirimkannya ke WhatsApp Admin untuk verifikasi pembayaran DP.
              </p>
            </div>
          )}

        </div>

        {/* Modal Navigation Footer */}
        <div className="p-4 sm:p-6 bg-[#FAF7F2] border-t border-[#E8DEC9] flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="py-2.5 px-4 rounded-xl border border-[#DDD3C3] text-xs font-medium text-[#4A453E] hover:bg-[#F5EFEB] flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Sebelumnya</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="py-2.5 px-4 text-xs font-medium text-[#6B6153] hover:text-[#1A1817] transition-colors"
            >
              Batal
            </button>
          )}

          <div className="flex items-center gap-2">
            {step < 5 ? (
              <button
                onClick={handleNextStep}
                className="py-2.5 px-6 rounded-xl bg-[#1A1817] hover:bg-[#B88E53] text-white text-xs font-semibold tracking-wide uppercase flex items-center gap-2 transition-all shadow-sm"
              >
                <span>Lanjut</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmitBooking}
                className="py-3 px-7 rounded-xl bg-[#1A1817] hover:bg-[#B88E53] text-white text-xs font-bold tracking-wide uppercase flex items-center gap-2 transition-all shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>Konfirmasi & Kunci Jadwal</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
