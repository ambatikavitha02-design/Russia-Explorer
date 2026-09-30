import React, { useState } from 'react';
import { TOUR_PACKAGES } from '../data/mockData';
import { TourPackage } from '../types';
import { Check, Plane, Building2, Car, Map, ArrowRight, Sliders, ShieldAlert, Sparkles, Star } from 'lucide-react';

interface PackagesSectionProps {
  onBookPackage: (pkg: TourPackage, customizedOptions?: { hotelTier: string; days: number; travellers: number }) => void;
  maxBudgetFilter: number;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  onBookPackage,
  maxBudgetFilter,
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [customizingPackage, setCustomizingPackage] = useState<TourPackage | null>(null);

  // Customizer state
  const [customTravellers, setCustomTravellers] = useState<number>(2);
  const [customHotelCategory, setCustomHotelCategory] = useState<string>('Standard');
  const [addPrivateGuide, setAddPrivateGuide] = useState<boolean>(false);
  const [addIndianDinnerPlan, setAddIndianDinnerPlan] = useState<boolean>(true);

  // Filter packages strictly within ₹5,00,000 budget cap
  const availablePackages = TOUR_PACKAGES.filter((pkg) => {
    const tierMatch = selectedTier === 'All' || pkg.tier === selectedTier;
    const budgetMatch = pkg.totalEstimatedPriceInr <= maxBudgetFilter;
    return tierMatch && budgetMatch;
  });

  const calculateCustomPrice = (basePkg: TourPackage) => {
    let perPerson = basePkg.pricePerPersonInr;
    if (customHotelCategory === '5-Star Luxury Upgrade') perPerson += 45000;
    if (customHotelCategory === 'Budget Economy') perPerson -= 15000;
    if (addPrivateGuide) perPerson += 18000;
    if (addIndianDinnerPlan) perPerson += 12000;

    const total = perPerson * customTravellers;
    return { perPerson, total };
  };

