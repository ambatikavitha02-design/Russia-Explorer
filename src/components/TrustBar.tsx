import React from 'react';
import { FileCheck, CreditCard, Utensils, ShieldCheck, Headphones, TrainTrack } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustFeatures = [
    {
      icon: FileCheck,
      title: '16-Day Russian e-Visa',
      desc: 'Complete online documentation assistance with 4-day approval for Indian passports.'
    },
    {
      icon: CreditCard,
      title: 'Forex & Mir Card Support',
      desc: 'Seamless currency exchange advisory & pre-activated Russian payment cards on arrival.'
    },
    {
      icon: Utensils,
      title: 'Indian Veg & Jain Meals',
      desc: 'Curated dining stops at authentic Indian restaurants across Moscow & St. Petersburg.'
    },
    {
      icon: TrainTrack,
      title: 'Sapsan Bullet Trains',
      desc: 'First/Economy class 250 km/h express rail included between imperial capitals.'
    },
    {
      icon: Headphones,
      title: '24x7 India & Russia Desks',
      desc: 'Bilingual Hindi, English & Russian speaking tour coordinators on call anytime.'
    },
  ];

  return (
    <div className="border-y border-white/10 bg-[#0d1320] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {trustFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-rose-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
