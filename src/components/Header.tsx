import React, { useState } from 'react';
import { Compass, Phone, ShieldCheck, User, Menu, X, Bookmark, SlidersHorizontal, Bot, Sparkles } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
  onOpenContact: () => void;
  onOpenAiChat: () => void;
  userEmail: string | null;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  activeSection,
  onOpenAuth,
  onOpenAdmin,
  onOpenContact,
  onOpenAiChat,
  userEmail,
  savedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'destinations', label: 'Destinations' },
    { id: 'packages', label: 'Tour Packages' },
    { id: 'flights', label: 'Flights' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'cabs', label: 'Cabs' },
    { id: 'attractions', label: 'Attractions' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'visa-info', label: 'Visa Guide' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#090D16]/90 backdrop-blur-md">
      {/* Strict One-Row Three-Zone Top Bar */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Single text wordmark with subtle heraldic compass */}
        <div className="flex items-center gap-3">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="group flex items-center gap-2.5 text-left"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-rose-600 to-indigo-700 text-white shadow-md shadow-rose-900/30 transition-transform group-hover:scale-105">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <span className="font-serif-heading text-xl font-bold tracking-tight text-white transition-colors group-hover:text-rose-400">
                Russia Explorer
              </span>
              <span className="block text-[11px] font-medium tracking-wider uppercase text-slate-400">
                India to Russia Tours
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: Navigation Links (Clean text links with subtle hover underlines) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`transition-colors hover:text-white cursor-pointer ${
                activeSection === item.id
                  ? 'text-rose-400 font-semibold underline underline-offset-8 decoration-rose-500 decoration-2'
                  : 'text-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Indicator */}
          <span className="hidden xl:inline-flex items-center text-xs font-semibold text-emerald-400 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
            INR (₹) All Taxes Shown
          </span>

          {/* AI Chatbot Launcher in Header */}
          <button
            onClick={onOpenAiChat}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/30 hover:border-rose-500/60 rounded-lg transition-all cursor-pointer shadow-sm"
            title="Chat with Russia Explorer AI Assistant"
          >
            <Bot className="h-3.5 w-3.5 text-rose-400" />
            <span className="hidden sm:inline">AI Chat</span>
          </button>

          {/* Contact / Help button */}
          <button
            onClick={onOpenContact}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            title="Helpline & WhatsApp Support"
          >
            <Phone className="h-3.5 w-3.5 text-rose-400" />
            <span>Support</span>
          </button>

          {/* User Account / My Bookings */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 border border-white/10 rounded-lg hover:bg-white/10 transition-colors cursor-pointer relative"
          >
            <User className="h-3.5 w-3.5 text-slate-300" />
            <span className="hidden md:inline">{userEmail ? userEmail.split('@')[0] : 'My Account'}</span>
            {savedCount > 0 && (
              <span className="h-2 w-2 rounded-full bg-rose-500 absolute -top-1 -right-1" />
            )}
          </button>

          {/* Admin Dashboard Switch */}
          <button
            onClick={onOpenAdmin}
            className="hidden lg:flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            title="Agency Admin Portal"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Admin</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => handleNavClick('budget-calculator')}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 rounded-lg shadow-sm shadow-rose-950 transition-colors whitespace-nowrap cursor-pointer"
          >
            Plan Trip &lt; ₹5L
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#0d1424] px-4 py-4 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10 text-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2 rounded-md text-xs font-medium ${
                  activeSection === item.id
                    ? 'bg-rose-600/20 text-rose-300 font-semibold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Agency Admin Portal</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>24/7 Helpline (+91)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
