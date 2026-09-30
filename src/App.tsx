/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { CitiesSection } from './components/CitiesSection';
import { PackagesSection } from './components/PackagesSection';
import { FlightSearchSection } from './components/FlightSearchSection';
import { HotelSearchSection } from './components/HotelSearchSection';
import { CabSection } from './components/CabSection';
import { AttractionsSection } from './components/AttractionsSection';
import { BudgetCalculator } from './components/BudgetCalculator';
import { ItineraryBuilder } from './components/ItineraryBuilder';
import { VisaTravelGuide } from './components/VisaTravelGuide';
import { BookingModal } from './components/BookingModal';
import { UserAccountModal } from './components/UserAccountModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { ContactSupportModal } from './components/ContactSupportModal';
import { AiChatbot } from './components/AiChatbot';
import { Footer } from './components/Footer';

import {
  TourPackage,
  FlightOption,
  Hotel,
  CabOption,
  TouristAttraction,
  BookingRecord,
  ContactEnquiry,
  CustomItineraryDay,
} from './types';
import { TOUR_PACKAGES, HOTELS_DATA, FLIGHTS_DATA, CABS_DATA, ATTRACTIONS_DATA } from './data/mockData';
import { MessageCircle, ShoppingBag, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');

  // Trip selection state
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | undefined>(TOUR_PACKAGES[1]); // Russia Classic by default
  const [selectedFlight, setSelectedFlight] = useState<FlightOption | undefined>(FLIGHTS_DATA[0]); // Aeroflot Direct
  const [selectedHotel, setSelectedHotel] = useState<Hotel | undefined>(HOTELS_DATA[2]); // Mercure Moscow
  const [selectedCab, setSelectedCab] = useState<CabOption | undefined>(CABS_DATA[0]); // Airport Pickup
  const [selectedAttractions, setSelectedAttractions] = useState<TouristAttraction[]>([
    ATTRACTIONS_DATA[0], // Red Square
    ATTRACTIONS_DATA[1], // Kremlin
    ATTRACTIONS_DATA[3], // Hermitage
  ]);

  const [travellersCount, setTravellersCount] = useState<number>(2);
  const [travelDate, setTravelDate] = useState<string>('2026-10-28');
  const [maxBudgetFilter, setMaxBudgetFilter] = useState<number>(500000);

  // Modals state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAiChatbotOpen, setIsAiChatbotOpen] = useState(false);
  const [aiChatInitialPrompt, setAiChatInitialPrompt] = useState<string | undefined>(undefined);

  const handleOpenAiChat = (prompt?: string) => {
    if (prompt) {
      setAiChatInitialPrompt(prompt);
    }
    setIsAiChatbotOpen(true);
  };

  // User account state
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>('kavitha.travels@gmail.com');

  // Initial demo bookings
  const [bookings, setBookings] = useState<BookingRecord[]>([
    {
      id: 'RUS-IND-741920',
      bookingDate: '2026-09-20',
      travelDate: '2026-10-28',
      returnDate: '2026-11-05',
      packageId: 'pkg-russia-classic',
      packageTitle: 'Russia Classic Discovery (Moscow + St. Petersburg)',
      travelersCount: 2,
      travelers: [
        {
          fullName: 'KAVITHA AMBATI',
          passportNumber: 'Z8472910',
          dateOfBirth: '1992-06-14',
          nationality: 'Indian',
          contactNumber: '+91 98490 12345',
          email: 'kavitha.travels@gmail.com',
        },
      ],
      departureCity: 'New Delhi (DEL)',
      destinationCity: 'Moscow & Saint Petersburg',
      totalBasePriceInr: 450000,
      taxesAndServiceInr: 22500,
      grandTotalInr: 472500,
      amountPaidInr: 118125, // 25% token
      status: 'Confirmed',
      paymentMethod: '25% Advance Booking Token',
      flight: FLIGHTS_DATA[0],
      hotel: HOTELS_DATA[2],
      cab: CABS_DATA[0],
      selectedAttractions: [ATTRACTIONS_DATA[0], ATTRACTIONS_DATA[1]],
    },
  ]);

  // Enquiries state
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([
    {
      id: 'ENQ-101',
      date: '2026-09-28',
      name: 'Sunil Verma',
      email: 'sunil.verma@tcs.com',
      phone: '+91 98112 34567',
      message: 'Looking for 8-day package for senior parents with pure vegetarian Indian meals.',
      departureCity: 'Mumbai (BOM)',
      travellers: 2,
      status: 'New',
    },
  ]);

  // Saved items
  const [savedHotels, setSavedHotels] = useState<Hotel[]>([HOTELS_DATA[0], HOTELS_DATA[5]]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroSearch = (params: {
    fromCity: string;
    destination: string;
    travelDate: string;
    travellers: number;
    budgetLimit: number;
  }) => {
    setTravelDate(params.travelDate);
    setTravellersCount(params.travellers);
    setMaxBudgetFilter(params.budgetLimit);
    handleNavigate('packages');
  };

  const handleAddAttraction = (attraction: TouristAttraction) => {
    if (!selectedAttractions.some((a) => a.id === attraction.id)) {
      setSelectedAttractions([...selectedAttractions, attraction]);
    } else {
      setSelectedAttractions(selectedAttractions.filter((a) => a.id !== attraction.id));
    }
  };

  const handleRemoveAttraction = (id: string) => {
    setSelectedAttractions(selectedAttractions.filter((a) => a.id !== id));
  };

  const handleBookPackage = (
    pkg: TourPackage,
    customizedOptions?: { hotelTier: string; days: number; travellers: number }
  ) => {
    setSelectedPackage(pkg);
    if (customizedOptions?.travellers) {
      setTravellersCount(customizedOptions.travellers);
    }
    setIsBookingModalOpen(true);
  };

  const handleSelectFlight = (flight: FlightOption) => {
    setSelectedFlight(flight);
  };

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
  };

  const handleSelectCab = (cab: CabOption) => {
    setSelectedCab(cab);
  };

  const handleBookingConfirmed = (newBooking: BookingRecord) => {
    setBookings([newBooking, ...bookings]);
  };

  const handleAddEnquiry = (newEnquiry: ContactEnquiry) => {
    setEnquiries([newEnquiry, ...enquiries]);
  };

  const handleUpdateBookingStatus = (bookingId: string, newStatus: BookingRecord['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100">
      
      {/* Strict One-Row Three-Zone Top Bar */}
      <Header
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
        onOpenAiChat={() => handleOpenAiChat()}
        userEmail={currentUserEmail}
        savedCount={selectedAttractions.length + savedHotels.length}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home">
          <Hero
            onSearch={handleHeroSearch}
            onPlanTrip={() => handleNavigate('budget-calculator')}
            onOpenAiChat={handleOpenAiChat}
          />
        </section>

        {/* Trust & Credentials Bar */}
        <TrustBar />

        {/* 6 Major Cities */}
        <CitiesSection
          onSelectCityForTrip={(cityName) => {
            handleNavigate('packages');
          }}
        />

        {/* Complete Tour Packages */}
        <PackagesSection
          onBookPackage={handleBookPackage}
          maxBudgetFilter={maxBudgetFilter}
        />

        {/* Interactive Travel Budget Calculator */}
        <BudgetCalculator
          onApplyPlan={(calculatedPlan) => {
            setTravellersCount(calculatedPlan.travellers);
            setIsBookingModalOpen(true);
          }}
        />

        {/* Round-Trip Flights */}
        <FlightSearchSection
          onSelectFlight={handleSelectFlight}
          selectedFlightId={selectedFlight?.id}
        />

        {/* Hotels Search & Selection */}
        <HotelSearchSection
          onSelectHotel={handleSelectHotel}
          selectedHotelId={selectedHotel?.id}
        />

        {/* Cabs & Transportation */}
        <CabSection
          onSelectCab={handleSelectCab}
          selectedCabId={selectedCab?.id}
        />

        {/* Tourist Attractions */}
        <AttractionsSection
          onAddAttraction={handleAddAttraction}
          selectedAttractionIds={selectedAttractions.map((a) => a.id)}
        />

        {/* Day-by-Day Custom Itinerary Builder */}
        <ItineraryBuilder
          selectedAttractions={selectedAttractions}
          onRemoveAttraction={handleRemoveAttraction}
          onProceedToCheckout={() => setIsBookingModalOpen(true)}
        />

        {/* Visa & Travel Intelligence for Indian Citizens */}
        <VisaTravelGuide />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      {/* Floating Action Button for WhatsApp Support */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2">
        <a
          href="https://wa.me/919811054220?text=Hello%20Russia%20Explorer,%20I%20am%20planning%20a%20Russia%20tour%20from%20India%20under%20%E2%82%B95,00,000."
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/60 font-semibold text-xs transition-transform hover:scale-105 group"
          title="Direct WhatsApp Helpline"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">WhatsApp Tour Desk (+91)</span>
        </a>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedPackage={selectedPackage}
        selectedFlight={selectedFlight}
        selectedHotel={selectedHotel}
        selectedCab={selectedCab}
        selectedAttractions={selectedAttractions}
        travellersCount={travellersCount}
        travelDate={travelDate}
        onBookingConfirmed={handleBookingConfirmed}
      />

      <UserAccountModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUserEmail={currentUserEmail}
        onLogin={(email) => setCurrentUserEmail(email)}
        onLogout={() => setCurrentUserEmail(null)}
        bookings={bookings}
        savedHotels={savedHotels}
        savedAttractions={selectedAttractions}
      />

      <AdminDashboardModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        bookings={bookings}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        enquiries={enquiries}
      />

      <ContactSupportModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        onSubmitEnquiry={handleAddEnquiry}
      />

      {/* Russia Explorer AI Chatbot (Connected to n8n Webhook) */}
      <AiChatbot
        isOpen={isAiChatbotOpen}
        onToggle={() => setIsAiChatbotOpen(!isAiChatbotOpen)}
        initialPrompt={aiChatInitialPrompt}
        onClearInitialPrompt={() => setAiChatInitialPrompt(undefined)}
      />

    </div>
  );
}
