import React, { useState } from 'react';
import { BookingRecord, TourPackage, ContactEnquiry } from '../types';
import { TOUR_PACKAGES } from '../data/mockData';
import { SlidersHorizontal, Users, CalendarCheck, Tag, DollarSign, MessageSquare, Check, X, Shield, Plus, AlertCircle } from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRecord[];
  onUpdateBookingStatus: (bookingId: string, newStatus: BookingRecord['status']) => void;
  enquiries: ContactEnquiry[];
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onUpdateBookingStatus,
  enquiries,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'bookings' | 'packages' | 'coupons' | 'enquiries'>('bookings');

  // Coupon state
  const [coupons, setCoupons] = useState([
    { code: 'RUSSIA2026', discountInr: 10000, desc: 'Early Bird India-Russia Tour Discount', active: true },
    { code: 'AURORA15', discountInr: 15000, desc: 'Murmansk Northern Lights Special', active: true },
    { code: 'HONEYMOON5L', discountInr: 25000, desc: 'Luxury Couple Imperial Suite Voucher', active: false },
  ]);

  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(5000);

  // Editable packages prices demo
  const [packagePrices, setPackagePrices] = useState<Record<string, number>>({
    'pkg-budget-explorer': 148000,
    'pkg-russia-classic': 225000,
    'pkg-premium-russia': 385000,
    'pkg-murmansk-aurora': 260000,
  });

  const [priceSuccessMsg, setPriceSuccessMsg] = useState('');

  const totalRevenue = bookings.reduce((acc, curr) => acc + curr.grandTotalInr, 0);

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    setCoupons([
      ...coupons,
      {
        code: newCouponCode.trim().toUpperCase(),
        discountInr: newCouponDiscount,
        desc: 'Custom Promotional Campaign',
        active: true,
      },
    ]);
    setNewCouponCode('');
  };

  const handlePriceUpdate = (pkgId: string, newPrice: number) => {
    setPackagePrices((prev) => ({
      ...prev,
      [pkgId]: newPrice,
    }));
    setPriceSuccessMsg(`Package fare updated in live catalog.`);
    setTimeout(() => setPriceSuccessMsg(''), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-[#0F1626] shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#141C2E] shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
              <SlidersHorizontal className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-heading text-lg font-bold text-white">
                  Russia Explorer Agency Management Console
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Internal Ops Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Live flight inventory, bookings tracker, tariff governance &amp; traveller credentials
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Metrics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#0B101C] border-b border-white/10 shrink-0 text-xs">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-slate-400">Total Confirmed Bookings:</span>
            <div className="text-xl font-bold font-mono text-white mt-1">{bookings.length} Orders</div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-slate-400">Gross Sales Volume:</span>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-slate-400">Customer Inquiries:</span>
            <div className="text-xl font-bold font-mono text-rose-400 mt-1">{enquiries.length} Active</div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-slate-400">Max Budget Safeguard:</span>
            <div className="text-xl font-bold font-mono text-amber-300 mt-1">₹5,00,000 Enforced</div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-white/10 px-6 bg-[#121929] gap-4 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'bookings'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Bookings &amp; Travellers ({bookings.length})
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'packages'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Tour Package Prices
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'coupons'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Promotional Coupons ({coupons.length})
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'enquiries'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Customer Enquiries ({enquiries.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* 1. Bookings Management */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">All customer reservations recorded via website:</span>
                <span className="text-[11px] text-emerald-400">✓ 5 Mandatory Passport Credentials Recorded</span>
              </div>

              {bookings.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-xs">
                  No customer bookings have been placed yet in this session.
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="rounded-xl border border-white/10 bg-[#141d30] p-4 text-xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-white text-sm">{booking.id}</span>
                            <span className="text-slate-400">·</span>
                            <span className="font-semibold text-rose-300">{booking.packageTitle}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            Booked on: {booking.bookingDate} · Travel: {booking.travelDate}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400">Status:</span>
                          <select
                            value={booking.status}
                            onChange={(e) => onUpdateBookingStatus(booking.id, e.target.value as any)}
                            className="bg-slate-900 border border-white/20 rounded-md px-2 py-1 text-white font-semibold text-xs"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Voucher Issued">Voucher Issued</option>
                          </select>
                        </div>
                      </div>

                      {/* Lead passenger credentials */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-white/5 rounded-lg p-3">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Passenger 1</span>
                          <strong className="text-white">{booking.travelers[0]?.fullName}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Passport &amp; Nationality</span>
                          <span className="font-mono text-emerald-400">{booking.travelers[0]?.passportNumber}</span> ({booking.travelers[0]?.nationality})
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Contact / Email</span>
                          <span>{booking.travelers[0]?.contactNumber} · {booking.travelers[0]?.email}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
                        <div>
                          Total Amount: <strong className="text-emerald-400 font-mono">₹{booking.grandTotalInr.toLocaleString('en-IN')}</strong> · Paid: ₹{booking.amountPaidInr.toLocaleString('en-IN')}
                        </div>
                        <div className="text-slate-400">
                          Payment: {booking.paymentMethod}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. Package Prices Updater */}
          {activeTab === 'packages' && (
            <div className="space-y-4">
              {priceSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs">
                  {priceSuccessMsg}
                </div>
              )}

              <div className="space-y-3">
                {TOUR_PACKAGES.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="p-4 rounded-xl border border-white/10 bg-[#141d30] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-white text-sm">{pkg.name}</h4>
                      <p className="text-slate-400 text-[11px]">{pkg.days} Days · {pkg.cities.join(', ')} · Tier: {pkg.tier}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Base Price / Person (₹)</span>
                        <input
                          type="number"
                          value={packagePrices[pkg.id] || pkg.pricePerPersonInr}
                          onChange={(e) => handlePriceUpdate(pkg.id, Number(e.target.value))}
                          step={5000}
                          className="bg-slate-900 border border-white/20 rounded-md px-3 py-1 font-mono text-emerald-400 font-bold w-36"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Coupons Management */}
          {activeTab === 'coupons' && (
            <div className="space-y-5">
              <form onSubmit={handleAddCoupon} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-wrap gap-3 items-end text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Coupon Code</label>
                  <input
                    type="text"
                    placeholder="e.g. FESTIVE2026"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                    className="bg-slate-900 border border-white/20 rounded-lg px-3 py-1.5 text-white font-mono uppercase"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Discount Value (₹ INR)</label>
                  <input
                    type="number"
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                    step={1000}
                    className="bg-slate-900 border border-white/20 rounded-lg px-3 py-1.5 text-white font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg cursor-pointer"
                >
                  Create Coupon
                </button>
              </form>

              <div className="space-y-2 text-xs">
                {coupons.map((coupon, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-white/10 bg-[#141d30] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white text-sm bg-white/10 px-2 py-0.5 rounded">
                          {coupon.code}
                        </span>
                        <span className="text-slate-300">{coupon.desc}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-emerald-400">
                        ₹{coupon.discountInr.toLocaleString('en-IN')} OFF
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${coupon.active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'}`}>
                        {coupon.active ? 'Active' : 'Expired'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Enquiries */}
          {activeTab === 'enquiries' && (
            <div className="space-y-3 text-xs">
              {enquiries.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  No open enquiries submitted from website lead forms.
                </div>
              ) : (
                enquiries.map((enq) => (
                  <div key={enq.id} className="p-4 rounded-xl border border-white/10 bg-[#141d30] space-y-2">
                    <div className="flex justify-between items-center">
                      <strong className="text-white">{enq.name} ({enq.email})</strong>
                      <span className="text-slate-400">{enq.date}</span>
                    </div>
                    <p className="text-slate-300">{enq.message}</p>
                    <div className="text-[11px] text-slate-400">
                      Phone: {enq.phone} · Departure: {enq.departureCity} · Group: {enq.travellers} Pax
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
