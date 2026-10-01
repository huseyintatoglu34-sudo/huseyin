import React from 'react';
import { JourneyStore } from '../types';

interface PrintReportProps {
  store: JourneyStore;
}

export const PrintReport: React.FC<PrintReportProps> = ({ store }) => {
  const { profile, weeks } = store;
  const completedWeeks = weeks.filter((w) => w.status === 'completed').length;
  const percent = Math.round((completedWeeks / 30) * 100);

  return (
    <div className="hidden print:block p-8 bg-white text-black font-sans max-w-4xl mx-auto space-y-6">
      <div className="border-b-2 border-black pb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold uppercase tracking-wide">
            Hafta 30 — Sarı Lacivert Şampiyonluk Raporu
          </h1>
          <span className="font-extrabold text-sm border border-black px-2 py-0.5">
            ŞAMPİYON FENER! 💛💙
          </span>
        </div>
        <p className="text-sm mt-1 text-gray-700">
          Taraftar / Gezgin: <strong>{profile.name}</strong> {store.session?.isVip ? '(⭐ GFB VIP Efsane Üye)' : ''} · Başlangıç: <strong>{profile.startDate}</strong> · Rapor Tarihi: {new Date().toLocaleDateString('tr-TR')}
        </p>
        <p className="text-sm italic mt-2">
          "{profile.visionStatement}"
        </p>
      </div>

      <div className="flex justify-between text-sm py-2 border-b border-gray-300">
        <div>Tamamlanan Hafta: <strong>{completedWeeks} / 30</strong> (%{percent})</div>
        <div>Aktif Hafta: <strong>Hafta {store.activeWeek}</strong></div>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-bold uppercase border-b border-gray-200 pb-1">
          Haftalık Özet Dökümü
        </h2>

        <div className="grid grid-cols-2 gap-4 text-xs">
          {weeks.map((w) => {
            const objsDone = w.objectives.filter((o) => o.completed).length;
            const isDone = w.status === 'completed';
            return (
              <div key={w.weekNumber} className="border border-gray-200 p-2.5 rounded">
                <div className="flex justify-between font-bold">
                  <span>Hafta {w.weekNumber}: {w.title}</span>
                  <span>{isDone ? '✓ Bitti' : '○ Devam'}</span>
                </div>
                <div className="text-[11px] text-gray-600 mt-1">
                  Faz {w.phase} · {w.category} · {objsDone}/{w.objectives.length} Görev Tamam
                </div>
                {w.reflection.wins && (
                  <div className="text-[11px] text-gray-800 mt-1 italic">
                    Kazanım: {w.reflection.wins}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
