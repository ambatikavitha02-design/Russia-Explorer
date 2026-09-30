import React, { useState } from 'react';
import { Calendar, Users, MapPin, PlaneTakeoff, IndianRupee, ArrowRight, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';

interface HeroProps {
  onSearch: (params: {
    fromCity: string;
    destination: string;
    travelDate: string;
    travellers: number;
    budgetLimit: number;
  }) => void;
  onPlanTrip: () => void;
  onOpenAiChat: (prompt?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onPlanTrip, onOpenAiChat }) => {
  // Travel date default: 28th of next month (Oct 28, 2026)
  const defaultNextMonthDate = '2026-10-28';

  const [fromCity, setFromCity] = useState('New Delhi (DEL)');
  const [destination, setDestination] = useState('All Russia (Moscow & St. Petersburg)');
  const [travelDate, setTravelDate] = useState(defaultNextMonthDate);
  const [travellers, setTravellers] = useState(2);
  const [budgetLimit, setBudgetLimit] = useState(500000);

  const indianAirports = [
    'New Delhi (DEL)',
    'Mumbai (BOM)',
    'Bengaluru (BLR)',
    'Chennai (MAA)',
    'Kolkata (CCU)',
    'Hyderabad (HYD)',
    'Ahmedabad (AMD)',
    'Kochi (COK)'
  ];

  const destinations = [
    'All Russia (Moscow & St. Petersburg)',
    'Moscow Only',
    'Saint Petersburg Only',
    'Moscow + St. Petersburg + Sochi',
    'Murmansk Northern Lights Arctic',
    'Kazan Cultural Trail',
    'Lake Baikal Winter Ice Excursion',
    'Trans-Siberian Railway'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      fromCity,
      destination,
      travelDate,
      travellers,
      budgetLimit,
    });
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
      {/* Background Image with High-Grade Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Moscow Red Square Saint Basil Cathedral"
          className="h-full w-full object-cover object-center transform scale-105 duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark gradient scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/80 to-[#090D16]/40" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#090D16]/60 to-[#090D16]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Subtle Trust Pill & AI Assistant Launcher */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-950/40 px-3.5 py-1 text-xs font-semibold text-rose-300 backdrop-blur-md">
            <Shield className="h-3.5 w-3.5 text-rose-400" />
            <span>Premier Russia Tour Specialists for Indian Passport Holders</span>
            <span className="text-rose-500 font-bold">·</span>
            <span>16-Day e-Visa Assistance</span>
          </div>

          <button
            type="button"
            onClick={() => onOpenAiChat(`Hello! I would like to plan a complete Russia tour departing from ${fromCity} for ${travellers} travellers within ₹5,00,000 budget.`)}
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md hover:bg-emerald-900/50 transition-colors cursor-pointer"
          >
            <Sparkles className="h-3 w-3 text-emerald-400" />
            <span>AI Travel Assistant Online</span>
          </button>
        </div>

        {/* Main Headings */}
        <div className="max-w-4xl">
          <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance leading-tight drop-shadow-sm">
            Discover the Magic of Russia
          </h1>
          <p className="mt-4 text-lg sm:text-xl font-medium text-slate-300 tracking-wide">
            Flights <span className="text-rose-400">·</span> Hotels <span className="text-rose-400">·</span> Cabs <span className="text-rose-400">·</span> Tours <span className="text-rose-400">·</span> Complete Travel Packages
          </p>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl leading-relaxed">
            All-inclusive round trips from India designed within your ₹5,00,000 maximum budget. Experience Tsarist palaces, Sapsan bullet trains, the Aurora Borealis, and warm Russian hospitality with authentic Indian meal options.
          </p>
        </div>

        {/* Booking / Search Engine Widget */}
        <div className="mt-8 rounded-2xl border border-white/15 bg-[#101726]/90 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSearchSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              
              {/* Departure City Selector */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 hover:border-white/20 transition-colors">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  <PlaneTakeoff className="h-3.5 w-3.5 text-rose-400" />
                  Departure from India
                </label>
                <select
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="mt-1.5 w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
                >
                  {indianAirports.map((airport) => (
                    <option key={airport} value={airport} className="bg-slate-900 text-white">
                      {airport}
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination Selector */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 hover:border-white/20 transition-colors">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-rose-400" />
                  Destination in Russia
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="mt-1.5 w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
                >
                  {destinations.map((dest) => (
                    <option key={dest} value={dest} className="bg-slate-900 text-white">
                      {dest}
                    </option>
                  ))}
                </select>
              </div>

              {/* Travel Date Selector (Default: 28th of next month) */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 hover:border-white/20 transition-colors">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  <Calendar className="h-3.5 w-3.5 text-rose-400" />
                  Travel Date (To &amp; Fro)
                </label>
                <input
                  type="date"
                  value={travelDate}
                  min="2026-10-01"
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="mt-1.5 w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
                />
              </div>

              {/* Number of Travellers */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 hover:border-white/20 transition-colors">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  <Users className="h-3.5 w-3.5 text-rose-400" />
                  Travellers
                </label>
                <select
                  value={travellers}
                  onChange={(e) => setTravellers(Number(e.target.value))}
                  className="mt-1.5 w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
                >
                  <option value={1} className="bg-slate-900 text-white">1 Solo Explorer</option>
                  <option value={2} className="bg-slate-900 text-white">2 Adults (Couple / Pair)</option>
                  <option value={3} className="bg-slate-900 text-white">3 Travellers (Small Family)</option>
                  <option value={4} className="bg-slate-900 text-white">4 Travellers (Family / Group)</option>
                  <option value={6} className="bg-slate-900 text-white">6 Travellers (Group Tour)</option>
                </select>
              </div>

              {/* Maximum Budget Selector (Cap ₹5,00,000) */}
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 hover:border-white/20 transition-colors">
                <label className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  <span className="flex items-center gap-1">
                    <IndianRupee className="h-3.5 w-3.5 text-emerald-400" /> Max Budget
                  </span>
                  <span className="font-mono text-emerald-300 tabular-nums">
                    ₹{(budgetLimit / 100000).toFixed(1)}L
                  </span>
                </label>
                <select
                  value={budgetLimit}
                  onChange={(e) => setBudgetLimit(Number(e.target.value))}
                  className="mt-1.5 w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
                >
                  <option value={200000} className="bg-slate-900 text-white">Up to ₹2,00,000</option>
                  <option value={300000} className="bg-slate-900 text-white">Up to ₹3,00,000</option>
                  <option value={400000} className="bg-slate-900 text-white">Up to ₹4,00,000</option>
                  <option value={500000} className="bg-slate-900 text-white">Up to ₹5,00,000 (Maximum Cap)</option>
                </select>
              </div>

            </div>

            {/* Buttons Row & Disclaimers */}
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Trip Date: <strong>28th October 2026</strong> · Round-Trip · Direct &amp; 1-Stop Connections</span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onOpenAiChat(`Hello! Could you suggest the best Russia tour package from ${fromCity} to ${destination} on ${travelDate} for ${travellers} travellers within ₹5,00,000?`)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-rose-300 bg-rose-950/50 hover:bg-rose-900/60 border border-rose-500/40 rounded-xl transition-colors cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5 text-rose-400" />
                  <span>Ask AI Assistant</span>
                </button>

                <button
                  type="button"
                  onClick={onPlanTrip}
                  className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-slate-200 border border-white/20 hover:border-white/40 hover:bg-white/5 rounded-xl transition-colors cursor-pointer text-center"
                >
                  Plan My Russia Trip
                </button>
                <button
                  type="submit"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700 hover:from-rose-500 hover:to-rose-600 rounded-xl shadow-lg shadow-rose-900/40 transition-all cursor-pointer"
                >
                  <span>Search Packages</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Live Estimation Disclaimer */}
        <p className="mt-3 text-center sm:text-left text-[11px] text-slate-400/80">
          * Note: Displayed prices are realistic estimates calculated in Indian Rupees (₹) including standard taxes &amp; flight estimates. Live fares fluctuate based on confirmed airline &amp; hotel availability.
        </p>
      </div>
    </div>
  );
};
