export interface ServicePackage {
  id: string;
  title: string;
  subtitle: string;
  category: 'wedding' | 'graduation' | 'prewedding' | 'event';
  price: number;
  duration: string;
  popular?: boolean;
  highlights: string[];
  image: string;
}

export interface ServiceAddOn {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'semua' | 'traditional' | 'modern' | 'wisuda' | 'prewed';
  categoryLabel: string;
  eventType: string;
  complexionFinish: string;
  date: string;
  location: string;
  client: string;
  image: string;
  description: string;
  makeupDetails: {
    complexion: string;
    eyes: string;
    lips: string;
    hairStyling: string;
  };
  testimonialQuote?: string;
}

export interface TimeSlotOption {
  id: string;
  timeRange: string;
  label: string;
  session: 'subuh' | 'pagi' | 'siang' | 'sore';
  recommendedFor: string;
}

export interface BookingRecord {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  clientInstagram?: string;
  packageId: string;
  packageName: string;
  packagePrice: number;
  date: string; // YYYY-MM-DD
  timeSlotId: string;
  timeSlotLabel: string;
  serviceType: 'home_service' | 'studio';
  locationAddress?: string;
  skinType?: string;
  notes?: string;
  selectedAddOns: ServiceAddOn[];
  totalPrice: number;
  downPayment: number;
  status: 'menunggu_dp' | 'terkonfirmasi' | 'selesai' | 'dibatalkan';
  createdAt: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  event: string;
  date: string;
  avatarText: string;
  content: string;
  rating: number;
  location: string;
}
