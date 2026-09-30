import React, { useState } from 'react';
import { FAQS_DATA } from '../data/mockData';
import { ContactEnquiry } from '../types';
import { Phone, Mail, MessageCircle, Send, CheckCircle2, ChevronDown, ChevronUp, MapPin, X, HelpCircle, Shield } from 'lucide-react';

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitEnquiry: (enquiry: ContactEnquiry) => void;
}

export const ContactSupportModal: React.FC<ContactSupportModalProps> = ({
  isOpen,
  onClose,
  onSubmitEnquiry,
}) => {
  if (!isOpen) return null;

  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [departureCity, setDepartureCity] = useState('New Delhi (DEL)');
  const [travellers, setTravellers] = useState(2);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    const newEnquiry: ContactEnquiry = {
      id: `ENQ-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      name,
      email,
      phone,
      message: message || 'Interested in customized Russia tour package from India under ₹5,00,000.',
      departureCity,
      travellers,
      status: 'New',
    };

    onSubmitEnquiry(newEnquiry);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-[#0F1626] shadow-2xl flex flex-col max-h-[88vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#141C2E] shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-600 text-white font-bold">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-white">
                Contact &amp; 24x7 India-Russia Traveler Desk
              </h3>
              <p className="text-[11px] text-slate-400">
                Direct WhatsApp assistance, consular guidance, and customized quotes
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-8">
          
          {/* Quick Contact Banners */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* WhatsApp */}
            <a
              href="https://wa.me/919811054220?text=Hello%20Russia%20Explorer,%20I%20am%20planning%20a%20Russia%20trip%20from%20India%20under%20%E2%82%B95,00,000."
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-500/60 transition-colors flex items-center gap-3 group"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white shadow">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-white group-hover:text-emerald-300">WhatsApp Instant Desk</span>
                <p className="text-[11px] text-emerald-400 font-mono">+91 98110 54220</p>
                <span className="text-[10px] text-slate-400">Replies within 10 mins</span>
              </div>
            </a>

            {/* Delhi Calling Office */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-600 text-white shadow">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-white">Delhi Booking Hotline</span>
                <p className="text-[11px] text-slate-300 font-mono">+91 11 4988 2300</p>
                <span className="text-[10px] text-slate-400">Mon - Sat (9am - 8pm IST)</span>
              </div>
            </div>

            {/* Moscow Liaison Desk */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white shadow">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-white">Moscow On-Ground Desk</span>
                <p className="text-[11px] text-slate-300 font-mono">+7 495 783 7535</p>
                <span className="text-[10px] text-slate-400">24/7 Airport Emergency Support</span>
              </div>
            </div>
          </div>

          {/* 2-Column: Inquiry Form (Left) & FAQs (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact Form */}
            <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#121929] p-5 space-y-4">
              <h4 className="font-serif-heading text-base font-bold text-white">
                Request a Custom Trip Quote
              </h4>
              <p className="text-xs text-slate-400">
                Our Russia tour specialist will tailor your flights and 4★/5★ hotels within your exact budget ceiling.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-center space-y-2">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
                  <div className="text-sm font-bold text-white">Enquiry Received!</div>
                  <p className="text-xs text-emerald-300">
                    A dedicated Russia travel advisor will call you within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Malhotra"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#1b2438] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="vikram@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#1b2438] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Mobile / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#1b2438] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Departure City</label>
                      <select
                        value={departureCity}
                        onChange={(e) => setDepartureCity(e.target.value)}
                        className="w-full bg-[#1b2438] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none"
                      >
                        <option value="New Delhi (DEL)">New Delhi (DEL)</option>
                        <option value="Mumbai (BOM)">Mumbai (BOM)</option>
                        <option value="Bengaluru (BLR)">Bengaluru (BLR)</option>
                        <option value="Chennai (MAA)">Chennai (MAA)</option>
                        <option value="Kolkata (CCU)">Kolkata (CCU)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Travellers Count</label>
                      <select
                        value={travellers}
                        onChange={(e) => setTravellers(Number(e.target.value))}
                        className="w-full bg-[#1b2438] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none"
                      >
                        <option value={1}>1 Solo Explorer</option>
                        <option value={2}>2 Adults (Couple)</option>
                        <option value={4}>4 Persons (Family)</option>
                        <option value={6}>6+ Group</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Special Requirements</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Vegetarian meal requirements, Northern Lights in Murmansk, Sapsan train business class..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#1b2438] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    Submit Travel Request
                  </button>
                </form>
              )}
            </div>

            {/* Frequently Asked Questions */}
            <div className="lg:col-span-6 space-y-3">
              <h4 className="font-serif-heading text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-rose-400" />
                <span>Frequently Asked Questions for Indian Travellers</span>
              </h4>

              <div className="space-y-2.5 text-xs">
                {FAQS_DATA.map((faq, idx) => {
                  const isOpen = activeFaq === idx;

                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/10 bg-[#121929] overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full p-3.5 text-left flex items-center justify-between text-white font-semibold cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4 text-rose-400 shrink-0" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-3.5 pb-3.5 text-slate-300 text-xs leading-relaxed border-t border-white/5 pt-2">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
