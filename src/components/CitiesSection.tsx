import React, { useState } from 'react';
import { CITIES_DATA } from '../data/mockData';
import { CityInfo } from '../types';
import { MapPin, Clock, IndianRupee, Sun, ArrowRight, X, Sparkles, Compass } from 'lucide-react';

interface CitiesSectionProps {
  onSelectCityForTrip: (cityName: string) => void;
}

export const CitiesSection: React.FC<CitiesSectionProps> = ({ onSelectCityForTrip }) => {
  const [selectedCity, setSelectedCity] = useState<CityInfo | null>(null);

  return (
    <section id="destinations" className="py-20 bg-[#090D16]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
              Iconic Destinations
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white mt-1">
              Explore Russia's Premier Cities
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              From the imperial grandeur of Saint Petersburg to the Arctic lights of Murmansk and the subtropical palms of Sochi, discover the diverse realms of Russia.
            </p>
          </div>
          <div className="text-xs text-slate-400 border border-white/10 rounded-lg px-3.5 py-2 bg-white/5">
            Average Indian Daily Budget: <strong className="text-emerald-400 font-mono">₹6,200 – ₹10,500/day</strong>
          </div>
        </div>

        {/* 6 City Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CITIES_DATA.map((city) => (
            <div
              key={city.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl"
            >
              {/* City Image Container with Aspect Ratio */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-800">
                <img
                  src={city.image}
                  alt={city.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Styled fallback if image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent" />
                
                {/* Cyrillic & English Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="rounded-md bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md border border-white/15">
                    {city.russianName}
                  </span>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 rounded-md bg-rose-950/80 px-2.5 py-1 text-xs font-medium text-rose-300 backdrop-blur-md border border-rose-500/30">
                  <Clock className="h-3 w-3 text-rose-400" />
                  <span>{city.recommendedDuration}</span>
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-serif-heading text-2xl font-bold text-white group-hover:text-rose-300 transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1">{city.tagline}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 space-y-4">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                  {city.description}
                </p>

                {/* Major Attractions List */}
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Key Highlights
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {city.majorAttractions.slice(0, 4).map((attraction, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-white/5 border border-white/10 px-2 py-1 text-[11px] text-slate-300"
                      >
                        {attraction}
                      </span>
                    ))}
                    {city.majorAttractions.length > 4 && (
                      <span className="text-[11px] text-slate-400 self-center px-1">
                        +{city.majorAttractions.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Price and Action Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">Est. Daily Budget</div>
                    <div className="flex items-center text-sm font-bold text-emerald-400 font-mono tabular-nums">
                      <span>₹{city.estimatedDailyBudgetInr.toLocaleString('en-IN')}</span>
                      <span className="text-[11px] text-slate-400 font-normal ml-1">/ person</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCity(city)}
                    className="flex items-center gap-1 px-3.5 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-rose-600 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Explore City</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for In-depth City Exploration */}
        {selectedCity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/20 bg-[#111827] shadow-2xl">
              
              {/* Modal Header Image */}
              <div className="relative h-64 w-full bg-slate-900">
                <img
                  src={selectedCity.image}
                  alt={selectedCity.name}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent" />
                
                <button
                  onClick={() => setSelectedCity(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs uppercase tracking-wider font-semibold text-rose-400">
                      Russia Destination Guide
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-xs text-slate-300 font-serif">{selectedCity.russianName}</span>
                  </div>
                  <h3 className="font-serif-heading text-3xl font-bold text-white">
                    {selectedCity.name}
                  </h3>
                  <p className="text-xs text-slate-300">{selectedCity.tagline}</p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedCity.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-1">
                      <Clock className="h-4 w-4" /> Recommended Stay
                    </div>
                    <p className="text-sm text-white font-medium">{selectedCity.recommendedDuration}</p>
                    <p className="text-xs text-slate-400 mt-1">Allows comfortable sightseeing without rushing.</p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
                      <Sun className="h-4 w-4" /> Best Time to Visit
                    </div>
                    <p className="text-sm text-white font-medium">{selectedCity.bestTimeToVisit}</p>
                    <p className="text-xs text-slate-400 mt-1">{selectedCity.climateHighlights}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Must-See Landmarks &amp; Attractions
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-200">
                    {selectedCity.majorAttractions.map((attr, idx) => (
                      <div key={idx} className="flex items-center gap-2 rounded-lg bg-white/5 p-2">
                        <Sparkles className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                        <span>{attr}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-emerald-300 font-semibold">Estimated Daily Spending</div>
                    <div className="text-lg font-bold font-mono text-emerald-400">
                      ₹{selectedCity.estimatedDailyBudgetInr.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-400">/ person (Food, Metro &amp; Sightseeing)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-white/10 bg-[#0d1320] flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedCity(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onSelectCityForTrip(selectedCity.name);
                    setSelectedCity(null);
                  }}
                  className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-md transition-colors"
                >
                  Plan Trip to {selectedCity.name}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
