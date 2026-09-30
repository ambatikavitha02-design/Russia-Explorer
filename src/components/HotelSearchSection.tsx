import React, { useState } from 'react';
import { HOTELS_DATA } from '../data/mockData';
import { Hotel, HotelCategory } from '../types';
import { Star, MapPin, Coffee, Wifi, Check, Sparkles, Building2, ArrowRight, X } from 'lucide-react';

interface HotelSearchProps {
  onSelectHotel: (hotel: Hotel) => void;
  selectedHotelId?: string;
}

export const HotelSearchSection: React.FC<HotelSearchProps> = ({
  onSelectHotel,
  selectedHotelId,
}) => {
  const [cityFilter, setCityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState<'All' | HotelCategory>('All');
  const [checkInDate, setCheckInDate] = useState('2026-10-28');
  const [checkOutDate, setCheckOutDate] = useState('2026-11-04'); // 7 nights default
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [viewingHotel, setViewingHotel] = useState<Hotel | null>(null);

  // calculate stay duration in nights
  const calculateNights = () => {
    try {
      const d1 = new Date(checkInDate);
      const d2 = new Date(checkOutDate);
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 7;
    } catch {
      return 7;
    }
  };

  const nights = calculateNights();

  const filteredHotels = HOTELS_DATA.filter((hotel) => {
    if (cityFilter !== 'All' && hotel.city !== cityFilter) return false;
    if (categoryFilter !== 'All' && hotel.category !== categoryFilter) return false;
    return true;
  });

  return (
    <section id="hotels" className="py-20 bg-[#090D16] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
              Verified Accommodations
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white mt-1">
              Find &amp; Book Russia Hotels
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              From historic 5-star Tsarist palatial hotels to modern 3-star central suites with buffet breakfasts and international service standards.
            </p>
          </div>

          <div className="text-xs text-slate-400 border border-white/10 rounded-lg px-3 py-1.5 bg-white/5">
            Budget to Luxury: <strong className="text-emerald-400 font-mono">₹3,400 to ₹28,500 / night</strong>
          </div>
        </div>

        {/* Filter Widget */}
        <div className="rounded-2xl border border-white/15 bg-[#121929] p-5 shadow-xl mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {/* City */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
              <label className="text-[10px] font-semibold uppercase text-slate-400">City</label>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="mt-1 w-full bg-transparent text-xs font-bold text-white focus:outline-none"
              >
                <option value="All" className="bg-slate-900">All Cities</option>
                <option value="Moscow" className="bg-slate-900">Moscow</option>
                <option value="Saint Petersburg" className="bg-slate-900">Saint Petersburg</option>
                <option value="Sochi" className="bg-slate-900">Sochi</option>
              </select>
            </div>

            {/* Check-In */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
              <label className="text-[10px] font-semibold uppercase text-slate-400">Check-In Date</label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="mt-1 w-full bg-transparent text-xs font-bold text-white focus:outline-none"
              />
            </div>

            {/* Check-Out */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
              <label className="text-[10px] font-semibold uppercase text-slate-400">Check-Out Date</label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="mt-1 w-full bg-transparent text-xs font-bold text-white focus:outline-none"
              />
            </div>

            {/* Category */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
              <label className="text-[10px] font-semibold uppercase text-slate-400">Hotel Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as any)}
                className="mt-1 w-full bg-transparent text-xs font-bold text-white focus:outline-none"
              >
                <option value="All" className="bg-slate-900">All Categories</option>
                <option value="Budget" className="bg-slate-900">Budget / Economy</option>
                <option value="3-Star" className="bg-slate-900">3-Star Comfort</option>
                <option value="4-Star" className="bg-slate-900">4-Star Deluxe</option>
                <option value="5-Star" className="bg-slate-900">5-Star Luxury</option>
              </select>
            </div>

            {/* Rooms */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
              <label className="text-[10px] font-semibold uppercase text-slate-400">Rooms</label>
              <select
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                className="mt-1 w-full bg-transparent text-xs font-bold text-white focus:outline-none"
              >
                <option value={1} className="bg-slate-900">1 Room</option>
                <option value={2} className="bg-slate-900">2 Rooms</option>
                <option value={3} className="bg-slate-900">3 Rooms</option>
              </select>
            </div>

            {/* Guests */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
              <label className="text-[10px] font-semibold uppercase text-slate-400">Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="mt-1 w-full bg-transparent text-xs font-bold text-white focus:outline-none"
              >
                <option value={1} className="bg-slate-900">1 Guest</option>
                <option value={2} className="bg-slate-900">2 Guests</option>
                <option value={3} className="bg-slate-900">3 Guests</option>
                <option value={4} className="bg-slate-900">4 Guests</option>
              </select>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/10">
            <span>Duration: <strong className="text-white font-mono">{nights} Nights</strong> stay selected</span>
            <span className="text-[11px] text-emerald-400">✓ Free Russian hotel registration voucher included</span>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => {
            const isSelected = selectedHotelId === hotel.id;
            const totalStayPrice = (hotel.pricePerNightInr + hotel.taxesAndFeesInr) * nights * rooms;

            return (
              <div
                key={hotel.id}
                className={`flex flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 bg-[#111827] ${
                  isSelected
                    ? 'border-emerald-500 ring-1 ring-emerald-500 shadow-xl'
                    : 'border-white/10 hover:border-white/25 hover:shadow-xl'
                }`}
              >
                {/* Hotel Image & badges */}
                <div className="relative h-52 w-full bg-slate-800">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="rounded-md bg-black/70 px-2 py-0.5 text-xs font-semibold text-rose-300 border border-white/10 backdrop-blur-md">
                      {hotel.city}
                    </span>
                    <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-white border border-white/15 backdrop-blur-md">
                      {hotel.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-500/90 text-slate-950 font-bold px-2 py-0.5 rounded text-xs">
                    <Star className="h-3 w-3 fill-slate-950" />
                    <span>{hotel.guestRating}</span>
                  </div>

                  <div className="absolute bottom-2 left-3 right-3">
                    <h3 className="font-serif-heading text-lg font-bold text-white">
                      {hotel.name}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                      <span className="truncate">{hotel.location}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 ml-5">{hotel.distanceToCenter}</div>

                    <div className="mt-3 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-1">
                      <div className="font-semibold text-white">{hotel.roomType}</div>
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                        <Coffee className="h-3.5 w-3.5" />
                        <span>{hotel.breakfastIncluded ? 'Complimentary Buffet Breakfast Included' : 'Room Only (Breakfast available)'}</span>
                      </div>
                    </div>

                    {/* Facilities badges */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {hotel.facilities.slice(0, 3).map((facility, i) => (
                        <span key={i} className="text-[10px] text-slate-400 bg-white/5 border border-white/5 rounded px-2 py-0.5">
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Buttons */}
                  <div className="pt-3 border-t border-white/10">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase">Per Night</div>
                        <div className="text-base font-bold text-white font-mono tabular-nums">
                          ₹{hotel.pricePerNightInr.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] text-slate-400 uppercase">Total for {nights} Nights</div>
                        <div className="text-base font-bold text-emerald-400 font-mono tabular-nums">
                          ₹{totalStayPrice.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewingHotel(hotel)}
                        className="flex-1 py-2 text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg transition-colors cursor-pointer text-center"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => onSelectHotel(hotel)}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer text-center ${
                          isSelected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm'
                        }`}
                      >
                        {isSelected ? '✓ Selected' : 'Select Hotel'}
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* View Hotel Modal */}
        {viewingHotel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/20 bg-[#111827] shadow-2xl p-6">
              
              <div className="flex items-start justify-between border-b border-white/10 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-rose-400 font-semibold">{viewingHotel.category}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-xs text-emerald-400 font-semibold">★ {viewingHotel.guestRating}/10 ({viewingHotel.reviewCount} Reviews)</span>
                  </div>
                  <h3 className="font-serif-heading text-xl font-bold text-white mt-1">
                    {viewingHotel.name}
                  </h3>
                </div>
                <button
                  onClick={() => setViewingHotel(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                <div className="rounded-xl overflow-hidden h-48 w-full bg-slate-800">
                  <img src={viewingHotel.image} alt={viewingHotel.name} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <p><strong>Address:</strong> {viewingHotel.location}</p>
                  <p><strong>Proximity:</strong> {viewingHotel.distanceToCenter}</p>
                  <p><strong>Room Category:</strong> {viewingHotel.roomType}</p>
                  <p><strong>Breakfast:</strong> {viewingHotel.breakfastIncluded ? 'Full Buffet Breakfast Included' : 'Available for purchase'}</p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase text-slate-400 mb-2">Amenities &amp; Features</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-200">
                    {viewingHotel.facilities.map((fac, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 rounded bg-white/5 p-2">
                        <Check className="h-3 w-3 text-emerald-400 shrink-0" />
                        <span>{fac}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center text-xs">
                  <div>
                    <div className="text-slate-400">Estimated Total for {nights} Nights:</div>
                    <div className="text-lg font-bold font-mono text-emerald-400">
                      ₹{((viewingHotel.pricePerNightInr + viewingHotel.taxesAndFeesInr) * nights).toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 text-right">
                    Includes taxes &amp; Russian tourist registration fee
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
                <button
                  onClick={() => setViewingHotel(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onSelectHotel(viewingHotel);
                    setViewingHotel(null);
                  }}
                  className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow"
                >
                  Select This Hotel
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
