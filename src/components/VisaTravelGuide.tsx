import React, { useState } from 'react';
import { VISA_INFORMATION } from '../data/mockData';
import { FileText, Shield, AlertCircle, Phone, CreditCard, Compass, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export const VisaTravelGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visa' | 'currency' | 'rules' | 'emergency'>('visa');

  return (
    <section id="visa-info" className="py-20 bg-[#090D16] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
              Essential Travel Intelligence
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-white mt-1">
              Russia Visa &amp; Indian Traveller Guidelines
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Official consular details, currency exchange best practices, and emergency assistance for Indian passport holders visiting the Russian Federation.
            </p>
          </div>

          <div className="text-xs text-amber-300/90 bg-amber-950/30 border border-amber-500/30 rounded-xl px-4 py-2.5 max-w-md">
            ⚠️ <strong>Consular Advisory:</strong> Visa rules and entry policies must be verified directly with the official Russian MFA consular portal prior to travel departure.
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('visa')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'visa'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>16-Day Russian e-Visa</span>
          </button>

          <button
            onClick={() => setActiveTab('currency')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'currency'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            <CreditCard className="h-4 w-4" />
            <span>Currency &amp; Mir Cards</span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'rules'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>Local Transport &amp; Customs</span>
          </button>

          <button
            onClick={() => setActiveTab('emergency')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'emergency'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            <Phone className="h-4 w-4" />
            <span>Emergency Contacts</span>
          </button>
        </div>

        {/* Tab 1: 16-Day Russian e-Visa */}
        {activeTab === 'visa' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#121929] p-6 space-y-6">
              <div>
                <h3 className="font-serif-heading text-xl font-bold text-white">
                  Unified Electronic Visa (e-Visa) for Indians
                </h3>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Indian nationals can enter Russia for tourism without submitting physical passports to the embassy. You receive a digital PDF approval code linked to your passport.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VISA_INFORMATION.keyPoints.map((item, idx) => (
                  <div key={idx} className="rounded-xl bg-white/5 border border-white/10 p-3">
                    <div className="text-[10px] uppercase font-semibold text-rose-400">{item.label}</div>
                    <div className="text-xs font-bold text-white mt-0.5">{item.value}</div>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase text-slate-400 mb-2">Mandatory Application Checklist:</h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {VISA_INFORMATION.requiredDocuments.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#141d30] p-6 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase">
                <Shield className="h-4 w-4" />
                <span>e-Visa Support Guarantee</span>
              </div>
              <h4 className="font-serif-heading text-lg font-bold text-white">
                Russia Explorer Visa Concierge
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                When you book any round-trip package with Russia Explorer, our dedicated Delhi visa desk prepares and audits your e-Visa application before official submission, ensuring 100% photo and bio-page compliance.
              </p>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-1">
                <div className="font-semibold text-white">Need Urgent Visa Processing?</div>
                <p className="text-[11px] text-slate-400">Regular processing takes 4 calendar days. Express options available via our consular desk.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Currency & Mir Cards */}
        {activeTab === 'currency' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-[#121929] p-6 space-y-4">
              <h3 className="font-serif-heading text-xl font-bold text-white">
                How to Pay &amp; Exchange Currency in Russia
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Due to international banking sanctions, Visa, Mastercard, and American Express cards issued by Indian banks do not work in Russian point-of-sale machines or ATMs. Here is the recommended foolproof method:
              </p>

              <div className="space-y-3 pt-2">
                {VISA_INFORMATION.currencyGuidelines.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-3.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-600/30 text-rose-300 font-mono text-xs font-bold">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-[#141d30] p-6 space-y-4">
              <div className="text-xs font-semibold text-emerald-400 uppercase">Live Exchange Guide</div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs text-slate-400">Exchange Rate Benchmark:</div>
                <div className="text-xl font-bold font-mono text-white mt-1">
                  1 INR ≈ 1.10 - 1.15 RUB
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  USD 100 note (clean post-2013) yields approx 9,200 – 9,600 Russian Rubles.
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Our airport chauffeur assists with your first official currency exchange counter at SVO or DME airport before hotel drop.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Local Transport & Rules */}
        {activeTab === 'rules' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-[#121929] p-5 space-y-3">
              <h4 className="font-serif-heading text-base font-bold text-white">Moscow Metro &amp; Troika Card</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                The Moscow Metro is the world’s most efficient and visually stunning transit system. A reusable Troika card allows tap-and-go access across all 15 underground lines.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#121929] p-5 space-y-3">
              <h4 className="font-serif-heading text-base font-bold text-white">Sapsan High-Speed Express</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Travel between Moscow and Saint Petersburg in just 3 hours and 50 minutes at 250 km/h. Clean bistro cars, comfortable seating, and scenic Siberian birch views.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#121929] p-5 space-y-3">
              <h4 className="font-serif-heading text-base font-bold text-white">Yandex Go App</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Download the Yandex Go taxi app before leaving India. You can select cash payment in Russian Rubles. Clean, monitored fares with zero haggling required.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Emergency Contacts */}
        {activeTab === 'emergency' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VISA_INFORMATION.emergencyContacts.map((contact, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-[#121929] p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-rose-400 shrink-0" />
                  <h4 className="font-serif-heading text-base font-bold text-white">{contact.title}</h4>
                </div>
                <div className="text-sm font-bold font-mono text-emerald-400">{contact.phone}</div>
                {contact.address && (
                  <p className="text-xs text-slate-400">{contact.address}</p>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
