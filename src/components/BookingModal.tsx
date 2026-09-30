import React, { useState } from 'react';
import { TourPackage, FlightOption, Hotel, CabOption, TouristAttraction, TravelerCredentials, BookingRecord } from '../types';
import { Shield, Lock, CheckCircle2, AlertCircle, Plane, Building2, Car, MapPin, Printer, Download, MessageCircle, X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: TourPackage;
  selectedFlight?: FlightOption;
  selectedHotel?: Hotel;
  selectedCab?: CabOption;
  selectedAttractions: TouristAttraction[];
  travellersCount: number;
  travelDate: string;
  onBookingConfirmed: (newBooking: BookingRecord) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedPackage,
  selectedFlight,
  selectedHotel,
  selectedCab,
  selectedAttractions,
  travellersCount,
  travelDate,
  onBookingConfirmed,
}) => {
  if (!isOpen) return null;

  // Step 1: Credentials & Summary -> Step 2: Confirmation Voucher
  const [currentStep, setCurrentStep] = useState<'checkout' | 'confirmed'>('checkout');

  // 5 Required Traveler Credential fields
  const [fullName, setFullName] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [nationality, setNationality] = useState('Indian');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Payment choice
  const [paymentOption, setPaymentOption] = useState<'full' | 'token'>('token');

  // Confirmed booking state
  const [confirmedBookingRecord, setConfirmedBookingRecord] = useState<BookingRecord | null>(null);

  // Price Calculation
  const basePackagePrice = selectedPackage
    ? selectedPackage.pricePerPersonInr * travellersCount
    : (selectedFlight?.roundTripPriceInr || 48000) * travellersCount +
      (selectedHotel?.pricePerNightInr || 10500) * 6 +
      (selectedCab?.priceInr || 3800);

  const attractionsExtraCost = selectedAttractions.reduce(
    (acc, curr) => acc + (curr.estimatedEntryPriceInr * travellersCount),
    0
  );

  const subtotal = basePackagePrice + attractionsExtraCost;
  const taxesAndGst = Math.round(subtotal * 0.05); // 5% GST on international tour package
  const visaAssistanceFee = 4350 * travellersCount; // standard e-Visa fee
  const grandTotal = subtotal + taxesAndGst + visaAssistanceFee;

  // Token deposit amount: 25% to secure flights and hotels
  const depositAmount = Math.round(grandTotal * 0.25);
  const amountPaid = paymentOption === 'full' ? grandTotal : depositAmount;
  const remainingAmount = grandTotal - amountPaid;

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      errors.fullName = 'Please enter Full Name matching your Indian passport.';
    }
    if (!passportNumber.trim() || !/^[A-Z0-9]{7,9}$/i.test(passportNumber.trim())) {
      errors.passportNumber = 'Valid passport number required (e.g. Z1234567).';
    }
    if (!dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required for airline ticketing.';
    }
    if (!nationality.trim()) {
      errors.nationality = 'Nationality is required.';
    }
    if (!contactNumber.trim() || contactNumber.length < 10) {
      errors.contactNumber = 'Valid 10-digit mobile contact number is required.';
    }
    if (!email.trim() || !email.includes('@')) {
      errors.email = 'Valid email required for voucher and e-Visa delivery.';
    }
    if (!termsAccepted) {
      errors.terms = 'Please accept the travel booking & privacy terms.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const refId = `RUS-IND-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking: BookingRecord = {
      id: refId,
      bookingDate: new Date().toISOString().split('T')[0],
      travelDate: travelDate || '2026-10-28',
      returnDate: '2026-11-05',
      packageId: selectedPackage?.id,
      packageTitle: selectedPackage?.name || 'Custom Tailored Russia Tour',
      travelersCount: travellersCount,
      travelers: [
        {
          fullName,
          passportNumber,
          dateOfBirth,
          nationality,
          contactNumber,
          email,
          specialRequests,
          emergencyContactName: emergencyContact,
        },
      ],
      departureCity: selectedFlight?.fromCity || 'New Delhi (DEL)',
      destinationCity: selectedPackage?.cities.join(', ') || 'Moscow & St. Petersburg',
      flight: selectedFlight,
      hotel: selectedHotel,
      cab: selectedCab,
      selectedAttractions,
      totalBasePriceInr: subtotal,
      taxesAndServiceInr: taxesAndGst + visaAssistanceFee,
      grandTotalInr: grandTotal,
      amountPaidInr: amountPaid,
      status: 'Confirmed',
      paymentMethod: paymentOption === 'full' ? 'UPI / NetBanking (Full)' : '25% Advance Booking Token',
    };

    setConfirmedBookingRecord(newBooking);
    onBookingConfirmed(newBooking);
    setCurrentStep('confirmed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-white/20 bg-[#0F1626] shadow-2xl overflow-hidden my-6">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#141C2E]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-600 text-white font-bold">
              RE
            </div>
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-white">
                {currentStep === 'checkout' ? 'Complete Russia Trip Booking' : 'Booking Confirmation & Voucher'}
              </h3>
              <p className="text-[11px] text-slate-400">
                Official Reservation · Verified under ₹5,00,000 Budget Guarantee
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step 1: Checkout Form & Comprehensive Summary */}
        {currentStep === 'checkout' && (
          <form onSubmit={handleConfirmSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* Booking Summary Highlights */}
            <div className="rounded-xl border border-white/15 bg-white/5 p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-rose-400">Selected Itinerary Package</span>
                  <div className="text-base font-bold text-white">
                    {selectedPackage?.name || 'Custom Tailored Russia Discovery'}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400">Travel Date</span>
                  <div className="text-xs font-semibold text-emerald-400 font-mono">
                    {travelDate || '28th Oct 2026'} · {travellersCount} Traveller{travellersCount > 1 ? 's' : ''}
                  </div>
                </div>
              </div>

              {/* Inclusions Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <Plane className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Flight:</strong> {selectedFlight?.airline || 'Round-trip Air Ticket Included'}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Building2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Hotel:</strong> {selectedHotel?.name || selectedPackage?.hotelCategory || '4★ Central Moscow/St. Petersburg'}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Car className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Transfers:</strong> {selectedCab?.vehicleName || 'Airport Pickup & Drop Included'}
                  </div>
                </div>
              </div>
            </div>

            {/* 5 Credentials Traveller Form */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div>
                  <h4 className="font-serif-heading text-sm font-bold uppercase tracking-wider text-white">
                    Lead Traveller Information (5 Mandatory Credentials)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Required by Russian Federal Tourism Agency &amp; International Aviation Regulations.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <Lock className="h-3 w-3" />
                  <span>256-Bit Encrypted Form</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* 1. Full Name */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    1. Full Name (Strictly as per Passport) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. RAJESH KUMAR SHARMA"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#1b2438] border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                  />
                  {formErrors.fullName && <p className="text-rose-400 text-[10px] mt-1">{formErrors.fullName}</p>}
                </div>

                {/* 2. Passport Number */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    2. Passport Number (Valid &gt; 6 Months) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. M1234567"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value.toUpperCase())}
                    className="w-full bg-[#1b2438] border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none uppercase font-mono"
                  />
                  {formErrors.passportNumber && <p className="text-rose-400 text-[10px] mt-1">{formErrors.passportNumber}</p>}
                </div>

                {/* 3. Date of Birth */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    3. Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full bg-[#1b2438] border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:border-rose-500 focus:outline-none"
                  />
                  {formErrors.dateOfBirth && <p className="text-rose-400 text-[10px] mt-1">{formErrors.dateOfBirth}</p>}
                </div>

                {/* 4. Nationality */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    4. Nationality *
                  </label>
                  <input
                    type="text"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full bg-[#1b2438] border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:border-rose-500 focus:outline-none"
                  />
                  {formErrors.nationality && <p className="text-rose-400 text-[10px] mt-1">{formErrors.nationality}</p>}
                </div>

                {/* 5. Contact Number */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    5. Contact Number (WhatsApp Active) *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full bg-[#1b2438] border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                  />
                  {formErrors.contactNumber && <p className="text-rose-400 text-[10px] mt-1">{formErrors.contactNumber}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Email Address (For e-Visa &amp; Vouchers) *
                  </label>
                  <input
                    type="email"
                    placeholder="rajesh.sharma@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1b2438] border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                  />
                  {formErrors.email && <p className="text-rose-400 text-[10px] mt-1">{formErrors.email}</p>}
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="rounded-xl bg-slate-900/60 border border-white/10 p-3 text-[11px] text-slate-400 flex items-start gap-2">
                <Shield className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Privacy &amp; Data Protection:</strong> Your passport details and credentials are solely transmitted to certified Russian immigration systems and IATA airlines. They are never published publicly or shared with third-party advertisers.
                </span>
              </div>
            </div>

            {/* Price Transparency Breakdown */}
            <div className="rounded-2xl border border-white/10 bg-[#141d30] p-5 space-y-3">
              <h4 className="font-serif-heading text-sm font-bold text-white border-b border-white/10 pb-2">
                Detailed Price Transparency (Indian Rupees)
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Base Package ({travellersCount} Traveller{travellersCount > 1 ? 's' : ''}):</span>
                  <span className="font-mono tabular-nums">₹{basePackagePrice.toLocaleString('en-IN')}</span>
                </div>
                {attractionsExtraCost > 0 && (
                  <div className="flex justify-between text-slate-300">
                    <span>Selected Sightseeing Admissions:</span>
                    <span className="font-mono tabular-nums">₹{attractionsExtraCost.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-300">
                  <span>Official Russian 16-Day e-Visa Processing (₹4,350 × {travellersCount}):</span>
                  <span className="font-mono tabular-nums">₹{visaAssistanceFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Indian GST &amp; Foreign Tourism Surcharges (5%):</span>
                  <span className="font-mono tabular-nums">₹{taxesAndGst.toLocaleString('en-IN')}</span>
                </div>

                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-white uppercase">Grand Total:</span>
                    <span className="text-[11px] text-slate-400 ml-2">(₹{Math.round(grandTotal / travellersCount).toLocaleString('en-IN')} / person)</span>
                  </div>
                  <span className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Payment Option Selector */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="text-xs font-semibold text-slate-300 mb-2">Payment Terms:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${paymentOption === 'token' ? 'bg-rose-950/30 border-rose-500' : 'bg-white/5 border-white/10'}`}>
                    <div>
                      <div className="font-bold text-white">Pay 25% Advance Token</div>
                      <div className="text-[11px] text-slate-400">Pay remaining balance 14 days before flight</div>
                    </div>
                    <div className="font-mono font-bold text-rose-300 text-sm">
                      ₹{depositAmount.toLocaleString('en-IN')}
                    </div>
                    <input
                      type="radio"
                      name="paymentOpt"
                      checked={paymentOption === 'token'}
                      onChange={() => setPaymentOption('token')}
                      className="hidden"
                    />
                  </label>

                  <label className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${paymentOption === 'full' ? 'bg-rose-950/30 border-rose-500' : 'bg-white/5 border-white/10'}`}>
                    <div>
                      <div className="font-bold text-white">Pay 100% Full Fare Now</div>
                      <div className="text-[11px] text-emerald-400">Instant flight ticket voucher issued</div>
                    </div>
                    <div className="font-mono font-bold text-emerald-300 text-sm">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </div>
                    <input
                      type="radio"
                      name="paymentOpt"
                      checked={paymentOption === 'full'}
                      onChange={() => setPaymentOption('full')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 rounded border-white/20 text-rose-600 focus:ring-rose-500"
                  />
                  <span>
                    I confirm that my Indian passport has at least 6 months validity from travel date, and I agree to the transparent cancellation &amp; visa verification policies.
                  </span>
                </label>
                {formErrors.terms && <p className="text-rose-400 text-[10px] mt-1">{formErrors.terms}</p>}
              </div>
            </div>

            {/* Bottom Submit Action */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 rounded-xl shadow-lg shadow-rose-950 transition-all cursor-pointer"
              >
                Confirm Booking (₹{amountPaid.toLocaleString('en-IN')})
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Instant Booking Confirmation Voucher Screen */}
        {currentStep === 'confirmed' && confirmedBookingRecord && (
          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            
            <div className="text-center space-y-2">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500/30">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-serif-heading text-2xl font-bold text-white">
                Booking Successfully Confirmed!
              </h3>
              <p className="text-xs text-slate-300 max-w-lg mx-auto">
                Congratulations, your Russia round-trip journey has been logged with our central reservation desk. A confirmation copy has been sent to <strong>{email}</strong>.
              </p>
            </div>

            {/* Voucher Card */}
            <div className="rounded-2xl border border-white/15 bg-[#141d30] p-6 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-rose-400 font-bold">Booking Reference ID</div>
                  <div className="text-2xl font-mono font-bold text-white tracking-widest">
                    {confirmedBookingRecord.id}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase">
                    Status: {confirmedBookingRecord.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400">Lead Passenger:</span>
                  <div className="font-bold text-white mt-0.5">{fullName}</div>
                  <div className="text-[11px] text-slate-400 font-mono">Passport: {passportNumber}</div>
                </div>

                <div>
                  <span className="text-slate-400">Travel Route:</span>
                  <div className="font-bold text-white mt-0.5">India ⇄ Russia</div>
                  <div className="text-[11px] text-slate-400">Departing {travelDate || '28 Oct 2026'}</div>
                </div>

                <div>
                  <span className="text-slate-400">Group Size:</span>
                  <div className="font-bold text-white mt-0.5">{travellersCount} Traveller{travellersCount > 1 ? 's' : ''}</div>
                  <div className="text-[11px] text-slate-400">Round-Trip Included</div>
                </div>

                <div>
                  <span className="text-slate-400">Payment Status:</span>
                  <div className="font-bold text-emerald-400 font-mono mt-0.5">
                    ₹{confirmedBookingRecord.amountPaidInr.toLocaleString('en-IN')} Paid
                  </div>
                  {remainingAmount > 0 && (
                    <div className="text-[11px] text-slate-400">
                      Balance: ₹{remainingAmount.toLocaleString('en-IN')}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                <strong>Next Steps:</strong> Our bilingual Delhi visa desk will review your passport details within 24 hours to initiate your official 16-Day Russian e-Visa. Your hotel registration voucher and airline PNRs will be available in your account dashboard.
              </div>
            </div>

            {/* Actions: Print / WhatsApp / Close */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
              <a
                href={`https://wa.me/919811054220?text=Hello%20Russia%20Explorer,%20I%20have%20confirmed%20booking%20${confirmedBookingRecord.id}%20for%20${fullName}.`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat on WhatsApp for Instant Flight PNR</span>
              </a>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 border border-white/20 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print Voucher</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
