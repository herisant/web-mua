import React, { useState, useEffect } from 'react';
import { MessageSquare, Calendar } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { PortfolioGrid } from './components/PortfolioGrid';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { StudioSchedule } from './components/StudioSchedule';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { BookingWizard } from './components/BookingWizard';
import { BookingReceiptModal } from './components/BookingReceiptModal';
import { BookingRecord } from './types';
import { INITIAL_BOOKINGS } from './data/mockData';

const LOCAL_STORAGE_KEY = 'aura_artistry_bookings_v1';

export default function App() {
  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading bookings from localStorage', e);
    }
    return INITIAL_BOOKINGS;
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedPackageId, setPreselectedPackageId] = useState<string | undefined>(undefined);
  const [preselectedLookTitle, setPreselectedLookTitle] = useState<string | undefined>(undefined);
  const [activeReceiptBooking, setActiveReceiptBooking] = useState<BookingRecord | null>(null);
  const [isAdminViewOpen, setIsAdminViewOpen] = useState(false);

  // Sync bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.error('Error saving bookings to localStorage', e);
    }
  }, [bookings]);

  const handleOpenBooking = (packageId?: string, lookTitle?: string) => {
    setPreselectedPackageId(packageId);
    setPreselectedLookTitle(lookTitle);
    setIsBookingOpen(true);
  };

  const handleOpenBookingForDate = (date: string, slotId?: string) => {
    setPreselectedPackageId(undefined);
    setPreselectedLookTitle(undefined);
    setIsBookingOpen(true);
  };

  const handleBookingSubmitted = (newBooking: BookingRecord) => {
    setBookings((prev) => [newBooking, ...prev]);
    setIsBookingOpen(false);
    setActiveReceiptBooking(newBooking);
  };

  const handleUpdateBookingStatus = (id: string, newStatus: BookingRecord['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const handleExplorePortfolio = () => {
    const el = document.getElementById('portofolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1817] flex flex-col font-sans selection:bg-[#E9D9C9] selection:text-[#2A231C]">
      
      {/* 3-Zone Navigation Header */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setIsAdminViewOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExplorePortfolio={handleExplorePortfolio}
        />

        {/* Layanan & Paket Pricing */}
        <Services
          onSelectPackage={(packageId) => handleOpenBooking(packageId)}
        />

        {/* Portofolio & Lightbox */}
        <PortfolioGrid
          onSelectLookForBooking={(lookTitle) => handleOpenBooking(undefined, lookTitle)}
        />

        {/* Before & After Interactive Draggable Slider */}
        <BeforeAfterSlider />

        {/* Kalender Ketersediaan Jadwal & Admin Dashboard */}
        <StudioSchedule
          bookings={bookings}
          onOpenBookingForDate={handleOpenBookingForDate}
          onUpdateBookingStatus={handleUpdateBookingStatus}
          isAdminViewOpen={isAdminViewOpen}
          onCloseAdminView={() => setIsAdminViewOpen(false)}
        />

        {/* Testimoni Pengantin & Klien */}
        <Testimonials />

        {/* Tanya Jawab (FAQ) */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href="https://wa.me/6281289001234?text=Halo%20AURA%20Artistry,%20saya%20ingin%20konsultasi%20jadwal%20dan%20paket%20makeup"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-700 hover:bg-emerald-800 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 group"
        aria-label="Konsultasi WhatsApp"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="hidden sm:inline-block text-xs font-semibold tracking-wide">
          Tanya MUA via WhatsApp
        </span>
      </a>

      {/* Multi-step Booking Wizard Modal */}
      <BookingWizard
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedPackageId={preselectedPackageId}
        preselectedLookTitle={preselectedLookTitle}
        existingBookings={bookings}
        onBookingSubmitted={handleBookingSubmitted}
      />

      {/* Printable Receipt / Voucher Modal */}
      <BookingReceiptModal
        booking={activeReceiptBooking}
        onClose={() => setActiveReceiptBooking(null)}
      />

    </div>
  );
}
