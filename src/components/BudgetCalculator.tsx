import React, { useState } from 'react';
import { IndianRupee, PieChart, Users, Calendar, AlertTriangle, CheckCircle, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

interface BudgetCalculatorProps {
  onApplyPlan: (calculatedBudget: {
    total: number;
    travellers: number;
    days: number;
    hotelTier: string;
  }) => void;
}

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ onApplyPlan }) => {
  const MAX_CEILING = 500000; // ₹5,00,000 budget constraint

  // State inputs
  const [travellers, setTravellers] = useState<number>(2);
  const [days, setDays] = useState<number>(7);
  const [flightTier, setFlightTier] = useState<number>(48000); // per person
  const [hotelTierRate, setHotelTierRate] = useState<number>(10500); // 4-Star per room per night (1 room for 2 pax)
  const [foodPerPersonPerDay, setFoodPerPersonPerDay] = useState<number>(2200);
  const [transportPerDay, setTransportPerDay] = useState<number>(2800); // local cabs & metro
  const [intercitySapsan, setIntercitySapsan] = useState<number>(5500); // Sapsan ticket per pax
  const [sightseeingPerPax, setSightseeingPerPax] = useState<number>(6500); // Kremlin, Hermitage, Peterhof
  const [shoppingMisc, setShoppingMisc] = useState<number>(18000); // Souvenirs, Russian fur, chocolate, amber

  // Calculation logic
  const roomsNeeded = Math.ceil(travellers / 2);
  const flightTotal = flightTier * travellers;
  const hotelTotal = hotelTierRate * (days - 1) * roomsNeeded;
  const foodTotal = foodPerPersonPerDay * days * travellers;
  const transportTotal = (transportPerDay * days) + (intercitySapsan * travellers);
  const sightseeingTotal = sightseeingPerPax * travellers;
  const miscTotal = shoppingMisc;

  const totalTripCost = flightTotal + hotelTotal + foodTotal + transportTotal + sightseeingTotal + miscTotal;
  const remainingBudget = MAX_CEILING - totalTripCost;
  const isOverBudget = remainingBudget < 0;
  const budgetUtilizationPercent = Math.min(100, Math.round((totalTripCost / MAX_CEILING) * 100));

  const getHotelTierLabel = () => {
    if (hotelTierRate <= 4500) return 'Budget / Boutique Hotel';
    if (hotelTierRate <= 7500) return '3-Star Central Comfort';
    if (hotelTierRate <= 14000) return '4-Star Premium Deluxe';
    return '5-Star Imperial Luxury';
  };

  return (
    <section id="budget-calculator" className="py-20 bg-[#090D16] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
              Smart Expense Estimator
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white mt-1">
              Interactive Russia Travel Budget Calculator
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Dynamically calibrate your flights, hotel tiers, dining, and sightseeing against the <strong>₹5,00,000 maximum budget threshold</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
            <span>Guaranteed Ceiling:</span>
            <strong className="text-emerald-400 font-mono text-sm">₹5,00,000 INR</strong>
          </div>
        </div>

        {/* 2-Column Layout: Inputs (Left) and Live Visual Dashboard (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 rounded-2xl border border-white/15 bg-[#121929] p-6 space-y-6 shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3">
              1. Trip Dynamics &amp; Group Size
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Number of Travellers */}
              <div>
                <label className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-rose-400" /> Travellers Count
                  </span>
                  <span className="font-mono text-rose-300 font-bold">{travellers} Person{travellers > 1 ? 's' : ''}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={6}
                  value={travellers}
                  onChange={(e) => setTravellers(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>1 Solo</span>
                  <span>2 Couple</span>
                  <span>4 Family</span>
                  <span>6 Group</span>
                </div>
              </div>

              {/* Number of Days */}
              <div>
                <label className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-rose-400" /> Trip Duration
                  </span>
                  <span className="font-mono text-rose-300 font-bold">{days} Days / {days - 1} Nights</span>
                </label>
                <input
                  type="range"
                  min={4}
                  max={16}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>4 Days</span>
                  <span>8 Days (Classic)</span>
                  <span>12 Days</span>
                  <span>16 Days (Max e-Visa)</span>
                </div>
              </div>
            </div>

            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3 pt-2">
              2. Major Service Inclusions
            </h3>

            {/* Flight Budget Tier */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                International Flight Tier (Return / Person from India)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Budget Connecting', price: 42000, desc: 'Air Arabia / Uzbekistan' },
                  { label: 'Direct Non-Stop', price: 58500, desc: 'Aeroflot 6.5h' },
                  { label: 'Business Suite', price: 145000, desc: 'Lie-flat bed & VIP lounge' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setFlightTier(item.price)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      flightTier === item.price
                        ? 'bg-rose-600/20 border-rose-500 text-white shadow-sm'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[11px] font-mono font-semibold text-emerald-400 mt-0.5">
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 truncate">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Hotel Tier Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Hotel Category ({roomsNeeded} room{roomsNeeded > 1 ? 's' : ''} needed)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: 'Budget (3★)', rate: 4500 },
                  { label: 'Comfort (3-4★)', rate: 7500 },
                  { label: 'Deluxe (4★)', rate: 10500 },
                  { label: 'Luxury (5★)', rate: 22000 },
                ].map((tier) => (
                  <button
                    key={tier.label}
                    type="button"
                    onClick={() => setHotelTierRate(tier.rate)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      hotelTierRate === tier.rate
                        ? 'bg-rose-600/20 border-rose-500 text-white'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">{tier.label}</div>
                    <div className="text-[11px] font-mono text-emerald-400 mt-0.5">
                      ₹{tier.rate.toLocaleString('en-IN')}/nt
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Expenses Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                  <span>Food / Dining per Person:</span>
                  <span className="font-mono text-emerald-400 font-bold">₹{foodPerPersonPerDay}/day</span>
                </label>
                <input
                  type="range"
                  min={1200}
                  max={4500}
                  step={300}
                  value={foodPerPersonPerDay}
                  onChange={(e) => setFoodPerPersonPerDay(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
                <span className="text-[10px] text-slate-400">Includes Indian restaurant meals</span>
              </div>

              <div>
                <label className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                  <span>Shopping &amp; Souvenirs:</span>
                  <span className="font-mono text-emerald-400 font-bold">₹{shoppingMisc.toLocaleString('en-IN')}</span>
                </label>
                <input
                  type="range"
                  min={5000}
                  max={50000}
                  step={5000}
                  value={shoppingMisc}
                  onChange={(e) => setShoppingMisc(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
                <span className="text-[10px] text-slate-400">Amber, Caviar, Matryoshka &amp; Vodka</span>
              </div>
            </div>

          </div>

          {/* Right Column: Live Visual Dashboard */}
          <div className="lg:col-span-5 rounded-2xl border border-white/20 bg-gradient-to-b from-[#141c2e] to-[#0f172a] p-6 shadow-2xl space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-rose-400 font-bold">Trip Budget Summary</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${isOverBudget ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>
                  {isOverBudget ? 'Exceeds ₹5L Cap' : 'Optimal Plan'}
                </span>
              </div>
              <div className="mt-2 text-3xl font-serif-heading font-bold text-white font-mono tabular-nums">
                ₹{totalTripCost.toLocaleString('en-IN')}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Estimated for {travellers} Traveller{travellers > 1 ? 's' : ''} · {days} Days ({getHotelTierLabel()})
              </div>
            </div>

            {/* Visual Budget Progress Bar against ₹5,00,000 */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">Budget Cap Utilization:</span>
                <span className="font-mono font-bold text-slate-200">{budgetUtilizationPercent}% of ₹5,00,000</span>
              </div>
              
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isOverBudget
                      ? 'bg-rose-500'
                      : budgetUtilizationPercent > 80
                      ? 'bg-amber-400'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, budgetUtilizationPercent)}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-slate-300">Remaining Surplus / Buffer:</span>
                <span className={`text-sm font-bold font-mono tabular-nums ${isOverBudget ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {isOverBudget ? `-₹${Math.abs(remainingBudget).toLocaleString('en-IN')}` : `+₹${remainingBudget.toLocaleString('en-IN')}`}
                </span>
              </div>
            </div>

            {/* Categorical Breakdown Cards */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">1. Flights (Round-Trip × {travellers})</span>
                <span className="font-mono text-white font-semibold tabular-nums">₹{flightTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">2. Hotels ({days - 1} nights × {roomsNeeded} room)</span>
                <span className="font-mono text-white font-semibold tabular-nums">₹{hotelTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">3. Cabs &amp; Sapsan Bullet Train</span>
                <span className="font-mono text-white font-semibold tabular-nums">₹{transportTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">4. Sightseeing &amp; Museum Tickets</span>
                <span className="font-mono text-white font-semibold tabular-nums">₹{sightseeingTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">5. Dining &amp; Indian Meals</span>
                <span className="font-mono text-white font-semibold tabular-nums">₹{foodTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">6. Shopping &amp; Souvenirs</span>
                <span className="font-mono text-white font-semibold tabular-nums">₹{miscTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => {
                onApplyPlan({
                  total: totalTripCost,
                  travellers,
                  days,
                  hotelTier: getHotelTierLabel(),
                });
              }}
              className="w-full py-3 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 rounded-xl shadow-lg shadow-rose-950 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Build Custom Package With This Budget</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
