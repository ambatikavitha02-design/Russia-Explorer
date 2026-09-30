import React from 'react';
import { Compass, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <footer className="bg-[#060910] text-slate-400 border-t border-white/10 text-xs">
      {/* Upper Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-rose-600 to-indigo-700 text-white font-bold">
                <Compass className="h-5 w-5" />
              </div>
              <span className="font-serif-heading text-lg font-bold text-white">
                Russia Explorer
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              India's premier travel agency specializing in complete, seamless Russia holiday packages. We bridge cultures with verified flight bookings, central luxury hotels, certified bilingual guides, Indian dining itineraries, and official 16-day Russian e-Visa support.
            </p>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                <span>Barakhamba Road, Connaught Place, New Delhi 110001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>+91 11 4988 2300 / WhatsApp: +91 98110 54220</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <span>concierge@russiaexplorer.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-serif-heading">
              Russia Destinations
            </h4>
            <ul className="space-y-2">
              {['Moscow', 'Saint Petersburg', 'Sochi Riviera', 'Kazan Tatarstan', 'Murmansk Arctic', 'Vladivostok Pacific'].map((city, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate('destinations')}
                    className="hover:text-rose-400 transition-colors text-left"
                  >
                    {city}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-serif-heading">
              Travel Services
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('packages')} className="hover:text-rose-400 transition-colors">
                  Complete Tour Packages (&lt; ₹5L)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('flights')} className="hover:text-rose-400 transition-colors">
                  Direct Aeroflot &amp; 1-Stop Flights
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hotels')} className="hover:text-rose-400 transition-colors">
                  Handpicked Central Hotels
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cabs')} className="hover:text-rose-400 transition-colors">
                  Airport Transfers &amp; Chauffeurs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('budget-calculator')} className="hover:text-rose-400 transition-colors">
                  Interactive Budget Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('visa-info')} className="hover:text-rose-400 transition-colors">
                  16-Day Russian e-Visa Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-serif-heading">
              Policies &amp; Trust
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={onOpenContact} className="hover:text-rose-400 transition-colors">
                  Transparent Pricing Policy
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-rose-400 transition-colors">
                  Cancellation &amp; Refund Policy
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-rose-400 transition-colors">
                  Passport Data Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-rose-400 transition-colors">
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-rose-400 transition-colors">
                  Embassy Liaison &amp; Safety
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Pricing Transparency & Statutory Disclaimer */}
        <div className="mt-12 pt-6 border-t border-white/10 text-[11px] text-slate-500 leading-relaxed space-y-2">
          <p>
            * <strong>Pricing Transparency Notice:</strong> All fares and package prices are calculated in Indian Rupees (₹ INR). Published rates include baseline airfares from Delhi/Mumbai, hotel rooms, taxes, and service charges. Flight fares and foreign exchange rates are dynamically confirmed upon final ticket issuance. Sample packages remain strictly governed under our ₹5,00,000 maximum budget guarantee.
          </p>
          <p>
            * <strong>Consular Disclaimer:</strong> Russia Explorer is an independent tour operator. Entry visas are granted solely by the Ministry of Foreign Affairs of the Russian Federation. Travellers must verify requirements on official consular websites prior to travel.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Russia Explorer (India) Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Instagram @russiaexplorer</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">YouTube /russiaexplorertours</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">LinkedIn /russia-explorer</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