  return (
    <section id="packages" className="py-20 bg-[#090D16] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
              Complete Round-Trip Holidays
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white mt-1">
              Curated Russia Tour Packages from India
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              All packages include return flights from India, star accommodation, high-speed rail, private airport transfers, and guided sightseeing. Strictly guaranteed under the <strong>₹5,00,000 budget ceiling</strong>.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl self-start md:self-auto">
            {['All', 'Budget', 'Classic', 'Premium', 'Speciality'].map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedTier === tier
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {availablePackages.map((pkg) => {
            return (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between rounded-2xl border transition-all duration-300 relative overflow-hidden bg-[#111827] ${
                  pkg.featured
                    ? 'border-rose-500/50 shadow-xl shadow-rose-950/20 ring-1 ring-rose-500/40'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {pkg.featured && (
                  <div className="bg-gradient-to-r from-rose-600 to-amber-600 py-1 px-3 text-center text-[11px] font-bold text-white uppercase tracking-wider">
                    Most Popular Choice from India
                  </div>
                )}

                {/* Image */}
                <div className="relative h-44 w-full bg-slate-800">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="rounded-md bg-black/70 px-2 py-0.5 text-xs font-semibold text-rose-300 border border-white/10 backdrop-blur-md">
                      {pkg.days} Days / {pkg.nights} Nights
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-3 right-3">
                    <h3 className="font-serif-heading text-lg font-bold text-white leading-tight">
                      {pkg.name}
                    </h3>
                  </div>
                </div>

                {/* Package Inclusions & Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {pkg.subtitle}
                    </p>

                    {/* Cities Covered */}
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-400">
                      <Map className="h-3.5 w-3.5 shrink-0" />
                      <span className="font-medium text-slate-200">{pkg.cities.join(' + ')}</span>
                    </div>

                    {/* 4 Inclusions Matrix */}
                    <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-slate-300 bg-white/5 rounded-xl p-2.5 border border-white/10">
                      <div className="flex items-center gap-1.5">
                        <Plane className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span>Round-Trip Flight</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                        <span className="truncate">{pkg.hotelCategory.split(' ')[0]} Hotel</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Car className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        <span>Airport Cabs</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                        <span>Sightseeing Tour</span>
                      </div>
                    </div>

                    {/* Bullet Highlights */}
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                      {pkg.highlights.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-rose-400 font-bold shrink-0">·</span>
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and Actions */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-[10px] uppercase text-slate-400">Per Person</div>
                        <div className="text-base font-bold text-white font-mono tabular-nums">
                          ₹{pkg.pricePerPersonInr.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase text-slate-400">2-Pax Total Est.</div>
                        <div className="text-base font-bold text-emerald-400 font-mono tabular-nums">
                          ₹{pkg.totalEstimatedPriceInr.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setCustomizingPackage(pkg);
                          setCustomTravellers(2);
                        }}
                        className="flex-1 py-2 text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Sliders className="h-3 w-3" />
                        <span>Customize</span>
                      </button>

                      <button
                        onClick={() => onBookPackage(pkg)}
                        className="flex-1 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-sm transition-colors cursor-pointer text-center"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Customization Modal */}
        {customizingPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/20 bg-[#111827] shadow-2xl p-6">
              
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs text-rose-400 font-semibold uppercase tracking-wider">Package Customizer</span>
                  <h3 className="font-serif-heading text-2xl font-bold text-white mt-0.5">
                    Customize {customizingPackage.name}
                  </h3>
                  <p className="text-xs text-slate-400">Adjust options to match your exact group preference and budget.</p>
                </div>
                <button
                  onClick={() => setCustomizingPackage(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-4">
                {/* Travellers count */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Number of Travellers
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setCustomTravellers(num)}
                        className={`py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                          customTravellers === num
                            ? 'bg-rose-600 text-white border-rose-500'
                            : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {num} {num === 1 ? 'Solo' : num === 2 ? 'Pair' : 'Pax'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hotel category choice */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Hotel Class Upgrade
                  </label>
                  <select
                    value={customHotelCategory}
                    onChange={(e) => setCustomHotelCategory(e.target.value)}
                    className="w-full bg-[#1b2438] border border-white/15 rounded-xl px-3 py-2 text-xs font-medium text-white focus:outline-none"
                  >
                    <option value="Standard">Included Standard ({customizingPackage.hotelCategory})</option>
                    <option value="Budget Economy">Budget Economy (-₹15,000/person)</option>
                    <option value="5-Star Luxury Upgrade">5-Star Luxury Grand Hotel Upgrade (+₹45,000/person)</option>
                  </select>
                </div>

                {/* Add-on checkboxes */}
                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addIndianDinnerPlan}
                      onChange={(e) => setAddIndianDinnerPlan(e.target.checked)}
                      className="rounded border-white/20 text-rose-600 focus:ring-rose-500"
                    />
                    <span>Add Verified Indian Vegetarian/Jain Dinner Plan (+₹12,000/person)</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addPrivateGuide}
                      onChange={(e) => setAddPrivateGuide(e.target.checked)}
                      className="rounded border-white/20 text-rose-600 focus:ring-rose-500"
                    />
                    <span>Add Dedicated English/Hindi Speaking Personal Guide (+₹18,000/person)</span>
                  </label>
                </div>

                {/* Budget limit check */}
                {(() => {
                  const { perPerson, total } = calculateCustomPrice(customizingPackage);
                  const isOverBudget = total > 500000;

                  return (
                    <div className={`p-4 rounded-xl border ${isOverBudget ? 'bg-amber-950/30 border-amber-500/40 text-amber-200' : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[11px] uppercase tracking-wider text-slate-400">Recalculated Trip Price</div>
                          <div className="text-xl font-bold font-mono text-white tabular-nums">
                            ₹{total.toLocaleString('en-IN')}
                            <span className="text-xs font-normal text-slate-400 ml-2">
                              (₹{perPerson.toLocaleString('en-IN')} / person × {customTravellers})
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-black/40 border border-white/10">
                            {isOverBudget ? '⚠️ Exceeds ₹5L' : '✓ Under ₹5,00,000 Limit'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Modal footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  onClick={() => setCustomizingPackage(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const customData = {
                      hotelTier: customHotelCategory,
                      days: customizingPackage.days,
                      travellers: customTravellers,
                    };
                    const targetPkg = { ...customizingPackage };
                    const { perPerson, total } = calculateCustomPrice(targetPkg);
                    targetPkg.pricePerPersonInr = perPerson;
                    targetPkg.totalEstimatedPriceInr = total;

                    setCustomizingPackage(null);
                    onBookPackage(targetPkg, customData);
                  }}
                  className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-md transition-colors"
                >
                  Book Customized Package
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
