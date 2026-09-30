import React, { useState } from 'react';
import { CABS_DATA } from '../data/mockData';
import { CabOption } from '../types';
import { Users, Luggage, Star, ShieldCheck, CheckCircle2, Car, Sparkles, Languages } from 'lucide-react';

interface CabSectionProps {
  onSelectCab: (cab: CabOption) => void;
  selectedCabId?: string;
}

export const CabSection: React.FC<CabSectionProps> = ({
  onSelectCab,
  selectedCabId,
}) => {
  const [selectedServiceType, setSelectedServiceType] = useState<string>('All');

  const serviceTypes = [
    'All',
    'Airport Pickup',
    'Airport Drop',
    'Sightseeing Vehicle',
    'Intercity Transfer',
    'Shared Cab',
  ];

  const filteredCabs = selectedServiceType === 'All'
    ? CABS_DATA
    : CABS_DATA.filter((c) => c.serviceType === selectedServiceType);

  return (
    <section id="cabs" className="py-20 bg-[#0B101C] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
              Reliable Local Transportation
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white mt-1">
              Airport Transfers &amp; Chauffeur Cabs in Russia
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Punctual meet &amp; greet service with English-speaking drivers at Sheremetyevo (SVO), Domodedovo (DME), and Pulkovo (LED). Avoid airport scams and ride in safety.
            </p>
          </div>

          <div className="text-xs text-slate-400 border border-white/10 rounded-lg px-3 py-1.5 bg-white/5 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Flight delayed? <strong>60 mins free waiting time</strong> guaranteed</span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {serviceTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedServiceType(type)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedServiceType === type
                  ? 'bg-rose-600 text-white font-semibold shadow-md'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Cabs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCabs.map((cab) => {
            const isSelected = selectedCabId === cab.id;

            return (
              <div
                key={cab.id}
                className={`flex flex-col justify-between overflow-hidden rounded-2xl border transition-all bg-[#121929] ${
                  isSelected
                    ? 'border-emerald-500 ring-1 ring-emerald-500 shadow-xl'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Vehicle Image */}
                <div className="relative h-48 w-full bg-slate-800">
                  <img
                    src={cab.image}
                    alt={cab.vehicleName}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121929] via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="rounded-md bg-rose-600/90 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-md">
                      {cab.serviceType}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded text-xs font-bold text-amber-400 border border-white/10 backdrop-blur-md">
                    <Star className="h-3 w-3 fill-amber-400" />
                    <span>{cab.driverRating}</span>
                  </div>

                  <div className="absolute bottom-2 left-3 right-3">
                    <h3 className="font-serif-heading text-base font-bold text-white leading-tight">
                      {cab.vehicleName}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-xs text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-rose-400" />
                        <span>Up to {cab.capacity} Pax</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Luggage className="h-4 w-4 text-blue-400" />
                        <span>{cab.luggageCapacity} Bags</span>
                      </div>
                      <div className="text-[11px] text-slate-400 border border-white/10 rounded px-1.5 py-0.5">
                        {cab.vehicleCategory}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Languages className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Languages: {cab.driverLanguages.join(', ')}</span>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Includes flight tracking, airport parking fee, bottled mineral water, and complimentary luggage loading assistance.
                    </p>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">
                        {cab.perDayPrice ? 'Full Day Rate' : 'Fixed Fare'}
                      </div>
                      <div className="text-base font-bold text-emerald-400 font-mono tabular-nums">
                        ₹{cab.priceInr.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectCab(cab)}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Selected</span>
                        </>
                      ) : (
                        <span>Book Cab</span>
                      )}
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
