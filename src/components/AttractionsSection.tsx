import React, { useState } from 'react';
import { ATTRACTIONS_DATA } from '../data/mockData';
import { TouristAttraction } from '../types';
import { Clock, MapPin, Plus, Check, IndianRupee, Sparkles, Filter } from 'lucide-react';

interface AttractionsSectionProps {
  onAddAttraction: (attraction: TouristAttraction) => void;
  selectedAttractionIds: string[];
}

export const AttractionsSection: React.FC<AttractionsSectionProps> = ({
  onAddAttraction,
  selectedAttractionIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const categories = ['All', 'Historical', 'Palace', 'Museum', 'Cultural', 'Nature', 'Architecture'];

  const filteredAttractions = selectedCategory === 'All'
    ? ATTRACTIONS_DATA
    : ATTRACTIONS_DATA.filter((item) => item.category === selectedCategory);

  const handleAdd = (attraction: TouristAttraction) => {
    onAddAttraction(attraction);
    setJustAddedId(attraction.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  return (
    <section id="attractions" className="py-20 bg-[#0B101C] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
              World Heritage &amp; Landmarks
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white mt-1">
              Best Tourist Attractions in Russia
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Marvel at Tsarist treasures, crystal Siberian lakes, and monumental architecture. Click <strong>"Add to Trip"</strong> to customize your personalized itinerary.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-slate-400">Added to your trip:</span>
            <span className="inline-flex items-center justify-center h-6 px-2.5 rounded-full bg-rose-600/30 text-rose-300 font-mono text-xs font-bold border border-rose-500/40">
              {selectedAttractionIds.length} attractions
            </span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white font-semibold shadow-md shadow-rose-900/40'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAttractions.map((attraction) => {
            const isSelected = selectedAttractionIds.includes(attraction.id);
            const isRecentlyAdded = justAddedId === attraction.id;

            return (
              <div
                key={attraction.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#121929] transition-all hover:border-white/20 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-800">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121929] via-[#121929]/30 to-transparent" />
                  
                  {/* Category & City Tags */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-medium text-slate-200 backdrop-blur-md border border-white/15">
                      {attraction.city}
                    </span>
                    <span className="rounded-md bg-rose-950/70 px-2 py-0.5 text-[11px] font-medium text-rose-300 backdrop-blur-md border border-rose-500/30">
                      {attraction.category}
                    </span>
                  </div>

                  {/* Entry Price Badge */}
                  <div className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2.5 py-1 text-xs font-mono font-bold text-emerald-300 backdrop-blur-md border border-emerald-500/30">
                    {attraction.estimatedEntryPriceInr === 0 ? 'Free Entry' : `₹${attraction.estimatedEntryPriceInr.toLocaleString('en-IN')}`}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-1 flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif-heading text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                      {attraction.name}
                    </h3>
                    
                    <p className="mt-1 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {attraction.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                      <span className="truncate">{attraction.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span>{attraction.recommendedVisitingTime}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1">
                    {attraction.highlights.slice(0, 3).map((item, idx) => (
                      <span key={idx} className="text-[10px] text-slate-400 bg-white/5 rounded px-1.5 py-0.5">
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Add to Trip Action */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400">Entry ticket</span>
                      <div className="text-xs font-bold text-white">
                        {attraction.estimatedEntryPriceInr === 0 ? 'Included' : `₹${attraction.estimatedEntryPriceInr} / person`}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAdd(attraction)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 hover:bg-rose-900/30 hover:text-rose-300'
                          : 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span>{isRecentlyAdded ? 'Added!' : 'In Your Trip'}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5" />
                          <span>Add to Trip</span>
                        </>
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
