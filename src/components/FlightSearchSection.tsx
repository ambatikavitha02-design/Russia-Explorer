import React, { useState } from 'react';
import { FLIGHTS_DATA } from '../data/mockData';
import { FlightOption } from '../types';
import { Plane, ArrowRightLeft, Clock, Luggage, Shield, Filter, CheckCircle2 } from 'lucide-react';

interface FlightSearchProps {
  onSelectFlight: (flight: FlightOption) => void;
  selectedFlightId?: string;
}

export const FlightSearchSection: React.FC<FlightSearchProps> = ({
  onSelectFlight,
  selectedFlightId,
}) => {
  const [fromCity, setFromCity] = useState('New Delhi (DEL)');
  const [toCity, setToCity] = useState('Moscow (SVO)');
  const [departureDate, setDepartureDate] = useState('2026-10-28');
  const [returnDate, setReturnDate] = useState('2026-11-05');
  const [passengers, setPassengers] = useState(2);
  const [cabinClass, setCabinClass] = useState<'Economy' | 'Business'>('Economy');
  const [filterStops, setFilterStops] = useState<'all' | 'direct' | '1-stop'>('all');

  const filteredFlights = FLIGHTS_DATA.filter((flight) => {
    if (cabinClass === 'Business' && flight.cabinClass !== 'Business') return false;
    if (cabinClass === 'Economy' && flight.cabinClass === 'Business') return false;
    if (filterStops === 'direct' && flight.stops !== 0) return false;
    if (filterStops === '1-stop' && flight.stops !== 1) return false;
    return true;
  });

  return (
    <section id="flights" className="py-20 bg-[#0B101C] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
              India to Russia Air Routes
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white mt-1">
              Round-Trip Flights Search &amp; Fare Compare
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Compare Aeroflot direct non-stop flights and affordable Middle-Eastern connection carriers (Air Arabia, flydubai, Gulf Air, Uzbekistan Airways) with full checked baggage included.
            </p>
          </div>

          <div className="text-xs text-slate-400 border border-white/10 rounded-lg px-3 py-1.5 bg-white/5">
            Round-trip fares from <strong className="text-emerald-400 font-mono">₹39,800 INR</strong>
          </div>
        </div>

        {/* Search Engine Bar */}
        <div className="rounded-2xl border border-white/15 bg-[#121929] p-5 shadow-xl mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {/* From */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
              <label className="text-[10px] font-semibold uppercase text-slate-400">From (India)</label>
              <select
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="mt-1 w-full bg-transparent text-xs font-bold text-white focus:outline-none"
              >
                <option value="New Delhi (DEL)" className="bg-slate-900">New Delhi (DEL)</option>
                <option value="Mumbai (BOM)" className="bg-slate-900">Mumbai (BOM)</option>
                <option value="Bengaluru (BLR)" className="bg-slate-900">Bengaluru (BLR)</option>
                <option value="Chennai (MAA)" className="bg-slate-900">Chennai (MAA)</option>
                <option value="Kolkata (CCU)" className="bg-slate-900">Kolkata (CCU)</option>
              </select>
            </div>

            {/* To */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
              <label className="text-[10px] font-semibold uppercase text-slate-400">To (Russia)</label>
              <select
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="mt-1 w-full bg-transparent text-xs font-bold text-white focus:outline-none"
              >
                <option value="Moscow (SVO)" className="bg-slate-900">Moscow (SVO / DME)</option>
                <option value="Saint Petersburg (LED)" className="bg-slate-900">Saint Petersburg (LED)</option>
                <option value="Sochi (AER)" className="bg-slate-900">Sochi (AER)</option>
              </select>
            </div>

            {/* Dep Date */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
              <label className="text-[10px] font-semibold uppercase text-slate-400">Depart Date</label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="mt-1 w-full bg-transparent text-xs font-bold text-white focus:outline-none"
              />
            </div>

            {/* Return Date */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
              <label className="text-[10px] font-semibold uppercase text-slate-400">Return Date</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="mt-1 w-full bg-transparent text-xs font-bold text-white focus:outline-none"
              />
            </div>

            {/* Class */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
              <label className="text-[10px] font-semibold uppercase text-slate-400">Cabin Class</label>
              <select
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value as any)}
                className="mt-1 w-full bg-transparent text-xs font-bold text-white focus:outline-none"
              >
                <option value="Economy" className="bg-slate-900">Economy Class</option>
                <option value="Business" className="bg-slate-900">Business Class</option>
              </select>
            </div>

            {/* Pax */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
              <label className="text-[10px] font-semibold uppercase text-slate-400">Passengers</label>
              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="mt-1 w-full bg-transparent text-xs font-bold text-white focus:outline-none"
              >
                <option value={1} className="bg-slate-900">1 Adult</option>
                <option value={2} className="bg-slate-900">2 Adults</option>
                <option value={3} className="bg-slate-900">3 Adults</option>
                <option value={4} className="bg-slate-900">4 Adults</option>
              </select>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" /> Filter Stops:
              </span>
              <button
                onClick={() => setFilterStops('all')}
                className={`px-2.5 py-1 text-xs rounded-md ${filterStops === 'all' ? 'bg-white/20 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
              >
                All Flights
              </button>
              <button
                onClick={() => setFilterStops('direct')}
                className={`px-2.5 py-1 text-xs rounded-md ${filterStops === 'direct' ? 'bg-white/20 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
              >
                Direct Only
              </button>
              <button
                onClick={() => setFilterStops('1-stop')}
                className={`px-2.5 py-1 text-xs rounded-md ${filterStops === '1-stop' ? 'bg-white/20 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
              >
                1 Stop (Low Cost)
              </button>
            </div>

            <div className="text-[11px] text-slate-400">
              * Showing live demo scheduled inventory with airport fees &amp; 20-30kg checked bags.
            </div>
          </div>
        </div>

        {/* Flight Cards List */}
        <div className="space-y-4">
          {filteredFlights.map((flight) => {
            const isSelected = selectedFlightId === flight.id;
            const totalPriceForGroup = flight.roundTripPriceInr * passengers;

            return (
              <div
                key={flight.id}
                className={`flex flex-col lg:flex-row items-center justify-between p-5 rounded-2xl border transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-950/20 ring-1 ring-emerald-500'
                    : 'border-white/10 bg-[#121929] hover:border-white/20'
                }`}
              >
                {/* Airline & Route info */}
                <div className="w-full lg:w-7/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Airline branding */}
                  <div className="flex items-center gap-3 min-w-[180px]">
                    <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-rose-400 text-sm border border-white/10">
                      {flight.airlineCode}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{flight.airline}</h4>
                      <p className="text-[11px] text-slate-400">{flight.flightNumber} · {flight.cabinClass}</p>
                    </div>
                  </div>

                  {/* Flight times & duration */}
                  <div className="flex items-center gap-4 flex-1 justify-center">
                    <div className="text-right">
                      <div className="text-base font-bold text-white font-mono">{flight.departureTime}</div>
                      <div className="text-[10px] text-slate-400">{flight.fromCity.split(' ')[0]}</div>
                    </div>

                    <div className="flex flex-col items-center px-2 min-w-[120px]">
                      <span className="text-[10px] text-slate-400">{flight.duration}</span>
                      <div className="relative w-full my-1 flex items-center">
                        <div className="h-0.5 w-full bg-slate-700" />
                        <Plane className="h-3 w-3 text-rose-400 absolute left-1/2 -translate-x-1/2" />
                      </div>
                      <span className={`text-[10px] font-semibold ${flight.stops === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {flight.stops === 0 ? 'Non-Stop Direct' : flight.stopDetails}
                      </span>
                    </div>

                    <div>
                      <div className="text-base font-bold text-white font-mono">{flight.arrivalTime}</div>
                      <div className="text-[10px] text-slate-400">{flight.toCity.split(' ')[0]}</div>
                    </div>
                  </div>

                </div>

                {/* Baggage info */}
                <div className="w-full lg:w-auto my-3 lg:my-0 flex items-center gap-4 text-xs text-slate-400 border-y lg:border-y-0 lg:border-x border-white/10 py-2 lg:py-0 lg:px-6">
                  <div className="flex items-center gap-1.5">
                    <Luggage className="h-4 w-4 text-slate-300" />
                    <span>{flight.baggage}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Incl. Taxes &amp; Surcharges (₹{flight.taxesInr.toLocaleString('en-IN')})
                  </div>
                </div>

                {/* Pricing & Selection */}
                <div className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-5">
                  <div className="text-right">
                    <div className="text-[10px] uppercase text-slate-400">Round-Trip / Person</div>
                    <div className="text-lg font-bold text-emerald-400 font-mono tabular-nums">
                      ₹{flight.roundTripPriceInr.toLocaleString('en-IN')}
                    </div>
                    {passengers > 1 && (
                      <div className="text-[10px] text-slate-400">
                        Total for {passengers} pax: ₹{totalPriceForGroup.toLocaleString('en-IN')}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectFlight(flight)}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Selected Flight</span>
                      </>
                    ) : (
                      <span>Select Flight</span>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
