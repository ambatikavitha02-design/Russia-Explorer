import React, { useState } from 'react';
import { TouristAttraction, CustomItineraryDay } from '../types';
import { ATTRACTIONS_DATA, HOTELS_DATA } from '../data/mockData';
import { Calendar, Plus, Trash2, MapPin, Building2, Car, IndianRupee, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface ItineraryBuilderProps {
  selectedAttractions: TouristAttraction[];
  onRemoveAttraction: (id: string) => void;
  onProceedToCheckout: (customItinerary: {
    days: CustomItineraryDay[];
    totalEstimatedCost: number;
  }) => void;
}

export const ItineraryBuilder: React.FC<ItineraryBuilderProps> = ({
  selectedAttractions,
  onRemoveAttraction,
  onProceedToCheckout,
}) => {
  // Initial 7-day recommended timeline
  const initialDays: CustomItineraryDay[] = [
    {
      id: 'day-1',
      dayNumber: 1,
      city: 'Moscow',
      title: 'Arrival in Moscow & Airport Chauffeur Transfer',
      date: '2026-10-28',
      attractionIds: [],
      notes: 'Touch down at Sheremetyevo (SVO), chauffeur meet & greet, check-in at central hotel, evening stroll along illuminated Arbat.',
      estimatedCostInr: 16500, // hotel night + airport transfer
    },
    {
      id: 'day-2',
      dayNumber: 2,
      city: 'Moscow',
      title: 'Grand Kremlin Citadel & Red Square Grand Tour',
      date: '2026-10-29',
      attractionIds: ['red-square', 'moscow-kremlin', 'saint-basils'],
      notes: 'Witness Cathedral Square, Tsar Cannon, Armoury treasures, and photograph Saint Basil’s fairytale domes.',
      estimatedCostInr: 14500,
    },
    {
      id: 'day-3',
      dayNumber: 3,
      city: 'Moscow',
      title: 'Subterranean Metro Palaces & Bolshoi Ballet',
      date: '2026-10-30',
      attractionIds: ['bolshoi-theatre'],
      notes: 'Guided tour of world-famous marble metro stations. Afternoon fine dining at Indian restaurant, evening ballet.',
      estimatedCostInr: 17200,
    },
    {
      id: 'day-4',
      dayNumber: 4,
      city: 'Saint Petersburg',
      title: 'Sapsan Bullet Train to Saint Petersburg & Canal Cruise',
      date: '2026-10-31',
      attractionIds: [],
      notes: 'Board the 250 km/h Sapsan express through birch forests. Arrive at Moskovsky station, check-in, sunset Neva cruise.',
      estimatedCostInr: 19800,
    },
    {
      id: 'day-5',
      dayNumber: 5,
      city: 'Saint Petersburg',
      title: 'Imperial State Hermitage & Spilled Blood Cathedral',
      date: '2026-11-01',
      attractionIds: ['hermitage-museum', 'spilled-blood-church'],
      notes: 'VIP fast-track entrance into Catherine the Great’s Winter Palace. Admire 7,500 sq meters of mosaic art.',
      estimatedCostInr: 15400,
    },
    {
      id: 'day-6',
      dayNumber: 6,
      city: 'Saint Petersburg',
      title: 'Peterhof Grand Cascade Fountains Excursion',
      date: '2026-11-02',
      attractionIds: ['peterhof-palace'],
      notes: 'Hydrofoil boat trip along Gulf of Finland to Russian Versailles and gilded Samson fountain.',
      estimatedCostInr: 16200,
    },
    {
      id: 'day-7',
      dayNumber: 7,
      city: 'Saint Petersburg',
      title: 'Souvenir Amber Shopping & Departure to India',
      date: '2026-11-03',
      attractionIds: [],
      notes: 'Final souvenir collection on Nevsky Prospect. Private transfer to Pulkovo airport (LED) for return flight.',
      estimatedCostInr: 12000,
    },
  ];

  const [days, setDays] = useState<CustomItineraryDay[]>(initialDays);
  const [selectedDayToAdd, setSelectedDayToAdd] = useState<number>(2);

  // Add attraction to a chosen day
  const handleAssignAttractionToDay = (attractionId: string, dayNumber: number) => {
    setDays((prev) =>
      prev.map((d) => {
        if (d.dayNumber === dayNumber) {
          if (!d.attractionIds.includes(attractionId)) {
            return {
              ...d,
              attractionIds: [...d.attractionIds, attractionId],
              estimatedCostInr: d.estimatedCostInr + 1500,
            };
          }
        }
        return d;
      })
    );
  };

  const handleRemoveAttractionFromDay = (attractionId: string, dayNumber: number) => {
    setDays((prev) =>
      prev.map((d) => {
        if (d.dayNumber === dayNumber) {
          return {
            ...d,
            attractionIds: d.attractionIds.filter((id) => id !== attractionId),
            estimatedCostInr: Math.max(8000, d.estimatedCostInr - 1500),
          };
        }
        return d;
      })
    );
  };

  const handleAddNewDay = () => {
    const nextDayNum = days.length + 1;
    const newDay: CustomItineraryDay = {
      id: `day-${nextDayNum}`,
      dayNumber: nextDayNum,
      city: nextDayNum > 4 ? 'Saint Petersburg' : 'Moscow',
      title: `Day ${nextDayNum} – Leisure & Sightseeing`,
      date: `2026-11-0${nextDayNum - 3}`,
      attractionIds: [],
      notes: 'Free day for photography, shopping, and tasting Russian cuisine.',
      estimatedCostInr: 11000,
    };
    setDays([...days, newDay]);
  };

  const handleDeleteDay = (dayId: string) => {
    if (days.length <= 3) return; // Keep min 3 days
    const filtered = days.filter((d) => d.id !== dayId);
    // renumber
    const renumbered = filtered.map((d, index) => ({
      ...d,
      dayNumber: index + 1,
    }));
    setDays(renumbered);
  };

  const totalItineraryCost = days.reduce((acc, curr) => acc + curr.estimatedCostInr, 0);

  return (
    <section id="itinerary" className="py-20 bg-[#0B101C] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
              Personalized Trip Planner
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white mt-1">
              Custom Russia Day-by-Day Itinerary Builder
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Tailor each day's route, assign your saved monuments, customize cities, and monitor running costs in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddNewDay}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 border border-white/20 hover:border-white/40 rounded-xl bg-white/5 transition-colors cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Another Day</span>
            </button>
            <button
              onClick={() => onProceedToCheckout({ days, totalEstimatedCost: totalItineraryCost })}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              <span>Book This Itinerary</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Selected Attractions Quick Tray */}
        {selectedAttractions.length > 0 && (
          <div className="mb-8 rounded-2xl border border-rose-500/30 bg-rose-950/20 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-rose-400" />
                <span className="text-xs font-semibold text-white">Your Saved Attractions Tray ({selectedAttractions.length})</span>
                <span className="text-[11px] text-slate-400">· Click to assign to a day</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Target Day:</span>
                <select
                  value={selectedDayToAdd}
                  onChange={(e) => setSelectedDayToAdd(Number(e.target.value))}
                  className="bg-slate-900 border border-white/20 rounded-md px-2 py-1 text-xs text-white"
                >
                  {days.map((d) => (
                    <option key={d.dayNumber} value={d.dayNumber}>
                      Day {d.dayNumber} ({d.city})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedAttractions.map((attr) => (
                <div
                  key={attr.id}
                  className="flex items-center gap-2 rounded-lg bg-black/40 border border-white/10 px-3 py-1.5 text-xs text-slate-200"
                >
                  <span>{attr.name}</span>
                  <button
                    onClick={() => handleAssignAttractionToDay(attr.id, selectedDayToAdd)}
                    className="text-rose-400 hover:text-rose-300 font-bold ml-1 text-xs"
                    title={`Add to Day ${selectedDayToAdd}`}
                  >
                    + Assign Day {selectedDayToAdd}
                  </button>
                  <button
                    onClick={() => onRemoveAttraction(attr.id)}
                    className="text-slate-500 hover:text-slate-300 ml-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Day by Day Cards List */}
        <div className="space-y-4">
          {days.map((day) => {
            const dayAttractions = ATTRACTIONS_DATA.filter((a) =>
              day.attractionIds.includes(a.id)
            );

            return (
              <div
                key={day.id}
                className="rounded-2xl border border-white/10 bg-[#121929] p-5 shadow-lg transition-all hover:border-white/20"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600 text-xs font-bold text-white shadow">
                      D{day.dayNumber}
                    </span>
                    <div>
                      <h4 className="font-serif-heading text-base font-bold text-white">
                        {day.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="flex items-center gap-1 text-rose-400">
                          <MapPin className="h-3 w-3" /> {day.city}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {day.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 uppercase">Estimated Day Cost</div>
                      <div className="text-sm font-bold font-mono text-emerald-400 tabular-nums">
                        ₹{day.estimatedCostInr.toLocaleString('en-IN')}
                      </div>
                    </div>

                    {days.length > 3 && (
                      <button
                        onClick={() => handleDeleteDay(day.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg transition-colors"
                        title="Delete Day"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-3 space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {day.notes}
                  </p>

                  {/* Assigned attractions for this day */}
                  {dayAttractions.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-semibold uppercase text-slate-400">
                        Scheduled Sightseeing &amp; Attractions:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {dayAttractions.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between rounded-lg bg-white/5 border border-white/10 p-2 text-xs text-slate-200"
                          >
                            <span className="truncate">{item.name}</span>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[11px] font-mono text-emerald-400">
                                {item.estimatedEntryPriceInr === 0 ? 'Free' : `₹${item.estimatedEntryPriceInr}`}
                              </span>
                              <button
                                onClick={() => handleRemoveAttractionFromDay(item.id, day.dayNumber)}
                                className="text-slate-500 hover:text-rose-400"
                                title="Remove from this day"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Cost Bar */}
        <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">
              Complete {days.length}-Day Customized Itinerary
            </div>
            <div className="text-2xl font-bold font-mono text-white mt-0.5">
              ₹{totalItineraryCost.toLocaleString('en-IN')} <span className="text-xs text-slate-400 font-normal">est. total (under ₹5,00,000 budget cap)</span>
            </div>
          </div>

          <button
            onClick={() => onProceedToCheckout({ days, totalEstimatedCost: totalItineraryCost })}
            className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Proceed to Booking with Traveller Details</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
