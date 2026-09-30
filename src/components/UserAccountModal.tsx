import React, { useState } from 'react';
import { BookingRecord, Hotel, TouristAttraction } from '../types';
import { User, Lock, Mail, Bookmark, Calendar, Download, Printer, Shield, ArrowRight, X, CheckCircle2 } from 'lucide-react';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserEmail: string | null;
  onLogin: (email: string) => void;
  onLogout: () => void;
  bookings: BookingRecord[];
  savedHotels: Hotel[];
  savedAttractions: TouristAttraction[];
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  isOpen,
  onClose,
  currentUserEmail,
  onLogin,
  onLogout,
  bookings,
  savedHotels,
  savedAttractions,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'bookings' | 'saved' | 'auth'>('bookings');
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');

  // Auth form states
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    if (authMode === 'forgot') {
      setAuthSuccessMsg(`Password reset instructions sent to ${emailInput}`);
      return;
    }

    onLogin(emailInput.trim());
    setAuthSuccessMsg(`Welcome, ${nameInput || emailInput.split('@')[0]}!`);
    setTimeout(() => {
      setActiveTab('bookings');
      setAuthSuccessMsg('');
    }, 1200);
  };

  const handleDownloadItinerary = (booking: BookingRecord) => {
    const itineraryText = `
RUSSIA EXPLORER – TRAVEL VOUCHER & ITINERARY
=====================================================
Booking Reference: ${booking.id}
Date Booked: ${booking.bookingDate}
Travel Date: ${booking.travelDate} to ${booking.returnDate}
Package: ${booking.packageTitle}
Destination: ${booking.destinationCity}
Lead Passenger: ${booking.travelers[0]?.fullName || 'Lead Guest'}
Passport Number: ${booking.travelers[0]?.passportNumber || 'N/A'}
Contact: ${booking.travelers[0]?.contactNumber || 'N/A'}
Total Price: ₹${booking.grandTotalInr.toLocaleString('en-IN')}
Amount Paid: ₹${booking.amountPaidInr.toLocaleString('en-IN')}
Status: ${booking.status}

FLIGHT DETAILS:
- Airline: ${booking.flight?.airline || 'Standard Included Flight'}
- Route: ${booking.departureCity} to ${booking.destinationCity}

HOTEL RESERVATION:
- Hotel: ${booking.hotel?.name || '4-Star Central Accommodation'}
- Check-in: ${booking.travelDate}

EMERGENCY SUPPORT IN RUSSIA:
- 24x7 India Concierge Desk: +91 11 4988 2300 / +91 98110 54220
- Embassy of India in Moscow: +7 495 783 7535
=====================================================
    `;

    const blob = new Blob([itineraryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Russia_Explorer_Itinerary_${booking.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/20 bg-[#0F1626] shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#141C2E]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-600 text-white font-bold">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-white">
                {currentUserEmail ? `Account: ${currentUserEmail}` : 'Traveler Portal'}
              </h3>
              <p className="text-[11px] text-slate-400">
                Manage your Russia trips, download travel vouchers &amp; view saved favorites
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

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 bg-[#0B101C]">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'bookings'
                  ? 'border-rose-500 text-rose-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              My Trips &amp; Bookings ({bookings.length})
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`py-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'saved'
                  ? 'border-rose-500 text-rose-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Saved Items ({savedHotels.length + savedAttractions.length})
            </button>

            {!currentUserEmail && (
              <button
                onClick={() => setActiveTab('auth')}
                className={`py-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'auth'
                    ? 'border-rose-500 text-rose-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In / Register
              </button>
            )}
          </div>

          {currentUserEmail && (
            <button
              onClick={onLogout}
              className="text-xs text-slate-400 hover:text-rose-400 cursor-pointer"
            >
              Sign Out
            </button>
          )}
        </div>

        {/* Tab 1: My Bookings */}
        {activeTab === 'bookings' && (
          <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
            {bookings.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <Calendar className="h-10 w-10 text-slate-600 mx-auto" />
                <h4 className="text-sm font-semibold text-white">No active Russia trips yet</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Explore our curated round-trip packages or use the Itinerary Builder to customize your Russian holiday under ₹5,00,000.
                </p>
              </div>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-xl border border-white/10 bg-[#141d30] p-4 space-y-3 transition-all hover:border-white/20"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{booking.packageTitle}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Ref ID: <strong className="font-mono text-slate-200">{booking.id}</strong> · Travel: {booking.travelDate}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-emerald-400">
                        ₹{booking.grandTotalInr.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Paid: ₹{booking.amountPaidInr.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-400">Lead Guest:</span> {booking.travelers[0]?.fullName || 'Guest'}
                    </div>
                    <div>
                      <span className="text-slate-400">Route:</span> {booking.destinationCity}
                    </div>
                    <div>
                      <span className="text-slate-400">Travellers:</span> {booking.travelersCount} Pax
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      onClick={() => handleDownloadItinerary(booking)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download Itinerary</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 bg-rose-950/40 border border-rose-500/30 rounded-lg transition-colors cursor-pointer"
                    >
                      <Printer className="h-3.5 w-3.5" />
                      <span>Print Voucher</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Saved Hotels & Attractions */}
        {activeTab === 'saved' && (
          <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3">
                Saved Attractions ({savedAttractions.length})
              </h4>
              {savedAttractions.length === 0 ? (
                <p className="text-xs text-slate-400">No attractions added to your tray yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {savedAttractions.map((attr) => (
                    <div key={attr.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-white">{attr.name}</div>
                        <div className="text-[11px] text-slate-400">{attr.city} · {attr.category}</div>
                      </div>
                      <span className="font-mono text-emerald-400">
                        {attr.estimatedEntryPriceInr === 0 ? 'Free' : `₹${attr.estimatedEntryPriceInr}`}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3">
                Saved Hotels ({savedHotels.length})
              </h4>
              {savedHotels.length === 0 ? (
                <p className="text-xs text-slate-400">No hotels saved yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {savedHotels.map((h) => (
                    <div key={h.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-white">{h.name}</div>
                        <div className="text-[11px] text-slate-400">{h.city} · {h.category}</div>
                      </div>
                      <span className="font-mono text-emerald-400">
                        ₹{h.pricePerNightInr.toLocaleString('en-IN')}/nt
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Sign In / Register / Forgot Password */}
        {activeTab === 'auth' && (
          <div className="p-6 max-h-[65vh] overflow-y-auto">
            <div className="max-w-md mx-auto space-y-5">
              
              <div className="text-center space-y-1">
                <h4 className="font-serif-heading text-xl font-bold text-white">
                  {authMode === 'login' ? 'Sign In to Your Account' : authMode === 'signup' ? 'Create Your Account' : 'Reset Your Password'}
                </h4>
                <p className="text-xs text-slate-400">
                  {authMode === 'login'
                    ? 'Access your Russian travel bookings, e-Visa status and tickets.'
                    : authMode === 'signup'
                    ? 'Join Russia Explorer for member-only flight rates & package discounts.'
                    : 'Enter your registered email to receive a secure password recovery link.'}
                </p>
              </div>

              {authSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs text-center">
                  {authSuccessMsg}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
                {authMode === 'signup' && (
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ananya Sharma"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      required
                      className="w-full bg-[#1b2438] border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    className="w-full bg-[#1b2438] border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                {authMode !== 'forgot' && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-semibold text-slate-300">Password</label>
                      {authMode === 'login' && (
                        <button
                          type="button"
                          onClick={() => setAuthMode('forgot')}
                          className="text-[11px] text-rose-400 hover:underline"
                        >
                          Forgot Password?
                        </button>
                      )}
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      required
                      className="w-full bg-[#1b2438] border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  {authMode === 'login' ? 'Sign In' : authMode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                </button>
              </form>

              {/* Mode toggles */}
              <div className="text-center text-xs text-slate-400 pt-2 border-t border-white/10">
                {authMode === 'login' ? (
                  <span>
                    Don't have an account?{' '}
                    <button
                      onClick={() => setAuthMode('signup')}
                      className="text-rose-400 font-semibold hover:underline"
                    >
                      Sign Up Free
                    </button>
                  </span>
                ) : (
                  <span>
                    Already have an account?{' '}
                    <button
                      onClick={() => setAuthMode('login')}
                      className="text-rose-400 font-semibold hover:underline"
                    >
                      Sign In
                    </button>
                  </span>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
